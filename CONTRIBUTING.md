# Contributing to Hermes

Hermes is a learning-first project: prefer understanding over speed, work in
small steps, and keep the quality bar high. This guide covers the workflow and
conventions. For the full quality bar, see
[docs/technical-requirements.md](./docs/technical-requirements.md).

## Workflow

1. Pick the next step from the active phase in [docs/roadmap/](./docs/roadmap/).
2. Create a branch (see naming below).
3. Make a small, focused change with tests.
4. Run checks locally: `pnpm turbo run lint typecheck test`.
5. Open a pull request; ensure CI is green; merge.

## Branch naming

Use a type prefix and a short, hyphenated description, optionally with the feature
id:

```text
feat/hrm-001-create-upload-url
fix/process-lambda-retry
docs/adr-eventbridge
chore/ci-cache
```

## Commit messages — Conventional Commits

Format: `type(scope): subject`. Types: `feat`, `fix`, `docs`, `chore`,
`refactor`, `test`, `ci`, `perf`. The body explains the why and references the
feature id where relevant.

```text
feat(api): generate presigned upload URL

Add create-upload-url handler that writes an UPLOADED record and returns a
short-lived presigned PUT URL. Implements HRM-001.
```

## Pull requests

- Keep PRs small and reviewable.
- Description references the feature id(s) and roadmap phase.
- CI must pass: lint, typecheck, tests, `terraform validate`, Checkov.
- Update `docs/features.md` (acceptance criteria/status) and add an ADR when a
  significant decision is made.

## Definition of Done

A change is done only when it meets the checklist in
[docs/technical-requirements.md](./docs/technical-requirements.md#3-definition-of-done-per-change).

## Conventions

- All code, comments, and docs in English.
- TypeScript `strict`; no `any` without justification.
- Never commit secrets, `.env` files, or Terraform state.
