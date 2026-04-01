"use client";

import dynamic from "next/dynamic";

function AdminOverviewSkeleton() {
  return (
    <div className="rounded-3xl border border-dashed border-terra/25 bg-white p-6 shadow-sm min-h-[320px]">
      <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-2" />
      <div className="h-4 w-64 bg-gray-100 rounded animate-pulse mb-6" />
      <div className="h-[220px] w-full bg-gray-100 rounded-xl animate-pulse" />
    </div>
  );
}

const AdminOverview = dynamic(
  () => import("@/components/admin/AdminOverview"),
  { loading: () => <AdminOverviewSkeleton />, ssr: false },
);

export function AdminOverviewLoader() {
  return <AdminOverview />;
}
