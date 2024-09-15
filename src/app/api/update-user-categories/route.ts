import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerAuthSession } from '~/server/auth';

interface RequestBody {
  categories: string[];
}

export async function POST(request: Request) {
  const session = await getServerAuthSession();
  const prisma = new PrismaClient();
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  try {
    // Parseamos el JSON de forma segura
    const body = await request.json() as unknown;

    // Validamos si body es del tipo esperado
    if (!body || !Array.isArray((body as RequestBody).categories)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { categories } = body as RequestBody;

    await prisma.user.update({
      where: { id: userId },
      data: { categories: { set: categories } },
    });

    return NextResponse.json({ message: 'Categories updated successfully' });
  } catch (error: unknown) {
    console.error('Error updating categories:', error);
    return NextResponse.json({ error: 'Failed to update categories' }, { status: 500 });
  }
}
