/*
  Warnings:

  - The values [Below 21,21 to 30,31 to 40,41 to 30,51 to 60,61 to 70,Above 70] on the enum `age_group` will be removed. If these variants are still used in the database, this will fail.
  - The values [one,two,three,four,five,six] on the enum `caregiving_length` will be removed. If these variants are still used in the database, this will fail.
  - The values [primary,secondary,ite,diploma,others] on the enum `education_level` will be removed. If these variants are still used in the database, this will fail.
  - The values [fulltime,parttime] on the enum `employment_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [male,female,others] on the enum `gender` will be removed. If these variants are still used in the database, this will fail.
  - The values [single,married,widowed,divorced] on the enum `marital_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [chinese,malay,indian,others] on the enum `race` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "age_group" ADD VALUE 'BELOW_21';
ALTER TYPE "age_group" ADD VALUE 'FROM_21_TO_30';
ALTER TYPE "age_group" ADD VALUE 'FROM_31_TO_40';
ALTER TYPE "age_group" ADD VALUE 'FROM_41_TO_50';
ALTER TYPE "age_group" ADD VALUE 'FROM_51_TO_60';
ALTER TYPE "age_group" ADD VALUE 'FROM_61_TO_70';
ALTER TYPE "age_group" ADD VALUE 'ABOVE_70';
ALTER TYPE "age_group"DROP VALUE 'Below 21';
ALTER TYPE "age_group"DROP VALUE '21 to 30';
ALTER TYPE "age_group"DROP VALUE '31 to 40';
ALTER TYPE "age_group"DROP VALUE '41 to 30';
ALTER TYPE "age_group"DROP VALUE '51 to 60';
ALTER TYPE "age_group"DROP VALUE '61 to 70';
ALTER TYPE "age_group"DROP VALUE 'Above 70';

-- AlterEnum
ALTER TYPE "caregiving_length" ADD VALUE 'BELOW_1_YEAR';
ALTER TYPE "caregiving_length" ADD VALUE 'FROM_1_TO_3_YEARS';
ALTER TYPE "caregiving_length" ADD VALUE 'FROM_4_TO_6_YEARS';
ALTER TYPE "caregiving_length" ADD VALUE 'FROM_7_TO_10_YEARS';
ALTER TYPE "caregiving_length" ADD VALUE 'FROM_11_TO_20_YEARS';
ALTER TYPE "caregiving_length" ADD VALUE 'ABOVE_21_YEARS';
ALTER TYPE "caregiving_length"DROP VALUE 'one';
ALTER TYPE "caregiving_length"DROP VALUE 'two';
ALTER TYPE "caregiving_length"DROP VALUE 'three';
ALTER TYPE "caregiving_length"DROP VALUE 'four';
ALTER TYPE "caregiving_length"DROP VALUE 'five';
ALTER TYPE "caregiving_length"DROP VALUE 'six';

-- AlterEnum
ALTER TYPE "education_level" ADD VALUE 'PRIMARY';
ALTER TYPE "education_level" ADD VALUE 'SECONDARY';
ALTER TYPE "education_level" ADD VALUE 'ITE';
ALTER TYPE "education_level" ADD VALUE 'DIPLOMA';
ALTER TYPE "education_level" ADD VALUE 'OTHERS';
ALTER TYPE "education_level"DROP VALUE 'primary';
ALTER TYPE "education_level"DROP VALUE 'secondary';
ALTER TYPE "education_level"DROP VALUE 'ite';
ALTER TYPE "education_level"DROP VALUE 'diploma';
ALTER TYPE "education_level"DROP VALUE 'others';

-- AlterEnum
ALTER TYPE "employment_status" ADD VALUE 'FULLTIME';
ALTER TYPE "employment_status" ADD VALUE 'PARTTIME';
ALTER TYPE "employment_status"DROP VALUE 'fulltime';
ALTER TYPE "employment_status"DROP VALUE 'parttime';

-- AlterEnum
ALTER TYPE "gender" ADD VALUE 'MALE';
ALTER TYPE "gender" ADD VALUE 'FEMALE';
ALTER TYPE "gender" ADD VALUE 'OTHERS';
ALTER TYPE "gender"DROP VALUE 'male';
ALTER TYPE "gender"DROP VALUE 'female';
ALTER TYPE "gender"DROP VALUE 'others';

-- AlterEnum
ALTER TYPE "marital_status" ADD VALUE 'SINGLE';
ALTER TYPE "marital_status" ADD VALUE 'MARRIED';
ALTER TYPE "marital_status" ADD VALUE 'WIDOWED';
ALTER TYPE "marital_status" ADD VALUE 'DIVORCED';
ALTER TYPE "marital_status"DROP VALUE 'single';
ALTER TYPE "marital_status"DROP VALUE 'married';
ALTER TYPE "marital_status"DROP VALUE 'widowed';
ALTER TYPE "marital_status"DROP VALUE 'divorced';

-- AlterEnum
ALTER TYPE "race" ADD VALUE 'CHINESE';
ALTER TYPE "race" ADD VALUE 'MALAY';
ALTER TYPE "race" ADD VALUE 'INDIAN';
ALTER TYPE "race" ADD VALUE 'OTHERS';
ALTER TYPE "race"DROP VALUE 'chinese';
ALTER TYPE "race"DROP VALUE 'malay';
ALTER TYPE "race"DROP VALUE 'indian';
ALTER TYPE "race"DROP VALUE 'others';
