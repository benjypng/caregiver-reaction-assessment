-- CreateEnum
CREATE TYPE "age_group" AS ENUM ('Below 21', '21 to 30', '31 to 40', '41 to 30', '51 to 60', '61 to 70', 'Above 70');

-- CreateEnum
CREATE TYPE "gender" AS ENUM ('male', 'female', 'others');

-- CreateEnum
CREATE TYPE "race" AS ENUM ('chinese', 'malay', 'indian', 'others');

-- CreateEnum
CREATE TYPE "marital_status" AS ENUM ('single', 'married', 'widowed', 'divorced');

-- CreateEnum
CREATE TYPE "education_level" AS ENUM ('primary', 'secondary', 'ite', 'diploma', 'others', 'Degree and above');

-- CreateEnum
CREATE TYPE "employment_status" AS ENUM ('fulltime', 'parttime', 'Not working');

-- CreateEnum
CREATE TYPE "caregiving_length" AS ENUM ('one', 'two', 'three', 'four', 'five', 'six');

-- CreateTable
CREATE TABLE "Form" (
    "id" STRING NOT NULL,
    "survey_date" TIMESTAMP(3) NOT NULL,
    "age_group" "age_group" NOT NULL,
    "gender" "gender" NOT NULL,
    "race" "race" NOT NULL,
    "marital_status" "marital_status" NOT NULL,
    "education_level" "education_level" NOT NULL,
    "employment_status" "employment_status" NOT NULL,
    "main_caregiver" BOOL NOT NULL,
    "caregiving_length" "caregiving_length" NOT NULL,
    "mSWId" STRING NOT NULL,
    "qn1" STRING NOT NULL,
    "qn2" STRING NOT NULL,
    "qn3" STRING NOT NULL,
    "qn4" STRING NOT NULL,
    "qn5" STRING NOT NULL,
    "qn6" STRING NOT NULL,
    "qn7" STRING NOT NULL,
    "qn8" STRING NOT NULL,
    "qn9" STRING NOT NULL,
    "qn10" STRING NOT NULL,
    "qn11" STRING NOT NULL,
    "qn12" STRING NOT NULL,
    "qn13" STRING NOT NULL,
    "qn14" STRING NOT NULL,
    "qn15" STRING NOT NULL,
    "qn16" STRING NOT NULL,
    "qn17" STRING NOT NULL,
    "qn18" STRING NOT NULL,
    "qn19" STRING NOT NULL,
    "qn20" STRING NOT NULL,
    "qn21" STRING NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MSW" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,

    CONSTRAINT "MSW_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Form_id_key" ON "Form"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MSW_id_key" ON "MSW"("id");

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_mSWId_fkey" FOREIGN KEY ("mSWId") REFERENCES "MSW"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
