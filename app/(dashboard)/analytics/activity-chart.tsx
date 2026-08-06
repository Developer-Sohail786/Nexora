"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { ActivityPoint } from "./types";

interface Props {
  data: ActivityPoint[];
}

export default function ActivityChart({
  data,
}: Props) {
  return (
    <section
      aria-labelledby="activity-chart-heading"
      className="rounded-2xl border border-white/10 bg-[#1C1926] p-6"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2
            id="activity-chart-heading"
            className="text-lg font-semibold text-white"
          >
            Activity
          </h2>

          <p className="mt-1 text-sm text-[#7A748F]">
            Chat activity over the last 7 days.
          </p>
        </div>
      </div>

      <div
        role="img"
        aria-label="Line chart showing chat activity over the last seven days"
        className="h-[340px]"
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>
            <CartesianGrid
              stroke="#2A2640"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="day"
              stroke="#7A748F"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#7A748F"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#1C1926",
                border: "1px solid #2A2640",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="chats"
              stroke="#7C5CFC"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "#7C5CFC",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}