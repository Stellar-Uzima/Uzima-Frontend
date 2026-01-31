export const HELPER_RANKS = {
  SEED: {
    min: 10,
    max: 49,
    name: 'Ubuntu Seed',
    icon: '🌱',
    color: 'green',
    benefits: [
      'Recognition on our platform',
      'Monthly impact newsletter',
      'Community access',
    ],
  },
  SPROUT: {
    min: 50,
    max: 99,
    name: 'Ubuntu Sprout',
    icon: '🌿',
    color: 'lime',
    benefits: [
      'All Seed benefits',
      'Exclusive webinars',
      'Priority support',
      'Special badge',
    ],
  },
  GUARDIAN: {
    min: 100,
    max: 249,
    name: 'Ubuntu Guardian',
    icon: '🛡️',
    color: 'blue',
    benefits: [
      'All Sprout benefits',
      'Quarterly impact reports',
      'Community leadership role',
      'Profile feature',
    ],
  },
  CHAMPION: {
    min: 250,
    max: 499,
    name: 'Ubuntu Champion',
    icon: '🏆',
    color: 'yellow',
    benefits: [
      'All Guardian benefits',
      'VIP event invitations',
      'Direct community updates',
      'Lifetime recognition',
    ],
  },
  ANGEL: {
    min: 500,
    max: 999,
    name: 'Ubuntu Angel',
    icon: '👼',
    color: 'purple',
    benefits: [
      'All Champion benefits',
      'Advisory board access',
      'Project naming rights',
      'Legacy certificate',
    ],
  },
  LEGACY: {
    min: 1000,
    max: Infinity,
    name: 'Ubuntu Legacy',
    icon: '💎',
    color: 'pink',
    benefits: [
      'All Angel benefits',
      'Permanent memorial plaque',
      'Lifetime achievement award',
      'Personal thank you video',
      'Annual gala invitation',
    ],
  },
} as const;

export type RankKey = keyof typeof HELPER_RANKS;

export interface Donation {
  id: string;
  donorName: string;
  amount: number;
  currency: 'XLM' | 'USDT';
  rank: RankKey;
  message?: string;
  txHash: string; // Stellar transaction hash
  createdAt: Date | string;
}

export interface Helper {
  id: string;
  name: string;
  totalDonated: number;
  rank: RankKey;
  donationCount: number;
  joinedAt: Date | string;
  avatarUrl?: string;
}

export interface ImpactStats {
  totalRaised: number;
  helpersCount: number;
  communitiesHelped: number;
  livesImpacted: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  story: string;
  image?: string;
  date: Date | string;
}

export function getRankByAmount(amount: number): RankKey {
  if (amount < HELPER_RANKS.SEED.min) return 'SEED';
  if (amount >= HELPER_RANKS.LEGACY.min) return 'LEGACY';
  if (amount >= HELPER_RANKS.ANGEL.min) return 'ANGEL';
  if (amount >= HELPER_RANKS.CHAMPION.min) return 'CHAMPION';
  if (amount >= HELPER_RANKS.GUARDIAN.min) return 'GUARDIAN';
  if (amount >= HELPER_RANKS.SPROUT.min) return 'SPROUT';
  return 'SEED';
}

export function convertUSDToXLM(usd: number, rate: number = 0.10): number {
  return usd / rate;
}

export function convertXLMToUSD(xlm: number, rate: number = 0.10): number {
  return xlm * rate;
}