export function About() {
  return (
    <section id="about" className="bg-gradient-to-b from-[var(--cream)] to-[var(--warm-white)] py-24 px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="font-[Caveat] text-xl text-[var(--clay)] mb-2">Our Story</p>
          <h2 className="font-serif text-5xl lg:text-6xl font-black text-[var(--bark)] leading-tight">
            Transforming Healthcare Across Africa
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[var(--bark)] mb-4">Our Mission</h3>
            <p className="text-[rgba(44,26,14,0.65)] leading-relaxed mb-4 text-sm lg:text-base">
              At Stellar Uzima, we believe quality healthcare is a fundamental human right. We're building the technology infrastructure that enables healthcare providers across Africa to deliver world-class care to their communities.
            </p>
            <p className="text-[rgba(44,26,14,0.65)] leading-relaxed text-sm lg:text-base">
              From telemedicine platforms to medical records management, from training programs to community health initiatives, we're committed to closing the healthcare gap and building a healthier Africa.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-2xl font-bold text-[var(--bark)] mb-4">Our Values</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-[var(--bark)] mb-1">Accessibility</h4>
                <p className="text-xs lg:text-sm text-[rgba(44,26,14,0.55)] leading-relaxed">
                  Healthcare should be accessible to everyone, regardless of geography or income.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[var(--bark)] mb-1">Innovation</h4>
                <p className="text-xs lg:text-sm text-[rgba(44,26,14,0.55)] leading-relaxed">
                  We leverage cutting-edge technology to solve real healthcare challenges.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[var(--bark)] mb-1">Community</h4>
                <p className="text-xs lg:text-sm text-[rgba(44,26,14,0.55)] leading-relaxed">
                  We work hand-in-hand with communities to understand their needs and co-create solutions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ubuntu Philosophy */}
        <div className="bg-gradient-to-r from-[var(--clay)] to-[var(--earth)] rounded-3xl p-12 text-[var(--warm-white)]">
          <blockquote className="font-serif text-3xl font-light italic leading-relaxed mb-4">
            "Ubuntu ngumuntu ngabantu" — A person is a person through other people.
          </blockquote>
          <cite className="text-xs opacity-70 uppercase tracking-widest">
            Zulu Proverb
          </cite>
        </div>
      </div>
    </section>
  );
}
