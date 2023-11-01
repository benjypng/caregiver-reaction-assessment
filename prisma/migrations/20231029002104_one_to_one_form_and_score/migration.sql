/*
  Warnings:

  - You are about to drop the column `scoreId` on the `Form` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[formId]` on the table `Score` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `formId` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_scoreId_fkey";

-- AlterTable
ALTER TABLE "Form" DROP COLUMN "scoreId";

-- AlterTable
ALTER TABLE "Score" ADD COLUMN     "formId" STRING NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Score_formId_key" ON "Score"("formId");

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
