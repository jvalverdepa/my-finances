import { NextResponse, type NextRequest } from "next/server";
import { lastDayOfMonth } from "date-fns";

import { fetchTransactionsByCategory } from "@/lib/transactions/data";

export async function GET(request: NextRequest) {
  const currentDate = new Date();
  currentDate.setDate(1);

  const { searchParams } = new URL(request.url);
  const month = searchParams.get("month");
  const from =
    month?.concat("-01T00:00:00") || currentDate.toISOString().slice(0, 10).concat("T00:00:00");
  const to = lastDayOfMonth(from).toISOString().slice(0, 10).concat("T23:59:59");

  const data = await fetchTransactionsByCategory(from, to);

  return NextResponse.json(data);
}
