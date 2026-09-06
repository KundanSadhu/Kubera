# KUBERA — Plain Implementation Guide

> Follow this document top-to-bottom to build KUBERA. No prior Markus knowledge needed. Solo B.Tech scope. Copy-paste commands are for **Windows PowerShell** (your current shell) — Linux/mac notes where different.

---

## 0) What You Are Building

**MVP only** (what examiners will run): CRM (leads pipeline) + GST invoicing (CGST/SGST + PDF) + 3 agents (Sales Guru, Accountant Ji, Kubera Bot) + PWA + EN/HI. WhatsApp = mock, Ollama = local.

**Result after 18 weeks:** `docker-compose up --build` → http://localhost:5173 UI, http://localhost:8000/docs Swagger, 3 agents answer tasks.

**Reference only:** `../markus/` is architectural inspiration (Mailbox, FSM, Heartbeat). Do not copy code — rewrite in Python.

---

## 1) Prerequisites (Day 0, 1 hour)

```powershell
# Check versions
python --version   # needs 3.11+
node --version     # needs 20+
docker --version   # needs 24+
git --version

# Install if missing
# Python: https://python.org (tick "Add to PATH")
# Node: https://nodejs.org (LTS)
# Docker Desktop: https://docker.com/products/docker-desktop
# Git: https://git-scm.com

# Ollama (local LLM, 80% dev)
# Windows: download from https://ollama.ai → install → then:
ollama pull llama3.1:8b
ollama serve   # keep this terminal open, or run as service

# Verify
ollama list
curl http://localhost:11434/api/tags
```

---

## 2) Create Project Skeleton (Day 1, 30 min)

You already have `kubera/README.md` + `kubera/docs/*`. Now create code folders:

```powershell
Set-Location "C:\Users\kunda\Music\KUBERA\kubera"

# Backend skeleton
New-Item -ItemType Directory -Path "backend\app\core","backend\app\models","backend\app\schemas","backend\app\api","backend\app\agents\roles","backend\app\memory","backend\app\llm\providers","backend\app\tools","backend\app\modules\crm","backend\app\modules\invoicing","backend\app\services","backend\app\integrations","backend\tests","backend\alembic" -Force | Out-Null

# Frontend skeleton
New-Item -ItemType Directory -Path "frontend\src\pages","frontend\src\components","frontend\src\store","frontend\src\i18n","frontend\src\services" -Force | Out-Null

# Root files
New-Item -ItemType File -Path "backend\.gitkeep","frontend\.gitkeep" -Force | Out-Null
```

Expected tree: `kubera/backend/app/{core,models,schemas,api,agents,memory,llm,tools,modules,services}` + `frontend/src/{pages,components,store,i18n,services}`.

---

## 3) Docker Compose (Day 1, 1 hour)

Create `kubera/docker-compose.yml`:

```yaml
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: kubera
      POSTGRES_PASSWORD: kubera
      POSTGRES_DB: kubera
    ports: ["5432:5432"]
    volumes: [pgdata:/var/lib/postgresql/data]
    healthcheck: { test: ["CMD-SHELL", "pg_isready -U kubera"], interval: 5s, retries: 10 }

  redis:
    image: redis:7
    ports: ["6379:6379"]

  chroma:
    image: chromadb/chroma:0.5.0
    ports: ["8001:8000"]
    volumes: [chroma_data:/chroma/chroma]

  backend:
    build: ./backend
    ports: ["8000:8000"]
    env_file: .env
    depends_on:
      postgres: { condition: service_healthy }
      chroma: { condition: service_started }
    volumes: ["./backend:/app"]
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

  frontend:
    build: ./frontend
    ports: ["5173:5173"]
    volumes: ["./frontend:/app", "/app/node_modules"]
    command: npm run dev -- --host 0.0.0.0 --port 5173

volumes: { pgdata: {}, chroma_data: {} }
```

Create `kubera/.env.example` (copy to `.env`):

```
DATABASE_URL=postgresql+asyncpg://kubera:kubera@postgres:5432/kubera
CHROMA_HOST=chroma
CHROMA_PORT=8000
JWT_SECRET=change-me-32chars-minimum-for-jwt
ADMIN_EMAIL=admin@kubera.local
ADMIN_PASSWORD=kubera123
OLLAMA_HOST=http://host.docker.internal:11434
OLLAMA_MODEL=llama3.1:8b
OPENAI_API_KEY=
LITELLM_MODEL=openai/gpt-4o-mini
WHATSAPP_MODE=mock
CORS_ORIGINS=http://localhost:5173
```

