"use client";

import React, { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import DailyProgressCard from "@/components/dashboard/DailyProgressCard";
import { EarningsChartLoader } from "@/components/dashboard/EarningsChartLoader";
import DashboardStatsSkeleton from "@/components/ui/skeletons/DashboardStatsSkeleton";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("🔄 Dashboard loading started");
    const timer = setTimeout(() => {
      console.log("✅ Dashboard loading complete");
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary componentName="DashboardPage" variant="page">
      <div className="min-h-screen bg-gray-50 flex flex-col pt-20">
        <Navigation />

        <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500 mt-2">
                Welcome back! Here is your progress today.
              </p>
            </div>

            {isLoading ? (
              <>
                <div className="text-center text-blue-500 py-4">Loading dashboard...</div>
                <DashboardStatsSkeleton />
              </>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DailyProgressCard
                  completedToday={3}
                  totalTasks={5}
                  xlmEarned={12}
                  streak={4}
                />
                <EarningsChartLoader />
              </div>
            )}
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}
