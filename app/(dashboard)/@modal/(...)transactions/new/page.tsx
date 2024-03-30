import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { fetchAccounts } from "@/lib/accounts/data";
import { fetchCategoriesByType } from "@/lib/categories/data";
import { createTransaction, type State } from "@/lib/transactions/action";
import { Modal } from "@/components/ui/modal";
import { NewTransactionForm } from "@/components/transactions/new/form";

const { DEFAULT_CATEGORY_ID, DEFAULT_ACCOUNT_ID } = process.env;

export default async function NewTransactionPage() {
  const [categories, accounts] = await Promise.all([fetchCategoriesByType(), fetchAccounts()]);

  const action = async (prevState: State, formData: FormData) => {
    "use server";

    try {
      await createTransaction(prevState, formData);
    } catch (error) {
      return { message: "Failed to create transaction. Please try again." };
    }

    revalidatePath("/");
    revalidatePath("/transactions");
    redirect("/");
  };

  return (
    <Modal title="New Transaction">
      <NewTransactionForm
        action={action}
        accounts={accounts}
        categories={categories}
        defaultCategoryId={DEFAULT_CATEGORY_ID}
        defaultAccountId={DEFAULT_ACCOUNT_ID}
      />
    </Modal>
  );
}
