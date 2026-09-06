# KUBERA — Workflow & Lifecycle

> Covers Task FSM, Agent lifecycle, Mailbox/Attention, Heartbeat, A2A. Simplified from `markus/docs/STATE-MACHINES.md` + `MAILBOX-SYSTEM.md`

## 1. Task Lifecycle (FSM)

```
                ┌─────────────┐
     create     │   pending   │◄─────────┐
    ───────────►│             │          │ reject
                └──────┬──────┘          │
                       │ assign/start    │
                       ▼                 │
                ┌─────────────┐          │
                │in_progress  │          │
                │  (working)  │          │
                └──────┬──────┘          │
                       │ submit_review   │
                       ▼                 │
                ┌─────────────┐          │
                │   review    │──────────┘
                │ (awaiting   │
                │  approval)  │
                └──────┬──────┘
                       │ approve (reviewer ≠ worker)
                       ▼
                ┌─────────────┐
                │  completed  │
                └──────┬──────┘
                       │ archive (manual, v2 auto 30d)
                       ▼
                ┌─────────────┐
                │  cancelled  │◄── cancel from any pre-completed
                └─────────────┘

Legend: Solid = MVP transitions. Dropped vs Markus: blocked, failed, rejected (separate).
```

**Transition table** (`services/task_service.py` enforces):

| From | To | Who | Check |
|---|---|---|---|
| `pending` | `in_progress` | human or agent | `assigned_agent_id` set |
| `in_progress` | `review` | worker agent | `submit_review()` tool call |
| `review` | `completed` | human reviewer | `reviewer_id != assigned_agent_id` |
| `review` | `in_progress` | reviewer | reject → add comment reason |
| any → `cancelled` | human | — |

**API:**
```
POST   /tasks                         → pending
PUT    /tasks/{id}/status  {status:in_progress}  → in_progress
POST   /tasks/{id}/submit-review      → review
PUT    /tasks/{id}/status  {status:completed}    → completed (requires reviewer)
DELETE /tasks/{id} / PUT ... {status:cancelled}  → cancelled
```

## 2. Requirement / Project (lightweight, MVP)

- Requirements not separate for MVP — tasks belong to optional `project_id`.
- Future: `requirements` table with same FSM if needed. For now use `tasks.title+description` as requirement.

## 3. Agent Lifecycle

```
 register (POST /agents) → active → (heartbeat every 30m) → execute task
        │                      │           │                     │
        │                      ├──► mailbox.enqueue(task_execution)
        │                      ├──► attention.focus → context.build → llm.stream → tool loop
        │                      └──► on yield: check mailbox, handle preempt/defer
        │
        └──► stop (POST /agents/{id}/stop) → offline (persisted)
```

**Files:** `agents/runtime.py` (AgentManager), `agents/mailbox.py`, `agents/attention.py`, `agents/heartbeat.py`

**Per-agent data:** `~/.kubera/agents/{id}/workspace/` + Postgres `agents` + `notebook_entries` + Chroma embeddings.

## 4. Mailbox & Attention (Simplified)

### 4.1 Mailbox

- **Queue:** `asyncio.PriorityQueue` — item `{id, type, priority, payload, created_at, metadata:{senderId, dbSessionId}}`
- **Types & priorities (5, vs Markus 15):**
  | Type | Priority | Invokes LLM | Source |
  |---|---|---|---|
  | `human_chat` | 0 critical | yes | `POST /agents/{id}/message` |
  | `task_execution` | 1 normal | yes | `PUT /tasks/.../in_progress` |
  | `a2a_message` | 1 normal | yes | `agents/a2a.py` |
  | `system` | 1 normal | yes | tool callbacks |
  | `heartbeat` | 2 low | conditional | `heartbeat.py` |
- **Behaviors:** dedup (same task update coalesce 200ms), TTL 3d purge staled, timeout 10m → move to `system` retry, back-pressure if queue >50 defer to next tick.

### 4.2 Attention

```
idle ──new item──► deciding (heuristic + mailbox peek) ──focus──► focused (LLM tool loop)
 │                      │                                    │
 └── deep-sleep (3 idle heartbeats, skip LLM)               └── yield point
                                                            (between tool iterations,
                                                             check mailbox, preempt if p0)
```

- Heuristic: `human_chat` preempts any `heartbeat`/`system`; same-priority `task_execution` merges (add to context, not interrupt).
- No LLM interrupt judge for MVP (Markus `attention.ts:LLM judge` deferred).

## 5. Heartbeat

- **Scheduler:** APScheduler `IntervalTrigger(minutes=30)` per active agent — concept from `markus/packages/core/src/heartbeat.ts:148` (Markus default 6h, we use 30m for capstone demo pace).
- **Tick:** enqueue `heartbeat` mailbox item with `{check_tasks, backlog_threshold:2, check_callbacks}`. Agent checks: open tasks `in_progress>24h` stale warning, pending callbacks timeout, retrospective ≤1 notebook line.
- **Stagger:** Random jitter 0-60s on start to avoid thundering herd.

## 6. A2A Communication (Simplified)

- **Protocol:** Deterministic DM key `dm:a2a:{sorted(agentId, peerId).join(":")}` — inspired by Markus `dm:a2a:{sorted_ids}`. Implemented over `task_comments` (or future `channel_messages` table) — no separate bus.
- **Flow:** `Agent A → agents/a2a.py send_message(peerId, text) → mailbox.enqueue(a2a_message, peer) → peer attention → reply`
- **Constraints:** Max 10 parallel sub-agents (`SUBAGENT_MAX_PARALLEL=10` from `markus/limits.ts` — keep), no circular delegation (guard loop).

## 7. Review Workflow (Human Approval)

```
Agent does work → calls tool `submit_review(summary)` → task → review
Human opens Task → sees agent summary + file diff (future) → Approve/Reject
  Approve → completed → notebook entry (lesson) + Chroma upsert
  Reject  → in_progress + comment (reason) → agent retries
```

Rule: `reviewer_id != assigned_agent_id` (vs Markus trust levels — dropped).

## 8. Notification (MVP Stub)

- No real push — bell icon polls `GET /tasks?status=review`. Future: WS `task:update` broadcast via `api/stream.py`.
- WhatsApp mock notifications log to `whatsapp_messages` and show in UI simulator.

## 9. End-to-End Example

1. Human: `POST /crm/leads {name:"Ravi", phone:"9...", source:"website"}` → `leads: new` + auto `POST /tasks {title:"Qualify Ravi", assigned: sales-guru}`
2. Heartbeat or immediate: Mailbox `task_execution` → Attention focused → LLM (Ollama) with context (role + notebook + knowledge) → calls `crm_update_lead` + `whatsapp_send_mock`
3. Agent: `submit_review` → task `review` → human approves → `completed` + `leads: contacted`
4. Kubera Bot: human asks "Hyderabad leads?" → RAG over `leads` + Chroma → reply with list.

## References

- Markus `docs/STATE-MACHINES.md:658` (single validator matrix), `MAILBOX-SYSTEM.md`, `HEARTBEAT.md`
- Limits: `markus/packages/shared/src/limits.ts` → `kubera/backend/app/core/limits.py`
