import { useEffect, useMemo, useState } from "react"

export interface SearchResult {
  id: string
  title: string
  description: string
  category: "article" | "service" | "helper" | "marketplace"
  url: string
  thumbnail?: string
  createdAt: Date
}

type SearchCategory = SearchResult["category"]
export type SearchTab = "all" | SearchCategory
export type DateRange = "7d" | "30d" | "1y" | "all"
export type SortBy = "relevance" | "newest" | "popular"
export type PriceType = "all" | "free" | "paid" | "premium"

export interface SearchFilters {
  dateRange: DateRange
  sortBy: SortBy
  type: PriceType
}

interface SearchItem extends SearchResult {
  type: Exclude<PriceType, "all">
  popularity: number
}

const day = 24 * 60 * 60 * 1000
const now = Date.now()

const SEARCH_DATA: SearchItem[] = [
  {
    id: "article-1",
    title: "Understanding Stellar Health Rewards",
    description:
      "A practical guide to earning and redeeming Stellar-based rewards for healthy actions.",
    category: "article",
    url: "/blog/stellar-health-rewards",
    createdAt: new Date(now - day * 3),
    type: "free",
    popularity: 93,
  },
  {
    id: "article-2",
    title: "Care Plans for Remote Communities",
    description:
      "How community health workers can build resilient care plans with Uzima tools.",
    category: "article",
    url: "/blog/remote-care-plans",
    createdAt: new Date(now - day * 18),
    type: "free",
    popularity: 78,
  },
  {
    id: "article-3",
    title: "Marketplace Basics for Health Services",
    description:
      "Best practices for listing services, setting pricing tiers, and building trust.",
    category: "article",
    url: "/blog/marketplace-basics",
    createdAt: new Date(now - day * 44),
    type: "free",
    popularity: 71,
  },
  {
    id: "article-4",
    title: "Designing Care Journeys with Helpers",
    description:
      "A field guide to coordinating helpers and scheduling outreach efficiently.",
    category: "article",
    url: "/blog/care-journeys",
    createdAt: new Date(now - day * 120),
    type: "free",
    popularity: 65,
  },
  {
    id: "article-5",
    title: "Tracking Outcomes with Stellar Analytics",
    description:
      "Measure impact and iterate on programs using real-time reporting dashboards.",
    category: "article",
    url: "/blog/stellar-analytics",
    createdAt: new Date(now - day * 280),
    type: "premium",
    popularity: 81,
  },
  {
    id: "article-6",
    title: "Building Trust in Community Care",
    description:
      "Learn how to create reliable, human-centered care experiences at scale.",
    category: "article",
    url: "/blog/community-care-trust",
    createdAt: new Date(now - day * 9),
    type: "free",
    popularity: 87,
  },
  {
    id: "service-1",
    title: "Telemedicine Consultations",
    description:
      "Book secure video consultations with licensed providers across regions.",
    category: "service",
    url: "/services/telemedicine",
    createdAt: new Date(now - day * 5),
    type: "paid",
    popularity: 98,
  },
  {
    id: "service-2",
    title: "Maternal Care Programs",
    description:
      "End-to-end maternal support including prenatal check-ins and guidance.",
    category: "service",
    url: "/services/maternal-care",
    createdAt: new Date(now - day * 29),
    type: "premium",
    popularity: 89,
  },
  {
    id: "service-3",
    title: "Community Wellness Workshops",
    description:
      "Facilitated group sessions for nutrition, prevention, and healthy habits.",
    category: "service",
    url: "/services/wellness-workshops",
    createdAt: new Date(now - day * 12),
    type: "free",
    popularity: 74,
  },
  {
    id: "service-4",
    title: "Chronic Care Monitoring",
    description:
      "Ongoing monitoring plans with alerts and personalized support.",
    category: "service",
    url: "/services/chronic-care",
    createdAt: new Date(now - day * 200),
    type: "premium",
    popularity: 83,
  },
  {
    id: "service-5",
    title: "Nutrition Coaching",
    description:
      "One-on-one guidance with personalized meal plans and check-ins.",
    category: "service",
    url: "/services/nutrition-coaching",
    createdAt: new Date(now - day * 62),
    type: "paid",
    popularity: 77,
  },
  {
    id: "service-6",
    title: "Emergency Support Network",
    description:
      "Rapid response coordination with vetted local health partners.",
    category: "service",
    url: "/services/emergency-support",
    createdAt: new Date(now - day * 2),
    type: "premium",
    popularity: 92,
  },
  {
    id: "helper-1",
    title: "Amina N. - Community Health Worker",
    description:
      "Specializes in maternal health outreach and home visit coordination.",
    category: "helper",
    url: "/helpers/amina-n",
    createdAt: new Date(now - day * 7),
    type: "free",
    popularity: 86,
  },
  {
    id: "helper-2",
    title: "Dr. Patel - Telemedicine Partner",
    description:
      "Experienced in chronic care management and remote consultations.",
    category: "helper",
    url: "/helpers/dr-patel",
    createdAt: new Date(now - day * 90),
    type: "paid",
    popularity: 88,
  },
  {
    id: "helper-3",
    title: "Maya K. - Nutrition Specialist",
    description:
      "Certified nutrition coach focused on youth and adolescent programs.",
    category: "helper",
    url: "/helpers/maya-k",
    createdAt: new Date(now - day * 21),
    type: "paid",
    popularity: 75,
  },
  {
    id: "helper-4",
    title: "Samuel O. - Outreach Coordinator",
    description:
      "Coordinates field teams and volunteer scheduling across regions.",
    category: "helper",
    url: "/helpers/samuel-o",
    createdAt: new Date(now - day * 180),
    type: "free",
    popularity: 69,
  },
  {
    id: "helper-5",
    title: "Lina A. - Wellness Facilitator",
    description:
      "Runs community wellness sessions and helps with service navigation.",
    category: "helper",
    url: "/helpers/lina-a",
    createdAt: new Date(now - day * 13),
    type: "premium",
    popularity: 82,
  },
  {
    id: "helper-6",
    title: "Kofi D. - Mobile Care Specialist",
    description:
      "Delivers mobile care services and supports remote diagnostics.",
    category: "helper",
    url: "/helpers/kofi-d",
    createdAt: new Date(now - day * 35),
    type: "paid",
    popularity: 73,
  },
  {
    id: "market-1",
    title: "Solar Clinic Starter Kit",
    description:
      "Portable clinic equipment bundle with solar-powered storage.",
    category: "marketplace",
    url: "/marketplace/solar-clinic-kit",
    createdAt: new Date(now - day * 6),
    type: "premium",
    popularity: 91,
  },
  {
    id: "market-2",
    title: "Wearable Health Trackers",
    description:
      "Affordable tracking devices for monitoring vitals and activity.",
    category: "marketplace",
    url: "/marketplace/health-trackers",
    createdAt: new Date(now - day * 16),
    type: "paid",
    popularity: 79,
  },
  {
    id: "market-3",
    title: "Community Care Starter Pack",
    description:
      "Educational materials, scheduling tools, and volunteer resources.",
    category: "marketplace",
    url: "/marketplace/care-starter-pack",
    createdAt: new Date(now - day * 60),
    type: "free",
    popularity: 68,
  },
  {
    id: "market-4",
    title: "Rapid Diagnostic Kits",
    description:
      "On-demand diagnostic kits for field teams and pop-up clinics.",
    category: "marketplace",
    url: "/marketplace/diagnostic-kits",
    createdAt: new Date(now - day * 240),
    type: "paid",
    popularity: 84,
  },
  {
    id: "market-5",
    title: "Mobile Outreach Backpack",
    description:
      "Organized supply kit built for community health workers.",
    category: "marketplace",
    url: "/marketplace/outreach-backpack",
    createdAt: new Date(now - day * 11),
    type: "free",
    popularity: 72,
  },
  {
    id: "market-6",
    title: "Connectivity Hotspot Bundle",
    description:
      "Reliable connectivity for telemedicine sessions in remote areas.",
    category: "marketplace",
    url: "/marketplace/connectivity-bundle",
    createdAt: new Date(now - day * 95),
    type: "premium",
    popularity: 76,
  },
]

