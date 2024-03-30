import { Suspense } from "react";
import { type Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/dashboard/overview/overview";
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
          </div>
          <div className="grid gap-4 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentTransactions />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}