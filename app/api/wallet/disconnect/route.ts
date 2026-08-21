import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { clearWalletForSession } from '@/lib/server/data/wallets';
import { WALLET_SESSION_COOKIE } from '@/lib/server/wallet-session';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(WALLET_SESSION_COOKIE)?.value;

    if (sessionId) {
      await clearWalletForSession(sessionId);
    }

    const response = NextResponse.json({ ok: true });
    // Clear the cookie too, not just the server-side record, so a stale
    // session id can't be reused to look up a (now-deleted) wallet.
    response.cookies.set(WALLET_SESSION_COOKIE, '', { path: '/', maxAge: 0 });
    return response;
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
