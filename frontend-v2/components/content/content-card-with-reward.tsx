'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Content } from '@/lib/types/content';
import { RewardBadge } from '@/components/rewards/reward-badge';

interface ContentCardWithRewardProps {
  content: Content;
  showReward?: boolean;
}

export function ContentCardWithReward({
  content,
  showReward = true,
}: ContentCardWithRewardProps) {
  const router = useRouter();

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getReadTime = (wordCount: number) => {
    const wordsPerMinute = 200;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
      onClick={() => router.push(`/content/${content.id}`)}
    >
      {/* Header with category and reward */}
      <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {content.category}
          </span>
          {content.isEmergencyTopic && (
            <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
              🚨 Emergency
            </span>
          )}
          {content.isCriticalTopic && (
            <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
              ⚠️ Critical
            </span>
          )}
        </div>
        {showReward && content.rewardAmount && (
          <RewardBadge
            amount={content.rewardAmount}
            status={content.rewardDistributed ? 'distributed' : 'pending'}
            size="sm"
          />
        )}
      </div>

      {/* Content Body */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {content.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {content.body.substring(0, 200)}...
        </p>

        {/* Tags */}
        {content.tags && content.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {content.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
              >
                #{tag}
              </span>
            ))}
            {content.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                +{content.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Metrics */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <span>👁️</span>
            <span>{content.views.toLocaleString()} views</span>
          </div>
          <div className="flex items-center gap-1">
            <span>👍</span>
            <span>{content.upvotes}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>💬</span>
            <span>{content.comments?.length || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>📖</span>
            <span>{getReadTime(content.wordCount)}</span>
          </div>
        </div>

        {/* Quality Indicators */}
        <div className="mt-4 pt-4 border-t flex items-center justify-between">
          <div className="flex items-center gap-3">
            {content.peerReviews && content.peerReviews.length > 0 && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm font-medium text-gray-700">
                  {(
                    content.peerReviews.reduce((sum, r) => sum + r.rating, 0) /
                    content.peerReviews.length
                  ).toFixed(1)}
                </span>
                <span className="text-xs text-gray-500">
                  ({content.peerReviews.length} reviews)
                </span>
              </div>
            )}
            {content.citations && content.citations.length > 0 && (
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-600">
                  📚 {content.citations.length} citations
                </span>
              </div>
            )}
          </div>
          
          <span className="text-xs text-gray-400">
            {formatDate(content.createdAt)}
          </span>
        </div>
      </div>

      {/* Footer - Score Preview (if reward calculated) */}
      {showReward && content.rewardCalculated && (
        <div className="px-6 py-3 bg-gradient-to-r from-purple-50 to-blue-50 border-t">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Quality Score</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-1.5 rounded-full"
                  style={{ width: '75%' }}
                ></div>
              </div>
              <span className="font-medium text-gray-700">75%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}