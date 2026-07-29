"use client";

import React, { useEffect, useState } from "react";
import { Users, CheckCircle, TrendingUp, Zap } from "lucide-react";

interface Stats {
  totalUsers: number;
  tasksToday: number;
  xlmDistributed: number;
  activeStreaks: number;
}

export default function AdminStatsStrip() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/admin/stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      /*
        FIX: Use grid-cols-2 on xs so cards never stack fully on small phones —
        two columns is readable at 320 px and avoids the jarring single-column
        layout that made the strip feel broken on mobile.
      */
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-20 sm:h-24 bg-white/50 rounded-2xl border border-terra/10"
          />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    /*
      FIX: grid-cols-2 → lg:grid-cols-4 so on mobile the 4 stat cards sit in a
      2×2 grid rather than a single long column. gap-3 on mobile tightens
      spacing so all four cards are visible without scrolling on most phones.
    */
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <StatCard
        title="Total Users"
        value={stats.totalUsers.toLocaleString()}
        icon={<Users className="w-4 h-4 sm:w-5 sm:h-5 text-terra" />}
        color="bg-terra/10"
      />
      <StatCard
        title="Tasks Today"
        value={stats.tasksToday.toLocaleString()}
        icon={<CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-sage" />}
        color="bg-sage/10"
      />
      <StatCard
        title="XLM Distributed"
        value={`${stats.xlmDistributed.toLocaleString()} ★`}
        icon={<TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-amber" />}
        color="bg-amber/10"
      />
      <StatCard
        title="Active Streaks"
        value={stats.activeStreaks.toLocaleString()}
        icon={<Zap className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />}
        color="bg-gold/10"
      />
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    /*
      FIX: Reduced padding to p-3 sm:p-5 so cards don't overflow their grid
      cell on 320–375 px screens. Icon+text stack vertically on very narrow
      cells via flex-col xs, row on sm+.
    */
    <div className="bg-white rounded-2xl border border-terra/10 p-3 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <div className={`p-2 sm:p-3 rounded-xl ${color} self-start sm:self-auto`}>
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-[10px] sm:text-xs font-semibold text-muted uppercase tracking-wider leading-tight">
            {title}
          </p>
          <h3 className="text-lg sm:text-xl font-bold text-earth mt-0.5 truncate">
            {value}
          </h3>
        </div>
      </div>
    </div>
  );
}