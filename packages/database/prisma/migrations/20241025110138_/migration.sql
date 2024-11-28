-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('onetime', 'subscription');

-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('flat', 'percentage');

-- CreateEnum
CREATE TYPE "PlanInterval" AS ENUM ('day', 'week', 'month', 'year');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "features" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "type" "ProductType" NOT NULL DEFAULT 'onetime',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "productId" TEXT NOT NULL,
    "intervalCount" INTEGER NOT NULL,
    "interval" "PlanInterval" NOT NULL,
    "isHasTrial" BOOLEAN NOT NULL DEFAULT false,
    "trialIntervalCount" INTEGER NOT NULL,
    "trialInterval" "PlanInterval" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discount" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "DiscountType" NOT NULL DEFAULT 'flat',
    "amount" INTEGER NOT NULL,
    "validUntil" TIMESTAMP(3),
    "plans" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "oneTimeProducts" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "maxRedemptions" INTEGER NOT NULL DEFAULT -1,
    "maxRedemptionsPerUser" INTEGER NOT NULL DEFAULT -1,
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "durationInMonths" INTEGER,
    "maximumRecurringIntervals" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Discount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Product_slug_type_idx" ON "Product"("slug", "type");

-- CreateIndex
CREATE INDEX "Plan_slug_idx" ON "Plan"("slug");

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
