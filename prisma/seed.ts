import { PrismaClient, Prisma } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "admin",
    email: "admin@nuhs.edu.sg",
    password: generateRandomString(),
    is_admin: true,
  },
];

function generateRandomString(length: number = 16): string {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") // convert to hexadecimal format
    .slice(0, length); // return required number of characters
}

async function seed() {
  console.log("Start seeding...");
  for (const user of userData) {
    await prisma.user.create({ data: user });
    console.log(`Created user: ${user.name}`);
  }
  console.log("Seeding finished.");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
