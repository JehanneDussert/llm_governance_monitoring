from pydantic import BaseModel
from typing import Optional


# ── Chat ──────────────────────────────────────────────────────

class ChatMessage(BaseModel):
    role: str = "user"
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]
    model: Optional[str] = None
    stream: bool = True
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    content: str
    model: str
    usage: dict
    latency_ms: float


# ── Redis event (gateway → evaluation) ───────────────────────

class LLMEvent(BaseModel):
    trace_id: str
    model: str
    input: str
    output: str
    latency_ms: float
    usage: dict
    timestamp: str


# ── Metrics ───────────────────────────────────────────────────

class LatencyStats(BaseModel):
    p50_ms: float
    p95_ms: float
    p99_ms: float


class ModelMetrics(BaseModel):
    model: str
    request_count: int
    error_rate: float
    latency: LatencyStats
    avg_tokens_per_request: float


class MetricsResponse(BaseModel):
    models: list[ModelMetrics]
    window: str


# ── Traces ────────────────────────────────────────────────────

class TraceItem(BaseModel):
    trace_id: str
    model: str
    input_preview: str
    output_preview: str
    latency_ms: float
    eval_score: Optional[float] = None
    timestamp: str


class TracesResponse(BaseModel):
    traces: list[TraceItem]
    total: int


# ── A/B Test ──────────────────────────────────────────────────

class ModelABStats(BaseModel):
    model: str
    sample_size: int
    avg_latency_ms: float
    avg_eval_score: Optional[float] = None
    error_rate: float
    avg_tokens: float


class ABTestResponse(BaseModel):
    model_a: ModelABStats
    model_b: ModelABStats
    window: str
    winner: Optional[str] = None
