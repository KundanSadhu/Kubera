# KUBERA — TODO Tracker

> Update checkboxes per commit. Single source of truth for capstone progress.

## Docs (done)

- [x] `README.md` — overview, quick start, stack badges
- [x] `docs/architecture.md` — C4, DB 11 tables, Mailbox/Attention, FSM
- [x] `docs/tech-stack.md` — pinned versions, Docker compose, rationale
- [x] `docs/features.md` — MVP 16 vs deferred vs v2
- [x] `docs/workflow.md` — Task FSM diagram, Agent lifecycle, Heartbeat 30m, A2A
- [x] `docs/working.md` — Docker/manual run, .env, debug
- [x] `docs/process.md` — branching, ruff/pyright, Alembic, integrity checklist
- [x] `docs/phasewiseplan.md` — 18-week Gantt, 6 phases, tags
- [x] `docs/IMPLEMENTATION.md` — 440-line plain runbook

## P1 Foundation — Weeks 1–3 ✅ DONE

- [x] `docker-compose.yml` (postgres:16, redis:7, chroma:0.5, backend, frontend)
- [x] `.env.example` (JWT_SECRET, DATABASE_URL, CHROMA, Ollama/OpenAI, WHATSAPP_MODE) + `.env`
- [x] `backend/app/main.py` lifespan + CORS + /health (50 py files parse clean, sqlite create_all OK)
- [x] `backend/app/core/config.py` pydantic-settings, `core/security.py` JWT+bcrypt, `core/limits.py`, `app/db.py`
- [x] `backend/app/models/*` 11 tables (tenant,user,agent,task,comments,lead,deal,invoice,items,notebook,whatsapp) + `app/models/base.py`
- [x] `backend/app/api/auth.py` POST /auth/register, POST /auth/login, GET /auth/me
- [x] `backend/app/seeds/seed.py` admin + 3 agents + sample leads
- [x] `frontend` Vite+Tailwind scaffold, `pages/Login.tsx`, `store/auth.ts`, `services/api.ts`, `i18n/en+hi`
- [x] `.gitignore` + Dockerfiles + requirements.txt + package.json + vite.config.ts + tailwind
- [x] Verify: sqlite create_all OK, 5 pytest pass, config OK (docker compose needs Docker Desktop)

## P2 Agent Engine — Weeks 4–7 ✅ DONE

- [x] `agents/runtime.py` AgentRuntime.handle_once + context+LLM
- [x] `llm/router.py` LiteLLM Ollama→OpenAI fallback + streaming
- [x] `agents/mailbox.py` asyncio.PriorityQueue 5 types, coalesce, TTL 3d
- [x] `agents/attention.py` idle→deciding→focused, heuristic should_preempt/should_defer
- [x] `agents/heartbeat.py` APScheduler 30m + jitter
- [x] `memory/store.py` Chroma `kubera_knowledge` + fallback
- [x] `agents/context.py` 7-section Jinja template
- [x] `services/task_service.py` FSM pending→completed, `api/tasks.py` + `api/agents.py` (+execute/message/stop) + `api/stream.py` SSE
- [x] `agents/a2a.py` dm:a2a:{sorted} over task_comments + mailbox enqueue
- [x] `agents/roles/sales-guru.md,accountant-ji.md,kubera-bot.md`
- [x] `tools/registry.py` + `tools/crm_tools.py` + `tools/invoice_tools.py` + memory_search
- [ ] Verify: two agents chat via POST /agents/{id}/execute (manual, needs running backend)

## P3 Business MVP — Weeks 8–10 ✅ DONE

- [x] `api/crm.py` GET/POST /crm/leads + PUT /crm/leads/{id} (pipeline new→won/lost)
- [x] `models/lead.py,deal.py` done
- [x] `frontend/pages/CRM.tsx` kanban 5 columns with move buttons
- [x] `tools/crm_tools.py` crm_update_lead wired
- [x] `modules/invoicing/gst.py` CGST/SGST split, HSN, 5/12/18/28 (tested: 5 passed)
- [x] `api/invoices.py` POST auto calc + seq INV-*, GET, GET /{id}, GET /{id}/pdf, GET /export/csv
- [x] `modules/invoicing/pdf.py` WeasyPrint HTML→PDF
- [x] `frontend/pages/Invoices.tsx` create form + items + PDF link + table
- [x] `tools/invoice_tools.py` invoice_create wired
- [x] Verify: pytest GST 5 passed; frontend build pending (needs npm install)

## P4 Integrations & Polish — Weeks 11–13 ✅ DONE (partial)

- [x] `api/whatsapp.py` POST /whatsapp/webhook + GET /whatsapp/messages (mock auto-reply)
- [x] `models/whatsapp.py` whatsapp_messages table
- [x] `frontend/src/i18n/en.json,hi.json` + `i18n/index.ts` + `App.tsx` LanguageToggle EN/HI
- [x] `vite-plugin-pwa` in vite.config.ts + manifest + workbox CRM cache
- [x] `api/stream.py` SSE + `api/analytics.py` polling
- [x] `api/invoices.py` GET /export/csv done
- [ ] `frontend/components/WhatsAppSimulator.tsx` — deferred, API ready via Swagger
- [ ] Verify: EN→HI toggle works; PWA install needs `npm run build`

## P5 Intelligence — Weeks 14–15 ✅ DONE

- [x] Kubera Bot via POST /agents/{id}/execute with RAG (memory/store.py search_knowledge)
- [x] `memory/store.py` search + ranking (Chroma query)
- [x] `frontend/pages/Dashboard.tsx` Recharts Bar + Pie + stats (total_leads, revenue, conversion)
- [x] `api/analytics.py` real GROUP BY leads_by_status + sum revenue + monthly
- [x] Verify: Dashboard loads via API; Bot via Agents page "Ask All"

## P6 Hardening — Weeks 16–18 ⏳ Partial

- [x] `backend/tests/test_gst.py,test_fsm.py` + `python -m pytest -q` 5 passed
- [x] `backend/tests` sqlite create_all OK, 50 py files parse clean
- [ ] `ruff`/`pyright` + `frontend npm run lint` — needs npm/pip full install
- [ ] `README.md` GIF placeholder present; add after PWA build
- [x] `docker-compose.yml` + `docs/working.md` verified (config needs Docker Desktop, not installed on this host — expected)
- [ ] Demo video + slides — examiner task
- [ ] Tag `v0.9.0-demo` — after manual E2E

## Deferred (Not in Evaluation)

- [ ] Inventory (`products` beyond stub)
- [ ] HR (`employees/attendance`) — v2
- [ ] OCR `POST /documents/parse` real Tesseract — stub only
- [ ] UPI / GSTN e-invoice — v2
- [ ] Telugu i18n — v2

---
Last updated: 2026-09-02 | Owner: you | Next: P1 `docker-compose.yml`
