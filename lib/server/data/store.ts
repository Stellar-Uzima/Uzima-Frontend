import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data', 'admin');

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

/**
 * Reads a JSON collection file, seeding it on disk with `seed` the first
 * time it's accessed so state survives process restarts instead of
 * resetting to `seed` on every read.
 */
export async function readCollection<T>(file: string, seed: T): Promise<T> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, file);
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      await fs.writeFile(filePath, JSON.stringify(seed, null, 2));
      return seed;
    }
    throw err;
  }
}

export async function writeCollection<T>(file: string, data: T): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, file);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

const locks = new Map<string, Promise<unknown>>();

/**
 * Serializes read-modify-write operations per file so concurrent requests
 * (e.g. two bulk actions in flight at once) can't clobber each other's writes.
 */
export async function withFileLock<T>(file: string, fn: () => Promise<T>): Promise<T> {
  const previous = locks.get(file) ?? Promise.resolve();
  const run = previous.then(fn, fn);
  locks.set(
    file,
    run.then(
      () => undefined,
      () => undefined
    )
  );
  return run;
}
