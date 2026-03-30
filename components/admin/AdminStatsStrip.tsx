
'use client';

import React, { useEffect, useState } from 'react';
import { Users, CheckCircle, TrendingUp, Zap } from 'lucide-react';

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
        const response = await fetch('/api/admin/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-white/50 rounded-2xl border border-terra/10" />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Users"
        value={stats.totalUsers.toLocaleString()}
        icon={<Users className="w-5 h-5 text-terra" />}
        color="bg-terra/10"
      />
      <StatCard
        title="Tasks Today"
        value={stats.tasksToday.toLocaleString()}
        icon={<CheckCircle className="w-5 h-5 text-sage" />}
        color="bg-sage/10"
      />
      <StatCard
        title="XLM Distributed"
        value={`${stats.xlmDistributed.toLocaleString()} ★`}
        icon={<TrendingUp className="w-5 h-5 text-amber" />}
        color="bg-amber/10"
      />
      <StatCard
        title="Active Streaks"
        value={stats.activeStreaks.toLocaleString()}
        icon={<Zap className="w-5 h-5 text-gold" />}
        color="bg-gold/10"
      />
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: string; icon: React.ReactNode; color: string }) {
  return (
    <div className="bg-white rounded-2xl border border-terra/10 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${color}`}>
          {icon}
        </div>
        <div>
          <p className="text-xs font-semibold text-muted uppercase tracking-wider">{title}</p>
          <h3 className="text-xl font-bold text-earth mt-1">{value}</h3>
        </div>
      </div>
    </div>
  );
}
