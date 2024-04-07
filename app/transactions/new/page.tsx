import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { fetchAccounts } from "@/lib/accounts/data";
import { fetchCategoriesByType } from "@/lib/categories/data";
import { createTransaction, type State } from "@/lib/transactions/action";
import { NewTransactionForm } from "@/components/transactions/new/form";

const { DEFAULT_CATEGORY_ID, DEFAULT_ACCOUNT_ID } = process.env;

export default async function Page() {
  const [categories, accounts] = await Promise.all([fetchCategoriesByType(), fetchAccounts()]);

  const action = async (prevState: State, formData: FormData) => {
    "use server";

    try {
      const { errors, message } = await createTransaction(prevState, formData);

      if (errors) {
        return { errors, message };
      }
    } catch (error) {
      return { message: "Failed to create transaction. Please try again." };
    }
    revalidatePath("/");
    revalidatePath("/transactions");
    redirect("/transactions");
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="text-2xl font-bold tracking-tight">New Transaction</h1>
      <NewTransactionForm
        action={action}
        categories={categories}
        accounts={accounts}
        defaultCategoryId={DEFAULT_CATEGORY_ID}
        defaultAccountId={DEFAULT_ACCOUNT_ID}
      />
    </div>
  );
}
