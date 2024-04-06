"use client";

import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { addMonths, formatDate, subMonths } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { OverViewChart } from "./chart";

export function Overview() {
  const [date, setDate] = useState(new Date());

  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Month overview</CardTitle>
          <div className="flex items-center gap-2">
            <Button className="px-2" variant="ghost" onClick={() => setDate(subMonths(date, 1))}>
              <span className="sr-only">Go to previous month</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <div>{formatDate(date, "MMM y")}</div>
            <Button className="px-2" variant="ghost" onClick={() => setDate(addMonths(date, 1))}>
              <span className="sr-only">Go to next month</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pl-2">
        <OverViewChart date={date} />
      </CardContent>
    </Card>
  );
}
