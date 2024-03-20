import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      type: true,
    },
  });

  const categoriesByType = categories.reduce(
    (acc, category) => {
      if (!acc[category.type]) {
        acc[category.type] = [];
      }

      acc[category.type].push(category);

      return acc;
    },
    {} as Record<string, { id: number; name: string }[]>,
  );

  return NextResponse.json(categoriesByType);
}

export type GetCategoriesResponse =
  Awaited<ReturnType<typeof GET>> extends NextResponse<infer T> ? T : never;
