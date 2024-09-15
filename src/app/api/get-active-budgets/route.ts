import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerAuthSession } from '~/server/auth';

export async function GET() {
    const session = await getServerAuthSession();
    const prisma = new PrismaClient();

    if (!session) {
        return NextResponse.redirect('/login');
    }

    try {
        const activeBudgets = await prisma.budget.findMany({
            where: {
                userId: session.user.id,
                isValid: true
            },
            select: {
                id: true,
                amount: true,
                period: true,
                category: true
            }
        });
        return NextResponse.json(activeBudgets);
    } catch (error) {
        console.error('Error fetching budgets:', error);
    return NextResponse.json({ error: 'Failed to fetch budgets' }, { status: 500 });
    }
}