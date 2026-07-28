import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { address } = body || {};
    // In this app we don't have a user DB route for wallet; try to persist if needed later.
    // Return success so client can proceed; backend integration can update profile here.
    return NextResponse.json({ ok: true, address: address ?? null });
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
