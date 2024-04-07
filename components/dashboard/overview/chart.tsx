"use client";

import React from "react";
import { Currency } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { type ContentType } from "recharts/types/component/Tooltip";

const CustomTooltip: ContentType<number, string> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-white p-2 shadow-md">
        <p className="text-sm font-semibold">{label}</p>
        {payload.map((item) => (
          <p key={item.dataKey} className="text-sm">{`${item.dataKey}: ${item.value}`}</p>
        ))}
      </div>
    );
  }
  return null;
};

export function OverViewChart({ date }: { date: Date }) {
  const month = date.toISOString().slice(0, 7);
  const { data, isPending, error } = useQuery<Record<string, number | string>[]>({
    queryKey: ["transactions-by-category", month],
    queryFn: () => fetch(`/api/transactions-by-category?month=${month}`).then((res) => res.json()),
  });

  if (isPending)
    return (
      <div className="flex h-[350px] w-full">
        <div className="mx-auto my-0 flex items-center">
          <svg
            className="-ml-1 mr-3 h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </div>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  const consoleError = console.error;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.error = (...args: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    if (/defaultProps/.test(args[0])) return;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    consoleError(...args);
  };
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category_name" />
        <YAxis />
        <Tooltip content={CustomTooltip} />
        <Legend />
        <Bar dataKey={Currency.PEN} stackId="a" className="fill-primary" />
        <Bar dataKey={Currency.USD} stackId="b" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
