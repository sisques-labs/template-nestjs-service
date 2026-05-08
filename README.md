# your-service-name

> NestJS microservice — sisques-labs

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | NestJS 10 + TypeScript 5 |
| API | GraphQL (Apollo Federation v2) |
| Database | MongoDB via TypeORM |
| Messaging | Kafka + Confluent Schema Registry |
| Logging | Winston (`nest-winston`) |
| Package manager | pnpm 10 |

## Getting started

### Prerequisites

- Node.js 24
- pnpm 10 (`corepack enable`)

### Setup

```bash
cp .env.example .env
# Edit .env with your values
pnpm install
pnpm dev
```

### Environment variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `3000` | HTTP port |
| `APP_NAME` | No | — | Service identifier for logs |
| `LOG_LEVEL` | No | `info` | Winston log level |
| `MONGODB_URI` | Yes | — | MongoDB connection string |
| `MONGODB_DATABASE` | Yes | — | Database name |
| `KAFKA_BROKERS` | No | — | Comma-separated brokers. Empty = no Kafka |
| `KAFKA_CLIENT_ID` | No | `your-service-name` | Kafka producer client ID |
| `KAFKA_CONSUMER_GROUP_ID` | No | `your-service-name-consumer` | Consumer group |
| `SCHEMA_REGISTRY_HOST` | No | `http://localhost:8081` | Confluent Schema Registry |

## Commands

```bash
pnpm dev          # Watch mode
pnpm build        # Compile to dist/
pnpm prod         # Run compiled build
pnpm test         # Unit tests
pnpm test:cov     # Coverage report
pnpm test:e2e     # End-to-end tests
pnpm lint         # ESLint --fix
```

## Architecture

Screaming / Hexagonal with DDD. Feature contexts live under `src/core/`.

```
src/
├── core/           # Add feature contexts here
├── health/         # GraphQL liveness probe
├── kafka/          # Kafka client + producer (remove if unused)
└── support/
    └── logging/    # Winston setup
```

See [AGENTS.md](./AGENTS.md) for full conventions and folder structure.

## Docker

```bash
# Local build (requires NODE_AUTH_TOKEN in environment)
docker compose up --build
```

## Git hooks

| Hook | Runs |
|------|------|
| `pre-commit` | ESLint on staged `.ts` files |
| `pre-push` | `pnpm build && pnpm test` |

## Release

Trigger the **Release** workflow from GitHub Actions, selecting version bump type and release type. The Docker image is published to Docker Hub as `sisqueslabs/your-service-name`.
