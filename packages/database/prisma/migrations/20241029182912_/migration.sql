/*
  Warnings:

  - You are about to drop the column `adressId` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "adressId",
ADD COLUMN     "addressId" TEXT;
