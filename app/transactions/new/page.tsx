import { redirect } from "next/navigation";

import { createTransaction, type State } from "@/lib/transactions/action";
import { getBaseUrl } from "@/lib/utils";
import { NewTransactionForm } from "@/components/transactions/new/form";
import { type GetAccountsResponse } from "@/app/api/accounts/route";
import { type GetCategoriesResponse } from "@/app/api/categories/route";

export default async function Page() {
  const accounts = (await fetch(`${getBaseUrl()}/api/accounts`).then((res) =>
    res.json(),
  )) as GetAccountsResponse;

  const categories = (await fetch(`${getBaseUrl()}/api/categories`).then((res) =>
    res.json(),
  )) as GetCategoriesResponse;

  const action = async (prevState: State, formData: FormData) => {
    "use server";

    try {
      await createTransaction({ message: "", errors: {} }, formData);
    } catch (error) {
      return { message: "Failed to create transaction. Please try again." };
    }

    redirect("/transactions");
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="text-2xl font-bold tracking-tight">New Transaction</h1>
      <NewTransactionForm action={action} categories={categories} accounts={accounts} />
    </div>
  );
}
