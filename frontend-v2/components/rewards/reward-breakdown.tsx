'use client';

import React from 'react';
import { RewardCalculation } from '@/lib/types/content';

interface RewardBreakdownProps {
  calculation: RewardCalculation;
}

export function RewardBreakdown({ calculation }: RewardBreakdownProps) {
  const ScoreBar = ({ score, label, color }: { score: number; label: string; color: string }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold text-gray-900">{score.toFixed(1)}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Reward Calculation Breakdown</h3>

      {/* Final Amount */}
      <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
        <p className="text-sm text-gray-600 mb-1">Final Reward Amount</p>
        <p className="text-3xl font-bold text-blue-600">
          {calculation.xlmAmount.toFixed(7)} XLM
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Base Score: {calculation.normalizedScore.toFixed(1)} × Multiplier: {calculation.multiplier.toFixed(2)}
        </p>
      </div>

      {/* Main Scores */}
      <div className="space-y-6 mb-8">
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Main Score Components</h4>
          <ScoreBar
            score={calculation.qualityScore}
            label="Quality Score (40%)"
            color="bg-purple-500"
          />
          <ScoreBar
            score={calculation.engagementScore}
            label="Engagement Score (30%)"
            color="bg-blue-500"
          />
          <ScoreBar
            score={calculation.impactScore}
            label="Impact Score (20%)"
            color="bg-green-500"
          />
          <ScoreBar
            score={calculation.credibilityScore}
            label="Credibility Score (10%)"
            color="bg-yellow-500"
          />
        </div>
      </div>

      {/* Quality Metrics Details */}
      <div className="border-t pt-6 mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Quality Metrics</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">Word Count</p>
            <p className="text-lg font-bold text-gray-900">
              {(calculation.qualityMetrics.wordCountScore * 100).toFixed(0)}%
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">Medical Accuracy</p>
            <p className="text-lg font-bold text-gray-900">
              {(calculation.qualityMetrics.medicalAccuracyScore * 100).toFixed(0)}%
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">Citations</p>
            <p className="text-lg font-bold text-gray-900">
              {(calculation.qualityMetrics.citationScore * 100).toFixed(0)}%
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">Formatting</p>
            <p className="text-lg font-bold text-gray-900">
              {(calculation.qualityMetrics.formattingScore * 100).toFixed(0)}%
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">Readability</p>
            <p className="text-lg font-bold text-gray-900">
              {(calculation.qualityMetrics.readabilityScore * 100).toFixed(0)}%
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">Originality</p>
            <p className="text-lg font-bold text-gray-900">
              {(calculation.qualityMetrics.originalityScore * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="border-t pt-6 mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Engagement Metrics</h4>
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">Views</p>
            <p className="text-lg font-bold text-gray-900">
              {(calculation.engagementMetrics.viewScore * 100).toFixed(0)}%
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">Read Time</p>
            <p className="text-lg font-bold text-gray-900">
              {(calculation.engagementMetrics.readTimeScore * 100).toFixed(0)}%
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">Interactions</p>
            <p className="text-lg font-bold text-gray-900">
              {(calculation.engagementMetrics.interactionScore * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="border-t pt-6 mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Impact Metrics</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">Questions Answered</p>
            <p className="text-lg font-bold text-gray-900">
              {(calculation.impactMetrics.questionsScore * 100).toFixed(0)}%
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">Follow-up</p>
            <p className="text-lg font-bold text-gray-900">
              {(calculation.impactMetrics.followUpScore * 100).toFixed(0)}%
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">Consultations</p>
            <p className="text-lg font-bold text-gray-900">
              {(calculation.impactMetrics.consultationScore * 100).toFixed(0)}%
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-xs text-gray-600">Topic Bonus</p>
            <p className="text-lg font-bold text-gray-900">
              {(calculation.impactMetrics.topicBonusScore * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      </div>

      {/* Credibility Metrics */}
      <div className="border-t pt-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Credibility Factors</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="text-xs text-gray-600">Verification Bonus</span>
            <span className="text-sm font-bold text-gray-900">
              +{(calculation.credibilityMetrics.verificationBonus * 100).toFixed(0)}%
            </span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="text-xs text-gray-600">Experience Multiplier</span>
            <span className="text-sm font-bold text-gray-900">
              {calculation.credibilityMetrics.experienceMultiplier.toFixed(2)}x
            </span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="text-xs text-gray-600">Specialization Relevance</span>
            <span className="text-sm font-bold text-gray-900">
              {(calculation.credibilityMetrics.specializationRelevance * 100).toFixed(0)}%
            </span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="text-xs text-gray-600">Historical Quality</span>
            <span className="text-sm font-bold text-gray-900">
              {(calculation.credibilityMetrics.historicalQuality * 100).toFixed(0)}%
            </span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="text-xs text-gray-600">Community Trust</span>
            <span className="text-sm font-bold text-gray-900">
              {(calculation.credibilityMetrics.communityTrust * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>

      {/* Calculation Date */}
      <div className="mt-6 pt-6 border-t">
        <p className="text-xs text-gray-500">
          Calculated on: {new Date(calculation.calculatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}