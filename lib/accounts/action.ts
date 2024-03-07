"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AccountType, Currency } from "@prisma/client";
import { z } from "zod";

import prisma from "../prisma";

const CreateAccount = z.object({
  name: z.string().min(1, "Name is required."),
  currency: z.enum([Currency.PEN, Currency.USD]),
  type: z.enum([AccountType.CASH, AccountType.CHECKING, AccountType.SAVINGS, AccountType.CREDIT]),
  initialBalance: z.coerce.number(),
});

type State = {
  errors?: {
    name?: string[];
    currency?: string[];
    type?: string[];
    initialBalance?: string[];
  };
  message?: string | null;
};

export async function createAccount(prevState: State, formData: FormData) {
  const validatedFields = CreateAccount.safeParse({
    name: formData.get("name"),
    currency: formData.get("currency"),
    type: formData.get("type"),
    initialBalance: formData.get("initial-balance"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create account.",
    };
  }

  // Prepare data for insertion into the database
  const { currency, name, type, initialBalance } = validatedFields.data;

  try {
    await prisma.account.create({
      data: {
        name,
        currency,
        type,
        initialBalance,
      },
    });
  } catch (error) {
    return {
      message: "Failed to create account. Please try again.",
    };
  }

  revalidatePath("/accounts");
  redirect("/accounts");
}
