'use client';

import React from 'react';
import { HELPER_RANKS, RankKey } from '@/types/ubuntu-helpers';

interface RankBadgeProps {
  rank: RankKey;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  animated?: boolean;
}

export function RankBadge({
  rank,
  size = 'md',
  showName = true,
  animated = false,
}: RankBadgeProps) {
  const rankInfo = HELPER_RANKS[rank];

  const sizeClasses = {
    sm: 'w-12 h-12 text-xl',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-24 h-24 text-4xl',
  };

  const colorClasses = {
    green: 'bg-gradient-to-br from-green-400 to-green-600 shadow-green-500/30',
    lime: 'bg-gradient-to-br from-lime-400 to-lime-600 shadow-lime-500/30',
    blue: 'bg-gradient-to-br from-blue-400 to-blue-600 shadow-blue-500/30',
    yellow: 'bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-yellow-500/30',
    purple: 'bg-gradient-to-br from-purple-400 to-purple-600 shadow-purple-500/50',
    pink: 'bg-gradient-to-br from-pink-400 via-purple-500 to-pink-600 shadow-pink-500/50',
  };

  const isHighTier = rank === 'ANGEL' || rank === 'LEGACY';

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`
          ${sizeClasses[size]}
          ${colorClasses[rankInfo.color]}
          rounded-full
          flex items-center justify-center
          shadow-lg
          ${animated ? 'animate-pulse' : ''}
          ${isHighTier ? 'ring-2 ring-white ring-opacity-50' : ''}
          relative
          overflow-hidden
        `}
      >
        {/* Animated background for high tiers */}
        {isHighTier && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer"></div>
        )}
        
        <span className="relative z-10">{rankInfo.icon}</span>
      </div>
      
      {showName && (
        <span className="text-sm font-medium text-gray-700">{rankInfo.name}</span>
      )}
    </div>
  );
}

// Add to your global CSS for shimmer animation:
// @keyframes shimmer {
//   0% { transform: translateX(-100%); }
//   100% { transform: translateX(100%); }
// }
// .animate-shimmer {
//   animation: shimmer 2s infinite;
// }