"use client";

import dynamic from "next/dynamic";

function EarningsChartSkeleton() {
  return (
    <div className="w-full max-w-[390px] sm:max-w-none rounded-3xl bg-white border border-gray-100 p-6 shadow-sm min-h-[308px]">
      <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-2" />
      <div className="h-4 w-28 bg-gray-100 rounded animate-pulse mb-6" />
      <div className="h-[200px] w-full bg-gray-100 rounded-xl animate-pulse" />
    </div>
  );
}

const EarningsChart = dynamic(
  () => import("@/components/dashboard/EarningsChart"),
  { loading: () => <EarningsChartSkeleton />, ssr: false },
);

export function EarningsChartLoader() {
  return <EarningsChart />;
}
