'use client';

import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

interface Props {
  data: any;
  updateData: (step: string, data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step5Identity({ data, updateData, onNext, onBack }: Props) {
  const [formState, setFormState] = useState(data.identity || {});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showWebcam, setShowWebcam] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const handleChange = (field: string, value: any) => {
    setFormState({ ...formState, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const handleFileUpload = (field: string, file: File | null) => {
    if (!file) return;

    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setErrors({ [field]: 'Only PDF, JPG, and PNG files are allowed' });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrors({ [field]: 'File size must be less than 10MB' });
      return;
    }

    handleChange(field, file);
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      // Convert base64 to blob
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'selfie.jpg', { type: 'image/jpeg' });
          handleChange('selfiePhoto', file);
        });
      setShowWebcam(false);
    }
  }, [webcamRef]);

  const retakeSelfie = () => {
    setCapturedImage(null);
    handleChange('selfiePhoto', null);
    setShowWebcam(true);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formState.idDocument) {
      newErrors.idDocument = 'Government-issued ID is required';
    }
    if (!formState.selfiePhoto) {
      newErrors.selfiePhoto = 'Selfie photo is required for verification';
    }
    if (!formState.addressProof) {
      newErrors.addressProof = 'Address proof document is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      updateData('identity', formState);
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Identity Verification
        </h2>
        <p className="text-gray-600">
          Verify your identity to ensure platform security
        </p>
      </div>

      {/* ID Document */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Government-Issued ID <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Upload passport, driver's license, or national ID card
        </p>
        <label className="block">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              errors.idDocument
                ? 'border-red-500 bg-red-50'
                : formState.idDocument
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
            }`}
          >
            {formState.idDocument ? (
              <div className="space-y-2">
                <div className="text-green-600 text-4xl">✓</div>
                <p className="text-gray-700 font-medium">
                  {formState.idDocument.name}
                </p>
                <p className="text-sm text-gray-500">
                  {(formState.idDocument.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChange('idDocument', null);
                  }}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-gray-400 text-4xl">🪪</div>
                <p className="text-gray-700 font-medium">
                  Click to upload ID document
                </p>
                <p className="text-sm text-gray-500">
                  PDF, JPG, or PNG (max 10MB)
                </p>
              </div>
            )}
          </div>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload('idDocument', e.target.files?.[0] || null)}
            className="hidden"
          />
        </label>
        {errors.idDocument && (
          <p className="text-red-500 text-sm mt-1">{errors.idDocument}</p>
        )}
      </div>

      {/* Selfie Photo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Live Selfie Photo <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Take a selfie for face matching with your ID
        </p>

        {!showWebcam && !capturedImage && (
          <button
            type="button"
            onClick={() => setShowWebcam(true)}
            className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <div className="space-y-3">
              <div className="text-gray-400 text-5xl">📷</div>
              <p className="text-gray-700 font-medium">Open Camera</p>
              <p className="text-sm text-gray-500">
                Take a clear photo of your face
              </p>
            </div>
          </button>
        )}

        {showWebcam && (
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden bg-black">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                className="w-full"
                videoConstraints={{
                  facingMode: 'user',
                  width: 1280,
                  height: 720,
                }}
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={capture}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                📸 Capture Photo
              </button>
              <button
                type="button"
                onClick={() => setShowWebcam(false)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {capturedImage && (
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden border-2 border-green-500">
              <img
                src={capturedImage}
                alt="Captured selfie"
                className="w-full"
              />
              <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                ✓ Captured
              </div>
            </div>
            <button
              type="button"
              onClick={retakeSelfie}
              className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              🔄 Retake Photo
            </button>
          </div>
        )}

        {errors.selfiePhoto && (
          <p className="text-red-500 text-sm mt-1">{errors.selfiePhoto}</p>
        )}
      </div>

      {/* Address Proof */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address Proof Document <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Upload utility bill, bank statement, or official mail (within last 3 months)
        </p>
        <label className="block">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              errors.addressProof
                ? 'border-red-500 bg-red-50'
                : formState.addressProof
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
            }`}
          >
            {formState.addressProof ? (
              <div className="space-y-2">
                <div className="text-green-600 text-4xl">✓</div>
                <p className="text-gray-700 font-medium">
                  {formState.addressProof.name}
                </p>
                <p className="text-sm text-gray-500">
                  {(formState.addressProof.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChange('addressProof', null);
                  }}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-gray-400 text-4xl">🏠</div>
                <p className="text-gray-700 font-medium">
                  Click to upload address proof
                </p>
                <p className="text-sm text-gray-500">
                  PDF, JPG, or PNG (max 10MB)
                </p>
              </div>
            )}
          </div>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) =>
              handleFileUpload('addressProof', e.target.files?.[0] || null)
            }
            className="hidden"
          />
        </label>
        {errors.addressProof && (
          <p className="text-red-500 text-sm mt-1">{errors.addressProof}</p>
        )}
      </div>

      {/* Background Check Agreement */}
      <div className="p-5 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="text-yellow-600 text-2xl">⚠️</div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Background Check Notice
            </h3>
            <p className="text-sm text-gray-700">
              By proceeding, you agree to undergo a background check to verify your
              professional credentials and ensure platform safety. This may include
              verification of your license, criminal record check, and education
              verification.
            </p>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="text-blue-600 text-xl">🔒</div>
          <div>
            <h4 className="font-medium text-blue-900 mb-1">
              Your Privacy is Protected
            </h4>
            <p className="text-sm text-blue-700">
              All documents are encrypted and stored securely. Your personal
              information will only be used for verification purposes and will not
              be shared with third parties.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="flex-1 px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Continue to Review →
        </button>
      </div>
    </div>
  );
}