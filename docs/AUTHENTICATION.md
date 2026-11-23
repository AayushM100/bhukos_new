# Authentication Specification — Bhukos

## Overview
Bhukos uses **Google OAuth 2.0 exclusively**. No username/password registration exists.

## Rules
1. **Strict Feature Gate:** Unauthenticated users can only read the public landing preview (`GET /api/v1/facts/today`, `GET /api/v1/cards/showcase`). Every other feature (`Log`, `Wishlist`, `My Collection`, `Friends`, `Lists`, `Profile`) is blocked behind the Google OAuth popup.
2. **Every Click Behavior:** Clicking any gated button/card/nav item while unauthenticated must immediately open the Google OAuth modal (no silent failures or broken redirects).
3. **Post-Auth Continuation:** After successful Google sign-in, `AuthContext` refreshes `GET /api/v1/auth/me` and closes the modal so the user can proceed cleanly (or completes pending invite-link acceptance if visiting `/invite/:code`).

## Token & Cookie Security
- **Cookie Name:** `bhukos_session`
- **Attributes:** `HttpOnly: true`, `SameSite: "lax"`, `Secure: true` (in production), `Path: "/"`, `Max-Age: 7 days`.
- **CSRF / CORS:** Backend allows credentials strictly from `FRONTEND_URL` configured in `.env`.
- **Logout:** `POST /api/v1/auth/logout` clears `bhukos_session`.