// src/lib/prisma.ts

import { PrismaClient }  from '@prisma/client';

// This is the standard Prisma singleton pattern.
// It creates one instance of PrismaClient and exports it.

// Add `prisma` to the NodeJS `global` object in development to prevent
// hot-reloading from creating too many instances of PrismaClient.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // Optional: Logs every query to the console in development
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;