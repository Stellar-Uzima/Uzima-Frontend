"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowLeft,
  Camera,
  CheckCircle2,
  ClipboardList,
  Coins,
  Droplets,
  FileImage,
  Footprints,
  Leaf,
  Loader2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TaskCommunity } from "@/components/tasks/TaskCommunity";
import type { HealthTask } from "@/lib/mock/tasks";
import { BreadcrumbNav } from "@/components/ui/breadcrumb";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

interface TaskDetailPageProps {
  task: HealthTask;
}

function getTaskIcon(task: HealthTask) {
  const lowerTitle = task.title.toLowerCase();

  if (lowerTitle.includes("hydration") || lowerTitle.includes("water")) {
    return <Droplets className="h-7 w-7 text-terra" aria-hidden="true" />;
  }

  if (lowerTitle.includes("walk") || task.category === "Exercise") {
    return <Footprints className="h-7 w-7 text-terra" aria-hidden="true" />;
  }

  if (task.category === "Traditional Medicine" || task.isTraditional) {
    return <Leaf className="h-7 w-7 text-terra" aria-hidden="true" />;
  }

  return <Activity className="h-7 w-7 text-terra" aria-hidden="true" />;
}

export function TaskDetailPage({ task }: TaskDetailPageProps) {
  const router = useRouter();

  const [isCompleted, setIsCompleted] = useState(false);
  const [isMarkingComplete, setIsMarkingComplete] = useState(false);
  const [isSubmittingProof, setIsSubmittingProof] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleBack = () => {
    router.back();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    setUploadError(null);

    if (!selectedFile) {
      setFile(null);
      setPreviewUrl(null);
      return;
    }

    const isValidType =
      selectedFile.type === "image/jpeg" || selectedFile.type === "image/png";
    if (!isValidType) {
      setUploadError("Please upload a JPG or PNG image.");
      setFile(null);
      setPreviewUrl(null);
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      setUploadError("Image must be 5MB or smaller.");
      setFile(null);
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setFile(selectedFile);
    setPreviewUrl(url);
  };

  const handleSelfReportComplete = async () => {
    if (isCompleted || isMarkingComplete) return;

    setIsMarkingComplete(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsMarkingComplete(false);
    setIsCompleted(true);
  };

  const handleSubmitProof = async () => {
    if (isCompleted || isSubmittingProof) return;

    if (!file) {
      setUploadError("Please upload a JPG or PNG image before submitting.");
      return;
    }

    setUploadError(null);
    setIsSubmittingProof(true);

    await new Promise((resolve) => setTimeout(resolve, 900));

    setIsSubmittingProof(false);
    setIsCompleted(true);
  };

  const proofTypeLabel =
    task.proofType === "photo" ? "Photo required" : "Self report";

  const ProofIcon = task.proofType === "photo" ? Camera : ClipboardList;

  const isPhotoTask = task.proofType === "photo";

  return (
    <main className="min-h-screen bg-cream">
      <div className="pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <BreadcrumbNav
            items={[
              { label: "Home", href: "/" },
              { label: "Health Tasks", href: "/tasks" },
              { label: task.title },
            ]}
          />

          <div className="max-w-7xl mx-auto space-y-6">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-earth transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Tasks</span>
            </button>

          {/* HEADER SECTION */}
          <section className="rounded-3xl border border-terra/10 bg-white px-5 py-6 sm:px-8 sm:py-7 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-terra/10 shrink-0">
                {getTaskIcon(task)}
              </div>

              <div className="flex-1 min-w-0 space-y-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-earth leading-tight break-words">
                  {task.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge
                    className={cn(
                      "text-xs font-semibold rounded-full px-3 py-1",
                      "bg-terra/10 text-terra",
                    )}
                  >
                    {task.category}
                  </Badge>

                  <Badge
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border-0 px-3 py-1 text-xs font-bold tabular-nums shrink-0",
                      "bg-gold/15 text-gold",
                    )}
                  >
                    <Coins className="h-3.5 w-3.5" />
                    {task.rewardXLM} XLM
                  </Badge>

                  <Badge
                    variant="outline"
                    className="inline-flex items-center gap-1.5 rounded-full border-earth/10 bg-cream text-xs font-medium text-earth shrink-0"
                  >
                    <ProofIcon className="h-3.5 w-3.5 text-terra" />
                    {proofTypeLabel}
                  </Badge>
                </div>
              </div>
            </div>
          </section>

          {/* MAIN CONTENT AREA: 
              - flex-col for 390px and 768px (Tablet)
              - lg:flex-row for 1024px+ (Desktop)
          */}
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            
            {/* LEFT COLUMN: 60% on Desktop, Full on Tablet */}
            <div className="w-full lg:w-[60%] space-y-6">
              <section className="rounded-3xl border border-terra/10 bg-[#FFFDF5] p-5 sm:p-6">
                <h2 className="mb-2 text-sm font-semibold tracking-wide text-terra uppercase">
                  Why this matters
                </h2>
                <p className="text-sm leading-relaxed text-earth/80">
                  {task.whyItMatters}
                </p>
              </section>

              <section className="rounded-3xl border border-terra/10 bg-white p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold tracking-wide text-terra uppercase">
                    Step-by-step instructions
                  </h2>
                  <Badge className="bg-terra/10 text-terra text-[11px] rounded-full px-2.5 py-1">
                    {task.steps.length} steps
                  </Badge>
                </div>

                <ol className="space-y-3">
                  {task.steps.map((step, index) => (
                    <li
                      key={index}
                      className="flex gap-3 rounded-2xl bg-cream/80 p-3.5"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-earth text-cream text-xs font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <p className="text-sm font-semibold text-earth">
                          {step.title}
                        </p>
                        {step.description && (
                          <p className="text-xs leading-relaxed text-muted">
                            {step.description}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            {/* RIGHT COLUMN: 40% on Desktop, Full on Tablet */}
            <div className="w-full lg:w-[40%] space-y-6 lg:sticky lg:top-28">
              {task.isTraditional && (
                <div className="rounded-3xl border border-terra/20 bg-cream p-4 flex items-start gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-terra/10 text-terra">
                    <Leaf className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-earth">
                      This task is rooted in {task.culture ?? "African"} healing
                      tradition.
                    </p>
                    <p className="text-xs text-muted">
                      Keep traditional knowledge alive while using simple tracking.
                    </p>
                  </div>
                </div>
              )}

              <section className="rounded-3xl border border-terra/10 bg-white p-5 sm:p-6 space-y-5 shadow-sm">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <h2 className="text-sm font-semibold tracking-wide text-terra uppercase">
                      Complete this task
                    </h2>
                    <p className="mt-1 text-xs text-muted">
                      {isPhotoTask
                        ? "Upload a clear photo before submitting."
                        : "Confirm you completed the steps honestly."}
                    </p>
                  </div>

                  <Badge className="bg-gold/10 text-gold text-[11px] rounded-full px-2.5 py-1 flex items-center gap-1.5 shrink-0">
                    <Coins className="h-3.5 w-3.5" />+{task.rewardXLM} XLM
                  </Badge>
                </div>

                {isPhotoTask && (
                  <div className="space-y-3">
                    <label className="block">
                      <span className="sr-only">Upload photo proof</span>
                      <div className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-dashed border-terra/30 bg-cream/80 px-4 py-3 hover:border-terra/60 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-terra/10 text-terra">
                            <Camera className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-earth">
                              Upload photo proof
                            </p>
                            <p className="text-[11px] text-muted">
                              JPG or PNG, up to 5MB
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-[11px] border-terra/30 bg-white"
                        >
                          Choose file
                        </Badge>
                      </div>
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={handleFileChange}
                        className="sr-only"
                        disabled={isCompleted || isSubmittingProof}
                      />
                    </label>

                    <ErrorMessage
                      message={uploadError}
                      onDismiss={() => setUploadError(null)}
                      size="sm"
                    />

                    {previewUrl && (
                      <div className="mt-2 flex">
                        <div className="inline-flex flex-col items-center rounded-2xl border border-terra/15 bg-cream/90 p-3">
                          <div className="relative">
                            <img
                              src={previewUrl}
                              alt="Photo preview"
                              className="h-20 w-20 rounded-xl object-cover border border-terra/20"
                            />
                            <div className="absolute -top-2 -left-2 flex h-7 w-7 items-center justify-center rounded-full bg-earth/90 text-cream shadow">
                              <FileImage className="h-4 w-4" />
                            </div>
                          </div>
                          <p className="mt-2 max-w-[8.5rem] truncate text-[11px] font-medium text-earth">
                            {file?.name}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-4">
                  <Button
                    type="button"
                    onClick={isPhotoTask ? handleSubmitProof : handleSelfReportComplete}
                    disabled={isCompleted || isMarkingComplete || isSubmittingProof}
                    className="w-full rounded-2xl bg-terra text-white text-sm font-semibold hover:bg-earth transition-colors disabled:opacity-70"
                  >
                    {isCompleted
                      ? "Task completed"
                      : (isMarkingComplete || isSubmittingProof)
                        ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting…</>)
                        : isPhotoTask ? "Submit photo & complete" : "Mark Complete"}
                  </Button>

                  <p className="text-[11px] text-muted leading-tight">
                    By completing this task, you confirm the information provided is honest.
                  </p>
                </div>

                {isCompleted && (
                  <div className="mt-4 rounded-2xl border border-gold/40 bg-gold/10 px-4 py-3 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-amber-400 shadow-lg animate-bounce">
                        <Coins className="h-5 w-5 text-earth" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-earth">
                          You earned {task.rewardXLM} XLM
                        </p>
                        <p className="text-[11px] text-earth/80">
                          Reward will appear in your balance shortly.
                        </p>
                      </div>
                    </div>
                    {previewUrl && (
                      <div className="mt-2 flex">
                        <div className="inline-flex flex-col items-center rounded-2xl border border-terra/15 bg-cream/90 p-3 sm:p-4">
                          <div className="relative">
                            <Image
                              src={previewUrl ?? ""}
                              alt="Uploaded photographic proof for the task"
                              width={96}
                              height={96}
                              unoptimized
                              loading="lazy"
                              className="h-20 w-20 rounded-xl border border-terra/20 object-cover sm:h-24 sm:w-24"
                            />
                            <div className="absolute -top-2 -left-2 flex h-7 w-7 items-center justify-center rounded-full bg-earth/90 text-cream shadow">
                              <FileImage className="h-4 w-4" />
                            </div>
                          </div>
                          <p className="mt-2 max-w-[8.5rem] truncate text-[11px] font-medium text-earth">
                            {file?.name}
                          </p>
                        </div>
                      </div>
                    )}
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="w-full rounded-full border-gold/60 text-gold hover:bg-gold/10 text-xs font-semibold"
                      onClick={() => router.push("/services/xlm-rewards")}
                    >
                      <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                      View Reward
                    </Button>
                  </div>
                )}
              </section>
            </div>
          </div>
          </div>
        </div>
      </div>
    </main>
  );
}
