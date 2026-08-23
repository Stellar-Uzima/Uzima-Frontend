import { readCollection, withFileLock, writeCollection } from './store';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'suspended';
  joined: string;
}

const FILE = 'admin/users.json';

const SEED: AdminUser[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', joined: '2026-01-10' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'healer', status: 'active', joined: '2026-02-15' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'suspended', joined: '2026-03-01' },
];

export async function getUsers(): Promise<AdminUser[]> {
  return readCollection(FILE, SEED);
}

export async function updateUserStatuses(
  ids: string[],
  status: AdminUser['status']
): Promise<AdminUser[]> {
  return withFileLock(FILE, async () => {
    const users = await readCollection(FILE, SEED);
    const idSet = new Set(ids);
    const updated: AdminUser[] = [];

    for (const user of users) {
      if (idSet.has(user.id)) {
        user.status = status;
        updated.push(user);
      }
    }

    await writeCollection(FILE, users);
    return updated;
  });
}
