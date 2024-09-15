/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /app/api/get-transactions/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("accountId"); // Extract the accountId from the query parameters

  if (!accountId) {
    return NextResponse.json({ error: "Missing accountId" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `http://api.nessieisreal.com/accounts/${accountId}/purchases?key=ab9f03d749d9a0cb388c0cffed6ec2bb`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch transactions: ${response.statusText}`);
    }

    const transactions = await response.json();

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
