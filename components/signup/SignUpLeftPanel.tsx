// Server Component — purely static brand content, no interactivity needed.
// Renders the 40% left panel with logo, value statement, feature bullets,
// and the African-inspired kente color bar on the left edge.
//

import Link from "next/link";
import { CheckCircle2, Zap, Globe2 } from "lucide-react";

// Feature bullets shown in the left panel
const FEATURES = [
  {
    icon: <Zap className="w-5 h-5 text-gold" />,
    title: "Earn real XLM rewards",
    description: "Complete health & wealth tasks, get paid in Stellar tokens.",
  },
  {
    icon: <CheckCircle2 className="w-5 h-5 text-sage" />,
    title: "Access genuine African care",
    description:
      "Connect with verified healers, doctors, and wellness experts.",
  },
  {
    icon: <Globe2 className="w-5 h-5 text-sky" />,
    title: "Join 25K+ Africans",
    description:
      "A growing community across 150 countries building wealth together.",
  },
] as const;

// Kente-inspired repeating color segments
// Mirrors the left decorative bar used in HeroSection for visual consistency.
const KENTE_COLORS = ["#B84E20", "#E08B2E", "#F0C050", "#5A7A4A"] as const;

export default function SignUpLeftPanel() {
  return (
    /**
     * Outer wrapper: fills full height of the grid cell.
     * `relative` allows us to absolutely-position the kente bar.
     */
    <div className="relative h-full min-h-70 flex flex-col justify-between bg-earth overflow-hidden px-10 py-12">
      {/* Kente color bar — left edge */}

      <div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-1.5"
        style={{
          background: `repeating-linear-gradient(
            to bottom,
            ${KENTE_COLORS[0]} 0 20px,
            ${KENTE_COLORS[1]} 20px 40px,
            ${KENTE_COLORS[2]} 40px 60px,
            ${KENTE_COLORS[3]} 60px 80px
          )`,
        }}
      />

      {/* Subtle radial glow — top right — adds warmth / depth */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 90% 10%, rgba(240,192,80,0.18) 0%, transparent 65%)",
        }}
      />

      {/*bTop section: logo + headline*/}
      <div className="relative z-10">
        {/* Logo — same markup as Navbar for visual consistency */}
        <Link
          href="/"
          aria-label="Go to Stellar Uzima homepage"
          className="inline-flex items-center gap-2.5 mb-10 focus:outline-none focus:ring-2 focus:ring-gold/40 rounded-full"
        >
          {/* Gold star on terra circle — mirrors navigation.tsx logo */}
          <div className="w-10 h-10 rounded-full bg-terra flex items-center justify-center text-gold text-base font-semibold">
            ★
          </div>
          <span className="font-serif font-bold text-cream text-xl tracking-tight">
            Stellar Uzima
          </span>
        </Link>

        {/* Primary value statement */}
        <h2
          className="font-serif font-bold text-cream leading-snug mb-3"
          style={{
            fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Stay healthy.
          <br />
          Earn <em className="italic text-gold">XLM.</em>
          <br />
          Get real care.
        </h2>

        {/* Supporting tagline */}
        <p className="text-cream/60 text-sm leading-relaxed mb-10 max-w-xs">
          The wellness-to-wealth platform built for Africans, powered by
          blockchain.
        </p>

        {/* Feature bullets */}
        <ul className="flex flex-col gap-5">
          {FEATURES.map(({ icon, title, description }) => (
            <li key={title} className="flex items-start gap-3.5">
              {/* Icon container with subtle background tint */}
              <div className="w-9 h-9 rounded-2xl bg-white/8 flex items-center justify-center shrink-0">
                {icon}
              </div>
              <div>
                <p className="text-cream font-semibold text-sm leading-snug">
                  {title}
                </p>
                <p className="text-cream/55 text-xs leading-relaxed mt-0.5">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom section: member count social proof  */}
      <div className="relative z-10 mt-10 pt-8 border-t border-white/10">
        {/* Avatar stack — placeholder gradient circles, matching HeroSection */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2.5">
            {[
              "linear-gradient(135deg,#C05A2B,#E08B2E)",
              "linear-gradient(135deg,#5A7A4A,#4A8CAA)",
              "linear-gradient(135deg,#B84E20,#F0C050)",
              "linear-gradient(135deg,#1C3020,#5A7A4A)",
            ].map((gradient, i) => (
              <div
                key={i}
                aria-hidden="true"
                className="w-8 h-8 rounded-full border-2 border-earth flex items-center justify-center text-white text-xs font-bold"
                style={{ background: gradient }}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <p className="text-cream/60 text-xs leading-relaxed">
            <strong className="text-cream font-semibold">
              25,000+ Africans
            </strong>
            <br />
            already earning XLM for their health
          </p>
        </div>
      </div>
    </div>
  );
}
