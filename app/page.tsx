"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/HeroSection";
import StatsStrip from "@/components/StatsStrip";
import CommunitySection from "@/components/CommunitySection";
import HowItWorks from "@/components/HowItWorks";
import EarnSection from "@/components/EarnSection";
import CouponsSection from "@/components/CouponsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/footer";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Navigation />
      <HeroSection />
      <StatsStrip />
      <HowItWorks />
      <CommunitySection />
      <EarnSection />
      {isClient && <CouponsSection />}
      {!isClient && (
        <section className="bg-green-900 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Health Coupons</h2>
              <p className="text-gray-300 mt-2">Loading coupons...</p>
            </div>
          </div>
        </section>
      )}
      <CTASection />
      <Footer />
    </>
  );
}
