# Agent Conventions — your-service-name

## Stack

- **Runtime**: Node.js 24, TypeScript 5
- **Framework**: NestJS 10
- **API**: GraphQL (Apollo Federation v2) + optional REST
- **Database**: MongoDB via TypeORM
- **Messaging**: Kafka + Confluent Schema Registry (optional — controlled by `KAFKA_BROKERS` env var)
- **Logging**: Winston via `nest-winston` + `@sisques-labs/nestjs-kit`
- **Testing**: Jest 29 + ts-jest | Strict TDD enabled
- **Package manager**: pnpm 10

## Architecture

Screaming / Hexagonal Architecture with DDD:

```
src/
├── core/                          # Feature contexts go here
│   └── <your-context>/
│       ├── application/           # CQRS handlers, services, DTOs, exceptions
│       │   ├── commands/
│       │   ├── queries/
│       │   ├── services/
│       │   ├── dtos/
│       │   └── exceptions/
│       ├── domain/                # Business logic — no framework deps
│       │   ├── aggregates/
│       │   ├── value-objects/
│       │   ├── events/
│       │   ├── repositories/      # Interfaces only
│       │   └── exceptions/
│       ├── infrastructure/        # Persistence implementations
│       │   └── database/mongodb/
│       │       ├── repositories/  # Implements domain repository interfaces
│       │       └── mappers/
│       └── transport/             # API adapters
│           ├── rest/
│           └── graphql/
├── health/                        # Liveness probe
├── kafka/                         # Kafka client + producer (remove if unused)
└── support/                       # Cross-cutting concerns
    └── logging/
```

## Conventions

- **Imports**: always use `@/` alias (e.g. `@/core/my-context/domain/...`)
- **Modules**: one NestJS module per context, registered in `FEATURES` array in `app.module.ts`
- **CQRS**: commands mutate state, queries read it — never mix
- **Domain**: zero framework dependencies in `domain/` layer
- **Repositories**: define interfaces in `domain/repositories/`, implement in `infrastructure/`
- **DTOs**: validate with `class-validator` decorators; use `class-transformer` for serialization
- **Kafka**: add topic constants to `kafka/kafka.constants.ts`; implement publishers/consumers per context

## Development

```bash
cp .env.example .env
pnpm install
pnpm dev
```

## Git Hooks

| Hook | Command |
|------|---------|
| `pre-commit` | `pnpm lint-staged` — ESLint on staged `.ts` files |
| `pre-push` | `pnpm build && pnpm test` — must pass before pushing |
