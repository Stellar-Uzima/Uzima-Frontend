"use client";

import { useMemo, useState } from "react";
import { Loader2, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface RatingFormProps {
  healerId: string;
  canReview: boolean;
  alreadyReviewed: boolean;
  onReviewSubmitted: (snapshot: {
    averageRating: number;
    reviewCount: number;
    reviews: Array<{
      id: string;
      healerId: string;
      userId: string;
      userName: string;
      rating: number;
      comment: string;
      createdAt: string;
    }>;
    message?: string;
  }) => void;
}

type FormErrors = {
  rating?: string;
  comment?: string;
  submit?: string;
};

export function RatingForm({
  healerId,
  canReview,
  alreadyReviewed,
  onReviewSubmitted,
}: RatingFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const visibleRating = hoveredRating || rating;
  const remainingCharacters = useMemo(
    () => Math.max(0, 20 - comment.trim().length),
    [comment],
  );

  const reviewBlockedMessage = !canReview
    ? "Complete a consultation with this healer before leaving a review."
    : alreadyReviewed
      ? "You've already reviewed this healer."
      : "";

  function validate() {
    const nextErrors: FormErrors = {};

    if (rating < 1) {
      nextErrors.rating = "Select a star rating before submitting.";
    }

    if (comment.trim().length < 20) {
      nextErrors.comment = "Your review must be at least 20 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canReview || alreadyReviewed || submitting) {
      setErrors((current) => ({
        ...current,
        submit: reviewBlockedMessage || "You cannot review this healer yet.",
      }));
      return;
    }

    if (!validate()) {
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      const response = await fetch(`/api/healers/${healerId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          comment: comment.trim(),
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setErrors({
          submit:
            typeof data?.message === "string"
              ? data.message
              : "We couldn't save your review right now.",
        });
        return;
      }

      setRating(0);
      setHoveredRating(0);
      setComment("");
      onReviewSubmitted({
        ...data.snapshot,
        message: "Thanks for sharing your experience.",
      });
    } catch {
      setErrors({
        submit: "We couldn't save your review right now.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl border border-terra/15 bg-white p-6 shadow-sm"
    >
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-earth">Rate this healer</h3>
        <p className="text-sm text-muted">
          Share a rating and a short review to help others choose with
          confidence.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => {
            const starValue = index + 1;
            const isActive = starValue <= visibleRating;

            return (
              <button
                key={starValue}
                type="button"
                className={cn(
                  "rounded-full p-1 transition-transform duration-150",
                  !reviewBlockedMessage && "hover:scale-110 focus-visible:scale-110",
                )}
                onMouseEnter={() => setHoveredRating(starValue)}
                onMouseLeave={() => setHoveredRating(0)}
                onFocus={() => setHoveredRating(starValue)}
                onBlur={() => setHoveredRating(0)}
                onClick={() => !reviewBlockedMessage && setRating(starValue)}
                aria-label={`Rate ${starValue} star${starValue === 1 ? "" : "s"}`}
                disabled={Boolean(reviewBlockedMessage)}
              >
                <Star
                  className={cn(
                    "h-8 w-8",
                    isActive
                      ? "fill-amber-400 text-amber-500"
                      : "text-amber-200",
                  )}
                />
              </button>
            );
          })}
        </div>

        <p className="text-sm text-muted">
          {rating > 0
            ? `${rating} out of 5 selected`
            : "Choose a rating from 1 to 5 stars"}
        </p>
        {errors.rating ? (
          <p className="text-sm text-red-600">{errors.rating}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="review-comment" className="text-sm font-medium text-earth">
          Review
        </label>
        <Textarea
          id="review-comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Tell others what the consultation was like and what made this healer helpful."
          className="min-h-32 border-terra/20 bg-cream/50"
          disabled={Boolean(reviewBlockedMessage) || submitting}
        />
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-muted">
            Minimum 20 characters
          </span>
          <span
            className={cn(
              remainingCharacters > 0 ? "text-amber-700" : "text-emerald-700",
            )}
          >
            {remainingCharacters > 0
              ? `${remainingCharacters} more to go`
              : "Ready to submit"}
          </span>
        </div>
        {errors.comment ? (
          <p className="text-sm text-red-600">{errors.comment}</p>
        ) : null}
      </div>

      {reviewBlockedMessage ? (
        <div className="rounded-2xl border border-terra/15 bg-terra/5 px-4 py-3 text-sm text-earth">
          {reviewBlockedMessage}
        </div>
      ) : null}

      {errors.submit ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errors.submit}
        </div>
      ) : null}

      <Button
        type="submit"
        className="rounded-full bg-terra px-5 text-white hover:bg-earth"
        disabled={Boolean(reviewBlockedMessage) || submitting}
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting review...
          </>
        ) : (
          "Submit review"
        )}
      </Button>
    </form>
  );
}
