/*
  Warnings:

  - You are about to drop the column `providerId` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `provider` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_providerId_fkey";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "providerId",
ADD COLUMN     "provider" "PaymentProvider" NOT NULL;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_provider_fkey" FOREIGN KEY ("provider") REFERENCES "ProjectPaymentProvider"("provider") ON DELETE RESTRICT ON UPDATE CASCADE;
