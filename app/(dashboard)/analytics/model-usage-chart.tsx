"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import { ModelUsage } from "./types";

interface Props {
  data: ModelUsage[];
}

export default function ModelUsageChart({
  data,
}: Props) {
  const COLORS = [
    "#7C5CFC", // Purple
    "#5B8DEF", // Blue
    "#22C55E", // Green
    "#F59E0B", // Orange
    "#EF4444", // Red
    "#06B6D4", // Cyan
  ];

  return (
    <section
      aria-labelledby="model-usage-chart-heading"
      className="rounded-2xl border border-white/10 bg-[#1C1926] p-6"
    >
      <div className="mb-6">
        <h2
          id="model-usage-chart-heading"
          className="text-lg font-semibold text-white"
        >
          AI Models
        </h2>

        <p className="mt-1 text-sm text-[#7A748F]">
          Distribution of AI model usage.
        </p>
      </div>

      <div
        role="img"
        aria-label="Pie chart showing distribution of AI model usage"
        className="h-[320px]"
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                background: "#1C1926",
                border: "1px solid #2A2640",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Legend
              verticalAlign="bottom"
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}