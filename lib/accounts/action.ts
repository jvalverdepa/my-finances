"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import prisma from "../prisma";

const CreateAccount = z.object({
  name: z.string().min(1, "Name is required."),
});

type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export async function createAccount(prevState: State, formData: FormData) {
  const validatedFields = CreateAccount.safeParse({
    name: formData.get("name"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create account.",
    };
  }

  // Prepare data for insertion into the database
  const { name } = validatedFields.data;

  try {
    await prisma.account.create({
      data: {
        name,
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
