"use client";

import { useEffect, useState, useCallback } from "react";
import {
  offlineTaskQueue,
  taskSyncManager,
  type SyncEvent,
} from "@/lib/offline-queue";

export function useOfflineSync() {
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  const updatePendingCount = useCallback(async () => {
    try {
      const count = await offlineTaskQueue.getTaskCount();
      setPendingCount(count);
    } catch (error) {
      console.error("Error getting pending count:", error);
    }
  }, []);

  useEffect(() => {
    // Initialize online status
    setIsOnline(navigator.onLine);

    // Update pending count on mount
    updatePendingCount();

    // Online/offline event handlers
    const handleOnline = () => {
      setIsOnline(true);
      taskSyncManager.syncTasks();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    // Sync event handler
    const handleSyncEvent = (event: SyncEvent) => {
      if (event.type === "sync-start") {
        setIsSyncing(true);
      } else if (event.type === "sync-complete") {
        setIsSyncing(false);
        updatePendingCount();
      } else if (event.type === "sync-error") {
        setIsSyncing(false);
      } else if (event.type === "task-synced") {
        updatePendingCount();
      }
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    taskSyncManager.addEventListener(handleSyncEvent);

    // Enable auto-sync
    taskSyncManager.enableAutoSync();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      taskSyncManager.removeEventListener(handleSyncEvent);
    };
  }, [updatePendingCount]);

  const queueTask = useCallback(async (taskData: any) => {
    try {
      const taskId = await offlineTaskQueue.addTask(taskData);
      await updatePendingCount();
      return taskId;
    } catch (error) {
      console.error("Error queueing task:", error);
      throw error;
    }
  }, [updatePendingCount]);

  const manualSync = useCallback(async () => {
    await taskSyncManager.syncTasks();
  }, []);

  return {
    isOnline,
    isSyncing,
    pendingCount,
    queueTask,
    manualSync,
  };
}
