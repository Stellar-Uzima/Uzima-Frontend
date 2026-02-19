'use client'

export default function UzimaAngelsSection() {
  const angels = [
    {
      name: 'Amara Okafor',
      region: 'Rural Katsina, Northern Nigeria',
      title: 'Health Champion',
      impact: 'Reached 500+ families with health programs',
      description: 'Brings modern wellness education to underserved communities while preserving traditional knowledge.',
      gradient: 'linear-gradient(135deg, #E08B2E 0%, #F0C050 100%)',
      icon: '🏥',
    },
    {
      name: 'Kwame Mensah',
      region: 'Rural Ashanti, Ghana',
      title: 'Wealth Builder',
      impact: 'Trained 300+ farmers on income generation',
      description: 'Empowering rural farmers with financial literacy and market access through blockchain rewards.',
      gradient: 'linear-gradient(135deg, #5A7A4A 0%, #7A9A6A 100%)',
      icon: '💰',
    },
    {
      name: 'Fatima Hassan',
      region: 'Rural Kano, Northern Nigeria',
      title: 'Community Builder',
      impact: 'Connected 1,200+ women in rural network',
      description: 'Creating safe spaces for women to earn, learn, and grow together in remote areas.',
      gradient: 'linear-gradient(135deg, #4A8CAA 0%, #5A9ABA 100%)',
      icon: '🤝',
    },
    {
      name: 'David Kipchoge',
      region: 'Rural Rift Valley, Kenya',
      title: 'Youth Mentor',
      impact: 'Mentored 400+ young people to digital skills',
      description: 'Bridging the digital divide by teaching rural youth tech skills and blockchain opportunities.',
      gradient: 'linear-gradient(135deg, #B84E20 0%, #D8642C 100%)',
      icon: '📚',
    },
  ]

  return (
    <section className="bg-gradient-to-b from-white via-cream/3 to-white px-20 py-28">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-terra font-bold text-xs uppercase tracking-widest mb-2 animate-fadeUp">
            <span>⭐</span>
            <span>Meet Our Heroes</span>
          </div>

          <h2 className="font-serif font-bold text-earth leading-tight mb-4 inline-block animate-fadeUp"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-0.02em', animationDelay: '0.1s' }}>
            Uzima <em className="italic text-terra">Angels</em>
          </h2>

          <p className="text-earth/70 max-w-2xl mx-auto text-sm leading-relaxed animate-fadeUp"
            style={{ animationDelay: '0.2s' }}>
            Meet the champions extending Stellar Uzima's mission to rural communities across Africa. These sponsors are bringing health, wealth, and community to underserved regions, one village at a time.
          </p>
        </div>

        {/* Angels Grid */}
        <div className="grid grid-cols-2 gap-8 mb-16">
          {angels.map((angel, i) => (
            <div
              key={i}
              className="group relative rounded-4xl p-8 bg-white border-2 border-earth/5 hover:border-earth/15 transition-all hover:shadow-xl overflow-hidden animate-fadeUp"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: angel.gradient }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon and Title */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-4xl mb-2">{angel.icon}</div>
                    <h3 className="font-bold text-earth text-lg">
                      {angel.name}
                    </h3>
                    <div className="text-xs font-semibold text-terra uppercase tracking-wider mt-1">
                      {angel.title}
                    </div>
                  </div>
                </div>

                {/* Region */}
                <div className="flex items-center gap-2 text-xs text-muted mb-4">
                  <span>📍</span>
                  <span>{angel.region}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-earth/70 leading-relaxed mb-5">
                  {angel.description}
                </p>

                {/* Impact Badge */}
                <div className="p-3 rounded-2xl border border-amber/20 bg-amber/5 flex items-center gap-3">
                  <span className="text-xl">🎯</span>
                  <div>
                    <div className="text-xs font-bold text-terra">Impact</div>
                    <div className="text-xs text-earth/60">{angel.impact}</div>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full mt-5 py-2.5 px-4 rounded-2xl font-bold text-xs uppercase tracking-wider text-white bg-earth hover:bg-forest transition-all transform group-hover:translate-y-minus-1 cursor-pointer"
                  style={{ background: angel.gradient.split('linear-gradient(135deg, ')[1].split(' 0%')[0] }}>
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Become an Angel CTA */}
        <div className="bg-gradient-to-r from-earth via-terra to-amber rounded-4xl p-12 text-center relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white" />
          </div>

          <div className="relative z-10">
            <h3 className="font-serif font-bold text-cream text-2xl mb-3">
              Want to Be an Uzima Angel?
            </h3>
            <p className="text-cream/80 max-w-2xl mx-auto text-sm leading-relaxed mb-6">
              Join our network of sponsors bringing transformative health, wealth, and community programs to rural regions. Make real impact while earning rewards.
            </p>

            <button className="inline-block py-3 px-8 rounded-3xl font-bold text-xs uppercase tracking-wider text-earth bg-cream hover:bg-white transition-all transform hover:scale-105 cursor-pointer">
              Become a Sponsor
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
