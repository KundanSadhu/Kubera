from pydantic import BaseModel


class LeadCreate(BaseModel):
    name: str
    email: str | None = None
    phone: str | None = None
    source: str | None = None
    status: str = "new"
    assigned_agent_id: str | None = None


class LeadUpdate(BaseModel):
    status: str | None = None
    assigned_agent_id: str | None = None
    name: str | None = None
    email: str | None = None
    phone: str | None = None
