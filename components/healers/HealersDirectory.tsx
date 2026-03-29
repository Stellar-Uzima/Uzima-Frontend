"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EmptyState } from "@/components/ui/EmptyState";
import { HealerCard } from "@/components/healers/HealerCard";
import type { Healer, HealerRegion, HealerSpecialty } from "@/lib/mock/healers";

interface HealersDirectoryProps {
  healers: Healer[];
  specialties: HealerSpecialty[];
  regions: HealerRegion[];
  languages: string[];
}

interface FiltersProps {
  selectedSpecialty: string;
  selectedRegion: string;
  selectedLanguage: string;
  onSpecialtyChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  specialties: HealerSpecialty[];
  regions: HealerRegion[];
  languages: string[];
  compact?: boolean;
}

function Filters({
  selectedSpecialty,
  selectedRegion,
  selectedLanguage,
  onSpecialtyChange,
  onRegionChange,
  onLanguageChange,
  specialties,
  regions,
  languages,
  compact,
}: FiltersProps) {
  const specialtyIsActive = selectedSpecialty !== "all";
  const regionIsActive = selectedRegion !== "all";
  const languageIsActive = selectedLanguage !== "all";

  return (
    <div
      className={cn(
        "flex flex-wrap gap-3 rounded-2xl border border-terra/15 bg-cream/80 p-3 sm:p-4",
        compact && "flex-col items-stretch",
      )}
    >
      <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-terra/80">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-terra" />
        <span>Filter healers</span>
      </div>
      <div className="flex flex-1 flex-wrap gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-medium text-muted">Specialty</span>
          <Select value={selectedSpecialty} onValueChange={onSpecialtyChange}>
            <SelectTrigger
              size="sm"
              className={cn(
                "min-w-[9rem] rounded-full border-earth/15 bg-transparent px-3 text-earth/80",
                specialtyIsActive &&
                  "border-earth/40 text-earth font-semibold shadow-[0_0_0_1px_rgba(46,21,3,0.04)]",
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
          <span className="text-[11px] font-medium text-muted">Region</span>
          <Select value={selectedRegion} onValueChange={onRegionChange}>
            <SelectTrigger
              size="sm"
              className={cn(
                "min-w-[9rem] rounded-full border-earth/15 bg-transparent px-3 text-earth/80",
                regionIsActive &&
                  "border-earth/40 text-earth font-semibold shadow-[0_0_0_1px_rgba(46,21,3,0.04)]",
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
          <span className="text-[11px] font-medium text-muted">Language</span>
          <Select value={selectedLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger
              size="sm"
              className={cn(
                "min-w-[9rem] rounded-full border-earth/15 bg-transparent px-3 text-earth/80",
                languageIsActive &&
                  "border-earth/40 text-earth font-semibold shadow-[0_0_0_1px_rgba(46,21,3,0.04)]",
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
      </div>
    </div>
  );
}

export function HealersDirectory({
  healers,
  specialties,
  regions,
  languages,
}: HealersDirectoryProps) {
  const router = useRouter();

  const [specialtyFilter, setSpecialtyFilter] = useState<string>("all");
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [languageFilter, setLanguageFilter] = useState<string>("all");

  const filteredHealers = useMemo(
    () =>
      healers.filter((healer) => {
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
      }),
    [healers, specialtyFilter, regionFilter, languageFilter],
  );

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

        <div className="hidden sm:block">
          <Filters
            selectedSpecialty={specialtyFilter}
            selectedRegion={regionFilter}
            selectedLanguage={languageFilter}
            onSpecialtyChange={setSpecialtyFilter}
            onRegionChange={setRegionFilter}
            onLanguageChange={setLanguageFilter}
            specialties={specialties}
            regions={regions}
            languages={languages}
          />
        </div>

        <div className="sm:hidden">
          <Accordion type="single" collapsible defaultValue="filters">
            <AccordionItem value="filters">
              <AccordionTrigger className="justify-between px-2 text-xs font-semibold tracking-[0.2em] uppercase text-terra/80">
                Filters
              </AccordionTrigger>
              <AccordionContent>
                <Filters
                  selectedSpecialty={specialtyFilter}
                  selectedRegion={regionFilter}
                  selectedLanguage={languageFilter}
                  onSpecialtyChange={setSpecialtyFilter}
                  onRegionChange={setRegionFilter}
                  onLanguageChange={setLanguageFilter}
                  specialties={specialties}
                  regions={regions}
                  languages={languages}
                  compact
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

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

        {filteredHealers.length === 0 ? (
          <EmptyState
            icon="👨‍⚕️"
            title="No healers match these filters"
            description="Try adjusting specialty, region, or language to see more traditional healers while we expand our network."
            className="bg-white/50 border-terra/10"
          />
        ) : (
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredHealers.map((healer) => (
              <HealerCard
                key={healer.id}
                healer={healer}
                onBook={(id) => router.push(`/consultations?healer=${id}`)}
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
