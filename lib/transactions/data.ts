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
    });

    return transactions;
  } catch (error) {
    throw error;
  }
}

export async function fetchLatestTransactions() {
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
      take: 5,
    });

    return transactions;
  } catch (error) {
    throw error;
  }
}
