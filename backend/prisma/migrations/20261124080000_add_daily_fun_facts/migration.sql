-- CreateTable
CREATE TABLE "daily_fun_facts" (
    "id" TEXT NOT NULL,
    "factDate" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "wikipediaUrl" TEXT NOT NULL,
    "imageUrl" TEXT,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "daily_fun_facts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "daily_fun_facts_factDate_key" ON "daily_fun_facts"("factDate");