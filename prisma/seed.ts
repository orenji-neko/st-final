import { PrismaClient, Prisma } from "../app/generated/prisma/client";

const prisma = new PrismaClient();

const persons: Prisma.PersonCreateInput[] = [
  {
    name: "John Doe"
  },
  {
    name: "Mark Enfermo"
  }
];

export async function main() {
  for (const u of persons) {
    await prisma.person.create({ data: u });
  }
}

main();