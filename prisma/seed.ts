import { PrismaClient, Prisma } from "@prisma/client";
import crypto from "crypto";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const generateRandomString = async (): Promise<string> => {
  const length = 8;

  const plainPassword = crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") // convert to hexadecimal format
    .slice(0, length); // return required number of characters

  console.log("PW", plainPassword);

  const hashedPassword = await bcrypt.hash(
    plainPassword,
    await bcrypt.genSalt(10),
  );

  return hashedPassword;
};

async function seed() {
  const userData: Prisma.UserCreateInput[] = [
    {
      name: "Jayden Tan",
      email: "test@test.com",
      password: await generateRandomString(),
    },
  ];
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
