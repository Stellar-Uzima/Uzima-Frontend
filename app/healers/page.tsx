import dynamic from "next/dynamic";

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

const HealersDirectory = dynamic(
  () => import("@/components/healers/HealersDirectory").then((mod) => mod.HealersDirectory),
  {
    loading: () => <div className="min-h-[420px] bg-cream" aria-hidden="true" />,
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
      <Footer />
    </>
  );
}