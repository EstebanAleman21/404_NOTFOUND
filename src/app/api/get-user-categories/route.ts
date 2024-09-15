/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerAuthSession } from '~/server/auth';

export async function GET() {
  const session = await getServerAuthSession();
  const prisma = new PrismaClient();
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { categories: true },
    });

    console.log('User data:', user);

    const categories = user?.categories ?? [];

    console.log('Categories:', categories);

    return NextResponse.json({ categories });

  } catch (error: unknown) {
    console.error('Error getting user categories:', error);

    let errorMessage = 'Failed to get user categories';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}