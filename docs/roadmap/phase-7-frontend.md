# Phase 7 — Frontend

Add the web UI. This is the author's comfort zone, so it should be a fast phase
that consumes the existing API. Implements HRM-012.

## Learning goals

- Integrate a Next.js client with the presigned-upload flow.
- Reflect asynchronous backend state in the UI.

## Concepts to read

- The two-step presigned upload from the browser.
- React Query for fetching and polling.

## Steps

1. Scaffold `apps/web` (Next.js + TypeScript + Tailwind + React Query).
2. Build the upload page: request URL, `PUT` to S3, show the new document.
3. Poll `GET /documents/{id}` and reflect status transitions.
4. Build the result view (summary, metadata, keywords).
5. Build a document list view (if HRM-007 is implemented).
6. Add component/integration tests for the upload and status flows.

## Definition of Done

- A user can upload a document and watch it progress to `COMPLETED`.
- The result view renders the processor output.
- The UI handles `FAILED` and `404` gracefully.

## Stretch

- Add optimistic UI and drag-and-drop upload.
- Deploy the frontend (e.g. via the same CI/CD).
