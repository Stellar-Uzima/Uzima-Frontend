import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function ConsultationsPage() {
  const consultationTypes = [
    {
      icon: '🏥',
      title: 'Health Consultations',
      description: 'Expert guidance on health, wellness, and traditional remedies',
      price: '100-500 XLM',
      benefits: ['Personalized health plan', 'Remedy recommendations', 'Follow-up support']
    },
    {
      icon: '💰',
      title: 'Wealth Building',
      description: 'Learn financial literacy and income generation strategies',
      price: '150-600 XLM',
      benefits: ['Budget planning', 'Investment guidance', 'Business mentoring']
    },
    {
      icon: '🤝',
      title: 'Community Support',
      description: 'Connect with community leaders and mentors',
      price: '75-300 XLM',
      benefits: ['Networking', 'Group sessions', 'Peer mentoring']
    },
    {
      icon: '📱',
      title: 'Digital Skills',
      description: 'Learn blockchain, technology, and digital tools',
      price: '200-800 XLM',
      benefits: ['1-on-1 coaching', 'Practical training', 'Certification']
    },
  ]

  const steps = [
    {
      number: '01',
      title: 'Browse Experts',
      description: 'Explore verified consultants in your area of interest'
    },
    {
      number: '02',
      title: 'Schedule Session',
      description: 'Book a convenient time for your consultation'
    },
    {
      number: '03',
      title: 'Receive Guidance',
      description: 'Get expert advice tailored to your needs'
    },
    {
      number: '04',
      title: 'Earn Rewards',
      description: 'Share feedback and earn additional XLM tokens'
    },
  ]

  const experts = [
    {
      name: 'Dr. Amara Okafor',
      specialty: 'Traditional Medicine',
      rating: 4.9,
      sessions: 342,
      image: '👩‍⚕️'
    },
    {
      name: 'Kwame Mensah',
      specialty: 'Financial Literacy',
      rating: 4.8,
      sessions: 289,
      image: '👨‍💼'
    },
    {
      name: 'Zara Hassan',
      specialty: 'Community Building',
      rating: 4.9,
      sessions: 215,
      image: '👩‍🏫'
    },
    {
      name: 'David Kipchoge',
      specialty: 'Tech & Blockchain',
      rating: 4.7,
      sessions: 178,
      image: '👨‍💻'
    },
  ]

  return (
    <>
      <Navigation />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-terra/10 to-sage/10 px-20 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <div className="inline-block bg-terra/20 text-terra px-4 py-2 rounded-full text-sm font-bold mb-4">
                EXPERT GUIDANCE
              </div>
              <h1 className="font-serif text-5xl font-bold text-earth mb-6 text-balance">
                Professional Consultations
              </h1>
              <p className="text-xl text-muted max-w-2xl leading-relaxed">
                Connect with certified experts and mentors across health, wealth, community, and digital skills. Receive personalized guidance and earn rewards for your participation.
              </p>
            </div>
          </div>
        </section>

        {/* Consultation Types */}
        <section className="px-20 py-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl font-bold text-earth mb-12 text-center">
              Consultation Types
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {consultationTypes.map((type, index) => (
                <div key={index} className="bg-cream rounded-2xl p-8 border border-terra/10 hover:border-terra/30 transition-all">
                  <div className="text-5xl mb-4">{type.icon}</div>
                  <h3 className="font-bold text-2xl text-earth mb-2">{type.title}</h3>
                  <p className="text-muted mb-4">{type.description}</p>
                  <div className="bg-terra/10 text-terra font-bold px-4 py-2 rounded-lg inline-block mb-4">
                    {type.price}
                  </div>
                  <ul className="space-y-2">
                    {type.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm text-earth flex items-center gap-2">
                        <span className="text-terra">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Experts */}
        <section className="px-20 py-20 bg-earth text-cream">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl font-bold mb-12 text-center">
              Featured Experts
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {experts.map((expert, index) => (
                <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-gold/30 transition-all text-center">
                  <div className="text-6xl mb-4">{expert.image}</div>
                  <h3 className="font-bold text-lg text-cream mb-2">{expert.name}</h3>
                  <p className="text-gold text-sm mb-4">{expert.specialty}</p>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-gold">★</span>
                    <span className="text-cream font-bold">{expert.rating}</span>
                    <span className="text-cream/60 text-sm">({expert.sessions} sessions)</span>
                  </div>
                  <button className="w-full bg-terra text-white font-bold py-2 rounded-lg hover:bg-gold hover:text-earth transition-all">
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-20 py-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl font-bold text-earth mb-12 text-center">
              How Consultations Work
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl font-bold text-terra mb-4">{step.number}</div>
                  <h3 className="font-bold text-xl text-earth mb-2">{step.title}</h3>
                  <p className="text-muted text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-20 py-20 bg-gradient-to-r from-sage to-terra">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="font-serif text-4xl font-bold mb-4">Schedule Your First Consultation</h2>
            <p className="text-lg mb-8 text-white/90">Get expert guidance tailored to your health, wealth, and community goals. Book a consultation with a certified expert today.</p>
            <button className="bg-gold text-earth font-bold px-8 py-4 rounded-full hover:bg-white transition-all duration-300 hover:shadow-lg text-lg">
              Browse Consultants
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}
