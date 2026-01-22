"use client";

import { Heart, DollarSign, Users } from "lucide-react";

interface ImpactStat {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface StoryHeroProps {
  livesImpacted: number;
  totalDonated: number;
  totalHelpers: number;
}

export function StoryHero({
  livesImpacted,
  totalDonated,
  totalHelpers,
}: StoryHeroProps) {
  const stats: ImpactStat[] = [
    {
      icon: <Heart className="w-6 h-6" />,
      value: livesImpacted.toLocaleString(),
      label: "lives impacted",
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      value: `$${totalDonated.toLocaleString()}`,
      label: "donated",
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: totalHelpers.toString(),
      label: "helpers",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[oklch(0.97_0.01_175)] to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[oklch(0.25_0.03_250)] mb-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
          Ubuntu in Action:{" "}
          <span className="text-[oklch(0.65_0.15_175)]">Lives Changed</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
          Discover the incredible impact our community has made across Africa.
          Every donation, every helper, every moment of compassion creates
          ripples of change.
        </p>

        {/* Impact Stats */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex items-center gap-3 group">
              <div className="p-3 rounded-full bg-[oklch(0.65_0.15_175)]/10 text-[oklch(0.65_0.15_175)] transition-all duration-300 group-hover:bg-[oklch(0.65_0.15_175)] group-hover:text-white">
                {stat.icon}
              </div>
              <div className="text-left">
                <p className="text-2xl md:text-3xl font-bold text-[oklch(0.25_0.03_250)]">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
              {/* Divider - only show between items, not after last */}
              {index < stats.length - 1 && (
                <div className="hidden sm:block w-px h-12 bg-border ml-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
