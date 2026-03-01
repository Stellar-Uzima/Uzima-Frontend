"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormValues) => {
    setIsLoading(true);
    setGlobalError(null);

    // Mock network request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock validation
    // Simulate error state if not specific credentials, but wait,
    // "On success (mock), redirect to /dashboard" -> any credentials succeed, except let's make it consistent.
    // If they type a wrong credential, error out. Let's make "test@example.com" + "password" the success one?
    // The requirement says "Error state: 'Incorrect email or password' shown as banner under heading"
    // I will mock success for any input except if email is exactly "error@test.com" to easily show the error state.
    if (data.email === "error@test.com") {
      setGlobalError("Incorrect email or password");
      setIsLoading(false);
      return;
    }

    // On success, redirect
    router.push("/dashboard");
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setForgotPasswordMode(false);
    // Returning to login state after mock email sent
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4 py-12">
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl border border-terra/10 p-8 sm:p-10">
        
        {/* Logo and Heading */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2.5 no-underline mb-6 focus:outline-none focus:ring-2 focus:ring-terra/30 rounded-full" aria-label="Go to homepage">
            <div className="w-10 h-10 rounded-full bg-terra flex items-center justify-center text-gold text-base font-semibold">
              ★
            </div>
          </Link>
          <h1 className="font-serif font-bold text-earth text-2xl sm:text-3xl tracking-tight text-center">
            {forgotPasswordMode ? "Reset Password" : "Welcome back"}
          </h1>
        </div>

        {/* Global Error Banner */}
        {globalError && !forgotPasswordMode && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 flex items-start gap-3 text-sm border border-red-100" role="alert" aria-live="assertive">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
            <span className="font-medium">{globalError}</span>
          </div>
        )}

        {forgotPasswordMode ? (
          <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="reset-email" className="text-earth font-medium">Email Address</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full"
                autoComplete="email"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-terra hover:bg-earth text-white rounded-full py-6 text-base font-medium transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setForgotPasswordMode(false)}
                className="text-sm font-medium text-muted hover:text-terra transition-colors focus:outline-none focus:underline"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-earth font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register("email")}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="w-full"
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-red-500 mt-1" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-earth font-medium">Password</Label>
                <button
                  type="button"
                  onClick={() => {
                    setGlobalError(null);
                    setForgotPasswordMode(true);
                  }}
                  className="text-sm text-terra hover:text-earth font-medium transition-colors focus:outline-none focus:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...register("password")}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-earth transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-sm text-red-500 mt-1" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-terra hover:bg-earth text-white rounded-full py-6 mt-2 text-base font-medium transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            {/* Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-terra/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-muted font-medium">or</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-earth">
                Don't have an account?{" "}
                <Link href="/signup" className="text-terra hover:text-earth font-semibold transition-colors">
                  Sign up free &rarr;
                </Link>
              </p>
            </div>

            {/* Small note */}
            <div className="text-center mt-6 pt-6 mb-2">
              <p className="text-[13px] text-muted font-medium">
                Your XLM balance will be waiting for you 🌍
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
