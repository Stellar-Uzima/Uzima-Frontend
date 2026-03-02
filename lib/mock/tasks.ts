export type TaskProofType = "self-report" | "photo";

export interface HealthTask {
  id: string;
  title: string;
  category: string;
  rewardXLM: number;
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
    whyItMatters:
      "Drinking enough water helps your heart, joints, and kidneys work well. When you are low on fluids you can feel tired, get headaches, and find it harder to focus.",
    steps: [
      {
        title: "Fill your water bottle",
        description:
          "Start the day with a full bottle or jug of clean drinking water so you can see how much you drink.",
      },
      {
        title: "Drink small amounts often",
        description:
          "Take a few sips every hour instead of waiting until you feel very thirsty.",
      },
      {
        title: "Check your urine colour",
        description:
          "Aim for pale yellow. Dark yellow or brown urine can be a sign that you need more water.",
      },
      {
        title: "Log your hydration",
        description:
          "Once you reach your daily water goal, add a short note or tick in your log, then mark this task as complete.",
      },
    ],
    proofType: "self-report",
    isTraditional: false,
  },
  {
    id: "neighbourhood-walk-photo",
    title: "20 minute neighbourhood walk",
    category: "Exercise",
    rewardXLM: 8,
    whyItMatters:
      "Regular walking improves blood flow, helps with weight control, and can lift your mood. Around 20 minutes a day can lower your risk of heart disease and type 2 diabetes.",
    steps: [
      {
        title: "Choose a safe route",
        description:
          "Pick a path that feels safe and familiar, for example your compound, street, or local market area.",
      },
      {
        title: "Warm up your joints",
        description:
          "Spend 2 to 3 minutes stretching your ankles, knees, and hips before you start walking.",
      },
      {
        title: "Walk for 20 minutes",
        description:
          "Walk at a pace that makes you slightly out of breath but still able to talk. Slow down or rest if your body asks for it.",
      },
      {
        title: "Take a quick photo",
        description:
          "Take a clear photo during or right after your walk, such as your street, your shoes, or the view.",
      },
    ],
    proofType: "photo",
    isTraditional: false,
  },
  {
    id: "traditional-remedy-log",
    title: "Traditional remedy reflection log",
    category: "Traditional Medicine",
    rewardXLM: 10,
    whyItMatters:
      "Writing down how a traditional remedy affects you makes it easier to see what really helps. It also lowers the chance of using too much or mixing things that do not go well together.",
    steps: [
      {
        title: "Choose one remedy to reflect on",
        description:
          "Pick one remedy you recently used, such as a herbal tea, tonic, or mixture.",
      },
      {
        title: "Note what you used it for",
        description:
          "Write down the main reason you used this remedy, for example pain relief, digestion, sleep, or general strength.",
      },
      {
        title: "Observe how you felt after",
        description:
          "Notice how you feel over the next 24 to 48 hours, including any improvement, no change, or side effects.",
      },
      {
        title: "Log your reflection",
        description:
          "Write a short note about what you noticed, then come back here and mark the task as complete.",
      },
    ],
    proofType: "self-report",
    isTraditional: true,
    culture: "East African",
  },
];

export function getTaskById(id: string): HealthTask | undefined {
  return mockTasks.find((task) => task.id === id);
}
