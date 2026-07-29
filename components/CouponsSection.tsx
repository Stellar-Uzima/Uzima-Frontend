"use client";

import { useState, useEffect } from "react";

// Inline coupon card to avoid import issues
function CouponCard({ code, discount, expiresAt, specialist, description }: any) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-2xl font-bold text-yellow-400">{code}</span>
          <p className="text-sm text-gray-300 mt-1">{specialist}</p>
        </div>
        <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
          {discount}
        </span>
      </div>
      <p className="text-gray-200 mt-3 text-sm">{description}</p>
      <div className="mt-4 text-xs text-gray-400">
        Expires: {isClient ? new Date(expiresAt).toLocaleDateString() : expiresAt}
      </div>
    </div>
  );
}

export default function CouponsSection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <section className="bg-green-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Health Coupons</h2>
            <p className="text-gray-300 mt-2">Loading coupons...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/10 rounded-xl p-6 animate-pulse h-40"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-green-900 text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Health Coupons</h2>
          <p className="text-gray-300 mt-2">Exclusive discounts on health services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CouponCard
            code="HEALTH50"
            discount="50% off"
            expiresAt="2026-02-25"
            specialist="General Practitioner"
            description="Get 50% off your first consultation"
          />
          <CouponCard
            code="WELLNESS30"
            discount="30% off"
            expiresAt="2026-03-15"
            specialist="Mental Health"
            description="30% off mental health sessions"
          />
          <CouponCard
            code="FAMILY20"
            discount="20% off"
            expiresAt="2026-04-01"
            specialist="Family Medicine"
            description="20% off family health packages"
          />
        </div>
      </div>
    </section>
  );
}
