"use client";

/**
 * Decorative map of Africa for the community page. Kept client-only for
 * consistent hydration with interactive hover states.
 */
export default function AfricaMap() {
  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-[4/5] sm:aspect-[5/4] rounded-3xl border border-terra/15 bg-gradient-to-br from-forest/90 via-forest/70 to-terra/30 p-6 sm:p-10 shadow-xl shadow-terra/10 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(240,192,80,0.35), transparent 50%), radial-gradient(circle at 80% 80%, rgba(184,78,32,0.4), transparent 55%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 text-cream">
        <svg
          viewBox="0 0 320 360"
          className="w-full max-w-[min(100%,280px)] h-auto drop-shadow-lg text-gold/90"
          aria-hidden
        >
          <title>Africa</title>
          {/* Simplified continental outline */}
          <path
            fill="currentColor"
            opacity={0.95}
            d="M155 12c18 4 32 14 42 28 10 14 14 32 12 50-2 18-10 36-22 50 8 6 14 16 16 28 2 12-2 24-10 34 6 10 8 22 6 34-2 12-10 22-20 28 4 14 2 30-6 42-8 12-22 20-36 22-14 2-28-4-38-14-10 10-24 16-38 14s-26-12-32-26c-10 4-22 4-32-2s-16-18-16-30c-8-8-12-20-10-32 2-12 10-22 20-28-6-10-8-22-6-34s12-22 24-26c-10-14-14-32-10-50 4-18 16-34 32-44 16-10 36-14 54-10z"
          />
        </svg>
        <p className="text-center text-sm sm:text-base text-cream/90 font-medium max-w-xs">
          Members across the continent — tap into regional hubs and language communities.
        </p>
      </div>
    </div>
  );
}
