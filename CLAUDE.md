# CLAUDE.md — Bhukos

## Project Overview
**Bhukos** is a social food-tracking and collectible-card web app ("Letterboxd for foodies") where users log food/drinks, maintain wishlists and lists, collect aesthetic Pokémon-style food cards, read daily Wikipedia food facts, and connect with friends via link/QR codes.

### Tech Stack
- **Backend:** Node.js, TypeScript, Fastify, Prisma ORM *(Note: If you chose Java 21 + Spring Boot, replace this line with Java 21, Spring Boot, Spring Data JPA, Flyway)*
- **Database:** PostgreSQL / Supabase
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, TanStack Query, React Hook Form + Zod, `qrcode.react`
- **Auth:** Google OAuth 2.0 (HTTP-only session cookies)
- **UI Design Authority:** `docs/ui/design.md` (Stitch Design System)

## Source of Truth (Read Before Planning or Coding)
Before implementing any feature, inspect relevant files in:
1. `docs/product/PRD.md` — MVP features & business rules
2. `docs/architecture/ARCHITECTURE.md` — System design, Wikipedia sync, auth flow
3. `docs/database/SCHEMA.md` — Entities, constraints, indexes
4. `docs/api/API_CONTRACT.md` — Endpoints & DTO shapes
5. `docs/AUTHENTICATION.md` — Google OAuth popup gate specification
6. `docs/ui/design.md` — Stitch Design System (mandatory for all UI)
7. Rules in `.claude/rules/` (or `.agents/rules/`) and workflows in `.claude/skills/` (or `.agents/skills/`)

If any documents conflict, stop and report the conflict. Never silently invent business rules or UI patterns.

## Non-Negotiable Product & UI Rules
1. **Mandatory Google OAuth Gate:** Unauthenticated visitors can view the public landing page, sample cards, and today's Fact. However, **ANY click on interactive features (`Log`, `Wishlist`, `My Collection`, `Friends`, `Lists`, `Profile`, `Rate`) MUST open the Google OAuth login modal popup** rather than executing or navigating.
2. **Collectible Cards (`<FoodCard />`):** Display 2D aesthetic snack/drink art, flavor tags, average community rating, fun quote, and rarity (`COMMON`, `UNCOMMON`, `RARE`, `EPIC`, `LEGENDARY`).
3. **Editorial UI — Strictly NO Generic AI Look:** Follow `docs/ui/design.md`. Inspired by Letterboxd (spread-out, mature, readable, minimal) using Bhukos labels: **Lists**, **Facts** (not Journal), and **Friends** (not Members). Avoid generic SaaS boxes, neon gradients, and cluttered card grids.
4. **Daily Wikipedia Facts:** Fetch via scheduled backend job and cache in `daily_fun_facts` (never call Wikipedia live on user page loads).

## Development Workflow
- **Plan First:** Always propose a brief plan and list of files to create/modify before making edits.
- **Vertical Slices:** Build one feature slice at a time (Database -> Backend + Tests -> Frontend -> Verify).
- **Atomic Ratings:** Recalculate `food_cards.avg_rating` and `rating_count` atomically inside database transactions whenever logs change.
- **Verify Before Done:** Always run typechecks, backend tests, and frontend builds, and report exact command results. Never skip failing tests silently.
- **Keep Docs Synced:** Update `docs/database/SCHEMA.md` and `docs/api/API_CONTRACT.md` whenever contracts change.