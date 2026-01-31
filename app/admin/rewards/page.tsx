'use client';

import React, { useState, useEffect } from 'react';
import { rewardsApi } from '@/frontend-v2/lib/api/rewards';
import { RewardPool, RewardDistribution, RewardCalculation } from '@/frontend-v2/lib/types/content';

export default function AdminRewardsPage() {
  const [rewardPool, setRewardPool] = useState<RewardPool | null>(null);
  const [distributions, setDistributions] = useState<RewardDistribution[]>([]);
  const [pendingRewards, setPendingRewards] = useState<RewardCalculation[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'pending' | 'history'>('overview');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadData();
  }, [page, selectedTab]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [poolData, statsData] = await Promise.all([
        rewardsApi.getRewardPool(),
        rewardsApi.getRewardStats(),
      ]);

      setRewardPool(poolData);
      setStats(statsData);

      if (selectedTab === 'history') {
        const historyData = await rewardsApi.getDistributionHistory({ page, limit: 20 });
        setDistributions(historyData.distributions);
        setTotalPages(Math.ceil(historyData.total / 20));
      }
    } catch (error) {
      console.error('Failed to load reward data:', error);
      alert('Failed to load reward data');
    } finally {
      setLoading(false);
    }
  };

  const handleDistributeRewards = async (calculationIds: string[]) => {
    if (!confirm(`Distribute rewards for ${calculationIds.length} content pieces?`)) {
      return;
    }

    try {
      await rewardsApi.distributeRewards(calculationIds);
      alert('Rewards distributed successfully!');
      loadData();
    } catch (error) {
      console.error('Failed to distribute rewards:', error);
      alert('Failed to distribute rewards');
    }
  };

  const handleRetryDistribution = async (distributionId: string) => {
    try {
      await rewardsApi.retryDistribution(distributionId);
      alert('Retry initiated successfully!');
      loadData();
    } catch (error) {
      console.error('Failed to retry distribution:', error);
      alert('Failed to retry distribution');
    }
  };

  const formatXLM = (amount: number) => {
    return `${amount.toFixed(7)} XLM`;
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading rewards data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Reward Pool Management
          </h1>
          <p className="text-gray-600">
            Monitor and distribute XLM rewards to healthcare professionals
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Pool */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Pool</h3>
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {rewardPool ? formatXLM(rewardPool.totalXLM) : '0 XLM'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Last refill: {rewardPool ? formatDate(rewardPool.lastRefillDate) : 'N/A'}
            </p>
          </div>

          {/* Available */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Available</h3>
              <span className="text-2xl">✅</span>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {rewardPool ? formatXLM(rewardPool.availableXLM) : '0 XLM'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {rewardPool
                ? `${((rewardPool.availableXLM / rewardPool.totalXLM) * 100).toFixed(1)}% of total`
                : '0%'}
            </p>
          </div>

          {/* Distributed */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Distributed</h3>
              <span className="text-2xl">📤</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">
              {rewardPool ? formatXLM(rewardPool.distributedXLM) : '0 XLM'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              To {stats?.contentCount || 0} content pieces
            </p>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Pending</h3>
              <span className="text-2xl">⏳</span>
            </div>
            <p className="text-2xl font-bold text-orange-600">
              {rewardPool ? formatXLM(rewardPool.pendingXLM) : '0 XLM'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {stats?.pendingRewards || 0} pending rewards
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setSelectedTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setSelectedTab('pending')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'pending'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pending Distribution
              </button>
              <button
                onClick={() => setSelectedTab('history')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'history'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Distribution History
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {selectedTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Pool Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Average Reward</p>
                      <p className="text-xl font-bold text-gray-900">
                        {stats ? formatXLM(stats.averageReward) : '0 XLM'}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Total Content Rewarded</p>
                      <p className="text-xl font-bold text-gray-900">{stats?.contentCount || 0}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Stellar Account</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Account ID</p>
                    <p className="text-sm font-mono text-gray-900 break-all">
                      {rewardPool?.stellarAccountId || 'Not configured'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'pending' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Pending Rewards ({pendingRewards.length})
                  </h3>
                  {pendingRewards.length > 0 && (
                    <button
                      onClick={() =>
                        handleDistributeRewards(pendingRewards.map((r) => r.id))
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Distribute All
                    </button>
                  )}
                </div>
                {pendingRewards.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No pending rewards</p>
                ) : (
                  <div className="space-y-3">
                    {/* Pending rewards list would go here */}
                    <p className="text-sm text-gray-500">
                      Pending rewards list will be displayed here
                    </p>
                  </div>
                )}
              </div>
            )}

            {selectedTab === 'history' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Recent Distributions
                </h3>
                {distributions.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No distribution history</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Recipient
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {distributions.map((dist) => (
                          <tr key={dist.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatDate(dist.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                              {dist.recipientPublicKey.substring(0, 8)}...
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {formatXLM(dist.amount)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  dist.status === 'completed'
                                    ? 'bg-green-100 text-green-800'
                                    : dist.status === 'failed'
                                    ? 'bg-red-100 text-red-800'
                                    : dist.status === 'processing'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {dist.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {dist.status === 'failed' && (
                                <button
                                  onClick={() => handleRetryDistribution(dist.id)}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  Retry
                                </button>
                              )}
                              {dist.transactionHash && (
                                <a
                                  href={`https://stellar.expert/explorer/public/tx/${dist.transactionHash}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  View TX
                                </a>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center space-x-2 mt-6">
                        <button
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={page === 1}
                          className="px-4 py-2 border rounded-lg disabled:opacity-50"
                        >
                          Previous
                        </button>
                        <span className="text-sm text-gray-600">
                          Page {page} of {totalPages}
                        </span>
                        <button
                          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                          disabled={page === totalPages}
                          className="px-4 py-2 border rounded-lg disabled:opacity-50"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}