from app.tools.registry import register
from sqlalchemy import select


@register("crm_list_leads")
async def crm_list_leads(payload: dict, db) -> str:
    from app.models.lead import Lead

    tenant_id = payload.get("tenant_id")
    q = select(Lead)
    if tenant_id:
        q = q.where(Lead.tenant_id == tenant_id)
    result = await db.execute(q.limit(20))
    leads = result.scalars().all()
    return "\n".join([f"- {l.name} ({l.status}) {l.phone or ''}" for l in leads]) or "No leads"


@register("crm_update_lead")
async def crm_update_lead(payload: dict, db) -> str:
    from app.models.lead import Lead

    lead_id = payload.get("lead_id")
    status = payload.get("status")
    if not lead_id or not status:
        return "Missing lead_id or status"
    result = await db.execute(select(Lead).where(Lead.id == lead_id))
    lead = result.scalar_one_or_none()
    if not lead:
        return "Lead not found"
    lead.status = status
    await db.commit()
    return f"Lead {lead.name} updated to {status}"
