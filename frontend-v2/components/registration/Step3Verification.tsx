'use client';

import React, { useState, useEffect } from 'react';

const WHITELISTED_DOMAINS = [
  '.edu',
  '.gov',
  '.ac.uk',
  '.nhs.uk',
  '.ac',
  '.edu.au',
  'mayoclinic.org',
  'clevelandclinic.org',
  'johnshopkins.edu',
  'stanfordhealthcare.org',
  'uclahealth.org',
  'pennmedicine.org',
  'nyulangone.org',
  'massgeneral.org',
  'hopkinsmedicine.org',
];

const BLACKLISTED_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'aol.com',
  'protonmail.com',
  'icloud.com',
  'mail.com',
];

interface Props {
  data: Record<string, any>;
  updateData: (section: string, payload: Record<string, unknown>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3Verification({
  data,
  updateData,
  onNext,
  onBack,
}: Props) {
  const [formState, setFormState] = useState<Record<string, any>>(
    data.verification || {}
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Code-flow UI state
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0); // seconds remaining on the 10-min expiry
  const [resendCooldown, setResendCooldown] = useState(0); // 30-s resend guard
  const [verificationAttempts, setVerificationAttempts] = useState(0);

  // Alternative document preview
  const [alternativeDoc, setAlternativeDoc] = useState<File | null>(null);

  // ── countdown timer ──────────────────────────────────────────────────
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(
      () => setResendCooldown((c) => c - 1),
      1000
    );
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // ── helpers ──────────────────────────────────────────────────────────
  const handleChange = (field: string, value: any) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // ── domain validation ────────────────────────────────────────────────
  const validateEmail = (
    email: string
  ): { valid: boolean; message?: string } => {
    if (!email) return { valid: false, message: 'Email is required' };

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return { valid: false, message: 'Invalid email format' };

    const domain = email.split('@')[1].toLowerCase();

    if (BLACKLISTED_DOMAINS.includes(domain))
      return {
        valid: false,
        message:
          'Personal email addresses are not allowed. Please use your institutional email.',
      };

    const isWhitelisted = WHITELISTED_DOMAINS.some(
      (d) => domain.endsWith(d) || domain === d.replace(/^\./, '')
    );

    if (!isWhitelisted)
      return {
        valid: false,
        message:
          'Email domain not recognised as institutional. Upload an employment letter below as an alternative.',
      };

    return { valid: true };
  };

  // ── send code ────────────────────────────────────────────────────────
  const sendVerificationCode = async () => {
    const check = validateEmail(formState.email);
    if (!check.valid) {
      setErrors((prev) => ({ ...prev, email: check.message || '' }));
      return;
    }

    try {
      const res = await fetch('/api/professional/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formState.email }),
      });

      if (res.ok) {
        setCodeSent(true);
        setCountdown(600); // 10 min
        setErrors({});
      } else {
        setErrors((prev) => ({
          ...prev,
          email: 'Failed to send verification code',
        }));
      }
    } catch {
      setErrors((prev) => ({
        ...prev,
        email: 'Network error. Please try again.',
      }));
    }
  };

  // ── resend code ──────────────────────────────────────────────────────
  const resendCode = () => {
    if (resendCooldown > 0) return;
    setResendCooldown(30);
    sendVerificationCode();
  };

  // ── verify code ──────────────────────────────────────────────────────
  const verifyCode = async () => {
    if (!formState.verificationCode || formState.verificationCode.length !== 6) {
      setErrors((prev) => ({
        ...prev,
        verificationCode: 'Please enter a 6-digit code',
      }));
      return;
    }

    if (verificationAttempts >= 3) {
      setErrors((prev) => ({
        ...prev,
        verificationCode: 'Too many attempts. Please request a new code.',
      }));
      return;
    }

    try {
      const res = await fetch('/api/professional/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formState.email,
          code: formState.verificationCode,
        }),
      });

