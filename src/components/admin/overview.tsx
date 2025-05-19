"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function Overview() {
  const data = [
    {
      name: "Jan",
      total: 45,
    },
    {
      name: "Feb",
      total: 32,
    },
    {
      name: "Mar",
      total: 67,
    },
    {
      name: "Apr",
      total: 89,
    },
    {
      name: "May",
      total: 76,
    },
    {
      name: "Jun",
      total: 52,
    },
    {
      name: "Jul",
      total: 95,
    },
    {
      name: "Aug",
      total: 112,
    },
    {
      name: "Sep",
      total: 87,
    },
    {
      name: "Oct",
      total: 75,
    },
    {
      name: "Nov",
      total: 92,
    },
    {
      name: "Dec",
      total: 115,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
