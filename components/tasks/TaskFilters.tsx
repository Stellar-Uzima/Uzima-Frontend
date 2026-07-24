"use client";

import { X, ChevronDown, ListFilter, RotateCcw } from "lucide-react";
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
  const hasActiveFilters =
    activeCategory !== "All" ||
    activeStatus !== "All" ||
    activeSort !== "newest";

  const activeSortLabel =
    SORT_OPTIONS.find((o) => o.value === activeSort)?.label ?? "Sort";

  return (
    <div className="space-y-3">
      {/* ── Row 1: category pills + controls ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Category pills — horizontally scrollable on mobile */}
        <div
          role="group"
          aria-label="Filter by category"
          className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onFilterChange("category", cat)}
              aria-pressed={activeCategory === cat}
              className={cn(
                "whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all border",
                activeCategory === cat
                  ? "bg-terra text-white border-terra shadow-sm"
                  : "bg-white text-earth/70 border-terra/10 hover:border-terra/30 hover:bg-cream",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Right-side controls group ── */}
        <div
          role="group"
          aria-label="Sort and status filters"
          className="flex items-center gap-2 flex-shrink-0"
        >
          {/* Status dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-2xl text-xs font-bold transition-colors border",
                  activeStatus !== "All"
                    ? "bg-earth text-white border-earth"
                    : "bg-white text-earth border-terra/10 hover:bg-cream",
                )}
              >
                <ListFilter className="h-3.5 w-3.5" />
                {activeStatus === "All" ? "Status" : activeStatus}
                <ChevronDown className="h-3.5 w-3.5 opacity-50" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl border-terra/10">
              {STATUSES.map((s) => (
                <DropdownMenuItem
                  key={s}
                  onClick={() => onFilterChange("status", s)}
                  className={cn(
                    "text-xs font-medium cursor-pointer focus:bg-terra/5",
                    activeStatus === s && "text-terra font-bold",
                  )}
                >
                  {s}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-2xl text-xs font-bold transition-colors border",
                  activeSort !== "newest"
                    ? "bg-earth text-white border-earth"
                    : "bg-white text-earth border-terra/10 hover:bg-cream",
                )}
              >
                {activeSort !== "newest" ? activeSortLabel : "Sort"}
                <ChevronDown className="h-3.5 w-3.5 opacity-50" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl border-terra/10">
              {SORT_OPTIONS.map((opt) => (
                <DropdownMenuItem
                  key={opt.value}
                  onClick={() => onFilterChange("sort", opt.value)}
                  className={cn(
                    "text-xs font-medium cursor-pointer focus:bg-terra/5",
                    activeSort === opt.value && "text-terra font-bold",
                  )}
                >
                  {opt.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Reset button — only visible when filters are active */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearAll}
              title="Reset all filters"
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold text-terra border border-terra/20 bg-terra/5 hover:bg-terra/10 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* ── Row 2: active filter badges ── */}
      {hasActiveFilters && (
        <div
          role="status"
          aria-live="polite"
          aria-label="Active filters"
          className="flex flex-wrap items-center gap-2 pt-1"
        >
          <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
            Active:
          </span>

          {activeCategory !== "All" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terra text-white text-[10px] font-bold uppercase tracking-wider">
              {activeCategory}
              <button
                type="button"
                aria-label={`Remove ${activeCategory} filter`}
                onClick={() => onFilterChange("category", "All")}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {activeStatus !== "All" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-earth text-white text-[10px] font-bold uppercase tracking-wider">
              {activeStatus}
              <button
                type="button"
                aria-label={`Remove ${activeStatus} filter`}
                onClick={() => onFilterChange("status", "All")}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {activeSort !== "newest" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
              {activeSortLabel}
              <button
                type="button"
                aria-label="Remove sort filter"
                onClick={() => onFilterChange("sort", "newest")}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}