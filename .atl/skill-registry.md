# Skill Registry — your-service-name

Generated: <!-- update when regenerating -->

## Project Standards

**Stack**: NestJS 10 + TypeScript, CQRS, GraphQL (Apollo Federation), MongoDB, Kafka + Confluent Schema Registry
**Architecture**: Screaming / Hexagonal — feature-based folders, DDD (aggregates, value-objects, domain events, repositories), transport / application / domain / infrastructure layers
**Test runner**: Jest 29 + ts-jest | `pnpm test` | Strict TDD Mode: **enabled**
**Linter**: ESLint + @typescript-eslint + Prettier
**Formatter**: Prettier

---

## User Skills

| Skill | Trigger |
|-------|---------|
| `branch-pr` | Creating a pull request, opening a PR, or preparing changes for review |
| `chained-pr` | PR would exceed 400 changed lines, planning chained/stacked PRs, reviewable slices |
| `work-unit-commits` | Implementing a change, preparing commits, splitting PRs, planning chained/stacked PRs |
| `issue-creation` | Creating a GitHub issue, reporting a bug, or requesting a feature |
| `comment-writer` | Drafting or posting feedback, review comments, maintainer replies, Slack/GitHub comments |
| `judgment-day` | User says "judgment day", "dual review", "doble review", "juzgar" |
| `cognitive-doc-design` | Writing guides, READMEs, RFCs, onboarding docs, architecture docs |
| `skill-creator` | Creating a new skill, adding agent instructions, documenting patterns for AI |

---

## Compact Rules

### branch-pr
- Every PR MUST link an approved issue — no exceptions.
- Every PR MUST have exactly one `type:*` label.
- Automated checks must pass before merge.
- Use `gh pr create` with the ATL body template (Summary + Test plan).

### chained-pr
- MUST split when a PR exceeds **400 changed lines**, unless maintainer-approved `size:exception`.
- Design each PR for ≤60-minute review.
- Every chained PR MUST state what comes before and after.
- Every chained PR MUST include a dependency diagram marking the current PR.
- One deliverable work unit per PR — do not mix refactors, features, tests, or docs.

### work-unit-commits
- Commit by work unit (deliverable behavior, fix, migration), not by file type.
- Keep tests in the same commit as the behavior they verify.
- Keep docs with the user-visible change.
- Each commit must leave the repo in a coherent, buildable state.

### issue-creation
- MUST use template (Bug Report or Feature Request).
- Every issue gets `status:needs-review` automatically on creation.
- Maintainer MUST add `status:approved` before any PR is opened.
- Questions go to Discussions, not issues.

### comment-writer
- Comments are warm, direct, and human — not robotic or boilerplate.
- Praise first when genuine, then the ask.
- One clear ask per comment — no lists of demands.

### judgment-day
- Launch TWO independent blind judge sub-agents simultaneously.
- Synthesize findings.
- Apply fixes.
- Re-judge until both pass or escalate after 2 iterations.

### cognitive-doc-design
- Progressive disclosure: summary first, detail on demand.
- Chunk into ≤7 logical sections.
- Use tables for comparisons, checklists for steps.
- Signpost with clear headings and transitions.
