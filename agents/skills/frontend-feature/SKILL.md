---
name: frontend-feature
description: Implement a React + TypeScript + Tailwind UI feature adhering to Stitch's design.md and the Google OAuth gate. Use when building pages or components in frontend/.
---

# Frontend Feature Skill

## Step 1: Understand
- Read `docs/ui/design.md`, `docs/api/API_CONTRACT.md`, `.agents/rules/frontend.md`, and `.agents/rules/ui-design.md`.
- Inspect existing components in `frontend/src/components/` and `frontend/src/hooks/`.

## Step 2: Plan
- Map out UI hierarchy (editorial Letterboxd-inspired layout, spread out, zero generic AI boxes).
- Identify TanStack Query hooks needed and exact triggers requiring `useAuthGate()`.

## Step 3: Implement
- Add typed API client functions and TanStack Query hooks.
- Build components using tokens from `docs/ui/design.md`.
- Wrap every gated interaction (`Log`, `Wishlist`, `My Collection`, `Friends`, `Lists`, `Profile`) with `useAuthGate()` so unauthenticated clicks open the Google OAuth modal.
- Implement loading skeletons, error banners, and clean empty states.

## Step 4: Verify
- Run `npm run typecheck` and `npm run build` inside `frontend/`.
- If Playwright MCP is available, inspect rendered UI on desktop and mobile to confirm adherence to `docs/ui/design.md` and auth-gate popup behavior.