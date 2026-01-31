'use client';

import { useEffect, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Upload, X, AlertCircle } from 'lucide-react';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RichTextEditor } from '../rich-text-editor';
import { validateImage } from '@/lib/schemas/patient-onboarding';
import type { PatientOnboardingFormData } from '@/lib/schemas/patient-onboarding';

interface FirstQuestionStepProps {
  form: UseFormReturn<PatientOnboardingFormData>;
}

const QUESTION_CATEGORIES = [
  'General Health',
  'Nutrition',
  'Mental Health',
  'Pediatrics',
  'Women\'s Health',
  'Men\'s Health',
  'Chronic Conditions',
  'Medications',
  'Preventive Care',
  'Other',
];

const URGENCY_LEVELS = [
  { value: 'low', label: 'Low', description: 'General inquiry, no urgency' },
  { value: 'medium', label: 'Medium', description: 'Would like an answer soon' },
  { value: 'high', label: 'High', description: 'Needs attention within 24 hours' },
  { value: 'emergency', label: 'Emergency', description: 'Requires immediate attention' },
];

export function FirstQuestionStep({ form }: FirstQuestionStepProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const images = form.watch('firstQuestion.images') || [];

  // Auto-focus first field on mount
  useEffect(() => {
      const timer = setTimeout(() => {
        const firstInput = document.querySelector(
          'input[name="firstQuestion.title"]'
        ) as HTMLInputElement;
        firstInput?.focus();
      }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const currentImages = images || [];
    const newImages: File[] = [];

    files.forEach((file) => {
      if (currentImages.length + newImages.length >= 3) {
        return;
      }

      const error = validateImage(file);
      if (error) {
        form.setError('firstQuestion.images', { type: 'manual', message: error });
        return;
      }

      newImages.push(file);
    });

    if (newImages.length > 0) {
      form.setValue('firstQuestion.images', [...currentImages, ...newImages]);
      form.clearErrors('firstQuestion.images');
    }
  };

  const removeImage = (index: number) => {
    const current = images || [];
    form.setValue('firstQuestion.images', current.filter((_, i) => i !== index));
  };

  const getImagePreview = (file: File): string => {
    return URL.createObjectURL(file);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Ask Your First Question</h2>
        <p className="text-muted-foreground mt-1">
          Share your health question with our verified professionals
        </p>
      </div>

      <div className="space-y-4">
        {/* Category */}
        <FormField
          control={form.control}
          name="firstQuestion.category"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="category">
                Category <span className="text-destructive">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {QUESTION_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the category that best fits your question
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Question Title */}
        <FormField
          control={form.control}
          name="firstQuestion.title"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="title">
                Question Title <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  id="title"
                  placeholder="Brief summary of your question"
                  maxLength={100}
                  {...field}
                  value={field.value || ''}
                  aria-describedby="title-description title-error"
                />
              </FormControl>
              <FormDescription id="title-description">
                {field.value?.length || 0} / 100 characters (minimum 10)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Question Description */}
        <FormField
          control={form.control}
          name="firstQuestion.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">
                Detailed Description <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <RichTextEditor
                  content={field.value || ''}
                  onChange={field.onChange}
                  placeholder="Provide details about your question, symptoms, or concerns..."
                  maxLength={1000}
                />
              </FormControl>
              <FormDescription>
                Minimum 50 characters. Include relevant details to help professionals understand your question.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload */}
        <FormField
          control={form.control}
          name="firstQuestion.images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Images (Optional)</FormLabel>
              <FormDescription>
                You can upload up to 3 images (JPG or PNG, max 5MB each)
              </FormDescription>
              <FormControl>
                <div className="space-y-4">
                  {/* Upload Zone */}
                  {(!images || images.length < 3) && (
                    <div
                      className={cn(
                        'border-2 border-dashed rounded-lg p-6 text-center transition-colors',
                        dragActive
                          ? 'border-primary bg-primary/5'
                          : 'border-muted-foreground/25 hover:border-primary/50'
                      )}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Upload className="mx-auto size-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop images here, or{' '}
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-primary underline hover:text-primary/80"
                        >
                          browse
                        </button>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        JPG or PNG, max 5MB each
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        multiple
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </div>
                  )}

                  {/* Image Previews */}
                  {images && images.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {images.map((file, index) => (
                        <div
                          key={index}
                          className="relative group border rounded-lg overflow-hidden"
                        >
                          <img
                            src={getImagePreview(file)}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 size-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label={`Remove image ${index + 1}`}
                          >
                            <X className="size-4" />
                          </button>
                          <div className="p-2 text-xs text-muted-foreground truncate">
                            {file.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Urgency Level */}
        <FormField
          control={form.control}
          name="firstQuestion.urgency"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                Urgency Level <span className="text-destructive">*</span>
              </FormLabel>
              <FormDescription>
                Select how urgent your question is
              </FormDescription>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-2"
                >
                  {URGENCY_LEVELS.map((level) => (
                    <div
                      key={level.value}
                      className={cn(
                        'flex items-start space-x-3 p-3 border rounded-lg',
                        field.value === level.value && 'border-primary bg-primary/5'
                      )}
                    >
                      <RadioGroupItem
                        value={level.value}
                        id={`urgency-${level.value}`}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor={`urgency-${level.value}`}
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          {level.label}
                        </label>
                        <p className="text-xs text-muted-foreground mt-1">
                          {level.description}
                        </p>
                      </div>
                      {level.value === 'emergency' && (
                        <AlertCircle className="size-4 text-destructive" />
                      )}
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Privacy Setting */}
        <FormField
          control={form.control}
          name="firstQuestion.isPrivate"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel htmlFor="isPrivate" className="text-base">
                  Private Consultation
                </FormLabel>
                <FormDescription>
                  Keep your question private (only visible to you and responding professionals)
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  id="isPrivate"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
