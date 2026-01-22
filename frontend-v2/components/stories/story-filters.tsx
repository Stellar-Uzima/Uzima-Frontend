"use client";

import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS, type StoryCategory } from "@/data/stories";

interface StoryFiltersProps {
  activeFilter: StoryCategory | "all";
  onFilterChange: (filter: StoryCategory | "all") => void;
}

const filterOrder: (StoryCategory | "all")[] = [
  "all",
  "healthcare",
  "education",
  "water",
  "emergency",
];

export function StoryFilters({
  activeFilter,
  onFilterChange,
}: StoryFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {filterOrder.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <Button
            key={filter}
            variant={isActive ? "default" : "outline"}
            onClick={() => onFilterChange(filter)}
            className={`
              rounded-full px-6 py-2 transition-all duration-200
              ${
                isActive
                  ? "bg-[oklch(0.65_0.15_175)] text-white hover:bg-[oklch(0.55_0.15_175)] shadow-md"
                  : "border-[oklch(0.65_0.15_175)] text-[oklch(0.65_0.15_175)] hover:bg-[oklch(0.65_0.15_175)] hover:text-white bg-transparent"
              }
            `}
          >
            {CATEGORY_LABELS[filter]}
          </Button>
        );
      })}
    </div>
  );
}
