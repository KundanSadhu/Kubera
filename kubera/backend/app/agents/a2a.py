from sqlalchemy import select
from app.models.task import TaskComment


def a2a_key(id1: str, id2: str) -> str:
    a, b = sorted([str(id1), str(id2)])
    return f"dm:a2a:{a}:{b}"


async def send_message(sender_id: str, receiver_id: str, text: str, db):
    key = a2a_key(sender_id, receiver_id)
    # Store as task_comment on a synthetic task or just log via notebook; MVP: create a comment on latest task or store in whatsapp-like log
    # For MVP, create a TaskComment with task_id = receiver's latest task or synthetic
    # Simpler: just return queued
    # Try to find any task for receiver to attach to
    result = await db.execute(select(__import__("app.models.agent", fromlist=["Agent"]).Agent).where(__import__("app.models.agent", fromlist=["Agent"]).Agent.id == receiver_id))
    if not result.scalar_one_or_none():
        return {"status": "error", "detail": "receiver not found"}
    # Store as generic comment (using first task if exists, else create synthetic task)
    from app.models.task import Task

    task_res = await db.execute(select(Task).where(Task.assigned_agent_id == receiver_id).limit(1))
    task = task_res.scalar_one_or_none()
    if not task:
        task = Task(title=f"A2A from {sender_id}", description=text, assigned_agent_id=receiver_id, status="pending")
        db.add(task)
        await db.flush()
    comment = TaskComment(task_id=task.id, author_type="agent", author_id=sender_id, body=f"[A2A {key}] {text}")
    db.add(comment)
    await db.commit()
    # Also enqueue to receiver mailbox
    from app.agents.mailbox import get_mailbox

    mbox = get_mailbox(receiver_id)
    await mbox.enqueue("a2a_message", {"from": sender_id, "text": text, "key": key})
    return {"status": "sent", "key": key, "text": text}
