"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { addRecord, simulateSync } from "../lib/indexedDb";

interface MedicalRecordFormProps {
  onRecordAdded: () => void;
}

export default function MedicalRecordForm({ onRecordAdded }: MedicalRecordFormProps) {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!patientName || !age || !diagnosis) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const newRecord = {
        patientName,
        age: parseInt(age, 10),
        diagnosis,
        syncStatus: "pending" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Save to IndexedDB
      const recordId = await addRecord(newRecord);

      // Reset form
      setPatientName("");
      setAge("");
      setDiagnosis("");

      // Notify parent to refresh list
      onRecordAdded();

      // Simulate sync after 2-3 seconds
      simulateSync(recordId, 2500).then(() => {
        onRecordAdded(); // Refresh to show updated status
      });
    } catch (error) {
      console.error("Error saving record:", error);
      alert("Failed to save medical record");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Medical Record</CardTitle>
        <CardDescription>Add a new patient medical record</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patientName">Patient Name</Label>
            <Input
              id="patientName"
              type="text"
              placeholder="Enter patient name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="0"
              max="150"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="diagnosis">Diagnosis</Label>
            <Textarea
              id="diagnosis"
              placeholder="Enter diagnosis details"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              rows={4}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Medical Record"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
