web application/stitch/projects/12705068288408841835/screens/468e81e847434971970e84652ec8fef0
# DESIGN.md — Bhukos Press Design System

> **Bhukos** is an editorial social food-logging and collectible snack card platform for foodie friend groups, inspired by Letterboxd’s calm density and the tactile craft of independent culinary zines, archival ledgers, and specimen books.

---

## 1. Design Principles & Anti-AI Philosophy

- **Tactile Print & Archival Quality:** Designed to look and feel like unbleached acid-free paper, letterpress ink, and archival specimen folios.
- **Calm, Deliberate Density:** Avoid empty floating cards or sterile SaaS dashboard templates. Use clear hairlines (`1px`), dense metadata typography, and intentional asymmetry.
- **Zero Generic "AI" Aesthetic:**
  - ❌ No neon or vivid mesh gradients.
  - ❌ No bubbly, glossy, highly rounded SaaS containers.
  - ❌ No heavy drop shadows or diffuse blur glows.
  - ❌ No repetitive cookie-cutter 3-column feature grids.
  - ❌ No plain rectangular default grey boxes.
- **Strict Gated Action Pattern:** Unauthenticated users see all editorial content and rarity cards in full fidelity, but any interactive action (*Log, Wishlist, Connect with Friends, Collect, Lists, Profile*) triggers the centered Google OAuth 2.0 modal.

---

## 2. Color Palette & Surface Tokens

### Core Surfaces (Unbleached Paper & Ink)
- **Base Surface (`surface`):** `#FFF8F5` — Warm unbleached paper / archival newsprint.
- **Surface Dim (`surface-dim`):** `#E0D8D5` — Light parchment tone for subtle background contrast.
- **Surface Low Container (`surface-container-low`):** `#FAF2EE` — Section backgrounds, callouts, and card wells.
- **Surface Container Lowest (`surface-container-lowest`):** `#FFFFFF` — Pure white reserved strictly for specimen card insets and OAuth pop-ups.
- **Primary Ink / High Contrast (`on-surface`):** `#1C1917` — Warm espresso/charcoal deep ink for headings and primary CTAs.
- **Secondary Ink (`on-surface-variant`):** `#57534E` — Stone muted grey for body descriptions and subtext.
- **Micro-Label Ink (`outline`):** `#78716C` / `#A8A29E` — Low-contrast ink for metadata, issues, and dates.

### Culinary Accent Colors
- **Burnt Sienna / Primary Culinary Accent:** `#78350F` — Editorial italics, primary links, key CTA buttons.
- **Terracotta / Saffron Tint:** `#C2410C` / `#D97706` — Accent highlights, status tags, daily streak flame.
- **Archival Olive:** `#3F6212` / `#4D7C0F` — Secondary culinary taxonomy tags.

### Collectible Card Rarity Tiers (Restrained Archival Foils)
- **COMMON (✦):** Charcoal letterpress ink on unbleached cardstock (`border-stone-300`, `bg-[#faf6ee]`, badge `#57534E`).
- **UNCOMMON (✦✦):** Olive/sage vegetal tint (`border-emerald-700/30`, badge `#15803D`, background tint `#F0FDF4`).
- **RARE (★★★):** Deep plum / crimson gilded archival border (`border-rose-900/30`, badge `#9F1239`, background tint `#FFF1F2`).
- **EPIC (★★★★):** Warm gilded ochre / antique bronze hairline foil (`border-amber-700/50`, dual hairline frame, badge `#B45309`, background tint `#FFFBEB`).
- **LEGENDARY (✦✦✦✦✦):** Duotone acid-free prismatic foil seal (`border-stone-800` with subtle double-ruled gilded inner line, badge `#1C1917`).

---

## 3. Typography System

| Role | Font Family | Weight | Tracking & Transform | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Editorial Display Headings** | `Newsreader`, `Playfair Display`, serif | Medium (500) / Semi-bold (600) | Normal / Italic accents (`italic font-normal font-serif`) | Page hero headlines, section titles, card names |
| **Primary Body & Reading** | `Plus Jakarta Sans`, system-ui, sans-serif | Regular (400) / Medium (500) | Tight / normal | Body text, dish descriptions, curator notes |
| **Tabular Numbers & Metrics** | `JetBrains Mono`, `Roboto Mono`, monospace | Medium (500) / Bold (700) | Monospace tabular figures | Streak counters, ratings (`4.6 / 5`), card IDs (`#014`) |
| **Archival Micro-Labels & Tags** | `JetBrains Mono` or clean Sans-Serif | Bold (600 / 700) | `uppercase tracking-widest text-[10px]` | Issue numbers, date stamps, rarity badges, taxonomy tags |

---

## 4. Spacing, Borders & Structural Layout

- **Hairline Dividers:** Always crisp `1px` solid borders (`border-stone-900/15` or `border-stone-300`). Never soft diffuse drop shadows.
- **Border Radius:** Restrained and subtle (`rounded-none`, `rounded-sm`, or `rounded-md` max `4px`–`6px`). No pill cards or bulbous mobile widgets.
- **Editorial Asymmetry:** Pair left-aligned hero narrative copy with right-anchored structured interactive gates (e.g., the Member Gate box).
- **Fixed Aspect Ratio Containers:** All visual dish artwork in trading cards enforces a strict `4:3` or `1:1` aspect ratio with `object-cover` so baseline text always aligns horizontally across columns.

---

## 5. Signature Components & Patterns

### 1. The Collectible Snack Card
- **Header:** Mono card specimen number (`#014`), rarity pip (`RARE • #089`), and community score (`★ 4.6 (92)`).
- **Artwork Frame:** Framed 2D visual art with subtle paper texture border and fixed `4:3` ratio.
- **Title & Quote:** Serif dish name followed by an italicized curator quote in quotation marks.
- **Flavor Profile Tags:** Micro uppercase brackets: `[ UMAMI ]`, `[ TANGY ]`, `[ SPICY ]`, `[ SMOKY ]`.

### 2. Daily Wikipedia Food Lore Panel
- A distinct letterpress callout with a daily calendar date tag (e.g., `24 OCT`), quote marks, verified culinary lore snippet, carousel/rotation indicators (`01 / 03`), and a direct link to the Wikipedia culinary archive.

### 3. Member Gate (Google OAuth Pop-up)
- Framed with a crisp hairline border (`border-stone-900/25`), containing the official Google emblem, "Continue with Google" button, and security subtext ("No public algorithms • Acid-free digital rag").
