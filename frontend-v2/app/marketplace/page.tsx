"use client";

import { useState, useEffect, useMemo, useReducer } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useDebounce } from "@/hooks/useDebounce";
import { useIsMobile } from "@/hooks/use-mobile";
import { MarketplaceItem } from "@/types/marketplace";
import { Search, Filter, Star, CheckCircle2, X } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

// Placeholder data - 12+ items
const PLACEHOLDER_ITEMS: MarketplaceItem[] = [
  {
    id: "1",
    title: "Telemedicine Consultation",
    description: "30-minute video consultation with a licensed healthcare provider",
    category: "consultation",
    priceXLM: 25.5,
    priceUSDT: 5.2,
    rating: 4.8,
    reviewCount: 124,
    provider: { name: "Dr. Sarah Johnson", verified: true },
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Mental Health First Aid Course",
    description: "Comprehensive course on mental health awareness and support",
    category: "course",
    priceXLM: 150.0,
    priceUSDT: 30.5,
    rating: 4.9,
    reviewCount: 89,
    provider: { name: "Health Education Institute", verified: true },
    createdAt: "2024-01-10T08:00:00Z",
  },
  {
    id: "3",
    title: "Lab Test Results Review",
    description: "Professional review and explanation of your lab test results",
    category: "service",
    priceXLM: 35.0,
    priceUSDT: 7.1,
    rating: 4.7,
    reviewCount: 203,
    provider: { name: "MedLab Services", verified: true },
    createdAt: "2024-01-20T14:00:00Z",
  },
  {
    id: "4",
    title: "Nutrition Planning Service",
    description: "Personalized nutrition plan based on your health goals",
    category: "service",
    priceXLM: 45.0,
    priceUSDT: 9.2,
    rating: 4.6,
    reviewCount: 156,
    provider: { name: "Wellness Nutrition", verified: true },
    createdAt: "2024-01-18T11:00:00Z",
  },
  {
    id: "5",
    title: "CPR Certification Course",
    description: "Online CPR certification course with practical demonstrations",
    category: "course",
    priceXLM: 75.0,
    priceUSDT: 15.3,
    rating: 4.9,
    reviewCount: 312,
    provider: { name: "Emergency Training Center", verified: true },
    createdAt: "2024-01-12T09:00:00Z",
  },
  {
    id: "6",
    title: "Dermatology Consultation",
    description: "Expert skin health consultation and treatment recommendations",
    category: "consultation",
    priceXLM: 50.0,
    priceUSDT: 10.2,
    rating: 4.8,
    reviewCount: 178,
    provider: { name: "Dr. Michael Chen", verified: true },
    createdAt: "2024-01-22T13:00:00Z",
  },
  {
    id: "7",
    title: "Health Records Management",
    description: "Digital health records organization and management service",
    category: "service",
    priceXLM: 30.0,
    priceUSDT: 6.1,
    rating: 4.5,
    reviewCount: 94,
    provider: { name: "HealthTech Solutions", verified: true },
    createdAt: "2024-01-16T10:00:00Z",
  },
  {
    id: "8",
    title: "Pediatric Care Basics Course",
    description: "Learn essential pediatric care techniques for parents",
    category: "course",
    priceXLM: 100.0,
    priceUSDT: 20.4,
    rating: 4.7,
    reviewCount: 145,
    provider: { name: "Child Health Academy", verified: true },
    createdAt: "2024-01-14T12:00:00Z",
  },
  {
    id: "9",
    title: "Cardiology Consultation",
    description: "Heart health assessment and cardiovascular consultation",
    category: "consultation",
    priceXLM: 60.0,
    priceUSDT: 12.2,
    rating: 4.9,
    reviewCount: 267,
    provider: { name: "Dr. Emily Rodriguez", verified: true },
    createdAt: "2024-01-21T15:00:00Z",
  },
  {
    id: "10",
    title: "Medication Review Service",
    description: "Comprehensive review of your medications and interactions",
    category: "service",
    priceXLM: 40.0,
    priceUSDT: 8.2,
    rating: 4.6,
    reviewCount: 112,
    provider: { name: "Pharmacy Care Network", verified: true },
    createdAt: "2024-01-17T09:00:00Z",
  },
  {
    id: "11",
    title: "First Aid Training Course",
    description: "Complete first aid training with certification",
    category: "course",
    priceXLM: 85.0,
    priceUSDT: 17.3,
    rating: 4.8,
    reviewCount: 198,
    provider: { name: "Safety First Training", verified: true },
    createdAt: "2024-01-13T11:00:00Z",
  },
  {
    id: "12",
    title: "Women's Health Consultation",
    description: "Specialized consultation for women's health concerns",
    category: "consultation",
    priceXLM: 55.0,
    priceUSDT: 11.2,
    rating: 4.7,
    reviewCount: 189,
    provider: { name: "Dr. Lisa Thompson", verified: true },
    createdAt: "2024-01-19T14:00:00Z",
  },
  {
    id: "13",
    title: "Diabetes Management Service",
    description: "Comprehensive diabetes management and monitoring service",
    category: "service",
    priceXLM: 50.0,
    priceUSDT: 10.2,
    rating: 4.8,
    reviewCount: 234,
    provider: { name: "Diabetes Care Center", verified: true },
    createdAt: "2024-01-11T08:00:00Z",
  },
  {
    id: "14",
    title: "Health Insurance Navigation",
    description: "Expert help navigating health insurance options",
    category: "service",
    priceXLM: 35.0,
    priceUSDT: 7.1,
    rating: 4.5,
    reviewCount: 87,
    provider: { name: "Insurance Advisors", verified: false },
    createdAt: "2024-01-23T16:00:00Z",
  },
  {
    id: "15",
    title: "Yoga Therapy Course",
    description: "Therapeutic yoga course for health and wellness",
    category: "course",
    priceXLM: 120.0,
    priceUSDT: 24.5,
    rating: 4.9,
    reviewCount: 156,
    provider: { name: "Wellness Studio", verified: true },
    createdAt: "2024-01-09T07:00:00Z",
  },
];

