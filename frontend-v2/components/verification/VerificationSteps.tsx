'use client';

import { useState, useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import {
  CalendarIcon,
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  personalInfoSchema,
  credentialsSchema,
  contactSchema,
  reviewSchema,
} from '@/lib/schemas/verification';

// --- TYPES ---
type StepProps = {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
};

// --- STEP 1: PERSONAL INFO ---
export function Step1Personal({ form, onSubmit }: StepProps) {
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Dr. Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Professional Title</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select title" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Doctor">Doctor</SelectItem>
                  <SelectItem value="Nurse">Nurse</SelectItem>
                  <SelectItem value="Pharmacist">Pharmacist</SelectItem>
                  <SelectItem value="Specialist">Specialist</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specialization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specialization</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Cardiology" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="yearsExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Experience</FormLabel>
              <FormControl>
                <Input type="number" min="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="Country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit">Next Step</Button>
      </div>
    </form>
  );
}

// --- STEP 2: CREDENTIALS ---
export function Step2Credentials({ form, onSubmit }: StepProps) {
  const [preview, setPreview] = useState<string | null>(null);

  // Handle file selection
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (file: File | null) => void,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      fieldChange(file);
      // Create preview for UI
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="licenseNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medical License Number</FormLabel>
              <FormControl>
                <Input placeholder="MD123456" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="issuingAuthority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issuing Authority</FormLabel>
              <FormControl>
                <Input placeholder="Medical Board of..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>License Expiry Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Institution Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="institution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution Name</FormLabel>
                <FormControl>
                  <Input placeholder="General Hospital..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="institutionAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Health St..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* File Upload Area */}
      <FormField
        control={form.control}
        name="file"
        render={({ field: { value, onChange, ...fieldProps } }) => (
          <FormItem>
            <FormLabel>Upload License Document (PDF/JPG, Max 5MB)</FormLabel>
            <FormControl>
              <div className="border-2 border-dashed border-input hover:bg-muted/50 transition-colors rounded-lg p-8 text-center cursor-pointer relative">
                <Input
                  {...fieldProps}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => handleFileChange(e, onChange)}
                />
                <div className="flex flex-col items-center gap-2">
                  {value ? (
                    <div className="flex items-center gap-2 text-primary">
                      <CheckCircle2 className="w-8 h-8" />
                      <div className="text-sm font-medium">{value.name}</div>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Drag & drop or click to upload
                      </p>
                    </>
                  )}
                </div>
              </div>
            </FormControl>
            {preview && (
              <div className="mt-4 relative w-24 h-24 rounded-md overflow-hidden border">
                <img
                  src={preview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => {
                    onChange(null);
                    setPreview(null);
                  }}
                  className="absolute top-0 right-0 bg-destructive text-white p-0.5 rounded-bl"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-end gap-3">
        {/* onSubmit is handled by the parent's generic handler, passed here as prop */}
        <Button type="submit">Next Step</Button>
      </div>
    </form>
  );
}

// --- STEP 3: CONTACT ---
export function Step3Contact({ form, onSubmit }: StepProps) {
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300"
    >
      <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-md flex gap-3 text-blue-700 dark:text-blue-300 text-sm">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <p>
          Please use your official institutional email (e.g., name@hospital.org
          or name@university.edu) to speed up verification.
        </p>
      </div>

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Professional Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="dr.doe@hospital.org"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="+1234567890" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="linkedin"
        render={({ field }) => (
          <FormItem>
            <FormLabel>LinkedIn Profile (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="https://linkedin.com/in/..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="website"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Professional Website (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="https://..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-end gap-3">
        <Button type="submit">Next Step</Button>
      </div>
    </form>
  );
}

// --- STEP 4: REVIEW ---
export function Step4Review({ form, onSubmit }: StepProps & { allData: any }) {
  const { allData } = form.getValues(); // Or pass via props

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300"
    >
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Full Name</p>
              <p className="font-medium">{allData?.fullName}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Title</p>
              <p className="font-medium">{allData?.title}</p>
            </div>
            <div>
              <p className="text-muted-foreground">License Number</p>
              <p className="font-medium">{allData?.licenseNumber}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium">{allData?.email}</p>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground">File</p>
              <p className="font-medium text-green-600 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {allData?.file?.name || 'Ready to upload'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <FormField
        control={form.control}
        name="agreement"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                I certify that all information provided is accurate and I agree
                to the terms of service.
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <div className="flex justify-end gap-3">
        <Button type="submit">Submit Application</Button>
      </div>
    </form>
  );
}
