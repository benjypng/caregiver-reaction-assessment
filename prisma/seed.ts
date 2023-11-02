import { PrismaClient } from "@prisma/client";
import { createId } from "@paralleldrive/cuid2";

const prisma = new PrismaClient();

const userData = [
  {
    name: "Amber Kwek",
    email: "amber_kwek@nuhs.edu.sg",
  },
];

async function seedUsers() {
  for (const user of userData) {
    const userId = createId();
    await prisma.user.create({
      data: {
        id: userId,
        name: user.name,
        email: user.email,
        password: "",
      },
    });
    console.log(`User with ID ${userId} and name ${user.name} created.`);
  }
}

seedUsers()
  .catch((error) => {
    console.error("Error seeding users:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
