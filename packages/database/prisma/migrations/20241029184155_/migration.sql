/*
  Warnings:

  - You are about to drop the column `providerId` on the `Adjustment` table. All the data in the column will be lost.
  - Added the required column `provider` to the `Adjustment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Adjustment" DROP CONSTRAINT "Adjustment_providerId_fkey";

-- AlterTable
ALTER TABLE "Adjustment" DROP COLUMN "providerId",
ADD COLUMN     "provider" "PaymentProvider" NOT NULL;

-- AddForeignKey
ALTER TABLE "Adjustment" ADD CONSTRAINT "Adjustment_provider_fkey" FOREIGN KEY ("provider") REFERENCES "ProjectPaymentProvider"("provider") ON DELETE RESTRICT ON UPDATE CASCADE;
