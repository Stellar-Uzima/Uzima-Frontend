// types/content.ts

export interface Content {
  id: string;
  authorId: string;
  title: string;
  body: string;
  wordCount: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  status: 'draft' | 'published' | 'under_review';
  category: string;
  tags: string[];
  
  // Quality metrics
  peerReviews: PeerReview[];
  citations: Citation[];
  hasImages: boolean;
  hasHeadings: boolean;
  readabilityScore?: number;
  plagiarismScore?: number;
  
  // Engagement metrics
  views: number;
  uniqueViews: number;
  averageReadTime: number;
  upvotes: number;
  downvotes: number;
  comments: Comment[];
  shares: number;
  bookmarks: number;
  
  // Impact metrics
  questionsAnswered: number;
  followUpEngagement: number;
  consultationBookings: number;
  isEmergencyTopic: boolean;
  isCriticalTopic: boolean;
  isUnderservedTopic: boolean;
  
  // Reward tracking
  rewardCalculated: boolean;
  rewardAmount?: number;
  rewardDistributed: boolean;
  rewardTransactionId?: string;
  lastRewardCalculation?: Date | string;
}

export interface PeerReview {
  id: string;
  reviewerId: string;
  contentId: string;
  rating: number; // 1-5 stars
  comment?: string;
  medicalAccuracy: number;
  completeness: number;
  clarity: number;
  createdAt: Date | string;
}

export interface Citation {
  id: string;
  url: string;
  source: string;
  title?: string;
  isCredible: boolean;
  sourceType: 'pubmed' | 'who' | 'cdc' | 'journal' | 'other';
}

export interface Comment {
  id: string;
  userId: string;
  contentId: string;
  text: string;
  isQuality: boolean;
  upvotes: number;
  createdAt: Date | string;
}

export interface Author {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  yearsExperience: number;
  specialization: string[];
  averageContentRating: number;
  totalContent: number;
  peerEndorsements: number;
  stellarPublicKey?: string;
  createdAt: Date | string;
}

export interface RewardCalculation {
  id: string;
  contentId: string;
  authorId: string;
  calculatedAt: Date | string;
  
  // Score breakdown
  qualityScore: number;
  engagementScore: number;
  impactScore: number;
  credibilityScore: number;
  
  // Detailed metrics
  qualityMetrics: {
    wordCountScore: number;
    medicalAccuracyScore: number;
    citationScore: number;
    formattingScore: number;
    readabilityScore: number;
    originalityScore: number;
  };
  
  engagementMetrics: {
    viewScore: number;
    readTimeScore: number;
    interactionScore: number;
  };
  
  impactMetrics: {
    questionsScore: number;
    followUpScore: number;
    consultationScore: number;
    topicBonusScore: number;
  };
  
  credibilityMetrics: {
    verificationBonus: number;
    experienceMultiplier: number;
    specializationRelevance: number;
    historicalQuality: number;
    communityTrust: number;
  };
  
  // Final calculation
  baseScore: number;
  normalizedScore: number;
  multiplier: number;
  xlmAmount: number;
  
  status: 'pending' | 'approved' | 'distributed' | 'failed';
  transactionId?: string;
  distributedAt?: Date | string;
}

export interface RewardPool {
  id: string;
  totalXLM: number;
  availableXLM: number;
  distributedXLM: number;
  pendingXLM: number;
  lastRefillDate: Date | string;
  stellarAccountId: string;
}

export interface RewardDistribution {
  id: string;
  calculationId: string;
  recipientPublicKey: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  transactionHash?: string;
  errorMessage?: string;
  attemptCount: number;
  createdAt: Date | string;
  completedAt?: Date | string;
}