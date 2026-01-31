'use client';

import React, { useState, useRef } from 'react';

// Tesseract ships as CJS; pull it in with require so the ESM page bundle
// does not break on tree-shake.  The cast keeps TS happy without a
// declaration file.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Tesseract = require('tesseract.js') as {
  recognize: (
    file: File,
    lang: string,
    opts?: { logger?: (m: { progress: number }) => void }
  ) => Promise<{ data: { text: string; confidence: number } }>;
};

interface CertEntry {
  name: string;
  issuedBy: string;
  document: File | null;
}

interface Props {
  data: Record<string, any>;
  updateData: (section: string, payload: Record<string, unknown>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2Credentials({
  data,
  updateData,
  onNext,
  onBack,
}: Props) {
  const [formState, setFormState] = useState<Record<string, any>>(
    data.credentials || {}
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [ocrResult, setOcrResult] = useState<{
    text: string;
    confidence: number;
  } | null>(null);
  const [certifications, setCertifications] = useState<CertEntry[]>(
    data.credentials?.certifications || []
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── helpers ──────────────────────────────────────────────────────────
  const handleChange = (field: string, value: any) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  // ── file upload + OCR ────────────────────────────────────────────────
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        document: 'Only PDF, JPG, and PNG files are allowed',
      }));
      return;
    }
    // Validate size (10 MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        document: 'File size must be less than 10 MB',
      }));
      return;
    }

    setUploading(true);
    handleChange('document', file);

    // Run OCR only on image uploads
    if (file.type.startsWith('image/')) {
      try {
        const result = await Tesseract.recognize(file, 'eng', {
          logger: (m: { progress: number }) => console.log(m),
        });

        const { text, confidence } = result.data;

        // Common license-number patterns – first match wins
        const patterns = [
          /license[:\s]+([A-Z0-9-]+)/i,
          /(?:medical|physician|nursing)\s+(?:license|registration)[:\s]+([A-Z0-9-]+)/i,
          /\b([A-Z]{2}\d{6,10})\b/,
          /\b(\d{6,10}[A-Z]{2})\b/,
        ];

        let extracted = '';
        for (const p of patterns) {
          const m = text.match(p);
          if (m) {
            extracted = m[1];
            break;
          }
        }

        if (extracted && confidence > 60) {
          setOcrResult({ text: extracted, confidence });
          handleChange('licenseNumber', extracted);
        }
      } catch (err) {
        console.error('OCR failed:', err);
      }
    }

    setUploading(false);
  };

  // ── certification list helpers ───────────────────────────────────────
  const addCertification = () =>
    setCertifications((prev) => [
      ...prev,
      { name: '', issuedBy: '', document: null },
    ]);

  const removeCertification = (idx: number) =>
    setCertifications((prev) => prev.filter((_, i) => i !== idx));

  const updateCertification = (
    idx: number,
    field: keyof CertEntry,
    value: any
  ) =>
    setCertifications((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });

  // ── validation ───────────────────────────────────────────────────────
  const validate = (): boolean => {
    const e: Record<string, string> = {};

    if (!formState.licenseNumber) e.licenseNumber = 'License number is required';
    if (!formState.issuingAuthority) e.issuingAuthority = 'Issuing authority is required';
    if (!formState.issueDate) e.issueDate = 'Issue date is required';
    if (!formState.expiryDate) {
      e.expiryDate = 'Expiry date is required';
    } else if (new Date(formState.expiryDate) < new Date()) {
      e.expiryDate = 'License appears to be expired';
    }
    if (!formState.jurisdiction) e.jurisdiction = 'Jurisdiction is required';
    if (!formState.document) e.document = 'License document upload is required';
    if (!formState.institution) e.institution = 'Institution / Hospital affiliation is required';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      updateData('credentials', { ...formState, certifications });
      onNext();
    }
  };

  // ── render ───────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Medical Credentials
        </h2>
        <p className="text-gray-600">
          Upload your license and certification documents
        </p>
      </div>

      {/* License number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Medical License Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formState.licenseNumber || ''}
          onChange={(e) => handleChange('licenseNumber', e.target.value)}
          placeholder="ABC123456"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.licenseNumber ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.licenseNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.licenseNumber}</p>
        )}
        {/* OCR confidence badge */}
        {ocrResult && (
          <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">
              ✓ OCR Detected:{' '}
              <strong>{ocrResult.text}</strong> (
              {ocrResult.confidence.toFixed(0)}% confidence)
            </p>
            <p className="text-xs text-green-600 mt-1">
              Please verify this is correct. Edit the field above if needed.
            </p>
          </div>
        )}
      </div>

      {/* Issuing authority */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Issuing Authority / Board <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formState.issuingAuthority || ''}
          onChange={(e) => handleChange('issuingAuthority', e.target.value)}
          placeholder="State Medical Board"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.issuingAuthority ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.issuingAuthority && (
          <p className="text-red-500 text-sm mt-1">
            {errors.issuingAuthority}
          </p>
        )}
      </div>

      {/* Issue / Expiry dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Issue Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formState.issueDate || ''}
            onChange={(e) => handleChange('issueDate', e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.issueDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.issueDate && (
            <p className="text-red-500 text-sm mt-1">{errors.issueDate}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expiry Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formState.expiryDate || ''}
            onChange={(e) => handleChange('expiryDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.expiryDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.expiryDate && (
            <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
          )}
        </div>
      </div>

      {/* Jurisdiction */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          License Jurisdiction <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formState.jurisdiction || ''}
          onChange={(e) => handleChange('jurisdiction', e.target.value)}
          placeholder="California, USA"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.jurisdiction ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.jurisdiction && (
          <p className="text-red-500 text-sm mt-1">{errors.jurisdiction}</p>
        )}
      </div>

      {/* Document drop-zone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload License Document <span className="text-red-500">*</span>
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            errors.document
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
          }`}
        >
          {uploading ? (
            <div className="space-y-2">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
              <p className="text-gray-600">Processing document…</p>
            </div>
          ) : formState.document ? (
            <div className="space-y-2">
              <p className="text-green-600 text-4xl">✓</p>
              <p className="text-gray-700 font-medium">
                {formState.document.name}
              </p>
              <p className="text-sm text-gray-500">
                {(formState.document.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleChange('document', null);
                  setOcrResult(null);
                }}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-gray-400 text-4xl">📄</p>
              <p className="text-gray-700 font-medium">
                Click to upload or drag &amp; drop
              </p>
              <p className="text-sm text-gray-500">
                PDF, JPG, or PNG (max 10 MB)
              </p>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileUpload}
          className="hidden"
        />
        {errors.document && (
          <p className="text-red-500 text-sm mt-1">{errors.document}</p>
        )}
      </div>

      {/* Institution */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Institution / Hospital Affiliation{' '}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formState.institution || ''}
          onChange={(e) => handleChange('institution', e.target.value)}
          placeholder="Johns Hopkins Hospital"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.institution ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.institution && (
          <p className="text-red-500 text-sm mt-1">{errors.institution}</p>
        )}
      </div>

      {/* Additional certifications (dynamic list) */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Additional Certifications <span className="text-gray-400">(optional)</span>
          </label>
          <button
            type="button"
            onClick={addCertification}
            className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
          >
            + Add Certification
          </button>
        </div>

        {certifications.map((cert, idx) => (
          <div
            key={idx}
            className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50"
          >
            <div className="flex justify-between mb-3">
              <h4 className="font-medium text-gray-700">
                Certification #{idx + 1}
              </h4>
              <button
                type="button"
                onClick={() => removeCertification(idx)}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={cert.name}
                onChange={(e) =>
                  updateCertification(idx, 'name', e.target.value)
                }
                placeholder="Certification name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={cert.issuedBy}
                onChange={(e) =>
                  updateCertification(idx, 'issuedBy', e.target.value)
                }
                placeholder="Issued by"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  updateCertification(idx, 'document', e.target.files?.[0] ?? null)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>

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
          className="flex-1 px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Continue to Verification →
        </button>
      </div>
    </div>
  );
}