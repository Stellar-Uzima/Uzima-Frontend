'use client';

import React, { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';

interface DailyProgressCardProps {
  completedToday: number;
  totalTasks: number;
  xlmEarned: number;
  streak: number;
}

export default function DailyProgressCard({
  completedToday,
  totalTasks,
  xlmEarned,
  streak,
}: DailyProgressCardProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // Calculate actual target progress
  // Prevent division by zero if totalTasks is 0
  const targetProgress = totalTasks > 0 ? (completedToday / totalTasks) * 100 : 0;

  useEffect(() => {
    // Animate from 0 to the actual percentage on mount
    const timeout = setTimeout(() => {
      setAnimatedProgress(targetProgress);
    }, 100);
    return () => clearTimeout(timeout);
  }, [targetProgress]);

  // Circular progress ring math
  const size = 100;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

  return (
    <div className="w-full max-w-[390px] sm:max-w-md mx-auto p-6 rounded-3xl bg-white shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col gap-6 transition-all">
      {/* Top Section: Circular Ring and Text */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">Daily Progress</h3>
          <p className="text-sm font-medium text-gray-500 mt-1">
            {completedToday} of {totalTasks} tasks completed today
          </p>
        </div>

        {/* Circular Progress Ring */}
        <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
          <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
            {/* Background Circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#F3F4F6" // gray-100
              strokeWidth={strokeWidth}
            />
            {/* Foreground Animated Circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#10B981" // emerald-500
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute flex items-center justify-center">
            <span className="text-lg font-bold text-gray-800">
              {Math.round(animatedProgress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Linear Progress Bar + Task Dots */}
      <div className="flex flex-col gap-2 mt-2">
        <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-emerald-500 transition-all duration-1000 ease-out rounded-full"
            style={{ width: `${animatedProgress}%` }}
          />
        </div>
        
        {/* Task Dots */}
        <div className="flex justify-between items-center px-1">
          {Array.from({ length: totalTasks }).map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-colors duration-500 ${
                idx < completedToday ? 'bg-emerald-500 shadow shadow-emerald-200' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-gray-100 my-2" />

      {/* Bottom Section: XLM & Streak */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* XLM Earned */}
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">XLM earned today</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-gray-900 leading-none">
              {xlmEarned.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
            </span>
            <span className="text-sm font-bold text-gray-500">XLM</span>
          </div>
        </div>

        {/* Streak Counter */}
        <div className="flex flex-col items-start sm:items-end">
          <div className="flex items-center gap-1.5 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
            <span className="text-sm font-bold text-orange-700">Streak: {streak} days</span>
          </div>
          {completedToday === totalTasks - 1 && (
            <p className="text-xs font-semibold text-orange-600 mt-2 text-center sm:text-right animate-pulse">
              Complete your streak bonus!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
