"use client";

import dynamic from "next/dynamic";

import Navigation from "@/components/navigation";
import Spinner from "@/components/Spinner";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import {
  healerLanguages,
  healerRegions,
  healerSpecialties,
  mockHealers,
} from "@/lib/mock/healers";

const HealersDirectory = dynamic(
  () =>
    import("@/components/healers/HealersDirectory").then(
      (mod) => mod.HealersDirectory,
    ),
  {
    loading: () => (
      <div className="min-h-[420px] bg-cream" aria-hidden="true" />
    ),
  },
);

export function HealersPageClient() {
  const { items: healers, loading, hasMore } = useInfiniteScroll(
    async (page: number) => {
      // Kept as a client-side mock loader until the real API is wired in.
      const start = (page - 1) * 12;
      const end = start + 12;
      return mockHealers.slice(start, end);
    },
    1,
    12,
  );

  return (
    <>
      <Navigation />
      <HealersDirectory
        healers={healers}
        specialties={healerSpecialties}
        regions={healerRegions}
        languages={healerLanguages}
      />
      {loading && <Spinner />}
      {!hasMore && (
        <p className="mt-4 text-center text-gray-600">All healers loaded</p>
      )}
      {/* Footer remains in the root layout, so we avoid loading a duplicate here. */}
    </>
  );
}
