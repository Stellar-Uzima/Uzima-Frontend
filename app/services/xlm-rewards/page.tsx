import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function XLMRewardsPage() {
  const rewardCategories = [
    {
      icon: '🏃',
      title: 'Health Activities',
      description: 'Earn tokens for completing health-related tasks',
      examples: ['Daily Steps: +50 XLM', 'Sleep Tracking: +75 XLM', 'Workouts: +100 XLM']
    },
    {
      icon: '📚',
      title: 'Wealth Building',
      description: 'Get rewarded for learning financial skills',
      examples: ['Financial Course: +150 XLM', 'Goal Achievement: +200 XLM', 'Savings Milestone: +300 XLM']
    },
    {
      icon: '🤝',
      title: 'Community',
      description: 'Earn by engaging with the community',
      examples: ['Community Meetup: +100 XLM', 'Mentoring: +250 XLM', 'Event Participation: +150 XLM']
    },
    {
      icon: '🌿',
      title: 'Traditional Medicine',
      description: 'Reward for sharing ancestral knowledge',
      examples: ['Remedy Purchase: +75 XLM', 'Healer Session: +200 XLM', 'Knowledge Sharing: +100 XLM']
    },
  ]

  const redemptionOptions = [
    {
      icon: '💳',
      title: 'Mobile Wallet',
      description: 'Transfer XLM directly to your Stellar wallet',
      minAmount: '100 XLM',
      fee: 'Free'
    },
    {
      icon: '🏥',
      title: 'Health Services',
      description: 'Redeem for medical consultations and health products',
      minAmount: '500 XLM',
      fee: 'No fee'
    },
    {
      icon: '📚',
      title: 'Education',
      description: 'Access premium courses and training programs',
      minAmount: '750 XLM',
      fee: 'No fee'
    },
    {
      icon: '✈️',
      title: 'Travel',
      description: 'Book community trips and travel experiences',
      minAmount: '1000 XLM',
      fee: 'No fee'
    },
  ]

  const benefits = [
    'Instant settlement with no delays',
    'Transparent, blockchain-verified transactions',
    'No hidden fees or charges',
    'Flexible redemption options',
    'Real value backed by Stellar Network',
    'Global access to your rewards'
  ]

  const stats = [
    { number: '2M+', label: 'XLM Distributed' },
    { number: '50K+', label: 'Active Earners' },
    { number: '100K+', label: 'Tasks Completed' },
    { number: '99.9%', label: 'Uptime' },
  ]

  return (
    <>
      <Navigation />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gold/20 to-terra/20 px-20 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <div className="inline-block bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-bold mb-4">
                EARN REAL VALUE
              </div>
              <h1 className="font-serif text-5xl font-bold text-earth mb-6 text-balance">
                XLM Rewards Program
              </h1>
              <p className="text-xl text-muted max-w-2xl leading-relaxed">
                Earn Stellar Lumens (XLM) by completing health, wealth, and community activities. Transform your life while building real financial value backed by blockchain technology.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-20 py-20 bg-earth text-cream">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-serif text-5xl font-bold text-gold mb-2">{stat.number}</div>
                  <p className="text-cream/80 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reward Categories */}
        <section className="px-20 py-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl font-bold text-earth mb-12 text-center">
              How to Earn XLM
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {rewardCategories.map((category, index) => (
                <div key={index} className="bg-gradient-to-br from-cream to-cream/50 rounded-2xl p-8 border border-terra/10 hover:border-terra/30 transition-all">
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="font-bold text-2xl text-earth mb-2">{category.title}</h3>
                  <p className="text-muted mb-6">{category.description}</p>
                  <ul className="space-y-3">
                    {category.examples.map((example, i) => (
                      <li key={i} className="text-sm text-earth flex items-center gap-3">
                        <span className="inline-block w-2 h-2 bg-terra rounded-full"></span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Redemption Options */}
        <section className="px-20 py-20 bg-cream">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl font-bold text-earth mb-12 text-center">
              Redeem Your Rewards
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {redemptionOptions.map((option, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border border-terra/10 hover:border-terra/30 transition-all">
                  <div className="text-4xl mb-4">{option.icon}</div>
                  <h3 className="font-bold text-lg text-earth mb-2">{option.title}</h3>
                  <p className="text-muted text-sm mb-4">{option.description}</p>
                  <div className="bg-terra/10 rounded-lg p-3">
                    <p className="text-xs text-terra font-bold mb-1">Min: {option.minAmount}</p>
                    <p className="text-xs text-terra">Fee: {option.fee}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose XLM */}
        <section className="px-20 py-20 bg-earth text-cream">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl font-bold mb-12 text-center">
              Why XLM Rewards?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="text-2xl text-gold flex-shrink-0">✓</div>
                  <p className="text-cream text-lg">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="px-20 py-20 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-4xl font-bold text-earth mb-6">
              Secure & Transparent
            </h2>
            <p className="text-lg text-muted mb-8">
              All rewards are recorded on the Stellar blockchain, ensuring complete transparency and security. Your earnings are truly yours, with no third-party control or hidden restrictions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-cream rounded-2xl p-6 border border-terra/10">
                <div className="text-3xl mb-4">🔒</div>
                <h3 className="font-bold text-earth mb-2">Non-Custodial</h3>
                <p className="text-sm text-muted">You control your wallet and keys</p>
              </div>
              <div className="bg-cream rounded-2xl p-6 border border-terra/10">
                <div className="text-3xl mb-4">⛓️</div>
                <h3 className="font-bold text-earth mb-2">Blockchain Verified</h3>
                <p className="text-sm text-muted">All transactions recorded on ledger</p>
              </div>
              <div className="bg-cream rounded-2xl p-6 border border-terra/10">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="font-bold text-earth mb-2">Instant Settlement</h3>
                <p className="text-sm text-muted">No delays or waiting periods</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-20 py-20 bg-gradient-to-r from-terra to-gold">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="font-serif text-4xl font-bold mb-4">Start Earning Today</h2>
            <p className="text-lg mb-8 text-white/90">Join thousands of Africans earning real value through Stellar Uzima. Transform your health, wealth, and community while building financial independence.</p>
            <button className="bg-white text-earth font-bold px-8 py-4 rounded-full hover:bg-cream transition-all duration-300 hover:shadow-lg text-lg">
              Join Now
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}
