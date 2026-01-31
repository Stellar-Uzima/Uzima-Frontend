import { NextResponse } from "next/server";

type MedicalRecord = {
  patientName: string;
  diagnosis: string;
  treatment: string;
  date: string;
  txHash: string;
  filePath?: string;
  createdBy: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidRecord(record: unknown): record is MedicalRecord {
  if (record === null || typeof record !== "object") return false;
  const r = record as Record<string, unknown>;
  return (
    isNonEmptyString(r.patientName) &&
    isNonEmptyString(r.diagnosis) &&
    isNonEmptyString(r.treatment) &&
    isNonEmptyString(r.date) &&
    isNonEmptyString(r.txHash) &&
    isNonEmptyString(r.createdBy) &&
    (r.filePath === undefined || typeof r.filePath === "string")
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: "Expected an array of records" },
        { status: 400 },
      );
    }

    const validRecords: MedicalRecord[] = body.filter(isValidRecord);
    const synced = validRecords.map((r) => r.txHash);

    return NextResponse.json({ synced });
  } catch (error) {
    return NextResponse.json(
      { error: `Invalid JSON payload: ${error}` },
      { status: 400 },
    );
  }
}

export function GET() {
  return NextResponse.json(
    { message: "Use POST with an array of records" },
    { status: 405 },
  );
}
