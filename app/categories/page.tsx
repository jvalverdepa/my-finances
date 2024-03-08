import { Suspense } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import TablePlaceholder from "@/components/ui/table-placeholder";
import CategoriesTable from "@/components/categories/table";

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
        <Button asChild>
          <Link href="/categories/new">New Category</Link>
        </Button>
      </div>
      <Suspense fallback={<TablePlaceholder headers={["Name"]} rows={5} />}>
        <CategoriesTable />
      </Suspense>
    </div>
  );
}
