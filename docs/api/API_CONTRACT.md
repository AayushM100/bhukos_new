# API Contract — Bhukos (`/api/v1`)

All responses use standard JSON format. Errors follow:
`{ "error": { "code": "STRING_CODE", "message": "Human readable message", "details": {} } }`

## 1. Auth
- `POST /api/v1/auth/google` (Public)
  - Body: `{ "idToken": "string" }`
  - Response `200`: `{ "user": UserDTO }` + sets `bhukos_session` cookie.
- `GET /api/v1/auth/me` (Auth optional or returns `401`)
  - Response `200`: `{ "user": UserDTO }`
- `POST /api/v1/auth/logout` (Auth)
  - Response `204`

## 2. Public Landing & FunFacts
- `GET /api/v1/facts/today` (Public)
  - Response `200`: `{ "factDate": "YYYY-MM-DD", "title": "string", "summary": "string", "wikipediaUrl": "string", "imageUrl": "string | null" }`
- `GET /api/v1/cards` (Public showcase / Auth searchable)
  - Query: `?search=&category=&rarity=&page=1&limit=20`
  - Response `200`: `{ "items": FoodCardDTO[], "total": number, "page": number, "totalPages": number }`
- `GET /api/v1/cards/:slug` (Public)
  - Response `200`: `FoodCardDetailDTO`

## 3. Food Logs & My Collection (Requires Auth)
- `POST /api/v1/logs`
  - Body: `{ "cardId": "uuid", "rating": 4.5, "reviewNote": "string?", "consumedAt": "YYYY-MM-DD" }`
  - Response `201`: `{ "log": FoodLogDTO, "unlockedCard": boolean }`
- `GET /api/v1/logs/me`
  - Query: `?page=1&limit=20`
  - Response `200`: `{ "items": FoodLogDTO[], "total": number }`
- `PATCH /api/v1/logs/:logId`
  - Body: `{ "rating"?: number, "reviewNote"?: string, "consumedAt"?: "YYYY-MM-DD" }`
  - Response `200`: `FoodLogDTO`
- `DELETE /api/v1/logs/:logId`
  - Response `204`
- `GET /api/v1/collection/me`
  - Query: `?rarity=&category=&page=1&limit=24`
  - Response `200`: `{ "items": CollectedCardDTO[], "stats": { "totalUnlocked": number, "byRarity": Record<Rarity, number> } }`

## 4. Wishlist (Requires Auth)
- `GET /api/v1/wishlist`
  - Response `200`: `{ "items": WishlistItemDTO[] }`
- `POST /api/v1/wishlist`
  - Body: `{ "cardId": "uuid" }`
  - Response `201`: `WishlistItemDTO`
- `DELETE /api/v1/wishlist/:cardId`
  - Response `204`

## 5. Lists (Requires Auth)
- `GET /api/v1/lists/me` -> `{ "items": FoodListDTO[] }`
- `POST /api/v1/lists` -> Body: `{ "title": "string", "description": "string?", "isPublic": boolean }` -> `201`
- `POST /api/v1/lists/:listId/items` -> Body: `{ "cardId": "uuid" }` -> `201`
- `DELETE /api/v1/lists/:listId/items/:cardId` -> `204`

## 6. Friends & QR Invites (Requires Auth)
- `GET /api/v1/friends`
  - Response `200`: `{ "friends": FriendDTO[], "pendingReceived": FriendRequestDTO[], "pendingSent": FriendRequestDTO[], "feed": FriendLogDTO[] }`
- `GET /api/v1/friends/invite-info`
  - Response `200`: `{ "inviteCode": "string", "inviteUrl": "string" }`
- `POST /api/v1/friends/invite/:inviteCode`
  - Sends or auto-creates a pending friend request to the owner of `inviteCode`.
  - Response `201`: `{ "friendshipId": "uuid", "status": "PENDING" }`
- `PATCH /api/v1/friends/requests/:friendshipId`
  - Body: `{ "action": "ACCEPT" | "REJECT" }`
  - Response `200`: `{ "status": "ACCEPTED" | "REJECTED" }`

## 7. Profile (Requires Auth)
- `GET /api/v1/profile/me` -> `{ "user": UserProfileDTO, "recentLogs": FoodLogDTO[], "cardCount": number, "friendCount": number, "wishlistCount": number }`
- `PATCH /api/v1/profile/me` -> Body: `{ "username"?: "string", "displayName"?: "string" }` -> `200`