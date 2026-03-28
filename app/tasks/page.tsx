"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { mockTasks } from "@/lib/mock/tasks";

const VirtualTaskList = dynamic(
  () => import("@/components/tasks").then((mod) => mod.VirtualTaskList),
  {
    ssr: false,
    loading: () => <div className="h-[420px] rounded-2xl bg-white/70" aria-hidden="true" />,
  },
);

const categoryIcon: Record<string, string> = {
  Nutrition: "💧",
  Exercise: "🏃",
  "Traditional Medicine": "🌿",
};

export default function TasksPage() {
  const router = useRouter();

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

          <section>
            <VirtualTaskList
              tasks={mockTasks}
              categoryIcon={categoryIcon}
              onTaskSelect={(taskId) => router.push(`/tasks/${taskId}`)}
            />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
