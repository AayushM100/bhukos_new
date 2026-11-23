# Bootstrap Prompt — Bhukos

Act as a senior full-stack architect and engineering lead.
I am building **Bhukos** ("Letterboxd for foodies") using:
- Backend: Node.js, TypeScript, Fastify, Prisma ORM
- Database: PostgreSQL
- Frontend: React, TypeScript, Vite, Tailwind CSS (governed strictly by `docs/ui/design.md`)
- Auth: Google OAuth 2.0 (mandatory popup gate on clicking any interactive feature)
- Infrastructure: Docker Compose

First, inspect the current workspace (`AGENTS.md`, `docs/`, and `.agents/`).

Your responsibilities:
1. Validate `AGENTS.md`, `docs/product/PRD.md`, `docs/architecture/ARCHITECTURE.md`, `docs/database/SCHEMA.md`, `docs/api/API_CONTRACT.md`, `docs/AUTHENTICATION.md`, and `docs/ui/design.md`.
2. Verify all rules and skills inside `.agents/rules/` and `.agents/skills/`.
3. Propose the exact initial file tree for `infra/docker-compose.yml`, `backend/`, and `frontend/`.

Before implementing code:
- Explain key architecture choices and trade-offs.
- Flag any missing details in `docs/ui/design.md` or `PRD.md`.
- Do not invent business rules or generate generic AI UI styling.
- Do not overwrite existing `.md` files without inspection.

After my approval, initialize `infra/`, `backend/`, and `frontend/` and deliver the first vertical slice:
**Public Landing Page + Daily Wikipedia FunFact (`Facts`) + Sample Collectible Cards + Google OAuth Gate Popup on Feature Click.**

Always report actual test/build results and any remaining limitations.