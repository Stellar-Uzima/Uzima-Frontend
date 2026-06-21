"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";

import Navigation from "@/components/navigation";
import { mockHealers } from "@/lib/mock/healers";

const HealersDirectory = dynamic(
  () =>
    import("@/components/healers/HealersDirectory").then(
      (mod) => mod.HealersDirectory,
    ),
  {
    loading: () => (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          <div className="min-h-[420px] bg-cream" aria-hidden="true" />
        </div>
      </div>
    ),
  },
);

export function HealersPageClient() {
  const initialHealers = useMemo(
    () =>
      mockHealers.map((h) => ({
        id: h.id,
        name: h.name,
        specialization: h.specialties[0] ?? "General",
        location: h.country,
        rating: h.rating,
      })),
    [],
  );

  return (
    <>
      <Navigation />
      <HealersDirectory initialHealers={initialHealers} />
    </>
  );
}