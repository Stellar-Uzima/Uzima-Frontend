'use client'

export default function TraditionalMedicineSection() {
  const medicines = [
    {
      name: 'Moringa',
      region: 'East & West Africa',
      benefits: ['Nutritional boost', 'Energy & wellness', 'Disease prevention'],
      icon: '🌿',
      color: 'bg-sage',
    },
    {
      name: 'Baobab',
      region: 'Savanna Regions',
      benefits: ['Immune support', 'Digestive health', 'Antioxidant rich'],
      icon: '🌳',
      color: 'bg-terra',
    },
    {
      name: 'Rooibos',
      region: 'Southern Africa',
      benefits: ['Caffeine-free relaxation', 'Mineral-rich', 'Heart health'],
      icon: '☕',
      color: 'bg-amber',
    },
    {
      name: 'Shea Butter',
      region: 'West Africa',
      benefits: ['Skin healing', 'Anti-inflammatory', 'Natural moisturizer'],
      icon: '🧴',
      color: 'bg-gold',
    },
  ]

  const practitioners = [
    {
      title: 'Traditional Healers',
      description: 'Connect with certified traditional medicine practitioners in your community',
    },
    {
      title: 'Knowledge Sharing',
      description: 'Learn ancestral remedies and wellness practices passed down through generations',
    },
    {
      title: 'Quality Standards',
      description: 'All herbs and remedies verified for safety and authenticity',
    },
    {
      title: 'Integration',
      description: 'Blend traditional wisdom with modern wellness for holistic health',
    },
  ]

  return (
    <section className="py-20 px-20 bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-block bg-sage/10 text-sage px-4 py-2 rounded-full text-sm font-bold mb-4">
            ANCESTRAL WISDOM
          </div>
          <h2 className="font-serif text-5xl font-bold text-earth mb-6 text-balance">
            Local Traditional Medicine
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Reconnect with time-tested healing practices from African traditions. Earn rewards while supporting local healers and preserving ancestral knowledge for future generations.
          </p>
        </div>

        {/* Traditional Medicines Grid */}
        <div className="mb-20">
          <h3 className="font-bold text-2xl text-earth mb-8">Powerful Medicinal Plants</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {medicines.map((medicine) => (
              <div
                key={medicine.name}
                className="rounded-3xl p-6 bg-white border-2 border-cream hover:border-terra transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <div className={`w-16 h-16 rounded-2xl ${medicine.color} flex items-center justify-center text-3xl mb-4 mx-auto`}>
                  {medicine.icon}
                </div>
                <h4 className="font-bold text-lg text-earth text-center mb-2">
                  {medicine.name}
                </h4>
                <p className="text-xs text-muted text-center mb-4 font-medium">
                  {medicine.region}
                </p>
                <ul className="space-y-2">
                  {medicine.benefits.map((benefit) => (
                    <li key={benefit} className="text-sm text-earth flex items-start gap-2">
                      <span className="text-terra mt-1">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h3 className="font-bold text-2xl text-earth mb-8">How Traditional Medicine Works on Stellar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {practitioners.map((item, index) => (
              <div
                key={item.title}
                className="flex gap-6 p-6 rounded-2xl bg-white hover:bg-white/80 transition-all duration-300 border border-cream"
                style={{ animation: `fadeUp 0.6s ease-out ${0.1 * (index + 1)}s forwards`, opacity: 0 }}
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-terra/10">
                    <span className="text-terra font-bold text-lg">{index + 1}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-earth mb-2">{item.title}</h4>
                  <p className="text-muted text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-earth to-terra rounded-3xl px-8 py-12 text-center text-white">
          <h3 className="font-serif text-3xl font-bold mb-3">Support Traditional Medicine</h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Buy from verified traditional medicine vendors and practitioners. Earn XLM tokens while supporting African health heritage.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-gold text-earth font-bold px-8 py-3 rounded-full hover:bg-white transition-all duration-300 hover:shadow-lg">
              Explore Remedies
            </button>
            <button className="border-2 border-gold text-gold font-bold px-8 py-3 rounded-full hover:bg-gold hover:text-earth transition-all duration-300">
              Become a Healer
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
