import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getWalletBySession, setWalletForSession } from '@/lib/server/data/wallets';
import { WALLET_SESSION_COOKIE, WALLET_SESSION_COOKIE_OPTIONS } from '@/lib/server/wallet-session';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { address } = body || {};

    if (!address || typeof address !== 'string') {
      return NextResponse.json({ ok: false, error: 'address is required' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const sessionId = cookieStore.get(WALLET_SESSION_COOKIE)?.value ?? randomUUID();

    const record = await setWalletForSession(sessionId, address);

    const response = NextResponse.json({ ok: true, address: record.address });
    response.cookies.set(WALLET_SESSION_COOKIE, sessionId, WALLET_SESSION_COOKIE_OPTIONS);
    return response;
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

/**
 * Returns the wallet address persisted for the current session, if any.
 * Used by `useWallet` on mount so a connection survives a localStorage
 * clear or loading the app in a fresh tab on the same session.
 */
export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(WALLET_SESSION_COOKIE)?.value;

    if (!sessionId) {
      return NextResponse.json({ ok: true, address: null });
    }

    const record = await getWalletBySession(sessionId);
    return NextResponse.json({ ok: true, address: record?.address ?? null });
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
