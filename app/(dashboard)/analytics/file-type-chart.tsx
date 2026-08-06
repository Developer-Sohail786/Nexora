"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { FileTypeUsage } from "./types";

interface Props {
  data: FileTypeUsage[];
}

export default function FileTypeChart({
  data,
}: Props) {
  return (
    <section
      aria-labelledby="file-type-chart-heading"
      className="rounded-2xl border border-white/10 bg-[#1C1926] p-6"
    >
      <div className="mb-6">
        <h2
          id="file-type-chart-heading"
          className="text-lg font-semibold text-white"
        >
          File Types
        </h2>

        <p className="mt-1 text-sm text-[#7A748F]">
          Distribution of uploaded document types.
        </p>
      </div>

      <div
        role="img"
        aria-label="Bar chart showing distribution of uploaded document types"
        className="h-[320px]"
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 5,
              right: 20,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid
              stroke="#2A2640"
              strokeDasharray="3 3"
            />

            <XAxis
              type="number"
              stroke="#7A748F"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              type="category"
              dataKey="type"
              stroke="#7A748F"
              tickLine={false}
              axisLine={false}
              width={60}
            />

            <Tooltip
              contentStyle={{
                background: "#1C1926",
                border: "1px solid #2A2640",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Bar
              dataKey="files"
              radius={[0, 8, 8, 0]}
              fill="#7C5CFC"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}