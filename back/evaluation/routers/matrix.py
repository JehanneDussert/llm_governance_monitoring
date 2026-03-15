from fastapi import APIRouter
import json
import redis.asyncio as aioredis
from shared.config import get_evaluation_settings
from services.judge_config import get_judge_config

router = APIRouter(prefix="/matrix", tags=["matrix"])
settings = get_evaluation_settings()
models = settings.ab_models


@router.get("")
async def get_matrix():
    """
    Retourne la matrice use_case × model avec les scores moyens.
    Structure : { use_case_id: { model: { avg_score, sample_size, trend } } }
    """
    config = await get_judge_config()
    r = await aioredis.from_url(settings.redis_url, decode_responses=True)

    matrix = {}

    try:
        for use_case in config.use_cases:
            matrix[use_case.id] = {
                "label": use_case.label,
                "models": {}
            }
            for model in models:
                key = f"eval:scores:{model}:{use_case.id}"
                raw = await r.get(key)
                if not raw:
                    matrix[use_case.id]["models"][model] = {
                        "avg_score": None,
                        "sample_size": 0,
                        "trend": None,
                        "scores": [],
                    }
                    continue

                scores = json.loads(raw)
                values = [s["score"] for s in scores]
                avg = round(sum(values) / len(values), 3) if values else None

                # Trend : compare première moitié vs deuxième moitié
                trend = None
                if len(values) >= 4:
                    mid = len(values) // 2
                    first_half = sum(values[:mid]) / mid
                    second_half = sum(values[mid:]) / (len(values) - mid)
                    diff = second_half - first_half
                    if diff > 0.05:
                        trend = "up"
                    elif diff < -0.05:
                        trend = "down"
                    else:
                        trend = "stable"

                matrix[use_case.id]["models"][model] = {
                    "avg_score": avg,
                    "sample_size": len(values),
                    "trend": trend,
                    "scores": values[-10:],  # derniers 10 pour sparkline
                }
    finally:
        await r.aclose()

    return matrix