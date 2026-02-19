'use client';

import { useState } from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Team', href: '#team' },
  { label: 'Contribute', href: '#contribute' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-16 py-4.5 bg-[rgba(254,252,248,0.92)] backdrop-blur-xl border-b border-[rgba(196,98,45,0.1)] transition-shadow duration-300">
      <Link href="/" className="flex items-center gap-1.5 font-serif text-2xl font-bold text-[var(--clay)] decoration-none cursor-pointer">
        <span>Stellar</span>
        <span className="text-[var(--ochre)]">★</span>
      </Link>

      <ul className="hidden lg:flex items-center gap-10 list-none">
        {navItems.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="decoration-none text-[var(--bark)] text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer hover:text-[var(--clay)]"
            >
              {item.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="mailto:hello@stellar.com"
            className="decoration-none text-[var(--warm-white)] text-sm font-medium bg-[var(--clay)] px-6 py-2.5 rounded-full transition-all duration-250 cursor-pointer hover:bg-[var(--earth)]"
          >
            Get Started
          </a>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden flex flex-col gap-1.5 cursor-pointer border-none bg-none p-1"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span className="block w-6 h-0.5 bg-[var(--bark)] rounded-sm"></span>
        <span className="block w-6 h-0.5 bg-[var(--bark)] rounded-sm"></span>
        <span className="block w-6 h-0.5 bg-[var(--bark)] rounded-sm"></span>
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-99 bg-[var(--warm-white)] px-8 pt-20 pb-8 flex flex-col gap-6">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-5 right-6 text-2xl cursor-pointer bg-none border-none text-[var(--bark)]"
          >
            ×
          </button>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-serif text-[var(--bark)] decoration-none cursor-pointer border-b border-[rgba(44,26,14,0.06)] pb-4 hover:text-[var(--clay)]"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
