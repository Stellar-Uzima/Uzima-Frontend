'use client';

import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon, Eye, EyeOff } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { cn } from '@/lib/utils';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Spinner } from '@/components/ui/spinner';
import type { PatientOnboardingFormData } from '@/lib/schemas/patient-onboarding';
import { checkEmailExists } from '@/lib/schemas/patient-onboarding';

interface CreateAccountStepProps {
  form: UseFormReturn<PatientOnboardingFormData>;
}

export function CreateAccountStep({ form }: CreateAccountStepProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);

  const email = form.watch('account.email');

  // Auto-focus first field on mount
  useEffect(() => {
      const timer = setTimeout(() => {
        const firstInput = document.querySelector(
          'input[name="account.email"]'
        ) as HTMLInputElement;
        firstInput?.focus();
      }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Check email existence on blur
  const handleEmailBlur = async () => {
    if (!email || !form.formState.isValidating) return;

    const emailError = form.getFieldState('account.email').error;
    if (emailError) return;

    setIsCheckingEmail(true);
    try {
      const exists = await checkEmailExists(email);
      if (exists) {
        form.setError('account.email', {
          type: 'manual',
          message: 'This email is already registered',
        });
      } else {
        setEmailChecked(true);
      }
    } catch (error) {
      console.error('Error checking email:', error);
    } finally {
      setIsCheckingEmail(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Create Your Account</h2>
        <p className="text-muted-foreground mt-1">
          Let's start by setting up your account information
        </p>
      </div>

      <div className="space-y-4">
        {/* Email */}
        <FormField
          control={form.control}
          name="account.email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="email">
                Email Address <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                    value={field.value || ''}
                    aria-invalid={!!fieldState.error}
                    onBlur={(e) => {
                      field.onBlur(e);
                      handleEmailBlur();
                    }}
                    aria-describedby="email-description email-error"
                  />
                  {isCheckingEmail && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Spinner className="size-4" />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription id="email-description">
                We'll use this to send you important updates
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="account.password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="password">
                Password <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    {...field}
                    value={field.value || ''}
                    aria-invalid={!!fieldState.error}
                    aria-describedby="password-description password-error"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormDescription id="password-description">
                Must be at least 8 characters with uppercase, number, and special character
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="account.confirmPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="confirmPassword">
                Confirm Password <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    {...field}
                    value={field.value || ''}
                    aria-invalid={!!fieldState.error}
                    aria-describedby="confirmPassword-description confirmPassword-error"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={
                      showConfirmPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormDescription id="confirmPassword-description">
                Re-enter your password to confirm
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Full Name */}
        <FormField
          control={form.control}
          name="account.fullName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="fullName">
                Full Name <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  {...field}
                  value={field.value || ''}
                  aria-invalid={!!fieldState.error}
                  aria-describedby="fullName-description fullName-error"
                />
              </FormControl>
              <FormDescription id="fullName-description">
                Your legal name as it appears on official documents
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date of Birth */}
        <FormField
          control={form.control}
          name="account.dateOfBirth"
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-col">
              <FormLabel htmlFor="dateOfBirth">
                Date of Birth <span className="text-destructive">*</span>
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      id="dateOfBirth"
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground',
                        fieldState.error && 'border-destructive'
                      )}
                      aria-invalid={!!fieldState.error}
                      aria-describedby="dateOfBirth-description dateOfBirth-error"
                    >
                      <CalendarIcon className="mr-2 size-4" />
                      {field.value ? (() => {
                        try {
                          const dateValue = field.value instanceof Date 
                            ? field.value 
                            : new Date(field.value);
                          // Check if date is valid
                          if (isNaN(dateValue.getTime())) {
                            return <span>Pick a date</span>;
                          }
                          return format(dateValue, 'PPP');
                        } catch {
                          return <span>Pick a date</span>;
                        }
                      })() : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      field.value
                        ? (() => {
                            try {
                              const dateValue = field.value instanceof Date
                                ? field.value
                                : new Date(field.value);
                              // Check if date is valid
                              if (isNaN(dateValue.getTime())) {
                                return undefined;
                              }
                              return dateValue;
                            } catch {
                              return undefined;
                            }
                          })()
                        : undefined
                    }
                    onSelect={(date) => {
                      field.onChange(date);
                    }}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription id="dateOfBirth-description">
                You must be at least 13 years old
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number */}
        <FormField
          control={form.control}
          name="account.phone"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="phone">
                Phone Number <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <PhoneInput
                  country="us"
                  value={field.value?.replace(/^\+\d+/, '') || ''}
                  onChange={(value, country, e, formattedValue) => {
                    // react-phone-input-2 returns value with country code
                    field.onChange(`+${value}`);
                  }}
                  onBlur={field.onBlur}
                  inputProps={{
                    id: 'account.phone',
                    name: 'account.phone',
                    'aria-invalid': !!fieldState.error,
                    'aria-describedby': 'phone-description phone-error',
                  }}
                  containerClass={cn(
                    "!w-full !relative",
                    fieldState.error && "has-error"
                  )}
                  inputClass={cn(
                    "!w-full !h-9 !rounded-md !border !bg-transparent !px-3 !py-1 !pl-14",
                    fieldState.error && "!border-destructive"
                  )}
                  buttonClass="!border-r !rounded-l-md"
                  dropdownClass="!z-50"
                />
              </FormControl>
              <FormDescription id="phone-description">
                Include country code (e.g., +1 for US)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Terms Acceptance */}
        <FormField
          control={form.control}
          name="account.termsAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="termsAccepted"
                  aria-describedby="termsAccepted-description termsAccepted-error"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel
                  htmlFor="termsAccepted"
                  className="font-normal cursor-pointer"
                >
                  I accept the{' '}
                  <a
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline hover:text-primary/80"
                  >
                    Terms and Conditions
                  </a>{' '}
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormDescription id="termsAccepted-description">
                  You must accept the terms to continue
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
