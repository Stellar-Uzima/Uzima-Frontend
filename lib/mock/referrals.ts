export type ReferralStatus = 'pending' | 'joined' | 'rewarded';

export interface ReferralRecord {
  id: string;
  name: string;
  joinedAt: string;
  status: ReferralStatus;
  rewardXlm: number;
}

export interface ReferralSummary {
  totalSignups: number;
  rewardedSignups: number;
  totalXlmEarned: number;
  pendingXlm: number;
  referrals: ReferralRecord[];
}

export const emptyReferralSummary: ReferralSummary = {
  totalSignups: 0,
  rewardedSignups: 0,
  totalXlmEarned: 0,
  pendingXlm: 0,
  referrals: [],
};

/**
 * Placeholder data until `/api/users/referrals` exists — reward disbursement is
 * owned by the backend/contract, this only mirrors the shape the UI expects.
 */
export const mockReferralSummary: ReferralSummary = {
  totalSignups: 4,
  rewardedSignups: 3,
  totalXlmEarned: 37.5,
  pendingXlm: 12.5,
  referrals: [
    {
      id: 'ref-1',
      name: 'Amara O.',
      joinedAt: '2026-05-02T09:15:00.000Z',
      status: 'rewarded',
      rewardXlm: 12.5,
    },
    {
      id: 'ref-2',
      name: 'Kwame B.',
      joinedAt: '2026-05-18T14:40:00.000Z',
      status: 'rewarded',
      rewardXlm: 12.5,
    },
    {
      id: 'ref-3',
      name: 'Zanele M.',
      joinedAt: '2026-06-07T08:05:00.000Z',
      status: 'rewarded',
      rewardXlm: 12.5,
    },
    {
      id: 'ref-4',
      name: 'Tendai R.',
      joinedAt: '2026-06-21T17:30:00.000Z',
      status: 'joined',
      rewardXlm: 0,
    },
  ],
};
