"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { day: "Mon", xlm: 8 },
  { day: "Tue", xlm: 12 },
  { day: "Wed", xlm: 6 },
  { day: "Thu", xlm: 14 },
  { day: "Fri", xlm: 18 },
  { day: "Sat", xlm: 10 },
  { day: "Sun", xlm: 15 },
];

export default function EarningsChart() {
  return (
    <div className="w-full max-w-[390px] sm:max-w-none rounded-3xl bg-white p-6 shadow-xl shadow-gray-200/50 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-1">Earnings (XLM)</h3>
      <p className="text-sm text-gray-500 mb-4">Last 7 days</p>
      <div className="h-[220px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="fillEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-100" />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="#9ca3af" />
            <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" width={32} />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                fontSize: "12px",
              }}
              formatter={(value: number) => [`${value} XLM`, "Earned"]}
            />
            <Area
              type="monotone"
              dataKey="xlm"
              stroke="#059669"
              strokeWidth={2}
              fill="url(#fillEarnings)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
