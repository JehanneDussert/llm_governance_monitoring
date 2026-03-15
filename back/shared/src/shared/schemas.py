from pydantic import BaseModel
from typing import Literal


# ── Chat ──────────────────────────────────────────────────────

class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]
    model: str
    stream: bool = False


class ChatResponse(BaseModel):
    content: str
    model: str
    latency_ms: float


# ── Events ────────────────────────────────────────────────────

class LLMEvent(BaseModel):
    trace_id: str
    model: str
    latency_ms: float
    input_tokens: int
    output_tokens: int
    success: bool


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
    eval_score: float | None
    timestamp: str


class TracesResponse(BaseModel):
    traces: list[TraceItem]
    total: int


# ── A/B Test ──────────────────────────────────────────────────

class ModelABStats(BaseModel):
    model: str
    sample_size: int
    avg_latency_ms: float
    avg_eval_score: float | None = None
    error_rate: float
    avg_tokens: float


class ABTestResponse(BaseModel):
    model_a: ModelABStats
    model_b: ModelABStats
    window: str
    winner: str | None


# ── Judge config ──────────────────────────────────────────────

CriterionId = Literal[
    "pertinence",
    "sobriety",
    "bias",
    "rgpd",
    "rgaa",
    "mental_health",
    "dys",
    "ai_act",
    "hallucination",
    "safety",
]


class JudgeCriterion(BaseModel):
    id: str                     # CriterionId ou custom
    label: str
    description: str
    enabled: bool = True
    weight: float = 1.0         # pour le score composite
    tags: list[str] = []        # ex: ["quality", "ai_act", "rgpd"]


class UseCase(BaseModel):
    id: str
    label: str
    description: str


class JudgeConfig(BaseModel):
    criteria: list[JudgeCriterion]
    use_cases: list[UseCase]
    active_use_case_id: str | None = None
    judge_model: str = "ollama/mistral"
    visible_in_chat: list[str] = []     # ids des critères à afficher dans le chat
    latency_threshold_ms: float | None = None
    score_threshold: float | None = None
    error_rate_threshold: float | None = None
    policy_rules: str = ""              # ex: "répondre uniquement en français"


# ── Eval result ───────────────────────────────────────────────

class CriterionScore(BaseModel):
    criterion_id: str
    score: float        # 0.0 → 1.0
    flag: bool = False  # True si problème critique détecté
    reason: str = ""    # explication courte du juge


class EvalResult(BaseModel):
    trace_id: str
    model: str
    use_case_id: str | None
    composite_score: float
    criteria_scores: list[CriterionScore]
    evaluated_at: str