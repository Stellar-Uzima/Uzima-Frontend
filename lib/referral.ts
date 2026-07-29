/**
 * Referral helpers shared by the profile panels and the sign-up flow.
 *
 * Attribution is intentionally client-side for now: the backend owns code
 * issuance and reward disbursement, so this module only derives a stable code,
 * builds the shareable link, and keeps the captured `?ref=` value around long
 * enough for it to travel with the sign-up payload.
 */

export const REFERRAL_QUERY_PARAM = 'ref';
export const REFERRAL_STORAGE_KEY = 'uzima.referralCode';

const REFERRAL_CODE_PREFIX = 'UZ';
const REFERRAL_CODE_PATTERN = /^[A-Z0-9]{4,16}$/;

const DEFAULT_APP_ORIGIN =
  process.env.NEXT_PUBLIC_APP_URL ?? 'https://stellaruzima.app';

const DEFAULT_SHARE_MESSAGE =
  'Join me on Stellar Uzima and earn XLM rewards for looking after your health.';

/** Upper-cases and validates a raw code, returning null when it is unusable. */
export function normalizeReferralCode(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const code = raw.trim().toUpperCase();
  return REFERRAL_CODE_PATTERN.test(code) ? code : null;
}

/**
 * Derives a stable code from an account identifier (id, wallet or email) so a
 * user always shares the same link, even before the backend stores one.
 * FNV-1a keeps it short, dependency free and deterministic across renders.
 */
export function generateReferralCode(seed: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  const body = hash.toString(36).toUpperCase().padStart(6, '0').slice(-6);
  return `${REFERRAL_CODE_PREFIX}${body}`;
}

/** Absolute sign-up link carrying the referral code. */
export function buildReferralLink(code: string, origin?: string): string {
  const base =
    origin ?? (typeof window !== 'undefined' ? window.location.origin : DEFAULT_APP_ORIGIN);
  return `${base.replace(/\/$/, '')}/signup?${REFERRAL_QUERY_PARAM}=${encodeURIComponent(code)}`;
}

export interface ReferralShareTargets {
  whatsapp: string;
  telegram: string;
}

/** Deep links that open the native share sheet of each app with the link pre-filled. */
export function buildShareTargets(
  link: string,
  message: string = DEFAULT_SHARE_MESSAGE,
): ReferralShareTargets {
  return {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${message} ${link}`)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(message)}`,
  };
}

export function getShareMessage(): string {
  return DEFAULT_SHARE_MESSAGE;
}

/** Persists attribution so it survives navigation between landing and sign-up. */
export function storeReferralCode(code: string): void {
  const normalized = normalizeReferralCode(code);
  if (!normalized || typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(REFERRAL_STORAGE_KEY, normalized);
  } catch {
    // Storage can be unavailable (private mode / blocked cookies) — attribution
    // then only lives for the current page, which is an acceptable fallback.
  }
}

export function readStoredReferralCode(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return normalizeReferralCode(window.localStorage.getItem(REFERRAL_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function clearStoredReferralCode(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(REFERRAL_STORAGE_KEY);
  } catch {
    // Nothing to clean up when storage is unavailable.
  }
}
