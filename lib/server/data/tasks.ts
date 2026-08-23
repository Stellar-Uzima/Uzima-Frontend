import { randomUUID } from 'crypto';
import { readCollection, withFileLock, writeCollection } from './store';

export interface AdminTask {
  id: string;
  title: string;
  category: string;
  rewardXLM: number;
  status: 'active' | 'inactive';
  createdAt: string;
  deletedAt: string | null;
}

const FILE = 'admin/tasks.json';

const SEED: AdminTask[] = [
  { id: '1', title: 'Daily Meditation', category: 'Mental Health', rewardXLM: 10, status: 'active', createdAt: '2026-03-30', deletedAt: null },
  { id: '2', title: 'Hygiene Check', category: 'Hygiene', rewardXLM: 5, status: 'active', createdAt: '2026-03-29', deletedAt: null },
  { id: '3', title: 'Morning Exercise', category: 'Exercise', rewardXLM: 15, status: 'inactive', createdAt: '2026-03-28', deletedAt: null },
];

async function getAllTasks(): Promise<AdminTask[]> {
  return readCollection(FILE, SEED);
}

export async function getTasks(): Promise<AdminTask[]> {
  const tasks = await getAllTasks();
  return tasks.filter(t => !t.deletedAt);
}

export async function createTask(input: {
  title: string;
  category: string;
  rewardXLM: number;
}): Promise<AdminTask> {
  return withFileLock(FILE, async () => {
    const tasks = await readCollection(FILE, SEED);
    const newTask: AdminTask = {
      id: randomUUID(),
      title: input.title,
      category: input.category,
      rewardXLM: input.rewardXLM,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      deletedAt: null,
    };

    tasks.push(newTask);
    await writeCollection(FILE, tasks);
    return newTask;
  });
}

export async function softDeleteTask(id: string): Promise<boolean> {
  return withFileLock(FILE, async () => {
    const tasks = await readCollection(FILE, SEED);
    const task = tasks.find(t => t.id === id);

    if (!task || task.deletedAt) return false;

    task.deletedAt = new Date().toISOString();
    await writeCollection(FILE, tasks);
    return true;
  });
}