const ITEMS_PER_PAGE = 12;

type CategoryFilter = "all" | "service" | "course" | "consultation";
type SortOption =
  | "price-asc"
  | "price-desc"
  | "rating"
  | "newest";

interface FilterState {
  category: CategoryFilter;
  sort: SortOption;
  search: string;
  page: number;
}

type FilterAction =
  | { type: "SET_CATEGORY"; payload: CategoryFilter }
  | { type: "SET_SORT"; payload: SortOption }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_PAGE"; payload: number }
  | { type: "RESET" };

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, category: action.payload, page: 1 };
    case "SET_SORT":
      return { ...state, sort: action.payload, page: 1 };
    case "SET_SEARCH":
      return { ...state, search: action.payload, page: 1 };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "RESET":
      return {
        category: "all",
        sort: "newest",
        search: "",
        page: 1,
      };
    default:
      return state;
  }
}

export default function MarketplacePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();

  // Initialize state from URL params
  const initialState: FilterState = {
    category: (searchParams.get("category") as CategoryFilter) || "all",
    sort: (searchParams.get("sort") as SortOption) || "newest",
    search: searchParams.get("search") || "",
    page: parseInt(searchParams.get("page") || "1", 10),
  };

  const [state, dispatch] = useReducer(filterReducer, initialState);
  const [searchInput, setSearchInput] = useState(state.search);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const debouncedSearch = useDebounce(searchInput, 300);

  // Update search in state when debounced value changes
  useEffect(() => {
    dispatch({ type: "SET_SEARCH", payload: debouncedSearch });
  }, [debouncedSearch]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (state.category !== "all") {
      params.set("category", state.category);
    }
    if (state.sort !== "newest") {
      params.set("sort", state.sort);
    }
    if (state.search) {
      params.set("search", state.search);
    }
    if (state.page > 1) {
      params.set("page", state.page.toString());
    }

    const newUrl = params.toString()
      ? `/marketplace?${params.toString()}`
      : "/marketplace";
    router.replace(newUrl, { scroll: false });
  }, [state, router]);

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    let filtered = [...PLACEHOLDER_ITEMS];

    // Filter by category
    if (state.category !== "all") {
      filtered = filtered.filter((item) => item.category === state.category);
    }

    // Filter by search
    if (state.search) {
      const searchLower = state.search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.provider.name.toLowerCase().includes(searchLower)
      );
    }

    // Sort items
    filtered.sort((a, b) => {
      switch (state.sort) {
        case "price-asc":
          return a.priceXLM - b.priceXLM;
        case "price-desc":
          return b.priceXLM - a.priceXLM;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        default:
          return 0;
      }
    });

    return filtered;
  }, [state.category, state.sort, state.search]);

  // Paginate items
  const paginatedItems = useMemo(() => {
    const start = (state.page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredAndSortedItems.slice(start, end);
  }, [filteredAndSortedItems, state.page]);

  const totalPages = Math.ceil(filteredAndSortedItems.length / ITEMS_PER_PAGE);

  // Loading state with 200ms delay
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [state.category, state.sort, state.search]);

  const handleResetFilters = () => {
    dispatch({ type: "RESET" });
    setSearchInput("");
    setMobileFiltersOpen(false);
  };

  const FilterControls = () => (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 transition-all duration-200">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search services, courses, consultations..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="pl-10 transition-all duration-200"
        />
      </div>
      <Select
        value={state.category}
        onValueChange={(value) =>
          dispatch({ type: "SET_CATEGORY", payload: value as CategoryFilter })
        }
      >
        <SelectTrigger className="w-full sm:w-[180px] transition-all duration-200">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="service">Services</SelectItem>
          <SelectItem value="course">Courses</SelectItem>
          <SelectItem value="consultation">Consultations</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={state.sort}
        onValueChange={(value) =>
          dispatch({ type: "SET_SORT", payload: value as SortOption })
        }
      >
        <SelectTrigger className="w-full sm:w-[180px] transition-all duration-200">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          <SelectItem value="rating">Rating</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  const MobileFiltersSheet = () => (
    <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select
              value={state.category}
              onValueChange={(value) =>
                dispatch({
                  type: "SET_CATEGORY",
                  payload: value as CategoryFilter,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="service">Services</SelectItem>
                <SelectItem value="course">Courses</SelectItem>
                <SelectItem value="consultation">Consultations</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Sort By</label>
            <Select
              value={state.sort}
              onValueChange={(value) =>
                dispatch({ type: "SET_SORT", payload: value as SortOption })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            onClick={handleResetFilters}
            className="w-full"
          >
            Reset Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
          <p className="text-muted-foreground">
            Browse healthcare services, courses, and consultations
          </p>
        </div>

        {/* Desktop Filters */}
        <div className="hidden lg:block">
          <FilterControls />
        </div>

        {/* Mobile Filters */}
        <div className="lg:hidden mb-4">
          <MobileFiltersSheet />
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-200">
            {Array.from({ length: 12 }).map((_, i) => (
              <Card key={i} className="transition-all duration-200">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-32 w-full mb-4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-4 w-1/3" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {/* Empty State */}
            {paginatedItems.length === 0 ? (
              <div className="text-center py-16 transition-all duration-200">
                <div className="max-w-md mx-auto">
                  <p className="text-lg font-medium mb-2">No results found</p>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search terms
                  </p>
                  <Button onClick={handleResetFilters} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Reset Filters
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 transition-all duration-200">
                  {paginatedItems.map((item) => (
                    <Card
                      key={item.id}
                      className="flex flex-col transition-all duration-200 hover:shadow-lg"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          <Badge variant="outline">
                            {item.category.charAt(0).toUpperCase() +
                              item.category.slice(1)}
                          </Badge>
                        </div>
                        <CardDescription className="line-clamp-2">
                          {item.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">
                              {item.rating}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              ({item.reviewCount} reviews)
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              {item.provider.name}
                            </span>
                            {item.provider.verified && (
                              <CheckCircle2 className="w-4 h-4 text-blue-500" />
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between border-t pt-4">
                        <div className="flex flex-col">
                          <span className="text-lg font-bold">
                            {item.priceXLM} XLM
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ${item.priceUSDT} USDT
                          </span>
                        </div>
                        <Button size="sm">View Details</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination className="mt-8">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (state.page > 1) {
                              dispatch({ type: "SET_PAGE", payload: state.page - 1 });
                            }
                          }}
                          className={
                            state.page === 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                dispatch({ type: "SET_PAGE", payload: page });
                              }}
                              isActive={state.page === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      )}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (state.page < totalPages) {
                              dispatch({ type: "SET_PAGE", payload: state.page + 1 });
                            }
                          }}
                          className={
                            state.page === totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
