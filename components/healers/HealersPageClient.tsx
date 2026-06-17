"use client";

import dynamic from "next/dynamic";

import Navigation from "@/components/navigation";
import { HealerCardSkeleton } from "@/components/healers/HealerCard";
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
      {loading && healers.length === 0 ? (
        // Initial load — show skeleton grid instead of blank screen
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-32 pb-20">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <HealerCardSkeleton key={i} />
            ))}
          </div>
        </div>
      ) : (
        <HealersDirectory
          healers={healers}
          specialties={healerSpecialties}
          regions={healerRegions}
          languages={healerLanguages}
        />
      )}
      {/* Subsequent page loads — spinner at bottom while more cards fetch */}
      {loading && healers.length > 0 && (
        <div className="flex justify-center py-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-terra border-t-transparent" aria-label="Loading more healers" />
        </div>
      )}
      {!hasMore && healers.length > 0 && (
        <p className="mt-4 pb-8 text-center text-sm text-muted">
          All healers loaded
        </p>
      )}
    </>
  );
}