# KUBERA — Tech Stack

> MVP choices locked: Stack as-is · CRM+Invoicing+Agents · Mock WhatsApp · EN/HI · Ollama 80%

## 1. At-a-Glance

| Layer | Technology | Version | Why |
|---|---|---|---|
| **Frontend** | React + Vite + Tailwind CSS + shadcn/ui | React 18, Vite 5, Tailwind 3.4 | Fast, component library, mobile-first |
| **State** | Zustand | 4.5+ | Lightweight, no boilerplate |
| **PWA** | `vite-plugin-pwa` + Workbox | 0.19+ | Offline, installable |
| **i18n** | `react-i18next` | 14+ | EN/HI |
| **Backend API** | FastAPI (Python) | 0.115+ (Python 3.11+) | Auto-docs, async-native, AI-friendly |
| **Agent Runtime** | Python `asyncio` | stdlib | Direct LiteLLM integration |
| **ORM** | SQLAlchemy 2.0 (async) + Alembic | 2.0+ | Migrations from day 1, async engine |
| **Business DB** | PostgreSQL | 16 | ACID, relational business data |
| **Agent Memory** | SQLite (per-agent file) + ChromaDB | SQLite via `aiosqlite`, Chroma 0.5+ | Portable zero-config + RAG |
| **Vector Store** | ChromaDB | 0.5+ | Local, lightweight (vs FAISS in-memory only) |
| **LLM Routing** | LiteLLM | 1.40+ | Multi-provider, fallback, cost tracking |
| **Image/PDF** | WeasyPrint / ReportLab, Tesseract (stub) | — | GST invoice PDF, OCR deferred |
| **Task Queue** | APScheduler (MVP) + Redis 7 (optional Celery) | APScheduler 3.10, Redis 7 | Cron heartbeat without Celery complexity |
| **Auth** | `python-jose[cryptography]` + `passlib[bcrypt]` + `python-multipart` | — | JWT HS256, 7d cookie |
| **Email** | `fastapi-mail` (stub) | — | SMTP for invoice email |
| **Validation** | Pydantic v2 | 2.8+ | Schemas, settings |
| **Testing** | `pytest` + `pytest-asyncio` + `httpx` | — | Unit + integration |
| **Lint/Format** | Ruff + Black + ESLint (frontend) | — | Pre-commit |
| **Deployment** | Docker + Docker Compose | 24+ | One-command setup |

## 2. Detailed Rationale

### Frontend: React 18 + Vite
- Markus uses `packages/web-ui` React 19 + Vite + Tailwind 4 — we align but use stable React 18 for wider tutorial support (Indian students familiar).
- Zustand over Redux: less boilerplate, fits capstone scope.

### Backend: FastAPI vs Flask/Django
- FastAPI async matches agent runtime `asyncio`; Django ORM sync would block. Auto OpenAPI at `/docs` saves manual documentation.

### Databases: Dual but Clear Separation
- **PostgreSQL (canonical):** Tenants, users, agents, tasks, leads, invoices — relational, indexed. Markus `sqlite-storage.ts:40 tables` collapsed to 10 (see `architecture.md:5`).
- **ChromaDB (semantic):** Only for RAG (`knowledge` collection, `notebook_entries` embeddings). Chose over FAISS because persistent on disk, HTTP API fits docker-compose. FAISS would require manual persistence.
- **SQLite:** Per-agent file at `~/.kubera/agents/{id}/memory.db` for local dev without Postgres — matches PRD §5 dual DB.

### LLM: LiteLLM + Ollama 80%
- `markus/packages/core/src/llm/router.ts:2079` is 2k lines with circuit breaker; we delegate to LiteLLM which handles fallback, streaming, cost. Ollama `llama3.1:8b` local for 80% dev saves API cost; switch to `openai/gpt-4o-mini` for demo via `.env: LITELLM_MODEL`.
- Env:
  ```
  OLLAMA_HOST=http://localhost:11434
  OPENAI_API_KEY=sk-...
  LITELLM_FALLBACK=ollama/llama3.1:8b -> openai/gpt-4o-mini
  ```

### Scheduler: APScheduler for MVP, Redis/Celery Deferred
- PRD lists Celery+Redis + APScheduler — redundant for capstone. MVP uses APScheduler in-process (`agents/heartbeat.py` every 30m). Redis present in compose for future Celery without code change.

### WhatsApp: Mock
- Real Meta API requires business verification (2-3 weeks). Mock at `integrations/whatsapp_mock.py` — UI simulator + webhook `POST /whatsapp/webhook` logs to `whatsapp_messages` table, LLM auto-reply if enabled. Flag `WHATSAPP_MODE=mock|live`.

## 3. Version Pinning (requirements.txt + package.json)

```
# backend/requirements.txt (pinned)
fastapi==0.115.*
uvicorn[standard]==0.30.*
sqlalchemy[asyncio]==2.0.*
alembic==1.13.*
asyncpg==0.29.*
aiosqlite==0.20.*
pydantic==2.8.*
pydantic-settings==2.4.*
python-jose[cryptography]==3.3.*
passlib[bcrypt]==1.7.*
python-multipart==0.0.9
httpx==0.27.*
pytest==8.*
pytest-asyncio==0.23.*
litellm==1.44.*
chromadb==0.5.*
apscheduler==3.10.*
redis==5.*
weasyprint==62.*
```

Frontend: `react@18`, `react-router-dom@6`, `zustand@4`, `react-i18next@14`, `recharts@2`, `vite-plugin-pwa@0.19`.

## 4. Infrastructure

```yaml
# docker-compose.yml services
postgres: image: postgres:16, volume pgdata, port 5432
redis:    image: redis:7, port 6379
chroma:   image: chromadb/chroma:0.5, port 8001
backend:  build: ./backend, ports 8000:8000, env_file .env, depends_on postgres,chroma
frontend: build: ./frontend, ports 5173:5173
```

- Resource claim: 2GB RAM total — fits AWS t3.small free tier / laptop.
- Secrets: `.env` (JWT_SECRET, DATABASE_URL, LITELLM keys) — never committed (`.gitignore`).

## 5. Alternatives Considered

| Decision | Chosen | Alternative | Why Not |
|---|---|---|---|
| Vector store | ChromaDB | FAISS | FAISS ephemeral, manual save; Chroma persists |
| LLM router | LiteLLM | Custom | Avoid 2k-line `router.ts` rewrite |
| Scheduler | APScheduler | Celery-only | Celery overkill for 30m heartbeat |
| State mgmt | Zustand | Redux | Redux boilerplate for capstone |
| DB | PostgreSQL | MySQL | Postgres better JSONB + asyncpg |

## 6. Constraints & Costs

- Ollama requires ~4GB RAM for 8b model — document `ollama pull llama3.1:8b`.
- WhatsApp mock means no real message delivery — demo must show simulator UI, not phone.
- PDF generation WeasyPrint adds ~100MB to backend image — acceptable.
