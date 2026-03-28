import dynamic from "next/dynamic";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
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
      <HealersDirectory
        healers={mockHealers}
        specialties={healerSpecialties}
        regions={healerRegions}
        languages={healerLanguages}
      />
      <Footer />
    </>
  );
}
