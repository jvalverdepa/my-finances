-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('PEN', 'USD', 'EUR', 'GBP', 'JPY', 'CNY');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('CASH', 'CHECKING', 'SAVINGS', 'CREDIT');

-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'PEN',
    "type" "AccountType" NOT NULL DEFAULT 'SAVINGS',
    "initialBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "initialBalanceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'PEN',
    "categoryId" INTEGER,
    "accountId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CategoryType" NOT NULL DEFAULT 'EXPENSE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
