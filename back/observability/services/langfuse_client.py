import base64
import httpx
from back.shared.src.shared.config import get_observability_settings

settings = get_observability_settings()


def _auth_header() -> dict:
    token = base64.b64encode(
        f"{settings.langfuse_public_key}:{settings.langfuse_secret_key}".encode()
    ).decode()
    return {"Authorization": f"Basic {token}"}


async def get_traces(limit: int = 50, model_filter: str | None = None) -> list[dict]:
    async with httpx.AsyncClient(timeout=30) as client:
        r = await client.get(
            f"{settings.langfuse_host}/api/public/traces",
            headers=_auth_header(),
            params={"limit": limit},
        )
        r.raise_for_status()
        traces = r.json().get("data", [])

    if model_filter:
        traces = [
            t for t in traces
            if (t.get("metadata") or {}).get("model") == model_filter
        ]
    return traces


async def get_trace_scores(trace_id: str) -> list[dict]:
    async with httpx.AsyncClient(timeout=15) as client:
        r = await client.get(
            f"{settings.langfuse_host}/api/public/scores",
            headers=_auth_header(),
            params={"traceId": trace_id},
        )
        r.raise_for_status()
    return r.json().get("data", [])


async def get_traces_with_scores(
    limit: int = 50,
    model_filter: str | None = None,
) -> list[dict]:
    traces = await get_traces(limit=limit, model_filter=model_filter)
    for trace in traces:
        scores = await get_trace_scores(trace["id"])
        trace["eval_score"] = next(
            (s["value"] for s in scores if s.get("name") in ("hallucination", "overall", "answer_relevancy")),
            None,
        )
    return traces