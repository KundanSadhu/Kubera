from sqlalchemy.orm import DeclarativeBase
import uuid
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column


class Base(DeclarativeBase):
    pass


def gen_uuid() -> str:
    return str(uuid.uuid4())
