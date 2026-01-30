'use client';

import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingStepperProps {
  currentStep: number;
  className?: string;
}

const STEPS = [
  { step: 1, label: 'Create Account' },
  { step: 2, label: 'Health Profile' },
  { step: 3, label: 'Ask Question' },
  { step: 4, label: 'Review & Submit' },
] as const;

export function OnboardingStepper({
  currentStep,
  className,
}: OnboardingStepperProps) {
  const progressPercentage = (currentStep / 4) * 100;

  return (
    <div className={cn('w-full', className)}>
      {/* Mobile: Compact stepper with numbers only */}
      <div className="flex items-center justify-center gap-2 sm:hidden mb-4">
        {STEPS.map((step) => {
          const isCompleted = currentStep > step.step;
          const isCurrent = currentStep === step.step;
          
          return (
            <div key={step.step} className="flex items-center gap-2">
              <div
                className={cn(
                  'flex size-8 items-center justify-center rounded-full border-2 transition-colors',
                  isCompleted &&
                    'border-teal-500 bg-teal-500 text-white',
                  isCurrent &&
                    'border-teal-500 bg-teal-500/10 text-teal-600 font-bold',
                  !isCompleted && !isCurrent &&
                    'border-gray-300 bg-background text-gray-400'
                )}
              >
                {isCompleted ? (
                  <CheckIcon className="size-4" />
                ) : (
                  <span className="text-xs font-semibold">{step.step}</span>
                )}
              </div>
              {step.step < STEPS.length && (
                <div
                  className={cn(
                    'w-8 h-0.5',
                    isCompleted ? 'bg-teal-500' : 'bg-gray-300'
                  )}
                />
              )}
            </div>
          );
        })}
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
                        'border-teal-500 bg-teal-500 text-white',
                      isCurrent &&
                        'border-teal-500 bg-teal-500/10 text-teal-600 font-bold',
                      isUpcoming &&
                        'border-gray-300 bg-background text-gray-400'
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
                      isCompleted && 'text-teal-600',
                      isCurrent && 'text-teal-600 font-bold',
                      isUpcoming && 'text-gray-400'
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
                      isCompleted ? 'bg-teal-500' : 'bg-gray-300'
                    )}
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-teal-500 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
            role="progressbar"
            aria-valuenow={currentStep}
            aria-valuemin={1}
            aria-valuemax={4}
            aria-label={`Step ${currentStep} of 4`}
          />
        </div>
        <div className="mt-2 text-center text-sm text-gray-600">
          {progressPercentage}% Complete
        </div>
      </div>
    </div>
  );
}
