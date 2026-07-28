"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Bookmark } from "lucide-react";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { HealthTaskCard } from "@/components/tasks";
import { EmptyState } from "@/components/ui/EmptyState";
import { mockTasks } from "@/lib/mock/tasks";
import { useBookmarks } from "@/hooks/useBookmarks";

export default function SavedTasksPage() {
  const router = useRouter();
  const { bookmarkedIds, toggleBookmark, isBookmarked, bookmarkCount } =
    useBookmarks();

  // Cross-reference bookmarked IDs against the full task list
  const savedTasks = mockTasks.filter((task) =>
    bookmarkedIds.has(task.id),
  );

  return (
    <>
      <Navigation />

      <main className="pt-28 pb-20 px-4 sm:px-6 bg-cream min-h-screen">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <header className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-terra/80">
              <Bookmark className="h-3.5 w-3.5" />
              <span>Saved Tasks</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-earth tracking-tight">
              Your bookmarked tasks
            </h1>
            <p className="text-sm sm:text-base text-muted max-w-2xl">
              {bookmarkCount > 0
                ? `You have ${bookmarkCount} saved ${
                    bookmarkCount === 1 ? "task" : "tasks"
                  }. Unbookmark any task to remove it from this list.`
                : "Bookmark tasks from the tasks page to see them here."}
            </p>
          </header>

          {/* Back link */}
          <div>
            <Link
              href="/tasks"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-earth transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to all tasks</span>
            </Link>
          </div>

          {/* Content */}
          {savedTasks.length > 0 ? (
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {savedTasks.map((task) => (
                <HealthTaskCard
                  key={task.id}
                  taskId={task.id}
                  title={task.title}
                  reward={task.rewardXLM}
                  category={task.category}
                  status="available"
                  icon={task.icon || ""}
                  isBookmarked={isBookmarked(task.id)}
                  onToggleBookmark={() => toggleBookmark(task.id)}
                  onClaim={() => router.push(`/tasks/${task.id}`)}
                />
              ))}
            </section>
          ) : (
            <EmptyState
              illustration="tasks"
              title="No saved tasks yet"
              description="You haven't bookmarked any tasks. Browse available tasks and bookmark the ones you want to track."
              ctaLabel="Browse tasks"
              onCtaClick={() => router.push("/tasks")}
            />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
