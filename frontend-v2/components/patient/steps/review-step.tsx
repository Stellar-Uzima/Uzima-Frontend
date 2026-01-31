'use client';

import { format } from 'date-fns';
import { Edit, CheckCircle2 } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

import { cn } from '@/lib/utils';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { PatientOnboardingFormData } from '@/lib/schemas/patient-onboarding';

interface ReviewStepProps {
  form: UseFormReturn<PatientOnboardingFormData>;
  onEditStep: (step: number) => void;
}

const URGENCY_LABELS: Record<string, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  emergency: 'Emergency',
};

const URGENCY_COLORS: Record<string, string> = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  emergency: 'bg-red-100 text-red-800',
};

export function ReviewStep({ form, onEditStep }: ReviewStepProps) {
  const values = form.getValues();

  const stripHtml = (html: string) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Review & Submit</h2>
        <p className="text-muted-foreground mt-1">
          Please review all your information before submitting
        </p>
      </div>

      <div className="space-y-4">
        {/* Account Information */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Account Information</CardTitle>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onEditStep(1)}
              aria-label="Edit account information"
            >
              <Edit className="size-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-sm">{values.account?.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                <p className="text-sm">{values.account?.fullName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                <p className="text-sm">
                  {values.account?.dateOfBirth
                    ? format(new Date(values.account.dateOfBirth), 'PPP')
                    : 'Not provided'}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <p className="text-sm">{values.account?.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Profile */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Health Profile</CardTitle>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onEditStep(2)}
              aria-label="Edit health profile"
            >
              <Edit className="size-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Gender</p>
                <p className="text-sm capitalize">{values.healthProfile?.gender?.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Blood Type</p>
                <p className="text-sm">{values.healthProfile?.bloodType}</p>
              </div>
            </div>

            {values.healthProfile?.allergies && values.healthProfile.allergies.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Allergies</p>
                <div className="flex flex-wrap gap-2">
                  {values.healthProfile.allergies.map((allergy, index) => (
                    <Badge key={index} variant="secondary">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {values.healthProfile?.medications && values.healthProfile.medications.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Medications</p>
                <div className="flex flex-wrap gap-2">
                  {values.healthProfile.medications.map((med, index) => (
                    <Badge key={index} variant="outline">
                      {med}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {values.healthProfile?.conditions && values.healthProfile.conditions.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Chronic Conditions</p>
                <div className="flex flex-wrap gap-2">
                  {values.healthProfile.conditions.map((condition, index) => (
                    <Badge key={index} variant="outline">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {values.healthProfile?.emergencyContact && (
              <div className="border-t pt-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">Emergency Contact</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Name</p>
                    <p className="text-sm">{values.healthProfile.emergencyContact.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm">{values.healthProfile.emergencyContact.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Relationship</p>
                    <p className="text-sm">{values.healthProfile.emergencyContact.relationship}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* First Question */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your Question</CardTitle>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onEditStep(3)}
              aria-label="Edit question"
            >
              <Edit className="size-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Category</p>
                <p className="text-sm">{values.firstQuestion?.category}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Urgency</p>
                <Badge
                  className={cn(
                    URGENCY_COLORS[values.firstQuestion?.urgency || 'low']
                  )}
                >
                  {URGENCY_LABELS[values.firstQuestion?.urgency || 'low']}
                </Badge>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Title</p>
              <p className="text-sm">{values.firstQuestion?.title}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
              <div
                className="text-sm prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html: values.firstQuestion?.description || '',
                }}
              />
            </div>

            {values.firstQuestion?.images && values.firstQuestion.images.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Images</p>
                <div className="grid grid-cols-3 gap-2">
                  {values.firstQuestion.images.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 object-cover rounded border"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="text-sm font-medium text-muted-foreground">Privacy</p>
              <p className="text-sm">
                {values.firstQuestion?.isPrivate ? 'Private Consultation' : 'Public Question'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Policy Acceptance */}
        <FormField
          control={form.control}
          name="privacyPolicyAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="privacyPolicyAccepted"
                  aria-describedby="privacyPolicyAccepted-description privacyPolicyAccepted-error"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel
                  htmlFor="privacyPolicyAccepted"
                  className="font-normal cursor-pointer"
                >
                  I have read and accept the{' '}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline hover:text-primary/80"
                  >
                    Privacy Policy
                  </a>{' '}
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormDescription id="privacyPolicyAccepted-description">
                  You must accept the privacy policy to submit your information
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