const POPULAR_SEARCHES = [
  "Telemedicine consultations",
  "Community health helpers",
  "Stellar rewards",
  "Maternal care programs",
  "Wellness workshops",
  "Mobile outreach kits",
]

const HISTORY_KEY = "uzima-search-history"

const CATEGORY_ORDER: SearchCategory[] = [
  "article",
  "service",
  "helper",
  "marketplace",
]

function scoreItem(item: SearchItem, query: string) {
  const haystack = `${item.title} ${item.description}`.toLowerCase()
  if (!haystack.includes(query)) {
    return 0
  }

  let score = 0
  if (item.title.toLowerCase().includes(query)) {
    score += 6
  }
  if (item.title.toLowerCase().startsWith(query)) {
    score += 3
  }
  if (item.description.toLowerCase().includes(query)) {
    score += 2
  }

  return score
}

function matchesTerms(item: SearchItem, terms: string[]) {
  const haystack = `${item.title} ${item.description}`.toLowerCase()
  return terms.every((term) => haystack.includes(term))
}

function applyDateRange(items: SearchItem[], range: DateRange) {
  if (range === "all") {
    return items
  }

  const nowDate = Date.now()
  const ranges: Record<DateRange, number> = {
    "7d": day * 7,
    "30d": day * 30,
    "1y": day * 365,
    all: Infinity,
  }
  const cutoff = nowDate - ranges[range]
  return items.filter((item) => item.createdAt.getTime() >= cutoff)
}

