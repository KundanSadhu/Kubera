from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db import get_db
from app.models.whatsapp import WhatsAppMessage
from app.core.config import settings

router = APIRouter()


@router.post("/whatsapp/webhook")
async def whatsapp_webhook(payload: dict, db: AsyncSession = Depends(get_db)):
    phone = payload.get("phone", payload.get("from", "unknown"))
    body = payload.get("body", payload.get("message", payload.get("text", "")))
    msg = WhatsAppMessage(phone=phone, body=body, direction="inbound", status="received")
    db.add(msg)
    await db.commit()

    # Mock auto-reply if enabled - fast fallback, no LLM hang
    reply = None
    if settings.whatsapp_mode == "mock" and body:
        # Skip LLM if Ollama not reachable to avoid 60s timeout on local
        reply_text = f"Thanks for contacting KUBERA! We received: {body} (auto-reply mock)"
        # Try LLM with short timeout only if OPENAI key present
        if settings.openai_api_key:
            try:
                import asyncio
                from app.llm.router import call_llm

                reply_text = await asyncio.wait_for(
                    call_llm(f"Reply as Sales Guru to WhatsApp from {phone}: {body}", system="You are Sales Guru, concise WhatsApp reply."),
                    timeout=3.0,
                )
            except Exception:
                pass  # keep mock reply
        outbound = WhatsAppMessage(phone=phone, body=reply_text, direction="outbound", status="sent")
        db.add(outbound)
        await db.commit()
        reply = reply_text

    await db.refresh(msg)
    return {"id": msg.id, "status": msg.status, "reply": reply}


@router.get("/whatsapp/messages")
async def list_messages(phone: str | None = None, db: AsyncSession = Depends(get_db)):
    q = select(WhatsAppMessage).order_by(WhatsAppMessage.created_at.desc()).limit(50)
    if phone:
        q = q.where(WhatsAppMessage.phone == phone)
    result = await db.execute(q)
    msgs = result.scalars().all()
    return [{"id": m.id, "phone": m.phone, "body": m.body, "direction": m.direction, "status": m.status, "created_at": m.created_at} for m in msgs]
