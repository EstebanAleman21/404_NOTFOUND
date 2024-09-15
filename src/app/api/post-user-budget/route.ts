import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerAuthSession } from '~/server/auth';

interface RequestBody {
  userId: string;
  amount: number;
  period: string;
  category: string;
  isValid: boolean;
}


export async function POST(request: Request) {
  const session = await getServerAuthSession();
  const prisma = new PrismaClient();

  if (!session) {
    return NextResponse.redirect('/login');
  }

  try {
    const body = await request.json() as unknown;

    const { amount, period, category, isValid } = body as RequestBody;

    await prisma.budget.create({
      data: {
        userId: session.user.id,
        amount,
        period,
        category,
        isValid,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return NextResponse.json({ success: false });
  } 
}