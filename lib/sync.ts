
import { getUnsyncedRecords, updateRecordStatus } from './db';
import { MedicalRecord } from '@/types/medical-record';
import axios from 'axios';

export const syncMedicalRecords = async () => {
  const unsyncedRecords = await getUnsyncedRecords();

  if (unsyncedRecords.length === 0) {
    console.log('No unsynced records to synchronize.');
    return;
  }

  console.log(`Attempting to synchronize ${unsyncedRecords.length} records...`);

  try {
    const response = await axios.post('/api/sync', unsyncedRecords);
    const { synced } = response.data;

    for (const recordId of synced) {
      await updateRecordStatus(recordId, 'synced');
    }
    console.log(`Successfully synchronized ${synced.length} records.`);
  } catch (error) {
    console.error('Error during synchronization:', error);
    // Optionally, update status of failed records to 'error'
    for (const record of unsyncedRecords) {
      await updateRecordStatus(record.id, 'error');
    }
  }
};

// Function to check network status (can be expanded with more robust checks)
export const isOnline = () => {
  return navigator.onLine;
};

// Listen for online/offline events to trigger sync
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    console.log('App is online, attempting to sync records...');
    syncMedicalRecords();
  });
  window.addEventListener('offline', () => {
    console.log('App is offline.');
  });
}
