# Phase 6 — CI/CD & real AWS

Automate verification and deployment, and move from LocalStack to real AWS.
Implements HRM-011.

## Learning goals

- Build GitHub Actions pipelines with PR gates and deployment.
- Manage Terraform state and credentials safely for real AWS.

## Concepts to read

- GitHub Actions: jobs, matrix, caching, environments, OIDC to AWS.
- Terraform remote backend (S3 + DynamoDB lock) for real AWS.
- Secrets management and least-privilege deploy roles.

## Steps

1. Add a PR workflow: lint, typecheck, test (against LocalStack),
   `terraform validate`, Checkov.
2. Add a `dev` Terraform environment targeting real AWS with a remote backend.
3. Configure AWS auth via OIDC (no long-lived keys) and a least-privilege deploy
   role.
4. Add a main-branch workflow: build, `terraform plan`, `terraform apply`.
5. Deploy to AWS and smoke-test the live endpoints.

## Definition of Done

- PRs are blocked unless all checks pass.
- Merging to main deploys to AWS automatically.
- The live system processes a document end to end.
- No long-lived AWS credentials are stored in the repo.

## Stretch

- Add a `terraform plan` comment on PRs.
- Add an environment promotion step (dev → staging).
