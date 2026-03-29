import React from 'react';
import Navigation from "@/components/navigation";
import DailyProgressCard from "@/components/dashboard/DailyProgressCard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-20">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-2">Welcome back! Here is your progress today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DailyProgressCard 
              completedToday={3}
              totalTasks={5}
              xlmEarned={12}
              streak={4}
            />
            
            {/* Mock placeholder for other dashboard widgets */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[300px] text-gray-400">
              <p>Other Dashboard Widgets</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
