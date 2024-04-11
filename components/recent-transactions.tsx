import { formatCurrency, formatDate } from "@/lib/format";
import { fetchLatestTransactions } from "@/lib/transactions/data";

export async function RecentTransactions() {
  const recentTransactions = await fetchLatestTransactions();

  return (
    <div className="space-y-4">
      {recentTransactions.map((transaction) => (
        <div key={transaction.id} className="space-y-1">
          <p className="flex justify-between">
            <span className="text-sm font-medium">{transaction.description}</span>
            <span className="text-sm font-medium">
              {formatCurrency(transaction.amount, transaction.currency)}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              {`${formatDate(transaction.date)} - ${transaction.category?.name}`}
            </span>
            <span className="text-sm text-muted-foreground">{transaction.account.name}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
