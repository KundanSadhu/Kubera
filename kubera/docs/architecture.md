# KUBERA — Technical Architecture

> Last updated: 2026-09-02 | Status: MVP (CRM+Invoicing+Agents) | Reference: Markus `docs/ARCHITECTURE.md` (simplified 60%)

## 0. Documentation Map

- `README.md` → overview & quick start
- `architecture.md` → this file (system design)
- `tech-stack.md` → versioned technology choices
- `features.md` → MVP vs v2 matrix
- `workflow.md` → Task FSM & agent lifecycle
- `working.md` → run/debug
- `process.md` → conventions
- `phasewiseplan.md` → 18-week Gantt
- `TODO.md` → task tracker

Relationship: `architecture → workflow (FSM) + tech-stack (infra) → working (ops)`

## 1. Overview

KUBERA is a **2-tier async monolith**: React SPA (Vite) + FastAPI monolith + 3 datastores. No microservices for capstone scope.

```
┌──────────────────────────────────────────────────────────────┐
│          Frontend: React 18 + Vite + Tailwind + PWA          │
│  Pages: Login | Dashboard | CRM (Kanban) | Invoices | Agents  │
│  i18n: en/hi · Zustand store · SSE/WebSocket streaming       │
└───────────────────────┬──────────────────────────────────────┘
                        │ REST + WS/SSE + JWT cookie
┌───────────────────────┴──────────────────────────────────────┐
│              Backend: FastAPI (Python 3.11, asyncio)          │
│  api/  auth · agents · tasks · crm · invoices · whatsapp     │
│  agents/ runtime · mailbox · attention · heartbeat · context │
│  modules/ crm · invoicing (GST+PDF)                          │
│  memory/ ChromaDB client · llm/ LiteLLM router               │
└──────┬────────────────────────┬──────────────────────────────┘
       │                        │
┌──────┴───────┐        ┌───────┴────────┐        ┌─────────────┐
│ PostgreSQL 16│        │ ChromaDB       │        │ File System │
│ (business)   │        │ (semantic)     │        │ (agent WS)  │
│ tenants,     │        │ knowledge      │        │ per-agent   │
│ users,       │        │ embeddings     │        │ workspace/  │
│ leads/deals, │        │                │        │             │
│ invoices,    │        │                │        │             │
│ tasks/agents │        │                │        │             │
└──────────────┘        └────────────────┘        └─────────────┘
Redis 7 (optional): Celery queue if enabled, else APScheduler in-process
```

**Deployment:** Single `docker-compose.yml` → 5 containers (postgres, redis, chroma, backend, frontend). Laptop / AWS free tier.

## 2. Package / Folder Structure

```
kubera/
├── backend/app/
│   ├── main.py                 # lifespan, CORS, router include, /health
│   ├── core/{config.py, security.py, limits.py, logging.py}
│   ├── models/                 # SQLAlchemy 2.0 async ORM (10 tables)
│   ├── schemas/                # Pydantic v2 request/response
│   ├── api/{auth.py, agents.py, tasks.py, crm.py, invoices.py, whatsapp_mock.py, stream.py}
│   ├── agents/{runtime.py, mailbox.py, attention.py, heartbeat.py, context.py, a2a.py}
│   ├── memory/{store.py, embeddings.py}
│   ├── llm/{router.py, providers/ollama.py, providers/openai.py}
│   ├── tools/{registry.py, files.py, shell.py, crm_tools.py, invoice_tools.py}
│   ├── modules/{crm/service.py, invoicing/service.py, invoicing/gst.py, invoicing/pdf.py}
│   ├── services/{task_service.py, approval_service.py}
│   └── integrations/whatsapp_mock.py
├── frontend/src/
│   ├── pages/{Login,Dashboard,CRM,Invoices,Agents,Chat}
│   ├── components/{TaskBoard,AgentConsole,InvoicePreview,LanguageToggle}
│   ├── store/ (Zustand), i18n/{en,hi}, services/api.ts
├── alembic/ (migrations)
├── docker-compose.yml
└── docs/
```

Markus mapping: `markus/packages/core/src/agent.ts:7572` (monolith) → split into `runtime.py~800L + mailbox.py + attention.py + context.py`; `org-manager/src/api-server.ts:12710` (150 route branches) → 6 FastAPI routers ~300L each.

## 3. Core Concepts

### 3.1 Agents

- **Config:** `agents(id, name, role, status, trust_level, tenant_id, config_json)` — 3 roles at MVP: Sales Guru, Accountant Ji, Kubera Bot. Role prompt from `backend/app/agents/roles/*.md` (not `markus/templates/roles/*` copypasta — rewrite).
- **Workspace isolation:** Each agent `workspace/per-agent/{agent_id}/` — enforced by `PathAccessPolicy` (deny `../` and other agent dirs) — concept from `markus/packages/shared/src/types/agent.ts`.
- **Trust:** Simplified — single tier for MVP (no probation→senior). Reviewer ≠ worker only.

### 3.2 Mailbox & Attention (Simplified from Markus §3.2)

- **Mailbox:** `asyncio.PriorityQueue` — 5 types (vs Markus 15): `human_chat (p0)`, `task_execution (p1)`, `a2a_message (p1)`, `heartbeat (p2)`, `system (p1)`. Priority 0 critical → 2 low, LIFO within tier, dedup (task update), 200ms coalesce, 10m processing timeout (vs Markus 45m), 3d TTL.
- **Attention:** States `idle→deciding→focused`. Yield points between LLM turns (`check_attention_yield`). Heuristic triage only (no LLM judge for MVP): `human_chat` preempts, `heartbeat` defers if tasks pending. Watchdog 30s, backstop 45m.

