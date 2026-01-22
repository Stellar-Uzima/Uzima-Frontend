'use client';

import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VerificationStep } from './types';

interface ProgressIndicatorProps {
  currentStep: VerificationStep;
  className?: string;
}

const STEPS = [
  { step: 1, label: 'Personal Info' },
  { step: 2, label: 'Credentials' },
  { step: 3, label: 'Contact' },
  { step: 4, label: 'Review' },
] as const;

export function ProgressIndicator({
  currentStep,
  className,
}: ProgressIndicatorProps) {
  return (
    <div className={cn('w-full', className)}>
      {/* Mobile: Simple step counter */}
      <div className="flex items-center justify-center gap-2 sm:hidden">
        <span className="text-sm font-medium text-primary">
          Step {currentStep}
        </span>
        <span className="text-sm text-muted-foreground">of 4</span>
        <span className="text-sm text-muted-foreground">—</span>
        <span className="text-sm font-medium">
          {STEPS[currentStep - 1].label}
        </span>
      </div>

      {/* Desktop: Full step indicator */}
      <nav aria-label="Progress" className="hidden sm:block">
        <ol className="flex items-center justify-between">
          {STEPS.map((step, index) => {
            const isCompleted = currentStep > step.step;
            const isCurrent = currentStep === step.step;
            const isUpcoming = currentStep < step.step;

            return (
              <li key={step.step} className="flex-1 relative">
                <div className="flex flex-col items-center gap-2">
                  {/* Step circle */}
                  <div
                    className={cn(
                      'flex size-10 items-center justify-center rounded-full border-2 transition-colors',
                      isCompleted &&
                        'border-primary bg-primary text-primary-foreground',
                      isCurrent &&
                        'border-primary bg-primary/10 text-primary',
                      isUpcoming &&
                        'border-muted-foreground/30 bg-background text-muted-foreground'
                    )}
                    aria-current={isCurrent ? 'step' : undefined}
                  >
                    {isCompleted ? (
                      <CheckIcon className="size-5" />
                    ) : (
                      <span className="text-sm font-semibold">{step.step}</span>
                    )}
                  </div>

                  {/* Step label */}
                  <span
                    className={cn(
                      'text-xs font-medium text-center',
                      isCompleted && 'text-primary',
                      isCurrent && 'text-primary',
                      isUpcoming && 'text-muted-foreground'
                    )}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connector line */}
                {index < STEPS.length - 1 && (
                  <div
                    className={cn(
                      'absolute top-5 left-[calc(50%+20px)] w-[calc(100%-40px)] h-0.5 -translate-y-1/2',
                      isCompleted ? 'bg-primary' : 'bg-muted-foreground/30'
                    )}
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Progress bar for mobile */}
      <div className="mt-3 sm:hidden">
        <div className="h-2 w-full rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
