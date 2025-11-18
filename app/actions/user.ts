"use server";

import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { Prisma, Role } from "../generated/prisma/client";

export type SafeUser = {
  id: string;
  name: string | null;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};

export type UserFormData = {
  name: string;
  email: string;
  password?: string;
  role: Role;
};

export async function createUser(formData: FormData) {
  const rawFormData: UserFormData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    role: formData.get("role") as "USER" | "ADMIN",
  };

  // Validate required fields
  if (!rawFormData.name || !rawFormData.email || !rawFormData.password) {
    throw new Error("Name, email, and password are required");
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: rawFormData.email },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash password
  const hashedPassword = await hashPassword(rawFormData.password);

  // Create user
  await prisma.user.create({
    data: {
      name: rawFormData.name,
      email: rawFormData.email,
      password: hashedPassword,
      role: rawFormData.role,
    },
  });

  revalidatePath("/users");
}

export async function updateUser(id: string, formData: FormData) {
  const rawFormData: Partial<UserFormData> = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    role: formData.get("role") as "USER" | "ADMIN",
  };

  // Validate required fields
  if (!rawFormData.name || !rawFormData.email) {
    throw new Error("Name and email are required");
  }

  // Check if email is taken by another user
  const existingUser = await prisma.user.findFirst({
    where: {
      email: rawFormData.email,
      NOT: { id },
    },
  });

  if (existingUser) {
    throw new Error("Another user with this email already exists");
  }

  // Use Prisma's UserUpdateInput type
  const updateData: Prisma.UserUpdateInput = {
    name: rawFormData.name,
    email: rawFormData.email,
    role: rawFormData.role,
  };

  // Only update password if provided
  const password = formData.get("password") as string;
  if (password) {
    updateData.password = await hashPassword(password);
  }

  await prisma.user.update({
    where: { id },
    data: updateData,
  });

  revalidatePath("/users");
}

export async function deleteUser(id: string) {
  await prisma.user.delete({
    where: { id },
  });

  revalidatePath("/users");
}

export async function getUser(id: string): Promise<SafeUser> {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function getUsers() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
}
