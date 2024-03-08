"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CategoryType } from "@prisma/client";
import { z } from "zod";

import prisma from "../prisma";

const CreateCategory = z.object({
  name: z.string().min(1, "Name is required."),
  type: z.enum([CategoryType.EXPENSE, CategoryType.INCOME]),
});

type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export async function createCategory(prevState: State, formData: FormData) {
  const validatedFields = CreateCategory.safeParse({
    name: formData.get("name"),
    type: formData.get("type"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create category.",
    };
  }

  // Prepare data for insertion into the database
  const { name, type } = validatedFields.data;

  try {
    await prisma.category.create({
      data: {
        name,
        type,
      },
    });
  } catch (error) {
    return {
      message: "Failed to create category. Please try again.",
    };
  }

  revalidatePath("/categories");
  redirect("/categories");
}
