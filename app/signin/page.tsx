"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

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
  const [shakeBtn, setShakeBtn] = useState(false);

  const triggerShake = useCallback(() => {
    setShakeBtn(true);
    setTimeout(() => setShakeBtn(false), 600);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: SignInFormValues) => {
    setIsLoading(true);
    setGlobalError(null);

    // Mock network request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock: trigger a server-side auth error for this specific test email.
    if (data.email === "error@test.com") {
      setGlobalError("Incorrect email or password. Please try again.");
      setIsLoading(false);
      triggerShake();
      return;
    }

    // On success, redirect
    router.push("/dashboard");
  };

  const onInvalidSubmit = useCallback(() => {
    triggerShake();
  }, [triggerShake]);

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
        {!forgotPasswordMode && (
          <ErrorMessage
            message={globalError}
            onDismiss={() => setGlobalError(null)}
            className="mb-6"
          />
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
                className="text-sm font-medium text-muted hover:text-terra transition-colors focus:outline-none focus:underline cursor-pointer"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onSubmit, onInvalidSubmit)} className="space-y-5" noValidate>
            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className={`text-earth font-medium flex items-center gap-1.5 ${errors.email ? "text-[#7a2e0e]" : ""}`}
              >
                Email
                {errors.email && (
                  <AlertCircle className="w-3.5 h-3.5 text-[#b84e20]" aria-hidden="true" />
                )}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register("email")}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full transition-shadow duration-200 ${errors.email ? "border-[#b84e20] ring-2 ring-[#b84e20]/20 focus-visible:ring-[#b84e20]/30" : ""}`}
              />
              <ErrorMessage
                id="email-error"
                message={errors.email?.message}
                size="sm"
                className="mt-1"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className={`text-earth font-medium flex items-center gap-1.5 ${errors.password ? "text-[#7a2e0e]" : ""}`}
                >
                  Password
                  {errors.password && (
                    <AlertCircle className="w-3.5 h-3.5 text-[#b84e20]" aria-hidden="true" />
                  )}
                </Label>
                <button
                  type="button"
                  onClick={() => {
                    setGlobalError(null);
                    setForgotPasswordMode(true);
                  }}
                  className="text-sm text-terra hover:text-earth font-medium transition-colors focus:outline-none focus:underline cursor-pointer"
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
                  className={`w-full pr-10 transition-shadow duration-200 ${errors.password ? "border-[#b84e20] ring-2 ring-[#b84e20]/20 focus-visible:ring-[#b84e20]/30" : ""}`}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-earth transition-colors focus:outline-none cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <ErrorMessage
                id="password-error"
                message={errors.password?.message}
                size="sm"
                className="mt-1"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-terra hover:bg-earth text-white rounded-full py-6 mt-2 text-base font-medium transition-all ${
                shakeBtn ? "animate-[shake_0.5s_ease-in-out]" : ""
              }`}
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
