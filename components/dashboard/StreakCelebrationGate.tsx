'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import StreakCelebrationModal from './StreakCelebrationModal';
import { ErrorBoundary } from '@/components/ErrorBoundary';

function StreakCelebrationGateContent() {
  const params = useSearchParams();
  const streakParam = params.get('streak');
  const days = streakParam ? parseInt(streakParam, 10) : 0;
  return <StreakCelebrationModal streakDays={Number.isFinite(days) ? days : 0} />;
}

export default function StreakCelebrationGate() {
  return (
    <ErrorBoundary componentName="StreakCelebration">
      <Suspense fallback={null}>
        <StreakCelebrationGateContent />
      </Suspense>
    </ErrorBoundary>
  );
}
