---
name: feature-delivery
description: End-to-end delivery of a Bhukos feature across DB, backend API, and React frontend. Use when building a complete user-facing feature.
---

# Feature Delivery Skill

## Step 1: Understand & Verify Contracts
- Read `docs/product/PRD.md`, `docs/database/SCHEMA.md`, `docs/api/API_CONTRACT.md`, and `docs/ui/design.md`.
- Confirm whether the feature requires the Google OAuth popup gate when clicked by an unauthenticated user.

## Step 2: Plan
- List exact Prisma schema changes (if any), backend modules, and frontend components.
- Present the plan briefly before editing files.

## Step 3: Backend First
- Run database migration if schema changed (`database-migration` skill).
- Implement Repository -> Service -> Controller -> Route with Zod validation and `requireAuth` guard.
- Write integration/unit tests for business logic.

## Step 4: Frontend Second
- Implement API hooks using TanStack Query.
- Build UI strictly matching `docs/ui/design.md` (no generic boxes/AI styling).
- Attach `useAuthGate()` to all protected interactions.

## Step 5: Verify
- Run backend typecheck & tests (`npm test`).
- Run frontend typecheck & build (`npm run build`).
- Summarize files changed and actual command results.