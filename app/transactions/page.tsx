import { Suspense } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import TablePlaceholder from "@/components/ui/table-placeholder";
import TransactionsTable from "@/components/transactions/table";

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
        <Button asChild>
          <Link href="/transactions/new" scroll={false}>
            New Transaction
          </Link>
        </Button>
      </div>
      <Suspense
        fallback={<TablePlaceholder headers={["Description", "Date", "Amount"]} rows={5} />}
      >
        <TransactionsTable />
      </Suspense>
    </div>
  );
}
