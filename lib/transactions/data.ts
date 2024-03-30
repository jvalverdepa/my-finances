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
