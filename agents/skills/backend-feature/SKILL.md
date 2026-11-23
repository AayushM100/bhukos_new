---
name: backend-feature
description: Implement a Fastify + Prisma backend feature with Zod validation, auth guard, and tests. Use when creating or modifying Bhukos backend endpoints.
---

# Backend Feature Skill

## Step 1: Understand
- Read `docs/product/PRD.md`, `docs/api/API_CONTRACT.md`, `docs/database/SCHEMA.md`, and `.agents/rules/backend.md`.
- Inspect existing modules in `backend/src/modules/` to match conventions.

## Step 2: Plan
- Identify Prisma models/queries needed.
- Define Zod request/response schemas matching `API_CONTRACT.md`.
- Confirm whether `requireAuth` is mandatory for the endpoint.

## Step 3: Implement
- Add repository methods (`*.repository.ts`) using Prisma (`$transaction` for rating aggregations or multi-table updates).
- Add service logic (`*.service.ts`) handling domain rules and throwing typed domain errors.
- Add controller (`*.controller.ts`) and Fastify route (`*.routes.ts`) with Zod validation and `requireAuth` preHandler.

## Step 4: Test
- Write Vitest unit tests for service logic.
- Write Fastify `.inject()` integration tests verifying `401` on unauthenticated calls, `400` on invalid payloads, and `200/201` on valid flows.

## Step 5: Verify
- Run `npm run typecheck` and `npm test` inside `backend/`.
- Update `docs/api/API_CONTRACT.md` if any endpoint shape changed.