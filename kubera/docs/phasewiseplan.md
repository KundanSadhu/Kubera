# KUBERA — Phasewise Plan (18 Weeks, MVP)

> Total 18 weeks (capstone, solo). MVP = CRM + Invoicing + 3 Agents + PWA. Full PRD deferred items in italics.

## Gantt

```
Wk:  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18
P1 Foundation      [████████████]
P2 Agent Engine               [████████████████████]
P3 Business MVP                          [████████████████████]
P4 Integrations                                      [████████████]
P5 Intelligence                                              [████████]
P6 Hardening                                                     [████████████]
```

## P1: Foundation (Weeks 1–3)

| Wk | Tasks | Files | Exit Criteria |
|---|---|---|---|
| 1 | Repo + compose + DB schema + FastAPI skeleton | `docker-compose.yml`, `backend/app/main.py`, `core/config.py`, `.env.example`, `alembic/init`, `models/tenant.py,user.py` | `docker-compose up` → postgres+chroma+backend healthy |
| 2 | Auth (JWT bcrypt), tenant seed, React scaffold | `core/security.py`, `api/auth.py`, `schemas/auth.py`, `seeds/seed.py`, `frontend App.tsx + Login.tsx`  Tailwind+shadcn | Register+Login → JWT cookie works |
| 3 | Postgres models batch + CRUD base + login UI i18n hint | `models/agent.py,task.py,lead.py,invoice.py`, `pytest` setup, `frontend/pages/Login.tsx` EN/HI toggle | `GET /health` + `POST /auth/login` integration test pass |

Deliverable: Auth system with tenant isolation. Tag `v0.1.0-foundation`.

## P2: Core Agent Engine (Weeks 4–7)

| Wk | Tasks | Files | Criteria |
|---|---|---|---|
| 4 | Agent runtime + LiteLLM router (Ollama+OpenAI streaming) | `agents/runtime.py`, `llm/router.py`, `llm/providers/ollama.py,openai.py`, `core/limits.py` | Agent class can call Ollama stream |
| 5 | Mailbox (PriorityQueue) + Attention (heuristic yield) + 3-layer memory scaffold | `agents/mailbox.py,attention.py,memory/store.py,embeddings.py`, `models/notebook.py` | `human_chat` preempts `heartbeat` (test) |
| 6 | Task FSM + tool registry (8 tools) + SSE | `services/task_service.py`, `tools/registry.py,crm_tools.py,invoice_tools.py`, `api/tasks.py,agents.py`, `api/stream.py` | `pending→review→completed` with SSE streaming |
| 7 | A2A simple + Heartbeat 30m + Context 7-section | `agents/a2a.py,heartbeat.py,context.py`, `agents/roles/*.md` (3 roles) | Two agents exchange message via `dm:a2a:{sorted}` |

Deliverable: Two agents chat and complete a `task_execution` via mailbox. Tag `v0.2.0-agents`.

## P3: Business Modules — MVP (Weeks 8–12 but compressed to 8-10 for MVP)

| Wk | Tasks | Files | Criteria |
|---|---|---|---|
| 8 | CRM: leads/deals pipeline, kanban UI, Sales Guru wiring | `modules/crm/service.py`, `api/crm.py`, `schemas/crm.py`, `frontend/pages/CRM.tsx` + `components/TaskBoard.tsx` | Create lead → appears in kanban → Sales Guru tool can update |
| 9 | Invoicing: GST (CGST/SGST), invoice+items, number seq | `modules/invoicing/gst.py,service.py`, `api/invoices.py`, `models/invoice.py` + migrations | `POST /invoices` with 18% GST → total correct (CGST 9%+SGST 9%) |
| 10 | PDF generation + Invoice UI + Accountant Ji | `modules/invoicing/pdf.py` (WeasyPrint), `frontend/pages/Invoices.tsx` + `InvoicePreview.tsx`, wiring to agent | PDF downloads, agent can `invoice_create` |

Deliverable: CRM + GST invoicing functional with AI. Tag `v0.3.0-business`. *Inventory/HR/OCR deferred.*

## P4: Integrations & Polish (Weeks 11–13 after compression, nominally 13-15)

| Wk | Tasks | Files | Criteria |
|---|---|---|---|
| 11 | Mock WhatsApp + Email stub | `integrations/whatsapp_mock.py`, `api/whatsapp_mock.py`, `frontend/components/WhatsAppSimulator.tsx` | Send mock message → log → optional LLM auto-reply |
| 12 | i18n EN/HI + PWA | `frontend/src/i18n/{en,hi}.json` (6 namespaces), `vite-plugin-pwa` + Workbox, `components/LanguageToggle.tsx` | Toggle EN→HI all MVP pages; Lighthouse PWA 90+; offline cached GET |
| 13 | SSE polish + notification bell + data export stub | `api/stream.py` hardening, bell polling `status=review`, `api/invoices.py` export CSV | Bell shows pending reviews; GET `/invoices/export?format=csv` stub |

Deliverable: Platform feels complete with mobile PWA. Tag `v0.4.0-integrations`.

## P5: Intelligence (Weeks 14–15)

| Wk | Tasks | Files | Criteria |
|---|---|---|---|
| 14 | Kubera Bot — NL query over CRM+invoices (RAG) | `agents/roles/kubera-bot.md`, `memory/store.py` RAG top-5, `api/agents.py` chat | Ask "Hyderabad leads?" → returns filtered list |
| 15 | Analytics dashboard (Recharts) | `frontend/pages/Dashboard.tsx` + `api/analytics.py` (mock aggregation) | Revenue chart + lead conversion rate |

Deliverable: AI answers business questions. Tag `v0.5.0-intelligence`.

## P6: Hardening (Weeks 16–18)

| Wk | Tasks | Files | Criteria |
|---|---|---|---|
| 16 | Tests | `backend/tests/test_gst.py,test_fsm.py,test_auth.py`, `pytest` coverage 60% | `pytest -q` green |
| 17 | Docs | `docs/architecture.md` final, Swagger at `/docs`, `working.md` verify, `process.md` checklist | All docs reviewed |
| 18 | Deploy + Demo | `docker-compose.yml` prod env, `README.md` GIF, demo video + slides | One-command deploy on examiner laptop |

Deliverable: Production-ready, documented. Tag `v0.9.0-demo`.

## Milestone Summary

| Milestone | Week | Tag | Demo Script |
|---|---|---|---|
| Auth | 3 | v0.1.0 | Register → Login |
| Agents talk | 7 | v0.2.0 | Guru asks Bot, completes task |
| Business | 10 | v0.3.0 | Lead→invoice→PDF→approve |
| PWA | 13 | v0.4.0 | Phone install + offline |
| Bot | 15 | v0.5.0 | "Last month sales?" |
| Final | 18 | v0.9.0 | Full 5-min video |

## Risk Buffers (from PRD §12)

- If behind at week 10: drop PWA offline (keep installable) — saves 3d.
- If Chroma unstable: fallback `sqlite FTS` for memory (keep interface).
- If Ollama OOM: run Ollama on separate host or switch LiteLLM to `openai/gpt-4o-mini` for that week.
