'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, ArrowRight, Eye, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SuccessScreenProps {
  patientId: string;
  onViewQuestion: () => void;
  onBrowseProfessionals: () => void;
  onGoToDashboard: () => void;
}

export function SuccessScreen({
  patientId,
  onViewQuestion,
  onBrowseProfessionals,
  onGoToDashboard,
}: SuccessScreenProps) {
  useEffect(() => {
    // Trigger confetti animation
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 text-center">
      {/* Success Icon */}
      <div className="relative">
        <div className="absolute inset-0 bg-teal-500/20 rounded-full blur-3xl animate-pulse" />
        <CheckCircle2 className="relative size-24 text-teal-500 animate-in zoom-in duration-500" />
      </div>

      {/* Success Message */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">
          Welcome to Stellar Uzima!
        </h1>
        <p className="text-xl text-muted-foreground">
          Your account has been created successfully
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-teal-50 dark:bg-teal-950 rounded-lg border border-teal-200 dark:border-teal-800">
          <span className="text-sm font-medium text-teal-900 dark:text-teal-100">
            Your Patient ID:
          </span>
          <span className="text-lg font-bold text-teal-600 dark:text-teal-400">
            #{patientId}
          </span>
        </div>
      </div>

      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-teal-100 dark:bg-teal-900 rounded-lg">
                <Eye className="size-5 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold mb-1">Your Question Has Been Posted</h3>
                <p className="text-sm text-muted-foreground">
                  Verified professionals will respond within 24 hours
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Users className="size-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold mb-1">Check Your Dashboard</h3>
                <p className="text-sm text-muted-foreground">
                  Track responses and manage your health questions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
        <Button
          onClick={onViewQuestion}
          className="flex-1 bg-teal-500 hover:bg-teal-600 text-white"
          size="lg"
        >
          View My Question
          <ArrowRight className="ml-2 size-4" />
        </Button>
        <Button
          onClick={onBrowseProfessionals}
          variant="outline"
          className="flex-1"
          size="lg"
        >
          Browse Professionals
        </Button>
        <Button
          onClick={onGoToDashboard}
          variant="outline"
          className="flex-1"
          size="lg"
        >
          Go to Dashboard
        </Button>
      </div>

      {/* Next Steps */}
      <div className="mt-8 p-6 bg-muted rounded-lg max-w-2xl w-full">
        <h3 className="font-semibold mb-3">What's Next?</h3>
        <ul className="text-left space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-teal-500 mt-1">•</span>
            <span>You'll receive email notifications when professionals respond</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-500 mt-1">•</span>
            <span>Complete your profile to get personalized health recommendations</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-500 mt-1">•</span>
            <span>Explore our knowledge base for health information and tips</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
