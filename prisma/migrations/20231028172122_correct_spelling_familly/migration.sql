/*
  Warnings:

  - You are about to drop the column `lack_of_familly_support` on the `Score` table. All the data in the column will be lost.
  - Added the required column `lack_of_family_support` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Score" DROP COLUMN "lack_of_familly_support";
ALTER TABLE "Score" ADD COLUMN     "lack_of_family_support" FLOAT8 NOT NULL;
