import { mockHealers } from "@/lib/mock/healers";

export interface HealerReview {
  id: string;
  healerId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface HealerReviewSnapshot {
  averageRating: number;
  reviewCount: number;
  reviews: HealerReview[];
}

export const CURRENT_REVIEW_USER = {
  id: "current-user",
  name: "Amina Johnson",
};

export const completedConsultationHealerIds = [
  "healer-oluwaseun-balogun",
  "healer-nia-okello",
  "healer-ama-adu",
];

type ReviewStoreRecord = {
  ratingTotal: number;
  reviewCount: number;
  reviews: HealerReview[];
};

const seededRecentReviews: Record<string, HealerReview[]> = {
  "healer-oluwaseun-balogun": [
    {
      id: "review-olu-1",
      healerId: "healer-oluwaseun-balogun",
      userId: "member-kojo",
      userName: "Kojo M.",
      rating: 5,
      comment:
        "Very grounded consultation with practical herbal guidance and clear follow-up steps for my recovery.",
      createdAt: "2026-03-22T10:30:00.000Z",
    },
    {
      id: "review-olu-2",
      healerId: "healer-oluwaseun-balogun",
      userId: "member-zainab",
      userName: "Zainab A.",
      rating: 5,
      comment:
        "He took time to explain the remedy plan in Yoruba and English, which made the whole session feel safe.",
      createdAt: "2026-03-15T18:10:00.000Z",
    },
  ],
  "healer-nia-okello": [
    {
      id: "review-nia-1",
      healerId: "healer-nia-okello",
      userId: "current-user",
      userName: CURRENT_REVIEW_USER.name,
      rating: 5,
      comment:
        "The consultation felt warm and respectful, and the nutrition advice was realistic for my family budget.",
      createdAt: "2026-03-11T08:00:00.000Z",
    },
    {
      id: "review-nia-2",
      healerId: "healer-nia-okello",
      userId: "member-linet",
      userName: "Linet O.",
      rating: 4,
      comment:
        "Helpful postpartum guidance and a calm, thoughtful explanation of each recommendation she made.",
      createdAt: "2026-03-06T14:45:00.000Z",
    },
  ],
  "healer-ama-adu": [
    {
      id: "review-ama-1",
      healerId: "healer-ama-adu",
      userId: "member-esi",
      userName: "Esi D.",
      rating: 5,
      comment:
        "I appreciated how clearly she described the herbs, timing, and food choices that support the treatment.",
      createdAt: "2026-03-18T16:20:00.000Z",
    },
  ],
};

const reviewStore: Record<string, ReviewStoreRecord> = Object.fromEntries(
  mockHealers.map((healer) => [
    healer.id,
    {
      ratingTotal: healer.rating * healer.reviewCount,
      reviewCount: healer.reviewCount,
      reviews: sortReviews(seededRecentReviews[healer.id] ?? []),
    },
  ]),
);

function sortReviews(reviews: HealerReview[]) {
  return [...reviews].sort(
    (left, right) =>
      new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );
}

function roundAverage(value: number) {
  return Math.round(value * 10) / 10;
}

function getOrCreateReviewRecord(healerId: string): ReviewStoreRecord | null {
  const existingRecord = reviewStore[healerId];
  if (existingRecord) {
    return existingRecord;
  }

  const healer = mockHealers.find((item) => item.id === healerId);
  if (!healer) {
    return null;
  }

  const record: ReviewStoreRecord = {
    ratingTotal: healer.rating * healer.reviewCount,
    reviewCount: healer.reviewCount,
    reviews: [],
  };

  reviewStore[healerId] = record;
  return record;
}

export function getHealerReviewSnapshot(healerId: string): HealerReviewSnapshot {
  const record = getOrCreateReviewRecord(healerId);

  if (!record) {
    return {
      averageRating: 0,
      reviewCount: 0,
      reviews: [],
    };
  }

  return {
    averageRating:
      record.reviewCount > 0
        ? roundAverage(record.ratingTotal / record.reviewCount)
        : 0,
    reviewCount: record.reviewCount,
    reviews: sortReviews(record.reviews),
  };
}

export function canUserReviewHealer(healerId: string, userId: string) {
  return (
    userId === CURRENT_REVIEW_USER.id &&
    completedConsultationHealerIds.includes(healerId)
  );
}

export function hasUserReviewedHealer(healerId: string, userId: string) {
  const record = getOrCreateReviewRecord(healerId);
  if (!record) {
    return false;
  }

  return record.reviews.some((review) => review.userId === userId);
}

export function addHealerReview(input: {
  healerId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
}) {
  const record = getOrCreateReviewRecord(input.healerId);

  if (!record) {
    return {
      ok: false as const,
      status: 404,
      message: "Healer not found.",
    };
  }

  if (!canUserReviewHealer(input.healerId, input.userId)) {
    return {
      ok: false as const,
      status: 403,
      message: "Only users with a completed consultation can review this healer.",
    };
  }

  if (hasUserReviewedHealer(input.healerId, input.userId)) {
    return {
      ok: false as const,
      status: 409,
      message: "You've already reviewed this healer.",
    };
  }

  const normalizedComment = input.comment.trim();

  if (!Number.isInteger(input.rating) || input.rating < 1 || input.rating > 5) {
    return {
      ok: false as const,
      status: 400,
      message: "A rating between 1 and 5 is required.",
    };
  }

  if (normalizedComment.length < 20) {
    return {
      ok: false as const,
      status: 400,
      message: "Review comments must be at least 20 characters.",
    };
  }

  const review: HealerReview = {
    id: `review-${input.healerId}-${record.reviews.length + 1}-${Date.now()}`,
    healerId: input.healerId,
    userId: input.userId,
    userName: input.userName.trim() || "Anonymous",
    rating: input.rating,
    comment: normalizedComment,
    createdAt: new Date().toISOString(),
  };

  record.ratingTotal += review.rating;
  record.reviewCount += 1;
  record.reviews = sortReviews([review, ...record.reviews]);

  return {
    ok: true as const,
    review,
    snapshot: getHealerReviewSnapshot(input.healerId),
  };
}
