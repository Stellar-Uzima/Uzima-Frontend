export interface LeaderboardEntry {
  id: string;
  name: string;
  avatarUrl?: string;
  xlmEarned: number;
  tasksCompleted: number;
  country: string;
  region: string;
  language: string[];
  isCurrentUser?: boolean;
}

export const leaderboardRegions = [
  "West Africa",
  "East Africa",
  "North Africa",
  "Southern Africa",
  "Central Africa",
];

export const leaderboardLanguages = [
  "English", "French", "Arabic", "Swahili", "Hausa",
  "Yoruba", "Igbo", "Amharic", "Zulu", "Shona", "Somali",
  "Berber", "Akan", "Wolof", "Kinyarwanda", "Kirundi",
  "Tigrinya", "Oromo", "Portuguese",
];

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: "lb-1",
    name: "Ama Adu",
    avatarUrl: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100",
    xlmEarned: 1250,
    tasksCompleted: 87,
    country: "Ghana",
    region: "West Africa",
    language: ["English", "Twi"],
  },
  {
    id: "lb-2",
    name: "Oluwaseun Balogun",
    avatarUrl: "https://images.pexels.com/photos/1181514/pexels-photo-1181514.jpeg?auto=compress&cs=tinysrgb&w=100",
    xlmEarned: 1120,
    tasksCompleted: 74,
    country: "Nigeria",
    region: "West Africa",
    language: ["English", "Yoruba"],
  },
  {
    id: "lb-3",
    name: "Nia Okello",
    avatarUrl: "https://images.pexels.com/photos/3760852/pexels-photo-3760852.jpeg?auto=compress&cs=tinysrgb&w=100",
    xlmEarned: 980,
    tasksCompleted: 62,
    country: "Kenya",
    region: "East Africa",
    language: ["English", "Swahili"],
  },
  {
    id: "lb-4",
    name: "Abdi Hassan",
    xlmEarned: 870,
    tasksCompleted: 55,
    country: "Somalia",
    region: "East Africa",
    language: ["Somali", "Arabic"],
  },
  {
    id: "lb-5",
    name: "Selam Belay",
    avatarUrl: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100",
    xlmEarned: 790,
    tasksCompleted: 51,
    country: "Ethiopia",
    region: "East Africa",
    language: ["Amharic", "English"],
  },
  {
    id: "lb-6",
    name: "Musa Diallo",
    xlmEarned: 640,
    tasksCompleted: 43,
    country: "Senegal",
    region: "West Africa",
    language: ["French", "Wolof"],
  },
  {
    id: "lb-7",
    name: "Lindiwe Dlamini",
    avatarUrl: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100",
    xlmEarned: 530,
    tasksCompleted: 38,
    country: "South Africa",
    region: "Southern Africa",
    language: ["Zulu", "English"],
  },
  {
    id: "lb-8",
    name: "Fatima El-Sayed",
    avatarUrl: "https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg?auto=compress&cs=tinysrgb&w=100",
    xlmEarned: 420,
    tasksCompleted: 30,
    country: "Egypt",
    region: "North Africa",
    language: ["Arabic", "English"],
  },
  {
    id: "lb-9",
    name: "Chinonso Okoro",
    xlmEarned: 310,
    tasksCompleted: 22,
    country: "Nigeria",
    region: "West Africa",
    language: ["English", "Igbo"],
  },
  {
    id: "lb-10",
    name: "Yao Kouassi",
    xlmEarned: 280,
    tasksCompleted: 19,
    country: "Cote d'Ivoire",
    region: "West Africa",
    language: ["French"],
  },
  {
    id: "lb-11",
    name: "You (Current User)",
    avatarUrl: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100",
    xlmEarned: 150,
    tasksCompleted: 5,
    country: "Kenya",
    region: "East Africa",
    language: ["English", "Swahili"],
    isCurrentUser: true,
  },
];

export async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockLeaderboard);
    }, 800);
  });
}