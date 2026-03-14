from fastapi import APIRouter, Query, Depends
from back.shared.src.shared.schemas import MetricsResponse, ModelMetrics, LatencyStats
from back.shared.src.shared.config import get_observability_settings, ObservabilitySettings
from services import prometheus_client

router = APIRouter(prefix="/metrics", tags=["metrics"])


@router.get("", response_model=MetricsResponse)
async def get_metrics(
    window: str = Query("1h", pattern="^[0-9]+[smhd]$"),
    settings: ObservabilitySettings = Depends(get_observability_settings),
):
    results = []
    for model in ["ollama/mistral", "ollama/llama3.1"]:
        raw = await prometheus_client.get_model_metrics(model=model, window=window)
        results.append(ModelMetrics(
            model=raw["model"],
            request_count=raw["request_count"],
            error_rate=raw["error_rate"],
            latency=LatencyStats(**raw["latency"]),
            avg_tokens_per_request=raw["avg_tokens_per_request"],
        ))
    return MetricsResponse(models=results, window=window)
