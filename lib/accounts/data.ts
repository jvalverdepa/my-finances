import prisma from "../prisma";

export async function fetchAccounts() {
  try {
    const accounts = await prisma.account.findMany();

    return accounts;
  } catch (error) {
    throw error;
  }
}
