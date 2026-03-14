import json
from fastapi import APIRouter, Query
from back.shared.src.shared.schemas import TracesResponse, TraceItem
from services.langfuse_client import get_traces_with_scores

router = APIRouter(prefix="/traces", tags=["traces"])


def _extract_model(trace: dict) -> str:
    """
    La trace parente LiteLLM ne contient pas le modèle directement.
    On essaie quand même plusieurs endroits, sinon on retourne "ollama" 
    comme fallback lisible (toutes nos traces viennent d'Ollama).
    """
    metadata = trace.get("metadata") or {}
    for key in ("model", "model_group", "deployment"):
        if metadata.get(key):
            return metadata[key]

    raw_input = trace.get("input")
    if isinstance(raw_input, dict):
        for key in ("model", "model_group", "deployment"):
            if raw_input.get(key):
                return raw_input[key]

    # Fallback : le nom de la trace est "litellm-acompletion"
    # On retourne "ollama" car c'est notre seul provider configuré
    name = trace.get("name", "")
    if "litellm" in name:
        return "ollama/mistral"
    return name or "unknown"


@router.get("", response_model=TracesResponse)
async def get_traces(
    limit: int = Query(50, ge=1, le=200),
    model: str | None = Query(None),
):
    raw = await get_traces_with_scores(limit=limit, model_filter=None)

    traces = []
    for t in raw:
        detected_model = _extract_model(t)
        if model and model not in detected_model:
            continue
        traces.append(TraceItem(
            trace_id=t["id"],
            model=detected_model,
            input_preview=str(t.get("input", ""))[:100],
            output_preview=str(t.get("output", ""))[:100],
            latency_ms=t.get("latency") or 0,
            eval_score=t.get("eval_score"),
            timestamp=t.get("timestamp", ""),
        ))

    return TracesResponse(traces=traces, total=len(traces))
