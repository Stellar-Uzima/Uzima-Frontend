"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const signups = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 186 },
  { month: "Mar", users: 210 },
  { month: "Apr", users: 175 },
  { month: "May", users: 242 },
  { month: "Jun", users: 268 },
];

export default function AdminOverview() {
  return (
    <div className="rounded-3xl border border-dashed border-terra/25 bg-white p-6 shadow-sm">
      <h2 className="font-serif text-xl font-bold text-earth mb-1">
        New sign-ups
      </h2>
      <p className="text-sm text-muted mb-6">Rolling 6-month overview (admin)</p>
      <div className="h-[220px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={signups} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-100" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9ca3af" />
            <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" width={36} />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="users" fill="#C05A2B" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
