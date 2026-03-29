"use client";

import dynamic from "next/dynamic";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import {
  healerLanguages,
  healerRegions,
  healerSpecialties,
  mockHealers,
} from "@/lib/mock/healers";
import Spinner from "@/components/Spinner";

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

export async function generateMetadata() {
  return {
    title: "Traditional Healers Directory | Stellar Uzima",
    description:
      "Browse verified traditional healers across Africa. Filter by specialty, region, and language to find herbalists, spiritual healers, midwives, and more.",
  };
}

function HealersDirectoryFallback() {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-cream flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-8 w-8 rounded-full border-2 border-terra border-t-transparent animate-spin" />
        <p className="mt-4 text-terra font-semibold tracking-widest uppercase text-xs">
          Loading Directory...
        </p>
      </div>
    </div>
  );
}

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
      <Footer />
    </>
  );
}