import { formatCurrency, formatDate } from "@/lib/format";
import { fetchTransactions } from "@/lib/transactions/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function TransactionsTable() {
  const transactions = await fetchTransactions();

  return (
    <div className="mt-8 rounded-md border">
      <Table>
        <TableHeader className="whitespace-nowrap">
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((child) => (
            <TableRow key={child.id}>
              <TableCell>{child.description}</TableCell>
              <TableCell>{child.category?.name}</TableCell>
              <TableCell>{formatDate(child.date)}</TableCell>
              <TableCell>{formatCurrency(child.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
