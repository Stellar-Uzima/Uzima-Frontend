import { readCollection, withFileLock, writeCollection } from './store';

export interface HealerVerificationRequest {
  id: string;
  name: string;
  specialties: string[];
  region: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  decidedAt: string | null;
}

const FILE = 'admin/healer-verifications.json';

const SEED: HealerVerificationRequest[] = [
  { id: '1', name: 'Dr. John Doe', specialties: ['Herbal Medicine'], region: 'West Africa', status: 'pending', submittedAt: '2026-03-25', decidedAt: null },
  { id: '2', name: 'Dr. Jane Smith', specialties: ['Spiritual Healing'], region: 'East Africa', status: 'pending', submittedAt: '2026-03-26', decidedAt: null },
];

export async function getPendingVerificationRequests(): Promise<HealerVerificationRequest[]> {
  const all = await readCollection(FILE, SEED);
  return all.filter(r => r.status === 'pending');
}

export async function decideVerificationRequest(
  id: string,
  action: 'approve' | 'reject'
): Promise<HealerVerificationRequest | null> {
  return withFileLock(FILE, async () => {
    const all = await readCollection(FILE, SEED);
    const request = all.find(r => r.id === id);

    if (!request) return null;

    request.status = action === 'approve' ? 'approved' : 'rejected';
    request.decidedAt = new Date().toISOString();
    await writeCollection(FILE, all);
    return request;
  });
}
