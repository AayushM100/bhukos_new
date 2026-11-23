# Frontend Rules — Bhukos

- TypeScript strict mode; no `any`.
- Keep all API calls inside `frontend/src/api/` and wrap them in custom TanStack Query hooks (`frontend/src/hooks/`). Never call `fetch`/`axios` directly inside UI components.
- Use React Hook Form + Zod for all forms (Log Food, Create List, Edit Profile).
- Always handle `isLoading`, `isError`, and empty states cleanly and unobtrusively.
- **Mandatory Auth Gate:**
  - Every protected feature button, link, or interactive action (`Log`, `Wishlist`, `My Collection`, `Friends`, `Lists`, `Profile`, `Rate`) MUST be wrapped in `useAuthGate()`.
  - If unauthenticated, clicking MUST open the Google OAuth modal popup immediately rather than navigating or failing silently.
- Build a single reusable `<FoodCard />` component for all Pokémon-style collectible snack cards; do not duplicate card markup across pages.
- Use `qrcode.react` for rendering friend invite QR codes and `navigator.clipboard.writeText` with clear feedback for copy-link actions.