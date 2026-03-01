import Link from "next/link";
import { footerNavigation } from "./data/footer-navigation-data";
import { socialLinks } from "./data/social-links-data";
import LanguageSelector from "./ui/LanguageSelector";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-earth text-cream px-6 md:px-20 py-16 border-t border-white/10 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12 mb-12">

          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-terra flex items-center justify-center text-gold text-sm font-bold">
                ★
              </div>
              <span className="font-serif font-bold text-lg">
                Stellar
              </span>
            </div>

            <p className="text-xs text-cream/60">
              Transform your health, wealth, and community with blockchain-powered rewards.
            </p>
          </div>

          {/* Navigation Sections */}
          {footerNavigation.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold text-sm mb-4">
                {section.title}
              </h4>

              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-cream/60 hover:text-cream hover:translate-x-1 transition-all duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Row */}
        <div className="border-t border-white/10 pt-8 pb-8 flex flex-wrap justify-center md:justify-start gap-5">
          {socialLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.title}
                className="relative size-6 rounded-full flex items-center justify-center text-[#FDF5E8] bg-[#2E1503]/95 border border-[#2E1503] overflow-hidden group transition-all duration-200"
              >
                <span className="absolute inset-0 bg-[#FDF5E8] translate-y-[120%] group-hover:translate-y-0 transition-transform duration-200" />
                <Icon size={14} strokeWidth={1.5} className="relative z-10 group-hover:text-[#2E1503]" />
              </Link>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-cream/60">

          {/* Left */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <LanguageSelector />
            <p>© {currentYear} Stellar Uzima. All rights reserved.</p>
          </div>

          {/* Right - Powered By */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-terra flex items-center justify-center text-gold text-xs font-bold">
              ★
            </div>
            <span className="text-sm font-medium">
              Powered by Stellar
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}