# Bhukos Backend

Node.js + TypeScript + Fastify + Prisma ORM backend for Bhukos.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

3. Run migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## Health Check

GET `http://localhost:3000/health` should return:
```json
{
  "status": "ok",
  "timestamp": "2024-...",
  "database": "connected"
}
```

## Scripts

- `npm run dev` - Start development server with tsx
- `npm run build` - Build TypeScript to dist/
- `npm start` - Start production server
- `npm run typecheck` - Run TypeScript type checking