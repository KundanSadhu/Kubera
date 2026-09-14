from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from app.core.config import settings

# Render: DATABASE_URL comes as postgresql:// — convert to asyncpg driver.
# Fallback to sqlite if postgres not available (dev convenience)
DATABASE_URL = settings.effective_database_url

engine = create_async_engine(DATABASE_URL, echo=False, future=True)
SessionLocal = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)


async def get_db():
    async with SessionLocal() as session:
        yield session
