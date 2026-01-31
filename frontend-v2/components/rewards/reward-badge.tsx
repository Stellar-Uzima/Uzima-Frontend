'use client';

import React from 'react';

interface RewardBadgeProps {
  amount: number;
  status: 'pending' | 'approved' | 'distributed' | 'failed';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function RewardBadge({
  amount,
  status,
  size = 'md',
  showIcon = true,
}: RewardBadgeProps) {
  const formatXLM = (xlm: number) => {
    return `${xlm.toFixed(2)} XLM`;
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const statusConfig = {
    pending: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-300',
      icon: '⏳',
      label: 'Pending',
    },
    approved: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      border: 'border-blue-300',
      icon: '✓',
      label: 'Approved',
    },
    distributed: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-300',
      icon: '✅',
      label: 'Distributed',
    },
    failed: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-300',
      icon: '✗',
      label: 'Failed',
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]} font-medium`}
    >
      {showIcon && <span>{config.icon}</span>}
      <span>{formatXLM(amount)}</span>
      <span className="opacity-70">• {config.label}</span>
    </div>
  );
}