'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { wedding } from '@/content/wedding';

/**
 * Personalised-link state read from the URL on the client (PRD §7.1, §7.6, §11).
 *   ?to=Gill+Parivaar   → "Dear Gill Parivaar,"
 *   ?n=2                → RSVP pre-fills / caps 2 guests
 *   ?inner=1            → private (family-only) events render
 *   ?ref=whatsapp       → share source, kept for analytics only
 *
 * When the link carries no name, the guest types it once on the invitation card; it is kept on the
 * device and flows into the greeting, RSVP, blessings, thank-you and love note.
 */
export interface Guest {
  name: string | null;
  /** True when the name came from the link (then the card does not ask for it). */
  nameFromLink: boolean;
  partySize: number;
  /** True when `n` came from the link, so the RSVP stepper is capped at it. */
  partySizeFromLink: boolean;
  inner: boolean;
  ref: string | null;
  /** Stable key for upserting the RSVP; derived from the name. */
  inviteCode: string | null;
  /** True once the URL has been read on the client. */
  ready: boolean;
  /** Set (or correct) the guest's name from any form; sanitised and remembered on this device. */
  setName: (name: string) => void;
}

type GuestState = Omit<Guest, 'inviteCode' | 'setName'>;

const NAME_KEY = 'phulkari:guest-name';

const defaultState: GuestState = {
  name: null,
  nameFromLink: false,
  partySize: wedding.rsvp.defaultPartySize,
  partySizeFromLink: false,
  inner: false,
  ref: null,
  ready: false,
};

const GuestContext = createContext<Guest>({ ...defaultState, inviteCode: null, setName: () => undefined });

/** Keep letters (any script), digits, spaces and a few punctuation marks; cap length. */
export function sanitiseName(raw: string | null): string | null {
  if (!raw) return null;
  const cleaned = raw
    .normalize('NFC')
    .replace(/[^\p{L}\p{M}\p{N} .'&\-]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 40);
  return cleaned.length ? cleaned : null;
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
}

export function GuestProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GuestState>(defaultState);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let name = sanitiseName(params.get('to'));
    const nameFromLink = !!name;
    if (!name) {
      try {
        name = sanitiseName(localStorage.getItem(NAME_KEY));
      } catch {
        /* ignore */
      }
    }
    const nRaw = parseInt(params.get('n') ?? '', 10);
    const fromLink = Number.isFinite(nRaw) && nRaw > 0;
    const partySize = fromLink ? Math.min(nRaw, wedding.rsvp.maxPartySize) : wedding.rsvp.defaultPartySize;
    setState({
      name,
      nameFromLink,
      partySize,
      partySizeFromLink: fromLink,
      inner: params.get('inner') === '1',
      ref: params.get('ref'),
      ready: true,
    });
  }, []);

  const setName = useCallback((raw: string) => {
    const name = sanitiseName(raw);
    setState((s) => (s.name === name ? s : { ...s, name }));
    try {
      if (name) localStorage.setItem(NAME_KEY, name);
      else localStorage.removeItem(NAME_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<Guest>(
    () => ({ ...state, inviteCode: state.name ? slugify(state.name) : null, setName }),
    [state, setName],
  );
  return <GuestContext.Provider value={value}>{children}</GuestContext.Provider>;
}

export function useGuest() {
  return useContext(GuestContext);
}
