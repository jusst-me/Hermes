# 0003 — DynamoDB data model (single-table-light)

- Status: Accepted
- Date: 2026-06-12

## Context

DynamoDB is queried by primary key; arbitrary field filtering requires secondary
indexes. The data model must be designed around access patterns. Hermes currently
has essentially one entity (`Document`), with access patterns: get by id, update
status/result, and list (optionally by status). Future multi-tenancy would add
"documents per user".

## Decision

We will use a single table with a "single-table-light" design:

- `PK = documentId`, `SK` reserved for future related items (e.g. `RESULT#v1`).
- One GSI for listing / filtering by status (e.g. `GSI1PK = status`,
  `GSI1SK = uploadedAt`).

This is single-table in the sense that there is one table designed to evolve,
without forcing full key-overloading complexity while there is only one entity.

## Consequences

- Simple to read and reason about now; can evolve to richer single-table design
  (multiple entity types in item collections) without a migration.
- Listing/filtering is index-backed instead of using scans.
- We accept that we are not (yet) demonstrating full key-overloading; this is a
  deliberate trade-off documented here.

## Alternatives considered

- **Table-per-entity (multi-table)**: familiar from SQL, but loses item
  collections and cross-entity single-query fetches as the model grows.
- **Full single-table design from day one**: maximal performance and the "real"
  DynamoDB approach, but over-engineered and a steep learning curve for a single
  entity.
