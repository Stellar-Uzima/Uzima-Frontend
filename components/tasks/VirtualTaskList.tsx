"use client";

import * as React from "react";
import { useCallback, useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import { HealthTaskCard } from "@/components/tasks/HealthTaskCard";
import type { HealthTask } from "@/lib/mock/tasks";

interface VirtualTaskListProps {
  tasks: HealthTask[];
  categoryIcon: Record<string, string>;
  onTaskSelect: (taskId: string) => void;
}

function useTaskColumns() {
  const [columns, setColumns] = React.useState(1);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");

    const updateColumns = () => {
      setColumns(mediaQuery.matches ? 2 : 1);
    };

    updateColumns();
    mediaQuery.addEventListener("change", updateColumns);

    return () => {
      mediaQuery.removeEventListener("change", updateColumns);
    };
  }, []);

  return columns;
}

export function VirtualTaskList({ tasks, categoryIcon, onTaskSelect }: VirtualTaskListProps) {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const columns = useTaskColumns();

  const handleTaskSelect = useCallback((taskId: string) => {
    onTaskSelect(taskId)
  }, [onTaskSelect])

  const taskCallbacks = useMemo(() => {
    const callbacks: Record<string, () => void> = {}
    for (const task of tasks) {
      callbacks[task.id] = () => handleTaskSelect(task.id)
    }
    return callbacks
  }, [tasks, handleTaskSelect])

  const rows = React.useMemo(() => {
    const chunked: HealthTask[][] = [];

    for (let i = 0; i < tasks.length; i += columns) {
      chunked.push(tasks.slice(i, i + columns));
    }

    return chunked;
  }, [columns, tasks]);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 280,
    overscan: 3,
    getItemKey: (index) => rows[index]?.[0]?.id ?? index,
    measureElement: (element) => element.getBoundingClientRect().height,
  });

  React.useEffect(() => {
    rowVirtualizer.measure();
  }, [columns, rowVirtualizer, tasks.length]);

  return (
    <div
      ref={parentRef}
      className="h-[70vh] min-h-[480px] overflow-y-auto overscroll-contain pr-1"
      data-slot="virtual-task-list"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
          width: "100%",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const rowTasks = rows[virtualRow.index] ?? [];

          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              className="absolute left-0 top-0 w-full pb-4"
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                {rowTasks.map((task) => (
                  <HealthTaskCard
                    key={task.id}
                    title={task.title}
                    reward={task.rewardXLM}
                    category={task.category}
                    icon={categoryIcon[task.category] ?? "🩺"}
                    status="available"
                    onClaim={taskCallbacks[task.id]}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
