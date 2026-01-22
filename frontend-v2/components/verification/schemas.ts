import { z } from 'zod';
import { 
  INSTITUTIONAL_DOMAIN_SUFFIXES,
  INSTITUTIONAL_DOMAINS, 
  PERSONAL_EMAIL_DOMAINS, 
  MAX_FILE_SIZE, 
  ACCEPTED_FILE_TYPES 
} from './types';

// Extract domain from email
export const getEmailDomain = (email: string): string => {
  return email.toLowerCase().split('@')[1] || '';
};

// Check if email is from institutional domain (suffix or exact match)
export const isInstitutionalEmail = (email: string): boolean => {
  const domain = getEmailDomain(email);
  if (!domain) return false;
  
  // Check suffix-based matching (e.g., .edu, .gov, .ac.uk)
  const hasSuffix = INSTITUTIONAL_DOMAIN_SUFFIXES.some((suffix) => 
    domain.endsWith(suffix)
  );
  
  // Check exact domain match (e.g., who.int, cdc.gov)
  const hasExactMatch = INSTITUTIONAL_DOMAINS.some((inst) => 
    domain === inst.toLowerCase()
  );
  
  return hasSuffix || hasExactMatch;
};

// Check if email is from personal domain
export const isPersonalEmail = (email: string): boolean => {
  const domain = getEmailDomain(email);
  return PERSONAL_EMAIL_DOMAINS.some((personal) => domain === personal.toLowerCase());
};

// Classify email for UI feedback
export const classifyEmail = (email: string): {
  isInstitutional: boolean;
  isPersonal: boolean;
  domain: string;
} => {
  const domain = getEmailDomain(email);
  return {
    isInstitutional: isInstitutionalEmail(email),
    isPersonal: isPersonalEmail(email),
    domain,
  };
};

/**
 * Normalize phone number to E.164 format
 * Removes spaces, dashes, parentheses for storage/validation
 * Input: "+234 816 545 453" or "+234-816-545-453"
 * Output: "+234816545453"
 */
export const normalizePhoneNumber = (input: string): string => {
  return input.replace(/[\s\-()]/g, '');
};

// E.164 phone validation regex
// Enforces: + prefix, valid country code (1-9), 7-14 digits (8-15 total)
const E164_PHONE_REGEX = /^\+[1-9]\d{7,14}$/;

// Step 1: Personal Information Schema
export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Full name must be at least 3 characters')
    .max(100, 'Full name must not exceed 100 characters'),
  title: z.string().min(1, 'Professional title is required'),
  specialization: z.string().min(1, 'Specialization is required'),
  yearsExperience: z
    .number({ invalid_type_error: 'Years of experience must be a number' })
    .min(0, 'Years of experience cannot be negative')
    .max(70, 'Years of experience seems too high'),
  country: z.string().min(1, 'Country is required'),
  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must not exceed 100 characters'),
});

// Step 2: Credentials Schema
export const credentialsSchema = z.object({
  licenseNumber: z
    .string()
    .min(5, 'License number must be at least 5 characters')
    .max(50, 'License number must not exceed 50 characters')
    .regex(
      /^[a-zA-Z0-9-/]+$/,
      'License number must be alphanumeric (can include - and /)'
    ),
  issuingAuthority: z
    .string()
    .min(3, 'Issuing authority must be at least 3 characters')
    .max(200, 'Issuing authority must not exceed 200 characters'),
  expiryDate: z
    .string()
    .min(1, 'Expiry date is required')
    .refine(
      (date) => {
        const expiryDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return expiryDate > today;
      },
      { message: 'License expiry date must be in the future' }
    ),
  institution: z
    .string()
    .min(3, 'Institution name must be at least 3 characters')
    .max(200, 'Institution name must not exceed 200 characters'),
  institutionAddress: z
    .string()
    .min(10, 'Institution address must be at least 10 characters')
    .max(500, 'Institution address must not exceed 500 characters'),
});

// Step 3: Contact Information Schema
export const contactSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .transform(normalizePhoneNumber)
    .refine(
      (phone) => E164_PHONE_REGEX.test(phone),
      'Use international format: +234816545453 (no spaces or dashes)'
    ),
  linkedin: z
    .string()
    .url('Please enter a valid LinkedIn URL')
    .refine(
      (url) => url === '' || url.includes('linkedin.com'),
      'Must be a LinkedIn URL'
    )
    .optional()
    .or(z.literal('')),
  website: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
});

// Step 4: Review & Submit Schema
export const reviewSchema = z.object({
  certifyAccurate: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must certify that all information is accurate',
    }),
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
});

// File validation function
export const validateFile = (file: File | null): string | null => {
  if (!file) {
    return 'Please upload your license document';
  }

  if (file.size > MAX_FILE_SIZE) {
    return 'File size must not exceed 5MB';
  }

  if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
    return 'File must be PDF, JPG, or PNG';
  }

  return null;
};

// Combined schema for the entire form
export const verificationFormSchema = z.object({
  personalInfo: personalInfoSchema,
  credentials: credentialsSchema,
  contact: contactSchema,
  certifyAccurate: reviewSchema.shape.certifyAccurate,
  termsAccepted: reviewSchema.shape.termsAccepted,
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type CredentialsFormData = z.infer<typeof credentialsSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type ReviewFormData = z.infer<typeof reviewSchema>;
export type VerificationFormData = z.infer<typeof verificationFormSchema>;
