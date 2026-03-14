import asyncio
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.ab import router as ab_router
from jobs.eval_runner import start_batch_loop, start_realtime_consumer
from back.shared.src.shared.config import get_evaluation_settings

logging.basicConfig(level=logging.INFO)
settings = get_evaluation_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    tasks = [
        asyncio.create_task(start_realtime_consumer()),
        asyncio.create_task(start_batch_loop()),
    ]
    yield
    for task in tasks:
        task.cancel()


app = FastAPI(
    title="LLM Evaluation",
    description="Scoring DeepEval, consumer Redis, A/B test",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ab_router)


@app.get("/health")
async def health():
    return {"service": "evaluation", "status": "ok"}