'use client';

import React, { useState } from 'react';

interface Props {
  data: any;
  updateData: (step: string, data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step6Review({ data, onBack }: Props) {
  const [agreements, setAgreements] = useState({
    conductAgreement: false,
    hipaaCompliance: false,
    termsAndConditions: false,
    backgroundCheck: false,
  });
  const [errors, setErrors] = useState<string>('');

  const toggleAgreement = (field: string) => {
    setAgreements({ ...agreements, [field]: !agreements[field] });
    setErrors('');
  };

  const allAgreed = Object.values(agreements).every((val) => val === true);

  const formatFileSize = (file: File | null) => {
    if (!file) return 'Not uploaded';
    return `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Review & Submit
        </h2>
        <p className="text-gray-600">
          Review your information and accept terms before submitting
        </p>
      </div>

      {/* Application Summary */}
      <div className="space-y-6">
        {/* Personal Information */}
        <div className="p-5 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
              1
            </span>
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm ml-10">
            <div>
              <p className="text-gray-600">Full Name</p>
              <p className="font-medium text-gray-900">
                {data.personalInfo?.fullName || 'Not provided'}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Title</p>
              <p className="font-medium text-gray-900">
                {data.personalInfo?.title || 'Not provided'}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Specialization</p>
              <p className="font-medium text-gray-900">
                {data.personalInfo?.specialization || 'Not provided'}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Location</p>
              <p className="font-medium text-gray-900">
                {data.personalInfo?.location?.city}, {data.personalInfo?.location?.country}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Experience</p>
              <p className="font-medium text-gray-900">
                {data.personalInfo?.yearsExperience} years
              </p>
            </div>
            <div>
              <p className="text-gray-600">Languages</p>
              <p className="font-medium text-gray-900">
                {data.personalInfo?.languages?.join(', ') || 'Not provided'}
              </p>
            </div>
          </div>
        </div>

        {/* Credentials */}
        <div className="p-5 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
              2
            </span>
            Medical Credentials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm ml-10">
            <div>
              <p className="text-gray-600">License Number</p>
              <p className="font-medium text-gray-900">
                {data.credentials?.licenseNumber || 'Not provided'}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Issuing Authority</p>
              <p className="font-medium text-gray-900">
                {data.credentials?.issuingAuthority || 'Not provided'}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Jurisdiction</p>
              <p className="font-medium text-gray-900">
                {data.credentials?.jurisdiction || 'Not provided'}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Institution</p>
              <p className="font-medium text-gray-900">
                {data.credentials?.institution || 'Not provided'}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-600">License Document</p>
              <p className="font-medium text-gray-900">
                {formatFileSize(data.credentials?.document)}
              </p>
            </div>
          </div>
        </div>

        {/* Verification */}
        <div className="p-5 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
              3
            </span>
            Institutional Verification
          </h3>
          <div className="text-sm ml-10 space-y-2">
            <div>
              <p className="text-gray-600">Professional Email</p>
              <div className="flex items-center gap-2">
                <p className="font-medium text-gray-900">
                  {data.verification?.email || 'Not provided'}
                </p>
                {data.verification?.emailVerified && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                    ✓ Verified
                  </span>
                )}
              </div>
            </div>
            {data.verification?.alternativeDocument && (
              <div>
                <p className="text-gray-600">Alternative Document</p>
                <p className="font-medium text-gray-900">
                  {formatFileSize(data.verification.alternativeDocument)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Practice Details */}
        <div className="p-5 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
              4
            </span>
            Practice Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm ml-10">
            <div>
              <p className="text-gray-600">Consultation Fee</p>
              <p className="font-medium text-gray-900">
                ${data.practice?.consultationFee || '0'}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Response Time</p>
              <p className="font-medium text-gray-900">
                {data.practice?.responseTime || 'Not set'}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-600">Consultation Types</p>
              <p className="font-medium text-gray-900">
                {data.practice?.consultationTypes?.join(', ') || 'Not selected'}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-600">Areas of Expertise</p>
              <p className="font-medium text-gray-900">
                {data.practice?.expertise?.join(', ') || 'Not selected'}
              </p>
            </div>
          </div>
        </div>

        {/* Identity */}
        <div className="p-5 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
              5
            </span>
            Identity Verification
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm ml-10">
            <div>
              <p className="text-gray-600">Government ID</p>
              <p className="font-medium text-gray-900">
                {formatFileSize(data.identity?.idDocument)}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Selfie Photo</p>
              <p className="font-medium text-gray-900">
                {data.identity?.selfiePhoto ? 'Captured ✓' : 'Not captured'}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-600">Address Proof</p>
              <p className="font-medium text-gray-900">
                {formatFileSize(data.identity?.addressProof)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Agreements */}
      <div className="border-t border-gray-200 pt-6 mt-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Terms & Agreements
        </h3>
        <div className="space-y-4">
          {/* Professional Conduct */}
          <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              checked={agreements.conductAgreement}
              onChange={() => toggleAgreement('conductAgreement')}
              className="mt-1 w-5 h-5 text-blue-600 rounded"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900 mb-1">
                Professional Conduct Agreement
              </p>
              <p className="text-sm text-gray-600">
                I agree to maintain the highest standards of professional conduct,
                provide evidence-based care, respect patient confidentiality, and
                adhere to all applicable medical ethics and professional guidelines.
              </p>
            </div>
          </label>

          {/* HIPAA Compliance */}
          <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              checked={agreements.hipaaCompliance}
              onChange={() => toggleAgreement('hipaaCompliance')}
              className="mt-1 w-5 h-5 text-blue-600 rounded"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900 mb-1">
                HIPAA Compliance Acknowledgment
              </p>
              <p className="text-sm text-gray-600">
                I understand and agree to comply with HIPAA regulations and all
                applicable data protection laws. I will protect patient privacy and
                handle all health information securely.
              </p>
            </div>
          </label>

          {/* Background Check */}
          <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              checked={agreements.backgroundCheck}
              onChange={() => toggleAgreement('backgroundCheck')}
              className="mt-1 w-5 h-5 text-blue-600 rounded"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900 mb-1">
                Background Check Authorization
              </p>
              <p className="text-sm text-gray-600">
                I authorize the platform to conduct background checks including
                license verification, criminal record check, and education
                verification as part of the credentialing process.
              </p>
            </div>
          </label>

          {/* Terms and Conditions */}
          <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              checked={agreements.termsAndConditions}
              onChange={() => toggleAgreement('termsAndConditions')}
              className="mt-1 w-5 h-5 text-blue-600 rounded"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900 mb-1">
                Platform Terms and Conditions
              </p>
              <p className="text-sm text-gray-600">
                I have read and agree to the platform's{' '}
                <a
                  href="/terms"
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="/privacy"
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </label>
        </div>

        {errors && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{errors}</p>
          </div>
        )}
      </div>

      {/* Important Notice */}
      <div className="p-5 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">
          📋 What Happens Next?
        </h3>
        <ul className="text-sm text-blue-700 space-y-2">
          <li>• Your application will be reviewed by our verification team</li>
          <li>• We'll verify your credentials and documents (typically 3-5 business days)</li>
          <li>• You'll receive email updates on your application status</li>
          <li>• Once approved, you can start offering consultations immediately</li>
          <li>• If additional information is needed, we'll contact you via email</li>
        </ul>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={() => {
            if (!allAgreed) {
              setErrors('Please accept all terms and agreements to continue');
            }
          }}
          disabled={!allAgreed}
          className={`flex-1 px-8 py-3 rounded-lg font-medium transition-colors text-lg ${
            allAgreed
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {allAgreed ? '✓ Submit Application' : 'Accept All Terms to Submit'}
        </button>
      </div>
    </div>
  );
}