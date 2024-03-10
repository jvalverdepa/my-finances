import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Skeleton } from "../ui/skeleton";

export function TotalIncomeSkeleton() {
  return (
    <Card className="cursor-pointer transition-all hover:scale-[1.01]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Income</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 w-40" />
        <Skeleton className="mt-2 h-4 w-52" />
      </CardContent>
    </Card>
  );
}

export function TotalExpensesSkeleton() {
  return (
    <Card className="cursor-pointer transition-all hover:scale-[1.01]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 w-40" />
        <Skeleton className="mt-2 h-4 w-52" />
      </CardContent>
    </Card>
  );
}
