"use client";

import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "@/components/ui/drawer";
import { useDebounce } from "@/hooks/use-debounce";

interface HealerFiltersProps {
  searchQuery: string;
  specialtyFilter: string;
  regionFilter: string;
  languageFilter: string;
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
  specialties: string[];
  regions: string[];
  languages: string[];
}

export function HealerFilters({
  searchQuery,
  specialtyFilter,
  regionFilter,
  languageFilter,
  onFilterChange,
  onClearFilters,
  specialties,
  regions,
  languages,
}: HealerFiltersProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const debouncedSearch = useDebounce(localSearch, 300);

  useEffect(() => {
    // Only trigger if debouncedSearch actually differs from searchQuery to avoid loops
    if (debouncedSearch !== searchQuery) {
      onFilterChange("search", debouncedSearch);
    }
  }, [debouncedSearch, searchQuery, onFilterChange]);

  // Sync external search query clears
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const hasActiveFilters =
    searchQuery !== "" ||
    specialtyFilter !== "all" ||
    regionFilter !== "all" ||
    languageFilter !== "all";

  const FilterControls = ({ compact = false }: { compact?: boolean }) => (
    <div
      className={cn(
        "flex flex-wrap gap-3 rounded-2xl border border-terra/15 bg-cream/80 p-3 sm:p-4",
        compact && "flex-col items-stretch border-none bg-transparent p-0",
      )}
    >
      {!compact && (
        <div className="flex w-full items-center justify-between gap-4 md:w-auto md:flex-row">
          <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-terra/80">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-terra" />
            <span>Filter healers</span>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-8 text-[11px] text-muted-foreground hover:text-foreground md:hidden"
            >
              Clear All
            </Button>
          )}
        </div>
      )}

      <div className={cn("flex flex-1 flex-wrap gap-3", compact && "flex-col")}>
        <div className="flex flex-col gap-1 flex-grow max-w-sm">
          {!compact && <span className="text-[11px] font-medium text-muted">Search</span>}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, specialty..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-9 h-9 rounded-full border-earth/15 bg-transparent text-sm"
            />
            {localSearch && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full text-muted-foreground hover:bg-earth/10"
                onClick={() => setLocalSearch("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          {!compact && <span className="text-[11px] font-medium text-muted">Specialty</span>}
          <Select
            value={specialtyFilter}
            onValueChange={(val) => onFilterChange("specialty", val)}
          >
            <SelectTrigger
              size="sm"
              className={cn(
                "min-w-[9rem] rounded-full border-earth/15 bg-transparent px-3 text-earth/80 h-9",
                specialtyFilter !== "all" &&
                  "border-earth/40 text-earth font-semibold shadow-[0_0_0_1px_rgba(46,21,3,0.04)]"
              )}
            >
              <SelectValue placeholder="All specialties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All specialties</SelectItem>
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          {!compact && <span className="text-[11px] font-medium text-muted">Region</span>}
          <Select
            value={regionFilter}
            onValueChange={(val) => onFilterChange("region", val)}
          >
            <SelectTrigger
              size="sm"
              className={cn(
                "min-w-[9rem] rounded-full border-earth/15 bg-transparent px-3 text-earth/80 h-9",
                regionFilter !== "all" &&
                  "border-earth/40 text-earth font-semibold shadow-[0_0_0_1px_rgba(46,21,3,0.04)]"
              )}
            >
              <SelectValue placeholder="All regions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All regions</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          {!compact && <span className="text-[11px] font-medium text-muted">Language</span>}
          <Select
            value={languageFilter}
            onValueChange={(val) => onFilterChange("language", val)}
          >
            <SelectTrigger
              size="sm"
              className={cn(
                "min-w-[9rem] rounded-full border-earth/15 bg-transparent px-3 text-earth/80 h-9",
                languageFilter !== "all" &&
                  "border-earth/40 text-earth font-semibold shadow-[0_0_0_1px_rgba(46,21,3,0.04)]"
              )}
            >
              <SelectValue placeholder="Any language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any language</SelectItem>
              {languages.map((language) => (
                <SelectItem key={language} value={language}>
                  {language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {!compact && hasActiveFilters && (
          <div className="hidden items-end pb-[2px] md:flex">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-8 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden sm:block">
        <FilterControls />
      </div>

      <div className="sm:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full rounded-full border-terra/20 bg-cream/80 text-terra/80 hover:bg-cream",
                hasActiveFilters && "border-terra/50 bg-terra/5 text-terra font-semibold"
              )}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters {hasActiveFilters && " (Active)"}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Filter Healers</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-0 pt-2">
              <FilterControls compact />
            </div>
            <DrawerFooter className="pt-6">
              <DrawerClose asChild>
                <Button className="w-full bg-terra text-white hover:bg-terra/90 rounded-full">
                  Show Results
                </Button>
              </DrawerClose>
              {hasActiveFilters && (
                <Button variant="ghost" className="w-full" onClick={onClearFilters}>
                  Clear All Filters
                </Button>
              )}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
