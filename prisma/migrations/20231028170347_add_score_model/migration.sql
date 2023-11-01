/*
  Warnings:

  - Added the required column `scoreId` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "scoreId" STRING NOT NULL;

-- CreateTable
CREATE TABLE "Score" (
    "id" STRING NOT NULL,
    "poor_health" FLOAT8 NOT NULL,
    "lack_of_finances" FLOAT8 NOT NULL,
    "lack_of_familly_support" FLOAT8 NOT NULL,
    "esteem" FLOAT8 NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Score_id_key" ON "Score"("id");

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_scoreId_fkey" FOREIGN KEY ("scoreId") REFERENCES "Score"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
