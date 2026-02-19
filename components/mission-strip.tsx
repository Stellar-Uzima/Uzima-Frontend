'use client';

export function MissionStrip() {
  const messages = [
    'Quality Healthcare for All',
    'Innovation in Medicine',
    'Africa First',
    'Community Driven',
    'Technology Empowered',
    'Quality Healthcare for All',
    'Innovation in Medicine',
    'Africa First',
    'Community Driven',
    'Technology Empowered',
  ];

  return (
    <div className="bg-[var(--bark)] py-4 px-16 flex overflow-hidden">
      <div className="flex gap-12 items-center whitespace-nowrap" style={{ animation: 'marquee 20s linear infinite' }}>
        {messages.map((msg, idx) => (
          <span key={idx} className="text-sm text-[rgba(254,252,248,0.7)] tracking-widest uppercase flex items-center gap-2">
            ✦
            {msg}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
