
import React from "react";
import AdminStatsStrip from "@/components/admin/AdminStatsStrip";
import AdminUserTable from "@/components/admin/AdminUserTable";
import AdminTaskManagement from "@/components/admin/AdminTaskManagement";
import HealerVerificationQueue from "@/components/admin/HealerVerificationQueue";
import { AdminOverviewLoader } from "@/components/admin/AdminOverviewLoader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Users, CheckSquare, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard | Stellar Uzima",
  description: "Platform management for Stellar Uzima.",
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-cream pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-earth tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-muted mt-2 text-sm sm:text-base max-w-2xl">
              Monitor platform metrics, manage users, and review verification requests.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-terra/60 bg-terra/5 px-4 py-2 rounded-full border border-terra/10 w-fit">
            <span className="w-2 h-2 rounded-full bg-terra animate-pulse" />
            Live Platform Data
          </div>
        </header>

        {/* Stats Strip */}
        <AdminStatsStrip />

        {/* Desktop Layout - Grid vs Mobile Layout - Tabs */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <AdminUserTable />
            <AdminTaskManagement />
          </div>
          <div className="space-y-8">
            <AdminOverviewLoader />
            <HealerVerificationQueue />
          </div>
        </div>

        {/* Mobile/Tablet Layout - Tabs */}
        <div className="lg:hidden">
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="bg-white/50 border border-terra/10 rounded-2xl p-1 gap-1 h-auto grid grid-cols-2 sm:grid-cols-4">
              <TabsTrigger
                value="users"
                className="rounded-xl py-3 data-[state=active]:bg-terra data-[state=active]:text-white flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Users</span>
              </TabsTrigger>
              <TabsTrigger
                value="tasks"
                className="rounded-xl py-3 data-[state=active]:bg-terra data-[state=active]:text-white flex items-center gap-2"
              >
                <CheckSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Tasks</span>
              </TabsTrigger>
              <TabsTrigger
                value="verification"
                className="rounded-xl py-3 data-[state=active]:bg-terra data-[state=active]:text-white flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span className="hidden sm:inline">Verify</span>
              </TabsTrigger>
              <TabsTrigger
                value="metrics"
                className="rounded-xl py-3 data-[state=active]:bg-terra data-[state=active]:text-white flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Stats</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="animate-fadeIn">
              <AdminUserTable />
            </TabsContent>
            <TabsContent value="tasks" className="animate-fadeIn">
              <AdminTaskManagement />
            </TabsContent>
            <TabsContent value="verification" className="animate-fadeIn">
              <HealerVerificationQueue />
            </TabsContent>
            <TabsContent value="metrics" className="animate-fadeIn space-y-6">
              <AdminOverviewLoader />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
