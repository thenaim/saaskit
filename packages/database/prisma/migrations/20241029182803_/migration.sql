/*
  Warnings:

  - You are about to drop the column `providerId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `provider` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_providerId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "providerId",
ADD COLUMN     "provider" "PaymentProvider" NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_provider_fkey" FOREIGN KEY ("provider") REFERENCES "ProjectPaymentProvider"("provider") ON DELETE RESTRICT ON UPDATE CASCADE;
