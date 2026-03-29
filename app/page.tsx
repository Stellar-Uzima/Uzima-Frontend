import dynamic from "next/dynamic";

import Navigation from "@/components/navigation";
import HeroSection from "@/components/HeroSection";
import StatsStrip from "@/components/StatsStrip";
import HowItWorks from "@/components/HowItWorks";
import EarnSection from "@/components/EarnSection";
import CouponsSection from "@/components/CouponsSection";
import CommunitySection from "@/components/CommunitySection";
import BlockchainSection from "@/components/BlockchainSection";
import StoriesSection from "@/components/StoriesSection";
import CTASection from "@/components/CTASection";

const TraditionalMedicineSection = dynamic(() => import("@/components/TraditionalMedicineSection"));
const UzimaAngelsSection = dynamic(() => import("@/components/UzimaAngelsSection"));
const BiotechnologySection = dynamic(() => import("@/components/BiotechnologySection"));
const StreakCelebrationGate = dynamic(() => import("@/components/dashboard/StreakCelebrationGate"));

export default function Home() {
  return (
    <>
      <Navigation />
      <StreakCelebrationGate />
      <HeroSection />
      <StatsStrip />
      <HowItWorks />
      <EarnSection />
      <CouponsSection />
      <CommunitySection />
      <TraditionalMedicineSection />
      <UzimaAngelsSection />
      <BiotechnologySection />
      <BlockchainSection />
      <StoriesSection />
      <CTASection />
    </>
  );
}
