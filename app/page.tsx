import { useEffect, useState } from "react";
import { Person } from "./generated/prisma/client";
import prisma from "@/lib/prisma";

export default function Home() {
  const [persons, setPersons] = useState<Person[]>();

  useEffect(() => {
    prisma.person.findMany().then((data) => setPersons(data));
  }, []);

  return <></>;
}
