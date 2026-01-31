'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from '@/src/routing';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save, AlertTriangle } from 'lucide-react';
import 'react-phone-input-2/lib/style.css';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { OnboardingStepper } from '@/components/patient/onboarding-stepper';
import { CreateAccountStep } from '@/components/patient/steps/create-account-step';
import { HealthProfileStep } from '@/components/patient/steps/health-profile-step';
import { FirstQuestionStep } from '@/components/patient/steps/first-question-step';
import { ReviewStep } from '@/components/patient/steps/review-step';
import { SuccessScreen } from '@/components/patient/success-screen';
import {
  createAccountSchema,
  healthProfileSchema,
  firstQuestionSchema,
  reviewSchema,
  patientOnboardingSchema,
  type PatientOnboardingFormData,
} from '@/lib/schemas/patient-onboarding';
import {
  saveOnboardingData,
  loadOnboardingData,
  clearOnboardingData,
  hasUnsavedData,
} from '@/lib/utils/onboarding-storage';

const STEPS = [
  { number: 1, schema: createAccountSchema, label: 'Create Account' },
  { number: 2, schema: healthProfileSchema, label: 'Health Profile' },
  { number: 3, schema: firstQuestionSchema, label: 'Ask Question' },
  { number: 4, schema: reviewSchema, label: 'Review & Submit' },
] as const;

