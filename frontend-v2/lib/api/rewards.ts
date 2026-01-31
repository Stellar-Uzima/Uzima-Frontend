import { Content, RewardCalculation, RewardDistribution, RewardPool } from '@/lib/types/content';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const rewardsApi = {
  /**
   * Calculate reward for a specific content piece
   */
  async calculateReward(contentId: string): Promise<RewardCalculation> {
    const response = await fetch(`${API_BASE_URL}/api/rewards/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contentId }),
    });

    if (!response.ok) {
      throw new Error('Failed to calculate reward');
    }

    return response.json();
  },

  /**
   * Get reward calculation details
   */
  async getRewardCalculation(calculationId: string): Promise<RewardCalculation> {
    const response = await fetch(`${API_BASE_URL}/api/rewards/calculations/${calculationId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch reward calculation');
    }

    return response.json();
  },

  /**
   * Get all reward calculations for a content piece
   */
  async getContentRewards(contentId: string): Promise<RewardCalculation[]> {
    const response = await fetch(`${API_BASE_URL}/api/rewards/content/${contentId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch content rewards');
    }

    return response.json();
  },

  /**
   * Get all rewards for an author
   */
  async getAuthorRewards(authorId: string): Promise<RewardCalculation[]> {
    const response = await fetch(`${API_BASE_URL}/api/rewards/author/${authorId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch author rewards');
    }

    return response.json();
  },

  /**
   * Distribute pending rewards (Admin only)
   */
  async distributeRewards(calculationIds: string[]): Promise<RewardDistribution[]> {
    const response = await fetch(`${API_BASE_URL}/api/rewards/distribute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ calculationIds }),
    });

    if (!response.ok) {
      throw new Error('Failed to distribute rewards');
    }

    return response.json();
  },

  /**
   * Get reward pool status
   */
  async getRewardPool(): Promise<RewardPool> {
    const response = await fetch(`${API_BASE_URL}/api/rewards/pool`);

    if (!response.ok) {
      throw new Error('Failed to fetch reward pool');
    }

    return response.json();
  },

  /**
   * Get distribution history
   */
  async getDistributionHistory(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<{ distributions: RewardDistribution[]; total: number; page: number }> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);

    const response = await fetch(
      `${API_BASE_URL}/api/rewards/distributions?${queryParams.toString()}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch distribution history');
    }

    return response.json();
  },

  /**
   * Retry failed distribution
   */
  async retryDistribution(distributionId: string): Promise<RewardDistribution> {
    const response = await fetch(`${API_BASE_URL}/api/rewards/distributions/${distributionId}/retry`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to retry distribution');
    }

    return response.json();
  },

  /**
   * Get reward statistics
   */
  async getRewardStats(authorId?: string): Promise<{
    totalEarned: number;
    totalDistributed: number;
    pendingRewards: number;
    averageReward: number;
    contentCount: number;
  }> {
    const url = authorId
      ? `${API_BASE_URL}/api/rewards/stats?authorId=${authorId}`
      : `${API_BASE_URL}/api/rewards/stats`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch reward stats');
    }

    return response.json();
  },
};