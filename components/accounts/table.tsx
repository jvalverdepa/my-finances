import { fetchAccounts } from "@/lib/accounts/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AccountsTable() {
  const accounts = await fetchAccounts();

  return (
    <div className="mt-8 rounded-md border">
      <Table>
        <TableHeader className="whitespace-nowrap">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((child) => (
            <TableRow key={child.id}>
              <TableCell>{child.name}</TableCell>
              <TableCell>{child.currency}</TableCell>
              <TableCell>{child.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
