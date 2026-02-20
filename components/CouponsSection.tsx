import { CouponCard } from "./coupons/CouponCard";
export default function CouponsSection() {
  const coupons = [
    {
      icon: "🏥",
      title: "Health Check-Up",
      description: "Free medical consultation and health screening",
      reward: "500 XLM",
      color: "terra",
    },
    {
      icon: "📚",
      title: "Premium Course Bundle",
      description: "Access to 50+ wealth-building courses",
      reward: "750 XLM",
      color: "sage",
    },
    {
      icon: "✈️",
      title: "Community Travel Fund",
      description: "Subsidized group trips and experiences",
      reward: "1000 XLM",
      color: "gold",
    },
  ];

  return (
    <section className="bg-forest text-cream px-20 py-28 relative overflow-hidden">
      {/* Decorative gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 80% 50%, rgba(90,122,74,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 gap-20 items-center">
          {/* Left - Text */}
          <div>
            <div className="flex items-center gap-2 text-gold/90 font-bold text-xs uppercase tracking-widest mb-2">
              <span>✦</span>
              <span>Redeem Rewards</span>
            </div>

            <h2
              className="font-serif font-bold text-cream leading-tight mb-4"
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Exclusive <em className="italic text-gold">Benefits</em>
            </h2>

            <p className="text-base text-cream/65 leading-loose max-w-sm">
              Use your earned XLM tokens to unlock exclusive benefits and
              transform your life.
            </p>
          </div>

          {/* Right - Coupon cards */}
          <CouponCard
            code="HEALTH50"
            discount="50% off"
            expiresAt="2026-02-25"
            specialist="General Practitioner"
            status="active"
          />
          <div className="flex flex-col gap-4">
            {coupons.map((coupon, i) => {
              const colorClasses = {
                terra: "border-terra/30 bg-terra/20",
                sage: "border-sage/30 bg-sage/20",
                gold: "border-gold/25 bg-gold/12",
              };

              const accentColors = {
                terra: "#B84E20",
                sage: "#5A7A4A",
                gold: "#F0C050",
              };

              return (
                <div
                  key={i}
                  className={`rounded-4xl p-6 flex items-center gap-5 border relative overflow-hidden ${colorClasses[coupon.color as keyof typeof colorClasses]}`}
                >
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{
                      backgroundColor:
                        accentColors[coupon.color as keyof typeof accentColors],
                    }}
                  />

                  <span className="text-3xl flex-shrink-0">{coupon.icon}</span>

                  <div className="flex-1">
                    <div className="font-bold text-cream mb-0.5">
                      {coupon.title}
                    </div>
                    <div className="text-xs text-cream/60">
                      {coupon.description}
                    </div>
                  </div>

                  <div className="font-bold text-lg text-gold whitespace-nowrap">
                    {coupon.reward}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
