
import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate database fetch
  return NextResponse.json({
    totalUsers: 1450,
    tasksToday: 320,
    xlmDistributed: 12500,
    activeStreaks: 45,
  });
}
