from app.services.task_service import validate_transition


def test_valid():
    assert validate_transition("pending", "in_progress")
    assert validate_transition("in_progress", "review")
    assert validate_transition("review", "completed")


def test_invalid():
    assert not validate_transition("pending", "completed")
    assert not validate_transition("completed", "pending")
