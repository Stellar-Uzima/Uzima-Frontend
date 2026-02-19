export default function EarnSection() {
  const tasks = [
    { icon: '🏃', name: 'Daily Steps', cat: 'Health', reward: '+50 XLM' },
    { icon: '💤', name: 'Sleep Tracking', cat: 'Health', reward: '+75 XLM' },
    { icon: '📚', name: 'Financial Course', cat: 'Wealth', reward: '+150 XLM' },
    { icon: '🤝', name: 'Community Meetup', cat: 'Community', reward: '+100 XLM' },
    { icon: '💪', name: 'Workout Session', cat: 'Health', reward: '+100 XLM' },
    { icon: '🎯', name: 'Goal Achievement', cat: 'Wealth', reward: '+200 XLM' },
  ]

  return (
    <section id="earn" className="bg-cream px-20 py-28">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-20 items-center">
          {/* Left - Text content */}
          <div>
            <div className="flex items-center gap-2 text-terra font-bold text-xs uppercase tracking-widest mb-2">
              <span>✦</span>
              <span>Earn Rewards</span>
            </div>

            <h2 className="font-serif font-bold text-earth leading-tight mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-0.02em' }}>
              Earn While You <em className="italic text-terra">Improve</em>
            </h2>

            <p className="text-base text-muted leading-loose max-w-sm mb-8">
              Complete daily tasks across health, wealth, and community categories to earn real XLM tokens.
            </p>

            {/* Task list */}
            <div className="flex flex-col gap-3.5">
              {tasks.map((task, i) => (
                <div
                  key={i}
                  className="bg-white rounded-4xl p-4.5 flex items-center gap-4 border border-terra/8 transition-all hover:border-terra hover:translate-x-1 hover:shadow-md cursor-pointer"
                >
                  <div className="w-11 h-11 bg-terra/8 rounded-3 flex items-center justify-center flex-shrink-0 text-2xl">
                    {task.icon}
                  </div>

                  <div className="flex-1">
                    <div className="font-semibold text-earth text-sm">
                      {task.name}
                    </div>
                    <div className="text-xs text-muted">
                      {task.cat}
                    </div>
                  </div>

                  <div className="font-bold text-terra text-sm bg-terra/10 px-3 py-1.5 rounded-full whitespace-nowrap">
                    {task.reward}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Earnings card */}
          <div>
            <div className="bg-earth rounded-6 p-8 text-cream relative overflow-hidden"
              style={{
                backgroundImage: 'radial-gradient(circle at right top, rgba(240,192,80,0.2) -50px, transparent 300px)',
              }}>
              {/* Card content */}
              <div className="relative z-10">
                <div className="text-xs uppercase tracking-widest opacity-60 mb-1">
                  Your Earnings
                </div>

                <div className="font-serif font-bold text-gold text-5xl leading-none mb-1">
                  8,750
                </div>

                <div className="text-xs text-cream/60 mb-6">
                  XLM tokens earned this month
                </div>

                {/* Earning breakdown */}
                <div className="flex flex-col gap-2.5">
                  {[
                    { label: 'Health Tasks', value: '3,200 XLM' },
                    { label: 'Wealth Learning', value: '2,850 XLM' },
                    { label: 'Community', value: '2,700 XLM' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-sm p-2 bg-white/6 rounded-2.5">
                      <span className="opacity-80">{item.label}</span>
                      <span className="text-gold font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
