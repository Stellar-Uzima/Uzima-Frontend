export default function BlockchainSection() {
  const points = [
    'Transparent and secure blockchain-based transactions',
    'Instant settlement with XLM tokens',
    'Non-custodial wallet integration',
    'Verifiable health and wealth achievements',
  ]

  const steps = [
    { icon: '📱', label: 'Complete Task', value: '+100 XLM' },
    { icon: '✅', label: 'Verification', value: 'Auto-verified' },
    { icon: '⛓️', label: 'Blockchain', value: 'Recorded' },
    { icon: '💰', label: 'Wallet', value: 'Received' },
  ]

  return (
    <section id="blockchain" className="bg-earth text-cream px-20 py-28 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 70%, rgba(74,140,170,0.15) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 gap-20 items-center">
          {/* Left - Text */}
          <div>
            <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest mb-2">
              <span>✦</span>
              <span>Powered By Blockchain</span>
            </div>

            <h2 className="font-serif font-bold text-cream leading-tight mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-0.02em' }}>
              Secure and <em className="italic text-gold">Transparent</em>
            </h2>

            <p className="text-base text-cream/65 leading-loose max-w-sm mb-8">
              Built on Stellar Network for transparent, secure, and instant reward distribution.
            </p>

            {/* Explainer box */}
            <div className="bg-white/5 border border-white/8 rounded-5 p-7 mb-8">
              <div className="text-xs text-gold uppercase tracking-widest font-semibold mb-4">
                Why Blockchain?
              </div>

              {points.map((point, i) => (
                <div key={i} className="flex gap-3 items-start mb-4 last:mb-0">
                  <div className="w-7 h-7 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center flex-shrink-0 text-sm">
                    ✓
                  </div>
                  <div className="text-sm text-cream/75 leading-relaxed">
                    {point}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Flow diagram */}
          <div>
            <div className="bg-white/5 border border-white/8 rounded-5 p-7">
              <div className="text-xs text-cream/50 uppercase tracking-widest mb-5">
                Stellar Flow
              </div>

              <div className="flex flex-col gap-3">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/6 rounded-2.5 flex items-center justify-center flex-shrink-0 text-lg">
                      {step.icon}
                    </div>

                    <div className="flex-1">
                      <div className="text-sm text-cream/75">
                        {step.label}
                      </div>
                      <div className="text-xs text-cream/50">
                        {step.value}
                      </div>
                    </div>

                    {i < steps.length - 1 && (
                      <div className="text-gold text-lg opacity-50">
                        →
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* XLM Badge */}
              <div className="mt-6 pt-6 border-t border-white/8">
                <div className="inline-block text-xs font-bold text-gold bg-gold/15 px-2.5 py-1 rounded">
                  Built on Stellar (XLM)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
