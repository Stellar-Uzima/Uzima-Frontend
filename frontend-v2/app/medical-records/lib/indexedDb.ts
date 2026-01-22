// IndexedDB utilities for medical records

export interface MedicalRecord {
  id?: number;
  patientName: string;
  age: number;
  diagnosis: string;
  syncStatus: "pending" | "synced";
  createdAt: Date;
  updatedAt: Date;
}

const DB_NAME = "MedicalRecordsDB";
const STORE_NAME = "medicalRecords";
const DB_VERSION = 1;

// Initialize IndexedDB
export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = db.createObjectStore(STORE_NAME, { 
          keyPath: "id", 
          autoIncrement: true 
        });
        objectStore.createIndex("syncStatus", "syncStatus", { unique: false });
        objectStore.createIndex("createdAt", "createdAt", { unique: false });
      }
    };
  });
};

// Add a new medical record
export const addRecord = async (record: Omit<MedicalRecord, "id">): Promise<number> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(record);

    request.onsuccess = () => resolve(request.result as number);
    request.onerror = () => reject(request.error);
  });
};

// Get all medical records
export const getAllRecords = async (): Promise<MedicalRecord[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const records = request.result as MedicalRecord[];
      // Sort by most recent first
      records.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      resolve(records);
    };
    request.onerror = () => reject(request.error);
  });
};

// Get a single record by ID
export const getRecord = async (id: number): Promise<MedicalRecord | undefined> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Update a medical record
export const updateRecord = async (record: MedicalRecord): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(record);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// Update sync status
export const updateSyncStatus = async (
  id: number, 
  syncStatus: "pending" | "synced"
): Promise<void> => {
  const record = await getRecord(id);
  if (record) {
    record.syncStatus = syncStatus;
    record.updatedAt = new Date();
    await updateRecord(record);
  }
};

// Delete a medical record
export const deleteRecord = async (id: number): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// Simulate sync - updates status after delay
export const simulateSync = async (id: number, delayMs: number = 2500): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      await updateSyncStatus(id, "synced");
      resolve();
    }, delayMs);
  });
};
