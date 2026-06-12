# 0008 — Simulated, pluggable document processing

- Status: Accepted
- Date: 2026-06-12

## Context

The focus of Hermes is the cloud architecture, not the document analysis. Real AI
processing adds cost, non-determinism, and external dependencies that complicate
testing and learning.

## Decision

We will define a `DocumentProcessor` interface and ship a deterministic,
simulated implementation first (text extraction plus a generated summary,
metadata, and keywords). A real AI provider (e.g. Bedrock or OpenAI) can be added
later as another implementation, without changing handlers or services.

## Consequences

- Deterministic, fast, free, and easily testable processing.
- Architecture stays focused on infrastructure and engineering quality.
- A real implementation is a drop-in addition behind the interface.
- The simulated output is illustrative, not a real analysis (documented clearly).

## Alternatives considered

- **Real AI from the start**: more impressive output, but cost, non-determinism,
  and external coupling distract from the learning goals.
- **Text extraction only (no summary/metadata)**: simpler and "real", but shows
  less of the pluggable-architecture idea.
