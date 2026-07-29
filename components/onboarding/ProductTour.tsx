"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

export const ONBOARDING_STORAGE_KEY = "uzima:onboarding-complete";
export const TOUR_QUERY_PARAM = "tour";

interface TourStep {
  target: string;
  title: string;
  description: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    target: '[data-tour="dashboard-overview"]',
    title: "Welcome to your Dashboard",
    description:
      "This is your home base — track today's progress, your streak, and how much XLM you've earned so far.",
  },
  {
    target: '[data-tour="nav-tasks"]',
    title: "Browse Tasks",
    description:
      "Complete simple daily health tasks like logging water intake or a workout to start earning XLM rewards.",
  },
  {
    target: '[data-tour="nav-healers"]',
    title: "Healers Directory",
    description:
      "Need guidance? Find and connect with verified traditional and modern healers in the directory.",
  },
  {
    target: '[data-tour="connect-wallet"]',
    title: "Connect Your Wallet",
    description:
      "Link a Stellar wallet here to receive the XLM you earn from completing tasks.",
  },
];

function getElementRect(selector: string): DOMRect | null {
  const el = document.querySelector(selector);
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) return null;
  return rect;
}

export function ProductTour() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (searchParams.get(TOUR_QUERY_PARAM) === "1") {
      setStepIndex(0);
      setIsOpen(true);
      router.replace(pathname);
      return;
    }

    if (localStorage.getItem(ONBOARDING_STORAGE_KEY) !== "true") {
      setStepIndex(0);
      setIsOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const measure = useCallback(() => {
    if (!isOpen) return;
    const step = TOUR_STEPS[stepIndex];
    setRect(getElementRect(step.target));
  }, [isOpen, stepIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const step = TOUR_STEPS[stepIndex];
    const el = document.querySelector(step.target);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });

    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [isOpen, stepIndex, measure]);

  const finish = useCallback(() => {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, "true");
    setIsOpen(false);
    setRect(null);
  }, []);

  const goNext = useCallback(() => {
    if (stepIndex >= TOUR_STEPS.length - 1) {
      finish();
      return;
    }
    setStepIndex((i) => i + 1);
  }, [stepIndex, finish]);

  const goBack = useCallback(() => {
    setStepIndex((i) => Math.max(0, i - 1));
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") finish();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goBack();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, finish, goNext, goBack]);

  if (!mounted || !isOpen) return null;

  const step = TOUR_STEPS[stepIndex];
  const isLastStep = stepIndex === TOUR_STEPS.length - 1;
  const padding = 8;

  const spotlightStyle: CSSProperties = rect
    ? {
        position: "fixed",
        top: rect.top - padding,
        left: rect.left - padding,
        width: rect.width + padding * 2,
        height: rect.height + padding * 2,
        borderRadius: 12,
        boxShadow: "0 0 0 9999px rgba(15, 15, 15, 0.65)",
        transition: "all 0.2s ease-out",
        pointerEvents: "none",
      }
    : {
        position: "fixed",
        inset: 0,
        background: "rgba(15, 15, 15, 0.65)",
      };

  const cardStyle: CSSProperties = rect
    ? {
        position: "fixed",
        top: Math.min(rect.bottom + padding + 12, window.innerHeight - 200),
        left: Math.min(
          Math.max(rect.left, 16),
          window.innerWidth - 336,
        ),
      }
    : {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={step.title}
      className="fixed inset-0 z-[100]"
    >
      <div style={spotlightStyle} onClick={finish} aria-hidden="true" />

      <div
        style={cardStyle}
        className="w-[320px] rounded-xl border bg-popover p-5 text-popover-foreground shadow-xl"
      >
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-terra">
            Step {stepIndex + 1} of {TOUR_STEPS.length}
          </p>
          <button
            type="button"
            onClick={finish}
            aria-label="Skip tour"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <h3 className="mt-2 text-base font-semibold text-foreground">
          {step.title}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {step.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={finish}>
            Skip
          </Button>

          <div className="flex items-center gap-2">
            {stepIndex > 0 && (
              <Button type="button" variant="outline" size="sm" onClick={goBack}>
                Back
              </Button>
            )}
            <Button type="button" size="sm" onClick={goNext}>
              {isLastStep ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
