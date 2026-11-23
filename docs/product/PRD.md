# Product Requirements Document — Bhukos

## Problem Statement
Foodies love discovering, tasting, and discussing snacks, drinks, and dishes with friends, but lack a dedicated, community-driven space like Letterboxd to log items, save future cravings, and collect food memories.

## Target Users
- **Foodies / Explorers:** Track eaten/drunk items, read daily food history, collect cards.
- **Friend Circles:** Share recommendations, invite friends via link/QR code, compare ratings.

## MVP Features
1. **Landing Page & Auth Gate**
   - Publicly viewable editorial landing page inspired by Letterboxd's structure.
   - Top/main navigation options: `Log`, `Wishlist`, `My Collection`, `Friends`, `Lists`, `Facts`, `Profile`.
   - Clicking any interactive feature while unauthenticated opens a Google OAuth login popup. Users cannot use features without Google Auth.
2. **Collectible Food Cards (Pokémon-style)**
   - Every food/drink item corresponds to a collectible card featuring:
     - 2D aesthetic visual art of the snack/drink
     - Flavor tags (e.g., *Matcha, Tangy, Smoky*)
     - Average community rating (1.0 – 5.0)
     - A fun quote
     - Rarity tier (`Common`, `Uncommon`, `Rare`, `Epic`, `Legendary`)
3. **Log & Rate**
   - Users log an item they ate/drunk, give a personal rating, tasting note, and date. Logging unlocks/adds the card to `My Collection`.
4. **Wishlist & Lists**
   - Save items desired to try in the future (`Wishlist`) or organize curated groups (`Lists`, e.g., "Best Midnight Snacks").
5. **Connect with Friends**
   - Generate a shareable invite link (one-click copy) and a scannable QR code to send/accept friend requests. View friends' recent logs and collections.
6. **FunFacts for Foodies (`Facts`)**
   - Daily changing food fact and history fetched from Wikipedia, cached once per day so every user sees a fresh daily story.

## Non-Functional Requirements
- Responsive, minimal, breathable editorial layout matching `docs/ui/design.md`.
- Secure server-side Google OAuth token verification.
- Input validation on all endpoints via Zod.