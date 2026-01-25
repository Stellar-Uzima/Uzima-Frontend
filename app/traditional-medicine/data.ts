
export interface TraditionalTreatment {
  id: string
  name: string
  localName: string
  region: string
  category: "herb" | "practice" | "ritual" | "therapy"
  description: string
  uses: string[]
  preparation: string
  dosage: string
  contraindications: string[]
  modernEquivalent?: string
  scientificEvidence: "high" | "moderate" | "low" | "none"
  safetyRating: number
  culturalSignificance: "sacred" | "traditional" | "common"
  verifiedBy: string[]
  interactions: string[]
  image: string
}

export interface CommunityHealer {
  id: string
  name: string
  title: string
  region: string
  specialties: string[]
  experience: number
  verificationStatus: "verified" | "pending" | "community"
  rating: number
  consultations: number
  languages: string[]
  avatar: string
}

export const traditionalTreatments: TraditionalTreatment[] = [
  {
    id: "1",
    name: "African Potato",
    localName: "Ilabatheka (Zulu)",
    region: "Southern Africa",
    category: "herb",
    description: "Traditional immune system booster used for centuries across Southern Africa",
    uses: ["Immune support", "Respiratory health", "General wellness"],
    preparation: "Dried root powder mixed with warm water or honey",
    dosage: "1 teaspoon twice daily with meals",
    contraindications: ["Pregnancy", "Autoimmune conditions"],
    modernEquivalent: "Immune modulators, Vitamin C supplements",
    scientificEvidence: "moderate",
    safetyRating: 4,
    culturalSignificance: "traditional",
    verifiedBy: ["Dr. Nomsa Mbeki", "Traditional Healer Sipho"],
    interactions: ["May enhance immune medications"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "2",
    name: "Sutherlandia",
    localName: "Kankerbos (Afrikaans)",
    region: "South Africa",
    category: "herb",
    description: "Known as 'Cancer Bush', used traditionally for various ailments",
    uses: ["Cancer support", "Diabetes management", "Stress relief"],
    preparation: "Tea from dried leaves, 1 cup 2-3 times daily",
    dosage: "2-3 grams dried herb per cup of boiling water",
    contraindications: ["Pregnancy", "Breastfeeding", "Severe liver disease"],
    modernEquivalent: "Adaptogenic herbs, Anti-inflammatory medications",
    scientificEvidence: "high",
    safetyRating: 3,
    culturalSignificance: "sacred",
    verifiedBy: ["Prof. Sarah Johnson", "Healer Maria Tshwane"],
    interactions: ["May interact with diabetes medications"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "3",
    name: "Moringa",
    localName: "Zogale (Hausa)",
    region: "West Africa",
    category: "herb",
    description: "Nutrient-dense 'miracle tree' used for malnutrition and general health",
    uses: ["Malnutrition", "Anemia", "Lactation support", "Blood pressure"],
    preparation: "Fresh leaves in food, powder in smoothies, or tea",
    dosage: "1-2 tablespoons powder daily or handful of fresh leaves",
    contraindications: ["Root bark during pregnancy"],
    modernEquivalent: "Multivitamins, Iron supplements",
    scientificEvidence: "high",
    safetyRating: 5,
    culturalSignificance: "common",
    verifiedBy: ["Dr. Amina Hassan", "Elder Fatima Kone"],
    interactions: ["May enhance iron absorption"],
    image: "/placeholder.svg?height=200&width=200",
  },
]

export const communityHealers: CommunityHealer[] = [
  {
    id: "1",
    name: "Mama Aisha Kone",
    title: "Traditional Birth Attendant & Herbalist",
    region: "Mali",
    specialties: ["Women's Health", "Pediatric Care", "Digestive Disorders"],
    experience: 35,
    verificationStatus: "verified",
    rating: 4.9,
    consultations: 2847,
    languages: ["Bambara", "French", "Arabic"],
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "2",
    name: "Dr. Kwame Asante",
    title: "Integrative Medicine Practitioner",
    region: "Ghana",
    specialties: ["Mental Health", "Chronic Diseases", "Pain Management"],
    experience: 15,
    verificationStatus: "verified",
    rating: 4.8,
    consultations: 1923,
    languages: ["Twi", "English", "Ga"],
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "3",
    name: "Elder Nomsa Mbeki",
    title: "Sangoma & Community Healer",
    region: "South Africa",
    specialties: ["Spiritual Healing", "Respiratory Health", "Skin Conditions"],
    experience: 42,
    verificationStatus: "community",
    rating: 4.7,
    consultations: 3156,
    languages: ["Zulu", "Xhosa", "English"],
    avatar: "/placeholder.svg?height=60&width=60",
  },
]
