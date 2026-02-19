'use client'

export default function HeroSection() {
  return (
    <section className="min-h-screen pt-20 px-20 py-28 relative overflow-hidden bg-cream">
      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 right-0 w-1/2 h-4/5 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 60% 40%, rgba(224,139,46,0.18) 0%, rgba(184,78,32,0.08) 40%, transparent 70%)',
        }}
      />
      <div className="absolute bottom-0 left-0 w-3/10 h-2/5 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 70%, rgba(90,122,74,0.12) 0%, transparent 60%)',
        }}
      />

      {/* Kente-inspired left bar */}
      <div className="absolute left-0 top-20 bottom-0 w-1 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(to bottom, #B84E20 0 20px, #E08B2E 20px 40px, #F0C050 40px 60px, #5A7A4A 60px 80px)',
        }}
      />

      <div className="grid grid-cols-11 gap-16 items-center relative z-10 max-w-7xl mx-auto">
        {/* Left content */}
        <div className="col-span-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-terra/10 border border-terra/22 text-terra text-xs font-bold px-4 py-2 rounded-full tracking-wide uppercase mb-6 animate-[fadeUp_0.7s_ease_both]">
            <span>⚡</span>
            <span>Earn While You Learn</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif font-black text-earth leading-tight mb-6 animate-[fadeUp_0.7s_0.08s_ease_both]"
            style={{ fontSize: 'clamp(2.6rem, 4.5vw, 4rem)', letterSpacing: '-0.02em' }}>
            Your <em className="italic text-terra">Health.</em> Your <em className="italic text-terra">Wealth.</em><br />
            Your <em className="italic text-terra">Community.</em>
          </h1>

          {/* Subheading */}
          <p className="text-lg text-muted leading-relaxed max-w-sm mb-10 animate-[fadeUp_0.7s_0.16s_ease_both]">
            Join thousands earning real rewards by improving their health, building wealth, and creating lasting community connections.
          </p>

          {/* CTAs */}
          <div className="flex gap-3.5 flex-wrap mb-7 animate-[fadeUp_0.7s_0.24s_ease_both]">
            <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium bg-terra text-white hover:bg-earth hover:shadow-lg hover:shadow-terra/30 transition-all hover:-translate-y-0.5 cursor-pointer">
              Get Started
              <span>→</span>
            </button>
            <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium bg-transparent text-earth border-2 border-earth/20 hover:border-terra hover:text-terra transition-all cursor-pointer">
              Learn More
              <span>↗</span>
            </button>
          </div>

          {/* Proof */}
          <div className="flex items-center gap-6 animate-[fadeUp_0.7s_0.32s_ease_both]">
            <div className="flex -space-x-2.5">
              {[
                'linear-gradient(135deg, #C05A2B, #E08B2E)',
                'linear-gradient(135deg, #5A7A4A, #4A8CAA)',
                'linear-gradient(135deg, #B84E20, #F0C050)',
                'linear-gradient(135deg, #1C3020, #5A7A4A)',
              ].map((gradient, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2.5 border-cream flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: gradient }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted leading-relaxed">
              <strong className="text-earth">Join 25K+ members</strong> earning their way to better health and wealth.
            </p>
          </div>
        </div>

        {/* Right - Real African People Portraits */}
        <div className="col-span-5 relative animate-[fadeRight_0.8s_0.2s_ease_both]">
          <div className="relative h-96 flex items-center justify-center">
            {/* Center portrait - Main focus */}
            <div className="absolute z-20 w-56 h-72 rounded-4xl overflow-hidden shadow-2xl border-4 border-cream"
              style={{ boxShadow: '0 30px 80px rgba(46,21,3,0.25)' }}>
              <img 
                src="/african-woman-1.jpg" 
                alt="Woman from our community"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Left portrait - Overlapping */}
            <div className="absolute z-10 left-0 w-44 h-60 rounded-3xl overflow-hidden shadow-lg border-3 border-cream transform -translate-x-12"
              style={{ boxShadow: '0 20px 60px rgba(46,21,3,0.15)' }}>
              <img 
                src="/african-man-1.jpg" 
                alt="Man from our community"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right portrait - Overlapping */}
            <div className="absolute z-10 right-0 w-44 h-60 rounded-3xl overflow-hidden shadow-lg border-3 border-cream transform translate-x-12"
              style={{ boxShadow: '0 20px 60px rgba(46,21,3,0.15)' }}>
              <img 
                src="/african-woman-2.jpg" 
                alt="Young woman from our community"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Floating cards with stats */}
          <div className="absolute bottom-12 -left-12 bg-white rounded-3.5 px-5 py-3 shadow-lg flex flex-col text-sm text-earth font-medium"
            style={{ animation: 'float 3s ease-in-out infinite 0s' }}>
            <div className="text-base font-black text-terra">25K+</div>
            <div className="text-xs opacity-75">Members</div>
          </div>

          <div className="absolute top-20 -right-11 bg-white rounded-3.5 px-5 py-3 shadow-lg flex flex-col text-sm font-medium text-center"
            style={{ animation: 'float 3s ease-in-out infinite 1.5s' }}>
            <div className="text-base font-black text-terra">$2M+</div>
            <div className="text-xs text-muted">Distributed</div>
          </div>

          <div className="absolute bottom-32 -right-16 bg-white rounded-3.5 px-4 py-2.5 shadow-lg flex items-center gap-2 text-xs font-medium whitespace-nowrap"
            style={{ animation: 'float 3s ease-in-out infinite 1s' }}>
            <span className="text-base">⭐</span>
            <span className="text-earth">Real People</span>
          </div>
        </div>
      </div>
    </section>
  )
}
