"use client";

// IndexedDB wrapper for offline task queue management
const DB_NAME = "uzima-offline-db";
const DB_VERSION = 1;
const TASK_STORE = "pending-tasks";

export interface PendingTask {
  id: string;
  data: any;
  timestamp: number;
  retries: number;
  status: "pending" | "syncing" | "failed";
}

class OfflineTaskQueue {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    if (this.db) return;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains(TASK_STORE)) {
          const store = db.createObjectStore(TASK_STORE, { keyPath: "id" });
          store.createIndex("timestamp", "timestamp", { unique: false });
          store.createIndex("status", "status", { unique: false });
        }
      };
    });
  }

  async addTask(taskData: any): Promise<string> {
    await this.init();
    if (!this.db) throw new Error("Database not initialized");

    const task: PendingTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      data: taskData,
      timestamp: Date.now(),
      retries: 0,
      status: "pending",
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([TASK_STORE], "readwrite");
      const store = transaction.objectStore(TASK_STORE);
      const request = store.add(task);

      request.onsuccess = () => resolve(task.id);
      request.onerror = () => reject(request.error);
    });
  }

  async getAllPendingTasks(): Promise<PendingTask[]> {
    await this.init();
    if (!this.db) throw new Error("Database not initialized");

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([TASK_STORE], "readonly");
      const store = transaction.objectStore(TASK_STORE);
      const index = store.index("status");
      const request = index.getAll("pending");

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async updateTaskStatus(
    taskId: string,
    status: PendingTask["status"]
  ): Promise<void> {
    await this.init();
    if (!this.db) throw new Error("Database not initialized");

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([TASK_STORE], "readwrite");
      const store = transaction.objectStore(TASK_STORE);
      const getRequest = store.get(taskId);

      getRequest.onsuccess = () => {
        const task = getRequest.result;
        if (task) {
          task.status = status;
          const updateRequest = store.put(task);
          updateRequest.onsuccess = () => resolve();
          updateRequest.onerror = () => reject(updateRequest.error);
        } else {
          reject(new Error("Task not found"));
        }
      };

      getRequest.onerror = () => reject(getRequest.error);
    });
  }

  async deleteTask(taskId: string): Promise<void> {
    await this.init();
    if (!this.db) throw new Error("Database not initialized");

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([TASK_STORE], "readwrite");
      const store = transaction.objectStore(TASK_STORE);
      const request = store.delete(taskId);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getTaskCount(): Promise<number> {
    await this.init();
    if (!this.db) throw new Error("Database not initialized");

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([TASK_STORE], "readonly");
      const store = transaction.objectStore(TASK_STORE);
      const request = store.count();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async incrementRetries(taskId: string): Promise<void> {
    await this.init();
    if (!this.db) throw new Error("Database not initialized");

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([TASK_STORE], "readwrite");
      const store = transaction.objectStore(TASK_STORE);
      const getRequest = store.get(taskId);

      getRequest.onsuccess = () => {
        const task = getRequest.result;
        if (task) {
          task.retries += 1;
          const updateRequest = store.put(task);
          updateRequest.onsuccess = () => resolve();
          updateRequest.onerror = () => reject(updateRequest.error);
        } else {
          reject(new Error("Task not found"));
        }
      };

      getRequest.onerror = () => reject(getRequest.error);
    });
  }

  async clearAllTasks(): Promise<void> {
    await this.init();
    if (!this.db) throw new Error("Database not initialized");

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([TASK_STORE], "readwrite");
      const store = transaction.objectStore(TASK_STORE);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

// Singleton instance
export const offlineTaskQueue = new OfflineTaskQueue();

// Sync manager to handle background sync
export class TaskSyncManager {
  private syncInProgress = false;
  private listeners: Array<(event: SyncEvent) => void> = [];

  addEventListener(listener: (event: SyncEvent) => void) {
    this.listeners.push(listener);
  }

  removeEventListener(listener: (event: SyncEvent) => void) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  private notifyListeners(event: SyncEvent) {
    this.listeners.forEach((listener) => listener(event));
  }

  async syncTasks(): Promise<void> {
    if (this.syncInProgress) {
      console.log("Sync already in progress");
      return;
    }

    if (!navigator.onLine) {
      console.log("Cannot sync: offline");
      return;
    }

    this.syncInProgress = true;
    this.notifyListeners({ type: "sync-start" });

    try {
      const tasks = await offlineTaskQueue.getAllPendingTasks();

      if (tasks.length === 0) {
        console.log("No tasks to sync");
        this.syncInProgress = false;
        return;
      }

      console.log(`Syncing ${tasks.length} tasks...`);

      for (const task of tasks) {
        try {
          await offlineTaskQueue.updateTaskStatus(task.id, "syncing");

          // Replace this with your actual API endpoint
          const response = await fetch("/api/tasks/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(task.data),
          });

          if (response.ok) {
            await offlineTaskQueue.deleteTask(task.id);
            this.notifyListeners({
              type: "task-synced",
              taskId: task.id,
              success: true,
            });
            console.log(`Task ${task.id} synced successfully`);
          } else {
            await offlineTaskQueue.incrementRetries(task.id);
            await offlineTaskQueue.updateTaskStatus(task.id, "pending");

            if (task.retries >= 3) {
              await offlineTaskQueue.updateTaskStatus(task.id, "failed");
              this.notifyListeners({
                type: "task-synced",
                taskId: task.id,
                success: false,
                error: "Max retries exceeded",
              });
            }
          }
        } catch (error) {
          console.error(`Error syncing task ${task.id}:`, error);
          await offlineTaskQueue.incrementRetries(task.id);
          await offlineTaskQueue.updateTaskStatus(task.id, "pending");
        }
      }

      this.notifyListeners({ type: "sync-complete" });
    } catch (error) {
      console.error("Sync error:", error);
      this.notifyListeners({ type: "sync-error", error });
    } finally {
      this.syncInProgress = false;
    }
  }

  // Auto-sync when coming back online
  enableAutoSync() {
    window.addEventListener("online", () => {
      console.log("Network restored, syncing tasks...");
      this.syncTasks();
    });
  }
}

export const taskSyncManager = new TaskSyncManager();

// Type definitions for sync events
export type SyncEvent =
  | { type: "sync-start" }
  | { type: "sync-complete" }
  | { type: "sync-error"; error: any }
  | { type: "task-synced"; taskId: string; success: boolean; error?: string };

// Helper hook for React components
export function useOfflineTaskQueue() {
  const queueTask = async (taskData: any) => {
    try {
      const taskId = await offlineTaskQueue.addTask(taskData);
      console.log("Task queued:", taskId);
      return taskId;
    } catch (error) {
      console.error("Error queueing task:", error);
      throw error;
    }
  };

  const syncTasks = async () => {
    await taskSyncManager.syncTasks();
  };

  const getPendingCount = async () => {
    return await offlineTaskQueue.getTaskCount();
  };

  return { queueTask, syncTasks, getPendingCount };
}
