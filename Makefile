.PHONY: help up down build logs ps \
        pull-models \
        dev-gateway dev-observability dev-evaluation \
        lint test clean

# ── Config ────────────────────────────────────────────────────

COMPOSE = docker compose -f infra/docker-compose.yml
UV      = uv

# ── Help ──────────────────────────────────────────────────────

help:
	@echo ""
	@echo "  make up                  Lance tous les services"
	@echo "  make down                Arrête tous les services"
	@echo "  make build               Rebuild les images microservices"
	@echo "  make logs                Logs de tous les services (follow)"
	@echo "  make logs s=llm-gateway  Logs d'un service spécifique"
	@echo "  make ps                  État des containers"
	@echo ""
	@echo "  make pull-models        
	@echo ""
	@echo "  make dev-gateway         Lance llm-gateway en local (hot reload)"
	@echo "  make dev-observability   Lance observability en local (hot reload)"
	@echo "  make dev-evaluation      Lance evaluation en local (hot reload)"
	@echo ""
	@echo "  make test                Lance tous les tests"
	@echo "  make lint                Lint tous les services (ruff)"
	@echo "  make clean               Supprime volumes + images buildées"
	@echo ""

# ── Docker ────────────────────────────────────────────────────

up:
	cp -n .env.example .env 2>/dev/null || true
	$(COMPOSE) up -d

down:
	$(COMPOSE) down

build:
	$(COMPOSE) build llm-gateway observability evaluation

logs:
ifdef s
	$(COMPOSE) logs -f $(s)
else
	$(COMPOSE) logs -f
endif

ps:
	$(COMPOSE) ps

# ── Modèles Ollama ────────────────────────────────────────────

pull-models:
	$(COMPOSE) exec ollama ollama pull gemma3:1b
	$(COMPOSE) exec ollama ollama pull llama3.2:3b
	$(COMPOSE) exec ollama ollama pull qwen2.5:1.5b
	$(COMPOSE) exec ollama ollama pull deepseek-r1:1.5b

# ── Dev local (hot reload, sans Docker) ──────────────────────
# Pré-requis : uv installé, services infra lancés via make up

dev-gateway:
	cd back/llm-gateway && \
	$(UV) sync && \
	PYTHONPATH=../shared:. $(UV) run uvicorn main:app --reload --port 8001

dev-observability:
	cd back/observability && \
	$(UV) sync && \
	PYTHONPATH=../shared:. $(UV) run uvicorn main:app --reload --port 8002

dev-evaluation:
	cd back/evaluation && \
	$(UV) sync && \
	PYTHONPATH=../shared:. $(UV) run uvicorn main:app --reload --port 8003

# ── Qualité ───────────────────────────────────────────────────

lint:
	$(UV) tool run ruff check back/

test:
	PYTHONPATH=back/shared:back/llm-gateway:back/observability:back/evaluation \
	python -m pytest back/ -v

# ── Nettoyage ────────────────────────────────────────────────

clean:
	$(COMPOSE) down -v --rmi local