import type { PatientOnboardingFormData } from '@/lib/schemas/patient-onboarding';

const STORAGE_KEY = 'patient-onboarding-data';
const STEP_KEY = 'patient-onboarding-step';
const EXPIRY_DAYS = 7;

export interface StoredOnboardingData {
  data: Partial<PatientOnboardingFormData>;
  createdAt: string;
  expiresAt: string;
}

/**
 * Save onboarding data to localStorage
 */
export const saveOnboardingData = (
  data: Partial<PatientOnboardingFormData>,
  currentStep: number
): void => {
  if (typeof window === 'undefined') return;

  const now = new Date();
  const expiresAt = new Date(now.getTime() + EXPIRY_DAYS * 24 * 60 * 60 * 1000);

  // Helper function to safely convert Date to ISO string
  const dateToISOString = (date: Date | string | undefined): string | undefined => {
    if (!date) return undefined;
    if (typeof date === 'string') return date;
    if (date instanceof Date) {
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return undefined;
      }
      return date.toISOString();
    }
    return undefined;
  };

  const storedData: StoredOnboardingData = {
    data: {
      ...data,
      // Convert Date objects to ISO strings for storage
      account: data.account
        ? {
            ...data.account,
            dateOfBirth: dateToISOString(data.account.dateOfBirth),
          }
        : undefined,
    },
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
    localStorage.setItem(STEP_KEY, currentStep.toString());
  } catch (error) {
    console.error('Failed to save onboarding data:', error);
  }
};

/**
 * Load onboarding data from localStorage
 */
export const loadOnboardingData = (): {
  data: Partial<PatientOnboardingFormData> | null;
  currentStep: number;
} => {
  if (typeof window === 'undefined') {
    return { data: null, currentStep: 1 };
  }

  try {
    const storedDataStr = localStorage.getItem(STORAGE_KEY);
    const stepStr = localStorage.getItem(STEP_KEY);

    if (!storedDataStr) {
      return { data: null, currentStep: 1 };
    }

    const storedData: StoredOnboardingData = JSON.parse(storedDataStr);

    // Check if data has expired
    const expiresAt = new Date(storedData.expiresAt);
    if (new Date() > expiresAt) {
      clearOnboardingData();
      return { data: null, currentStep: 1 };
    }

    // Helper function to safely convert ISO string to Date
    const isoStringToDate = (dateStr: string | Date | undefined): Date | undefined => {
      if (!dateStr) return undefined;
      if (dateStr instanceof Date) {
        // Check if date is valid
        if (isNaN(dateStr.getTime())) {
          return undefined;
        }
        return dateStr;
      }
      if (typeof dateStr === 'string') {
        const date = new Date(dateStr);
        // Check if date is valid
        if (isNaN(date.getTime())) {
          return undefined;
        }
        return date;
      }
      return undefined;
    };

    // Convert ISO strings back to Date objects
    const restoredData: Partial<PatientOnboardingFormData> = {
      ...storedData.data,
      account: storedData.data.account
        ? {
            ...storedData.data.account,
            dateOfBirth: isoStringToDate(
              storedData.data.account.dateOfBirth as string
            ),
          }
        : undefined,
    };

    const currentStep = stepStr ? parseInt(stepStr, 10) : 1;

    return {
      data: restoredData,
      currentStep: currentStep >= 1 && currentStep <= 4 ? currentStep : 1,
    };
  } catch (error) {
    console.error('Failed to load onboarding data:', error);
    return { data: null, currentStep: 1 };
  }
};

/**
 * Clear onboarding data from localStorage
 */
export const clearOnboardingData = (): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STEP_KEY);
  } catch (error) {
    console.error('Failed to clear onboarding data:', error);
  }
};

/**
 * Check if there's unsaved data
 */
export const hasUnsavedData = (): boolean => {
  if (typeof window === 'undefined') return false;

  const storedDataStr = localStorage.getItem(STORAGE_KEY);
  if (!storedDataStr) return false;

  try {
    const storedData: StoredOnboardingData = JSON.parse(storedDataStr);
    const expiresAt = new Date(storedData.expiresAt);
    return new Date() <= expiresAt;
  } catch {
    return false;
  }
};
