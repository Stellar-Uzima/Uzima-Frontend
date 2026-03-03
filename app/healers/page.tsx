import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { HealersDirectory } from "@/components/healers/HealersDirectory";
import {
  healerLanguages,
  healerRegions,
  healerSpecialties,
  mockHealers,
} from "@/lib/mock/healers";

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
