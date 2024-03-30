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

export interface TransactionByCategory {
  category_id: number | null;
  category_name: string;
  total: number | null;
}

export async function fetchTransactionsByCategory() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    const transactions = await prisma.transaction
      .groupBy({
        by: ["categoryId"],
        _sum: {
          amount: true,
        },
        orderBy: {
          _count: {
            categoryId: "desc",
          },
        },
      })
      .then((result) => {
        return result.map((transaction) => {
          const category = categories.find((category) => category.id === transaction.categoryId);
          return {
            category_id: transaction.categoryId,
            category_name: category?.name || "Uncategorized",
            total: transaction._sum.amount,
          };
        });
      });

    return transactions;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch transactions by category.");
  }
}
