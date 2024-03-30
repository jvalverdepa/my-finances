import prisma from "../prisma";

export async function fetchTransactions() {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
        account: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    return transactions;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch all transactions.");
  }
}

export async function fetchLatestTransactions(take = 5) {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
        account: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
      take,
    });

    return transactions;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to fetch latest ${take} transactions.`);
  }
}

export async function fetchTransactionsByCategory() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        type: {
          equals: "EXPENSE",
        },
      },
    });
    const transactions = await prisma.transaction.groupBy({
      by: ["categoryId", "currency"],
      _sum: {
        amount: true,
      },
      orderBy: {
        _count: {
          categoryId: "desc",
        },
      },
      where: {
        category: {
          type: {
            equals: "EXPENSE",
          },
        },
      },
    });

    return categories.map((category) => {
      const result: Record<string, number | string> = {
        category_id: category.id,
        category_name: category.name,
      };

      transactions
        .filter((t) => t.categoryId === category.id)
        .forEach((amount) => {
          result[amount.currency] = amount._sum.amount || 0;
        });

      return result;
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch transactions by category.");
  }
}
