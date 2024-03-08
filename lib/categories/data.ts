import prisma from "../prisma";

export async function fetchCategories() {
  try {
    const categories = await prisma.category.findMany();

    return categories;
  } catch (error) {
    throw error;
  }
}
