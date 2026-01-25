// TypeScript interfaces for User Profile Page
// Requirements: 11.1, 11.2, 11.3, 11.4

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
  walletAddress: string;
  stats: UserStats;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserStats {
  xlmEarned: number;
  articlesPosted: number;
  contributions: number;
  helperRank: HelperRank;
}

export interface HelperRank {
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Ubuntu Guardian';
  level: number;
  nextTierRequirement?: string;
}

export interface Activity {
  id: string;
  type: 'article_posted' | 'xlm_earned' | 'donation_received' | 'rank_up';
  description: string;
  timestamp: Date;
  metadata?: {
    amount?: number;
    articleTitle?: string;
    newRank?: string;
  };
}

export interface Earning {
  id: string;
  date: Date;
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  transactionHash?: string;
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: Date;
  readTime: number;
  tags: string[];
  slug: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: Date;
  category: 'posting' | 'earning' | 'community' | 'milestone';
}

// Helper rank constants
export const HELPER_RANKS = {
  Bronze: { level: 1, color: '#CD7F32', minContributions: 0 },
  Silver: { level: 2, color: '#C0C0C0', minContributions: 25 },
  Gold: { level: 3, color: '#FFD700', minContributions: 100 },
  Platinum: { level: 4, color: '#E5E4E2', minContributions: 250 },
  'Ubuntu Guardian': { level: 5, color: '#9B59B6', minContributions: 500 }
} as const;