from app.tools.registry import register


@register("invoice_create")
async def invoice_create(payload: dict, db) -> str:
    from app.models.invoice import Invoice, InvoiceItem
    from app.modules.invoicing.gst import calc_gst
    import uuid

    customer_name = payload.get("customer_name", "Unknown")
    items = payload.get("items", [])
    tenant_id = payload.get("tenant_id")
    amount = 0
    gst_amount = 0
    for it in items:
        a = it.get("quantity", 1) * it.get("rate", 0)
        g = calc_gst(a, it.get("gst_rate", 18), True)
        amount += a
        gst_amount += g["gst_amount"]
    total = amount + gst_amount
    inv_no = f"INV-KUBR-{uuid.uuid4().hex[:6].upper()}"
    inv = Invoice(invoice_number=inv_no, customer_name=customer_name, amount=round(amount, 2), gst_amount=round(gst_amount, 2), total=round(total, 2), tenant_id=tenant_id, status="draft")
    db.add(inv)
    await db.flush()
    for it in items:
        db.add(InvoiceItem(invoice_id=inv.id, description=it.get("description", ""), hsn_code=it.get("hsn_code"), quantity=it.get("quantity", 1), rate=it.get("rate", 0), gst_rate=it.get("gst_rate", 18), amount=it.get("quantity", 1) * it.get("rate", 0)))
    await db.commit()
    return f"Invoice {inv_no} created total ₹{total:.2f}"


@register("memory_search")
async def memory_search(payload: dict, db) -> str:
    query = payload.get("query", "")
    try:
        from app.memory.store import search_knowledge

        docs = await search_knowledge(query, top_k=3)
        return "\n".join(docs) or "No knowledge found"
    except Exception as e:
        return f"Search failed: {e}"