### 3.3 Memory — 3 Layers (PRD §6.1 Feature 5, Simplified)

| Layer | Store | Markus Equivalent | Implementation |
|---|---|---|---|
| Short-term (session) | PostgreSQL `chat_sessions` + `messages` | `sessions/*.json` + `MEMORY-SYSTEM.md` episodic | Per-conversation buffer, 2000 token compact trigger |
| Medium-term (project) | PostgreSQL `notebook_entries` | `NOTEBOOK.md` 4×6000 chars | `agent_id,key,body,updated_at` — always-loaded working memory |
| Long-term (identity) | ChromaDB `kubera_knowledge` | `knowledge.md` + embeddings | Curated facts + RAG search via `memory/store.py` |

Drop Markus `CONTEXT_WARN_RATIO`, `TOOL_DEF_BUDGET_*` complexity — keep single `SYSTEM_KNOWLEDGE_CHARS=8000`.

### 3.4 LLM Routing

- **Router:** `llm/router.py` wrapping LiteLLM — providers `ollama (local, 80% dev)` + `openai (demo)` + optional `anthropic/gemini`. Streaming SSE, fallback simple (no circuit breaker for MVP), 60s/120s timeouts, token estimator `tiktoken`.
- **Budget:** Cold start uses Ollama `llama3.1:8b`; final demo switches to `gpt-4o-mini` via `LITELLM_MODEL` env.

### 3.5 Task FSM (simplified from `markus/docs/STATE-MACHINES.md:658`)

```
pending → in_progress → review → completed
   ↘________________→ cancelled
```

- Create (`POST /tasks`) → `pending` → human/agent assigns → `in_progress` → `submit_review` → `review` → approve → `completed` or reject → `in_progress`. No `blocked/failed` for MVP. Side effects in `services/task_service.py`.

### 3.6 Context Engine

7 sections (vs Markus 15 at `context-engine.ts:2580`): `ROLE` → `PROJECT` → `KNOWLEDGE (RAG top-5)` → `NOTEBOOK` → `TASK_BOARD (my tasks max 15)` → `CONVERSATION` → `ENV`. Pinned at history tail for prefix-cache friendliness. Token budget via `core/limits.py` (~15 constants vs Markus `limits.ts:584`).

## 4. Governance (Simplified)

- **Approval:** Single reviewer (= not worker) approves `review→completed`. No trust-level tiers (`markus/docs/ARCHITECTURE.md §4` dropped).
- **Emergency:** `POST /agents/stop` + `agents.status=offline` (persisted).
- **Git:** Not needed for MVP (no per-agent branch). Future: simple `workspace` file guard.

## 5. DB Schema (MVP 10 tables, vs Markus 40 at `sqlite-storage.ts:40 CREATE TABLE`)

```sql
-- Core
tenants(id, name, gstin, address, phone, created_at)
users(id, email, password_hash, name, role[owner|admin|member], tenant_id FK, created_at)
agents(id, name, role, status[active|offline], trust_level, tenant_id FK, config_json, created_at)
tasks(id, title, description, status[pending|in_progress|review|completed|cancelled], priority, assigned_agent_id FK, reviewer_id FK, tenant_id FK, created_at, updated_at)
task_comments(id, task_id FK, author_type[human|agent], body, created_at)
notebook_entries(id, agent_id FK, key, body, updated_at)

-- Business (MVP)
leads(id, name, email, phone, source, status[new|contacted|qualified|won|lost], assigned_agent_id FK, tenant_id FK, created_at)
deals(id, lead_id FK, value, stage, probability, expected_close, tenant_id FK)
invoices(id, invoice_number UNIQUE, customer_name, customer_gstin, amount, gst_amount, total, status[draft|sent|paid], due_date, tenant_id FK, created_at)
invoice_items(id, invoice_id FK, description, hsn_code, quantity, rate, gst_rate[5|12|18|28], amount)
products(id, sku, name, stock_quantity, reorder_level, unit_price, tenant_id FK) -- stub for v2
```

Indices: `tasks(tenant_id,status)`, `leads(tenant_id,status)`, `invoices(tenant_id,status)`. Migrations via Alembic.

## 6. Auth & Channels

- JWT (HS256, 7d via `python-jose`), password `bcrypt`, cookie `kubera_token` httpOnly + Bearer header. Invite flow deferred for MVP (single-tenant seed).
- A2A for MVP: deterministic `dm:a2a:{sorted_ids}` key over `task_comments` (no separate `channel_messages` table yet). Design from `markus/a2a/src/protocol.ts`.

## 7. Streaming & Observability

- SSE `GET /api/agents/{id}/stream` via `StreamingResponse` + WS `ws://.../ws/agents/{id}` for live agent status. Single endpoint vs Markus 4 handlers (`sse-handler.ts:744` etc.).
- Metrics: per-turn token count + cost via LiteLLM callback — log to `agent_logs` (future).

## 8. Non-Goals (MVP)

Marketplace, workflow engine (`markus/workflow/*`), Feishu/Slack comms, desktop/Electron, Chrome extension, advanced billing, multi-tenant SaaS, Telugu OCR, voice.

## 9. Deployment

`docker-compose up --build` → backend `uvicorn --host 0.0.0.0 --port 8000`, frontend `npm run dev -- --host` → expose :5173/:8000. Health `GET /health` checks postgres+chroma.

## References

- Markus `docs/ARCHITECTURE.md` — entry point (867L), Mailbox §3.2, Heartbeat §9, Tool System `TOOL-SYSTEM.md`, Memory `MEMORY-SYSTEM.md`
- Limits centralized at `markus/packages/shared/src/limits.ts:584` — collapsed to `kubera/backend/app/core/limits.py` (~60L)
