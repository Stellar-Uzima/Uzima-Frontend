"use client";

import { cn } from "@/lib/utils";

export const HEALTH_CATEGORIES = [
  "Nutrition",
  "Exercise",
  "Mental Health",
  "Maternal Health",
  "Preventive Care",
  "Hygiene",
] as const;

export type HealthCategory = (typeof HEALTH_CATEGORIES)[number];

interface CategoryFilterProps {
  selectedCategory: HealthCategory | null;
  onSelect: (category: HealthCategory | null) => void;
  className?: string;
}

export default function CategoryFilter({
  selectedCategory,
  onSelect,
  className,
}: CategoryFilterProps) {
  const basePillClasses =
    "shrink-0 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  return (
    <div
      className={cn(
        "flex w-full gap-2 overflow-x-auto whitespace-nowrap pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={cn(
          basePillClasses,
          selectedCategory === null
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-background text-foreground hover:border-primary hover:text-primary",
        )}
      >
        All
      </button>

      {HEALTH_CATEGORIES.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelect(category)}
          className={cn(
            basePillClasses,
            selectedCategory === category
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-foreground hover:border-primary hover:text-primary",
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
