import { NextResponse } from 'next/server';
import { MedicalRecord } from '../../../../types/medical-record';

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidRecord(record: unknown): record is MedicalRecord {
  if (record === null || typeof record !== 'object') return false;
  const r = record as Record<string, unknown>;
  return (
    isNonEmptyString(r.id) &&
    isNonEmptyString(r.patientName) &&
    isNonEmptyString(r.diagnosis) &&
    isNonEmptyString(r.treatment) &&
    isNonEmptyString(r.date) &&
    isNonEmptyString(r.createdBy) &&
    (r.filePath === undefined || typeof r.filePath === 'string')
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!Array.isArray(body)) {
      return NextResponse.json({ error: 'Expected an array of records' }, { status: 400 });
    }

    const validRecords: MedicalRecord[] = body.filter(isValidRecord);

    // In a real application, you would save the records to a database here.
    // For this example, we'll just simulate a successful sync.
    const synced = validRecords.map((r) => r.id);

    return NextResponse.json({ synced });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }
}

export function GET() {
  return NextResponse.json({ message: 'Use POST with an array of records' }, { status: 405 });
}
