"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import {
  BookOpen,
  Briefcase,
  Clock,
  Search,
  SlidersHorizontal,
  Store,
  TrendingUp,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useIsMobile } from "@/hooks/use-mobile"
import { useDebounce } from "@/hooks/useDebounce"
import {
  SearchFilters,
  SearchResult,
  SearchTab,
  useSearch,
} from "@/hooks/useSearch"
import { cn } from "@/lib/utils"

type SearchCategory = Exclude<SearchTab, "all">

const categoryMeta: Record<
  SearchCategory,
  { label: string; icon: typeof BookOpen; badge: string }
> = {
  article: {
    label: "Articles",
    icon: BookOpen,
    badge: "bg-amber-100 text-amber-900 border-amber-200",
  },
  service: {
    label: "Services",
    icon: Briefcase,
    badge: "bg-emerald-100 text-emerald-900 border-emerald-200",
  },
  helper: {
    label: "Helpers",
    icon: Users,
    badge: "bg-sky-100 text-sky-900 border-sky-200",
  },
  marketplace: {
    label: "Marketplace",
    icon: Store,
    badge: "bg-orange-100 text-orange-900 border-orange-200",
  },
}

const categoryOrder: SearchCategory[] = [
  "article",
  "service",
  "helper",
  "marketplace",
]

const baseFilters: SearchFilters = {
  dateRange: "all",
  sortBy: "relevance",
  type: "all",
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function highlightMatch(text: string, query: string) {
  const terms = query.trim().split(/\s+/).filter(Boolean)
  if (!terms.length) {
    return text
  }
  const regex = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "ig")
  const parts = text.split(regex)
  return parts.map((part, index) => {
    const isMatch = regex.test(part)
    regex.lastIndex = 0
    return isMatch ? (
      <span key={`${part}-${index}`} className="font-semibold text-foreground">
        {part}
      </span>
    ) : (
      part
    )
  })
}

