import asyncio
from sqlalchemy import select
from app.agents.mailbox import get_mailbox
from app.agents.context import build_context
from app.core.limits import COMPLETION_MARKER


class AgentRuntime:
    def __init__(self, agent, db_session_factory):
        self.agent = agent
        self.db_session_factory = db_session_factory
        self.mailbox = get_mailbox(agent.id)

    async def handle_once(self, item) -> str:
        # Build minimal context and call LLM
        role = self.agent.role
        tenant_id = self.agent.tenant_id or "default"
        user_message = item.payload.get("prompt") or item.payload.get("text") or str(item.payload)

        # Fetch notebook + tasks for context (best effort)
        notebook = []
        my_tasks = []
        knowledge = []
        try:
            async with self.db_session_factory() as db:
                from app.models.notebook import NotebookEntry
                from app.models.task import Task

                nb_res = await db.execute(select(NotebookEntry).where(NotebookEntry.agent_id == self.agent.id).limit(4))
                notebook = nb_res.scalars().all()
                task_res = await db.execute(select(Task).where(Task.assigned_agent_id == self.agent.id, Task.status.in_(["pending", "in_progress"])).limit(5))
                my_tasks = task_res.scalars().all()
                # knowledge via chroma optional
                try:
                    from app.memory.store import search_knowledge

                    knowledge = await search_knowledge(user_message, top_k=3)
                except Exception:
                    knowledge = []
        except Exception:
            pass

        prompt = build_context(role, tenant_id, None, knowledge, notebook, my_tasks, user_message, COMPLETION_MARKER)

        # Tool loop: single LLM call MVP
        try:
            from app.llm.router import call_llm

            response = await call_llm(prompt, system=f"You are {self.agent.name}, role {self.agent.role}. Be concise.")
            # Check for completion marker
            if COMPLETION_MARKER not in response:
                response = response + f"\n{COMPLETION_MARKER}"
            return response
        except Exception as e:
            return f"[MOCK:{self.agent.name}] Processed {item.type}: {user_message[:200]} (LLM unavailable: {e}) {COMPLETION_MARKER}"
