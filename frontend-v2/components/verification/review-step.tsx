'use client';

import { UseFormReturn } from 'react-hook-form';
import {
  UserIcon,
  BadgeCheckIcon,
  PhoneIcon,
  FileIcon,
  CalendarIcon,
  MapPinIcon,
  BuildingIcon,
  BriefcaseIcon,
  GlobeIcon,
  LinkedinIcon,
} from 'lucide-react';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import type { VerificationFormData } from './schemas';

interface ReviewStepProps {
  form: UseFormReturn<VerificationFormData>;
  uploadedFile: File | null;
}

function SummaryItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number | undefined;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <Icon className="size-4 text-muted-foreground mt-0.5 shrink-0" />
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium break-words">{value}</p>
      </div>
    </div>
  );
}

export function ReviewStep({ form, uploadedFile }: ReviewStepProps) {
  const values = form.getValues();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Review & Submit</h2>
        <p className="text-sm text-muted-foreground">
          Please review your information before submitting your verification
          application.
        </p>
      </div>

      {/* Personal Information Summary */}
      <div className="rounded-lg border p-4 space-y-4">
        <h3 className="font-semibold text-sm text-primary flex items-center gap-2">
          <UserIcon className="size-4" />
          Personal Information
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <SummaryItem
            icon={UserIcon}
            label="Full Name"
            value={values.personalInfo.fullName}
          />
          <SummaryItem
            icon={BadgeCheckIcon}
            label="Professional Title"
            value={values.personalInfo.title}
          />
          <SummaryItem
            icon={BriefcaseIcon}
            label="Specialization"
            value={values.personalInfo.specialization}
          />
          <SummaryItem
            icon={CalendarIcon}
            label="Years of Experience"
            value={
              values.personalInfo.yearsExperience !== undefined
                ? `${values.personalInfo.yearsExperience} years`
                : undefined
            }
          />
          <SummaryItem
            icon={GlobeIcon}
            label="Country"
            value={values.personalInfo.country}
          />
          <SummaryItem
            icon={MapPinIcon}
            label="City"
            value={values.personalInfo.city}
          />
        </div>
      </div>

      {/* Credentials Summary */}
      <div className="rounded-lg border p-4 space-y-4">
        <h3 className="font-semibold text-sm text-primary flex items-center gap-2">
          <BadgeCheckIcon className="size-4" />
          Professional Credentials
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <SummaryItem
            icon={BadgeCheckIcon}
            label="License Number"
            value={values.credentials.licenseNumber}
          />
          <SummaryItem
            icon={BuildingIcon}
            label="Issuing Authority"
            value={values.credentials.issuingAuthority}
          />
          <SummaryItem
            icon={CalendarIcon}
            label="Expiry Date"
            value={
              values.credentials.expiryDate
                ? new Date(values.credentials.expiryDate).toLocaleDateString()
                : undefined
            }
          />
          <SummaryItem
            icon={FileIcon}
            label="Uploaded Document"
            value={uploadedFile?.name}
          />
          <SummaryItem
            icon={BuildingIcon}
            label="Institution"
            value={values.credentials.institution}
          />
          <SummaryItem
            icon={MapPinIcon}
            label="Institution Address"
            value={values.credentials.institutionAddress}
          />
        </div>
      </div>

      {/* Contact Information Summary */}
      <div className="rounded-lg border p-4 space-y-4">
        <h3 className="font-semibold text-sm text-primary flex items-center gap-2">
          <PhoneIcon className="size-4" />
          Contact Information
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <SummaryItem
            icon={UserIcon}
            label="Email"
            value={values.contact.email}
          />
          <SummaryItem
            icon={PhoneIcon}
            label="Phone"
            value={values.contact.phone}
          />
          {values.contact.linkedin && (
            <SummaryItem
              icon={LinkedinIcon}
              label="LinkedIn"
              value={values.contact.linkedin}
            />
          )}
          {values.contact.website && (
            <SummaryItem
              icon={GlobeIcon}
              label="Website"
              value={values.contact.website}
            />
          )}
        </div>
      </div>

      <Separator />

      {/* Agreements */}
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="certifyAccurate"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="certifyAccurate"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <Label
                  htmlFor="certifyAccurate"
                  className="text-sm font-normal cursor-pointer"
                >
                  I certify that all information provided is accurate and complete
                </Label>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="termsAccepted"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <Label
                  htmlFor="termsAccepted"
                  className="text-sm font-normal cursor-pointer"
                >
                  I agree to the{' '}
                  <a
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    Privacy Policy
                  </a>
                </Label>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
