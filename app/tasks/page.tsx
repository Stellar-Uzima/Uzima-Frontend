"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ListFilter } from "lucide-react";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { mockTasks } from "@/lib/mock/tasks";
import { TaskFilters } from "@/components/tasks/TaskFilters";

const VirtualTaskList = dynamic(
  () => import("@/components/tasks").then((mod) => mod.VirtualTaskList),
  {
    ssr: false,
    loading: () => (
      <div className="h-[420px] rounded-2xl bg-white/70" aria-hidden="true" />
    ),
  },
);

const categoryIcon: Record<string, string> = {
  Nutrition: "💧",
  Exercise: "🏃",
  "Mental Health": "🧘",
  Maternal: "👶",
  Traditional: "🌿",
  Hygiene: "🧼",
};

function TasksContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [cat, setCat] = useState(searchParams.get("category") || "All");
  const [stat, setStat] = useState(searchParams.get("status") || "All");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");

  useEffect(() => {
    setCat(searchParams.get("category") || "All");
    setStat(searchParams.get("status") || "All");
    setSort(searchParams.get("sort") || "newest");
  }, [searchParams]);

  const handleFilterChange = (key: string, value: string) => {
    if (key === "category") setCat(value);
    if (key === "status") setStat(value);
    if (key === "sort") setSort(value);

    const params = new URLSearchParams(searchParams.toString());
    if (value === "All") params.delete(key);
    else params.set(key, value);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filteredTasks = useMemo(() => {
    let result = [...mockTasks];

    if (cat !== "All") {
      result = result.filter((task) => {
        if (cat === "Traditional")
          return task.category === "Traditional Medicine";
        return task.category === cat;
      });
    }

    if (stat !== "All") {
      result = result.filter((task) => task.status === stat.toLowerCase());
    }

    result.sort((a, b) => {
      switch (sort) {
        case "reward-desc":
          return b.rewardXLM - a.rewardXLM;
        case "category-asc":
          return a.category.localeCompare(b.category);
        case "newest":
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

    return result;
  }, [cat, stat, sort]);

  return (
    <>
      <TaskFilters
        activeCategory={cat}
        activeStatus={stat}
        activeSort={sort}
        onFilterChange={handleFilterChange}
        onClearAll={() => {
          setCat("All");
          setStat("All");
          router.push(pathname);
        }}
      />

      <section className="min-h-[400px]">
        {filteredTasks.length > 0 ? (
          <VirtualTaskList
            tasks={filteredTasks}
            categoryIcon={categoryIcon}
            onTaskSelect={(taskId) => router.push(`/tasks/${taskId}`)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-dashed border-terra/20 bg-white/50 text-center">
            <ListFilter className="h-10 w-10 text-terra/20 mb-4" />
            <h3 className="text-earth font-bold text-lg">No tasks found</h3>
            <Button
              variant="outline"
              onClick={() => {
                setCat("All");
                setStat("All");
                router.push(pathname);
              }}
              className="mt-4 rounded-full"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </section>
    </>
  );
}

export default function TasksPage() {
  return (
    <>
      <Navigation />
      <main className="pt-28 pb-20 px-4 sm:px-6 bg-cream min-h-screen">
        <div className="max-w-5xl mx-auto space-y-8">
          <header className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-terra/80">
              Daily Health Tasks
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-earth tracking-tight">
              Earn XLM for caring for your health
            </h1>
            <p className="text-sm sm:text-base text-muted max-w-2xl">
              Choose a task that fits your day, follow the simple health steps,
              and complete it honestly to unlock your Stellar Lumens (XLM)
              reward.
            </p>
          </header>

          <Suspense
            fallback={
              <div className="h-96 w-full bg-white/50 rounded-3xl animate-pulse" />
            }
          >
            <TasksContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}