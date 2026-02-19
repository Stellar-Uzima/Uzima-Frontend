'use client';

import { useState } from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <footer className="relative bg-gradient-to-b from-[var(--bark)] to-[#1a0f08] text-[var(--warm-white)] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--clay)] opacity-5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[var(--sage)] opacity-3 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="relative px-8 lg:px-16 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Top Section: Brand Mission */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Brand with story */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="font-serif text-4xl font-black leading-tight">
                  Stellar
                  <span className="inline-block ml-2 text-[var(--ochre)]">★</span>
                </div>
                <div className="font-serif text-4xl font-black text-[var(--ochre)]">Uzima</div>
              </div>
              <p className="text-sm leading-relaxed text-[rgba(254,252,248,0.7)] max-w-sm">
                Life flourishes when care meets innovation. We honor Ubuntu—the belief that humanity is interconnected—while transforming healthcare across the African continent.
              </p>
              
              {/* Social proof */}
              <div className="flex gap-6 pt-4">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-[var(--ochre)]">25+</div>
                  <p className="text-xs text-[rgba(254,252,248,0.5)]">Countries</p>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-[var(--clay)]">500K+</div>
                  <p className="text-xs text-[rgba(254,252,248,0.5)]">Lives Impacted</p>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-[var(--sky)]">150+</div>
                  <p className="text-xs text-[rgba(254,252,248,0.5)]">Team Members</p>
                </div>
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="bg-gradient-to-br from-[var(--clay)] to-[var(--earth)] rounded-2xl p-8 space-y-4">
              <div>
                <h4 className="font-serif text-2xl font-bold text-[var(--warm-white)] mb-2">
                  Join Our Mission
                </h4>
                <p className="text-sm text-[rgba(254,252,248,0.9)]">
                  Get updates on healthcare innovation and ways to contribute to African health transformation.
                </p>
              </div>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-lg bg-[var(--warm-white)] text-[var(--bark)] placeholder-[rgba(44,26,14,0.4)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ochre)]"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[var(--bark)] text-[var(--warm-white)] rounded-lg font-semibold text-sm hover:bg-[#0f0a05] transition-colors duration-200"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-[rgba(254,252,248,0.7)]">
                No spam. Just stories of impact.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[rgba(254,252,248,0.1)] to-transparent my-12"></div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Product */}
            <div>
              <h5 className="text-xs font-semibold uppercase tracking-widest text-[var(--ochre)] mb-5 font-sans">
                Product
              </h5>
              <ul className="space-y-3">
                {['Features', 'About', 'Pricing', 'Security'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      onMouseEnter={() => setHoveredLink(item)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className="text-xs text-[rgba(254,252,248,0.65)] hover:text-[var(--ochre)] transition-all duration-200 relative inline-block group"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--ochre)] group-hover:w-full transition-all duration-300"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h5 className="text-xs font-semibold uppercase tracking-widest text-[var(--ochre)] mb-5 font-sans">
                Company
              </h5>
              <ul className="space-y-3">
                {['Team', 'Contribute', 'Blog', 'Contact'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      onMouseEnter={() => setHoveredLink(item)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className="text-xs text-[rgba(254,252,248,0.65)] hover:text-[var(--ochre)] transition-all duration-200 relative inline-block group"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--ochre)] group-hover:w-full transition-all duration-300"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h5 className="text-xs font-semibold uppercase tracking-widest text-[var(--ochre)] mb-5 font-sans">
                Legal
              </h5>
              <ul className="space-y-3">
                {['Privacy', 'Terms', 'Cookies', 'License'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-xs text-[rgba(254,252,248,0.65)] hover:text-[var(--ochre)] transition-all duration-200 relative inline-block group"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--ochre)] group-hover:w-full transition-all duration-300"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h5 className="text-xs font-semibold uppercase tracking-widest text-[var(--ochre)] mb-5 font-sans">
                Connect
              </h5>
              <ul className="space-y-3">
                {['Twitter', 'LinkedIn', 'GitHub', 'Instagram'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-xs text-[rgba(254,252,248,0.65)] hover:text-[var(--ochre)] transition-all duration-200 relative inline-block group"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--ochre)] group-hover:w-full transition-all duration-300"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[rgba(254,252,248,0.1)] to-transparent my-12"></div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-2">
              <p className="text-xs text-[rgba(254,252,248,0.5)]">
                © {currentYear} Stellar Uzima. Made with passion in Africa.
              </p>
              <p className="text-xs text-[rgba(254,252,248,0.35)]">
                Empowering Africa's healthcare renaissance, one innovation at a time.
              </p>
            </div>

            {/* Badges */}
            <div className="flex gap-3 flex-wrap justify-center md:justify-end">
              <div className="inline-flex items-center gap-2 bg-[rgba(254,252,248,0.08)] border border-[rgba(254,252,248,0.1)] rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-[var(--clay)] rounded-full animate-pulse"></div>
                <span className="text-xs text-[rgba(254,252,248,0.6)]">MIT License</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-[rgba(254,252,248,0.08)] border border-[rgba(254,252,248,0.1)] rounded-full px-4 py-2">
                <span className="text-xs text-[rgba(254,252,248,0.6)]">Open Source</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
