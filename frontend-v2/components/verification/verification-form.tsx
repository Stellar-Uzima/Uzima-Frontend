'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftIcon, ArrowRightIcon, SendIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinner';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

import { ProgressIndicator } from './progress-indicator';
import { PersonalInfoStep } from './personal-info-step';
import { CredentialsStep } from './credentials-step';
import { ContactStep } from './contact-step';
import { ReviewStep } from './review-step';
import { SuccessModal } from './success-modal';
import {
  verificationFormSchema,
  personalInfoSchema,
  credentialsSchema,
  contactSchema,
  reviewSchema,
  validateFile,
  type VerificationFormData,
} from './schemas';
import type { VerificationStep } from './types';

const STORAGE_KEY = 'verification-form-data';
const FILE_STORAGE_KEY = 'verification-file-info';

const DEFAULT_VALUES: VerificationFormData = {
  personalInfo: {
    fullName: '',
    title: '',
    specialization: '',
    yearsExperience: 0,
    country: '',
    city: '',
  },
  credentials: {
    licenseNumber: '',
    issuingAuthority: '',
    expiryDate: '',
    institution: '',
    institutionAddress: '',
  },
  contact: {
    email: '',
    phone: '',
    linkedin: '',
    website: '',
  },
  certifyAccurate: false,
  termsAccepted: false,
};

export function VerificationForm() {
  const [currentStep, setCurrentStep] = useState<VerificationStep>(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const form = useForm<VerificationFormData>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
  });

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const savedStep = localStorage.getItem('verification-current-step');

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        form.reset(parsed);
      } catch (e) {
        console.error('Failed to parse saved form data:', e);
      }
    }

    if (savedStep) {
      const step = parseInt(savedStep, 10) as VerificationStep;
      if (step >= 1 && step <= 4) {
        setCurrentStep(step);
      }
    }

    setIsHydrated(true);
  }, [form]);

  // Save form data to localStorage on change
  const saveToStorage = useCallback(() => {
    const values = form.getValues();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    localStorage.setItem('verification-current-step', currentStep.toString());
  }, [form, currentStep]);

  // Auto-save on form changes
  useEffect(() => {
    if (!isHydrated) return;

    const subscription = form.watch(() => {
      saveToStorage();
    });

    return () => subscription.unsubscribe();
  }, [form, isHydrated, saveToStorage]);

  // Save step changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('verification-current-step', currentStep.toString());
    }
  }, [currentStep, isHydrated]);

  // Clear storage after successful submission
  const clearStorage = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('verification-current-step');
    localStorage.removeItem(FILE_STORAGE_KEY);
  }, []);

  // Validate current step
  const validateCurrentStep = useCallback(async (): Promise<boolean> => {
    let fieldsToValidate: string[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = [
          'personalInfo.fullName',
          'personalInfo.title',
          'personalInfo.specialization',
          'personalInfo.yearsExperience',
          'personalInfo.country',
          'personalInfo.city',
        ];
        break;
      case 2:
        fieldsToValidate = [
          'credentials.licenseNumber',
          'credentials.issuingAuthority',
          'credentials.expiryDate',
          'credentials.institution',
          'credentials.institutionAddress',
        ];
        // Also validate file
        const fileValidationError = validateFile(uploadedFile);
        if (fileValidationError) {
          setFileError(fileValidationError);
          return false;
        }
        setFileError(undefined);
        break;
      case 3:
        fieldsToValidate = [
          'contact.email',
          'contact.phone',
          'contact.linkedin',
          'contact.website',
        ];
        break;
      case 4:
        fieldsToValidate = ['certifyAccurate', 'termsAccepted'];
        break;
    }

    const result = await form.trigger(
      fieldsToValidate as (keyof VerificationFormData)[]
    );
    return result;
  }, [currentStep, form, uploadedFile]);

  // Handle next step
  const handleNext = useCallback(async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as VerificationStep);
      // Focus management: scroll to top of form
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep, validateCurrentStep]);

  // Handle previous step
  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as VerificationStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  // Handle form submission
  const onSubmit = useCallback(
    async (data: VerificationFormData) => {
      // Final validation
      const fileValidationError = validateFile(uploadedFile);
      if (fileValidationError) {
        setFileError(fileValidationError);
        return;
      }

      setIsSubmitting(true);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Mock submission - in real app, this would send to backend
        console.log('Verification application submitted:', {
          ...data,
          document: uploadedFile?.name,
          submittedAt: new Date().toISOString(),
          status: 'pending',
        });

        // Clear storage and show success modal
        clearStorage();
        setShowSuccessModal(true);
      } catch (error) {
        console.error('Submission failed:', error);
        // In real app, show error toast
      } finally {
        setIsSubmitting(false);
      }
    },
    [uploadedFile, clearStorage]
  );

  // Handle file change
  const handleFileChange = useCallback((file: File | null) => {
    setUploadedFile(file);
    if (file) {
      setFileError(undefined);
    }
  }, []);

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep form={form} />;
      case 2:
        return (
          <CredentialsStep
            form={form}
            uploadedFile={uploadedFile}
            onFileChange={handleFileChange}
            fileError={fileError}
          />
        );
      case 3:
        return <ContactStep form={form} />;
      case 4:
        return <ReviewStep form={form} uploadedFile={uploadedFile} />;
      default:
        return null;
    }
  };

  if (!isHydrated) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex items-center justify-center py-12">
          <Spinner className="size-8" />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="space-y-6">
          <ProgressIndicator currentStep={currentStep} />
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="min-h-[400px]">
              {renderStepContent()}
            </CardContent>

            <CardFooter className="flex flex-col-reverse sm:flex-row gap-3 justify-between border-t pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1 || isSubmitting}
                className={cn(
                  'w-full sm:w-auto gap-2',
                  currentStep === 1 && 'invisible'
                )}
              >
                <ArrowLeftIcon className="size-4" />
                Back
              </Button>

              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto gap-2"
                >
                  Next
                  <ArrowRightIcon className="size-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner className="size-4" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <SendIcon className="size-4" />
                      Submit Application
                    </>
                  )}
                </Button>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </>
  );
}
