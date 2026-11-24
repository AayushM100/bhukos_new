---
name: database-migration
description: Safely update PostgreSQL schema via Prisma migrations and verify constraints and indexes. Use whenever database tables or columns change.
---

# Database Migration Skill

## Step 1: Understand
- Read `docs/database/SCHEMA.md` and `.agents/rules/database.md`.
- Inspect `backend/prisma/schema.prisma`.

## Step 2: Plan
- Define new models, enums, foreign keys, unique constraints, and indexes needed for queries.
- Check impact on existing seed data (`backend/prisma/seed.ts`).

## Step 3: Implement
- Update `docs/database/SCHEMA.md` first (or alongside).
- Update `backend/prisma/schema.prisma`.
- Run `npx prisma migrate dev --name <clear_migration_name>` inside `backend/`.
- Run `npx prisma generate`.

## Step 4: Verify
- Inspect the generated SQL migration file to confirm no unintended drops or missing indexes.
- Run seed script if applicable (`npx prisma db seed`) and verify backend tests pass.