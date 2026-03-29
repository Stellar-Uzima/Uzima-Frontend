"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CalendarClock, CheckCircle2, Globe2, Languages, MessageSquare } from "lucide-react";

import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import { RatingForm } from "@/components/healers/RatingForm";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbNav } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/StarRating";
import {
  CURRENT_REVIEW_USER,
  canUserReviewHealer,
  getHealerReviewSnapshot,
  hasUserReviewedHealer,
} from "@/lib/mock/healer-reviews";
import { mockHealers } from "@/lib/mock/healers";

function formatReviewDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default function HealerProfilePage() {
  const params = useParams<{ id: string }>();
  const healerId = typeof params?.id === "string" ? params.id : "";

  const healer = useMemo(
    () => mockHealers.find((item) => item.id === healerId),
    [healerId],
  );
  const [reviewState, setReviewState] = useState(() =>
    healerId ? getHealerReviewSnapshot(healerId) : getHealerReviewSnapshot(""),
  );
  const [alreadyReviewed, setAlreadyReviewed] = useState(() =>
    healerId
      ? hasUserReviewedHealer(healerId, CURRENT_REVIEW_USER.id)
      : false,
  );
  const [successMessage, setSuccessMessage] = useState("");

  const canReview = healerId
    ? canUserReviewHealer(healerId, CURRENT_REVIEW_USER.id)
    : false;

  useEffect(() => {
    if (!healerId) {
      return;
    }

    setReviewState(getHealerReviewSnapshot(healerId));
    setAlreadyReviewed(hasUserReviewedHealer(healerId, CURRENT_REVIEW_USER.id));
    setSuccessMessage("");
  }, [healerId]);

  if (!healer) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-cream pt-32">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="rounded-3xl border border-terra/15 bg-white p-10 text-center shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-terra">
                Healer profile
              </p>
              <h1 className="mt-3 font-serif text-3xl font-bold text-earth">
                Healer not found
              </h1>
              <p className="mt-3 text-sm text-muted">
                This healer profile may have moved or is no longer available.
              </p>
              <Button asChild className="mt-6 rounded-full bg-terra text-white hover:bg-earth">
                <Link href="/healers">Back to directory</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-cream pt-32 pb-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6">
          <BreadcrumbNav
            items={[
              { label: "Home", href: "/" },
              { label: "Healers", href: "/healers" },
              { label: healer.name },
            ]}
          />

          <section className="overflow-hidden rounded-[2rem] bg-earth text-cream shadow-sm">
            <div className="relative px-6 py-8 sm:px-10 sm:py-10">
              <div
                className="pointer-events-none absolute inset-0 opacity-80"
                style={{
                  background:
                    "radial-gradient(circle at top left, rgba(240,192,80,0.2), transparent 40%), radial-gradient(circle at bottom right, rgba(184,78,32,0.45), transparent 48%)",
                }}
              />

              <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge className="rounded-full border-gold/40 bg-gold/15 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-gold">
                      Traditional healer
                    </Badge>
                    {healer.isVerified ? (
                      <Badge className="rounded-full border-emerald-300/25 bg-emerald-300/15 px-3 py-1 text-[11px] text-emerald-100">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Verified by Stellar Uzima
                      </Badge>
                    ) : null}
                  </div>

                  <div className="space-y-3">
                    <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
                      {healer.name}
                    </h1>
                    <p className="max-w-2xl text-sm leading-relaxed text-cream/85 sm:text-base">
                      Trusted community healer serving {healer.country} with
                      culturally grounded care, practical guidance, and
                      consultation support in local languages.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {healer.specialties.map((specialty) => (
                      <Badge
                        key={specialty}
                        className="rounded-full border border-cream/15 bg-cream/10 px-3 py-1 text-cream"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="w-full max-w-sm rounded-3xl border border-cream/10 bg-white/10 p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-amber-300">
                    <StarRating rating={reviewState.averageRating} className="gap-1" />
                    <span className="text-3xl font-bold text-white">
                      {reviewState.averageRating.toFixed(1)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-cream/80">
                    Based on {reviewState.reviewCount} community reviews
                  </p>

                  <div className="mt-5 grid gap-3 text-sm text-cream/85">
                    <div className="flex items-center gap-2">
                      <Globe2 className="h-4 w-4 text-gold" />
                      <span>
                        {healer.country} · {healer.region}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Languages className="h-4 w-4 text-gold" />
                      <span>{healer.languages.join(", ")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarClock className="h-4 w-4 text-gold" />
                      <span>Consultation reviews sorted by most recent</span>
                    </div>
                  </div>

                  <Button asChild className="mt-6 w-full rounded-full bg-gold text-earth hover:bg-cream">
                    <Link href={`/services/consultations?healer=${healer.id}`}>
                      Book session
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
            <div className="space-y-6">
              {successMessage ? (
                <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
                  {successMessage}
                </div>
              ) : null}

              <section className="rounded-3xl border border-terra/15 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-terra" />
                  <h2 className="text-xl font-semibold text-earth">
                    Community reviews
                  </h2>
                </div>
                <p className="mt-2 text-sm text-muted">
                  Recent feedback from people who completed a consultation with
                  this healer.
                </p>

                <div className="mt-6 space-y-4">
                  {reviewState.reviews.length > 0 ? (
                    reviewState.reviews.map((review) => (
                      <article
                        key={review.id}
                        className="rounded-3xl border border-terra/10 bg-cream/60 p-5"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="font-semibold text-earth">
                              {review.userName}
                            </p>
                            <p className="mt-1 text-sm text-muted">
                              {formatReviewDate(review.createdAt)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-amber-600">
                            <StarRating rating={review.rating} />
                            <span className="font-semibold text-earth">
                              {review.rating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                        <p className="mt-4 text-sm leading-7 text-earth/85">
                          {review.comment}
                        </p>
                      </article>
                    ))
                  ) : (
                    <div className="rounded-3xl border border-dashed border-terra/20 bg-white p-6 text-sm text-muted">
                      No reviews yet. Complete a consultation to leave the first
                      review.
                    </div>
                  )}
                </div>
              </section>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
              <RatingForm
                healerId={healer.id}
                canReview={canReview}
                alreadyReviewed={alreadyReviewed}
                onReviewSubmitted={(snapshot) => {
                  setReviewState(snapshot);
                  setAlreadyReviewed(true);
                  setSuccessMessage(
                    snapshot.message || "Thanks for sharing your experience.",
                  );
                }}
              />

              <div className="rounded-3xl border border-terra/15 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-earth">
                  Reviewing as {CURRENT_REVIEW_USER.name}
                </p>
                <p className="mt-2 text-sm text-muted">
                  Reviews are only enabled for completed consultations and each
                  member can review a healer once.
                </p>
              </div>
            </aside>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
