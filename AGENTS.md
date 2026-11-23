# AI Development Instructions — Bhukos

## Project Overview
Bhukos is a social food-tracking and collectible-card web application ("Letterboxd for foodies") where users log food/drinks, maintain wishlists and lists, collect aesthetic food cards, view daily Wikipedia food facts, and connect with friends.

Tech Stack:
- Backend: Node.js, TypeScript, Fastify, Prisma ORM
- Database: PostgreSQL
- Frontend: React, TypeScript, Vite, Tailwind CSS
- Auth: Google OAuth 2.0 (HTTP-only session cookies)
- Infrastructure: Docker Compose

## Source of Truth
Before planning or implementing any feature, always read:
1. `docs/product/PRD.md`
2. `docs/architecture/ARCHITECTURE.md`
3. `docs/database/SCHEMA.md`
4. `docs/api/API_CONTRACT.md`
5. `docs/ui/design.md` (Stitch Design System — mandatory for all UI)
6. Relevant files in `.agents/rules/` and `.agents/skills/`

If documents conflict, report the conflict immediately. Do not silently invent business rules or UI styles.

## Core Product Constraints
- **Mandatory Auth Gate:** An unauthenticated visitor can view the main landing page, but ANY click on interactive features (Log, Wishlist, Friends, Collection, Profile, Lists) MUST trigger the Google OAuth sign-in popup/modal before proceeding.
- **No Generic AI Aesthetics:** Follow `docs/ui/design.md` strictly. Use editorial, spread-out, Letterboxd-inspired layouts (naming: Lists, Facts, Friends). Avoid generic boxed cards, neon gradients, or cluttered dashboards.

## Development Behavior
1. Inspect existing code before editing.
2. Propose a brief plan and list files to create/modify before large edits.
3. Keep backend and frontend strictly separated.
4. Always run tests and typechecks before declaring a task complete.
5. Update `SCHEMA.md` or `API_CONTRACT.md` if contracts change.