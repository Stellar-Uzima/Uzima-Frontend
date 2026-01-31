import { z } from 'zod';

// Normalize phone number to E.164 format
export const normalizePhoneNumber = (input: string): string => {
  return input.replace(/[\s\-()]/g, '');
};

// E.164 phone validation regex
const E164_PHONE_REGEX = /^\+[1-9]\d{7,14}$/;

// Calculate age from date of birth
const calculateAge = (dateOfBirth: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
    age--;
  }
  return age;
};

// Step 1: Create Account Schema (base schema without refine)
const createAccountBaseSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters'),
  dateOfBirth: z.date({
    required_error: 'Date of birth is required',
    invalid_type_error: 'Please select a valid date',
  }).refine(
    (date) => {
      const age = calculateAge(date);
      return age >= 13;
    },
    { message: 'You must be at least 13 years old to create an account' }
  ),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .transform(normalizePhoneNumber)
    .refine(
      (phone) => E164_PHONE_REGEX.test(phone),
      'Use international format: +1234567890 (no spaces or dashes)'
    ),
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
});

// Step 1: Create Account Schema (with password match validation)
export const createAccountSchema = createAccountBaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }
);

// Step 2: Health Profile Schema
export const healthProfileSchema = z.object({
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say'], {
    required_error: 'Please select your gender',
  }),
  bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    required_error: 'Please select your blood type',
  }),
  allergies: z.array(z.string()).refine(
    (arr) => arr.length > 0,
    { message: 'Please select at least one option or "None"' }
  ),
  medications: z.array(z.string()).default([]),
  conditions: z.array(z.string()).default([]),
  emergencyContact: z.object({
    name: z
      .string()
      .min(2, 'Emergency contact name must be at least 2 characters')
      .max(100, 'Emergency contact name must not exceed 100 characters'),
    phone: z
      .string()
      .min(1, 'Emergency contact phone is required')
      .transform(normalizePhoneNumber)
      .refine(
        (phone) => E164_PHONE_REGEX.test(phone),
        'Use international format: +1234567890'
      ),
    relationship: z
      .string()
      .min(1, 'Relationship is required')
      .max(50, 'Relationship must not exceed 50 characters'),
  }),
});

// Helper to strip HTML and get text length
const getTextLength = (html: string): number => {
  // Remove HTML tags and decode entities
  const text = html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
    .replace(/&[a-z]+;/gi, ' ') // Replace other HTML entities
    .trim();
  return text.length;
};

// Step 3: Ask Your First Question Schema
export const firstQuestionSchema = z.object({
  category: z.string().min(1, 'Please select a category'),
  title: z
    .string()
    .min(10, 'Question title must be at least 10 characters')
    .max(100, 'Question title must not exceed 100 characters'),
  description: z
    .string()
    .min(1, 'Question description is required')
    .refine(
      (html) => {
        const textLength = getTextLength(html);
        return textLength >= 50;
      },
      { message: 'Question description must be at least 50 characters' }
    )
    .refine(
      (html) => {
        const textLength = getTextLength(html);
        return textLength <= 1000;
      },
      { message: 'Question description must not exceed 1000 characters' }
    ),
  images: z.array(z.instanceof(File)).max(3, 'Maximum 3 images allowed').default([]),
  urgency: z.enum(['low', 'medium', 'high', 'emergency'], {
    required_error: 'Please select an urgency level',
  }),
  isPrivate: z.boolean().default(false),
});

// Step 4: Review & Submit Schema
export const reviewSchema = z.object({
  privacyPolicyAccepted: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must accept the privacy policy',
    }),
});

// Extended account schema for form (includes confirmPassword for validation)
const accountFormSchema = createAccountBaseSchema.omit({ termsAccepted: true });

// Combined schema for the entire form (with password matching validation)
export const patientOnboardingSchema = z
  .object({
    account: accountFormSchema,
    healthProfile: healthProfileSchema,
    firstQuestion: firstQuestionSchema,
    privacyPolicyAccepted: reviewSchema.shape.privacyPolicyAccepted,
  })
  .refine(
    (data) => data.account.password === data.account.confirmPassword,
    {
      message: 'Passwords do not match',
      path: ['account', 'confirmPassword'],
    }
  );

// Type exports
export type CreateAccountFormData = z.infer<typeof createAccountSchema>;
export type HealthProfileFormData = z.infer<typeof healthProfileSchema>;
export type FirstQuestionFormData = z.infer<typeof firstQuestionSchema>;
export type ReviewFormData = z.infer<typeof reviewSchema>;
export type PatientOnboardingFormData = z.infer<typeof patientOnboardingSchema>;

// Interface matching the requirements
export interface PatientOnboarding {
  account: {
    email: string;
    password: string;
    fullName: string;
    dateOfBirth: Date;
    phone: string;
  };
  healthProfile: {
    gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
    bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    allergies: string[];
    medications: string[];
    conditions: string[];
    emergencyContact: {
      name: string;
      phone: string;
      relationship: string;
    };
  };
  firstQuestion: {
    category: string;
    title: string;
    description: string;
    images: File[];
    urgency: 'low' | 'medium' | 'high' | 'emergency';
    isPrivate: boolean;
  };
  status: 'incomplete' | 'complete';
  currentStep: number;
  createdAt: Date;
  expiresAt: Date;
}

// Image validation helper
export const validateImage = (file: File): string | null => {
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

  if (file.size > MAX_SIZE) {
    return 'Image size must not exceed 5MB';
  }

  if (!ACCEPTED_TYPES.includes(file.type)) {
    return 'Image must be JPG or PNG format';
  }

  return null;
};

// Check if email exists (mock API call)
export const checkEmailExists = async (email: string): Promise<boolean> => {
  // In a real app, this would be an API call
  // For now, we'll simulate with a delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Mock: return false (email doesn't exist)
  // In production, replace with actual API call
  return false;
};
