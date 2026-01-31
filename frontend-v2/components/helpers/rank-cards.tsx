'use client';

import React from 'react';
import { HELPER_RANKS, RankKey } from '@/types/ubuntu-helpers';

export function RankCards() {
  const ranks = Object.entries(HELPER_RANKS) as [RankKey, typeof HELPER_RANKS[RankKey]][];

  const colorGradients = {
    green: 'from-green-400 to-green-600',
    lime: 'from-lime-400 to-lime-600',
    blue: 'from-blue-400 to-blue-600',
    yellow: 'from-yellow-400 to-yellow-600',
    purple: 'from-purple-400 to-purple-600',
    pink: 'from-pink-400 via-purple-500 to-pink-600',
  };

  const hoverShadows = {
    green: 'hover:shadow-green-500/30',
    lime: 'hover:shadow-lime-500/30',
    blue: 'hover:shadow-blue-500/30',
    yellow: 'hover:shadow-yellow-500/30',
    purple: 'hover:shadow-purple-500/50',
    pink: 'hover:shadow-pink-500/50',
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ubuntu Helper Ranks
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every contribution matters. Choose your impact level and join our community of helpers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {ranks.map(([key, rank]) => {
            const isHighTier = key === 'ANGEL' || key === 'LEGACY';
            
            return (
              <div
                key={key}
                className={`
                  bg-white rounded-xl shadow-lg overflow-hidden
                  transform transition-all duration-300 hover:scale-105
                  ${hoverShadows[rank.color]}
                  ${isHighTier ? 'ring-2 ring-purple-200' : ''}
                `}
              >
                {/* Header with Icon */}
                <div
                  className={`
                    bg-gradient-to-br ${colorGradients[rank.color]}
                    p-6 flex flex-col items-center justify-center
                    relative overflow-hidden
                  `}
                >
                  {/* Animated background for high tiers */}
                  {isHighTier && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer"></div>
                  )}
                  
                  <div className="text-6xl mb-3 relative z-10">{rank.icon}</div>
                  <h3 className="text-white font-bold text-lg text-center relative z-10">
                    {rank.name}
                  </h3>
                </div>

                {/* Body */}
                <div className="p-4">
                  {/* Amount Range */}
                  <div className="mb-4 text-center">
                    <p className="text-sm text-gray-600 mb-1">Donation Range</p>
                    <p className="text-xl font-bold text-gray-900">
                      ${rank.min} - {rank.max === Infinity ? '∞' : `$${rank.max}`}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-2 uppercase">
                      Benefits:
                    </p>
                    <ul className="space-y-1">
                      {rank.benefits.slice(0, 3).map((benefit, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-start">
                          <span className="text-green-500 mr-1 flex-shrink-0">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                      {rank.benefits.length > 3 && (
                        <li className="text-xs text-gray-500 italic">
                          +{rank.benefits.length - 3} more benefits
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="px-4 pb-4">
                  <button
                    className={`
                      w-full py-2 px-4 rounded-lg font-medium text-sm
                      transition-colors
                      bg-gradient-to-r ${colorGradients[rank.color]}
                      text-white hover:opacity-90
                    `}
                  >
                    Become {rank.name.split(' ')[1]}
                  </button>
                </div>

                {/* Special Badge for High Tiers */}
                {isHighTier && (
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full shadow-lg">
                      ⭐ VIP
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}