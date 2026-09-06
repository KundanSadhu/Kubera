from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import settings
from app.db import engine
from app.models import Base
from app.api import auth, agents, tasks, crm, invoices, whatsapp, stream, analytics


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables on startup (MVP — Alembic for prod later)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    # Start heartbeat scheduler
    try:
        from app.agents.heartbeat import start_scheduler

        start_scheduler()
    except Exception:
        pass
    yield


app = FastAPI(title="KUBERA API", version="0.1.0-mvp", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list + ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api", tags=["auth"])
app.include_router(agents.router, prefix="/api", tags=["agents"])
app.include_router(tasks.router, prefix="/api", tags=["tasks"])
app.include_router(crm.router, prefix="/api", tags=["crm"])
app.include_router(invoices.router, prefix="/api", tags=["invoices"])
app.include_router(whatsapp.router, prefix="/api", tags=["whatsapp"])
app.include_router(stream.router, prefix="/api", tags=["stream"])
app.include_router(analytics.router, prefix="/api", tags=["analytics"])


@app.get("/")
async def root():
    return {"name": "KUBERA", "version": "0.1.0-mvp", "docs": "/docs"}


@app.get("/health")
async def health():
    # Basic health — DB check optional
    try:
        async with engine.begin() as conn:
            await conn.execute(__import__("sqlalchemy").text("SELECT 1"))
        db_status = "up"
    except Exception as e:
        db_status = f"down: {e}"
    return {"status": "ok", "db": db_status, "chroma": "up" if settings.chroma_host else "down"}
