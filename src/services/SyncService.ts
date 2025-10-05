import localforage from 'localforage';
import axios from 'axios';

export interface MedicalRecord {
  patientName: string;
  diagnosis: string;
  treatment: string;
  date: string;
  txHash: string;
  filePath?: string;
  createdBy: string;
  timestamp?: number;
}

export interface SyncConfig {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
}

export enum ConflictResolutionPolicy {
  LATEST_WINS = 'latest_wins',
  SERVER_WINS = 'server_wins',
  CLIENT_WINS = 'client_wins',
}

const RECORDS_KEY = 'offline-records';
const SYNC_METADATA_KEY = 'sync-metadata';

const DEFAULT_SYNC_CONFIG: Required<SyncConfig> = {
  maxRetries: 5,
  initialDelay: 1000,
  maxDelay: 32000,
  backoffMultiplier: 2,
};

interface SyncMetadata {
  lastSyncAttempt?: number;
  failedAttempts: number;
  syncedHashes: Set<string>;
}

const sleep = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

const calculateBackoffDelay = (
  attempt: number,
  config: Required<SyncConfig>
): number => {
  const delay = config.initialDelay * Math.pow(config.backoffMultiplier, attempt);
  return Math.min(delay, config.maxDelay);
};

const deduplicateByTxHash = (records: MedicalRecord[]): MedicalRecord[] => {
  const seen = new Set<string>();
  const deduplicated: MedicalRecord[] = [];

  for (const record of records) {
    if (!seen.has(record.txHash)) {
      seen.add(record.txHash);
      deduplicated.push(record);
    }
  }

  return deduplicated;
};

const getSyncMetadata = async (): Promise<SyncMetadata> => {
  const metadata = await localforage.getItem<SyncMetadata>(SYNC_METADATA_KEY);
  return metadata || { failedAttempts: 0, syncedHashes: new Set<string>() };
};

const updateSyncMetadata = async (metadata: SyncMetadata): Promise<void> => {
  await localforage.setItem(SYNC_METADATA_KEY, {
    ...metadata,
    syncedHashes: Array.from(metadata.syncedHashes),
  });
};

const resolveConflict = (
  clientRecord: MedicalRecord,
  serverRecord: MedicalRecord,
  policy: ConflictResolutionPolicy
): MedicalRecord => {
  switch (policy) {
    case ConflictResolutionPolicy.LATEST_WINS:
      const clientTimestamp = clientRecord.timestamp || 0;
      const serverTimestamp = serverRecord.timestamp || 0;
      return clientTimestamp > serverTimestamp ? clientRecord : serverRecord;

    case ConflictResolutionPolicy.SERVER_WINS:
      return serverRecord;

    case ConflictResolutionPolicy.CLIENT_WINS:
      return clientRecord;

    default:
      return clientRecord;
  }
};

export const saveRecordOffline = async (record: MedicalRecord) => {
  const recordWithTimestamp = {
    ...record,
    timestamp: record.timestamp || Date.now(),
  };

  const existing = (await localforage.getItem<MedicalRecord[]>(RECORDS_KEY)) || [];
  const deduplicated = deduplicateByTxHash([...existing, recordWithTimestamp]);
  await localforage.setItem(RECORDS_KEY, deduplicated);
};

export const syncRecords = async (
  config: SyncConfig = {},
  conflictPolicy: ConflictResolutionPolicy = ConflictResolutionPolicy.LATEST_WINS
): Promise<{ success: boolean; syncedCount: number; failedCount: number }> => {
  const finalConfig = { ...DEFAULT_SYNC_CONFIG, ...config };
  const records = (await localforage.getItem<MedicalRecord[]>(RECORDS_KEY)) || [];

  if (records.length === 0) {
    return { success: true, syncedCount: 0, failedCount: 0 };
  }

  const deduplicatedRecords = deduplicateByTxHash(records);
  const metadata = await getSyncMetadata();

  const recordsToSync = deduplicatedRecords.filter(
    (r) => !metadata.syncedHashes.has(r.txHash)
  );

  if (recordsToSync.length === 0) {
    return { success: true, syncedCount: 0, failedCount: 0 };
  }

  let attempt = 0;
  let lastError: Error | null = null;

  while (attempt < finalConfig.maxRetries) {
    try {
      if (attempt > 0) {
        const delay = calculateBackoffDelay(attempt - 1, finalConfig);
        console.log(`Retry attempt ${attempt}, waiting ${delay}ms before retry`);
        await sleep(delay);
      }

      const response = await axios.post('/api/sync', {
        records: recordsToSync,
        conflictPolicy,
      });

      const { synced, conflicts } = response.data;

      if (conflicts && conflicts.length > 0) {
        for (const conflict of conflicts) {
          const clientRecord = recordsToSync.find((r) => r.txHash === conflict.txHash);
          if (clientRecord) {
            const resolved = resolveConflict(
              clientRecord,
              conflict.serverRecord,
              conflictPolicy
            );

            await axios.post('/api/sync/resolve', {
              txHash: conflict.txHash,
              resolvedRecord: resolved,
            });
          }
        }
      }

      const syncedHashes = new Set([
        ...Array.from(metadata.syncedHashes),
        ...(synced || []),
      ]);

      const remaining = deduplicatedRecords.filter(
        (r) => !syncedHashes.has(r.txHash)
      );

      await localforage.setItem(RECORDS_KEY, remaining);
      await updateSyncMetadata({
        lastSyncAttempt: Date.now(),
        failedAttempts: 0,
        syncedHashes,
      });

      console.log(`Successfully synced ${synced.length} records`);

      return {
        success: true,
        syncedCount: synced.length,
        failedCount: recordsToSync.length - synced.length,
      };
    } catch (error) {
      lastError = error as Error;
      attempt++;

      const isRetriable =
        axios.isAxiosError(error) &&
        (error.response?.status === 429 ||
         error.response?.status === 503 ||
         error.response?.status === 500 ||
         error.code === 'ECONNABORTED' ||
         error.code === 'ETIMEDOUT' ||
         !error.response);

      if (!isRetriable || attempt >= finalConfig.maxRetries) {
        console.error(`Sync failed after ${attempt} attempts:`, error);

        await updateSyncMetadata({
          ...metadata,
          lastSyncAttempt: Date.now(),
          failedAttempts: metadata.failedAttempts + 1,
        });

        return {
          success: false,
          syncedCount: 0,
          failedCount: recordsToSync.length,
        };
      }

      console.warn(`Sync attempt ${attempt} failed, will retry:`, error);
    }
  }

  console.error('Max retries exceeded:', lastError);
  return {
    success: false,
    syncedCount: 0,
    failedCount: recordsToSync.length,
  };
};
