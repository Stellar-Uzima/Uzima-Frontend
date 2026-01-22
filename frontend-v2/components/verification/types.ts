// Professional Verification Types and Interfaces

export interface PersonalInfo {
  fullName: string;
  title: string;
  specialization: string;
  yearsExperience: number;
  country: string;
  city: string;
}

export interface Credentials {
  licenseNumber: string;
  issuingAuthority: string;
  expiryDate: Date;
  document: File | null;
  documentPreview?: string;
  institution: string;
  institutionAddress: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin?: string;
  website?: string;
}

export interface VerificationApplication {
  personalInfo: PersonalInfo;
  credentials: Credentials;
  contact: ContactInfo;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
}

export interface VerificationFormData {
  personalInfo: PersonalInfo;
  credentials: Omit<Credentials, 'document' | 'documentPreview'> & {
    expiryDate: string;
  };
  contact: ContactInfo;
  termsAccepted: boolean;
  certifyAccurate: boolean;
}

export type VerificationStep = 1 | 2 | 3 | 4;

export const PROFESSIONAL_TITLES = [
  'Doctor',
  'Nurse',
  'Pharmacist',
  'Dentist',
  'Physiotherapist',
  'Psychologist',
  'Nutritionist',
  'Radiologist',
  'Surgeon',
  'Pediatrician',
  'Cardiologist',
  'Dermatologist',
  'Other',
] as const;

export const SPECIALIZATIONS = [
  'General Practice',
  'Internal Medicine',
  'Pediatrics',
  'Cardiology',
  'Dermatology',
  'Neurology',
  'Oncology',
  'Orthopedics',
  'Psychiatry',
  'Radiology',
  'Surgery',
  'Emergency Medicine',
  'Obstetrics & Gynecology',
  'Ophthalmology',
  'Urology',
  'Anesthesiology',
  'Pathology',
  'Public Health',
  'Traditional Medicine',
  'Other',
] as const;

export const COUNTRIES = [
  'Kenya',
  'Nigeria',
  'South Africa',
  'Ghana',
  'Tanzania',
  'Uganda',
  'Ethiopia',
  'Rwanda',
  'Cameroon',
  'Senegal',
  'United States',
  'United Kingdom',
  'Canada',
  'Germany',
  'France',
  'India',
  'Other',
] as const;

// Institutional email domain whitelist
export const INSTITUTIONAL_DOMAINS = [
  '.edu',
  '.gov',
  '.ac.',
  '.hospital',
  '.clinic',
  '.health',
  '.nhs.',
  '.med.',
  '.medical',
  '.healthcare',
  '.kenyatta',
  '.aga-khan',
  '.who.',
  '.un.',
  '.unicef',
] as const;

// Personal email domains to warn about
export const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'icloud.com',
  'mail.com',
  'protonmail.com',
  'zoho.com',
] as const;

export interface FileUploadState {
  file: File | null;
  preview: string | null;
  error: string | null;
  isDragging: boolean;
}

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
export const ACCEPTED_FILE_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png'];
