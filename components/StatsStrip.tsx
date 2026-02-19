export default function StatsStrip() {
  const stats = [
    { number: '25K+', label: 'Active Members' },
    { number: '₦50M+', label: 'Earned Collectively' },
    { number: '150+', label: 'Tasks Available' },
    { number: '98%', label: 'Completion Rate' },
  ]

  return (
    <section className="bg-earth py-16 px-20 flex justify-around items-center flex-wrap gap-8">
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <div className="font-serif font-bold text-gold text-4xl leading-none block mb-1">
            {stat.number}
          </div>
          <div className="text-xs text-cream/60 uppercase tracking-widest">
            {stat.label}
          </div>
        </div>
      ))}
    </section>
  )
}
