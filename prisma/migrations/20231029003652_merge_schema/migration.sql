/*
  Warnings:

  - You are about to drop the `Score` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `esteem` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lack_of_family_support` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lack_of_finances` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poor_health` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_formId_fkey";

-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "esteem" FLOAT8 NOT NULL;
ALTER TABLE "Form" ADD COLUMN     "lack_of_family_support" FLOAT8 NOT NULL;
ALTER TABLE "Form" ADD COLUMN     "lack_of_finances" FLOAT8 NOT NULL;
ALTER TABLE "Form" ADD COLUMN     "poor_health" FLOAT8 NOT NULL;

-- DropTable
DROP TABLE "Score";
