import { readCollection, withFileLock, writeCollection } from './store';

export interface WalletSession {
  /** Opaque id stored in the `wallet_session` cookie, not tied to any user account. */
  sessionId: string;
  address: string;
  connectedAt: string;
}

const FILE = 'wallet/sessions.json';

const SEED: WalletSession[] = [];

/** Look up the wallet address (if any) persisted for a given session id. */
export async function getWalletBySession(sessionId: string): Promise<WalletSession | null> {
  const sessions = await readCollection(FILE, SEED);
  return sessions.find((session) => session.sessionId === sessionId) ?? null;
}

/**
 * Persist (or replace) the wallet address associated with a session id.
 * Replacing rather than appending keeps at most one record per session.
 */
export async function setWalletForSession(
  sessionId: string,
  address: string
): Promise<WalletSession> {
  return withFileLock(FILE, async () => {
    const sessions = await readCollection(FILE, SEED);
    const record: WalletSession = {
      sessionId,
      address,
      connectedAt: new Date().toISOString(),
    };

    const existingIndex = sessions.findIndex((session) => session.sessionId === sessionId);
    if (existingIndex >= 0) {
      sessions[existingIndex] = record;
    } else {
      sessions.push(record);
    }

    await writeCollection(FILE, sessions);
    return record;
  });
}

/** Remove any persisted wallet record for a session id (a no-op if there isn't one). */
export async function clearWalletForSession(sessionId: string): Promise<void> {
  return withFileLock(FILE, async () => {
    const sessions = await readCollection(FILE, SEED);
    const filtered = sessions.filter((session) => session.sessionId !== sessionId);

    if (filtered.length !== sessions.length) {
      await writeCollection(FILE, filtered);
    }
  });
}
