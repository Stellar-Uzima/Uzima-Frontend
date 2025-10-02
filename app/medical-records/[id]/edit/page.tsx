
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MedicalRecordForm } from "@/components/forms/MedicalRecordForm";
import { Navigation } from "@/components/layout/navigation";
import { getRecord } from "@/lib/db";
import { MedicalRecord } from "@/types/medical-record";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditMedicalRecordPage() {
  const { id } = useParams();
  const [record, setRecord] = useState<MedicalRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecord() {
      if (id) {
        const fetchedRecord = await getRecord(id as string);
        setRecord(fetchedRecord || null);
        setLoading(false);
      }
    }
    fetchRecord();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Loading Medical Record...</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-32" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center text-red-700 mb-8">
            Medical Record Not Found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-emerald-700 mb-8">
          Edit Medical Record
        </h1>
        <MedicalRecordForm initialData={record} />
      </div>
    </div>
  );
}
