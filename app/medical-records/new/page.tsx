
"use client";

import { MedicalRecordForm } from "@/components/forms/MedicalRecordForm";
import { Navigation } from "@/components/layout/navigation";

export default function CreateMedicalRecordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-emerald-700 mb-8">
          Create New Medical Record
        </h1>
        <MedicalRecordForm />
      </div>
    </div>
  );
}
