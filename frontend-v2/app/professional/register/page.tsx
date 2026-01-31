'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Step1PersonalInfo from '@/components/registration/Step1PersonalInfo';
import Step2Credentials from '@/components/registration/Step2Credentials';
import Step3Verification from '@/components/registration/Step3Verification';
import Step4PracticeDetails from '@/components/registration/Step4PracticeDetails';
import Step5Identity from '@/components/registration/Step5Identity';
import Step6Review from '@/components/registration/Step6Review';
import { ProfessionalRegistration } from '@/types/professional';

const STEPS = [
  { id: 1, title: 'Personal Information', component: Step1PersonalInfo },
  { id: 2, title: 'Medical Credentials', component: Step2Credentials },
  { id: 3, title: 'Institutional Verification', component: Step3Verification },
  { id: 4, title: 'Practice Details', component: Step4PracticeDetails },
  { id: 5, title: 'Identity Verification', component: Step5Identity },
  { id: 6, title: 'Terms & Review', component: Step6Review },
];

export default function ProfessionalRegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<ProfessionalRegistration>>({
    personalInfo: {},
    credentials: {},
    verification: {},
    practice: {},
    identity: {},
    status: 'pending',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (step: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [step]: { ...prev[step], ...data },
    }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/professional/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        window.location.href = '/professional/success';
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const CurrentStepComponent = STEPS[currentStep - 1].component;
  const progress = (currentStep / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Healthcare Professional Registration
          </h1>
          <p className="text-gray-600">
            Complete your profile to start providing consultations
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`flex-1 text-center ${
                  step.id === currentStep
                    ? 'text-blue-600 font-semibold'
                    : step.id < currentStep
                    ? 'text-green-600'
                    : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 ${
                    step.id === currentStep
                      ? 'bg-blue-600 text-white'
                      : step.id < currentStep
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.id < currentStep ? '✓' : step.id}
                </div>
                <p className="text-xs hidden md:block">{step.title}</p>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentStepComponent
                data={formData}
                updateData={updateFormData}
                onNext={handleNext}
                onBack={handleBack}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ← Previous
          </button>

          <div className="text-sm text-gray-500">
            Step {currentStep} of {STEPS.length}
          </div>

          {currentStep < STEPS.length ? (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              } text-white`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}