import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { HealersDirectory } from "@/components/healers/HealersDirectory";
import {
  healerLanguages,
  healerRegions,
  healerSpecialties,
  mockHealers,
} from "@/lib/mock/healers";
import { Suspense } from "react";

export async function generateMetadata() {
  return {
    title: "Traditional Healers Directory | Stellar Uzima",
    description:
      "Browse verified traditional healers across Africa. Filter by specialty, region, and language to find herbalists, spiritual healers, midwives, and more.",
  };
}

// Fallback skeleton while Suspense handles searchParams hook on the client
function HealersDirectoryFallback() {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-cream flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-8 w-8 rounded-full border-2 border-terra border-t-transparent animate-spin"></div>
        <p className="mt-4 text-terra font-semibold tracking-widest uppercase text-xs">Loading Directory...</p>
      </div>
    </div>
  );
}

export default function HealersPage() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<HealersDirectoryFallback />}>
        <HealersDirectory
          healers={mockHealers}
          specialties={healerSpecialties}
          regions={healerRegions}
          languages={healerLanguages}
        />
      </Suspense>
      <Footer />
    </>
  );
}
