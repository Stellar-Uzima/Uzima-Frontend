"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// African ISO-3166-1 alpha-2 codes (all 54 UN-recognised countries)
// Set gives O(1) lookup when filtering the country-list dataset.
const AFRICAN_ISO_CODES = new Set([
  "DZ",
  "AO",
  "BJ",
  "BW",
  "BF",
  "BI",
  "CV",
  "CM",
  "CF",
  "TD",
  "KM",
  "CG",
  "CD",
  "CI",
  "DJ",
  "EG",
  "GQ",
  "ER",
  "SZ",
  "ET",
  "GA",
  "GM",
  "GH",
  "GN",
  "GW",
  "KE",
  "LS",
  "LR",
  "LY",
  "MG",
  "MW",
  "ML",
  "MR",
  "MU",
  "MA",
  "MZ",
  "NA",
  "NE",
  "NG",
  "RW",
  "ST",
  "SN",
  "SL",
  "SO",
  "ZA",
  "SS",
  "SD",
  "TZ",
  "TG",
  "TN",
  "UG",
  "ZM",
  "ZW",
]);

const AFRICAN_COUNTRY_NAMES: Record<string, string> = {
  DZ: "Algeria",
  AO: "Angola",
  BJ: "Benin",
  BW: "Botswana",
  BF: "Burkina Faso",
  BI: "Burundi",
  CV: "Cape Verde",
  CM: "Cameroon",
  CF: "Central African Republic",
  TD: "Chad",
  KM: "Comoros",
  CG: "Congo",
  CD: "Democratic Republic of the Congo",
  CI: "Cote d'Ivoire",
  DJ: "Djibouti",
  EG: "Egypt",
  GQ: "Equatorial Guinea",
  ER: "Eritrea",
  SZ: "Eswatini",
  ET: "Ethiopia",
  GA: "Gabon",
  GM: "Gambia",
  GH: "Ghana",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  KE: "Kenya",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libya",
  MG: "Madagascar",
  MW: "Malawi",
  ML: "Mali",
  MR: "Mauritania",
  MU: "Mauritius",
  MA: "Morocco",
  MZ: "Mozambique",
  NA: "Namibia",
  NE: "Niger",
  NG: "Nigeria",
  RW: "Rwanda",
  ST: "Sao Tome and Principe",
  SN: "Senegal",
  SC: "Seychelles",
  SL: "Sierra Leone",
  SO: "Somalia",
  ZA: "South Africa",
  SS: "South Sudan",
  SD: "Sudan",
  TZ: "Tanzania",
  TG: "Togo",
  TN: "Tunisia",
  UG: "Uganda",
  ZM: "Zambia",
  ZW: "Zimbabwe",
};

const AFRICAN_COUNTRIES = Array.from(AFRICAN_ISO_CODES)
  .map((code) => ({ code, name: AFRICAN_COUNTRY_NAMES[code] ?? code }))
  .sort((a, b) => a.name.localeCompare(b.name));

const signUpSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Name must be at least 2 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    country: z.string().min(1, "Please select your country"),

    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),

    terms: z
      .boolean()
      .refine((val) => val === true, "You must accept the terms to continue"),
  })
  // Cross-field check — error is attached to the confirmPassword field
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const router = useRouter();

  // Password visibility toggles — local UI state only, not form state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Async submission state
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  // Initialise react-hook-form with our zod resolver
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      country: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    setIsLoading(true);
    setGlobalError(null);

    // Mock network latency — replace with your real API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock duplicate-email scenario so reviewers can see the global banner
    if (data.email === "taken@example.com") {
      setGlobalError(
        "An account with this email already exists. Try signing in.",
      );
      setIsLoading(false);
      return;
    }

    // Success → redirect to onboarding
    router.push("#");
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-3 rounded-3xl shadow-xl">
      <div className="mb-8">
        <h1 className="font-serif font-bold text-earth text-2xl sm:text-3xl tracking-tight mb-1">
          Create your free account
        </h1>
        <p className="text-muted text-sm">
          Start earning XLM rewards in minutes.
        </p>
      </div>

      {/* ── Global error banner (server-level errors e.g. duplicate email) ── */}
      {globalError && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 flex items-start gap-3 text-sm border border-red-100"
        >
          <AlertCircle
            className="w-5 h-5 shrink-0 mt-0.5 text-red-500"
            aria-hidden="true"
          />
          <span className="font-medium">{globalError}</span>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
          aria-label="Sign up form"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-earth font-medium text-sm">
                  Full Name
                </FormLabel>
                <FormControl>
                                    <Input
                                      placeholder="Legend4tech"
                                      autoComplete="name"
                                      className="rounded-xl"
                                      disabled={isLoading}
                                      {...field}
                                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-earth font-medium text-sm">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="rounded-xl"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country  */}

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-earth font-medium text-sm">
                  Country
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
                  <FormControl>
                    <SelectTrigger className="rounded-xl w-full">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-64 overflow-y-auto">
                    {AFRICAN_COUNTRIES.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password  */}

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-earth font-medium text-sm">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      autoComplete="new-password"
                      className="rounded-xl pr-10"
                      disabled={isLoading}
                      {...field}
                    />
                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-earth transition-colors focus:outline-none focus:ring-2 focus:ring-terra/30 rounded"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <Eye className="w-4 h-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-earth font-medium text-sm">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      className="rounded-xl pr-10"
                      disabled={isLoading}
                      {...field}
                    />
                    <button
                      type="button"
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-earth transition-colors focus:outline-none focus:ring-2 focus:ring-terra/30 rounded"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <Eye className="w-4 h-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Terms & Conditions */}

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-start gap-3">
                  <FormControl>
                    <Checkbox
                      checked={!!field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true)
                      }
                      disabled={isLoading}
                      className="mt-0.5 data-[state=checked]:bg-terra data-[state=checked]:border-terra"
                    />
                  </FormControl>
                  <FormLabel className="text-sm text-muted leading-relaxed cursor-pointer font-normal">
                    By signing up you agree to our{" "}
                    <Link
                      href="/terms"
                      className="text-terra hover:text-earth font-medium underline-offset-2 hover:underline transition-colors"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-terra hover:text-earth font-medium underline-offset-2 hover:underline transition-colors"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit button  */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-terra hover:bg-earth text-white rounded-full py-6 mt-2 text-base font-semibold transition-all hover:shadow-lg hover:shadow-terra/30 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <>
                <Loader2
                  className="mr-2 h-5 w-5 animate-spin"
                  aria-hidden="true"
                />
                Submitting…
              </>
            ) : (
              "Create Account →"
            )}
          </Button>

          {/* Divider  */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-terra/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-muted font-medium">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Sign in link */}
          <div className="text-center">
            <Link
              href="/signin"
              className="text-terra hover:text-earth font-semibold text-sm transition-colors"
            >
              Sign in to your account →
            </Link>
          </div>
        </form>
      </Form>

      {/* Social proof  */}
      <div className="mt-8 pt-6 border-t border-terra/10 text-center">
        <p className="text-xs text-muted font-medium">
          🌍 Join <strong className="text-earth">25,000+ Africans</strong>{" "}
          already earning XLM for their health
        </p>
      </div>
    </div>
  );
}
