from enum import Enum


class AttentionState(str, Enum):
    IDLE = "idle"
    DECIDING = "deciding"
    FOCUSED = "focused"


# Heuristic: human_chat preempts everything; heartbeat defers if tasks pending
def should_preempt(current_type: str, incoming_type: str) -> bool:
    if incoming_type == "human_chat":
        return True
    if current_type == "heartbeat" and incoming_type in ("task_execution", "a2a_message"):
        return True
    return False


def should_defer(incoming_type: str, queue_size: int) -> bool:
    # Defer heartbeat if queue backed up
    if incoming_type == "heartbeat" and queue_size > 2:
        return True
    return False
