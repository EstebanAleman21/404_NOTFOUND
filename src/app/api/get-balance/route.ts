// File: src/app/api/get-balance/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("accountId");

  if (!accountId) {
    return NextResponse.json(
      { error: "Missing accountId parameter" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `http://api.nessieisreal.com/accounts/${accountId}?key=${process.env.NESSIE_API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch balance. Status: ${response.status}`);
    }

    const balanceData = await response.json();
    return NextResponse.json(balanceData);
  } catch (error) {
    console.error("Error fetching balance:", error);
    return NextResponse.json(
      { error: "Failed to fetch balance" },
      { status: 500 },
    );
  }
}
