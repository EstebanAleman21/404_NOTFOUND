import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerAuthSession } from '~/server/auth';

export async function POST() {
    const prisma = new PrismaClient();
    const session = await getServerAuthSession();

    if (!session) {
        return NextResponse.redirect('/login');
    }
    
    try {
        const user = await prisma.user.findUnique({
            where: { id: session.user.id},
            select: { categories: true },
        });

        const userCategories = user?.categories ?? [];

        const userBudgets = await prisma.budget.findMany({
            where: {userId: session.user.id},
            select: {category: true}
        })

        const invalidCategories = userBudgets.filter(budget => !userCategories.includes(budget.category))

        await prisma.budget.updateMany({
            where: {
                userId: session.user.id,
                category: {
                    in: invalidCategories.map(budget => budget.category)
                }
            },
            data: {
                isValid: false
            }
        })
    } catch (error) {
        console.error('Error updating budget status:', error);
        return NextResponse.json({ success: false, message: 'Failed to update budget status' }, { status: 500 });
    }
}