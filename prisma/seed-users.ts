import { Prisma, PrismaClient } from '@prisma/client'

import { userList } from './user-list'

const prisma = new PrismaClient()
const users: Prisma.UserCreateInput[] = userList

async function seedUsers() {
  console.log('Start seeding...')
  for (const user of users) {
    await prisma.user.create({ data: user })
    console.log(`Created user: ${user.name}`)
  }
  console.log('Seeding finished.')
}

seedUsers()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
