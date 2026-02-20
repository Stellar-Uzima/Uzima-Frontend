import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function KnowledgeSharingPage() {
  const resources = [
    {
      icon: '📚',
      title: 'Ancestral Remedies',
      description: 'Learn traditional healing practices passed down through generations',
      topics: ['Herbal medicines', 'Wellness rituals', 'Prevention practices']
    },
    {
      icon: '🌿',
      title: 'Plant Medicine',
      description: 'Discover the power of African medicinal plants',
      topics: ['Moringa benefits', 'Baobab nutrition', 'Rooibos healing']
    },
    {
      icon: '👨‍⚕️',
      title: 'Traditional Healers',
      description: 'Connect with certified practitioners in your community',
      topics: ['Find healers', 'Book consultations', 'Verified credentials']
    },
    {
      icon: '🎓',
      title: 'Educational Content',
      description: 'Access free courses on traditional medicine and wellness',
      topics: ['Video tutorials', 'Written guides', 'Interactive workshops']
    },
  ]

  const benefits = [
    {
      number: '01',
      title: 'Preserve Heritage',
      description: 'Keep ancestral knowledge alive for future generations'
    },
    {
      number: '02',
      title: 'Earn Rewards',
      description: 'Get XLM tokens for sharing and learning traditional practices'
    },
    {
      number: '03',
      title: 'Build Community',
      description: 'Connect with others interested in African wellness traditions'
    },
    {
      number: '04',
      title: 'Improve Health',
      description: 'Integrate proven traditional practices into your wellness routine'
    },
  ]

  return (
    <>
      <Navigation />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-sage/10 to-terra/10 px-20 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <div className="inline-block bg-sage/20 text-sage px-4 py-2 rounded-full text-sm font-bold mb-4">
                ANCESTRAL WISDOM
              </div>
              <h1 className="font-serif text-5xl font-bold text-earth mb-6 text-balance">
                Knowledge Sharing Platform
              </h1>
              <p className="text-xl text-muted max-w-2xl leading-relaxed">
                Unlock the power of traditional African medicine and wellness practices. Learn from certified practitioners, share ancestral knowledge, and earn XLM rewards while preserving cultural heritage.
              </p>
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="px-20 py-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl font-bold text-earth mb-12 text-center">
              Explore Knowledge Resources
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {resources.map((resource, index) => (
                <div key={index} className="bg-cream rounded-2xl p-8 border border-terra/10 hover:border-terra/30 transition-all">
                  <div className="text-5xl mb-4">{resource.icon}</div>
                  <h3 className="font-bold text-2xl text-earth mb-2">{resource.title}</h3>
                  <p className="text-muted mb-4">{resource.description}</p>
                  <ul className="space-y-2">
                    {resource.topics.map((topic, i) => (
                      <li key={i} className="text-sm text-terra flex items-center gap-2">
                        <span className="text-terra">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-20 py-20 bg-earth text-cream">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl font-bold mb-12 text-center">
              Why Participate in Knowledge Sharing?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-gold/30 transition-all">
                  <div className="text-4xl font-bold text-gold mb-3">{benefit.number}</div>
                  <h3 className="font-bold text-lg text-cream mb-2">{benefit.title}</h3>
                  <p className="text-cream/70 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-20 py-20 bg-gradient-to-r from-sage to-terra">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="font-serif text-4xl font-bold mb-4">Ready to Share Knowledge?</h2>
            <p className="text-lg mb-8 text-white/90">Join our community of knowledge sharers and traditional medicine enthusiasts. Start learning, sharing, and earning rewards today.</p>
            <button className="bg-gold text-earth font-bold px-8 py-4 rounded-full hover:bg-white transition-all duration-300 hover:shadow-lg text-lg">
              Get Started Free
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}
