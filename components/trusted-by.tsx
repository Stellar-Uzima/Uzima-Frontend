export function TrustedBy() {
  const partners = [
    { name: "Stellar Foundation", logo: "SF" },
    { name: "HealthTech Africa", logo: "HTA" },
    { name: "MedConnect", logo: "MC" },
    { name: "CryptoHealth", logo: "CH" },
    { name: "AfriHealth", logo: "AH" },
    { name: "Global Care", logo: "GC" },
  ]

  return (
    <section className="py-12 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[oklch(0.25_0.03_250)] mb-8">
          Stellar Uzima is trusted by{" "}
          <span className="text-[oklch(0.65_0.15_175)] font-semibold">Healthcare Providers, Blockchain Partners & High-growth Organizations</span>
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
          {partners.map((partner) => (
            <div key={partner.name} className="flex items-center gap-2 text-muted-foreground hover:text-[oklch(0.65_0.15_175)] transition-colors">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                {partner.logo}
              </div>
              <span className="font-medium">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