export function useSearch(query: string, filters: SearchFilters) {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [history, setHistory] = useState<string[]>([])

  const normalizedQuery = query.trim().toLowerCase()
  const hasQuery = normalizedQuery.length >= 2

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }
    const stored = window.localStorage.getItem(HISTORY_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setHistory(parsed.slice(0, 10))
        }
      } catch {
        setHistory([])
      }
    }
  }, [])

  useEffect(() => {
    if (!hasQuery) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    const terms = normalizedQuery.split(/\s+/).filter(Boolean)

    const timer = setTimeout(() => {
      const filteredByQuery = SEARCH_DATA.filter((item) =>
        matchesTerms(item, terms),
      )
      const filteredByDate = applyDateRange(filteredByQuery, filters.dateRange)
      const filteredByType =
        filters.type === "all"
          ? filteredByDate
          : filteredByDate.filter((item) => item.type === filters.type)

      let sorted = [...filteredByType]

      if (filters.sortBy === "newest") {
        sorted.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
        )
      } else if (filters.sortBy === "popular") {
        sorted.sort((a, b) => b.popularity - a.popularity)
      } else {
        sorted.sort((a, b) => {
          const scoreDiff =
            scoreItem(b, normalizedQuery) - scoreItem(a, normalizedQuery)
          if (scoreDiff !== 0) {
            return scoreDiff
          }
          return b.popularity - a.popularity
        })
      }

      setResults(sorted)
      setLoading(false)
    }, 350)

    return () => clearTimeout(timer)
  }, [filters.dateRange, filters.sortBy, filters.type, hasQuery, normalizedQuery])

  const groupedResults = useMemo(() => {
    const grouped: Record<SearchCategory, SearchResult[]> = {
      article: [],
      service: [],
      helper: [],
      marketplace: [],
    }

    results.forEach((result) => {
      grouped[result.category].push(result)
    })

    return grouped
  }, [results])

  const totals = useMemo(() => {
    const counts: Record<SearchCategory, number> = {
      article: 0,
      service: 0,
      helper: 0,
      marketplace: 0,
    }

    results.forEach((result) => {
      counts[result.category] += 1
    })

    return counts
  }, [results])

  const suggestions = useMemo(() => {
    if (!normalizedQuery) {
      return POPULAR_SEARCHES
    }

    const source = [
      ...POPULAR_SEARCHES,
      ...SEARCH_DATA.map((item) => item.title),
    ]
    const unique = Array.from(new Set(source))
    return unique
      .filter((suggestion) =>
        suggestion.toLowerCase().includes(normalizedQuery),
      )
      .slice(0, 6)
  }, [normalizedQuery])

  const addToHistory = (term: string) => {
    if (!term) {
      return
    }
    setHistory((prev) => {
      const next = [
        term,
        ...prev.filter(
          (item) => item.toLowerCase() !== term.toLowerCase(),
        ),
      ].slice(0, 10)

      if (typeof window !== "undefined") {
        window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next))
      }
      return next
    })
  }

  const clearHistory = () => {
    setHistory([])
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(HISTORY_KEY)
    }
  }

  const commitSearch = (term: string) => {
    if (!term) {
      return
    }
    // Analytics placeholder
    // eslint-disable-next-line no-console
    console.log(`Search query: ${term}`)
    addToHistory(term)
  }

  return {
    categoryOrder: CATEGORY_ORDER,
    groupedResults,
    totals,
    results,
    suggestions,
    popularSuggestions: POPULAR_SEARCHES,
    history,
    loading,
    hasQuery,
    commitSearch,
    clearHistory,
  }
}
