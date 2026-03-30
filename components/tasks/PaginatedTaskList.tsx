"use client";

import * as React from "react";
import { HealthTaskCard } from "@/components/tasks/HealthTaskCard";
import { Pagination } from "@/components/ui/Pagination";
import type { HealthTask } from "@/lib/mock/tasks";

interface PaginatedTaskListProps {
  tasks: HealthTask[];
  categoryIcon: Record<string, string>;
  onTaskSelect: (taskId: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
}

export function PaginatedTaskList({
  tasks,
  categoryIcon,
  onTaskSelect,
  currentPage,
  onPageChange,
  itemsPerPage = 12,
}: PaginatedTaskListProps) {
  const totalPages = Math.ceil(tasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTasks = tasks.slice(startIndex, endIndex);

  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Task Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
        {currentTasks.map((task) => (
          <HealthTaskCard
            key={task.id}
            title={task.title}
            reward={task.rewardXLM}
            category={task.category}
            icon={categoryIcon[task.category] ?? "🩺"}
            status="available"
            onClaim={() => onTaskSelect(task.id)}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={tasks.length}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        className="pt-4"
      />
    </div>
  );
}