# Database Rules — Bhukos

- PostgreSQL is the sole relational database via Prisma ORM.
- Never use `prisma db push` to bypass migrations; always generate versioned migrations with `npx prisma migrate dev --name <descriptive_name>`.
- Never alter already-applied migration files.
- Use explicit `select` or bounded `include` in Prisma queries to avoid over-fetching and N+1 queries (especially on Friends feeds and Collection grids).
- Paginate all list/feed/catalog queries (`take` & `skip` or cursor pagination).
- Keep `SCHEMA.md` synchronized whenever `schema.prisma` is updated.
- Never hardcode database credentials; load `DATABASE_URL` strictly from environment variables.