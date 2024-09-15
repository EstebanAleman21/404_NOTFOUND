// fillWithMerchants.js
import fetch from 'node-fetch';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Función para obtener los datos de los comercios
async function fetchMerchants() {
  const response = await fetch(`http://api.nessieisreal.com/merchants?key=${process.env.NESSIE_API_KEY}`);
  if (!response.ok) {
    throw new Error("Failed to fetch merchants");
  }
  const merchants = await response.json();
  return merchants;
}

async function fillMerchants() {
  try {
    const merchants = await fetchMerchants();
    const merchantData = merchants.map(merchant => ({
      id: merchant._id,
      name: merchant.name,
      categories: Array.isArray(merchant.category) ? merchant.category : [merchant.category],
    }));

    // Borrar los datos existentes en la tabla de merchants
    await prisma.merchant.deleteMany();

    // Insertar los nuevos datos
    for (const merchant of merchantData) {
      await prisma.merchant.create({
        data: merchant,
      });
    }

    console.log('Merchants table filled successfully');
  } catch (error) {
    console.error('Error filling merchants table:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fillMerchants();