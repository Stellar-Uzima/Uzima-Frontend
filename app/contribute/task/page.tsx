"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  ClipboardList,
  Coins,
  Eye,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const taskSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Please provide a more detailed description"),
  category: z.string().min(1, "Category is required"),
  proofType: z.enum(["photo", "self-report"]),
  xlmReward: z
    .number()
    .min(1, "Reward must be at least 1 XLM")
    .max(500, "Maximum limit is 500 XLM"),
  languages: z.string().min(1, "Specify at least one language"),
  references: z.string().optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

export default function HealthTaskForm() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const methods = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      category: "",
      proofType: "photo",
      xlmReward: 5,
      languages: "English",
      references: "",
    },
  });

  const {
    formState: { errors, isValid },
  } = methods;

  useEffect(() => {
    const savedDraft = localStorage.getItem("uzima_task_draft");
    if (savedDraft) methods.reset(JSON.parse(savedDraft));
  }, [methods]);

  useEffect(() => {
    const subscription = methods.watch((value) => {
      localStorage.setItem("uzima_task_draft", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [methods.watch]);

  const onSubmit = (data: TaskFormData) => {
    localStorage.removeItem("uzima_task_draft");
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] animate-in fade-in zoom-in duration-500">
        <div className="bg-green-100 p-4 rounded-full mb-6">
          <CheckCircle2 className="w-16 h-16 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Under Review</h2>
        <p className="text-muted-foreground text-center max-w-sm mb-8">
          Your health task has been queued for verification. Our medical board
          will validate the details within 24-48 hours.
        </p>
        <Button
          onClick={() => {
            setIsSubmitted(false);
            methods.reset();
            setStep(1);
          }}
          size="lg"
        >
          Submit Another Task
        </Button>
      </div>
    );
  }

  const steps = [
    { id: 1, label: "Details", icon: ClipboardList },
    { id: 2, label: "Rewards", icon: Coins },
    { id: 3, label: "Review", icon: Eye },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Stepper UI */}
      <div className="flex items-center justify-center mb-12 gap-4 md:gap-12">
        {steps.map((s) => (
          <div key={s.id} className="flex flex-col items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${step >= s.id ? "bg-primary border-primary text-primary-foreground" : "bg-background border-muted text-muted-foreground"}`}
            >
              <s.icon className="w-5 h-5" />
            </div>
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${step >= s.id ? "text-primary" : "text-muted-foreground"}`}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* FORM SECTION */}
        <div className="lg:col-span-7">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              {step === 1 && (
                <div className="space-y-6 animate-in slide-in-from-left-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Task Title</Label>
                    <Input
                      id="title"
                      {...methods.register("title")}
                      placeholder="e.g., Post-Natal Nutrition Guide"
                      className={errors.title ? "border-destructive" : ""}
                    />
                    {errors.title && (
                      <p className="text-xs text-destructive font-medium">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Medical Guidelines (Markdown Supported)
                    </Label>
                    <Textarea
                      id="description"
                      {...methods.register("description")}
                      className="h-48 resize-none"
                      placeholder="Provide clear, actionable health steps..."
                    />
                    {errors.description && (
                      <p className="text-xs text-destructive font-medium">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Input
                        {...methods.register("category")}
                        placeholder="e.g., Maternal Health"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Proof Verification</Label>
                      <Controller
                        name="proofType"
                        control={methods.control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            <option value="photo">Photo Evidence</option>
                            <option value="self-report">Self-Report Log</option>
                          </select>
                        )}
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full group"
                    disabled={
                      !methods.getValues("title") ||
                      !methods.getValues("description")
                    }
                  >
                    Next: Reward & Languages{" "}
                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-in slide-in-from-right-4">
                  <div className="space-y-4">
                    <Label>Stellar XLM Reward Amount</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {[5, 10, 20, 50].map((val) => (
                        <Button
                          key={val}
                          type="button"
                          variant={
                            methods.watch("xlmReward") === val
                              ? "default"
                              : "outline"
                          }
                          onClick={() =>
                            methods.setValue("xlmReward", val, {
                              shouldValidate: true,
                            })
                          }
                        >
                          {val} XLM
                        </Button>
                      ))}
                    </div>
                    <div className="relative">
                      <Input
                        type="number"
                        {...methods.register("xlmReward", {
                          valueAsNumber: true,
                        })}
                        className="pl-12"
                      />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">
                        XLM
                      </span>
                    </div>
                    {errors.xlmReward && (
                      <p className="text-xs text-destructive font-medium">
                        {errors.xlmReward.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Supported Languages</Label>
                    <Input
                      {...methods.register("languages")}
                      placeholder="English, Swahili, French..."
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setStep(1)}
                      className="flex-1"
                    >
                      <ChevronLeft className="mr-2 w-4 h-4" /> Back
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex-1"
                      disabled={!!errors.xlmReward}
                    >
                      Review Submission
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-in zoom-in-95">
                  <div className="bg-muted/50 p-6 rounded-lg border">
                    <h4 className="font-bold mb-2">Declaration</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      By submitting this task, you certify that the medical
                      information provided is accurate and adheres to Uzima
                      health standards. Tasks found providing harmful advice
                      will lead to account suspension.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setStep(2)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-green-600 hover:bg-green-700 shadow-lg shadow-green-900/20"
                    >
                      Confirm & Submit
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </FormProvider>
        </div>

        {/* PREVIEW SECTION */}
        <div className="lg:col-span-5 sticky top-8">
          <div className="flex items-center gap-2 mb-4 text-primary font-semibold">
            <Eye className="w-4 h-4" /> <span>Live Preview</span>
          </div>
          <Card className="overflow-hidden border-2 border-primary/10 shadow-2xl transition-all">
            <div className="aspect-video bg-muted relative flex items-center justify-center group">
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <Badge className="absolute top-4 left-4 bg-primary/90 uppercase tracking-widest">
                {methods.watch("category") || "Category"}
              </Badge>
              <span className="text-white font-medium z-10 opacity-60 group-hover:opacity-100 transition-opacity underline cursor-default">
                Upload Task Cover Image
              </span>
            </div>
            <CardHeader className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-muted-foreground uppercase">
                  {methods.watch("proofType")} verification
                </span>
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-200 bg-green-50 font-mono font-bold"
                >
                  {methods.watch("xlmReward")} XLM
                </Badge>
              </div>
              <CardTitle className="text-2xl line-clamp-1">
                {methods.watch("title") || "Untitled Task"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed h-20">
                {methods.watch("description") ||
                  "Your task details will appear here as you type..."}
              </p>
            </CardContent>
            <CardFooter className="border-t bg-muted/30 py-3 flex justify-between">
              <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-tighter">
                Availability: {methods.watch("languages")}
              </span>
              <span className="text-[10px] font-bold uppercase text-primary">
                Stellar-Uzima Verified
              </span>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
