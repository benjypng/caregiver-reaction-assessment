// seed.ts

import { PrismaClient } from "@prisma/client";
import { createId } from "@paralleldrive/cuid2";

function generateRandomEnglishName() {
  // Generate a random English name
  const englishFirstNames = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Emily",
    "Fiona",
    "George",
  ];
  const randomEnglishFirstName =
    englishFirstNames[Math.floor(Math.random() * englishFirstNames.length)];
  const randomLastName = "Doe"; // You can modify this to generate random last names

  return randomEnglishFirstName + " " + randomLastName;
}

function generateRandomEmail(name: string) {
  // Generate a random email based on the English name
  return `${name.replace(/\s/g, ".").toLowerCase()}@nuhs.edu.sg`;
}

function generateRandomPassword() {
  // Generate a random password (you can use a password generator library for more secure passwords)
  return createId();
}

async function seedUsers() {
  const prisma = new PrismaClient();

  try {
    // Define user data for three users
    const userData = [
      {
        id: createId(),
        name: generateRandomEnglishName(),
        email: generateRandomEmail(generateRandomEnglishName()),
        password: generateRandomPassword(),
      },
      {
        id: createId(),
        name: generateRandomEnglishName(),
        email: generateRandomEmail(generateRandomEnglishName()),
        password: generateRandomPassword(),
      },
      {
        id: createId(),
        name: generateRandomEnglishName(),
        email: generateRandomEmail(generateRandomEnglishName()),
        password: generateRandomPassword(),
      },
    ];

    // Insert user data into the database
    for (const user of userData) {
      await prisma.user.create({
        data: user,
      });
    }

    console.log("Users seeded successfully");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedUsers();
