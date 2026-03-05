'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import StreakCelebrationModal from './StreakCelebrationModal';

function StreakCelebrationGateContent() {
  const params = useSearchParams();
  const streakParam = params.get('streak');
  const days = streakParam ? parseInt(streakParam, 10) : 0;
  return <StreakCelebrationModal streakDays={Number.isFinite(days) ? days : 0} />;
}

export default function StreakCelebrationGate() {
  return (
    <Suspense fallback={null}>
      <StreakCelebrationGateContent />
    </Suspense>
  );
}
