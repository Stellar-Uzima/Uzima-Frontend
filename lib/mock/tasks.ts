export type TaskProofType = "self-report" | "photo";

export type HealthTaskStatus = 'available' | 'completed' | 'claimed';

export interface HealthTask {
  id: string;
  title: string;
  category: string;
  rewardXLM: number;
  status: HealthTaskStatus;
  createdAt: string;
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
    status: "available",
    createdAt: "2026-01-15T10:00:00.000Z",
    whyItMatters: "Proper hydration supports all bodily functions and helps maintain energy levels throughout the day.",
    steps: [
      { title: "Track water intake", description: "Record glasses of water consumed" },
      { title: "Set reminders", description: "Use phone or app to remind yourself to drink water" }
    ],
    proofType: "self-report",
    isTraditional: false,
  },
  {
    id: "neighbourhood-walk-photo",
    title: "20 minute neighbourhood walk",
    category: "Exercise",
    rewardXLM: 8,
    status: "available",
    createdAt: "2026-02-01T14:30:00.000Z",
    whyItMatters: "Regular walking improves cardiovascular health and mental wellbeing.",
    steps: [
      { title: "Plan your route", description: "Choose a safe 20-minute walking path" },
      { title: "Take a photo", description: "Capture a photo during your walk as proof" }
    ],
    proofType: "photo",
    isTraditional: false,
  },
  {
    id: "traditional-remedy-log",
    title: "Traditional remedy reflection log",
    category: "Traditional Medicine",
    rewardXLM: 10,
    status: "claimed",
    createdAt: "2025-12-20T09:00:00.000Z",
    whyItMatters: "Documenting traditional remedies helps preserve cultural knowledge and track effectiveness.",
    steps: [
      { title: "Choose a remedy", description: "Select a traditional remedy you've used" },
      { title: "Document experience", description: "Write about its preparation and effects" }
    ],
    proofType: "self-report",
    isTraditional: true,
    culture: "East African",
  },
  {
    id: "meditation-session",
    title: "10-minute mindfulness meditation",
    category: "Mental Health",
    rewardXLM: 6,
    status: "available",
    whyItMatters: "Regular meditation reduces stress and improves mental clarity.",
    steps: [
      { title: "Find quiet space", description: "Choose a comfortable, quiet location" },
      { title: "Set timer", description: "Use a meditation app or timer for 10 minutes" }
    ],
    proofType: "self-report",
    isTraditional: false,
    createdAt: "2024-03-12T07:00:00Z",
  },
  {
    id: "hand-washing-routine",
    title: "Proper hand washing technique",
    category: "Hygiene",
    rewardXLM: 4,
    status: "available",
    whyItMatters: "Proper hand hygiene prevents the spread of infections and diseases.",
    steps: [
      { title: "Wash for 20 seconds", description: "Use soap and warm water" },
      { title: "Document technique", description: "Report on your hand washing routine" }
    ],
    proofType: "self-report",
    isTraditional: false,
    createdAt: "2024-03-11T06:00:00Z",
  },
  {
    id: "prenatal-vitamin",
    title: "Take prenatal vitamins",
    category: "Maternal",
    rewardXLM: 7,
    status: "available",
    whyItMatters: "Prenatal vitamins support healthy pregnancy and fetal development.",
    steps: [
      { title: "Take with food", description: "Take vitamins with a meal to reduce nausea" },
      { title: "Track intake", description: "Log daily vitamin consumption" }
    ],
    proofType: "self-report",
    isTraditional: false,
    createdAt: "2024-03-10T05:00:00Z",
  },
  {
    id: "fruit-vegetable-intake",
    title: "Eat 5 servings of fruits and vegetables",
    category: "Nutrition",
    rewardXLM: 9,
    status: "available",
    whyItMatters: "Fruits and vegetables provide essential vitamins, minerals, and fiber.",
    steps: [
      { title: "Plan meals", description: "Include fruits and vegetables in each meal" },
      { title: "Track servings", description: "Count and record your daily intake" }
    ],
    proofType: "self-report",
    isTraditional: false,
    createdAt: "2024-03-09T04:00:00Z",
  },
  {
    id: "strength-training",
    title: "30-minute strength training",
    category: "Exercise",
    rewardXLM: 12,
    status: "available",
    whyItMatters: "Strength training builds muscle mass and improves bone density.",
    steps: [
      { title: "Warm up", description: "Start with 5-10 minutes of light cardio" },
      { title: "Exercise major muscle groups", description: "Focus on compound movements" }
    ],
    proofType: "photo",
    isTraditional: false,
    createdAt: "2024-03-08T03:00:00Z",
  },
  {
    id: "herbal-tea-preparation",
    title: "Prepare traditional herbal tea",
    category: "Traditional Medicine",
    rewardXLM: 8,
    status: "available",
    whyItMatters: "Traditional herbal teas provide natural remedies and cultural connection.",
    steps: [
      { title: "Select herbs", description: "Choose appropriate herbs for your needs" },
      { title: "Proper brewing", description: "Follow traditional preparation methods" }
    ],
    proofType: "photo",
    isTraditional: true,
    culture: "Various",
    createdAt: "2024-03-07T02:00:00Z",
  },
  {
    id: "gratitude-journal",
    title: "Write in gratitude journal",
    category: "Mental Health",
    rewardXLM: 5,
    status: "completed",
    whyItMatters: "Gratitude practice improves mental health and life satisfaction.",
    steps: [
      { title: "List 3 things", description: "Write down three things you're grateful for" },
      { title: "Reflect deeply", description: "Think about why each item matters to you" }
    ],
    proofType: "self-report",
    isTraditional: false,
    createdAt: "2024-03-06T01:00:00Z",
  },
  {
    id: "dental-hygiene",
    title: "Complete dental care routine",
    category: "Hygiene",
    rewardXLM: 6,
    status: "available",
    whyItMatters: "Good dental hygiene prevents tooth decay and gum disease.",
    steps: [
      { title: "Brush teeth", description: "Brush for 2 minutes with fluoride toothpaste" },
      { title: "Floss", description: "Clean between teeth with dental floss" }
    ],
    proofType: "self-report",
    isTraditional: false,
    createdAt: "2024-03-05T00:00:00Z",
  },
  {
    id: "pregnancy-exercise",
    title: "Prenatal yoga session",
    category: "Maternal",
    rewardXLM: 10,
    status: "available",
    whyItMatters: "Prenatal yoga helps with flexibility, strength, and stress relief during pregnancy.",
    steps: [
      { title: "Follow safe poses", description: "Use pregnancy-safe yoga modifications" },
      { title: "Focus on breathing", description: "Practice deep breathing techniques" }
    ],
    proofType: "photo",
    isTraditional: false,
    createdAt: "2024-03-04T23:00:00Z",
  },
  {
    id: "healthy-breakfast",
    title: "Prepare nutritious breakfast",
    category: "Nutrition",
    rewardXLM: 7,
    status: "available",
    whyItMatters: "A healthy breakfast provides energy and nutrients to start the day right.",
    steps: [
      { title: "Include protein", description: "Add eggs, yogurt, or nuts to your meal" },
      { title: "Add whole grains", description: "Choose oats, whole grain bread, or quinoa" }
    ],
    proofType: "photo",
    isTraditional: false,
    createdAt: "2024-03-03T22:00:00Z",
  },
  {
    id: "cardio-workout",
    title: "45-minute cardio session",
    category: "Exercise",
    rewardXLM: 11,
    status: "available",
    whyItMatters: "Cardiovascular exercise strengthens the heart and improves endurance.",
    steps: [
      { title: "Choose activity", description: "Running, cycling, swimming, or dancing" },
      { title: "Monitor intensity", description: "Maintain moderate to vigorous intensity" }
    ],
    proofType: "photo",
    isTraditional: false,
    createdAt: "2024-03-02T21:00:00Z",
  },
  {
    id: "traditional-massage",
    title: "Self-massage with traditional oils",
    category: "Traditional Medicine",
    rewardXLM: 9,
    status: "available",
    whyItMatters: "Traditional massage techniques promote circulation and relaxation.",
    steps: [
      { title: "Prepare oils", description: "Use traditional oils like coconut or sesame" },
      { title: "Apply technique", description: "Follow traditional massage methods" }
    ],
    proofType: "self-report",
    isTraditional: true,
    culture: "Ayurvedic",
    createdAt: "2024-03-01T20:00:00Z",
  },
  {
    id: "stress-management",
    title: "Practice stress reduction techniques",
    category: "Mental Health",
    rewardXLM: 8,
    status: "available",
    whyItMatters: "Managing stress is crucial for both mental and physical health.",
    steps: [
      { title: "Identify stressors", description: "Recognize what causes you stress" },
      { title: "Apply techniques", description: "Use breathing, meditation, or other methods" }
    ],
    proofType: "self-report",
    isTraditional: false,
    createdAt: "2024-02-29T19:00:00Z",
  },
  {
    id: "personal-hygiene",
    title: "Complete personal hygiene routine",
    category: "Hygiene",
    rewardXLM: 5,
    status: "completed",
    whyItMatters: "Personal hygiene prevents infections and promotes overall health.",
    steps: [
      { title: "Shower or bathe", description: "Clean your body thoroughly" },
      { title: "Grooming", description: "Trim nails, clean ears, and other grooming tasks" }
    ],
    proofType: "self-report",
    isTraditional: false,
    createdAt: "2024-02-28T18:00:00Z",
  },
  {
    id: "breastfeeding-support",
    title: "Breastfeeding education session",
    category: "Maternal",
    rewardXLM: 8,
    status: "available",
    whyItMatters: "Proper breastfeeding knowledge supports infant and maternal health.",
    steps: [
      { title: "Learn techniques", description: "Study proper latching and positioning" },
      { title: "Practice", description: "Apply learned techniques during feeding" }
    ],
    proofType: "self-report",
    isTraditional: false,
    createdAt: "2024-02-27T17:00:00Z",
  },
  {
    id: "meal-prep",
    title: "Prepare healthy meals for the week",
    category: "Nutrition",
    rewardXLM: 15,
    status: "available",
    whyItMatters: "Meal preparation ensures consistent healthy eating throughout the week.",
    steps: [
      { title: "Plan meals", description: "Create a balanced meal plan for the week" },
      { title: "Prep ingredients", description: "Wash, chop, and portion ingredients" }
    ],
    proofType: "photo",
    isTraditional: false,
    createdAt: "2024-02-26T16:00:00Z",
  },
  {
    id: "flexibility-training",
    title: "30-minute stretching session",
    category: "Exercise",
    rewardXLM: 7,
    status: "available",
    whyItMatters: "Regular stretching improves flexibility and reduces injury risk.",
    steps: [
      { title: "Warm up", description: "Start with light movement to warm muscles" },
      { title: "Hold stretches", description: "Hold each stretch for 15-30 seconds" }
    ],
    proofType: "self-report",
    isTraditional: false,
    createdAt: "2024-02-25T15:00:00Z",
  },
  {
    id: "traditional-healing-ritual",
    title: "Participate in traditional healing ceremony",
    category: "Traditional Medicine",
    rewardXLM: 12,
    status: "available",
    whyItMatters: "Traditional healing ceremonies provide spiritual and emotional wellness.",
    steps: [
      { title: "Prepare mindfully", description: "Approach the ceremony with respect and openness" },
      { title: "Participate fully", description: "Engage in the traditional practices" }
    ],
    proofType: "self-report",
    isTraditional: true,
    culture: "Indigenous",
    createdAt: "2024-02-24T14:00:00Z",
  },
  {
    id: "sleep-hygiene",
    title: "Maintain healthy sleep schedule",
    category: "Mental Health",
    rewardXLM: 6,
    status: "available",
    whyItMatters: "Quality sleep is essential for physical and mental health recovery.",
    steps: [
      { title: "Set bedtime", description: "Go to bed at the same time each night" },
      { title: "Create routine", description: "Develop a relaxing pre-sleep routine" }
    ],
    proofType: "self-report",
    isTraditional: false,
    createdAt: "2024-02-23T13:00:00Z",
  },
  {
    id: "environmental-hygiene",
    title: "Clean and sanitize living space",
    category: "Hygiene",
    rewardXLM: 8,
    status: "available",
    whyItMatters: "A clean environment reduces disease transmission and promotes wellbeing.",
    steps: [
      { title: "Clean surfaces", description: "Disinfect frequently touched surfaces" },
      { title: "Organize space", description: "Maintain a tidy, organized living area" }
    ],
    proofType: "photo",
    isTraditional: false,
    createdAt: "2024-02-22T12:00:00Z",
  },
  {
    id: "postpartum-care",
    title: "Postpartum self-care routine",
    category: "Maternal",
    rewardXLM: 10,
    status: "available",
    whyItMatters: "Proper postpartum care supports recovery and maternal health.",
    steps: [
      { title: "Rest when possible", description: "Take breaks and nap when baby sleeps" },
      { title: "Nutrition focus", description: "Eat nutritious foods to support recovery" }
    ],
    proofType: "self-report",
    isTraditional: false,
    createdAt: "2024-02-21T11:00:00Z",
  },
];

export function getTaskById(id: string): HealthTask | undefined {
  return mockTasks.find((task) => task.id === id);
}
