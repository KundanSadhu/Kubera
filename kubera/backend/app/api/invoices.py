from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import io
from app.db import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.invoice import Invoice, InvoiceItem
from app.schemas.invoice import InvoiceCreate
from app.modules.invoicing.gst import calc_gst
from app.modules.invoicing.pdf import generate_invoice_pdf

router = APIRouter()


def generate_invoice_number(tenant_code: str, seq: int) -> str:
    from datetime import datetime

    year = datetime.utcnow().year
    return f"INV-{tenant_code[:4].upper()}-{year}-{seq:04d}"


@router.get("/invoices")
async def list_invoices(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Invoice).where(Invoice.tenant_id == current_user.tenant_id).order_by(Invoice.created_at.desc()))
    invoices = result.scalars().all()
    return [{"id": i.id, "invoice_number": i.invoice_number, "customer_name": i.customer_name, "customer_gstin": i.customer_gstin, "amount": i.amount, "gst_amount": i.gst_amount, "total": i.total, "status": i.status, "created_at": i.created_at} for i in invoices]


@router.post("/invoices")
async def create_invoice(payload: InvoiceCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Calculate totals
    amount = 0
    gst_amount = 0
    for item in payload.items:
        item_amount = item.quantity * item.rate
        g = calc_gst(item_amount, item.gst_rate, intra_state=True)
        amount += item_amount
        gst_amount += g["gst_amount"] if "gst_amount" in g else (g["cgst"] + g["sgst"] + g["igst"])

    total = amount + gst_amount
    # Generate seq
    existing = await db.execute(select(Invoice).where(Invoice.tenant_id == current_user.tenant_id))
    seq = len(existing.scalars().all()) + 1
    tenant_code = (current_user.tenant_id or "KUBR")[:4]
    inv_no = generate_invoice_number(tenant_code, seq)

    invoice = Invoice(
        invoice_number=inv_no,
        customer_name=payload.customer_name,
        customer_gstin=payload.customer_gstin,
        amount=round(amount, 2),
        gst_amount=round(gst_amount, 2),
        total=round(total, 2),
        status=payload.status,
        tenant_id=current_user.tenant_id,
    )
    db.add(invoice)
    await db.flush()

    for item in payload.items:
        item_amount = item.quantity * item.rate
        db_item = InvoiceItem(
            invoice_id=invoice.id,
            description=item.description,
            hsn_code=item.hsn_code,
            quantity=item.quantity,
            rate=item.rate,
            gst_rate=item.gst_rate,
            amount=round(item_amount, 2),
        )
        db.add(db_item)

    await db.commit()
    await db.refresh(invoice)
    return {"id": invoice.id, "invoice_number": invoice.invoice_number, "amount": invoice.amount, "gst_amount": invoice.gst_amount, "total": invoice.total, "status": invoice.status}


@router.get("/invoices/{invoice_id}")
async def get_invoice(invoice_id: str, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Invoice).where(Invoice.id == invoice_id, Invoice.tenant_id == current_user.tenant_id))
    invoice = result.scalar_one_or_none()
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    items_res = await db.execute(select(InvoiceItem).where(InvoiceItem.invoice_id == invoice_id))
    items = [{"id": it.id, "description": it.description, "hsn_code": it.hsn_code, "quantity": it.quantity, "rate": it.rate, "gst_rate": it.gst_rate, "amount": it.amount} for it in items_res.scalars().all()]
    return {"id": invoice.id, "invoice_number": invoice.invoice_number, "customer_name": invoice.customer_name, "customer_gstin": invoice.customer_gstin, "amount": invoice.amount, "gst_amount": invoice.gst_amount, "total": invoice.total, "status": invoice.status, "items": items}


@router.get("/invoices/{invoice_id}/pdf")
async def invoice_pdf(invoice_id: str, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Invoice).where(Invoice.id == invoice_id, Invoice.tenant_id == current_user.tenant_id))
    invoice = result.scalar_one_or_none()
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    items_res = await db.execute(select(InvoiceItem).where(InvoiceItem.invoice_id == invoice_id))
    items = [{"description": it.description, "hsn_code": it.hsn_code or "-", "quantity": it.quantity, "rate": it.rate, "gst_rate": it.gst_rate, "amount": it.amount} for it in items_res.scalars().all()]
    pdf_bytes = generate_invoice_pdf(
        {
            "invoice_number": invoice.invoice_number,
            "customer_name": invoice.customer_name,
            "customer_gstin": invoice.customer_gstin or "-",
            "amount": invoice.amount,
            "gst_amount": invoice.gst_amount,
            "total": invoice.total,
            "created_at": str(invoice.created_at)[:10],
        },
        items,
    )
    return StreamingResponse(io.BytesIO(pdf_bytes), media_type="application/pdf", headers={"Content-Disposition": f"attachment; filename={invoice.invoice_number}.pdf"})


@router.get("/invoices/export/csv")
async def export_csv(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    import csv
    import io

    result = await db.execute(select(Invoice).where(Invoice.tenant_id == current_user.tenant_id))
    invoices = result.scalars().all()
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["invoice_number", "customer_name", "amount", "gst_amount", "total", "status"])
    for inv in invoices:
        writer.writerow([inv.invoice_number, inv.customer_name, inv.amount, inv.gst_amount, inv.total, inv.status])
    csv_bytes = output.getvalue().encode()
    return StreamingResponse(io.BytesIO(csv_bytes), media_type="text/csv", headers={"Content-Disposition": "attachment; filename=invoices.csv"})
