'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { rewardsApi } from '@/lib/api/rewards';
import { RewardCalculation } from '@/lib/types/content';
import { RewardBadge } from '@/components/rewards/reward-badge';

export default function ProfessionalRewardsPage() {
  const router = useRouter();
  const [rewards, setRewards] = useState<RewardCalculation[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'distributed'>('all');

  // Replace with actual user ID from auth context
  const authorId = 'current-user-id';

  useEffect(() => {
    loadRewards();
  }, []);

  const loadRewards = async () => {
    try {
      setLoading(true);
      const [rewardsData, statsData] = await Promise.all([
        rewardsApi.getAuthorRewards(authorId),
        rewardsApi.getRewardStats(authorId),
      ]);

      setRewards(rewardsData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load rewards:', error);
      alert('Failed to load rewards data');
    } finally {
      setLoading(false);
    }
  };

  const filteredRewards = rewards.filter((reward) => {
    if (filter === 'all') return true;
    if (filter === 'pending') return reward.status !== 'distributed';
    if (filter === 'distributed') return reward.status === 'distributed';
    return true;
  });

  const formatXLM = (amount: number) => {
    return `${amount.toFixed(7)} XLM`;
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your rewards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Rewards</h1>
          <p className="text-gray-600">
            Track your XLM earnings from healthcare content contributions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Earned</h3>
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {stats ? formatXLM(stats.totalEarned) : '0 XLM'}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Distributed</h3>
              <span className="text-2xl">✅</span>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {stats ? formatXLM(stats.totalDistributed) : '0 XLM'}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Pending</h3>
              <span className="text-2xl">⏳</span>
            </div>
            <p className="text-2xl font-bold text-orange-600">
              {stats ? formatXLM(stats.pendingRewards) : '0 XLM'}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Content Count</h3>
              <span className="text-2xl">📝</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{stats?.contentCount || 0}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({rewards.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'pending'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending ({rewards.filter((r) => r.status !== 'distributed').length})
            </button>
            <button
              onClick={() => setFilter('distributed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'distributed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Distributed ({rewards.filter((r) => r.status === 'distributed').length})
            </button>
          </div>
        </div>

        {/* Rewards List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredRewards.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No rewards found</p>
              <button
                onClick={() => router.push('/professional/content/create')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Content
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredRewards.map((reward) => (
                <div
                  key={reward.id}
                  className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => router.push(`/professional/rewards/${reward.id}`)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        Content ID: {reward.contentId.substring(0, 8)}...
                      </h3>
                      <p className="text-sm text-gray-500">
                        Calculated: {formatDate(reward.calculatedAt)}
                      </p>
                    </div>
                    <RewardBadge amount={reward.xlmAmount} status={reward.status} />
                  </div>

                  {/* Score Bars */}
                  <div className="grid grid-cols-4 gap-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Quality</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${reward.qualityScore}%` }}
                        ></div>
                      </div>
                      <p className="text-xs font-medium text-gray-900 mt-1">
                        {reward.qualityScore.toFixed(0)}%
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600 mb-1">Engagement</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${reward.engagementScore}%` }}
                        ></div>
                      </div>
                      <p className="text-xs font-medium text-gray-900 mt-1">
                        {reward.engagementScore.toFixed(0)}%
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600 mb-1">Impact</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${reward.impactScore}%` }}
                        ></div>
                      </div>
                      <p className="text-xs font-medium text-gray-900 mt-1">
                        {reward.impactScore.toFixed(0)}%
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600 mb-1">Credibility</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: `${reward.credibilityScore}%` }}
                        ></div>
                      </div>
                      <p className="text-xs font-medium text-gray-900 mt-1">
                        {reward.credibilityScore.toFixed(0)}%
                      </p>
                    </div>
                  </div>

                  {/* Transaction Link */}
                  {reward.transactionId && (
                    <div className="mt-3">
                      <a
                        href={`https://stellar.expert/explorer/public/tx/${reward.transactionId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-700"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Transaction →
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">How Rewards Work</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Rewards are calculated based on content quality, engagement, impact, and your credibility</li>
            <li>• Quality content (500-2000 words) with proper citations earns more rewards</li>
            <li>• Higher engagement (views, comments, shares) increases your reward amount</li>
            <li>• Helping patients and answering questions boosts your impact score</li>
            <li>• Rewards are distributed weekly via Stellar blockchain (XLM tokens)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}