# System Architecture — Bhukos

## 1. Architectural Pattern
- **Modular Monolith Backend (`backend/`):** Single Fastify + TypeScript service organized by domain feature (`auth`, `cards`, `logs`, `wishlist`, `lists`, `friends`, `facts`, `profile`).
- **Strict Layering:** `Route -> Controller -> Service -> Repository (Prisma)`.
- **Decoupled SPA Frontend (`frontend/`):** React + TypeScript + Vite consuming versioned REST APIs (`/api/v1/*`).

## 2. Authentication & The OAuth Gate Flow
1. **Unauthenticated Landing:** `GET /api/v1/landing` (or public endpoints for sample cards + today's `DailyFunFact`) loads without authentication so visitors experience the Letterboxd-inspired editorial layout.
2. **Client-Side Auth Gate:** All interactive triggers (`Log`, `Wishlist`, `My Collection`, `Friends`, `Lists`, `Profile`) pass through `useAuthGate()`. If `user === null`, the action is halted and the Google OAuth modal opens immediately.
3. **Server-Side Verification:**
   - Frontend receives a Google ID credential/token from `@react-oauth/google`.
   - Frontend sends it to `POST /api/v1/auth/google`.
   - Backend verifies the token with `google-auth-library`, upserts the `User` (generating a unique `invite_code` on first login), and sets an `HttpOnly`, `Secure`, `SameSite=Lax` JWT session cookie.
4. **Route Protection:** All non-public endpoints enforce `requireAuth` middleware, extracting `req.user` strictly from the verified JWT cookie.

## 3. Collectible Food Cards & Rating Aggregation
- **Collection Unlocking:** A card enters a user's `My Collection` when they submit at least one `FoodLog` for that `card_id`.
- **Atomic Ratings:** Whenever a `FoodLog` is created, updated, or deleted, `avg_rating` and `rating_count` on `food_cards` are recalculated inside a Prisma `$transaction`.
- **2D Card Art:** Artwork URLs are stored on `food_cards.artwork_url` (served from local `/uploads` or object storage in production).

## 4. Daily Wikipedia FunFacts Sync (`Facts`)
- A scheduled `node-cron` job runs daily at `00:05 UTC` (plus an on-startup check if today's row is missing in `daily_fun_facts`).
- Fetches a curated food/beverage/cuisine history article summary from the Wikipedia REST API (`https://en.wikipedia.org/api/rest_v1/page/summary/{topic}` or Wikipedia's Food History category list).
- Saves `fact_date`, `title`, `summary`, `wikipedia_url`, and `image_url` to PostgreSQL so all users get an instant, cached daily fact without hitting Wikipedia rate limits.

## 5. Friend Invites & QR Flow
- Every user has a short unique `invite_code`.
- `Connect with Friends` generates `{FRONTEND_URL}/invite/{invite_code}` and renders a scannable QR code on the client.
- Opening an invite link while unauthenticated triggers the Google OAuth popup; after sign-in, it prompts/executes `POST /api/v1/friends/invite/{invite_code}`.