import prisma from "../prisma";

export async function fetchCategories() {
  try {
    const categories = await prisma.category.findMany();

    return categories;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch all categories.");
  }
}

export async function fetchCategoriesByType() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        type: true,
      },
    });

    return categories.reduce<Record<string, { id: number; name: string }[]>>((acc, category) => {
      if (!acc[category.type]) {
        acc[category.type] = [];
      }

      acc[category.type].push(category);

      return acc;
    }, {});
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all categories.");
  }
}
