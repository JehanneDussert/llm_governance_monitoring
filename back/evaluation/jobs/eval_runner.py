import asyncio
import logging
from back.shared.src.shared.config import get_evaluation_settings
from back.shared.src.shared.schemas import LLMEvent
from services.langfuse_client import get_traces, push_score
from services.redis_consumer import consume_events
from deepeval.metrics import AnswerRelevancyMetric
from deepeval.test_case import LLMTestCase

logger = logging.getLogger(__name__)
settings = get_evaluation_settings()


async def _score(input_text: str, output_text: str) -> float | None:
    """
    Calcule un score de pertinence via DeepEval.
    Utilise Ollama comme juge local pour rester souverain —
    remplace model="ollama/mistral" par "gpt-3.5-turbo" si tu veux
    utiliser OpenAI comme juge à la place.
    """
    try:
        if not input_text or not output_text:
            return None

        test_case = LLMTestCase(input=input_text, actual_output=output_text)
        metric = AnswerRelevancyMetric(threshold=0.5, model="ollama/mistral")
        metric.measure(test_case)
        return metric.score

    except Exception as e:
        logger.warning(f"DeepEval scoring failed: {e}")
        return None


async def handle_event(event: LLMEvent) -> None:
    """
    Handler appelé par redis_consumer pour chaque event llm.events.
    Score la réponse et pousse le résultat dans Langfuse.
    """
    logger.info(f"Scoring event {event.trace_id} — model={event.model}")
    score = await _score(event.input, event.output)
    if score is not None:
        await push_score(event.trace_id, score)
        logger.info(f"Scored {event.trace_id}: {score:.3f}")


async def run_batch_job() -> None:
    """
    Job batch horaire : score les traces Langfuse sans score existant.
    Complémentaire au scoring temps-réel via Redis.
    """
    logger.info("Batch eval job started")
    traces = await get_traces(limit=30)
    unscored = [t for t in traces if not t.get("scores")]
    logger.info(f"{len(unscored)} unscored traces found")

    for trace in unscored:
        input_text = str(trace.get("input", ""))
        output_text = str(trace.get("output", ""))
        score = await _score(input_text, output_text)
        if score is not None:
            await push_score(trace["id"], score)
            logger.info(f"Batch scored {trace['id']}: {score:.3f}")

    logger.info("Batch eval job done")


async def start_batch_loop() -> None:
    """Boucle infinie du job batch — lancé au démarrage via lifespan."""
    while True:
        try:
            await run_batch_job()
        except Exception as e:
            logger.error(f"Batch job error: {e}")
        await asyncio.sleep(settings.eval_interval_seconds)


async def start_realtime_consumer() -> None:
    """Lance le consumer Redis temps-réel — lancé au démarrage via lifespan."""
    await consume_events(handle_event)
