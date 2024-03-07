-- AlterEnum
ALTER TYPE "AccountType" ADD VALUE 'CASH';

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "type" SET DEFAULT 'SAVINGS';
