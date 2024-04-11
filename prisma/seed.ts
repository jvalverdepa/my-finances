import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function crateCategories() {
  const existance = await prisma.category.count();

  if (existance > 0) {
    console.log("Categories already exist");
    return;
  }
  const { count } = await prisma.category.createMany({
    data: [
      { name: "Deposits", type: "INCOME" },
      { name: "Salary", type: "INCOME" },
      { name: "Savings", type: "INCOME" },
      { name: "Bills", type: "EXPENSE" },
      { name: "Car", type: "EXPENSE" },
      { name: "Communications", type: "EXPENSE" },
      { name: "Eating out", type: "EXPENSE" },
      { name: "Entertainment", type: "EXPENSE" },
      { name: "Food", type: "EXPENSE" },
      { name: "Health", type: "EXPENSE" },
      { name: "House", type: "EXPENSE" },
      { name: "Pets", type: "EXPENSE" },
      { name: "Sports", type: "EXPENSE" },
      { name: "Taxi", type: "EXPENSE" },
      { name: "Transport", type: "EXPENSE" },
      { name: "Traveling", type: "EXPENSE" },
      { name: "Clothing", type: "EXPENSE" },
      { name: "Errand", type: "EXPENSE" },
      { name: "Loan", type: "EXPENSE" },
      { name: "To save", type: "EXPENSE" },
    ],
  });
  console.log(`Created ${count} categories`);
}

async function createAccounts() {
  const existance = await prisma.account.count();

  if (existance > 0) {
    console.log("Accounts already exist");
    return;
  }
  const { count } = await prisma.account.createMany({
    data: [
      { name: "Efectivo", type: "CASH", currency: "PEN" },
      { name: "Cash", type: "CASH", currency: "USD" },
      { name: "Cuenta Sueldo BBVA *9463", type: "CHECKING", currency: "PEN" },
      { name: "Cuenta Independencia BBVA *3782", type: "CHECKING", currency: "USD" },
      { name: "Cuenta Plazos BBVA *7680", type: "SAVINGS", currency: "PEN", initialBalance: 28000 },
      { name: "Visa Signature BBVA *0592", type: "CREDIT", currency: "PEN" },
      { name: "Cuenta Ahorros Soles Interbank *8864", type: "CHECKING", currency: "PEN" },
      { name: "Cuenta Ahorros Dólares Interbank *8864", type: "CHECKING", currency: "USD" },
      { name: "Visa Signature Interbank *3602", type: "CREDIT", currency: "PEN" },
      { name: "Cuenta Ahorros BCP", type: "CHECKING", currency: "PEN" },
      { name: "Visa Platinum BCP", type: "CREDIT", currency: "PEN" },
      { name: "Diners Club Miles", type: "CREDIT", currency: "USD" },
      { name: "Tarjeta CMR Visa", type: "CREDIT", currency: "PEN" },
      { name: "Tarjeta Ripley Mastercard", type: "CREDIT", currency: "PEN" },
      { name: "First Bank *1138", type: "CHECKING", currency: "USD" },
      { name: "First Bank *6145", type: "SAVINGS", currency: "USD" },
    ],
  });
  console.log(`Created ${count} accounts`);
}

async function main() {
  await crateCategories();
  await createAccounts();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
