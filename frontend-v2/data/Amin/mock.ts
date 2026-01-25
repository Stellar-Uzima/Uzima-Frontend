// /frontend-v2/data/admin-mock.ts

export interface DashboardStats {
  totalUsers: number;
  totalDonations: number;
  activeHelpers: number;
  pendingVerifications: number;
  trends: {
    users: number;
    donations: number;
    helpers: number;
  };
}

export interface DonationDataPoint {
  date: string;
  amount: number;
}

export interface UserGrowthDataPoint {
  month: string;
  newUsers: number;
  returningUsers: number;
}

export interface RankDistribution {
  rank: string;
  count: number;
  percentage: number;
  fill: string;
}

export interface RecentActivity {
  id: string;
  user: string;
  action: string;
  amount?: number;
  date: string;
  timestamp: number;
}

export const dashboardStats: DashboardStats = {
  totalUsers: 12458,
  totalDonations: 245678.50,
  activeHelpers: 3247,
  pendingVerifications: 23,
  trends: {
    users: 12,
    donations: 18.5,
    helpers: 8.3,
  },
};

// Last 30 days donation data
export const donationsOverTime: DonationDataPoint[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split('T')[0],
    amount: Math.floor(Math.random() * 5000) + 3000,
  };
});

// Last 6 months user growth
export const userGrowthData: UserGrowthDataPoint[] = [
  { month: 'Aug', newUsers: 1245, returningUsers: 890 },
  { month: 'Sep', newUsers: 1567, returningUsers: 1123 },
  { month: 'Oct', newUsers: 1834, returningUsers: 1456 },
  { month: 'Nov', newUsers: 2012, returningUsers: 1678 },
  { month: 'Dec', newUsers: 2345, returningUsers: 1890 },
  { month: 'Jan', newUsers: 2678, returningUsers: 2123 },
];

// Helper ranks distribution
export const rankDistribution: RankDistribution[] = [
  { rank: 'Bronze', count: 1247, percentage: 38.4, fill: '#CD7F32' },
  { rank: 'Silver', count: 976, percentage: 30.1, fill: '#C0C0C0' },
  { rank: 'Gold', count: 542, percentage: 16.7, fill: '#FFD700' },
  { rank: 'Platinum', count: 312, percentage: 9.6, fill: '#E5E4E2' },
  { rank: 'Diamond', count: 134, percentage: 4.1, fill: '#B9F2FF' },
  { rank: 'Elite', count: 36, percentage: 1.1, fill: '#9370DB' },
];

// Recent activity
export const recentActivity: RecentActivity[] = [
  {
    id: '1',
    user: 'Sarah Johnson',
    action: 'Donated to Climate Action',
    amount: 250,
    date: '2 hours ago',
    timestamp: Date.now() - 7200000,
  },
  {
    id: '2',
    user: 'Michael Chen',
    action: 'Verified as Helper',
    date: '3 hours ago',
    timestamp: Date.now() - 10800000,
  },
  {
    id: '3',
    user: 'Emma Williams',
    action: 'Donated to Education Fund',
    amount: 500,
    date: '5 hours ago',
    timestamp: Date.now() - 18000000,
  },
  {
    id: '4',
    user: 'James Rodriguez',
    action: 'Updated profile',
    date: '6 hours ago',
    timestamp: Date.now() - 21600000,
  },
  {
    id: '5',
    user: 'Olivia Martinez',
    action: 'Donated to Healthcare',
    amount: 150,
    date: '8 hours ago',
    timestamp: Date.now() - 28800000,
  },
  {
    id: '6',
    user: 'William Brown',
    action: 'Achieved Gold Rank',
    date: '10 hours ago',
    timestamp: Date.now() - 36000000,
  },
  {
    id: '7',
    user: 'Sophia Davis',
    action: 'Donated to Food Bank',
    amount: 75,
    date: '12 hours ago',
    timestamp: Date.now() - 43200000,
  },
  {
    id: '8',
    user: 'Liam Wilson',
    action: 'Registered as Helper',
    date: '14 hours ago',
    timestamp: Date.now() - 50400000,
  },
  {
    id: '9',
    user: 'Ava Taylor',
    action: 'Donated to Animal Shelter',
    amount: 300,
    date: '16 hours ago',
    timestamp: Date.now() - 57600000,
  },
  {
    id: '10',
    user: 'Noah Anderson',
    action: 'Completed verification',
    date: '18 hours ago',
    timestamp: Date.now() - 64800000,
  },
].sort((a, b) => b.timestamp - a.timestamp);

// XLM conversion rate (mock)
export const XLM_RATE = 0.12; // 1 XLM = $0.12

export const calculateXLMEquivalent = (usdAmount: number): number => {
  return parseFloat((usdAmount / XLM_RATE).toFixed(2));
};