import {
  MedicalRecord,
  saveRecordOffline,
  syncRecords,
} from "@/src/services/SyncService";
import React, { useState, useEffect } from "react";
// import { saveRecordOffline, syncRecords, MedicalRecord } from '../services/syncService';
import { v4 as uuidv4 } from "uuid";

const RecordForm: React.FC = () => {
  const [record, setRecord] = useState<
    Omit<MedicalRecord, "txHash" | "createdBy">
  >({
    patientName: "",
    diagnosis: "",
    treatment: "",
    date: new Date().toISOString().split("T")[0],
    filePath: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullRecord: MedicalRecord = {
      ...record,
      txHash: uuidv4(),
      createdBy: "user_id_from_auth", // Replace this with actual user ID logic
    };

    await saveRecordOffline(fullRecord);
    alert("Record saved offline!");
    setRecord({
      patientName: "",
      diagnosis: "",
      treatment: "",
      date: new Date().toISOString().split("T")[0],
      filePath: "",
    });
  };

  useEffect(() => {
    const handleOnline = () => {
      syncRecords();
    };
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="record-form">
      <input
        type="text"
        name="patientName"
        placeholder="Patient Name"
        value={record.patientName}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={record.date}
        onChange={handleChange}
        required
      />
      <textarea
        name="diagnosis"
        placeholder="Diagnosis"
        value={record.diagnosis}
        onChange={handleChange}
        required
      />
      <textarea
        name="treatment"
        placeholder="Treatment"
        value={record.treatment}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="filePath"
        placeholder="File path (optional)"
        value={record.filePath}
        onChange={handleChange}
      />
      <button type="submit">Save Record</button>
    </form>
  );
};

export default RecordForm;
