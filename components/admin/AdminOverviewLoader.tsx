"use client";

import dynamic from "next/dynamic";

function AdminOverviewSkeleton() {
  return (
    /*
      FIX: Skeleton height is responsive — shorter on mobile (min-h-[260px])
      where the chart is also shorter, matching the real component's height
      so there's no layout shift when the chart loads in.
    */
    <div className="rounded-3xl border border-dashed border-terra/25 bg-white p-4 sm:p-6 shadow-sm min-h-[260px] sm:min-h-[320px]">
      <div className="h-6 sm:h-7 w-40 sm:w-48 bg-gray-200 rounded animate-pulse mb-2" />
      <div className="h-3 sm:h-4 w-52 sm:w-64 bg-gray-100 rounded animate-pulse mb-4 sm:mb-6" />
      <div className="h-[176px] sm:h-[220px] w-full bg-gray-100 rounded-xl animate-pulse" />
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