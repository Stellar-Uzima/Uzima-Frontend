"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StoryHero } from "@/components/stories/story-hero";
import { StoryFilters } from "@/components/stories/story-filters";
import { StoryCard } from "@/components/stories/story-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  stories,
  getImpactStats,
  getStoriesByCategory,
  paginateStories,
  type StoryCategory,
} from "@/data/stories";

const STORIES_PER_PAGE = 9;

export default function StoriesPage() {
  const [activeFilter, setActiveFilter] = useState<StoryCategory | "all">(
    "all",
  );
  const [currentPage, setCurrentPage] = useState(1);

  // Get impact statistics
  const stats = getImpactStats();

  // Filter and paginate stories
  const { paginatedStories, totalPages } = useMemo(() => {
    const filteredStories = getStoriesByCategory(activeFilter);
    const { stories: paginatedStories, totalPages } = paginateStories(
      filteredStories,
      currentPage,
      STORIES_PER_PAGE,
    );
    return { paginatedStories, totalPages, filteredStories };
  }, [activeFilter, currentPage]);

  // Reset to page 1 when filter changes
  const handleFilterChange = (filter: StoryCategory | "all") => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <StoryHero
        livesImpacted={stats.livesImpacted}
        totalDonated={stats.totalDonated}
        totalHelpers={stats.totalHelpers}
      />

      {/* Stories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <StoryFilters
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />

          {/* Story Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {paginatedStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>

          {/* Empty State */}
          {paginatedStories.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No stories found in this category yet.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-12">
              <PaginationContent>
                {/* Previous */}
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {/* Page Numbers */}
                {getPaginationNumbers().map((page, index) =>
                  page === "ellipsis" ? (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                        }}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}

                {/* Next */}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        setCurrentPage(currentPage + 1);
                    }}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
