import asyncio
from sqlalchemy import select
from app.db import SessionLocal, engine
from app.models import Base, Tenant, User, Agent, Lead
from app.core.security import hash_password
from app.core.config import settings


async def seed():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    async with SessionLocal() as db:
        # Tenant
        res = await db.execute(select(Tenant).limit(1))
        tenant = res.scalar_one_or_none()
        if not tenant:
            tenant = Tenant(name="KUBERA Demo Org", gstin="29ABCDE1234F1Z5", address="Bengaluru", phone="9876543210")
            db.add(tenant)
            await db.flush()
            print(f"Tenant {tenant.id}")

        # Admin
        res = await db.execute(select(User).where(User.email == settings.admin_email))
        if not res.scalar_one_or_none():
            user = User(email=settings.admin_email, password_hash=hash_password(settings.admin_password), name="Admin", role="owner", tenant_id=tenant.id)
            db.add(user)
            await db.flush()
            print(f"Admin {user.email}")

        # Agents
        agents_data = [("Sales Guru", "sales-guru"), ("Accountant Ji", "accountant-ji"), ("Kubera Bot", "kubera-bot")]
        for name, role in agents_data:
            res = await db.execute(select(Agent).where(Agent.name == name, Agent.tenant_id == tenant.id))
            if not res.scalar_one_or_none():
                db.add(Agent(name=name, role=role, status="active", tenant_id=tenant.id))
                print(f"Agent {name}")

        # Sample leads
        res = await db.execute(select(Lead).limit(1))
        if not res.scalar_one_or_none():
            for n, p in [("Ravi Hyderabad", "W-001"), ("Priya Mumbai", "W-002"), ("Aman Delhi", "Ref")]:
                db.add(Lead(name=n.split()[0], email=f"{n.split()[0].lower()}@example.com", phone="9"+str(abs(hash(n))%9000000000+1000000000)[:10], source=p, status="new", tenant_id=tenant.id))
            print("Sample leads added")

        await db.commit()
        print("Seed done.")


if __name__ == "__main__":
    asyncio.run(seed())
