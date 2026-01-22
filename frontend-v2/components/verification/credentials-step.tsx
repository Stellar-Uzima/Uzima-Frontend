'use client';

import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileUpload } from './file-upload';
import type { VerificationFormData } from './schemas';

interface CredentialsStepProps {
  form: UseFormReturn<VerificationFormData>;
  uploadedFile: File | null;
  onFileChange: (file: File | null) => void;
  fileError?: string;
}

export function CredentialsStep({
  form,
  uploadedFile,
  onFileChange,
  fileError,
}: CredentialsStepProps) {
  // Calculate minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Professional Credentials</h2>
        <p className="text-sm text-muted-foreground">
          Provide your medical license and institutional information.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="credentials.licenseNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medical License Number</FormLabel>
              <FormControl>
                <Input placeholder="ABC-12345" {...field} />
              </FormControl>
              <FormDescription>Alphanumeric, including - and /</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="credentials.issuingAuthority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issuing Authority</FormLabel>
              <FormControl>
                <Input placeholder="Kenya Medical Practitioners Board" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="credentials.expiryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>License Expiry Date</FormLabel>
              <FormControl>
                <Input type="date" min={minDate} {...field} />
              </FormControl>
              <FormDescription>Must be a future date</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="sm:col-span-2">
          <FormItem>
            <FormLabel>License Document</FormLabel>
            <FileUpload
              value={uploadedFile}
              onChange={onFileChange}
              error={fileError}
            />
          </FormItem>
        </div>

        <FormField
          control={form.control}
          name="credentials.institution"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Institution Name</FormLabel>
              <FormControl>
                <Input placeholder="Kenyatta National Hospital" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="credentials.institutionAddress"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Institution Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Hospital Road, Nairobi, Kenya, P.O. Box 20723-00202"
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
