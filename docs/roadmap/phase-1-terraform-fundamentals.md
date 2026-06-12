# Phase 1 — Terraform fundamentals

Learn Infrastructure as Code by provisioning the storage and database layers
against LocalStack.

## Learning goals

- Understand Terraform's core model: providers, resources, state, variables,
  outputs, and modules.
- Know how to point Terraform at LocalStack vs real AWS via environments.
- Create reusable modules with clear inputs/outputs.

## Concepts to read

- Terraform state: what it is, why it matters, local vs remote backends.
- Provider configuration and the AWS provider with custom endpoints (LocalStack).
- Module structure: `variables.tf`, `main.tf`, `outputs.tf`.
- See [ADR-0006](../adr/0006-terraform-for-iac.md) and
  [ADR-0007](../adr/0007-localstack-first-development.md).

## Steps

1. Create `infrastructure/terraform/` with `environments/local` and a provider
   configured for LocalStack endpoints.
2. Build a `storage` module that provisions a private S3 bucket.
3. Build a `database` module that provisions the DynamoDB table (PK + SK + GSI per
   [ADR-0003](../adr/0003-dynamodb-data-model.md)).
4. Wire the modules into the `local` environment; run `init`, `plan`, `apply`.
5. Verify the bucket and table exist in LocalStack.
6. Add `terraform fmt`, `terraform validate`, tflint, and Checkov.

## Definition of Done

- `terraform apply` against LocalStack creates the S3 bucket and DynamoDB table.
- Modules are reusable and have documented variables/outputs.
- `fmt`, `validate`, tflint, and Checkov pass.

## Stretch

- Parameterise the bucket name and table name per environment.
- Add a remote backend configuration (commented) ready for real AWS.
