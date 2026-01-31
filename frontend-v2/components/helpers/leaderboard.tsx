'use client';

import React, { useState } from 'react';
import { Helper } from '@/types/ubuntu-helpers';
import { RankBadge } from './rank-badge';

interface LeaderboardProps {
  helpers: Helper[];
}

type SortBy = 'total' | 'recent' | 'impact';

export function Leaderboard({ helpers: initialHelpers }: LeaderboardProps) {
  const [sortBy, setSortBy] = useState<SortBy>('total');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sort helpers based on selected criteria
  const sortedHelpers = [...initialHelpers].sort((a, b) => {
    switch (sortBy) {
      case 'total':
        return b.totalDonated - a.totalDonated;
      case 'recent':
        return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
      case 'impact':
        return b.donationCount - a.donationCount;
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedHelpers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedHelpers = sortedHelpers.slice(startIndex, startIndex + itemsPerPage);

  const formatAmount = (amount: number) => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getMedalEmoji = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <h2 className="text-2xl font-bold text-white mb-2">Ubuntu Helpers Leaderboard</h2>
        <p className="text-blue-100">Our amazing community of donors making a difference</p>
      </div>

      {/* Sort Controls */}
      <div className="p-4 bg-gray-50 border-b flex flex-wrap gap-2">
        <button
          onClick={() => setSortBy('total')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            sortBy === 'total'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
          }`}
        >
          💰 Total Donated
        </button>
        <button
          onClick={() => setSortBy('recent')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            sortBy === 'recent'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
          }`}
        >
          🕐 Most Recent
        </button>
        <button
          onClick={() => setSortBy('impact')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            sortBy === 'impact'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
          }`}
        >
          🎯 Most Impact
        </button>
      </div>

      {/* Leaderboard Table - Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Helper
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Donations
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedHelpers.map((helper, index) => {
              const globalIndex = startIndex + index;
              return (
                <tr
                  key={helper.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    globalIndex < 3 ? 'bg-yellow-50' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-2xl font-bold">{getMedalEmoji(globalIndex)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                        {helper.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{helper.name}</div>
                        <div className="text-xs text-gray-500">
                          {helper.donationCount} donation{helper.donationCount !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg font-bold text-gray-900">
                      {formatAmount(helper.totalDonated)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <RankBadge rank={helper.rank} size="sm" showName={false} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {helper.donationCount}x
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(helper.joinedAt)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Leaderboard Cards - Mobile */}
      <div className="md:hidden divide-y divide-gray-200">
        {paginatedHelpers.map((helper, index) => {
          const globalIndex = startIndex + index;
          return (
            <div
              key={helper.id}
              className={`p-4 ${globalIndex < 3 ? 'bg-yellow-50' : 'bg-white'}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold">{getMedalEmoji(globalIndex)}</span>
                  <div>
                    <p className="font-medium text-gray-900">{helper.name}</p>
                    <p className="text-xs text-gray-500">
                      {helper.donationCount} donation{helper.donationCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <RankBadge rank={helper.rank} size="sm" showName={false} />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-600">Total Donated</p>
                  <p className="text-lg font-bold text-gray-900">
                    {formatAmount(helper.totalDonated)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600">Joined</p>
                  <p className="text-sm text-gray-900">{formatDate(helper.joinedAt)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 bg-gray-50 border-t flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}