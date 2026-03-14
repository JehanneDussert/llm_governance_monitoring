# llm-monitor

Plateforme de monitoring LLM open source — métriques temps réel, traces, A/B test entre modèles.

## Architecture

Trois microservices FastAPI + stack infra complète :

| Service | Port | Rôle |
|---|---|---|
| `llm-gateway` | 8001 | Proxy LLM, streaming, publication Redis |
| `observability` | 8002 | Métriques Prometheus, traces Langfuse, proxy Grafana |
| `evaluation` | 8003 | Scoring DeepEval, consumer Redis, A/B test |

Communication : HTTP sync pour les lectures, Redis pub/sub pour le scoring async.

## Démarrage rapide

```bash
# 1. Copier et remplir les variables d'environnement
cp .env.example .env

# 2. Lancer tous les services
make up

# 3. Télécharger les modèles Ollama (à faire une seule fois)
make pull-models
```

## Services disponibles après démarrage

| Service | URL |
|---|---|
| API unifiée (Caddy) | http://localhost |
| Langfuse | http://localhost:3000 |
| Grafana | http://localhost:3001 |
| Prometheus | http://localhost:9090 |
| llm-gateway docs | http://localhost:8001/docs |
| observability docs | http://localhost:8002/docs |
| evaluation docs | http://localhost:8003/docs |

## Développement local

```bash
# Lancer l'infra (Redis, Ollama, Langfuse, Prometheus, Grafana)
make up

# Lancer un service en hot reload
make dev-gateway
make dev-observability
make dev-evaluation
```

## Tests & qualité

```bash
make test   # pytest
make lint   # ruff
```

## Stack

- **Back** : FastAPI · uv · Redis pub/sub · DeepEval · Langfuse · Prometheus
- **Infra** : Docker Compose · Ollama · LiteLLM · Caddy
- **Front** : Vue 3 · TypeScript · PrimeVue