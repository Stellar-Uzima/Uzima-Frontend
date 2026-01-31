'use client';

import React, { useState } from 'react';

const PROFESSIONAL_TITLES = [
  'Doctor (MD/DO)',
  'Registered Nurse (RN)',
  'Nurse Practitioner (NP)',
  'Physician Assistant (PA)',
  'Pharmacist',
  'Physiotherapist',
  'Psychologist',
  'Psychiatrist',
  'Dentist',
  'Optometrist',
  'Chiropractor',
  'Occupational Therapist',
  'Speech Therapist',
  'Nutritionist/Dietitian',
  'Other',
];

const SPECIALIZATIONS = [
  'Cardiology', 'Dermatology', 'Emergency Medicine', 'Endocrinology',
  'Family Medicine', 'Gastroenterology', 'General Practice', 'Geriatrics',
  'Hematology', 'Infectious Disease', 'Internal Medicine', 'Nephrology',
  'Neurology', 'Obstetrics & Gynecology', 'Oncology', 'Ophthalmology',
  'Orthopedics', 'Pediatrics', 'Psychiatry', 'Pulmonology', 'Radiology',
  'Rheumatology', 'Surgery', 'Urology', 'Critical Care', 'Pain Management',
  'Sports Medicine', 'Mental Health', 'Nutrition', 'Physical Therapy',
];

const LANGUAGES = [
  'English', 'Spanish', 'French', 'German', 'Mandarin', 'Arabic',
  'Portuguese', 'Russian', 'Japanese', 'Hindi', 'Italian', 'Korean',
  'Dutch', 'Polish', 'Turkish', 'Vietnamese', 'Thai', 'Greek',
];

interface Props {
  data: any;
  updateData: (step: string, data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step1PersonalInfo({ data, updateData, onNext }: Props) {
  const [formState, setFormState] = useState(data.personalInfo || {});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: any) => {
    setFormState({ ...formState, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formState.fullName || formState.fullName.length < 3) {
      newErrors.fullName = 'Full name is required (min 3 characters)';
    }
    if (!formState.title) {
      newErrors.title = 'Professional title is required';
    }
    if (!formState.specialization) {
      newErrors.specialization = 'Specialization is required';
    }
    if (!formState.location?.country) {
      newErrors.country = 'Country is required';
    }
    if (!formState.location?.city) {
      newErrors.city = 'City is required';
    }
    if (formState.yearsExperience === undefined || formState.yearsExperience < 0) {
      newErrors.yearsExperience = 'Years of experience is required';
    }
    if (!formState.languages || formState.languages.length === 0) {
      newErrors.languages = 'Select at least one language';
    }
    if (!formState.bio || formState.bio.length < 50) {
      newErrors.bio = 'Bio must be at least 50 characters';
    }
    if (formState.bio && formState.bio.length > 500) {
      newErrors.bio = 'Bio must not exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      updateData('personalInfo', formState);
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Personal Information
        </h2>
        <p className="text-gray-600">
          Tell us about yourself and your professional background
        </p>
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formState.fullName || ''}
          onChange={(e) => handleChange('fullName', e.target.value)}
          placeholder="Dr. Jane Smith"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.fullName ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Must match your medical credentials exactly
        </p>
      </div>

      {/* Professional Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Title <span className="text-red-500">*</span>
        </label>
        <select
          value={formState.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select your title</option>
          {PROFESSIONAL_TITLES.map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* Specialization */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Specialization <span className="text-red-500">*</span>
        </label>
        <select
          value={formState.specialization || ''}
          onChange={(e) => handleChange('specialization', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.specialization ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select your specialization</option>
          {SPECIALIZATIONS.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
        {errors.specialization && (
          <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>
        )}
      </div>

      {/* Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formState.location?.country || ''}
            onChange={(e) =>
              handleChange('location', {
                ...formState.location,
                country: e.target.value,
              })
            }
            placeholder="United States"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.country ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">{errors.country}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formState.location?.city || ''}
            onChange={(e) =>
              handleChange('location', {
                ...formState.location,
                city: e.target.value,
              })
            }
            placeholder="New York"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>
      </div>

      {/* Years of Experience */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Years of Experience <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          min="0"
          max="70"
          value={formState.yearsExperience || ''}
          onChange={(e) =>
            handleChange('yearsExperience', parseInt(e.target.value) || 0)
          }
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.yearsExperience ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.yearsExperience && (
          <p className="text-red-500 text-sm mt-1">{errors.yearsExperience}</p>
        )}
      </div>

      {/* Languages */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Languages Spoken <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {LANGUAGES.map((lang) => (
            <label key={lang} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formState.languages?.includes(lang) || false}
                onChange={(e) => {
                  const current = formState.languages || [];
                  const updated = e.target.checked
                    ? [...current, lang]
                    : current.filter((l: string) => l !== lang);
                  handleChange('languages', updated);
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{lang}</span>
            </label>
          ))}
        </div>
        {errors.languages && (
          <p className="text-red-500 text-sm mt-1">{errors.languages}</p>
        )}
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Bio <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formState.bio || ''}
          onChange={(e) => handleChange('bio', e.target.value)}
          placeholder="Tell patients about your experience, approach to care, and what makes you unique..."
          rows={4}
          maxLength={500}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.bio ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        <div className="flex justify-between mt-1">
          {errors.bio ? (
            <p className="text-red-500 text-sm">{errors.bio}</p>
          ) : (
            <p className="text-xs text-gray-500">
              Minimum 50 characters, maximum 500
            </p>
          )}
          <p className="text-xs text-gray-500">
            {formState.bio?.length || 0}/500
          </p>
        </div>
      </div>

      <button
        onClick={handleNext}
        className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Continue to Credentials →
      </button>
    </div>
  );
}