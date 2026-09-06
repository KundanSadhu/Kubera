from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.agent import Agent

router = APIRouter()


@router.get("/agents")
async def list_agents(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Agent).where(Agent.tenant_id == current_user.tenant_id))
    agents = result.scalars().all()
    return [{"id": a.id, "name": a.name, "role": a.role, "status": a.status, "created_at": a.created_at} for a in agents]


@router.post("/agents")
async def create_agent(payload: dict, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    name = payload.get("name")
    role = payload.get("role", "kubera-bot")
    if not name:
        raise HTTPException(status_code=400, detail="name required")
    if role not in ["sales-guru", "accountant-ji", "kubera-bot"]:
        raise HTTPException(status_code=400, detail="invalid role")
    agent = Agent(name=name, role=role, status="active", tenant_id=current_user.tenant_id, config_json=payload.get("config_json"))
    db.add(agent)
    await db.commit()
    await db.refresh(agent)
    return {"id": agent.id, "name": agent.name, "role": agent.role, "status": agent.status}


@router.get("/agents/{agent_id}")
async def get_agent(agent_id: str, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Agent).where(Agent.id == agent_id, Agent.tenant_id == current_user.tenant_id))
    agent = result.scalar_one_or_none()
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    return {"id": agent.id, "name": agent.name, "role": agent.role, "status": agent.status, "created_at": agent.created_at}


@router.post("/agents/{agent_id}/execute")
async def execute_agent(agent_id: str, payload: dict, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    # MVP: enqueue task_execution via mailbox or direct LLM call stub
    result = await db.execute(select(Agent).where(Agent.id == agent_id, Agent.tenant_id == current_user.tenant_id))
    agent = result.scalar_one_or_none()
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    prompt = payload.get("prompt", "")
    if not prompt:
        raise HTTPException(status_code=400, detail="prompt required")
    # For MVP, call LLM router if available, else echo
    try:
        from app.llm.router import call_llm

        response = await call_llm(prompt, system=f"You are {agent.name}, role {agent.role}")
        return {"agent_id": agent_id, "prompt": prompt, "response": response}
    except Exception as e:
        return {"agent_id": agent_id, "prompt": prompt, "response": f"[MOCK] {agent.name} received: {prompt} (LLM unavailable: {e})"}


@router.post("/agents/{agent_id}/stop")
async def stop_agent(agent_id: str, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Agent).where(Agent.id == agent_id, Agent.tenant_id == current_user.tenant_id))
    agent = result.scalar_one_or_none()
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    agent.status = "offline"
    await db.commit()
    return {"id": agent.id, "status": agent.status}


@router.post("/agents/{agent_id}/message")
async def message_agent(agent_id: str, payload: dict, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    # A2A deterministic key: dm:a2a:{sorted}
    try:
        from app.agents.a2a import send_message

        text = payload.get("text", "")
        sender_id = payload.get("sender_id", agent_id)
        return await send_message(sender_id, agent_id, text, db)
    except Exception as e:
        return {"status": "queued", "note": f"mock a2a: {e}", "text": payload.get("text", "")}
