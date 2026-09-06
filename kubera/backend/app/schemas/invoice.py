from pydantic import BaseModel


class InvoiceItemCreate(BaseModel):
    description: str
    hsn_code: str | None = None
    quantity: float = 1
    rate: float
    gst_rate: int = 18


class InvoiceCreate(BaseModel):
    customer_name: str
    customer_gstin: str | None = None
    items: list[InvoiceItemCreate]
    due_date: str | None = None
    status: str = "draft"
