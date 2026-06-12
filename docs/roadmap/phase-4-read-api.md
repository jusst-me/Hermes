# Phase 4 — Read API & state machine

Expose read access and complete the document lifecycle. Implements HRM-006 and
HRM-007.

## Learning goals

- Query DynamoDB by primary key and via a GSI.
- Round out the state machine and error responses.

## Concepts to read

- DynamoDB `GetItem` vs `Query`; GSI access patterns
  ([ADR-0003](../adr/0003-dynamodb-data-model.md)).
- API error modelling (404 vs 400 vs 500).

## Steps

1. Implement the `get-document` handler (GET by id) with a `404` for unknown ids.
2. Add a repository method to read a document by id.
3. (Stretch) Implement `list-documents` using the GSI, with optional `status`
   filter and pagination.
4. Provision the new routes/Lambdas in Terraform with least-privilege IAM.
5. Unit + integration tests for read paths and the not-found case.

## Definition of Done

- `GET /documents/{id}` returns status and result, or `404` for unknown ids.
- (If built) `GET /documents` returns a paginated, index-backed list.
- The full lifecycle `UPLOADED -> PROCESSING -> COMPLETED | FAILED` is observable
  end to end.

## Stretch

- Add `status` and pagination query parameters with validation.
- Add caching headers where appropriate.
