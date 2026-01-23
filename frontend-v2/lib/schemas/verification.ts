import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

export const personalInfoSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  title: z.string().min(1, 'Please select a title'),
  specialization: z.string().min(2, 'Specialization is required'),
  yearsExperience: z.coerce
    .number()
    .min(0, 'Years cannot be negative')
    .max(70, 'Please enter a valid number'),
  country: z.string().min(2, 'Country is required'),
  city: z.string().min(2, 'City is required'),
});

export const credentialsSchema = z.object({
  licenseNumber: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/, 'License must be alphanumeric'),
  issuingAuthority: z.string().min(2, 'Authority name required'),
  expiryDate: z.date().refine((date) => date > new Date(), {
    message: 'License must not be expired',
  }),
  institution: z.string().min(2, 'Institution name required'),
  institutionAddress: z.string().min(5, 'Address required'),

  file: z
    .any()
    .refine((file) => file instanceof File, 'Document is required')
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .png, and .pdf formats are supported.',
    ),
});

export const contactSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .refine((email) => {
      const forbiddenDomains = [
        'gmail.com',
        'yahoo.com',
        'hotmail.com',
        'outlook.com',
      ];
      const domain = email.split('@')[1];
      return !forbiddenDomains.includes(domain);
    }, 'Please use an institutional email (.edu, .gov, or hospital domain)'),
  phone: z
    .string()
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      'Invalid phone number format (e.g., +1234567890)',
    ),
  linkedin: z.string().url('Invalid URL').optional().or(z.literal('')),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export const reviewSchema = z.object({
  agreement: z
    .boolean()
    .refine((val) => val === true, 'You must agree to the terms'),
});

export const combinedSchema = personalInfoSchema
  .merge(credentialsSchema.omit({ file: true }))
  .merge(contactSchema)
  .merge(reviewSchema);

export type VerificationFormData = z.infer<typeof combinedSchema> & {
  file: File | null;
};
