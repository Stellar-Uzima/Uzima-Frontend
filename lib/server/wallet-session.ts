/**
 * The wallet connect/disconnect routes have no user-account/login system to
 * hang a wallet address off of (see middleware.ts's `admin_session` cookie
 * for the closest existing convention: a server-set cookie, no user table).
 * We follow the same pattern here with an anonymous, httpOnly session id
 * that keys a wallet record in `data/wallet/sessions.json`.
 */
export const WALLET_SESSION_COOKIE = 'wallet_session';

export const WALLET_SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  // 30 days - long enough to feel "persistent" without being forever.
  maxAge: 60 * 60 * 24 * 30,
};