      if (res.ok) {
        handleChange('emailVerified', true);
        setErrors({});
      } else {
        const remaining = 2 - verificationAttempts; // after this failed attempt
        setVerificationAttempts((a) => a + 1);
        setErrors((prev) => ({
          ...prev,
          verificationCode: `Invalid code. ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining.`,
        }));
      }
    } catch {
      setErrors((prev) => ({
        ...prev,
        verificationCode: 'Verification failed. Please try again.',
      }));
    }
  };

  // ── alternative doc ──────────────────────────────────────────────────
  const handleAlternativeDocUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        alternativeDocument: 'File size must be less than 10 MB',
      }));
      return;
    }
    setAlternativeDoc(file);
    handleChange('alternativeDocument', file);
    setErrors((prev) => ({ ...prev, alternativeDocument: '' }));
  };

  // ── step validation ──────────────────────────────────────────────────
  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!formState.email) e.email = 'Email is required';
    if (!formState.emailVerified && !formState.alternativeDocument)
      e.verification =
        'Please verify your email or upload an employment letter';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      updateData('verification', formState);
      onNext();
    }
  };

  // ── render ───────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Institutional Verification
        </h2>
        <p className="text-gray-600">
          Verify your professional status with an institutional email
        </p>
      </div>

      {/* Email input + Send Code button */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Email Address <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <input
            type="email"
            value={formState.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="doctor@hospital.edu"
            disabled={codeSent}
            className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } ${codeSent ? 'bg-gray-100' : ''}`}
          />
          {!codeSent && (
            <button
              type="button"
              onClick={sendVerificationCode}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Send Code
            </button>
          )}
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
        <p className="text-xs text-gray-500 mt-2">
          Must be an institutional email (.edu, .gov, hospital domain)
        </p>
      </div>

      {/* Code entry (visible after code sent, hidden once verified) */}
      {codeSent && !formState.emailVerified && (
        <div className="space-y-4">
          {/* Info banner */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              📧 A 6-digit verification code has been sent to{' '}
              <strong>{formState.email}</strong>
            </p>
            {countdown > 0 && (
              <p className="text-xs text-blue-600 mt-1">
                Code expires in: <strong>{formatTime(countdown)}</strong>
              </p>
            )}
          </div>

          {/* Input + Verify button */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Verification Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                inputMode="numeric"
                value={formState.verificationCode || ''}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                  handleChange('verificationCode', val);
                }}
                placeholder="000000"
                maxLength={6}
                className={`flex-1 px-4 py-3 border rounded-lg text-center text-2xl tracking-widest font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.verificationCode
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={verifyCode}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors whitespace-nowrap"
              >
                Verify
              </button>
            </div>
            {errors.verificationCode && (
              <p className="text-red-500 text-sm mt-1">
                {errors.verificationCode}
              </p>
            )}
          </div>

          {/* Resend link */}
          <button
            type="button"
            onClick={resendCode}
            disabled={resendCooldown > 0}
            className={`text-sm ${
              resendCooldown > 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            {resendCooldown > 0
              ? `Resend code (wait ${resendCooldown}s)`
              : 'Resend verification code'}
          </button>
        </div>
      )}

      {/* Verified badge */}
      {formState.emailVerified && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white text-xl">
              ✓
            </div>
            <div>
              <p className="font-medium text-green-900">Email Verified!</p>
              <p className="text-sm text-green-700">{formState.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Alternative verification – employment letter */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Alternative Verification
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          If you don&apos;t have access to an institutional email, upload an
          employment letter or hospital ID instead.
        </p>

        <label className="block">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
            {alternativeDoc ? (
              <div className="space-y-2">
                <p className="text-green-600 text-3xl">✓</p>
                <p className="text-gray-700 font-medium">
                  {alternativeDoc.name}
                </p>
                <p className="text-sm text-gray-500">
                  {(alternativeDoc.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-gray-400 text-3xl">📎</p>
                <p className="text-gray-700 font-medium">
                  Upload Employment Letter
                </p>
                <p className="text-sm text-gray-500">
                  PDF or image (max 10 MB)
                </p>
              </div>
            )}
          </div>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleAlternativeDocUpload}
            className="hidden"
          />
        </label>
        {errors.alternativeDocument && (
          <p className="text-red-500 text-sm mt-1">
            {errors.alternativeDocument}
          </p>
        )}
      </div>

      {/* Global validation error (need email OR alt doc) */}
      {errors.verification && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{errors.verification}</p>
        </div>
      )}

      {/* Nav */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          disabled={!formState.emailVerified && !formState.alternativeDocument}
          className={`flex-1 px-8 py-3 rounded-lg font-medium transition-colors ${
            formState.emailVerified || formState.alternativeDocument
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue to Practice Details →
        </button>
      </div>
    </div>
  );
}