---
name: bug-investigation
description: Systematically diagnose, fix, and add regression tests for bugs in Bhukos. Use when an error, UI glitch, or API failure occurs.
---

# Bug Investigation Skill

## Step 1: Reproduce
- Gather exact symptoms, logs, network status codes, or UI state.
- Reproduce the issue locally or via a targeted test case.

## Step 2: Root Cause Analysis
- Trace the full path: UI interaction -> `useAuthGate` / TanStack Query -> Fastify Route -> Service -> Prisma Query -> PostgreSQL.
- Identify the exact root cause without guessing or applying blind workarounds.

## Step 3: Fix
- Implement the smallest, cleanest fix respecting `.agents/rules/`.
- Add a regression test (Vitest or Playwright) that fails without the fix and passes with it.

## Step 4: Verify
- Run full test suites and typechecks for affected workspace (`backend/` and/or `frontend/`).
- Report root cause, fix summary, and test output.