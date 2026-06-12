# Hermes — Repository Conventions

A quick reference for how the repository is organised and operated. For the
contributor workflow see [../CONTRIBUTING.md](../CONTRIBUTING.md); for the full
quality bar see [technical-requirements.md](./technical-requirements.md).

## Branching strategy

- `main` is always deployable; protected and merged via PR only.
- Short-lived feature branches off `main`, named `type/short-description`
  (e.g. `feat/hrm-001-create-upload-url`).
- No direct commits to `main`.

## Commits

- Conventional Commits (`feat`, `fix`, `docs`, `chore`, `refactor`, `test`,
  `ci`, `perf`).
- Small, focused commits; messages explain the why and reference feature ids.

## Pull requests

- One logical change per PR; keep them small.
- CI gates: lint, typecheck, tests, `terraform validate`, Checkov.
- Update `features.md` and add an ADR when a decision is made.

## What is never committed

- Secrets and `.env` files (only `.env.example` is committed).
- Terraform state (`*.tfstate*`) and `.terraform/` directories.
- Build output, `node_modules/`, and coverage reports.

See [../.gitignore](../.gitignore) for the enforced list.

## Where things live

- App code: `apps/` (`api`, later `web`)
- Shared types/contracts: `packages/core`
- Infrastructure: `infrastructure/terraform`
- Documentation and decisions: `docs/` (`adr/`, `roadmap/`)
- AI guidance: `.cursor/rules/`
- CI: `.github/workflows/`
