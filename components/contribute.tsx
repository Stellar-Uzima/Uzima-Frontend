export function Contribute() {
  const steps = [
    {
      num: '1',
      title: 'Explore',
      description: 'Check out our GitHub repository and understand our technology stack.',
    },
    {
      num: '2',
      title: 'Understand',
      description: 'Review our documentation and contribution guidelines in detail.',
    },
    {
      num: '3',
      title: 'Develop',
      description: 'Create a feature branch and implement your contribution.',
    },
    {
      num: '4',
      title: 'Test',
      description: 'Write tests and ensure all existing tests pass.',
    },
    {
      num: '5',
      title: 'Submit',
      description: 'Create a pull request with a clear description of your changes.',
    },
    {
      num: '6',
      title: 'Review',
      description: 'Work with our team to refine and merge your contribution.',
    },
  ];

  const ways = [
    { icon: '💻', title: 'Code', description: 'Contribute features and bug fixes' },
    { icon: '📖', title: 'Documentation', description: 'Improve guides and tutorials' },
    { icon: '🎨', title: 'Design', description: 'Help with UX and UI improvements' },
    { icon: '🌍', title: 'Translation', description: 'Localize for different regions' },
  ];

  return (
    <section id="contribute" className="py-24 px-8 lg:px-16 bg-[var(--warm-white)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-[Caveat] text-xl text-[var(--clay)] mb-2">Get Involved</p>
          <h2 className="font-serif text-5xl lg:text-6xl font-black text-[var(--bark)] leading-tight">
            Contribute to Our Mission
          </h2>
        </div>

        {/* Steps */}
        <div className="mb-20">
          <h3 className="font-serif text-2xl font-bold text-[var(--bark)] mb-8 text-center">
            How to Contribute
          </h3>
          <div className="space-y-3 max-w-2xl mx-auto">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex gap-4 items-start p-4 border border-[rgba(44,26,14,0.08)] rounded-2xl transition-all duration-300 hover:border-[var(--clay)] hover:bg-[rgba(196,98,45,0.03)] hover:translate-x-1"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--clay)] to-[var(--ochre)] text-[var(--warm-white)] flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {step.num}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-[var(--bark)] mb-1">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[rgba(44,26,14,0.55)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Block */}
        <div className="bg-[var(--bark)] rounded-2xl p-6 mb-20 font-mono text-xs text-[rgba(254,252,248,0.85)] leading-relaxed overflow-x-auto">
          <div className="text-[rgba(254,252,248,0.35)]"># Clone the repository</div>
          <div className="text-[var(--ochre)]">$ git clone</div>
          <div>https://github.com/stellar-uzima/healthcare.git</div>
          <div className="text-[rgba(254,252,248,0.35)] mt-2"># Install dependencies</div>
          <div className="text-[var(--ochre)]">$ npm install</div>
          <div className="text-[rgba(254,252,248,0.35)] mt-2"># Create your feature branch</div>
          <div className="text-[var(--ochre)]">$ git checkout -b feature/amazing-feature</div>
          <div className="text-[rgba(254,252,248,0.35)] mt-2"># Commit your changes</div>
          <div className="text-[var(--ochre)]">$ git commit -m</div>
          <div className="text-[#9BD8A0]">'Add amazing feature'</div>
        </div>

        {/* Ways to Contribute */}
        <div>
          <h3 className="font-serif text-2xl font-bold text-[var(--bark)] mb-8 text-center">
            Ways to Contribute
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ways.map((way, idx) => (
              <div
                key={idx}
                className="text-center p-6 border border-[rgba(44,26,14,0.08)] rounded-2xl transition-all duration-300 hover:bg-[var(--cream)] hover:border-[rgba(196,98,45,0.2)] hover:-translate-y-0.5"
              >
                <div className="text-3xl mb-2">{way.icon}</div>
                <h4 className="font-semibold text-sm text-[var(--bark)] mb-1">
                  {way.title}
                </h4>
                <p className="text-xs text-[rgba(44,26,14,0.45)]">
                  {way.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
