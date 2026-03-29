"use client";

import { useMemo, useState, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Users, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/EmptyState";
import { HealerCard } from "@/components/healers/HealerCard";
import { HealerFilters } from "@/components/healers/HealerFilters";
import type { Healer, HealerRegion, HealerSpecialty } from "@/lib/mock/healers";

interface HealersDirectoryProps {
  healers: Healer[];
  specialties: HealerSpecialty[];
  regions: HealerRegion[];
  languages: string[];
}

export function HealersDirectory({
  healers,
  specialties,
  regions,
  languages,
}: HealersDirectoryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const searchQuery = searchParams.get("search") || "";
  const specialtyFilter = searchParams.get("specialty") || "all";
  const regionFilter = searchParams.get("region") || "all";
  const languageFilter = searchParams.get("language") || "all";

  const handleBook = useCallback((id: string) => {
    router.push(`/consultations?healer=${id}`)
  }, [router])

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (!value || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleClearFilters = () => {
    router.replace(pathname, { scroll: false });
  };

  const filteredHealers = useMemo(() => {
    return healers.filter((healer) => {
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = healer.name.toLowerCase().includes(query);
        const matchesCommunity = healer.country.toLowerCase().includes(query);
        const matchesSpecialty = healer.specialties.some((s) =>
          s.toLowerCase().includes(query)
        );
        
        if (!matchesName && !matchesCommunity && !matchesSpecialty) {
          return false;
        }
      }

      if (
        specialtyFilter !== "all" &&
        !healer.specialties.includes(specialtyFilter as HealerSpecialty)
      ) {
        return false;
      }

      if (regionFilter !== "all" && healer.region !== regionFilter) {
        return false;
      }

      if (
        languageFilter !== "all" &&
        !healer.languages.includes(languageFilter)
      ) {
        return false;
      }

      return true;
    });
  }, [healers, searchQuery, specialtyFilter, regionFilter, languageFilter]);

  const activeFilters = [];
  if (searchQuery) {
    activeFilters.push({ key: "search", label: `Search: "${searchQuery}"` });
  }
  if (specialtyFilter !== "all") {
    activeFilters.push({ key: "specialty", label: specialtyFilter });
  }
  if (regionFilter !== "all") {
    activeFilters.push({ key: "region", label: regionFilter });
  }
  if (languageFilter !== "all") {
    activeFilters.push({ key: "language", label: languageFilter });
  }

  return (
    <main className="bg-cream min-h-screen pt-28 pb-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6">
        <section className="overflow-hidden rounded-3xl bg-forest text-cream">
          <div className="relative px-6 py-10 sm:px-10 sm:py-14">
            <div
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(circle at 0% 0%, rgba(240,192,80,0.2), transparent 55%), radial-gradient(circle at 90% 100%, rgba(184,78,32,0.45), transparent 60%)",
              }}
            />

            <div className="relative z-10 space-y-4 sm:space-y-5">
              <Badge className="bg-gold/15 text-gold text-[11px] tracking-[0.22em] uppercase rounded-full border border-gold/40 px-3 py-1">
                Traditional healers directory
              </Badge>
              <div className="max-w-2xl space-y-3">
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                  Meet Our Traditional Healers
                </h1>
                <p className="text-sm sm:text-base text-cream/85 leading-relaxed">
                  Browse verified healers who honour cultural protocols,
                  practice in local languages, and carry deep ancestral
                  knowledge across Africa.
                </p>
              </div>
            </div>
          </div>
        </section>

        <HealerFilters
          searchQuery={searchQuery}
          specialtyFilter={specialtyFilter}
          regionFilter={regionFilter}
          languageFilter={languageFilter}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          specialties={specialties}
          regions={regions}
          languages={languages}
        />

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3 text-xs text-muted">
            <span>
              Showing{" "}
              <span className="font-semibold text-earth">
                {filteredHealers.length}
              </span>{" "}
              healer{filteredHealers.length === 1 ? "" : "s"}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-terra/80" />
              <span>Traditional healers only</span>
            </span>
          </div>

          {activeFilters.length > 0 && (
             <div className="flex flex-wrap gap-2 items-center">
               <span className="text-xs text-muted-foreground mr-1">Active Filters:</span>
               {activeFilters.map((filter) => (
                 <Badge
                   key={filter.key}
                   variant="secondary"
                   className="bg-terra/10 hover:bg-terra/20 text-terra border-terra/20 rounded-full px-3 py-1 cursor-pointer flex items-center gap-1.5 transition-colors"
                   onClick={() => handleFilterChange(filter.key, "")}
                 >
                   {filter.label}
                   <X className="h-3 w-3 opacity-70 hover:opacity-100" />
                 </Badge>
               ))}
               <Button
                 variant="ghost"
                 size="sm"
                 className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground hover:bg-transparent -ml-1"
                 onClick={handleClearFilters}
               >
                 Clear all
               </Button>
             </div>
          )}
        </div>

        {filteredHealers.length === 0 ? (
          <EmptyState
            title="No healers match these filters"
            description="Try removing some active filters or adjusting your search phrase to see more traditional healers."
            illustration="consultations"
            className="bg-zinc-50 border-terra/10"
          />
        ) : (
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredHealers.map((healer) => (
              <HealerCard
                key={healer.id}
                healer={healer}
                onBook={handleBook}
              />
            ))}
          </section>
        )}

        <section className="mt-6 rounded-3xl bg-earth px-5 py-6 text-cream sm:px-8 sm:py-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1.5">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gold/80">
                Become a healer
              </p>
              <h2 className="font-serif text-xl sm:text-2xl font-bold">
                Join the Stellar Uzima healer network
              </h2>
              <p className="text-xs sm:text-sm text-cream/80 max-w-xl">
                Are you a traditional healer who wants to serve more people
                safely online? Share your practice, languages, and region and
                we&apos;ll guide you through our verification process.
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-gold/70 bg-gold text-earth hover:bg-cream hover:border-cream text-xs font-semibold"
            >
              Apply to become a healer
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
