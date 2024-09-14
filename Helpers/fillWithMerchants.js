// fillMerchants.js
import fetch from 'node-fetch';
import { PrismaClient } from '@prisma/client';
import { Interface } from 'readline';
const prisma = new PrismaClient();

// Interfaz de los datos de los comercios

async function fetchMerchants() {
  const response = await fetch(`http://api.nessieisreal.com/merchants?key=${process.env.NESSIE_API_KEY}`);
  if (!response.ok) {
    throw new Error("Failed to fetch merchants");
  }
  return response.json();
}

async function fillMerchants() {
  try {
    const merchants = await fetchMerchants();
    const merchantData = merchants.map(merchant => ({
      id: merchant._id,
      name: merchant.name,
    }));

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