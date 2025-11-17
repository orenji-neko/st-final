  'use server';
  import { verifyPassword, createSession, hashPassword } from '@/lib/auth';
  import prisma from '@/lib/prisma';
  import { redirect } from 'next/navigation';
  import { cookies } from 'next/headers';

  export async function signup(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { token, expires } = await createSession(user.id);
    (await cookies()).set('session', token, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    redirect('/dashboard');
  }

  export async function signin(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Verify user exists and password is correct
    if (!user || !(await verifyPassword(password, user.password))) {
      // You might want to handle this differently, like returning an error message
      throw new Error('Invalid email or password');
    }

    // Create session
    const { token, expires } = await createSession(user.id);
    (await cookies()).set('session', token, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    redirect('/dashboard');
  }

  export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
    redirect('/login');
  }