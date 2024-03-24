import { formatCurrency } from "@/lib/format";
import { fetchLatestTransactions } from "@/lib/transactions/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export async function RecentTransactions() {
  const recentTransactions = await fetchLatestTransactions();

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        {/* <CardDescription>You made 265 sales this month.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">{transaction.category?.name}</p>
              </div>
              <div className="ml-auto font-medium">
                {formatCurrency(transaction.amount, transaction.currency)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
