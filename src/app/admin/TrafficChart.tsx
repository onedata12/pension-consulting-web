"use client";

import {
  ComposedChart, Bar, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

type DayData = {
  date: string;
  방문: number;
  제출: number;
  전환율: number;
};

export default function TrafficChart({ data }: { data: DayData[] }) {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="date" tick={{ fill: "#888", fontSize: 11 }} />
          <YAxis yAxisId="left" tick={{ fill: "#888", fontSize: 11 }} />
          <YAxis yAxisId="right" orientation="right" tick={{ fill: "#888", fontSize: 11 }} unit="%" />
          <Tooltip
            contentStyle={{ background: "#1a2e24", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff", fontSize: 13 }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar yAxisId="left" dataKey="방문" fill="#1B6B4A" radius={[3, 3, 0, 0]} />
          <Bar yAxisId="left" dataKey="제출" fill="#2E9B6E" radius={[3, 3, 0, 0]} />
          <Line yAxisId="right" dataKey="전환율" stroke="#E8A838" strokeWidth={2} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
