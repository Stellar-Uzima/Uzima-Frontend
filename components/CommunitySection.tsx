export default function CommunitySection() {
  const photoGradients = [
    'linear-gradient(135deg, #C05A2B 0%, #E08B2E 100%)',
    'linear-gradient(135deg, #5A7A4A 0%, #3A5A30 100%)',
    'linear-gradient(135deg, #1C3020 0%, #2C5030 100%)',
    'linear-gradient(135deg, #F0C050 0%, #E08B2E 100%)',
    'linear-gradient(135deg, #4A8CAA 0%, #2A6C8A 100%)',
  ]

  const languages = [
    'English', 'Español', 'Français', 'Português',
    'Kiswahili', 'Yorùbá', 'Igbo', 'Amharic'
  ]

  const stats = [
    { number: '150+', label: 'Countries' },
    { number: '25K+', label: 'Members' },
  ]

  return (
    <section id="community" className="bg-cream px-20 py-28">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-20 items-center">
          {/* Left - Photo collage */}
          <div>
            <div className="grid grid-cols-3 grid-rows-2 gap-3" style={{ gridTemplateRows: 'repeat(2, 180px)' }}>
              {/* Cell 1 - small */}
              <div className="rounded-4 overflow-hidden flex items-center justify-center text-6xl"
                style={{ background: photoGradients[0] }}>
                🌍
              </div>

              {/* Cell 2 - medium */}
              <div className="col-span-2 rounded-4 overflow-hidden flex items-center justify-center text-6xl"
                style={{ background: photoGradients[1] }}>
                👥
              </div>

              {/* Cell 3 - tall */}
              <div className="row-span-2 rounded-4 overflow-hidden flex items-center justify-center text-7xl"
                style={{ background: photoGradients[2] }}>
                🤝
              </div>

              {/* Cell 4 - small */}
              <div className="rounded-4 overflow-hidden flex items-center justify-center text-6xl"
                style={{ background: photoGradients[3] }}>
                🎓
              </div>

              {/* Cell 5 - small */}
              <div className="rounded-4 overflow-hidden flex items-center justify-center text-6xl"
                style={{ background: photoGradients[4] }}>
                💡
              </div>
            </div>
          </div>

          {/* Right - Text content */}
          <div>
            <div className="flex items-center gap-2 text-terra font-bold text-xs uppercase tracking-widest mb-2">
              <span>✦</span>
              <span>Global Community</span>
            </div>

            <h2 className="font-serif font-bold text-earth leading-tight mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-0.02em' }}>
              Join a Global <em className="italic text-terra">Movement</em>
            </h2>

            <p className="text-base text-muted leading-loose max-w-sm mb-8">
              Connect with thousands of members across Africa and beyond, building together toward a healthier, wealthier future.
            </p>

            {/* Language pills */}
            <div className="flex flex-wrap gap-2.5 mb-10">
              {languages.map((lang, i) => (
                <button
                  key={i}
                  className="bg-white border-1.5 border-terra/20 text-terra text-xs px-3.5 py-1.5 rounded-full font-medium transition-all hover:bg-terra hover:text-white cursor-default"
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white rounded-3.5 p-5 text-center">
                  <div className="font-serif font-bold text-terra text-2xl mb-0.5">
                    {stat.number}
                  </div>
                  <div className="text-xs text-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
