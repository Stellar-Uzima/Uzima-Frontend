"use client";

import { useRouter } from "next/navigation";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { HealthTaskCard } from "@/components/tasks";
import { mockTasks } from "@/lib/mock/tasks";

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

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {mockTasks.map((task) => (
              <HealthTaskCard
                key={task.id}
                title={task.title}
                reward={task.rewardXLM}
                category={task.category}
                status="available"
                onClaim={() => router.push(`/tasks/${task.id}`)}
              />
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
