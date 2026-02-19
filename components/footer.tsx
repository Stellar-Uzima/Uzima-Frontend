export default function Footer() {
  const links = {
    Product: ['Features', 'Pricing', 'Security', 'Roadmap'],
    Company: ['About Us', 'Blog', 'Careers', 'Contact'],
    Resources: ['Documentation', 'Help Center', 'Community', 'Status'],
    Legal: ['Privacy', 'Terms', 'Disclaimer', 'Governance'],
  }

  const linkOrder = Object.keys(links);

  return (
    <footer className="bg-earth text-cream px-20 py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 animate-slideUp stagger-1 opacity-0">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-terra flex items-center justify-center text-gold text-sm font-bold animate-scaleIn stagger-1 opacity-0">
                ★
              </div>
              <span className="font-serif font-bold text-cream text-lg">
                Stellar
              </span>
            </div>
            <p className="text-xs text-cream/60">
              Transform your health, wealth, and community with blockchain-powered rewards.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items], index) => (
            <div key={title} className={`animate-slideUp opacity-0 stagger-${index + 2}`}>
              <h4 className="font-bold text-sm text-cream mb-4 hover:text-gold transition-colors duration-300">
                {title}
              </h4>
              <ul className="space-y-2">
                {items.map((item, itemIndex) => (
                  <li key={item} className={`animate-slideUp opacity-0 stagger-${itemIndex + 1}`}>
                    <a href="#" className="text-xs text-cream/60 hover:text-cream hover:translate-x-1 transition-all duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-cream/50">
          <p className="animate-slideUp stagger-5 opacity-0">
            © 2024 Stellar Uzima. All rights reserved.
          </p>

          <div className="flex gap-4">
            {['Twitter', 'Discord', 'Telegram', 'LinkedIn'].map((social, index) => (
              <a 
                key={social} 
                href="#" 
                className={`hover:text-cream hover:translate-y-[-2px] transition-all duration-300 animate-slideUp opacity-0 stagger-${index + 2}`}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
