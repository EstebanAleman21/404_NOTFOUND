import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerAuthSession } from '~/server/auth';

interface RequestBody {
    budgetId: string;
    amount: number;
}

export async function POST(request: Request) {
    const session = await getServerAuthSession();
    const prisma = new PrismaClient();

    if (!session) {
        return NextResponse.redirect('/login');
    }

    try {
        const body = await request.json() as unknown;
        const { budgetId, amount } = body as RequestBody;

        await prisma.budget.update({
            where: {
                id: budgetId,
            },
            data: {
                amount: amount,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error: unknown){
        return NextResponse.json({ success: false, message: 'Failed to update budget amount' }, { status: 500 });
    }

}