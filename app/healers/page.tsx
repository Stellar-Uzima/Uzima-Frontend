"use client";

import dynamic from "next/dynamic";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { BreadcrumbNav } from "@/components/ui/breadcrumb";
import {
  healerLanguages,
  healerRegions,
  healerSpecialties,
  mockHealers,
} from "@/lib/mock/healers";
import Spinner from "@/components/Spinner";

function HealersDirectorySkeleton() {
  return (
    <main className="bg-cream min-h-screen pt-28 pb-20" aria-hidden="true">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6">
        <section className="overflow-hidden rounded-3xl bg-forest/40 min-h-[12rem] sm:min-h-[14rem] animate-pulse" />
        <div className="flex flex-wrap gap-3 rounded-2xl border border-terra/15 bg-cream/80 p-4">
          <div className="h-9 w-[9rem] rounded-full bg-gray-200/90 animate-pulse" />
          <div className="h-9 w-[9rem] rounded-full bg-gray-200/90 animate-pulse" />
          <div className="h-9 w-[9rem] rounded-full bg-gray-200/90 animate-pulse" />
        </div>
        <div className="h-4 w-40 bg-gray-200/80 rounded animate-pulse" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-white/90 border border-terra/10 animate-pulse"
            />
          ))}
        </div>
      </div>
    </main>
  );
}

const HealersDirectory = dynamic(
  () =>
    import("@/components/healers/HealersDirectory").then(
      (mod) => mod.HealersDirectory,
    ),
  {
    loading: () => <HealersDirectorySkeleton />,
  },
);

// Note: metadata must not be exported from a client component

export default function HealersPage() {
  const {
    items: healers,
    loading,
    hasMore,
  } = useInfiniteScroll(
    async (page: number) => {
      // In production, replace with API call:
      // const res = await fetch(`/api/healers?page=${page}&limit=12`);
      // return res.json();
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
      <main className="bg-cream pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <BreadcrumbNav
            items={[
              { label: "Home", href: "/" },
              { label: "Healers" },
            ]}
          />
        </div>
        <HealersDirectory
          healers={healers}
          specialties={healerSpecialties}
          regions={healerRegions}
          languages={healerLanguages}
        />
        {loading && <Spinner />}
        {!hasMore && (
          <p className="text-center mt-4 text-gray-600">All healers loaded</p>
        )}
      </main>
      <Footer />
    </>
  );
}