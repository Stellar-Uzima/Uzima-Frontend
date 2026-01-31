// types/professional.ts

export interface ProfessionalRegistration {
  id?: string;
  personalInfo: {
    fullName?: string;
    title?: string;
    specialization?: string;
    location?: {
      country?: string;
      city?: string;
    };
    yearsExperience?: number;
    languages?: string[];
    bio?: string;
  };
  credentials: {
    licenseNumber?: string;
    issuingAuthority?: string;
    issueDate?: Date | string;
    expiryDate?: Date | string;
    jurisdiction?: string;
    document?: File | string;
    certifications?: Array<{
      name: string;
      issuedBy: string;
      document: File | string;
    }>;
    institution?: string;
  };
  verification: {
    email?: string;
    emailVerified?: boolean;
    verificationCode?: string;
    alternativeDocument?: File | string;
  };
  practice: {
    consultationFee?: number;
    availableTimes?: string | string[];
    consultationTypes?: ('video' | 'audio' | 'text')[];
    responseTime?: string;
    expertise?: string[];
    paymentMethods?: string[];
  };
  identity: {
    idDocument?: File | string;
    selfiePhoto?: File | string;
    addressProof?: File | string;
  };
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'info_needed';
  submittedAt: Date | string;
  reviewedAt?: Date | string;
  reviewedBy?: string;
  rejectionReason?: string;
  adminNotes?: string;
}

// Narrowed key type used by the admin checklist toggle
export type ChecklistKey =
  | 'licenseValid'
  | 'documentAuthentic'
  | 'expiryDateValid'
  | 'nameMatches'
  | 'emailVerified';

export interface Checklist extends Record<ChecklistKey, boolean> {}

export interface VerificationReview {
  applicationId: string;
  reviewerId: string;
  checklist: Checklist;
  notes: string;
  decision: 'approve' | 'reject' | 'request_info';
  reason?: string;
}

export interface EmailVerification {
  email: string;
  code: string;
  expiresAt: Date;
  attempts: number;
}