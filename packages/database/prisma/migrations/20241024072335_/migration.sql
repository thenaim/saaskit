/*
  Warnings:

  - Changed the type of `provider` on the `AuthAccount` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "AuthAccount" DROP COLUMN "provider",
ADD COLUMN     "provider" "AuthProvider" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AuthAccount_provider_providerUserId_key" ON "AuthAccount"("provider", "providerUserId");
