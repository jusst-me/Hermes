# Phase 0 — Foundations & tooling

Set up the monorepo and the local development environment so every later phase
has a solid, consistent base.

## Learning goals

- Understand how a pnpm + Turborepo monorepo is structured and why.
- Know how LocalStack emulates AWS and how Docker Compose runs it.
- Be comfortable with the project's quality tooling (ESLint, Prettier, Vitest,
  husky).

## Concepts to read

- pnpm workspaces and Turborepo task pipelines (caching, `turbo.json`).
- LocalStack: what it is, supported services, and endpoint configuration.
- Conventional Commits and pre-commit hooks (husky + lint-staged).

## Steps

1. Initialise the monorepo: `package.json`, `pnpm-workspace.yaml`, `turbo.json`.
2. Add shared TypeScript config (`tsconfig.base.json`) with `strict` enabled.
3. Configure ESLint + Prettier and wire them into Turborepo tasks.
4. Set up Vitest at the root with a sample test.
5. Add husky + lint-staged pre-commit hooks (lint, format, typecheck).
6. Create `apps/api` and `packages/core` workspace skeletons (no business logic
   yet).
7. Add `docker-compose.yml` running LocalStack; verify it starts and is healthy.
8. Document local setup steps in the README.

## Definition of Done

- `pnpm install` works; `pnpm turbo run lint test typecheck` passes.
- LocalStack starts via `docker compose up` and reports healthy.
- A trivial unit test runs green in CI-like conditions locally.
- Pre-commit hooks block a badly formatted commit.

## Stretch

- Add a `Makefile` or task scripts for common workflows.
- Add commitlint to enforce Conventional Commits automatically.
