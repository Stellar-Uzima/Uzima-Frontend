"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Bookmark } from "lucide-react";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { mockTasks } from "@/lib/mock/tasks";
import { useBookmarks } from "@/hooks/useBookmarks";
import { HealthTaskCard } from "@/components/tasks/HealthTaskCard";

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
  "Traditional Medicine": "🌿",
};

type Tab = "all" | "saved"

export default function TasksPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<Tab>("all")
  const { bookmarkCount, isBookmarked, toggleBookmark, bookmarkedIds } = useBookmarks()

  const savedTasks = React.useMemo(
    () => mockTasks.filter((task) => isBookmarked(task.id)),
    [isBookmarked, bookmarkCount],
  )

  const allBookmarkedIds = React.useMemo(
    () => new Set(mockTasks.filter((t) => isBookmarked(t.id)).map((t) => t.id)),
    [isBookmarked, bookmarkCount],
  )

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

          {/* Issue #215 — Tab bar */}
          <div className="flex gap-2 border-b border-[#E8D4C0]">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={[
                "px-4 py-2 text-sm font-semibold transition-all duration-200 border-b-2 -mb-px",
                activeTab === "all"
                  ? "border-[#C05A2B] text-[#C05A2B]"
                  : "border-transparent text-[#8A6040]/60 hover:text-[#C05A2B]",
              ].join(" ")}
            >
              All Tasks
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={[
                "flex items-center gap-1.5 px-4 py-2 text-sm font-semibold transition-all duration-200 border-b-2 -mb-px",
                activeTab === "saved"
                  ? "border-[#C05A2B] text-[#C05A2B]"
                  : "border-transparent text-[#8A6040]/60 hover:text-[#C05A2B]",
              ].join(" ")}
            >
              <Bookmark className="h-3.5 w-3.5" />
              Saved Tasks
              {bookmarkCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C05A2B] px-1.5 text-[10px] font-bold text-white">
                  {bookmarkCount}
                </span>
              )}
            </button>
          </div>

          <section>
            {activeTab === "all" ? (
              <VirtualTaskList
                tasks={mockTasks}
                categoryIcon={categoryIcon}
                onTaskSelect={(taskId) => router.push(`/tasks/${taskId}`)}
                bookmarkedIds={allBookmarkedIds}
                onToggleBookmark={toggleBookmark}
              />
            ) : savedTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#C05A2B]/10">
                  <Bookmark className="h-8 w-8 text-[#C05A2B]/40" />
                </div>
                <h3 className="font-serif text-xl font-bold text-earth mb-2">
                  No saved tasks yet
                </h3>
                <p className="text-sm text-muted max-w-xs">
                  Tap the bookmark icon on any task to save it here for quick access.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab("all")}
                  className="mt-6 rounded-xl bg-[#C05A2B] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#A04A22] transition-colors"
                >
                  Browse Tasks
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                {savedTasks.map((task) => (
                  <HealthTaskCard
                    key={task.id}
                    taskId={task.id}
                    title={task.title}
                    reward={task.rewardXLM}
                    category={task.category}
                    icon={categoryIcon[task.category] ?? "🩺"}
                    status="available"
                    isBookmarked={true}
                    onToggleBookmark={toggleBookmark}
                    onClaim={() => router.push(`/tasks/${task.id}`)}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}