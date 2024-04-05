"use client";

// import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { addMonths, formatDate, subMonths } from "date-fns";

export function CalendarDateRangePicker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentMonth = searchParams.get("month") || new Date().toISOString().slice(0, 7);
  console.log(currentMonth);

  const createPageURL = (newMonth: Date) => {
    console.log(newMonth);
    const params = new URLSearchParams(searchParams);
    params.set("month", newMonth.toISOString().slice(0, 7));
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center gap-4">
      <Link href={createPageURL(subMonths(currentMonth, 1))}>
        <span className="sr-only">Go to previous month</span>
        <ChevronLeftIcon className="h-4 w-4" />
      </Link>
      <div>{formatDate(new Date(currentMonth), "MMM y")}</div>
      <Link href={createPageURL(addMonths(currentMonth, 1))}>
        <span className="sr-only">Go to next month</span>
        <ChevronRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}
