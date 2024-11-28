-- AlterTable
ALTER TABLE "User" ADD COLUMN     "customerId" TEXT;

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "providerSubscriptionId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "businessId" TEXT,
    "currencyCode" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,
    "startedAt" TEXT,
    "firstBilledAt" TEXT,
    "nextBilledAt" TEXT,
    "pausedAt" TEXT,
    "canceledAt" TEXT,
    "discount" JSONB,
    "collectionMode" TEXT NOT NULL,
    "billingDetails" JSONB,
    "currentBillingPeriod" JSONB,
    "billingCycle" JSONB NOT NULL,
    "scheduledChange" JSONB,
    "items" JSONB[],
    "customData" JSONB,
    "importMeta" JSONB,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "providerTransactionId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "customerId" TEXT,
    "adressId" TEXT,
    "businessId" TEXT,
    "customData" TEXT,
    "currencyCode" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "subscriptionId" TEXT,
    "invoiceId" TEXT,
    "invoiceNumber" TEXT,
    "collectionMode" TEXT NOT NULL,
    "discountId" TEXT,
    "billingDetails" JSONB,
    "billingPeriod" JSONB,
    "items" JSONB[],
    "details" JSONB,
    "payments" JSONB,
    "checkout" JSONB,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "billedAt" TIMESTAMP(3),

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adjustment" (
    "id" TEXT NOT NULL,
    "adjustmentId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "subscriptionId" TEXT,
    "customerId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "creditAppliedToBalance" BOOLEAN NOT NULL,
    "currencyCode" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "items" JSONB[],
    "totals" JSONB NOT NULL,
    "payoutTotals" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Adjustment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_providerSubscriptionId_key" ON "Subscription"("providerSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_providerTransactionId_key" ON "Transaction"("providerTransactionId");

-- CreateIndex
CREATE INDEX "Transaction_customerId_subscriptionId_idx" ON "Transaction"("customerId", "subscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Adjustment_adjustmentId_key" ON "Adjustment"("adjustmentId");

-- CreateIndex
CREATE INDEX "Adjustment_customerId_subscriptionId_idx" ON "Adjustment"("customerId", "subscriptionId");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "ProjectPaymentProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "ProjectPaymentProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adjustment" ADD CONSTRAINT "Adjustment_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "ProjectPaymentProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
