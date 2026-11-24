---
name: code-review
description: Audit Bhukos code changes for security, auth-gate compliance, performance, and adherence to Stitch's design.md. Use before finishing a milestone or committing.
---

# Code Review Skill

## Step 1: Security & Auth Gate Audit
- Verify every protected backend route enforces `requireAuth`.
- Verify Google OAuth token verification happens server-side only.
- Verify every protected frontend button/action uses `useAuthGate()` so unauthenticated clicks trigger the Google OAuth popup.

## Step 2: Data & Performance Audit
- Check for N+1 Prisma queries in Friends feeds, Lists, and Collections.
- Verify `food_cards.avg_rating` updates happen inside `$transaction`.
- Confirm daily Wikipedia FunFacts are cached in `daily_fun_facts` and not fetched per user request.

## Step 3: UI & Design Audit
- Cross-check all new frontend components against `docs/ui/design.md`.
- Flag and remove any generic AI styling (excessive boxes, neon gradients, inconsistent naming like "Journal" instead of "Facts" or "Members" instead of "Friends").

## Step 4: Test & Build Verification
- Run backend and frontend typechecks, linters, and test suites.
- Report exact findings and command results.