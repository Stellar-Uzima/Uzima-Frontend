'use client';

import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center px-8 lg:px-16 py-20 lg:py-0 pt-32 lg:pt-0 overflow-hidden">
      {/* Background Gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 80% at 100% 50%, rgba(232,168,76,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 40% 60% at 0% 80%, rgba(196,98,45,0.08) 0%, transparent 50%)
          `,
        }}
      ></div>

      {/* Left Content */}
      <div className="relative z-10 lg:pr-16">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-[rgba(196,98,45,0.08)] border border-[rgba(196,98,45,0.2)] px-3 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase text-[var(--clay)] mb-6 animate-fade-up">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--clay)] animate-pulse-dot"></span>
          African Healthcare Innovation
        </div>

        {/* Title */}
        <h1 className="text-5xl lg:text-6xl xl:text-7xl leading-tight font-black text-[var(--bark)] mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <em className="font-italic text-[var(--clay)] not-italic relative">Reimagining</em> African Healthcare
        </h1>

        {/* Description */}
        <p className="text-lg leading-relaxed text-[rgba(44,26,14,0.65)] max-w-xl mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Stellar Uzima brings world-class healthcare technology to Africa, breaking down barriers and making quality medical care accessible to everyone.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Link
            href="#contact"
            className="inline-block bg-[var(--clay)] text-[var(--warm-white)] px-8 py-3 rounded-full text-sm font-medium decoration-none border-none cursor-pointer transition-all duration-250 hover:bg-[var(--earth)] hover:-translate-y-0.5 hover:shadow-xl"
          >
            Start Your Journey
          </Link>
          <Link
            href="#about"
            className="inline-block bg-transparent text-[var(--bark)] px-8 py-3 rounded-full text-sm font-medium border-1.5 border-[rgba(44,26,14,0.2)] decoration-none cursor-pointer transition-all duration-250 hover:border-[var(--clay)] hover:text-[var(--clay)]"
          >
            Learn More
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-10 mt-12 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <div>
            <div className="font-serif text-4xl font-bold text-[var(--clay)] leading-tight">50M+</div>
            <div className="text-xs text-[rgba(44,26,14,0.5)] mt-0.5">Lives Impacted</div>
          </div>
          <div>
            <div className="font-serif text-4xl font-bold text-[var(--clay)] leading-tight">35+</div>
            <div className="text-xs text-[rgba(44,26,14,0.5)] mt-0.5">Countries Active</div>
          </div>
          <div>
            <div className="font-serif text-4xl font-bold text-[var(--clay)] leading-tight">10K+</div>
            <div className="text-xs text-[rgba(44,26,14,0.5)] mt-0.5">Healthcare Partners</div>
          </div>
        </div>
      </div>

      {/* Right Visual */}
      <div className="relative z-10 hidden lg:flex items-center justify-center mt-12 lg:mt-0">
        <div className="relative w-96 h-full flex items-center justify-center">
          {/* Main Card */}
          <div className="absolute w-80 bg-[var(--warm-white)] rounded-3xl p-8 shadow-2xl border border-[rgba(196,98,45,0.1)]">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--clay)] to-[var(--ochre)] flex items-center justify-center text-2xl mb-4">
              👨‍⚕️
            </div>
            <h3 className="font-serif text-lg font-bold mb-0.5">Dr. Amara</h3>
            <p className="text-xs text-[rgba(44,26,14,0.5)] mb-4">Chief Medical Officer</p>

            {/* Reward Box */}
            <div className="bg-gradient-to-r from-[rgba(196,98,45,0.08)] to-[rgba(232,168,76,0.08)] border border-[rgba(196,98,45,0.15)] rounded-2xl p-2 flex items-center justify-between">
              <span className="text-xs text-[rgba(44,26,14,0.5)]">Monthly Impact</span>
              <span className="font-serif font-bold text-[var(--clay)] text-lg">+2,450</span>
            </div>
          </div>

          {/* Floating Pills */}
          <div
            className="absolute top-12 -left-12 bg-[var(--warm-white)] rounded-full px-4 py-2.5 shadow-lg border border-[rgba(196,98,45,0.1)] text-xs font-medium flex items-center gap-2 animate-float"
            style={{ animationDelay: '0s' }}
          >
            <span className="w-2 h-2 rounded-full bg-[var(--clay)]"></span>
            24/7 Support
          </div>
          <div
            className="absolute bottom-8 -right-16 bg-[var(--warm-white)] rounded-full px-4 py-2.5 shadow-lg border border-[rgba(196,98,45,0.1)] text-xs font-medium flex items-center gap-2 animate-float"
            style={{ animationDelay: '1.5s' }}
          >
            <span className="w-2 h-2 rounded-full bg-[var(--sage)]"></span>
            Real Results
          </div>
          <div
            className="absolute top-1/2 -left-24 bg-[var(--warm-white)] rounded-full px-4 py-2.5 shadow-lg border border-[rgba(196,98,45,0.1)] text-xs font-medium flex items-center gap-2 animate-float"
            style={{ animationDelay: '0.8s' }}
          >
            <span className="w-2 h-2 rounded-full bg-[var(--sky)]"></span>
            1000+ Trained
          </div>
        </div>
      </div>
    </section>
  );
}
