import { Suspense } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import TablePlaceholder from "@/components/ui/table-placeholder";
import AccountsTable from "@/components/accounts/table";

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Accounts</h1>
        <Button asChild>
          <Link href="/accounts/new">New Account</Link>
        </Button>
      </div>
      <Suspense fallback={<TablePlaceholder headers={["Name", "Currency", "Balance"]} rows={5} />}>
        <AccountsTable />
      </Suspense>
    </div>
  );
}
