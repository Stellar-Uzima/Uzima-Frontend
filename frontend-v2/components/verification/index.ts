// Verification Components Export

export { VerificationForm } from './verification-form';
export { ProgressIndicator } from './progress-indicator';
export { PersonalInfoStep } from './personal-info-step';
export { CredentialsStep } from './credentials-step';
export { ContactStep } from './contact-step';
export { ReviewStep } from './review-step';
export { FileUpload } from './file-upload';
export { SuccessModal } from './success-modal';

// Types
export * from './types';

// Schemas
export {
  personalInfoSchema,
  credentialsSchema,
  contactSchema,
  reviewSchema,
  verificationFormSchema,
  isInstitutionalEmail,
  isPersonalEmail,
  validateFile,
} from './schemas';
export type {
  PersonalInfoFormData,
  CredentialsFormData,
  ContactFormData,
  ReviewFormData,
  VerificationFormData,
} from './schemas';