function FilterPanel({
  filters,
  onChange,
}: {
  filters: SearchFilters
  onChange: (next: SearchFilters) => void
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground">Date range</p>
        <RadioGroup
          value={filters.dateRange}
          onValueChange={(value) =>
            onChange({ ...filters, dateRange: value as SearchFilters["dateRange"] })
          }
        >
          {[
            { value: "7d", label: "Last 7 days" },
            { value: "30d", label: "Last month" },
            { value: "1y", label: "Last year" },
            { value: "all", label: "All time" },
          ].map((option) => (
            <div key={option.value} className="flex items-center gap-3">
              <RadioGroupItem id={`date-${option.value}`} value={option.value} />
              <Label htmlFor={`date-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground">Sort by</p>
        <RadioGroup
          value={filters.sortBy}
          onValueChange={(value) =>
            onChange({ ...filters, sortBy: value as SearchFilters["sortBy"] })
          }
        >
          {[
            { value: "relevance", label: "Relevance" },
            { value: "newest", label: "Newest" },
            { value: "popular", label: "Most popular" },
          ].map((option) => (
            <div key={option.value} className="flex items-center gap-3">
              <RadioGroupItem id={`sort-${option.value}`} value={option.value} />
              <Label htmlFor={`sort-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground">Type</p>
        <RadioGroup
          value={filters.type}
          onValueChange={(value) =>
            onChange({ ...filters, type: value as SearchFilters["type"] })
          }
        >
          {[
            { value: "all", label: "All" },
            { value: "free", label: "Free" },
            { value: "paid", label: "Paid" },
            { value: "premium", label: "Premium" },
          ].map((option) => (
            <div key={option.value} className="flex items-center gap-3">
              <RadioGroupItem id={`type-${option.value}`} value={option.value} />
              <Label htmlFor={`type-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState<SearchTab>("all")
  const [filters, setFilters] = useState<SearchFilters>(baseFilters)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const router = useRouter()
  const isMobile = useIsMobile()
  const inputRef = useRef<HTMLInputElement>(null)

  const debouncedQuery = useDebounce(query, 300)
  const {
    groupedResults,
    totals,
    suggestions,
    history,
    loading,
    hasQuery,
    commitSearch,
    clearHistory,
  } = useSearch(debouncedQuery, filters)

  const displayGroups = useMemo(() => {
    if (activeTab === "all") {
      return categoryOrder.map((category) => ({
        category,
        total: totals[category],
        results: groupedResults[category].slice(0, 5),
      }))
    }
    const category = activeTab
    return [
      {
        category,
        total: totals[category],
        results: groupedResults[category],
      },
    ]
  }, [activeTab, groupedResults, totals])

  const flatResults = useMemo(
    () =>
      displayGroups.flatMap((group) =>
        group.results.map((result) => ({ ...result, group: group.category })),
      ),
    [displayGroups],
  )

  useEffect(() => {
    setSelectedIndex(0)
  }, [activeTab, debouncedQuery, filters])

  useEffect(() => {
    if (!open) {
      return
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" && flatResults.length) {
        event.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % flatResults.length)
      }
      if (event.key === "ArrowUp" && flatResults.length) {
        event.preventDefault()
        setSelectedIndex((prev) =>
          prev === 0 ? flatResults.length - 1 : prev - 1,
        )
      }
      if (event.key === "Enter") {
        const selected = flatResults[selectedIndex]
        if (selected) {
          event.preventDefault()
          commitSearch(query.trim())
          router.push(selected.url)
          setOpen(false)
        }
      }
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, flatResults, selectedIndex, commitSearch, query, router])

  useEffect(() => {
    const onShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener("keydown", onShortcut)
    return () => window.removeEventListener("keydown", onShortcut)
  }, [])

  useEffect(() => {
    if (!open) {
      return
    }
    const timer = setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
    return () => clearTimeout(timer)
  }, [open])

  const handleOpenResult = (result: SearchResult) => {
    commitSearch(query.trim())
    router.push(result.url)
    setOpen(false)
  }

  const handleSuggestion = (value: string) => {
    setQuery(value)
    commitSearch(value)
    setActiveTab("all")
    inputRef.current?.focus()
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Open search"
        className="text-muted-foreground hover:text-foreground"
        onClick={() => setOpen(true)}
      >
        <Search className="h-5 w-5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={cn(
            "top-0 left-0 h-[100dvh] w-screen translate-x-0 translate-y-0 rounded-none border-none p-0 sm:top-1/2 sm:left-1/2 sm:h-auto sm:w-[min(1100px,calc(100%-2rem))] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-2xl sm:border",
          )}
            showCloseButton={false}
          >
          <div className="flex h-full flex-col overflow-hidden">
            <div className="border-b px-4 py-4 sm:px-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative min-w-0 flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    ref={inputRef}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search articles, services, helpers..."
                    className="h-12 pl-10 text-base"
                  />
                </div>

                {isMobile && (
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline" className="gap-2 shrink-0">
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent className="px-4 pb-6">
                      <DrawerHeader>
                        <DrawerTitle>Filters</DrawerTitle>
                      </DrawerHeader>
                      <FilterPanel
                        filters={filters}
                        onChange={(next) => setFilters(next)}
                      />
                    </DrawerContent>
                  </Drawer>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close search"
                  className="shrink-0"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close search</span>
                  <span className="text-lg">×</span>
                </Button>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <div className="max-[1000px]:hidden">
                    <Tabs
                      value={activeTab}
                      onValueChange={(value) =>
                        setActiveTab(value as SearchTab)
                      }
                      className="min-w-0"
                    >
                      <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="article">Articles</TabsTrigger>
                        <TabsTrigger value="service">Services</TabsTrigger>
                        <TabsTrigger value="helper">Helpers</TabsTrigger>
                        <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <div className="hidden max-[1000px]:block">
                    <Select
                      value={activeTab}
                      onValueChange={(value) =>
                        setActiveTab(value as SearchTab)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="article">Articles</SelectItem>
                        <SelectItem value="service">Services</SelectItem>
                        <SelectItem value="helper">Helpers</SelectItem>
                        <SelectItem value="marketplace">Marketplace</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

              </div>
                <div className="hidden items-center gap-2 text-xs text-muted-foreground mt-3 sm:flex">
                  <span>Press</span>
                  <kbd className="rounded border px-2 py-1">⌘</kbd>
                  <span>+</span>
                  <kbd className="rounded border px-2 py-1">K</kbd>
                </div>
            </div>

            <div className="flex flex-1 gap-6 overflow-hidden px-4 py-6 sm:px-6">
              {!isMobile && (
                <aside className="hidden w-[240px] shrink-0 border-r pr-6 lg:block">
                  <FilterPanel
                    filters={filters}
                    onChange={(next) => setFilters(next)}
                  />
                </aside>
              )}

              <div className="flex-1 overflow-y-auto pr-2">
                {!hasQuery && (
                  <div className="space-y-8">
                    {history.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-foreground">
                            Recent searches
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearHistory}
                          >
                            Clear history
                          </Button>
                        </div>
                        <div className="grid gap-2">
                          {history.map((item) => (
                            <button
                              key={item}
                              onClick={() => handleSuggestion(item)}
                              className="flex w-full items-center gap-3 rounded-md border px-3 py-2 text-left text-sm hover:bg-muted"
                            >
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="min-w-0 flex-1 max-[1000px]:truncate">
                                {item}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <TrendingUp className="h-4 w-4" />
                        Popular searches
                      </div>
                      <div className="grid gap-2">
                        {suggestions.map((item) => (
                          <button
                            key={item}
                            onClick={() => handleSuggestion(item)}
                            className="flex w-full items-center gap-3 rounded-md border px-3 py-2 text-left text-sm hover:bg-muted"
                          >
                            <Search className="h-4 w-4 text-muted-foreground" />
                            <span className="min-w-0 flex-1 max-[1000px]:truncate">
                              {item}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {hasQuery && (
                  <div className="mt-0">
                    {loading ? (
                      <div className="space-y-6">
                        {categoryOrder.map((category) => (
                          <div key={category} className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Skeleton className="h-5 w-28" />
                              <Skeleton className="h-4 w-24" />
                            </div>
                            <div className="grid gap-3">
                              {Array.from({ length: 3 }).map((_, index) => (
                                <div
                                  key={`${category}-${index}`}
                                  className="flex items-start gap-4 rounded-lg border p-4"
                                >
                                  <Skeleton className="h-10 w-10 rounded-md" />
                                  <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-1/2" />
                                    <Skeleton className="h-3 w-4/5" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : displayGroups.every((group) => group.total === 0) ? (
                      <div className="rounded-lg border border-dashed p-6 text-center">
                        <p className="text-lg font-semibold text-foreground">
                          No results found for &quot;{query.trim()}&quot;
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Try refining your search or explore these suggestions.
                        </p>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                          {suggestions.map((item) => (
                            <Button
                              key={item}
                              variant="outline"
                              size="sm"
                              onClick={() => handleSuggestion(item)}
                            >
                              {item}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        {displayGroups.map((group) => {
                          if (!group.total) {
                            return null
                          }
                          const meta = categoryMeta[group.category]
                          const Icon = meta.icon
                          const showSeeAll = activeTab === "all"

                          return (
                            <section key={group.category} className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                                  <Icon className="h-4 w-4" />
                                  {meta.label}
                                </div>
                                {showSeeAll && (
                                  <button
                                    className="text-xs font-medium text-muted-foreground hover:text-foreground"
                                    onClick={() => setActiveTab(group.category)}
                                  >
                                    See all {group.total} results
                                  </button>
                                )}
                              </div>

                              <div className="grid gap-3">
                                {group.results.map((result) => {
                                  const isSelected =
                                    flatResults[selectedIndex]?.id ===
                                    result.id
                                  return (
                                    <button
                                      key={result.id}
                                      onClick={() => handleOpenResult(result)}
                                      className={cn(
                                        "flex w-full items-start gap-4 rounded-lg border p-4 text-left transition hover:border-foreground/40 hover:bg-muted",
                                        isSelected &&
                                          "border-foreground/40 bg-muted",
                                      )}
                                    >
                                      <div className="rounded-md bg-muted p-2">
                                        <Icon className="h-5 w-5 text-muted-foreground" />
                                      </div>
                                      <div className="flex-1 space-y-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                          <span className="text-sm font-semibold text-foreground">
                                            {highlightMatch(result.title, query)}
                                          </span>
                                          <Badge
                                            variant="outline"
                                            className={cn(meta.badge)}
                                          >
                                            {meta.label}
                                          </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                          {highlightMatch(
                                            result.description,
                                            query,
                                          )}
                                        </p>
                                      </div>
                                    </button>
                                  )
                                })}
                              </div>
                            </section>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {hasQuery && (
                <aside className="hidden w-[280px] shrink-0 space-y-6 border-l pl-6 lg:block">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-foreground">
                      Suggestions
                    </p>
                    <div className="grid gap-2">
                      {suggestions.map((item) => (
                        <button
                          key={item}
                          onClick={() => handleSuggestion(item)}
                          className="flex items-center justify-between rounded-md border px-3 py-2 text-left text-sm hover:bg-muted"
                        >
                          <span>{highlightMatch(item, query)}</span>
                          <Search className="h-4 w-4 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {history.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-foreground">
                        Recent searches
                      </p>
                      <div className="grid gap-2">
                        {history.slice(0, 5).map((item) => (
                          <button
                            key={item}
                            onClick={() => handleSuggestion(item)}
                            className="flex items-center justify-between rounded-md border px-3 py-2 text-left text-sm hover:bg-muted"
                          >
                            <span>{item}</span>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </aside>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
