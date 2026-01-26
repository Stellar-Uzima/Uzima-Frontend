'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronRight, Loader2, Wallet } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Step1Personal,
  Step2Credentials,
  Step3Contact,
  Step4Review,
} from '@/components/verification/VerificationSteps';
import {
  personalInfoSchema,
  credentialsSchema,
  contactSchema,
  reviewSchema,
} from '@/lib/schemas/verification';

const useWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  return { isConnected, connect: () => setIsConnected(true) };
};

const STEPS = [
  { id: 1, name: 'Personal Info', schema: personalInfoSchema },
  { id: 2, name: 'Credentials', schema: credentialsSchema },
  { id: 3, name: 'Contact', schema: contactSchema },
  { id: 4, name: 'Review', schema: reviewSchema },
];

export default function VerificationPage() {
  const router = useRouter();
  const { isConnected, connect } = useWallet();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('verification_draft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        if (parsed.expiryDate) parsed.expiryDate = new Date(parsed.expiryDate);
        setFormData(parsed);
      } catch (e) {
        console.error('Failed to parse draft', e);
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      const { file, ...rest } = formData;
      localStorage.setItem('verification_draft', JSON.stringify(rest));
    }
  }, [formData]);

  const currentSchema = STEPS[currentStep - 1].schema;

  const form = useForm({
    resolver: zodResolver(currentSchema),
    defaultValues: formData,
    values: formData,
    mode: 'onChange',
  });

  const processStep = (data: any) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);

    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    } else {
      handleFinalSubmit(updatedData);
    }
  };

  const handleFinalSubmit = async (finalData: any) => {
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Submitting to backend:', finalData);

    localStorage.removeItem('verification_draft');

    toast.success('Application Submitted!', {
      description: 'We will review your details within 3-5 business days.',
    });

    setTimeout(() => {
      router.push('/profile');
    }, 2000);

    setIsSubmitting(false);
  };

  const goBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  if (!isMounted) return null;

  if (!isConnected) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center space-y-4">
        <div className="bg-primary/10 p-4 rounded-full">
          <Wallet className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">Connect Wallet Required</h1>
        <p className="text-muted-foreground max-w-md">
          To ensure the integrity of our platform, we require a connected
          Stellar wallet to verify your identity.
        </p>
        <Button onClick={connect} size="lg">
          Connect Wallet to Begin
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Professional Verification
        </h1>
        <p className="text-muted-foreground">
          Complete the following steps to receive your verified medical badge
          and start earning XLM.
        </p>
      </div>

      
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2 font-medium">
          <span>Step {currentStep} of 4</span>
          <span className="text-muted-foreground">
            {Math.round((currentStep / 4) * 100)}%
          </span>
        </div>
        <Progress value={(currentStep / 4) * 100} className="h-2" />
        <div className="flex justify-between mt-2 px-1">
          {STEPS.map((s) => (
            <div
              key={s.id}
              className={`text-xs flex items-center gap-1 ${currentStep >= s.id ? 'text-primary font-medium' : 'text-muted-foreground'}`}
            >
              {currentStep > s.id && <Check className="w-3 h-3" />}
              {s.name}
            </div>
          ))}
        </div>
      </div>

      
      <Card className="border-t-4 border-t-primary shadow-lg">
        <CardHeader>
          <CardTitle>{STEPS[currentStep - 1].name}</CardTitle>
          <CardDescription>
            {currentStep === 1 && 'Tell us about your professional background.'}
            {currentStep === 2 &&
              'Upload your valid medical license and credentials.'}
            {currentStep === 3 && 'Provide verifiable contact methods.'}
            {currentStep === 4 && 'Review your information before submitting.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          
          {currentStep === 1 && (
            <Step1Personal form={form} onSubmit={processStep} />
          )}
          {currentStep === 2 && (
            <Step2Credentials form={form} onSubmit={processStep} />
          )}
          {currentStep === 3 && (
            <Step3Contact form={form} onSubmit={processStep} />
          )}
          {currentStep === 4 &&
            (isSubmitting ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Verifying documents...</p>
              </div>
            ) : (
              <Step4Review
                form={form}
                onSubmit={processStep}
                allData={formData}
              />
            ))}
        </CardContent>
      </Card>

      
      <div className="mt-6 flex justify-between">
        {currentStep > 1 && !isSubmitting && (
          <Button variant="ghost" onClick={goBack}>
            Back
          </Button>
        )}
      </div>
    </div>
  );
}
