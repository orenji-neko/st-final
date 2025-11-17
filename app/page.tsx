import { Person } from "./generated/prisma/client";
import prisma from "@/lib/prisma";

export default async function Home() {
  const persons: Person[] = await prisma.person.findMany();

  return <>{persons && persons.map((p) => <p key={p.id}>{p.name}</p>)}</>;
}
