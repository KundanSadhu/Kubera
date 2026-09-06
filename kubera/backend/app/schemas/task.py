from pydantic import BaseModel


class TaskCreate(BaseModel):
    title: str
    description: str | None = None
    priority: str = "medium"
    assigned_agent_id: str | None = None
    tenant_id: str | None = None


class TaskUpdateStatus(BaseModel):
    status: str  # pending|in_progress|review|completed|cancelled


class TaskSubmitReview(BaseModel):
    summary: str | None = None
