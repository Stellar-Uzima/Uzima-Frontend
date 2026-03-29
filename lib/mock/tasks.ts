export type TaskProofType = "self-report" | "photo";

export type HealthTaskStatus = 'available' | 'completed' | 'claimed';

export interface HealthTask {
  id: string;
  title: string;
  category: string;
  rewardXLM: number;
  status: HealthTaskStatus;
  whyItMatters: string;
  steps: {
    title: string;
    description?: string;
  }[];
  proofType: TaskProofType;
  isTraditional: boolean;
  culture?: string;
}

export const mockTasks: HealthTask[] = [
  {
    id: "hydration-check",
    title: "Daily hydration check",
    category: "Nutrition",
    rewardXLM: 5,
    status: "available", // ADDED
    whyItMatters: "...",
    steps: [/* ... */],
    proofType: "self-report",
    isTraditional: false,
  },
  {
    id: "neighbourhood-walk-photo",
    title: "20 minute neighbourhood walk",
    category: "Exercise",
    rewardXLM: 8,
    status: "available", // ADDED
    whyItMatters: "...",
    steps: [/* ... */],
    proofType: "photo",
    isTraditional: false,
  },
  {
    id: "traditional-remedy-log",
    title: "Traditional remedy reflection log",
    category: "Traditional Medicine",
    rewardXLM: 10,
    status: "claimed", // ADDED (as an example)
    whyItMatters: "...",
    steps: [/* ... */],
    proofType: "self-report",
    isTraditional: true,
    culture: "East African",
  },
];

export function getTaskById(id: string): HealthTask | undefined {
  return mockTasks.find((task) => task.id === id);
}
