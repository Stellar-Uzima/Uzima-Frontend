'use client';

import React, { useEffect, useState } from 'react';
import { ImpactStats } from '@/types/ubuntu-helpers';

interface ImpactDashboardProps {
  stats: ImpactStats;
}

export function ImpactDashboard({ stats }: ImpactDashboardProps) {
  const [animatedStats, setAnimatedStats] = useState({
    totalRaised: 0,
    helpersCount: 0,
    communitiesHelped: 0,
    livesImpacted: 0,
  });

  // Animate numbers on mount
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedStats({
        totalRaised: Math.floor(stats.totalRaised * progress),
        helpersCount: Math.floor(stats.helpersCount * progress),
        communitiesHelped: Math.floor(stats.communitiesHelped * progress),
        livesImpacted: Math.floor(stats.livesImpacted * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(stats);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [stats]);

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  const statCards = [
    {
      icon: '💰',
      label: 'Total Raised',
      value: `$${formatNumber(animatedStats.totalRaised)}`,
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
    },
    {
      icon: '🤝',
      label: 'Ubuntu Helpers',
      value: formatNumber(animatedStats.helpersCount),
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      icon: '🏘️',
      label: 'Communities Helped',
      value: formatNumber(animatedStats.communitiesHelped),
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
    },
    {
      icon: '❤️',
      label: 'Lives Impacted',
      value: formatNumber(animatedStats.livesImpacted),
      color: 'from-pink-400 to-pink-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-700',
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Collective Impact
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Together, we're transforming healthcare access for underserved communities
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <div
              key={stat.label}
              className={`
                ${stat.bgColor}
                rounded-xl p-6 
                transform transition-all duration-300 hover:scale-105
                shadow-lg hover:shadow-xl
                animate-fade-in
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="text-5xl mb-4 text-center">{stat.icon}</div>

              {/* Value */}
              <div className="text-center mb-2">
                <p className={`text-4xl md:text-5xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </p>
              </div>

              {/* Label */}
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>

              {/* Gradient Bar */}
              <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${stat.color} animate-slide-in`}
                  style={{ animationDelay: `${index * 100 + 500}ms` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Every Donation Makes a Difference
              </h3>
              <p className="text-gray-600">
                Your contribution provides healthcare access to those who need it most
              </p>
            </div>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg whitespace-nowrap">
              Join the Movement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add these to your global CSS:
/*
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
  opacity: 0;
}

.animate-slide-in {
  animation: slide-in 1s ease-out forwards;
  width: 0;
}
*/