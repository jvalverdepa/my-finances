"use client";

import React from "react";
import { Currency } from "@prisma/client";
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

export function OverViewChart({ data }: { data: Record<string, number | string>[] }) {
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
        <Legend />
        <Bar dataKey={Currency.PEN} stackId="a" className="fill-primary" />
        <Bar dataKey={Currency.USD} stackId="b" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
