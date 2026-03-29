"use client";

import { X, ChevronDown, ListFilter } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CATEGORIES = [
  "All",
  "Nutrition",
  "Exercise",
  "Mental Health",
  "Maternal",
  "Traditional",
  "Hygiene",
];
const STATUSES = ["All", "Available", "Completed", "Claimed"];
const SORT_OPTIONS = [
  { label: "XLM Reward (High → Low)", value: "reward-desc" },
  { label: "Newest", value: "newest" },
  { label: "Category", value: "category-asc" },
];

interface TaskFiltersProps {
  activeCategory: string;
  activeStatus: string;
  activeSort: string;
  onFilterChange: (key: string, value: string) => void;
  onClearAll: () => void;
}

export function TaskFilters({
  activeCategory,
  activeStatus,
  activeSort,
  onFilterChange,
  onClearAll,
}: TaskFiltersProps) {
  const hasActiveFilters = activeCategory !== "All" || activeStatus !== "All";

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Filter Pills (Mobile Scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onFilterChange("category", cat)}
              className={cn(
                "whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all border",
                activeCategory === cat
                  ? "bg-terra text-white border-terra shadow-sm"
                  : "bg-white text-earth/70 border-terra/10 hover:border-terra/30",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-3 py-2 bg-white border border-terra/10 rounded-2xl text-xs font-bold text-earth hover:bg-cream transition-colors">
                <ListFilter className="h-3.5 w-3.5 text-terra" />
                {activeStatus === "All" ? "Status" : activeStatus}
                <ChevronDown className="h-3.5 w-3.5 opacity-50" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="rounded-xl border-terra/10"
            >
              {STATUSES.map((s) => (
                <DropdownMenuItem
                  key={s}
                  onClick={() => onFilterChange("status", s)} // Pass "Available", "Completed", etc.
                  className="text-xs font-medium cursor-pointer focus:bg-terra/5"
                >
                  {s}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-3 py-2 bg-white border border-terra/10 rounded-2xl text-xs font-bold text-earth hover:bg-cream transition-colors">
                Sort
                <ChevronDown className="h-3.5 w-3.5 opacity-50" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="rounded-xl border-terra/10"
            >
              {SORT_OPTIONS.map((opt) => (
                <DropdownMenuItem
                  key={opt.value}
                  onClick={() => onFilterChange("sort", opt.value)}
                  className="text-xs font-medium cursor-pointer"
                >
                  {opt.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Active Filter Dismissible Badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {activeCategory !== "All" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terra text-white text-[10px] font-bold uppercase tracking-wider">
              {activeCategory}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onFilterChange("category", "All")}
              />
            </span>
          )}
          {activeStatus !== "All" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-earth text-white text-[10px] font-bold uppercase tracking-wider">
              {activeStatus}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onFilterChange("status", "All")}
              />
            </span>
          )}
          <button
            onClick={onClearAll}
            className="text-[11px] font-bold text-terra/70 hover:text-terra transition-colors ml-1 underline underline-offset-4"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
