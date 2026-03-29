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

const PaginatedTaskList = dynamic(
  () => import("@/components/tasks").then((mod) => mod.PaginatedTaskList),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-[240px] rounded-2xl bg-white/70 animate-pulse" />
          ))}
        </div>
        <div className="h-16 bg-white/50 rounded-lg animate-pulse" />
      </div>
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

  // 1. Local State (Ensures immediate re-render)
  const [cat, setCat] = useState(searchParams.get("category") || "All");
  const [stat, setStat] = useState(searchParams.get("status") || "All");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );

  // 2. Sync Local State with URL (for back/forward buttons)
  useEffect(() => {
    setCat(searchParams.get("category") || "All");
    setStat(searchParams.get("status") || "All");
    setSort(searchParams.get("sort") || "newest");
    setCurrentPage(parseInt(searchParams.get("page") || "1", 10));
  }, [searchParams]);

  // 3. Update Function
  const handleFilterChange = (key: string, value: string) => {
    // Update local state first for instant UI response
    if (key === "category") setCat(value);
    if (key === "status") setStat(value);
    if (key === "sort") setSort(value);

    // Reset to page 1 when filters change
    setCurrentPage(1);

    // Update URL
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All") params.delete(key);
    else params.set(key, value);
    
    // Remove page param when resetting to page 1
    params.delete("page");

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // 4. Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    
    // Scroll to top of task list
    const taskSection = document.querySelector('[data-task-section]');
    if (taskSection) {
      taskSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 5. Filtering Logic
  const filteredTasks = useMemo(() => {
    let result = [...mockTasks];

    if (cat !== "All") {
      result = result.filter((task) => {
        // If user clicks "Traditional" pill, look for "Traditional Medicine" in data
        if (cat === "Traditional")
          return task.category === "Traditional Medicine";
        return task.category === cat;
      });
    }

    if (stat !== "All") {
      result = result.filter((task) => {
        // Ensure "Available" (UI) matches "available" (Data)
        return task.status === stat.toLowerCase();
      });
    }

    // 6. Apply Sort
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
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-terra/80">
          Daily Health Tasks
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-earth tracking-tight">
          Earn XLM for caring for your health
        </h1>
      </header>

      <TaskFilters
        activeCategory={cat}
        activeStatus={stat}
        activeSort={sort}
        onFilterChange={handleFilterChange}
        onClearAll={() => {
          setCat("All");
          setStat("All");
          setCurrentPage(1);
          router.push(pathname);
        }}
      />

      <section className="min-h-[400px]" data-task-section>
        {filteredTasks.length > 0 ? (
          <PaginatedTaskList
            tasks={filteredTasks}
            categoryIcon={categoryIcon}
            onTaskSelect={(taskId) => router.push(`/tasks/${taskId}`)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            itemsPerPage={12}
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
                setCurrentPage(1);
                router.push(pathname);
              }}
              className="mt-4 rounded-full"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}

export default function TasksPage() {
  return (
    <>
      <Navigation />
      <main className="pt-28 pb-20 px-4 sm:px-6 bg-cream min-h-screen">
        <Suspense
          fallback={
            <div className="h-96 w-full bg-white/50 rounded-3xl animate-pulse" />
          }
        >
          <TasksContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
