from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.lead import Lead
from app.schemas.crm import LeadCreate, LeadUpdate

router = APIRouter()


@router.get("/crm/leads")
async def list_leads(status: str | None = None, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    q = select(Lead).where(Lead.tenant_id == current_user.tenant_id).order_by(Lead.created_at.desc())
    if status:
        q = q.where(Lead.status == status)
    result = await db.execute(q)
    leads = result.scalars().all()
    return [{"id": l.id, "name": l.name, "email": l.email, "phone": l.phone, "source": l.source, "status": l.status, "assigned_agent_id": l.assigned_agent_id, "created_at": l.created_at} for l in leads]


@router.post("/crm/leads")
async def create_lead(payload: LeadCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    lead = Lead(
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        source=payload.source,
        status=payload.status,
        assigned_agent_id=payload.assigned_agent_id,
        tenant_id=current_user.tenant_id,
    )
    db.add(lead)
    await db.commit()
    await db.refresh(lead)
    # Auto-create task for Sales Guru if agent assigned
    if lead.assigned_agent_id:
        from app.models.task import Task

        task = Task(title=f"Qualify lead: {lead.name}", description=f"Follow up with {lead.name} ({lead.phone})", assigned_agent_id=lead.assigned_agent_id, tenant_id=current_user.tenant_id, status="pending")
        db.add(task)
        await db.commit()
    return {"id": lead.id, "name": lead.name, "status": lead.status}


@router.get("/crm/leads/{lead_id}")
async def get_lead(lead_id: str, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Lead).where(Lead.id == lead_id, Lead.tenant_id == current_user.tenant_id))
    lead = result.scalar_one_or_none()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"id": lead.id, "name": lead.name, "email": lead.email, "phone": lead.phone, "source": lead.source, "status": lead.status}


@router.put("/crm/leads/{lead_id}")
async def update_lead(lead_id: str, payload: LeadUpdate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Lead).where(Lead.id == lead_id, Lead.tenant_id == current_user.tenant_id))
    lead = result.scalar_one_or_none()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    if payload.status:
        lead.status = payload.status
    if payload.assigned_agent_id is not None:
        lead.assigned_agent_id = payload.assigned_agent_id
    if payload.name:
        lead.name = payload.name
    if payload.email is not None:
        lead.email = payload.email
    if payload.phone is not None:
        lead.phone = payload.phone
    await db.commit()
    await db.refresh(lead)
    return {"id": lead.id, "status": lead.status}
