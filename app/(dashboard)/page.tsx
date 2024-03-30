import { Suspense } from "react";
import { type Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { TotalExpensesSkeleton, TotalIncomeSkeleton } from "@/components/dashboard/skeletons";
import { TotalExpenses } from "@/components/dashboard/total-expenses";
import { TotalIncome } from "@/components/dashboard/total-income";
import { RecentTransactions } from "@/components/recent-sales";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Track your expenses, set budgets and help you stay within your spending plan",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <Button asChild>
            <Link href="/transactions/new" scroll={false}>
              New Transaction
            </Link>
          </Button>
        </div>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Suspense fallback={<TotalIncomeSkeleton />}>
              <TotalIncome />
            </Suspense>
            <Suspense fallback={<TotalExpensesSkeleton />}>
              <TotalExpenses />
            </Suspense>
            <RecentTransactions />
          </div>
        </div>
      </div>
    </div>
  );
}
