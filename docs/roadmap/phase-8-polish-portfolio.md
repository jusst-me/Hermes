# Phase 8 — Polish & portfolio

Make the repository read like a real product so a recruiter or senior engineer
understands the quality within minutes.

## Learning goals

- Communicate architecture and trade-offs clearly.
- Present the project as a finished, production-minded system.

## Concepts to read

- What reviewers look for: clear README, ADRs, tests, IaC, CI/CD, observability.

## Steps

1. Finalise the README: description, architecture diagram, local setup, Terraform
   deploy, service choices and trade-offs, future extensions.
2. Review and complete all ADRs; ensure decisions match the code.
3. Ensure the architecture diagram matches the deployed system.
4. Verify test coverage and CI badges.
5. Add a short demo (GIF/screenshots or a recorded walkthrough).
6. Final pass on security (IAM, secrets, public surface).

## Definition of Done

- The README explains what Hermes is and why each choice was made.
- ADRs are complete and consistent with the implementation.
- A reviewer can run it locally from the README alone.
- The repo demonstrates production-grade engineering at a glance.

## Stretch

- Write a short blog-style post summarising the design and lessons learned.
- Add future-work tickets (Cognito auth, OpenSearch, real AI, multi-tenant).
