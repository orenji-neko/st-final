import "server-only"

import { PrismaClient } from "../app/generated/prisma/client";
import path from "path";

const getDatabaseUrl = () => {
  const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');
  return `file:${dbPath}`;
};

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: getDatabaseUrl()
    }
  }
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;