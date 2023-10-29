/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `MSW` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "MSW_id_key";

-- CreateTable
CREATE TABLE "Session" (
    "id" STRING NOT NULL,
    "sessionToken" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "MSW_email_key" ON "MSW"("email");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "MSW"("id") ON DELETE CASCADE ON UPDATE CASCADE;
