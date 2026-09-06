import asyncio
import json
from fastapi import APIRouter
from fastapi.responses import StreamingResponse

router = APIRouter()


async def event_gen(agent_id: str):
    # Simple SSE mock — in production, subscribe to mailbox events
    for i in range(3):
        await asyncio.sleep(2)
        yield f"data: {json.dumps({'agent_id': agent_id, 'event': 'heartbeat', 'tick': i})}\n\n"
    # Keep alive
    while True:
        await asyncio.sleep(15)
        yield f"data: {json.dumps({'agent_id': agent_id, 'event': 'ping'})}\n\n"


@router.get("/agents/{agent_id}/stream")
async def stream_agent(agent_id: str):
    return StreamingResponse(event_gen(agent_id), media_type="text/event-stream", headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})
