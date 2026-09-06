TRANSITIONS = {
    "pending": ["in_progress", "cancelled"],
    "in_progress": ["review", "cancelled"],
    "review": ["completed", "in_progress", "cancelled"],
    "completed": [],
    "cancelled": [],
}


def validate_transition(from_status: str, to_status: str) -> bool:
    return to_status in TRANSITIONS.get(from_status, [])
