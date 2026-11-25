-- CreateEnum
CREATE TYPE "Category" AS ENUM ('SNACK', 'DRINK');

-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY');

-- CreateTable
CREATE TABLE "food_cards" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "flavors" TEXT[],
    "artworkUrl" TEXT NOT NULL,
    "funQuote" TEXT NOT NULL,
    "rarity" "Rarity" NOT NULL,
    "avgRating" DECIMAL(3,2) NOT NULL DEFAULT 0,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "food_cards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "food_cards_slug_key" ON "food_cards"("slug");

-- CreateIndex
CREATE INDEX "food_cards_slug_idx" ON "food_cards"("slug");

-- CreateIndex
CREATE INDEX "food_cards_category_idx" ON "food_cards"("category");

-- CreateIndex
CREATE INDEX "food_cards_rarity_idx" ON "food_cards"("rarity");

-- CreateIndex
CREATE INDEX "food_cards_name_idx" ON "food_cards"("name");
