'use client';

import React, { useState } from 'react';

const CONSULTATION_TYPES = [
  { id: 'video', label: 'Video Consultation', icon: '📹' },
  { id: 'audio', label: 'Audio Call', icon: '🎙️' },
  { id: 'text', label: 'Text Chat', icon: '💬' },
];

const RESPONSE_TIMES = [
  { value: '<1hr', label: 'Within 1 hour', recommended: true },
  { value: '<24hr', label: 'Within 24 hours', recommended: false },
  { value: '<48hr', label: 'Within 48 hours', recommended: false },
];

const PAYMENT_METHODS = [
  { id: 'xlm', label: 'Stellar (XLM)', icon: '⭐' },
  { id: 'usdt', label: 'USDT', icon: '💵' },
  { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
];

const EXPERTISE_AREAS = [
  'Chronic Disease Management', 'Mental Health', 'Preventive Care',
  'Pediatric Care', 'Women\'s Health', 'Men\'s Health', 'Elderly Care',
  'Sports Medicine', 'Nutrition & Diet', 'Pain Management',
  'Cardiovascular Health', 'Diabetes Management', 'Respiratory Health',
  'Digestive Health', 'Skin Conditions', 'Sleep Disorders',
  'Weight Management', 'Stress Management', 'Rehabilitation',
  'Post-Surgery Care', 'Prenatal Care', 'Postpartum Care',
];

interface Props {
  data: any;
  updateData: (step: string, data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step4PracticeDetails({ data, updateData, onNext, onBack }: Props) {
  const [formState, setFormState] = useState(data.practice || {
    consultationTypes: [],
    paymentMethods: [],
    expertise: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: any) => {
    setFormState({ ...formState, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const toggleArrayItem = (field: string, item: string) => {
    const current = formState[field] || [];
    const updated = current.includes(item)
      ? current.filter((i: string) => i !== item)
      : [...current, item];
    handleChange(field, updated);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formState.consultationFee || formState.consultationFee < 10) {
      newErrors.consultationFee = 'Minimum fee is $10';
    }
    if (formState.consultationFee > 500) {
      newErrors.consultationFee = 'Maximum fee is $500';
    }
    if (!formState.consultationTypes || formState.consultationTypes.length === 0) {
      newErrors.consultationTypes = 'Select at least one consultation type';
    }
    if (!formState.responseTime) {
      newErrors.responseTime = 'Select your response time commitment';
    }
    if (!formState.expertise || formState.expertise.length < 3) {
      newErrors.expertise = 'Select at least 3 areas of expertise';
    }
    if (formState.expertise && formState.expertise.length > 10) {
      newErrors.expertise = 'Select no more than 10 areas of expertise';
    }
    if (!formState.paymentMethods || formState.paymentMethods.length === 0) {
      newErrors.paymentMethods = 'Select at least one payment method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      updateData('practice', formState);
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Practice Details
        </h2>
        <p className="text-gray-600">
          Set up your consultation preferences and availability
        </p>
      </div>

      {/* Consultation Fee */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Consultation Fee (USD) <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-3 text-gray-500 text-lg">$</span>
          <input
            type="number"
            min="10"
            max="500"
            value={formState.consultationFee || ''}
            onChange={(e) =>
              handleChange('consultationFee', parseFloat(e.target.value) || 0)
            }
            placeholder="50"
            className={`w-full pl-10 pr-4 py-3 border rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.consultationFee ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </div>
        {errors.consultationFee && (
          <p className="text-red-500 text-sm mt-1">{errors.consultationFee}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Fee range: $10 - $500 per consultation
        </p>
      </div>

      {/* Consultation Types */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Consultation Types <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {CONSULTATION_TYPES.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => toggleArrayItem('consultationTypes', type.id)}
              className={`p-4 border-2 rounded-lg transition-all ${
                formState.consultationTypes?.includes(type.id)
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-300'
              }`}
            >
              <div className="text-3xl mb-2">{type.icon}</div>
              <div className="font-medium text-gray-900">{type.label}</div>
            </button>
          ))}
        </div>
        {errors.consultationTypes && (
          <p className="text-red-500 text-sm mt-1">{errors.consultationTypes}</p>
        )}
      </div>

      {/* Response Time */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Response Time Commitment <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {RESPONSE_TIMES.map((time) => (
            <label
              key={time.value}
              className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formState.responseTime === time.value
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="responseTime"
                  value={time.value}
                  checked={formState.responseTime === time.value}
                  onChange={(e) => handleChange('responseTime', e.target.value)}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="font-medium text-gray-900">{time.label}</span>
              </div>
              {time.recommended && (
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  Recommended
                </span>
              )}
            </label>
          ))}
        </div>
        {errors.responseTime && (
          <p className="text-red-500 text-sm mt-1">{errors.responseTime}</p>
        )}
      </div>

      {/* Areas of Expertise */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Areas of Expertise <span className="text-red-500">*</span>
          <span className="text-gray-500 font-normal ml-2">
            (Select 3-10)
          </span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {EXPERTISE_AREAS.map((area) => (
            <button
              key={area}
              type="button"
              onClick={() => toggleArrayItem('expertise', area)}
              disabled={
                !formState.expertise?.includes(area) &&
                formState.expertise?.length >= 10
              }
              className={`px-3 py-2 text-sm border-2 rounded-lg transition-all ${
                formState.expertise?.includes(area)
                  ? 'border-blue-600 bg-blue-50 text-blue-900 font-medium'
                  : 'border-gray-300 text-gray-700 hover:border-blue-300'
              } ${
                !formState.expertise?.includes(area) &&
                formState.expertise?.length >= 10
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              {area}
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {errors.expertise ? (
            <p className="text-red-500 text-sm">{errors.expertise}</p>
          ) : (
            <p className="text-xs text-gray-500">
              Select areas where you have the most experience
            </p>
          )}
          <p className="text-xs text-gray-500">
            {formState.expertise?.length || 0}/10 selected
          </p>
        </div>
      </div>

      {/* Payment Methods */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Accepted Payment Methods <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PAYMENT_METHODS.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => toggleArrayItem('paymentMethods', method.id)}
              className={`p-4 border-2 rounded-lg transition-all ${
                formState.paymentMethods?.includes(method.id)
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-300'
              }`}
            >
              <div className="text-3xl mb-2">{method.icon}</div>
              <div className="font-medium text-gray-900">{method.label}</div>
            </button>
          ))}
        </div>
        {errors.paymentMethods && (
          <p className="text-red-500 text-sm mt-1">{errors.paymentMethods}</p>
        )}
      </div>

      {/* Available Times (Simplified) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          General Availability
        </label>
        <textarea
          value={formState.availableTimes || ''}
          onChange={(e) => handleChange('availableTimes', e.target.value)}
          placeholder="e.g., Mon-Fri: 9am-5pm EST, Weekends: 10am-2pm EST"
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">
          Provide general availability. You can set specific times later.
        </p>
      </div>

      {/* Summary Box */}
      <div className="p-5 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-3">Practice Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Consultation Fee:</span>
            <span className="font-medium">
              ${formState.consultationFee || '—'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Types Offered:</span>
            <span className="font-medium">
              {formState.consultationTypes?.length || 0} types
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Response Time:</span>
            <span className="font-medium">{formState.responseTime || '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Expertise Areas:</span>
            <span className="font-medium">
              {formState.expertise?.length || 0} selected
            </span>
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
          Continue to Identity Verification →
        </button>
      </div>
    </div>
  );
}