// prisma/seed.ts
import { PrismaClient } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
const bcrypt = require('bcryptjs')
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});
async function main() {
    const hashedPassword = bcrypt.hashSync('adminAdmin', 10)
  const admin = await prisma.user.upsert({
  where: { email: 'adinatadaffa28@Gmail.com' },
  update: {},
  create: {
    email: 'adinatadaffa28@Gmail.com',
    name: 'Saif Daffa Adinata', 
    password: hashedPassword,
    role: 'ADMIN',
  },
})

console.log('Admin user created:', admin)
await prisma.$disconnect()  
process.exit(0);
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})