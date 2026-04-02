import { TaskProofType } from "./mock/tasks";

export interface TaskTemplate {
  category: string;
  title: string;
  xlmReward: number;
  proofType: TaskProofType;
  whyItMatters: string;
  steps: {
    title: string;
    description?: string;
  }[];
  isTraditional: boolean;
  culture?: string;
}

export const TASK_TEMPLATES: TaskTemplate[] = [
  // Nutrition Templates
  {
    category: 'nutrition',
    title: 'Daily Hydration Check',
    xlmReward: 0.2,
    proofType: 'self-report',
    whyItMatters: 'Proper hydration supports all bodily functions and helps maintain energy levels throughout the day.',
    steps: [
      { title: 'Track water intake', description: 'Record glasses of water consumed' },
      { title: 'Set reminders', description: 'Use phone or app to remind yourself to drink water' }
    ],
    isTraditional: false
  },
  {
    category: 'nutrition',
    title: 'Eat 5 Servings of Fruits & Vegetables',
    xlmReward: 0.9,
    proofType: 'photo',
    whyItMatters: 'Fruits and vegetables provide essential vitamins, minerals, and fiber for optimal health.',
    steps: [
      { title: 'Plan meals', description: 'Include fruits and vegetables in each meal' },
      { title: 'Track servings', description: 'Count and record your daily intake' }
    ],
    isTraditional: false
  },

  // Exercise Templates
  {
    category: 'exercise',
    title: '30-Minute Walk',
    xlmReward: 0.5,
    proofType: 'self-report',
    whyItMatters: 'Regular walking improves cardiovascular health and mental wellbeing.',
    steps: [
      { title: 'Plan your route', description: 'Choose a safe 30-minute walking path' },
      { title: 'Maintain pace', description: 'Walk at a moderate, steady pace' }
    ],
    isTraditional: false
  },
  {
    category: 'exercise',
    title: '15-Minute Strength Training',
    xlmReward: 1.2,
    proofType: 'photo',
    whyItMatters: 'Strength training builds muscle mass and improves bone density.',
    steps: [
      { title: 'Warm up', description: 'Start with 5 minutes of light cardio' },
      { title: 'Exercise major muscle groups', description: 'Focus on compound movements' }
    ],
    isTraditional: false
  },

  // Traditional Medicine Templates
  {
    category: 'traditional',
    title: 'Traditional Remedy Log',
    xlmReward: 0.3,
    proofType: 'self-report',
    whyItMatters: 'Documenting traditional remedies helps preserve cultural knowledge and track effectiveness.',
    steps: [
      { title: 'Choose a remedy', description: 'Select a traditional remedy you\'ve used' },
      { title: 'Document experience', description: 'Write about its preparation and effects' }
    ],
    isTraditional: true,
    culture: 'East African'
  },
  {
    category: 'traditional',
    title: 'Prepare Traditional Herbal Tea',
    xlmReward: 0.8,
    proofType: 'photo',
    whyItMatters: 'Traditional herbal teas provide natural remedies and cultural connection.',
    steps: [
      { title: 'Select herbs', description: 'Choose appropriate herbs for your needs' },
      { title: 'Proper brewing', description: 'Follow traditional preparation methods' }
    ],
    isTraditional: true,
    culture: 'Various'
  },

  // Mental Health Templates
  {
    category: 'mental_health',
    title: '10-Minute Mindfulness Meditation',
    xlmReward: 0.6,
    proofType: 'self-report',
    whyItMatters: 'Regular meditation reduces stress and improves mental clarity.',
    steps: [
      { title: 'Find quiet space', description: 'Choose a comfortable, quiet location' },
      { title: 'Set timer', description: 'Use a meditation app or timer for 10 minutes' }
    ],
    isTraditional: false
  },
  {
    category: 'mental_health',
    title: 'Gratitude Journal Entry',
    xlmReward: 0.5,
    proofType: 'self-report',
    whyItMatters: 'Gratitude practice improves mental health and life satisfaction.',
    steps: [
      { title: 'List 3 things', description: 'Write down three things you\'re grateful for' },
      { title: 'Reflect deeply', description: 'Think about why each item matters to you' }
    ],
    isTraditional: false
  },

  // Hygiene Templates
  {
    category: 'hygiene',
    title: 'Proper Hand Washing Routine',
    xlmReward: 0.4,
    proofType: 'self-report',
    whyItMatters: 'Proper hand hygiene prevents the spread of infections and diseases.',
    steps: [
      { title: 'Wash for 20 seconds', description: 'Use soap and warm water' },
      { title: 'Document technique', description: 'Report on your hand washing routine' }
    ],
    isTraditional: false
  },
  {
    category: 'hygiene',
    title: 'Complete Dental Care Routine',
    xlmReward: 0.6,
    proofType: 'photo',
    whyItMatters: 'Good dental hygiene prevents tooth decay and gum disease.',
    steps: [
      { title: 'Brush teeth', description: 'Brush for 2 minutes with fluoride toothpaste' },
      { title: 'Floss', description: 'Clean between teeth with dental floss' }
    ],
    isTraditional: false
  },

  // Maternal Health Templates
  {
    category: 'maternal',
    title: 'Take Prenatal Vitamins',
    xlmReward: 0.7,
    proofType: 'self-report',
    whyItMatters: 'Prenatal vitamins support healthy pregnancy and fetal development.',
    steps: [
      { title: 'Take with food', description: 'Take vitamins with a meal to reduce nausea' },
      { title: 'Track intake', description: 'Log daily vitamin consumption' }
    ],
    isTraditional: false
  },
  {
    category: 'maternal',
    title: 'Prenatal Yoga Session',
    xlmReward: 1.0,
    proofType: 'photo',
    whyItMatters: 'Prenatal yoga helps with flexibility, strength, and stress relief during pregnancy.',
    steps: [
      { title: 'Follow safe poses', description: 'Use pregnancy-safe yoga modifications' },
      { title: 'Focus on breathing', description: 'Practice deep breathing techniques' }
    ],
    isTraditional: false
  }
];

export const categoryIcon: Record<string, string> = {
  nutrition: "💧",
  exercise: "🏃",
  mental_health: "🧘",
  maternal: "👶",
  traditional: "🌿",
  hygiene: "🧼",
};

export function getTemplateByCategory(category: string): TaskTemplate[] {
  return TASK_TEMPLATES.filter(template => template.category === category);
}

export function getTemplateById(title: string): TaskTemplate | undefined {
  return TASK_TEMPLATES.find(template => template.title === title);
}
