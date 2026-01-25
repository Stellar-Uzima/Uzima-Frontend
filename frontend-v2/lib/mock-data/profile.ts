// Mock data for User Profile Page development and testing
// Requirements: 11.4

import { UserProfile, Activity, Earning, Post, Achievement } from '../types/profile';

export const mockUserProfile: UserProfile = {
  id: "user_123",
  name: "Dr. Sarah Johnson",
  username: "sarahj_md",
  avatar: "/placeholder-user.jpg",
  walletAddress: "GCKFBEIYTKP6RCZNVPH73XL7QPBFKJGQRQHQXQXQXQXQXQXQXQXQXQXQ",
  stats: {
    xlmEarned: 1247.50,
    articlesPosted: 23,
    contributions: 156,
    helperRank: {
      tier: 'Gold',
      level: 3,
      nextTierRequirement: '50 more contributions for Platinum'
    }
  },
  createdAt: new Date('2023-06-15'),
  updatedAt: new Date('2024-01-15')
};

export const mockActivities: Activity[] = [
  {
    id: "act_1",
    type: "article_posted",
    description: "Published article: 'Understanding Telemedicine in Rural Areas'",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    metadata: {
      articleTitle: "Understanding Telemedicine in Rural Areas"
    }
  },
  {
    id: "act_2",
    type: "xlm_earned",
    description: "Earned 25 XLM for helpful consultation",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    metadata: {
      amount: 25
    }
  },
  {
    id: "act_3",
    type: "donation_received",
    description: "Received 10 XLM donation for community support",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    metadata: {
      amount: 10
    }
  },
  {
    id: "act_4",
    type: "rank_up",
    description: "Promoted to Gold Ubuntu Helper",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    metadata: {
      newRank: "Gold"
    }
  },
  {
    id: "act_5",
    type: "article_posted",
    description: "Published article: 'Traditional Medicine Integration'",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    metadata: {
      articleTitle: "Traditional Medicine Integration"
    }
  }
];

export const mockEarnings: Earning[] = [
  {
    id: "earn_1",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    description: "Article reward: Telemedicine guide",
    amount: 50,
    status: "completed",
    transactionHash: "abc123def456"
  },
  {
    id: "earn_2",
    date: new Date(Date.now() - 5 * 60 * 60 * 1000),
    description: "Consultation fee",
    amount: 25,
    status: "completed",
    transactionHash: "def456ghi789"
  },
  {
    id: "earn_3",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    description: "Community donation",
    amount: 10,
    status: "completed",
    transactionHash: "ghi789jkl012"
  },
  {
    id: "earn_4",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    description: "Knowledge sharing bonus",
    amount: 15,
    status: "pending"
  },
  {
    id: "earn_5",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    description: "Weekly contribution reward",
    amount: 30,
    status: "completed",
    transactionHash: "jkl012mno345"
  }
];

export const mockPosts: Post[] = [
  {
    id: "post_1",
    title: "Understanding Telemedicine in Rural Areas",
    excerpt: "Exploring how telemedicine can bridge healthcare gaps in remote communities across Africa.",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    readTime: 8,
    tags: ["telemedicine", "rural health", "africa"],
    slug: "understanding-telemedicine-rural-areas"
  },
  {
    id: "post_2",
    title: "Traditional Medicine Integration",
    excerpt: "How traditional healing practices can complement modern healthcare approaches.",
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    readTime: 12,
    tags: ["traditional medicine", "integration", "holistic health"],
    slug: "traditional-medicine-integration"
  },
  {
    id: "post_3",
    title: "Mental Health in Healthcare Workers",
    excerpt: "Addressing burnout and mental health challenges among healthcare professionals.",
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    readTime: 6,
    tags: ["mental health", "healthcare workers", "burnout"],
    slug: "mental-health-healthcare-workers"
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: "ach_1",
    name: "First Post",
    description: "Published your first article on the platform",
    icon: "FileText",
    isUnlocked: true,
    unlockedAt: new Date('2023-06-20'),
    category: "posting"
  },
  {
    id: "ach_2",
    name: "10 XLM Earned",
    description: "Earned your first 10 XLM tokens",
    icon: "Coins",
    isUnlocked: true,
    unlockedAt: new Date('2023-07-01'),
    category: "earning"
  },
  {
    id: "ach_3",
    name: "Ubuntu Guardian",
    description: "Reached the highest helper rank",
    icon: "Shield",
    isUnlocked: false,
    category: "milestone"
  },
  {
    id: "ach_4",
    name: "Community Helper",
    description: "Helped 50 community members",
    icon: "Users",
    isUnlocked: true,
    unlockedAt: new Date('2023-08-15'),
    category: "community"
  },
  {
    id: "ach_5",
    name: "Knowledge Sharer",
    description: "Published 10 articles",
    icon: "BookOpen",
    isUnlocked: true,
    unlockedAt: new Date('2023-09-10'),
    category: "posting"
  },
  {
    id: "ach_6",
    name: "Top Contributor",
    description: "Made 100 contributions",
    icon: "Trophy",
    isUnlocked: true,
    unlockedAt: new Date('2023-12-01'),
    category: "milestone"
  }
];