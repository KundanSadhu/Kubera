# KUBERA — Features

> MVP slice (evaluated) vs Full PRD vs v2 Roadmap

## 1. Legend

- **P0 MVP** — Must build for capstone demo (CRM + Invoicing + 3 Agents + PWA)
- **Deferred** — Documented in PRD but out of 18-week scope; stubbed or mocked
- **v2** — Post-capstone roadmap

## 2. MVP Feature Matrix (P0 — 14 Features)

| # | Feature | Description | Endpoint / Page | Agent | Status |
|---|---|---|---|---|---|
| 1 | **AI Agent Runtime** | `asyncio` engine, LiteLLM router, tool loop, SSE streaming | `api/agents.py` + `agents/runtime.py` | — | P0 |
| 2 | **Role-Based Agents** | 3 personas: Sales Guru, Accountant Ji, Kubera Bot | `GET /agents`, `POST /agents` | All | P0 |
| 3 | **Task Management** | CRUD + FSM `pending→in_progress→review→completed` | `api/tasks.py`, `pages/Tasks.tsx` (kanban) | — | P0 |
| 4 | **A2A Messaging** | Deterministic `dm:a2a:{sorted_ids}` over `task_comments` | `agents/a2a.py` `POST /agents/{id}/message` | — | P0 (simple) |
| 5 | **3-Layer Memory** | session (PG) + project (notebook_entries) + semantic (Chroma) | `memory/store.py` | — | P0 |
| 6 | **Tool System** | 8 tools: file_read/write, shell (guarded), task_*, crm_*, invoice_*, memory_search | `tools/registry.py` | — | P0 |
| 7 | **Workspace Isolation** | Per-agent dir, deny `../` + other agent dirs | `core/security.py` | — | P0 |
| 8 | **Review Workflow** | `submit_review→review→completed` (single reviewer ≠ worker) | `services/approval_service.py` | — | P0 |
| 9 | **Multi-LLM (Ollama+OpenAI)** | LiteLLM router, streaming, fallback | `llm/router.py` | — | P0 |
| 10 | **Heartbeat 30m** | APScheduler tick → mailbox `heartbeat` item | `agents/heartbeat.py` | — | P0 |
| 11 | **Audit Logging** | `task_comments` + `agent_logs` (future table) | — | — | P0 (basic) |
| 12 | **Dashboard UI** | React Vite: Login, Dashboard, CRM, Invoices, Agents, Chat | `frontend/src/pages/*` | — | P0 |
| 13 | **🇮🇳 CRM** | Leads pipeline (new→contacted→qualified→won/lost), Deals | `api/crm.py` `pages/CRM.tsx` | Sales Guru | P0 |
| 14 | **📄 GST Invoicing** | Invoice + items (HSN, GST 5/12/18/28), CGST+SGST split, PDF | `api/invoices.py` `modules/invoicing/gst.py+pdf.py` | Accountant Ji | P0 |
| 15 | **PWA** | Installable, offline cache (GET), Workbox | `vite-plugin-pwa` | — | P0 |
| 16 | **i18n EN/HI** | UI + agent prompt hints | `i18n/{en,hi}.json` | — | P0 |

## 3. Deferred / Mocked (Not in Evaluation)

| # | Feature | Why Deferred | Mock |
|---|---|---|---|
| 17 | **WhatsApp Business** | Meta approval 2-3 weeks | `integrations/whatsapp_mock.py` + `POST /whatsapp/webhook` simulator UI, `whatsapp_messages` log, LLM auto-reply if `WHATSAPP_MODE=mock` |
| 18 | **Document Parser (OCR)** | Tesseract + LLM post-processing heavy | `POST /documents/parse` returns stub `{status:"queued"}`, placeholder UI |
| 19 | **Inventory** | PRD §6.2 #15 | `products` table stub, no UI beyond `pages/Inventory.tsx` placeholder |
| 20 | **HR Module** | PRD §6.2 #19 | `employees`/`attendance` deferred — no UI |
| 21 | **Business Analytics** | PRD §6.2 #20 | `GET /analytics/dashboard` returns mock `{revenue, leads}` + Recharts placeholder |

## 4. Not in MVP — v2 Roadmap

| v2 Phase | Feature | Note |
|---|---|---|
| v2.0 | UPI (mock) + e-invoice GSTN API | Real payments |
| v2.1 | Voice (Whisper) Hindi/Telugu | Speech-to-text |
| v2.2 | React Native app | Native vs PWA |
| v2.3 | Multi-tenant SaaS billing | Stripe-like |
| v2.4 | P&L / Balance Sheet AI reports | LLM-generated |
| v2.5 | Skill marketplace | Custom skills |

## 5. Agent Details (MVP)

| Agent | Prompt File | Tools | Business Module | Demo Script |
|---|---|---|---|---|
| **Sales Guru** | `agents/roles/sales-guru.md` | `crm_list_leads`, `crm_update_lead`, `whatsapp_send_mock`, `memory_search` | CRM | "Follow up leads from Hyderabad" → lists qualified, drafts WhatsApp |
| **Accountant Ji** | `agents/roles/accountant-ji.md` | `invoice_create`, `invoice_add_item`, `gst_calculate`, `pdf_generate` | Invoicing | "Create invoice for Acme, 2 items 18% GST" → PDF |
| **Kubera Bot** | `agents/roles/kubera-bot.md` | All read tools | All | "Show last month sales" → queries leads+invoices, returns summary |

Each role: `ROLE.md` ~80 lines (identity, tools, constraints) — rewrite from `markus/templates/roles/*`, not copy.

## 6. Business Rules (MVP)

- **Lead lifecycle:** `new → contacted → qualified → won/lost` — Sales Guru may only move `new→contacted` auto; `qualified→won` requires human approval.
- **GST:** Intra-state only (CGST 50% + SGST 50% of GST rate). Inter-state IGST documented as limitation.
- **Invoice number:** `INV-{tenant_code}-{YYYY}-{seq}` unique constraint, generated server-side.
- **Task reviewer:** Must differ from `assigned_agent_id` (enforced at `services/approval_service.py`).

## 7. Acceptance Criteria (for Examiner)

- [ ] Create lead via UI → Sales Guru agent comments on task → status `review→completed`
- [ ] Create invoice with 2 items HSN+GST → PDF generated + total = sum(gst+amount)
- [ ] Switch UI EN→HI → all MVP pages translated
- [ ] Install PWA on phone → offline shows cached leads (read-only)
- [ ] Kubera Bot chat: "Show Hyderabad leads" → returns filtered list with sources
- [ ] Mock WhatsApp simulator sends message → log appears, optional LLM reply
