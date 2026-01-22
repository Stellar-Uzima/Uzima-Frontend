"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SyncBadge from "./SyncBadge";
import { MedicalRecord } from "../lib/indexedDb";

interface MedicalRecordListProps {
  records: MedicalRecord[];
}

export default function MedicalRecordList({ records }: MedicalRecordListProps) {
  if (records.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">No medical records yet</h3>
            <p className="mt-2 text-sm text-gray-500">
              Get started by creating a new medical record above.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Medical Records</CardTitle>
          <CardDescription>
            {records.length} {records.length === 1 ? "record" : "records"} saved locally
          </CardDescription>
        </CardHeader>
      </Card>

      {records.map((record) => (
        <Card key={record.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-xl">{record.patientName}</CardTitle>
                <CardDescription>Age: {record.age} years old</CardDescription>
              </div>
              <SyncBadge status={record.syncStatus} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Diagnosis</h4>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{record.diagnosis}</p>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs text-gray-500">
                  Created: {new Date(record.createdAt).toLocaleString()}
                </p>
                {record.updatedAt && (
                  <p className="text-xs text-gray-500">
                    Updated: {new Date(record.updatedAt).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
