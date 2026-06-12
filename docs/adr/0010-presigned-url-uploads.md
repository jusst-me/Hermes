# 0010 — Presigned URL uploads

- Status: Accepted
- Date: 2026-06-12

## Context

Clients need to upload document files (potentially several MB). Routing file bytes
through API Gateway and Lambda hits payload limits, increases cost, and couples
upload throughput to compute.

## Decision

We will use S3 presigned `PUT` URLs. The Upload Lambda generates a short-lived,
single-object-scoped presigned URL; the client uploads directly to S3.

## Consequences

- Lambda stays small and fast; no large payloads through API Gateway.
- Upload scaling is handled by S3 directly.
- The URL is time-limited and scoped to one object key, reducing abuse.
- The client performs a two-step flow (request URL, then upload).

## Alternatives considered

- **Upload through API Gateway/Lambda**: simpler client flow, but payload limits
  (API Gateway ~10 MB), higher cost, and compute coupled to upload size.
- **Direct unsigned bucket writes**: insecure; rejected.
