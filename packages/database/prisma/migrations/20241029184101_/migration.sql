/*
  Warnings:

  - You are about to drop the column `adjustmentId` on the `Adjustment` table. All the data in the column will be lost.
  - The `customData` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[providerAdjustmentId]` on the table `Adjustment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `providerAdjustmentId` to the `Adjustment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Adjustment_adjustmentId_key";

-- AlterTable
ALTER TABLE "Adjustment" DROP COLUMN "adjustmentId",
ADD COLUMN     "providerAdjustmentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "customData",
ADD COLUMN     "customData" JSONB;

-- CreateIndex
CREATE UNIQUE INDEX "Adjustment_providerAdjustmentId_key" ON "Adjustment"("providerAdjustmentId");
