/*
  Warnings:

  - You are about to drop the column `mSWId` on the `Form` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_mSWId_fkey";

-- AlterTable
ALTER TABLE "Form" DROP COLUMN "mSWId";
ALTER TABLE "Form" ADD COLUMN     "userId" STRING;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
