import { PrismaClient, Prisma } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Chan Li Shan",
    email: "chan_lishan@nuhs.edu.sg",
    password: generateRandomString(),
  },
  {
    name: "Philip Chan",
    email: "philip_yuen_chiu_chan@nuhs.edu.sg",
    password: generateRandomString(),
  },
  {
    name: "Chew Tee Kit",
    email: "tee_kit_chew@nuhs.edu.sg",
    password: generateRandomString(),
  },
  {
    name: "Samuel Tan",
    email: "samuel_tan@nuhs.edu.sg",
    password: generateRandomString(),
  },
  {
    name: "Celine Tham",
    email: "celine_tham@nuhs.edu.sg",
    password: generateRandomString(),
  },
  {
    name: "Ho Bee Hong",
    email: "bee_hong_ho@nuhs.edu.sg",
    password: generateRandomString(),
  },
  {
    name: "Khoo Chew Yen",
    email: "chew_yen_khoo@nuhs.edu.sg",
    password: generateRandomString(),
  },
  {
    name: "Koh Li Lian",
    email: "lilian_koh@nuhs.edu.sg",
    password: generateRandomString(),
  },
  {
    name: "Zeng Hui Hui",
    email: "hui_hui_zeng@nuhs.edu.sg",
    password: generateRandomString(),
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
