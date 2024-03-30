// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchTransactionsByCategory } from "@/lib/transactions/data";

import { OverViewChart } from "./chart";

export async function Overview() {
  const data = await fetchTransactionsByCategory();
  return <OverViewChart data={data} />;
}
