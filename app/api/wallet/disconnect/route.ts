import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // No-op: backend can clear persisted wallet association here if implemented.
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
