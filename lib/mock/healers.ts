export type HealerSpecialty =
  | 'Herbal Medicine'
  | 'Spiritual Healing'
  | 'Midwifery'
  | 'Bone Setting'
  | 'Nutrition'

export type HealerRegion =
  | 'West Africa'
  | 'East Africa'
  | 'North Africa'
  | 'Southern Africa'
  | 'Central Africa'

export interface Healer {
  id: string
  name: string
  imageUrl?: string
  country: string
  countryCode: string
  region: HealerRegion
  specialties: HealerSpecialty[]
  languages: string[]
  rating: number
  reviewCount: number
  isVerified: boolean
}

export const healerSpecialties: HealerSpecialty[] = [
  'Herbal Medicine',
  'Spiritual Healing',
  'Midwifery',
  'Bone Setting',
  'Nutrition',
]

export const healerRegions: HealerRegion[] = [
  'West Africa',
  'East Africa',
  'North Africa',
  'Southern Africa',
  'Central Africa',
]

export const healerLanguages: string[] = [
  'English',
  'Swahili',
  'Yoruba',
  'Igbo',
  'Hausa',
  'Amharic',
  'Arabic',
  'Zulu',
  'French',
]

export const mockHealers: Healer[] = [
  {
    id: 'healer-ama-adu',
    name: 'Ama Adu',
    imageUrl:
      'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200',
    country: 'Ghana',
    countryCode: 'GH',
    region: 'West Africa',
    specialties: ['Herbal Medicine', 'Nutrition'],
    languages: ['English', 'Twi'],
    rating: 4.8,
    reviewCount: 132,
    isVerified: true,
  },
  {
    id: 'healer-oluwaseun-balogun',
    name: 'Oluwaseun Balogun',
    imageUrl:
      'https://images.pexels.com/photos/1181514/pexels-photo-1181514.jpeg?auto=compress&cs=tinysrgb&w=200',
    country: 'Nigeria',
    countryCode: 'NG',
    region: 'West Africa',
    specialties: ['Herbal Medicine', 'Spiritual Healing'],
    languages: ['English', 'Yoruba'],
    rating: 4.9,
    reviewCount: 204,
    isVerified: true,
  },
  {
    id: 'healer-nia-okello',
    name: 'Nia Okello',
    imageUrl:
      'https://images.pexels.com/photos/3760852/pexels-photo-3760852.jpeg?auto=compress&cs=tinysrgb&w=200',
    country: 'Kenya',
    countryCode: 'KE',
    region: 'East Africa',
    specialties: ['Midwifery', 'Nutrition'],
    languages: ['English', 'Swahili'],
    rating: 4.7,
    reviewCount: 98,
    isVerified: true,
  },
  {
    id: 'healer-abdi-hassan',
    name: 'Abdi Hassan',
    country: 'Somalia',
    countryCode: 'SO',
    region: 'East Africa',
    specialties: ['Spiritual Healing', 'Herbal Medicine'],
    languages: ['Somali', 'Arabic'],
    rating: 4.6,
    reviewCount: 76,
    isVerified: true,
  },
  {
    id: 'healer-selam-belay',
    name: 'Selam Belay',
    imageUrl:
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200',
    country: 'Ethiopia',
    countryCode: 'ET',
    region: 'East Africa',
    specialties: ['Herbal Medicine', 'Bone Setting'],
    languages: ['Amharic', 'English'],
    rating: 4.8,
    reviewCount: 141,
    isVerified: true,
  },
  {
    id: 'healer-musa-diallo',
    name: 'Musa Diallo',
    country: 'Senegal',
    countryCode: 'SN',
    region: 'West Africa',
    specialties: ['Spiritual Healing', 'Bone Setting'],
    languages: ['French', 'Wolof'],
    rating: 4.5,
    reviewCount: 63,
    isVerified: true,
  },
  {
    id: 'healer-lindiwe-dlamini',
    name: 'Lindiwe Dlamini',
    imageUrl:
      'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200',
    country: 'South Africa',
    countryCode: 'ZA',
    region: 'Southern Africa',
    specialties: ['Herbal Medicine', 'Spiritual Healing'],
    languages: ['Zulu', 'English'],
    rating: 4.9,
    reviewCount: 187,
    isVerified: true,
  },
  {
    id: 'healer-thabo-mbeki',
    name: 'Thabo Mbeki',
    country: 'Lesotho',
    countryCode: 'LS',
    region: 'Southern Africa',
    specialties: ['Bone Setting'],
    languages: ['Sesotho', 'English'],
    rating: 4.4,
    reviewCount: 52,
    isVerified: true,
  },
  {
    id: 'healer-fatima-el-sayed',
    name: 'Fatima El-Sayed',
    imageUrl:
      'https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg?auto=compress&cs=tinysrgb&w=200',
    country: 'Egypt',
    countryCode: 'EG',
    region: 'North Africa',
    specialties: ['Herbal Medicine', 'Nutrition'],
    languages: ['Arabic', 'English'],
    rating: 4.7,
    reviewCount: 121,
    isVerified: true,
  },
  {
    id: 'healer-samira-ben-ali',
    name: 'Samira Ben Ali',
    country: 'Morocco',
    countryCode: 'MA',
    region: 'North Africa',
    specialties: ['Spiritual Healing'],
    languages: ['Arabic', 'French'],
    rating: 4.6,
    reviewCount: 88,
    isVerified: true,
  },
  {
    id: 'healer-chinonso-okoro',
    name: 'Chinonso Okoro',
    country: 'Nigeria',
    countryCode: 'NG',
    region: 'West Africa',
    specialties: ['Midwifery', 'Herbal Medicine'],
    languages: ['English', 'Igbo'],
    rating: 4.8,
    reviewCount: 164,
    isVerified: true,
  },
  {
    id: 'healer-yao-kouassi',
    name: 'Yao Kouassi',
    country: "Côte d'Ivoire",
    countryCode: 'CI',
    region: 'West Africa',
    specialties: ['Nutrition'],
    languages: ['French'],
    rating: 4.3,
    reviewCount: 47,
    isVerified: true,
  },
]

