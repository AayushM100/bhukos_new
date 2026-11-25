# Database Schema — Bhukos

## Entities & Relationships

1. **User (`users`)**
   - `id` (UUID, PK), `google_id` (unique), `email` (unique), `username` (unique), `display_name`, `avatar_url`, `invite_code` (unique short token for QR/links), `created_at`

2. **FoodCard (`food_cards`)**
   - `id` (UUID, PK), `name`, `slug` (unique), `category` (SNACK, DRINK)
   - `flavors` (text array / JSONB), `artwork_url`, `fun_quote`
   - `rarity` (ENUM: COMMON, UNCOMMON, RARE, EPIC, LEGENDARY)
   - `avg_rating` (Decimal 3,2 - serialized as number in API), `rating_count` (Int)
   - Indexes on `slug`, `category`, `rarity`, and `name` for filtering performance

3. **FoodLog (`food_logs`)**
   - `id` (UUID, PK), `user_id` (FK -> users), `card_id` (FK -> food_cards)
   - `rating` (Decimal 2,1, 0.5–5.0), `review_note` (text), `consumed_at` (date), `created_at`
   - *Constraint:* Index on `(user_id, created_at)` for fast profile/friend feeds.

4. **Wishlist (`wishlists`)**
   - `id` (UUID, PK), `user_id` (FK), `card_id` (FK), `created_at`
   - *Constraint:* Unique `(user_id, card_id)`.

5. **FoodList (`food_lists`) & FoodListItem (`food_list_items`)**
   - Curated user lists (`title`, `description`, `is_public`, `user_id`) and ordered items (`list_id`, `card_id`, `position`).

6. **Friendship (`friendships`)**
   - `id` (UUID, PK), `requester_id` (FK), `addressee_id` (FK), `status` (PENDING, ACCEPTED), `created_at`
   - *Constraint:* Unique `(requester_id, addressee_id)`.

7. **DailyFunFact (`daily_fun_facts`)**
   - `id` (UUID, PK), `fact_date` (Date, unique), `title`, `summary`, `wikipedia_url`, `image_url`, `fetched_at`