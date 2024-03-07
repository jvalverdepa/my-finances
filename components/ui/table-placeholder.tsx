import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Skeleton } from "./skeleton";

type TablePlaceholderProps = {
  headers: string[];
  rows: number;
};

export default function TablePlaceholder({ headers, rows }: TablePlaceholderProps) {
  return (
    <div className="mt-8 rounded-md border">
      <Table>
        <TableHeader className="whitespace-nowrap">
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, index) => (
            <TableRow key={index}>
              {headers.map((_, index) => (
                <TableCell key={index}>
                  <Skeleton className="h-4" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
