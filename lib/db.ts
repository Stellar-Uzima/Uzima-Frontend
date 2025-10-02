
import localforage from 'localforage';
import { MedicalRecord } from '@/types/medical-record';

const DB_NAME = 'uzima-medical-records';

localforage.config({
  name: DB_NAME,
  storeName: 'records',
  description: 'Offline storage for medical records',
});

export const addRecord = async (record: MedicalRecord) => {
  const records = await getRecords();
  const existingRecordIndex = records.findIndex((r) => r.id === record.id);

  if (existingRecordIndex > -1) {
    records[existingRecordIndex] = record;
  } else {
    records.push(record);
  }

  await localforage.setItem('records', records);
};

export const getRecords = async (): Promise<MedicalRecord[]> => {
  const records = await localforage.getItem<MedicalRecord[]>('records');
  return records || [];
};

export const getRecord = async (id: string): Promise<MedicalRecord | undefined> => {
  const records = await getRecords();
  return records.find((record) => record.id === id);
};

export const getUnsyncedRecords = async (): Promise<MedicalRecord[]> => {
  const records = await getRecords();
  return records.filter((record) => record.syncStatus !== 'synced');
};

export const updateRecordStatus = async (id: string, syncStatus: 'synced' | 'pending' | 'error') => {
  const records = await getRecords();
  const recordIndex = records.findIndex((record) => record.id === id);

  if (recordIndex > -1) {
    records[recordIndex].syncStatus = syncStatus;
    await localforage.setItem('records', records);
  }
};
