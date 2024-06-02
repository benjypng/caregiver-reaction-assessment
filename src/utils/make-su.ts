import prisma from "prisma/client";

const x = prisma.user.findUnique({
  where: {
    email: process.argv[2],
  },
});

console.log(x);
