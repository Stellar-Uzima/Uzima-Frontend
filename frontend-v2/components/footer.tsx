import { Link } from '@/src/routing'
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[oklch(0.25_0.03_250)] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
                <path d="M20 5L20 35" stroke="#14B8A6" strokeWidth="3" strokeLinecap="round"/>
                <path d="M10 15L20 5L30 15" stroke="#14B8A6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 20H15M25 20H35" stroke="#14B8A6" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="20" cy="25" r="4" fill="#F59E0B"/>
              </svg>
              <span className="text-xl font-bold">
                STELLAR<span className="text-[oklch(0.65_0.15_175)]">UZIMA</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Healthcare knowledge sharing powered by Stellar blockchain. 
              Earn XLM tokens for quality content.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-[oklch(0.65_0.15_175)] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[oklch(0.65_0.15_175)] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[oklch(0.65_0.15_175)] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[oklch(0.65_0.15_175)] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services/knowledge-sharing" className="text-gray-400 hover:text-white transition-colors">Knowledge Sharing</Link></li>
              <li><Link href="/services/consultations" className="text-gray-400 hover:text-white transition-colors">Consultations</Link></li>
              <li><Link href="/services/rewards" className="text-gray-400 hover:text-white transition-colors">XLM Rewards</Link></li>
              <li><Link href="/services/white-label" className="text-gray-400 hover:text-white transition-colors">White Label</Link></li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h3 className="font-semibold mb-6">Download The App</h3>
            <div className="space-y-3">
              <a href="#" className="block bg-white/10 rounded-lg px-4 py-3 hover:bg-white/20 transition-colors">
                <span className="text-xs text-gray-400">Download on the</span>
                <p className="font-medium">App Store</p>
              </a>
              <a href="#" className="block bg-white/10 rounded-lg px-4 py-3 hover:bg-white/20 transition-colors">
                <span className="text-xs text-gray-400">Get it on</span>
                <p className="font-medium">Google Play</p>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            Copyright {new Date().getFullYear()} Stellar Uzima. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
