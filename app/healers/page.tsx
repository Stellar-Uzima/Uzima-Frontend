"use client";

import dynamic from "next/dynamic";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
// ISSUE #179: Import the reusable BreadcrumbNav component
import { BreadcrumbNav } from "@/components/ui/breadcrumb";
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

export default function HealersPage() {
  // Infinite scroll hook: loads 12 healers per batch
  const { items: healers, loading, hasMore } = useInfiniteScroll(
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
      {/* ISSUE #179: Breadcrumb navigation for the Healers Directory */}
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
          healers={mockHealers}
          specialties={healerSpecialties}
          regions={healerRegions}
          languages={healerLanguages}
        />
      </main>

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