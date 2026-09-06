import asyncio
import random
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.agents.mailbox import get_mailbox
from app.core.limits import HEARTBEAT_INTERVAL_MIN, HEARTBEAT_JITTER_SEC

scheduler = AsyncIOScheduler()


async def heartbeat_tick(agent_id: str):
    mailbox = get_mailbox(agent_id)
    await mailbox.enqueue("heartbeat", {"agent_id": agent_id, "check_tasks": True})


def start_heartbeat_for_agent(agent_id: str):
    # Stagger with jitter
    jitter = random.randint(0, HEARTBEAT_JITTER_SEC)
    scheduler.add_job(
        heartbeat_tick,
        "interval",
        minutes=HEARTBEAT_INTERVAL_MIN,
        args=[agent_id],
        id=f"hb-{agent_id}",
        replace_existing=True,
        next_run_time=None,
    )
    # Trigger first after jitter
    scheduler.add_job(heartbeat_tick, "date", args=[agent_id], id=f"hb-first-{agent_id}", replace_existing=True)


def start_scheduler():
    if not scheduler.running:
        scheduler.start()
