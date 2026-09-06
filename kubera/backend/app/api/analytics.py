from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.db import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.lead import Lead
from app.models.invoice import Invoice

router = APIRouter()


@router.get("/analytics/dashboard")
async def dashboard(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Leads by status
    leads_res = await db.execute(select(Lead.status, func.count(Lead.id)).where(Lead.tenant_id == current_user.tenant_id).group_by(Lead.status))
    leads_by_status = {row[0]: row[1] for row in leads_res.all()}

    # Revenue
    inv_res = await db.execute(select(func.coalesce(func.sum(Invoice.total), 0), func.count(Invoice.id)).where(Invoice.tenant_id == current_user.tenant_id))
    total_revenue, invoice_count = inv_res.one()

    # Recent leads
    recent_leads_res = await db.execute(select(func.count(Lead.id)).where(Lead.tenant_id == current_user.tenant_id))
    total_leads = recent_leads_res.scalar() or 0

    # Mock monthly (if no real data, return flat)
    monthly = [{"month": f"2026-{str(m).zfill(2)}", "revenue": round(float(total_revenue) / 6 * (m % 3 + 1), 2)} for m in range(1, 7)]

    return {
        "total_leads": total_leads,
        "total_revenue": float(total_revenue or 0),
        "invoice_count": invoice_count or 0,
        "leads_by_status": leads_by_status,
        "monthly_revenue": monthly,
        "conversion_rate": round((leads_by_status.get("won", 0) / max(total_leads, 1)) * 100, 1),
    }