export default function PatientOnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);

  const form = useForm<PatientOnboardingFormData>({
    resolver: zodResolver(patientOnboardingSchema),
    mode: 'onChange',
    defaultValues: {
      account: {
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        dateOfBirth: undefined as any,
        phone: '',
      },
      healthProfile: {
        gender: undefined as any,
        bloodType: undefined as any,
        allergies: [],
        medications: [],
        conditions: [],
        emergencyContact: {
          name: '',
          phone: '',
          relationship: '',
        },
      },
      firstQuestion: {
        category: '',
        title: '',
        description: '',
        images: [],
        urgency: undefined as any,
        isPrivate: false,
      },
      privacyPolicyAccepted: false,
    },
  });

  // Load saved data on mount
  useEffect(() => {
    const { data, currentStep: savedStep } = loadOnboardingData();
    if (data) {
      // Ensure all string fields have default values (not undefined)
      const normalizedData = {
        account: {
          email: data.account?.email || '',
          password: data.account?.password || '',
          confirmPassword: data.account?.confirmPassword || '',
          fullName: data.account?.fullName || '',
          dateOfBirth: data.account?.dateOfBirth
            ? data.account.dateOfBirth instanceof Date
              ? data.account.dateOfBirth
              : new Date(data.account.dateOfBirth)
            : undefined,
          phone: data.account?.phone || '',
        },
        healthProfile: {
          gender: data.healthProfile?.gender || undefined,
          bloodType: data.healthProfile?.bloodType || undefined,
          allergies: data.healthProfile?.allergies || [],
          medications: data.healthProfile?.medications || [],
          conditions: data.healthProfile?.conditions || [],
          emergencyContact: {
            name: data.healthProfile?.emergencyContact?.name || '',
            phone: data.healthProfile?.emergencyContact?.phone || '',
            relationship: data.healthProfile?.emergencyContact?.relationship || '',
          },
        },
        firstQuestion: {
          category: data.firstQuestion?.category || '',
          title: data.firstQuestion?.title || '',
          description: data.firstQuestion?.description || '',
          images: data.firstQuestion?.images || [],
          urgency: data.firstQuestion?.urgency || undefined,
          isPrivate: data.firstQuestion?.isPrivate || false,
        },
        privacyPolicyAccepted: data.privacyPolicyAccepted || false,
      };
      form.reset(normalizedData as any);
    }
    if (savedStep) {
      setCurrentStep(savedStep);
    }
    setIsHydrated(true);
  }, [form]);

  // Auto-save on form changes
  useEffect(() => {
    if (!isHydrated) return;

    const subscription = form.watch(() => {
      const values = form.getValues();
      saveOnboardingData(values, currentStep);
    });

    return () => subscription.unsubscribe();
  }, [form, currentStep, isHydrated]);

  // Save step changes
  useEffect(() => {
    if (isHydrated) {
      const values = form.getValues();
      saveOnboardingData(values, currentStep);
    }
  }, [currentStep, isHydrated, form]);

  // Screen reader announcement for step changes
  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      const stepLabel = STEPS[currentStep - 1]?.label || '';
      const announcement = `Step ${currentStep} of 4: ${stepLabel}`;
      
      // Create and announce
      const announcer = document.createElement('div');
      announcer.setAttribute('role', 'status');
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      announcer.textContent = announcement;
      document.body.appendChild(announcer);

      setTimeout(() => {
        document.body.removeChild(announcer);
      }, 1000);
    }
  }, [currentStep, isHydrated]);

  const validateCurrentStep = async (): Promise<boolean> => {
    const step = STEPS[currentStep - 1];
    if (!step) return false;

    let isValid = false;

    switch (currentStep) {
      case 1:
        // For step 1, validate account fields and check password matching
        isValid = await form.trigger('account');
        if (isValid) {
          // Check password matching manually
          const password = form.getValues('account.password');
          const confirmPassword = form.getValues('account.confirmPassword');
          if (password !== confirmPassword) {
            form.setError('account.confirmPassword', {
              type: 'manual',
              message: 'Passwords do not match',
            });
            isValid = false;
          } else {
            // Clear the error if passwords match
            form.clearErrors('account.confirmPassword');
          }
        }
        break;
      case 2:
        isValid = await form.trigger('healthProfile');
        break;
      case 3:
        isValid = await form.trigger('firstQuestion');
        break;
      case 4:
        isValid = await form.trigger('privacyPolicyAccepted');
        break;
    }

    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) {
      // Focus first error field
      const errors = form.formState.errors;
      console.log('Form errors:', errors); // Debug log
      
      // Find first error field (handle nested structure)
      const findFirstError = (errorObj: any, prefix = ''): string | null => {
        for (const key in errorObj) {
          const fullPath = prefix ? `${prefix}.${key}` : key;
          if (errorObj[key]?.message) {
            return fullPath;
          }
          if (typeof errorObj[key] === 'object' && errorObj[key] !== null) {
            const nested = findFirstError(errorObj[key], fullPath);
            if (nested) return nested;
          }
        }
        return null;
      };
      
      const firstErrorField = findFirstError(errors);
      if (firstErrorField) {
        const fieldElement = document.querySelector(
          `[name="${firstErrorField}"]`
        ) as HTMLElement;
        fieldElement?.focus();
        fieldElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepClick = async (step: number) => {
    if (step < currentStep) {
      // Allow going back to previous steps
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === currentStep) {
      // Current step, do nothing
      return;
    } else {
      // Validate current step before proceeding
      const isValid = await validateCurrentStep();
      if (isValid) {
        setCurrentStep(step);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleSaveDraft = () => {
    const values = form.getValues();
    saveOnboardingData(values, currentStep);
    // In a real app, you might send an email here
    router.push('/');
  };

  const handleExit = () => {
    if (hasUnsavedData()) {
      setShowExitDialog(true);
    } else {
      router.push('/');
    }
  };

  const handleSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      const values = form.getValues();
      
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Generate patient ID
      const generatedId = `P${Math.floor(Math.random() * 100000)}`;
      setPatientId(generatedId);

      // Clear saved data
      clearOnboardingData();

      // Show success screen
      setShowSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewQuestion = () => {
    router.push('/patient/questions');
  };

  const handleBrowseProfessionals = () => {
    router.push('/professionals');
  };

  const handleGoToDashboard = () => {
    router.push('/patient/dashboard');
  };

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <SuccessScreen
            patientId={patientId}
            onViewQuestion={handleViewQuestion}
            onBrowseProfessionals={handleBrowseProfessionals}
            onGoToDashboard={handleGoToDashboard}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleExit}
              className="gap-2"
            >
              <ArrowLeft className="size-4" />
              Exit
            </Button>
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              className="gap-2"
            >
              <Save className="size-4" />
              Save Draft
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Stepper */}
        <div className="mb-8">
          <OnboardingStepper currentStep={currentStep} />
        </div>

        {/* Form */}
        <Card>
          <CardContent className="p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                {currentStep === 1 && <CreateAccountStep form={form as any} />}
                {currentStep === 2 && <HealthProfileStep form={form as any} />}
                {currentStep === 3 && <FirstQuestionStep form={form as any} />}
                {currentStep === 4 && (
                  <ReviewStep form={form} onEditStep={handleStepClick} />
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t sticky bottom-0 bg-background -mx-6 md:-mx-8 px-6 md:px-8 pb-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="sm:w-auto"
                  >
                    Back
                  </Button>
                  <div className="flex-1" />
                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="sm:w-auto bg-teal-500 hover:bg-teal-600 text-white"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="sm:w-auto bg-teal-500 hover:bg-teal-600 text-white"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="size-5 text-destructive" />
              Unsaved Changes
            </AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to exit? Your progress will be saved and you can resume later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Stay on Page</AlertDialogCancel>
            <AlertDialogAction onClick={() => router.push('/')}>
              Exit Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
