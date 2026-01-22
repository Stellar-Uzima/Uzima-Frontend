"use client";

import { useEffect, useState } from "react";
import MedicalRecordForm from "./components/MedicalRecordForm";
import MedicalRecordList from "./components/MedicalRecordList";
import { MedicalRecord, getAllRecords } from "./lib/indexedDb";

export default function MedicalRecordsPage() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadRecords = async () => {
    try {
      const allRecords = await getAllRecords();
      setRecords(allRecords);
    } catch (error) {
      console.error("Error loading records:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const handleRecordAdded = () => {
    loadRecords();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading medical records...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical Records</h1>
          <p className="text-gray-600">
            Offline-first medical records management system
          </p>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <svg
              className="w-4 h-4 mr-1 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Offline ready - All data stored locally
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          <div>
            <MedicalRecordForm onRecordAdded={handleRecordAdded} />
          </div>

          <div>
            <MedicalRecordList records={records} />
          </div>
        </div>
      </div>
    </div>
  );
}
