/* eslint-disable no-var */
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

// Export the prisma instance as a named export
export const prisma = global.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  global.prismaGlobal = prisma
}
