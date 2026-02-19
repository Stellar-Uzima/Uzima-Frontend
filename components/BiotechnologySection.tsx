'use client'

export default function BiotechnologySection() {
  const researchAreas = [
    {
      icon: '🧬',
      title: 'Genetic Health Mapping',
      description: 'Understand your genetic predispositions and optimize health with personalized insights from African-centered research.',
      color: 'from-sky to-sky/50',
      stats: '500K+ Genomes',
    },
    {
      icon: '🌿',
      title: 'Phytomedicine Studies',
      description: 'Validate traditional plant medicines through rigorous biotech research and unlock their full therapeutic potential.',
      color: 'from-sage to-sage/50',
      stats: '2,000+ Plants',
    },
    {
      icon: '🔬',
      title: 'Microbiome Research',
      description: 'Discover how African microbiome diversity impacts wellness and develop targeted health interventions.',
      color: 'from-terra to-terra/50',
      stats: '100K+ Samples',
    },
    {
      icon: '💊',
      title: 'Drug Development',
      description: 'Accelerate bio-innovation by combining traditional knowledge with cutting-edge biotech for new treatments.',
      color: 'from-gold to-gold/50',
      stats: '15+ Candidates',
    },
  ]

  const partnerships = [
    { name: 'African Institute of Biotech', focus: 'Gene Sequencing' },
    { name: 'Pan-African Research Network', focus: 'Clinical Trials' },
    { name: 'Heritage Bio Labs', focus: 'Plant Validation' },
    { name: 'Wellness Innovation Hub', focus: 'Health Analytics' },
  ]

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-cream/50 to-white border-t border-terra/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeUp">
          <div className="inline-block px-4 py-2 bg-sky/10 rounded-full border border-sky/20 mb-4">
            <span className="text-sm font-semibold text-sky">Biotech Innovation</span>
          </div>
          <h2 className="font-serif text-5xl font-bold text-earth mb-6 text-balance">
            Science Meets Tradition
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto text-pretty">
            Bridging ancestral wisdom with cutting-edge biotechnology to create African-centered health solutions and earn rewards for research participation.
          </p>
        </div>

        {/* Research Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {researchAreas.map((area, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-8 border border-terra/10 hover:border-terra/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`text-5xl p-3 rounded-2xl bg-gradient-to-br ${area.color} flex-shrink-0`}>
                  {area.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-2xl font-bold text-earth mb-2">
                    {area.title}
                  </h3>
                  <div className="text-sm font-semibold text-terra bg-terra/8 px-3 py-1 rounded-full w-fit">
                    {area.stats}
                  </div>
                </div>
              </div>
              <p className="text-muted text-sm leading-relaxed mb-4">
                {area.description}
              </p>
              <button className="text-terra font-semibold text-sm hover:text-terra/80 transition-colors group-hover:translate-x-1 transition-transform">
                Learn More →
              </button>
            </div>
          ))}
        </div>

        {/* How to Participate */}
        <div className="bg-white rounded-3xl p-12 border border-terra/10 mb-16 animate-fadeUp">
          <h3 className="font-serif text-3xl font-bold text-earth mb-8">
            Participate in Research & Earn
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Enroll', desc: 'Join a research study that matches your health interests' },
              { num: '02', title: 'Contribute', desc: 'Provide biosamples, health data, or lifestyle information' },
              { num: '03', title: 'Track', desc: 'Monitor your participation progress and impact on science' },
              { num: '04', title: 'Earn', desc: 'Receive XLM tokens and health insights from your contribution' },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-black text-terra/30 mb-2">{step.num}</div>
                <h4 className="font-bold text-earth mb-2">{step.title}</h4>
                <p className="text-sm text-muted">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Research Partnerships */}
        <div className="animate-fadeUp">
          <h3 className="font-serif text-3xl font-bold text-earth mb-8 text-center">
            Our Research Partners
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {partnerships.map((partner, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-terra/10 hover:border-terra/30 transition-all text-center group cursor-pointer hover:shadow-md"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🏛️</div>
                <h4 className="font-bold text-earth text-sm mb-2">{partner.name}</h4>
                <p className="text-xs text-muted">{partner.focus}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button className="bg-terra text-white px-8 py-4 rounded-full font-semibold hover:bg-terra/90 transition-colors shadow-lg hover:shadow-xl">
            Join a Research Study
          </button>
        </div>
      </div>
    </section>
  )
}
