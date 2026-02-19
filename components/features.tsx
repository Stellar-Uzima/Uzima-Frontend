export function Features() {
  const features = [
    {
      icon: '🏥',
      title: 'Digital Health Records',
      description: 'Secure, accessible medical records for every patient across the continent.',
    },
    {
      icon: '📞',
      title: 'Telemedicine Platform',
      description: 'Connect patients with specialists, regardless of physical location.',
    },
    {
      icon: '🧬',
      title: 'AI-Powered Diagnostics',
      description: 'Advanced AI tools helping doctors make better clinical decisions faster.',
    },
    {
      icon: '📊',
      title: 'Real-Time Analytics',
      description: 'Data-driven insights to improve health outcomes and resource allocation.',
    },
    {
      icon: '👨‍🎓',
      title: 'Medical Training',
      description: 'Continuous education and certification for healthcare professionals.',
    },
    {
      icon: '🌍',
      title: 'Community Health',
      description: 'Programs that bring preventive care and wellness to remote areas.',
    },
  ];

  return (
    <section id="features" className="py-24 px-8 lg:px-16 bg-[var(--warm-white)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-[Caveat] text-xl text-[var(--clay)] mb-2">What We Offer</p>
          <h2 className="font-serif text-5xl lg:text-6xl font-black text-[var(--bark)] leading-tight">
            Comprehensive Healthcare Solutions
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-8 border border-[rgba(44,26,14,0.08)] transition-all duration-300 bg-[var(--warm-white)] hover:-translate-y-1 hover:shadow-xl hover:border-[var(--clay)]"
              style={{
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--clay)] to-[var(--ochre)] origin-left scale-x-0 transition-transform duration-300 hover:scale-x-100"
                style={{ transformOrigin: 'left' }}
              ></div>

              <div className="w-12 h-12 rounded-2xl bg-[rgba(196,98,45,0.08)] flex items-center justify-center text-2xl mb-4">
                {feature.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-[var(--bark)] mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-[rgba(44,26,14,0.55)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
