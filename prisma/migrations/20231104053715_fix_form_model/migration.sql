/*
  Warnings:

  - The values [Degree and above] on the enum `education_level` will be removed. If these variants are still used in the database, this will fail.
  - The values [Not working] on the enum `employment_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "education_level" ADD VALUE 'DEGREE';
ALTER TYPE "education_level"DROP VALUE 'Degree and above';

-- AlterEnum
ALTER TYPE "employment_status" ADD VALUE 'UNEMPLOYED';
ALTER TYPE "employment_status"DROP VALUE 'Not working';
