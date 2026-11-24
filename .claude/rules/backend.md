# Backend Rules — Bhukos

- Use TypeScript strict mode (`strict: true`, no `any`).
- Organize `backend/src/` by feature module (`modules/auth`, `modules/cards`, `modules/logs`, `modules/wishlist`, `modules/lists`, `modules/friends`, `modules/facts`, `modules/profile`).
- Enforce `Route -> Controller -> Service -> Repository (Prisma)` separation. Never place business logic inside controllers or database queries inside routes.
- Validate all incoming `body`, `params`, and `query` inputs with Zod schemas before passing to services.
- Never trust client-supplied `userId`. Always derive the acting user from `request.user.id` populated by `requireAuth`.
- Apply `requireAuth` on all protected routes (everything except `/health`, `/api/v1/auth/google`, `/api/v1/facts/today`, and public card browsing).
- Never expose internal database errors or stack traces in API responses; use a centralized Fastify error handler with consistent error codes.
- Wrap multi-step writes (such as creating/updating/deleting a `FoodLog` and recalculating `food_cards.avg_rating` / `rating_count`) inside `prisma.$transaction`.
- Never log Google tokens, session secrets, or PII.
- Write unit/integration tests (Vitest) for all business logic and auth-gate edge cases before marking a task complete.