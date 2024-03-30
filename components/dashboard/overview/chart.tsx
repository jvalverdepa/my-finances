"use client";

import React from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { type ContentType } from "recharts/types/component/Tooltip";

import { type TransactionByCategory } from "@/lib/transactions/data";

const CustomTooltip: ContentType<number, string> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-white p-2 shadow-md">
        <p className="text-sm font-semibold">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export function OverViewChart({ data }: { data: TransactionByCategory[] }) {
  const error = console.error;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.error = (...args: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    if (/defaultProps/.test(args[0])) return;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    error(...args);
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
        <Bar dataKey="total" stackId="a" className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  );
}
