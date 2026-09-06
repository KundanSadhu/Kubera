# KUBERA — Working Guide (Run, Debug, Deploy)

## 1. Prerequisites

- Node 20+ · pnpm 9+ OR npm 10+ · Python 3.11+ · Docker 24+ · Git
- Ollama (for local LLM): https://ollama.ai → `ollama pull llama3.1:8b`

## 2. One-Command (Docker — Recommended for Examiner)

```bash
git clone https://github.com/yourusername/kubera.git
cd kubera
cp .env.example .env   # edit JWT_SECRET, OPENAI_API_KEY if using
docker-compose up --build
# Wait for: postgres ready, chroma ready, backend uvicorn, frontend vite
```

| Service | URL |
|---|---|
| Frontend (Vite) | http://localhost:5173 |
| Backend (FastAPI) | http://localhost:8000 |
| Swagger | http://localhost:8000/docs |
| ReDoc | http://localhost:8000/redoc |
| Chroma | http://localhost:8001 |
| Health | http://localhost:8000/health |

Login `admin@kubera.local` / `kubera123` (seeded in `backend/app/seeds/seed.py`).

Stop: `docker-compose down` · Nuke volumes: `docker-compose down -v`

## 3. Manual (No Docker — Dev)

```bash
# Terminal 1: Postgres (or sqlite fallback)
# Option A: local postgres 16 (brew/apt) + create db kubera
# Option B: use sqlite fallback → set DATABASE_URL=sqlite:///./kubera.db in .env

# Terminal 2: Backend
cd backend
python -m venv venv
# Windows: venv\Scripts\activate
source venv/bin/activate
pip install -r requirements.txt
cp ../.env.example .env
alembic upgrade head
uvicorn app.main:app --reload --port 8000

# Terminal 3: Frontend
cd frontend
npm install   # or pnpm install
cp .env.example .env
npm run dev   # → http://localhost:5173

# Terminal 4: Ollama
ollama serve
ollama pull llama3.1:8b
```

## 4. Environment (`.env.example` → `.env`)

```
DATABASE_URL=postgresql+asyncpg://kubera:kubera@localhost:5432/kubera
# fallback: sqlite+aiosqlite:///./kubera.db

CHROMA_HOST=localhost
CHROMA_PORT=8001

JWT_SECRET=change-me-in-production-32chars
ADMIN_PASSWORD=kubera123
ADMIN_EMAIL=admin@kubera.local

OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b

OPENAI_API_KEY=sk-...          # only for demo
LITELLM_MODEL=openai/gpt-4o-mini
WHATSAPP_MODE=mock             # mock|live

CORS_ORIGINS=http://localhost:5173
```

- Change `JWT_SECRET` before any public deploy (mirrors Markus `markus.json.example` `gatewaySecret=change-me` warning).
- Never commit `.env` (gitignored).

## 5. Debugging

```bash
# Backend logs
docker-compose logs -f backend      # or uvicorn console
# Frontend
npm run dev -- --debug
# DB
psql postgresql://kubera:kubera@localhost:5432/kubera -c "select * from tasks limit 5;"
# Chroma
curl http://localhost:8001/api/v1/heartbeat
# Ollama
curl http://localhost:11434/api/tags
```

**Common fixes:**
- `alembic upgrade head` after pulling new migrations.
- `docker-compose build --no-cache backend` after `requirements.txt` change.
- Frontend 401 → check `localStorage.kubera_token` and `JWT_SECRET` match.

## 6. Ports

- `5432` Postgres, `6379` Redis (optional), `8001` Chroma, `8000` backend, `5173` frontend, `11434` Ollama (host).

## 7. Seeding & Test Data

```bash
cd backend
python -m app.seeds.seed   # tenants, admin user, 3 agents, 5 sample leads, 1 invoice
```

## 8. Verification Before Demo

```bash
# Backend
curl http://localhost:8000/health          # {"status":"ok","db":"up","chroma":"up"}
curl -H "Authorization: Bearer <token>" http://localhost:8000/api/crm/leads

# Frontend i18n
# Toggle EN/HI switch → verify translations in CRM, Invoices

# PWA
# Chrome DevTools → Application → Manifest → Install, then offline toggle
```

## 9. Deployment (Free Tier)

- **Render / Fly.io / AWS t3.small:** `docker-compose` single VM, `DATABASE_URL` from managed Postgres (Neon/Supabase free tier) if desired.
- Env: set `JWT_SECRET` via provider secrets, `OPENAI_API_KEY` only for demo window to control cost.
