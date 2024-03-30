import { formatCurrency, formatDate } from "@/lib/format";
import { fetchLatestTransactions } from "@/lib/transactions/data";

export async function RecentTransactions() {
  const recentTransactions = await fetchLatestTransactions();

  return (
    <div className="space-y-4">
      {recentTransactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.description}</p>
            <p className="text-sm text-muted-foreground">
              {formatDate(transaction.date)} - {transaction.category?.name}
            </p>
          </div>
          <div className="ml-auto font-medium">
            {formatCurrency(transaction.amount, transaction.currency)}
          </div>
        </div>
      ))}
    </div>
  );
}
