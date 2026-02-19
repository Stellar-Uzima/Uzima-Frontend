export default function HowItWorks() {
  const steps = [
    { number: '01', title: 'Sign Up', description: 'Create your account in minutes and connect your health devices.' },
    { number: '02', title: 'Complete Tasks', description: 'Engage in health, wealth, and community activities.' },
    { number: '03', title: 'Earn Rewards', description: 'Get XLM tokens for every completed task and activity.' },
    { number: '04', title: 'Transform Life', description: 'Use rewards to unlock opportunities and improve your life.' },
  ]

  return (
    <section id="how" className="bg-white px-20 py-28">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-2 text-terra font-bold text-xs uppercase tracking-widest mb-2">
          <span>✦</span>
          <span>How It Works</span>
        </div>

        <h2 className="font-serif font-bold text-earth leading-tight mb-4"
          style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-0.02em' }}>
          Four Steps to <em className="italic text-terra">Transform</em>
        </h2>

        <p className="text-base text-muted leading-loose max-w-sm mb-14">
          Get started in minutes and begin your journey toward better health, wealth, and community impact.
        </p>

        {/* Steps grid */}
        <div className="grid grid-cols-4 gap-6 relative">
          {/* Decorative gradient line */}
          <div className="absolute top-19 left-1/2 right-0 h-0.5 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, #B84E20, #E08B2E, #F0C050, #5A7A4A)',
              marginLeft: '6%',
              marginRight: '12%',
            }}
          />

          {steps.map((step, i) => (
            <div key={i} className="text-center">
              {/* Number circle */}
              <div className="w-19 h-19 rounded-full bg-white border-4 border-terra flex items-center justify-center mx-auto mb-5 text-2xl font-bold font-serif text-terra transition-all hover:bg-terra hover:text-white cursor-default">
                {step.number}
              </div>

              {/* Title */}
              <h3 className="font-bold text-earth mb-1 text-base">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted leading-loose">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
