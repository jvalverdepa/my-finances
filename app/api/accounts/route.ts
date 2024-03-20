import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET() {
  const accounts = await prisma.account.findMany({
    select: {
      id: true,
      name: true,
      type: true,
    },
  });

  return NextResponse.json(accounts);
}

export type GetAccountsResponse =
  Awaited<ReturnType<typeof GET>> extends NextResponse<infer T> ? T : never;
