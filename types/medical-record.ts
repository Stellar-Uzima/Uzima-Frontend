
export interface MedicalRecord {
  id: string;
  patientName: string;
  diagnosis: string;
  treatment: string;
  date: string;
  syncStatus: "synced" | "pending" | "error";
  filePath?: string;
  createdBy: string;
}