```powershell
Copy-Item ".env.example" ".env"
```

Create `kubera/backend/Dockerfile`:

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Create `kubera/frontend/Dockerfile`:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
```

Create `kubera/backend/requirements.txt` (pinned, plain):

```
fastapi==0.115.*
uvicorn[standard]==0.30.*
sqlalchemy[asyncio]==2.0.*
asyncpg==0.29.*
aiosqlite==0.20.*
alembic==1.13.*
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

Create `kubera/frontend/package.json`:

```json
{
  "name": "kubera-frontend",
  "private": true,
  "type": "module",
  "scripts": { "dev": "vite", "build": "vite build", "preview": "vite preview", "lint": "eslint ." },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.23.1",
    "zustand": "^4.5.2",
    "react-i18next": "^14.1.1",
    "i18next": "^23.11.5",
    "recharts": "^2.12.4",
    "axios": "^1.7.2"
  },
  "devDependencies": {
    "vite": "^5.2.8",
    "@vitejs/plugin-react": "^4.3.1",
    "vite-plugin-pwa": "^0.19.0",
    "tailwindcss": "^3.4.3",
    "postcss": "^8.4.38",
    "autoprefixer": "^10.4.19",
    "eslint": "^9.0.0"
  }
}
```

**Verify Docker:**

```powershell
docker-compose config   # should not error
docker-compose up --build -d
docker-compose ps       # 5 running (postgres healthy)
docker-compose logs -f backend   # check uvicorn (will fail until backend code exists — expected)
docker-compose down
```

---

## 4) Backend Foundation — Weeks 1–3 (Plains steps)

### 4.1 `backend/app/main.py` (first file)

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

