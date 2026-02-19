export default function StoriesSection() {
  const stories = [
    {
      quote: 'Stellar Uzima changed my life. I lost 15kg, saved ₦200K, and made lifelong friends.',
      author: 'Amara K.',
      role: 'Health & Wealth Member',
      gradient: 'linear-gradient(135deg, #E08B2E 0%, #F0C050 100%)',
    },
    {
      quote: 'The blockchain rewards make me feel secure about my earnings. Finally, financial freedom.',
      author: 'David O.',
      role: 'Premium Member',
      gradient: 'linear-gradient(135deg, #B84E20 0%, #E08B2E 100%)',
    },
    {
      quote: 'A platform built for Africans, by Africans. This is the future of wellness and wealth.',
      author: 'Zara M.',
      role: 'Community Leader',
      gradient: 'linear-gradient(135deg, #5A7A4A 0%, #4A8CAA 100%)',
    },
  ]

  return (
    <section className="bg-gradient-to-b from-cream via-amber/5 to-cream px-20 py-28">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-terra font-bold text-xs uppercase tracking-widest mb-2">
            <span>✦</span>
            <span>Member Stories</span>
          </div>

          <h2 className="font-serif font-bold text-earth leading-tight mb-4 inline-block"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-0.02em' }}>
            Real Stories, Real <em className="italic text-terra">Impact</em>
          </h2>
        </div>

        {/* Story cards grid */}
        <div className="grid grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <div
              key={i}
              className="bg-white rounded-5 p-8 shadow-sm hover:shadow-xl transition-all hover:translate-y-minus-2 cursor-default relative overflow-hidden"
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5"
                style={{ background: story.gradient }}
              />

              {/* Quote icon */}
              <div className="text-5xl text-terra/20 mb-4">
                "
              </div>

              {/* Quote */}
              <p className="text-earth leading-relaxed mb-6 text-sm font-medium">
                {story.quote}
              </p>

              {/* Author */}
              <div className="border-t border-earth/10 pt-4">
                <div className="font-bold text-earth text-sm">
                  {story.author}
                </div>
                <div className="text-xs text-muted">
                  {story.role}
                </div>
              </div>

              {/* Stars */}
              <div className="mt-4 flex gap-1">
                {'⭐⭐⭐⭐⭐'.split('').map((star, j) => (
                  <span key={j}>{star}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
