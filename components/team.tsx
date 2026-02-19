export function Team() {
  const teamMembers = [
    { emoji: '👨‍⚕️', name: 'Dr. Amara', role: 'Chief Medical Officer' },
    { emoji: '👩‍💼', name: 'Sarah K.', role: 'CEO & Founder' },
    { emoji: '👨‍💻', name: 'James O.', role: 'CTO' },
    { emoji: '👩‍🔬', name: 'Dr. Zainab', role: 'Lead Researcher' },
    { emoji: '👨‍🏫', name: 'David M.', role: 'Education Lead' },
    { emoji: '👩‍⚕️', name: 'Dr. Habiba', role: 'Regional Director' },
    { emoji: '👨‍💼', name: 'Marcus T.', role: 'Operations' },
    { emoji: '👩‍💻', name: 'Nina P.', role: 'Product Lead' },
  ];

  return (
    <section id="team" className="bg-[var(--cream)] py-24 px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-[Caveat] text-xl text-[var(--clay)] mb-2">Our People</p>
          <h2 className="font-serif text-5xl lg:text-6xl font-black text-[var(--bark)] leading-tight">
            Meet the Team Behind Stellar Uzima
          </h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="text-center p-6 bg-[var(--warm-white)] rounded-3xl border border-[rgba(196,98,45,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-3xl border-4 border-[rgba(196,98,45,0.2)]">
                {member.emoji}
              </div>
              <h4 className="font-semibold text-sm text-[var(--bark)] mb-0.5">
                {member.name}
              </h4>
              <p className="text-xs text-[rgba(44,26,14,0.45)]">
                {member.role}
              </p>
            </div>
          ))}
        </div>

        {/* Supported Languages Section */}
        <div className="text-center py-12">
          <h3 className="font-serif text-2xl font-bold text-[var(--bark)] mb-8">
            Multilingual Support
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              'English',
              'Swahili',
              'French',
              'Portuguese',
              'Zulu',
              'Igbo',
              'Amharic',
              'Yoruba',
              'Arabic',
              'Hausa',
              'Somali',
              'Xhosa',
            ].map((lang) => (
              <div
                key={lang}
                className="bg-[rgba(254,252,248,0.5)] border border-[rgba(196,98,45,0.2)] rounded-full px-4 py-2 text-xs font-medium text-[var(--bark)] transition-all duration-250 hover:bg-[rgba(196,98,45,0.15)] hover:border-[rgba(196,98,45,0.4)] hover:scale-105"
              >
                {lang}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