app = FastAPI(title="KUBERA API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {"status": "ok", "db": "up", "chroma": "up"}

# Routers will be included here later:
# from app.api import auth, agents, tasks, crm, invoices
# app.include_router(auth.router, prefix="/api")
```

### 4.2 `backend/app/core/config.py`

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str = "postgresql+asyncpg://kubera:kubera@postgres:5432/kubera"
    chroma_host: str = "chroma"
    chroma_port: int = 8000
    jwt_secret: str = "change-me-32chars-minimum-for-jwt"
    jwt_expire_minutes: int = 60 * 24 * 7
    admin_email: str = "admin@kubera.local"
    admin_password: str = "kubera123"
    ollama_host: str = "http://host.docker.internal:11434"
    ollama_model: str = "llama3.1:8b"
    openai_api_key: str = ""
    litellm_model: str = "openai/gpt-4o-mini"
    whatsapp_mode: str = "mock"
    cors_origins: list[str] = ["http://localhost:5173"]

    class Config:
        env_file = ".env"

settings = Settings()
```

### 4.3 `backend/app/core/security.py`

```python
from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext
from app.core.config import settings

pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(p: str) -> str: return pwd.hash(p)
def verify_password(p: str, h: str) -> bool: return pwd.verify(p, h)
def create_token(sub: str) -> str:
    exp = datetime.utcnow() + timedelta(minutes=settings.jwt_expire_minutes)
    return jwt.encode({"sub": sub, "exp": exp}, settings.jwt_secret, algorithm="HS256")
def decode_token(t: str) -> str:
    return jwt.decode(t, settings.jwt_secret, algorithms=["HS256"])["sub"]
```

### 4.4 `backend/app/core/limits.py` (15 constants, plain)

```python
TASK_PAGE_SIZE = 20
NOTEBOOK_MAX_ENTRIES = 4
NOTEBOOK_MAX_CHARS = 2000
HEARTBEAT_INTERVAL_MIN = 30
MAILBOX_TIMEOUT_MIN = 10
MAILBOX_TTL_DAYS = 3
SYSTEM_KNOWLEDGE_CHARS = 8000
TRIAGE_THRESHOLD = 2
SUBAGENT_MAX_PARALLEL = 10
SHELL_TIMEOUT_SEC = 60
SESSION_COMPACT_TOKENS = 2000
COMPLETION_MARKER = "<<HANDLE_COMPLETE>>"
GST_RATES = [5, 12, 18, 28]
```

### 4.5 Database — Alembic + Models

```powershell
Set-Location backend
python -m venv venv
.\venv\Scripts\Activate.ps1   # Windows; Linux: source venv/bin/activate
pip install -r requirements.txt
alembic init alembic
# Edit alembic.ini: sqlalchemy.url = postgresql+asyncpg://kubera:kubera@localhost:5432/kubera
# Edit alembic/env.py: from app.models import Base; target_metadata = Base.metadata
```

**`backend/app/models/base.py`:**

```python
from sqlalchemy.orm import DeclarativeBase
class Base(DeclarativeBase): pass
```

**`backend/app/models/__init__.py` — import all models so Alembic sees them.**

Models (create one file at a time, then `alembic revision --autogenerate -m "add tenants"`):

- `tenant.py`: `tenants(id UUID PK, name, gstin, address, phone, created_at)`
- `user.py`: `users(id, email unique, password_hash, name, role[owner|admin|member], tenant_id FK, created_at)`
- `agent.py`: `agents(id, name, role, status[active|offline], tenant_id FK, config_json, created_at)`
- `task.py`: `tasks(id, title, description, status[pending|in_progress|review|completed|cancelled], priority, assigned_agent_id FK, reviewer_id FK, tenant_id FK, created_at, updated_at)` + `task_comments(id, task_id FK, author_type, body, created_at)`
- `lead.py`, `invoice.py`, `notebook.py` — see `docs/architecture.md:5` schema (plain SQL).

After each model:

```powershell
alembic revision --autogenerate -m "add tables"
alembic upgrade head
```

### 4.6 Auth API

**`backend/app/api/auth.py`:**

```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.security import hash_password, verify_password, create_token
from app.db import get_db  # you will create db.py with async_session

router = APIRouter()

@router.post("/auth/register")
async def register(payload: dict, db: AsyncSession = Depends(get_db)):
    # check email unique → hash → insert users → return token
    ...

@router.post("/auth/login")
async def login(payload: dict, db: AsyncSession = Depends(get_db)):
    # verify → create_token → set cookie + return {token}
    ...
```

Wire in `main.py`: `app.include_router(auth.router, prefix="/api")`.

**`backend/app/db.py`:**

```python
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from app.core.config import settings
engine = create_async_engine(settings.database_url, echo=False)
SessionLocal = async_sessionmaker(engine, expire_on_commit=False)
async def get_db():
    async with SessionLocal() as s: yield s
```

**Verify:**

```powershell
uvicorn app.main:app --reload --port 8000
# Visit http://localhost:8000/health → {"status":"ok"}
# Visit http://localhost:8000/docs → Swagger visible
```

---

## 5) Frontend Foundation — Weeks 1–3 (parallel)

```powershell
Set-Location ..\frontend
npm install
npx tailwindcss init -p
# Configure tailwind.config.js content: ["./src/**/*.{js,jsx,ts,tsx}"]
# Add to src/index.css: @tailwind base/components/utilities
npm run dev   # → http://localhost:5173
```

**Minimal pages to create first:**

- `src/services/api.ts` — axios with `baseURL: http://localhost:8000`, attach `Authorization: Bearer <token>` from `localStorage`.
- `src/store/auth.ts` — Zustand `{token, user, login(), logout()}`.
- `src/pages/Login.tsx` — form → `POST /api/auth/login` → store token → navigate `/dashboard`.
- `src/pages/Dashboard.tsx` — placeholder "Welcome to KUBERA" + health check fetch.
- `src/App.tsx` — `BrowserRouter` with `/login`, `/dashboard` (+ later `/crm`, `/invoices`, `/agents`).

**i18n (EN/HI) — add early:**

```powershell
npm install react-i18next i18next
```

- `src/i18n/index.ts` init with `resources: {en:{translation: en.json}, hi:{translation: hi.json}}`
- `src/i18n/en.json` and `hi.json` with keys `login, dashboard, crm, invoices, agents`.

---

## 6) Agent Engine — Weeks 4–7 (plain order)

Build in this exact order (each step verifiable):

1. **`app/llm/providers/ollama.py` + `openai.py` + `app/llm/router.py`** — wrap `litellm.acompletion` with fallback `ollama → openai`. Test: `python -m app.llm.router` should stream "hello".

2. **`app/agents/mailbox.py`** — class `Mailbox` with `asyncio.PriorityQueue`, methods `enqueue(type, payload)`, `dequeue()`, `coalesce()`. 5 types: `human_chat(0)`, `task_execution(1)`, `a2a_message(1)`, `system(1)`, `heartbeat(2)`.

3. **`app/agents/attention.py`** — states `idle, deciding, focused`. Method `decide(mailbox.peek())` → `focus|defer`. Yield check between LLM turns.

4. **`app/agents/context.py`** — function `build_context(agent, task, notebook, knowledge)` → string with 7 sections. Use Jinja2 template file `app/agents/context.j2`.

5. **`app/agents/runtime.py`** — class `Agent(id, role, mailbox, llm_router)` with `async def handle(item)` → `context.build → llm.stream → tool loop (max 5 iterations MVP)`. Manager `AgentManager` holds `agents: dict[id, Agent]`.

6. **`app/memory/store.py`** — Chroma client `chromadb.HttpClient(host, port)` + `collection = get_or_create("kubera_knowledge")`. Methods `upsert(text)`, `search(query, top_k=5)`. Fallback to Postgres `notebook_entries` if Chroma down.

7. **`app/tools/registry.py`** — dict `TOOLS = {"crm_list_leads": fn, "invoice_create": fn, ...}`. Each tool is `async def tool(payload, db) -> str`. Start with 4 mocked tools that just query DB.

8. **`app/services/task_service.py`** — functions `create_task`, `update_status` (enforce FSM matrix from `docs/workflow.md:1`), `submit_review`. Called by `api/tasks.py`.

9. **`app/api/tasks.py` + `api/agents.py` + `api/stream.py`** — `POST /tasks`, `PUT /tasks/{id}/status`, `POST /agents/{id}/execute`, `GET /api/agents/{id}/stream` (SSE via `StreamingResponse`).

10. **`app/agents/heartbeat.py`** — `APScheduler` `add_job(tick, 'interval', minutes=30)` where `tick` enqueues `heartbeat` to each active agent's mailbox.

**Roles (plain text, not code):** `app/agents/roles/sales-guru.md` (80 lines: identity, tools allowed, constraints: "never mark lead won without human"), `accountant-ji.md`, `kubera-bot.md`.

**Verify:**

```powershell
# Start backend, create agent via Swagger POST /api/agents {name:"Sales Guru", role:"sales-guru"}
# POST /api/tasks {title:"Qualify Ravi", assigned_agent_id:"..."}
# PUT /tasks/{id}/status {status:"in_progress"} → agent should process → PUT → review
```

---

## 7) Business Modules — Weeks 8–10

### CRM (Week 8)

- **Backend:** `app/modules/crm/service.py` functions `list_leads(tenant_id, status)`, `create_lead`, `update_lead_status`. `app/api/crm.py` `GET/POST /crm/leads`, `PUT /crm/leads/{id}`. `app/schemas/crm.py` Pydantic.
- **Frontend:** `src/pages/CRM.tsx` — table + kanban columns `new|contacted|qualified|won|lost`. Drag or button to move. Calls `api.ts` `getLeads()`, `createLead()`.
- **Agent tool:** `app/tools/crm_tools.py` `crm_list_leads`, `crm_update_lead` — agents call these via LLM.

### Invoicing (Weeks 9–10)

- **GST logic** `app/modules/invoicing/gst.py` (plain, 50 lines):

```python
def calc_gst(amount: float, gst_rate: int, intra_state=True) -> dict:
    gst_amount = round(amount * gst_rate / 100, 2)
    if intra_state:
        return {"cgst": round(gst_amount/2,2), "sgst": round(gst_amount/2,2), "igst": 0, "total": amount+gst_amount}
    else:
        return {"cgst":0, "sgst":0, "igst": gst_amount, "total": amount+gst_amount}
```

MVP: intra_state only (CGST+SGST). Document limitation.

- **Service** `app/modules/invoicing/service.py` — `create_invoice(customer, items)` generates `invoice_number` via `INV-{tenant_code}-{YYYY}-{seq}` (seq from DB `SELECT MAX(seq)`), `amount+gst+total` via `gst.py`, insert `invoices` + `invoice_items`.

- **PDF** `app/modules/invoicing/pdf.py` — WeasyPrint: HTML template `invoice.html.j2` → PDF bytes → `GET /invoices/{id}/pdf` returns `application/pdf`.

- **Frontend:** `src/pages/Invoices.tsx` — list + create form (customer, items with HSN, GST select 5/12/18/28) → preview `InvoicePreview.tsx` → download PDF button.

- **Verify:** Create invoice 2 items 18% → total = sum(amount + gst) and CGST=SGST=9% each.

---

## 8) Integrations & Polish — Weeks 11–13

- **Mock WhatsApp** `app/integrations/whatsapp_mock.py`:

```python
# POST /whatsapp/webhook {phone, message} → store in whatsapp_messages (create table if needed) → if AUTO_REPLY: call llm.router("Reply as Sales Guru: "+message)
```

Frontend `src/components/WhatsAppSimulator.tsx` — input phone+message → send → log table shows sent + reply.

- **i18n full** — translate CRM, Invoices, Agents pages. Add `src/components/LanguageToggle.tsx` button EN/HI.

- **PWA** — `npm install vite-plugin-pwa` → `vite.config.ts` plugin `VitePWA({registerType:'autoUpdate', workbox:{globPatterns:["**/*.{js,css,html}"]}, manifest:{name:"KUBERA", short_name:"KUBERA", theme_color:"#0f172a"}})`. Test: `npm run build && npm run preview` → Chrome DevTools Application → Manifest → Install.

- **Bell** — polling every 30s `GET /tasks?status=review` → badge count.

---

## 9) Intelligence — Weeks 14–15

- **Kubera Bot** — new tool `memory_search(query)` calls `memory/store.py` search + also queries `leads` + `invoices` via SQL `ILIKE`. Handler in `runtime.py` routes `human_chat` with "Hyderabad" keywords to this path.

- **Dashboard** `src/pages/Dashboard.tsx` — Recharts `BarChart` revenue last 6 months (sum invoices by month), `PieChart` lead status distribution. API `GET /analytics/dashboard` → `SELECT date_trunc('month', created_at), sum(total) ... GROUP BY`.

---

## 10) Hardening — Weeks 16–18

```powershell
# Backend tests
Set-Location backend
pytest -q                          # unit: test_gst.py (calc), test_fsm.py (pending→completed), test_auth.py (JWT)
pytest --cov=app --cov-report=term-missing

# Lint
ruff check . && ruff format . && pyright

# Frontend lint
Set-Location ..\frontend
npm run lint
npm run build   # catch vite errors
```

- **Docs final:** update `docs/architecture.md` with actual file paths, add GIF to `README.md`.
- **Demo video:** 5 min: login → create lead → Sales Guru approves → create invoice → PDF → Kubera Bot query → PWA install.
- **Tag:** `git tag v0.9.0-demo && git push origin v0.9.0-demo`.

---

## 11) Common Pitfalls & Fixes

| Symptom | Fix |
|---|---|
| `alembic upgrade head` fails foreign key | Ensure `Base` imports all models in `env.py` |
| `chromadb.HttpClient` connection refused | `docker-compose up chroma` first, check `CHROMA_HOST=chroma` inside docker vs `localhost` outside |
| Ollama `model not found` | `ollama pull llama3.1:8b` on host, set `OLLAMA_HOST=http://host.docker.internal:11434` inside docker |
| JWT 401 on frontend | Check `localStorage` token + `JWT_SECRET` same in backend `.env` |
| WeasyPrint missing `pango` | Add `apt-get install -y libpango-1.0-0` in backend Dockerfile |
| Frontend i18n not switching | Verify `i18n/index.ts` init before `ReactDOM.createRoot` |

---

## 12) What NOT to Build (to stay in 18 weeks)

Skip for v2: Inventory, HR, real OCR, UPI, Telugu beyond HI, multi-tenant billing, marketplace. Keep `products` table stub.

---

## 13) File Creation Order Checklist (tick as you go)

```
[ ] docker-compose.yml + .env.example + Dockerfiles
[ ] backend/app/main.py + core/config.py + core/security.py + core/limits.py + db.py
[ ] backend/app/models/* + alembic migrations
[ ] backend/app/api/auth.py + seeds/seed.py
[ ] frontend Vite scaffold + Login + Dashboard + api.ts + auth store
[ ] backend llm/router.py + mailbox.py + attention.py + context.py + runtime.py + heartbeat.py + memory/store.py
[ ] backend tools/registry.py + services/task_service.py + api/tasks.py + api/agents.py + api/stream.py + roles/*.md
[ ] backend modules/crm + frontend CRM kanban
[ ] backend modules/invoicing/gst.py + service.py + pdf.py + frontend Invoices
[ ] integrations/whatsapp_mock.py + simulator UI
[ ] i18n EN/HI + PWA
[ ] Kubera Bot NL query + Dashboard analytics
[ ] pytest + ruff + demo video
```

---

## 14) Attribution (for report)

> KUBERA is inspired by Markus (github.com/markus-global/markus, Apache-2.0) as architectural reference (Mailbox, Heartbeat, Task FSM described in Markus docs). KUBERA is a from-scratch Python/React implementation — no Markus code copied. Cite Markus, FastAPI, LiteLLM, ChromaDB in References.

---

**Next command after reading this doc:**

```powershell
Set-Location "C:\Users\kunda\Music\KUBERA\kubera"
docker-compose up --build -d
# Then start P1: backend/app/main.py hello world
```

