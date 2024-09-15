import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerAuthSession } from '~/server/auth';

const prisma = new PrismaClient();

export async function POST() {
  const session = await getServerAuthSession();
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  try {
    // Obtener las categorías del usuario
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { categories: true },
    });

    const userCategories = user?.categories ?? [];

    // Obtener todas las categorías del presupuesto del usuario
    const userBudgets = await prisma.budget.findMany({
      where: { userId: userId },
    });

    // Filtrar las categorías que no están en el arreglo de categorías del usuario
    const invalidCategories = userBudgets.filter(budget => !userCategories.includes(budget.category));

    // Marcar como falsos los campos isValid de las categorías no válidas
    await prisma.budget.updateMany({
      where: {
        userId: userId,
        category: { in: invalidCategories.map(budget => budget.category) },
      },
      data: { isValid: false },
    });

    // Marcar como verdaderos los campos isValid de las categorías válidas
    await prisma.budget.updateMany({
      where: {
        userId: userId,
        category: { in: userCategories },
      },
      data: { isValid: true },
    });

    return NextResponse.json({ success: true, message: 'Budget status updated successfully' });
  } catch (error) {
    console.error('Error updating budget status:', error);
    return NextResponse.json({ error: 'Failed to update budget status' }, { status: 500 });
  }
}