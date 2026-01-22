'use client';

import { UseFormReturn } from 'react-hook-form';
import { AlertTriangleIcon, CheckCircleIcon } from 'lucide-react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { isInstitutionalEmail, isPersonalEmail } from './schemas';
import type { VerificationFormData } from './schemas';

interface ContactStepProps {
  form: UseFormReturn<VerificationFormData>;
}

export function ContactStep({ form }: ContactStepProps) {
  const email = form.watch('contact.email');
  const isInstitutional = email ? isInstitutionalEmail(email) : false;
  const isPersonal = email ? isPersonalEmail(email) : false;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Contact Verification</h2>
        <p className="text-sm text-muted-foreground">
          Provide your professional contact information.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="contact.email"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Professional Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="john.doe@hospital.edu"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Must be an institutional email (.edu, .gov, hospital domain)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {email && email.includes('@') && (
          <div className="sm:col-span-2">
            {isInstitutional && (
              <Alert className="border-green-500/50 bg-green-500/10">
                <CheckCircleIcon className="size-4 text-green-600" />
                <AlertDescription className="text-green-700 dark:text-green-400">
                  Institutional email detected. This will speed up your verification.
                </AlertDescription>
              </Alert>
            )}
            {isPersonal && (
              <Alert className="border-yellow-500/50 bg-yellow-500/10">
                <AlertTriangleIcon className="size-4 text-yellow-600" />
                <AlertDescription className="text-yellow-700 dark:text-yellow-400">
                  Personal email detected. For faster verification, please use an
                  institutional email if available.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        <FormField
          control={form.control}
          name="contact.phone"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="+254 7XX XXX XXX"
                  {...field}
                />
              </FormControl>
              <FormDescription>Include country code</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contact.linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                LinkedIn Profile{' '}
                <span className="text-muted-foreground font-normal">(Optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://linkedin.com/in/johndoe"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contact.website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Professional Website{' '}
                <span className="text-muted-foreground font-normal">(Optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://dr-johndoe.com"
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
