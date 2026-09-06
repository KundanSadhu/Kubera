from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.task import Task, TaskComment
from app.schemas.task import TaskCreate, TaskUpdateStatus
from app.services.task_service import TRANSITIONS, validate_transition

router = APIRouter()


@router.get("/tasks")
async def list_tasks(status: str | None = None, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    q = select(Task).where(Task.tenant_id == current_user.tenant_id)
    if status:
        q = q.where(Task.status == status)
    q = q.order_by(Task.created_at.desc())
    result = await db.execute(q)
    tasks = result.scalars().all()
    return [{"id": t.id, "title": t.title, "description": t.description, "status": t.status, "priority": t.priority, "assigned_agent_id": t.assigned_agent_id, "reviewer_id": t.reviewer_id, "created_at": t.created_at, "updated_at": t.updated_at} for t in tasks]


@router.post("/tasks")
async def create_task(payload: TaskCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    task = Task(
        title=payload.title,
        description=payload.description,
        priority=payload.priority,
        assigned_agent_id=payload.assigned_agent_id,
        tenant_id=current_user.tenant_id,
        status="pending",
    )
    db.add(task)
    await db.commit()
    await db.refresh(task)
    return {"id": task.id, "title": task.title, "status": task.status}


@router.get("/tasks/{task_id}")
async def get_task(task_id: str, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Task).where(Task.id == task_id, Task.tenant_id == current_user.tenant_id))
    task = result.scalar_one_or_none()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    comments_res = await db.execute(select(TaskComment).where(TaskComment.task_id == task_id).order_by(TaskComment.created_at.asc()))
    comments = [{"id": c.id, "body": c.body, "author_type": c.author_type, "created_at": c.created_at} for c in comments_res.scalars().all()]
    return {"id": task.id, "title": task.title, "description": task.description, "status": task.status, "priority": task.priority, "assigned_agent_id": task.assigned_agent_id, "reviewer_id": task.reviewer_id, "comments": comments}


@router.put("/tasks/{task_id}/status")
async def update_task_status(task_id: str, payload: TaskUpdateStatus, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Task).where(Task.id == task_id, Task.tenant_id == current_user.tenant_id))
    task = result.scalar_one_or_none()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if not validate_transition(task.status, payload.status):
        raise HTTPException(status_code=400, detail=f"Invalid transition {task.status} -> {payload.status}")
    # Reviewer check
    if task.status == "review" and payload.status == "completed":
        if task.assigned_agent_id and str(task.assigned_agent_id) == str(current_user.id):
            raise HTTPException(status_code=400, detail="Reviewer cannot be worker")
        task.reviewer_id = current_user.id
    task.status = payload.status
    await db.commit()
    await db.refresh(task)
    return {"id": task.id, "status": task.status}


@router.post("/tasks/{task_id}/submit-review")
async def submit_review(task_id: str, payload: dict, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Task).where(Task.id == task_id, Task.tenant_id == current_user.tenant_id))
    task = result.scalar_one_or_none()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if not validate_transition(task.status, "review"):
        raise HTTPException(status_code=400, detail=f"Cannot submit review from {task.status}")
    summary = payload.get("summary", "")
    if summary:
        comment = TaskComment(task_id=task_id, author_type="agent", author_id=task.assigned_agent_id, body=summary)
        db.add(comment)
    task.status = "review"
    await db.commit()
    return {"id": task.id, "status": task.status}


@router.post("/tasks/{task_id}/comments")
async def add_comment(task_id: str, payload: dict, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Task).where(Task.id == task_id, Task.tenant_id == current_user.tenant_id))
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Task not found")
    body = payload.get("body", "")
    if not body:
        raise HTTPException(status_code=400, detail="body required")
    comment = TaskComment(task_id=task_id, author_type="human", author_id=current_user.id, body=body)
    db.add(comment)
    await db.commit()
    await db.refresh(comment)
    return {"id": comment.id, "body": comment.body}
