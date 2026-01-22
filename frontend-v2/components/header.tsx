"use client"

import { Link } from "@/src/routing"
import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import LanguageSwitcher from "./LanguageSwitcher"
import { useTranslations } from "next-intl"

export function Header() {
  const t = useTranslations('Navigation');
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
                <path d="M20 5L20 35" stroke="#14B8A6" strokeWidth="3" strokeLinecap="round" />
                <path d="M10 15L20 5L30 15" stroke="#14B8A6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 20H15M25 20H35" stroke="#14B8A6" strokeWidth="3" strokeLinecap="round" />
                <circle cx="20" cy="25" r="4" fill="#F59E0B" />
              </svg>
              <span className="ml-2 text-xl font-bold text-[oklch(0.25_0.03_250)]">
                STELLAR<span className="text-[oklch(0.65_0.15_175)]">UZIMA</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-foreground font-medium hover:text-[oklch(0.65_0.15_175)] transition-colors border-b-2 border-[oklch(0.65_0.15_175)]">
              {t('home')}
            </Link>
            <Link href="/about" className="text-muted-foreground font-medium hover:text-[oklch(0.65_0.15_175)] transition-colors">
              {t('about')}
            </Link>
            <div className="relative">
              <button
                className="flex items-center gap-1 text-muted-foreground font-medium hover:text-[oklch(0.65_0.15_175)] transition-colors"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                {t('services')} <ChevronDown className="w-4 h-4" />
              </button>
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-2">
                  <Link href="/services/knowledge-sharing" className="block px-4 py-2 hover:bg-muted transition-colors">{t('knowledgeSharing')}</Link>
                  <Link href="/services/consultations" className="block px-4 py-2 hover:bg-muted transition-colors">{t('consultations')}</Link>
                  <Link href="/services/rewards" className="block px-4 py-2 hover:bg-muted transition-colors">{t('rewards')}</Link>
                </div>
              )}
            </div>
            <Link href="/marketplace" className="text-muted-foreground font-medium hover:text-[oklch(0.65_0.15_175)] transition-colors">
              {t('marketplace')}
            </Link>
            <Link href="/blog" className="text-muted-foreground font-medium hover:text-[oklch(0.65_0.15_175)] transition-colors">
              {t('blog')}
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <Button className="bg-[oklch(0.65_0.15_175)] hover:bg-[oklch(0.55_0.15_175)] text-white rounded-full px-6">
              {t('connectWallet')}
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-foreground font-medium">{t('home')}</Link>
              <Link href="/about" className="text-muted-foreground font-medium">{t('about')}</Link>
              <Link href="/services" className="text-muted-foreground font-medium">{t('services')}</Link>
              <Link href="/marketplace" className="text-muted-foreground font-medium">{t('marketplace')}</Link>
              <Link href="/blog" className="text-muted-foreground font-medium">{t('blog')}</Link>
              <Button className="bg-[oklch(0.65_0.15_175)] hover:bg-[oklch(0.55_0.15_175)] text-white rounded-full w-full mt-4">
                {t('connectWallet')}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
