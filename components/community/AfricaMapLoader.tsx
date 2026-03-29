"use client";

import dynamic from "next/dynamic";

function AfricaMapSkeleton() {
  return (
    <div
      className="w-full max-w-2xl mx-auto aspect-[4/5] sm:aspect-[5/4] rounded-3xl bg-terra/10 animate-pulse border border-terra/10"
      aria-hidden
    />
  );
}

const AfricaMap = dynamic(
  () => import("@/components/community/AfricaMap"),
  { loading: () => <AfricaMapSkeleton />, ssr: false },
);

export function AfricaMapLoader() {
  return <AfricaMap />;
}
