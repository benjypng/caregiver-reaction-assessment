import { Prisma, PrismaClient } from '@prisma/client';

import {
  generateHashPassword,
  generatePlainPassword,
} from '../src/utils/generate-pw';

const prisma = new PrismaClient();

async function seed() {
  const userData: Prisma.UserCreateInput[] = [
    {
      name: 'Jayden Tan',
      email: 'test@test.com',
      password: await generateHashPassword(generatePlainPassword()),
    },
  ];
  console.log('Start seeding...');
  for (const user of userData) {
    await prisma.user.create({ data: user });
    console.log(`Created user: ${user.name}`);
  }
  console.log('Seeding finished.');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
