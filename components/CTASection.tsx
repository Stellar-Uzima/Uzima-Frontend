export default function CTASection() {
  return (
    <section className="bg-earth text-cream px-20 py-28 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 70% 30%, rgba(240,192,80,0.1) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="font-serif font-bold text-cream leading-tight mb-6"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
          Ready to Transform Your <em className="italic text-gold">Life?</em>
        </h2>

        <p className="text-lg text-cream/65 leading-loose mb-12 max-w-2xl mx-auto">
          Join 25,000+ members already earning rewards while improving their health, building wealth, and creating lasting community connections.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold bg-gold text-earth hover:bg-amber transition-all hover:shadow-lg hover:shadow-gold/30 hover:-translate-y-0.5 cursor-pointer">
            Get Started Free
            <span>→</span>
          </button>

          <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold bg-white/10 text-cream border-2 border-white/20 hover:border-white/40 hover:bg-white/15 transition-all cursor-pointer">
            Schedule Demo
            <span>↗</span>
          </button>
        </div>

        {/* Trust badge */}
        <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-center gap-2 text-cream/60 text-xs">
          <span>🔒</span>
          <span>Bank-level security | Blockchain-verified | Privacy-first</span>
        </div>
      </div>
    </section>
  )
}
