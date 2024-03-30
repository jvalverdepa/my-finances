"use server";

import { Currency } from "@prisma/client";
import { z } from "zod";

import prisma from "../prisma";

const CreateTransaction = z.object({
  description: z.string().min(1, "Description is required."),
  amount: z.coerce.number(),
  currency: z.enum([Currency.PEN, Currency.USD]),
  categoryId: z.string().min(1, "Category is required."),
  accountId: z.string().min(1, "Category is required."),
});

export type State = {
  errors?: {
    description?: string[];
    amount?: string[];
    currency?: string[];
    categoryId?: string[];
    accountId?: string[];
  };
  message?: string | null;
};

export async function createTransaction(prevState: State, formData: FormData) {
  const validatedFields = CreateTransaction.safeParse({
    description: formData.get("description"),
    amount: formData.get("amount"),
    currency: formData.get("currency"),
    categoryId: formData.get("categoryId"),
    accountId: formData.get("accountId"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create transaction.",
    };
  }

  // Prepare data for insertion into the database
  const { description, amount, currency, categoryId, accountId } = validatedFields.data;

  await prisma.transaction.create({
    data: {
      description,
      amount,
      currency,
      categoryId: parseInt(categoryId),
      accountId: parseInt(accountId),
    },
  });

  return {
    message: "Transaction created successfully.",
  };
}
