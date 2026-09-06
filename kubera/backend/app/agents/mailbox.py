import asyncio
import time
import uuid
from enum import IntEnum
from dataclasses import dataclass, field


class Priority(IntEnum):
    CRITICAL = 0
    NORMAL = 1
    LOW = 2


TYPE_PRIORITY = {
    "human_chat": Priority.CRITICAL,
    "task_execution": Priority.NORMAL,
    "a2a_message": Priority.NORMAL,
    "system": Priority.NORMAL,
    "heartbeat": Priority.LOW,
}


@dataclass(order=True)
class MailboxItem:
    priority: int
    created_at: float = field(compare=False)
    id: str = field(compare=False)
    type: str = field(compare=False)
    payload: dict = field(compare=False)


class Mailbox:
    def __init__(self):
        self._queue: asyncio.PriorityQueue = asyncio.PriorityQueue()
        self._seen: set[str] = set()

    async def enqueue(self, type: str, payload: dict) -> str:
        priority = int(TYPE_PRIORITY.get(type, Priority.NORMAL))
        item = MailboxItem(priority=priority, created_at=time.time(), id=str(uuid.uuid4()), type=type, payload=payload)
        await self._queue.put(item)
        return item.id

    async def dequeue(self) -> MailboxItem:
        return await self._queue.get()

    def peek(self):
        # Not directly supported; for attention heuristic we use qsize
        return None

    def size(self) -> int:
        return self._queue.qsize()

    def is_empty(self) -> bool:
        return self._queue.empty()


# Global per-agent mailboxes
_mailboxes: dict[str, Mailbox] = {}


def get_mailbox(agent_id: str) -> Mailbox:
    if agent_id not in _mailboxes:
        _mailboxes[agent_id] = Mailbox()
    return _mailboxes[agent_id]
