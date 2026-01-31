'use client';

import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { X, Plus } from 'lucide-react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { PatientOnboardingFormData } from '@/lib/schemas/patient-onboarding';

interface HealthProfileStepProps {
  form: UseFormReturn<PatientOnboardingFormData>;
}

const ALLERGY_OPTIONS = [
  'Peanuts',
  'Shellfish',
  'Dairy',
  'Eggs',
  'Soy',
  'Wheat',
  'Tree Nuts',
  'Fish',
  'Latex',
  'Penicillin',
  'Aspirin',
  'Other',
  'None',
];

const CHRONIC_CONDITIONS = [
  'Diabetes',
  'Hypertension',
  'Asthma',
  'Heart Disease',
  'Arthritis',
  'COPD',
  'Kidney Disease',
  'Liver Disease',
  'Cancer',
  'Mental Health Condition',
  'Other',
];

export function HealthProfileStep({ form }: HealthProfileStepProps) {
  const [medicationInput, setMedicationInput] = useState('');
  const medications = form.watch('healthProfile.medications');

  // Auto-focus first field on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      // Try to focus the first radio button (gender)
      const firstRadio = document.querySelector(
        'input[type="radio"][name="healthProfile.gender"]'
      ) as HTMLInputElement;
      firstRadio?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const addMedication = () => {
    if (medicationInput.trim()) {
      const current = medications || [];
      if (!current.includes(medicationInput.trim())) {
        form.setValue('healthProfile.medications', [...current, medicationInput.trim()]);
        setMedicationInput('');
      }
    }
  };

  const removeMedication = (index: number) => {
    const current = medications || [];
    form.setValue('healthProfile.medications', current.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Health Profile</h2>
        <p className="text-muted-foreground mt-1">
          Help us understand your health background
        </p>
      </div>

      <div className="space-y-4">
        {/* Gender */}
        <FormField
          control={form.control}
          name="healthProfile.gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                Gender <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="gender-male" />
                    <label
                      htmlFor="gender-male"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Male
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="gender-female" />
                    <label
                      htmlFor="gender-female"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Female
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="gender-other" />
                    <label
                      htmlFor="gender-other"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Other
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="prefer_not_to_say"
                      id="gender-prefer-not-to-say"
                    />
                    <label
                      htmlFor="gender-prefer-not-to-say"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Prefer not to say
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Blood Type */}
        <FormField
          control={form.control}
          name="healthProfile.bloodType"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="bloodType">
                Blood Type <span className="text-destructive">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger id="bloodType">
                    <SelectValue placeholder="Select your blood type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Important for emergency medical care
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Allergies */}
        <FormField
          control={form.control}
          name="healthProfile.allergies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Allergies <span className="text-destructive">*</span>
              </FormLabel>
              <FormDescription>
                Select all that apply. Choose "None" if you have no known allergies.
              </FormDescription>
              <div className="flex flex-wrap gap-2 mt-2">
                {ALLERGY_OPTIONS.map((allergy) => (
                  <div key={allergy} className="flex items-center space-x-2">
                    <Checkbox
                      id={`allergy-${allergy}`}
                      checked={field.value?.includes(allergy)}
                      onCheckedChange={(checked) => {
                        const current = field.value || [];
                        if (checked) {
                          // If "None" is selected, clear others
                          if (allergy === 'None') {
                            field.onChange(['None']);
                          } else {
                            // Remove "None" if another option is selected
                            const filtered = current.filter((a) => a !== 'None');
                            field.onChange([...filtered, allergy]);
                          }
                        } else {
                          field.onChange(current.filter((a) => a !== allergy));
                        }
                      }}
                    />
                    <label
                      htmlFor={`allergy-${allergy}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {allergy}
                    </label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Current Medications */}
        <FormField
          control={form.control}
          name="healthProfile.medications"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="medications">
                Current Medications
              </FormLabel>
              <FormDescription>
                List any medications you're currently taking
              </FormDescription>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    id="medications"
                    placeholder="Enter medication name"
                    value={medicationInput}
                    onChange={(e) => setMedicationInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addMedication();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={addMedication}
                    aria-label="Add medication"
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>
                {medications && medications.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {medications.map((med, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1 px-2 py-1"
                      >
                        {med}
                        <button
                          type="button"
                          onClick={() => removeMedication(index)}
                          className="ml-1 hover:text-destructive"
                          aria-label={`Remove ${med}`}
                        >
                          <X className="size-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Chronic Conditions */}
        <FormField
          control={form.control}
          name="healthProfile.conditions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Chronic Conditions
              </FormLabel>
              <FormDescription>
                Select any chronic conditions you have
              </FormDescription>
              <div className="space-y-2 mt-2">
                {CHRONIC_CONDITIONS.map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox
                      id={`condition-${condition}`}
                      checked={field.value?.includes(condition)}
                      onCheckedChange={(checked) => {
                        const current = field.value || [];
                        if (checked) {
                          field.onChange([...current, condition]);
                        } else {
                          field.onChange(current.filter((c) => c !== condition));
                        }
                      }}
                    />
                    <label
                      htmlFor={`condition-${condition}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {condition}
                    </label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Emergency Contact */}
        <div className="border-t pt-4 space-y-4">
          <h3 className="text-lg font-semibold">Emergency Contact</h3>

          <FormField
            control={form.control}
            name="healthProfile.emergencyContact.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="emergencyContact.name">
                  Contact Name <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    id="emergencyContact.name"
                    placeholder="Full name"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="healthProfile.emergencyContact.phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="emergencyContact.phone">
                  Contact Phone <span className="text-destructive">*</span>
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
                      id: 'emergencyContact.phone',
                      name: 'emergencyContact.phone',
                      'aria-describedby': 'emergencyContact-phone-description emergencyContact-phone-error',
                    }}
                    containerClass="!w-full !relative"
                    inputClass="!w-full !h-9 !rounded-md !border !bg-transparent !px-3 !py-1 !pl-14"
                    buttonClass="!border-r !rounded-l-md"
                    dropdownClass="!z-50"
                  />
                </FormControl>
                <FormDescription id="emergencyContact-phone-description">
                  Include country code (e.g., +1 for US)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="healthProfile.emergencyContact.relationship"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="emergencyContact.relationship">
                  Relationship <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    id="emergencyContact.relationship"
                    placeholder="e.g., Spouse, Parent, Sibling"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
