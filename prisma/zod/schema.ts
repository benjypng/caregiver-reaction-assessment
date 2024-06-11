import { z } from 'zod';

export const age_groupSchema = z.enum([
  'BELOW_21',
  'FROM_21_TO_30',
  'FROM_31_TO_40',
  'FROM_41_TO_50',
  'FROM_51_TO_60',
  'FROM_61_TO_70',
  'ABOVE_70',
]);

export const genderSchema = z.enum(['MALE', 'FEMALE', 'OTHERS']);

export const raceSchema = z.enum(['CHINESE', 'MALAY', 'INDIAN', 'OTHERS']);

export const marital_statusSchema = z.enum([
  'SINGLE',
  'MARRIED',
  'WIDOWED',
  'DIVORCED',
]);

export const education_levelSchema = z.enum([
  'PRIMARY',
  'SECONDARY',
  'ITE',
  'DIPLOMA',
  'OTHERS',
  'DEGREE',
]);

export const employment_statusSchema = z.enum([
  'FULLTIME',
  'PARTTIME',
  'UNEMPLOYED',
]);

export const caregiving_lengthSchema = z.enum([
  'BELOW_1_YEAR',
  'FROM_1_TO_3_YEARS',
  'FROM_4_TO_6_YEARS',
  'FROM_7_TO_10_YEARS',
  'FROM_11_TO_20_YEARS',
  'ABOVE_21_YEARS',
]);

export const FormSchema = z.object({
  age_group: age_groupSchema,
  gender: genderSchema,
  race: raceSchema,
  marital_status: marital_statusSchema,
  education_level: education_levelSchema,
  employment_status: employment_statusSchema,
  caregiving_length: caregiving_lengthSchema,
  survey_date: z.coerce.date(),
  main_caregiver: z.boolean(),
  qn1: z.string(),
  qn2: z.string(),
  qn3: z.string(),
  qn4: z.string(),
  qn5: z.string(),
  qn6: z.string(),
  qn7: z.string(),
  qn8: z.string(),
  qn9: z.string(),
  qn10: z.string(),
  qn11: z.string(),
  qn12: z.string(),
  qn13: z.string(),
  qn14: z.string(),
  qn15: z.string(),
  qn16: z.string(),
  qn17: z.string(),
  qn18: z.string(),
  qn19: z.string(),
  qn20: z.string(),
  qn21: z.string(),
  poor_health: z.number(),
  lack_of_finances: z.number(),
  lack_of_family_support: z.number(),
  esteem: z.number(),
  userId: z.string().nullable(),
});

export const ScoreSchema = z.object({
  poor_health: z.number(),
  lack_of_finances: z.number(),
  lack_of_family_support: z.number(),
  esteem: z.number(),
});

export const CredentialsSchema = z.object({
  email: z.string(),
  password: z.string().min(5).max(20),
});

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  is_admin: z.boolean(),
});
