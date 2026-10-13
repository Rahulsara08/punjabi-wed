/**
 * Data layer for RSVPs and Blessings (PRD §9).
 *
 * Two adapters:
 *  - LocalAdapter: localStorage only. Zero setup; good for previews and for a wedding
 *    that collects RSVPs by phone.
 *  - SupabaseAdapter: REST calls to Supabase (tables + RLS in supabase/schema.sql).
 *    Enabled automatically when NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.
 */

export interface Rsvp {
  id: string;
  inviteCode: string | null;
  name: string;
  attending: boolean;
  guestCount: number;
  events: string[];
  foodPreference: string;
  needsStay: boolean;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export type BlessingColor = 'sarson' | 'gulabi';

export interface Blessing {
  id: string;
  name: string;
  place?: string;
  message: string;
  colorVariant: BlessingColor;
  approved: boolean;
  createdAt: string;
}

export interface DataAdapter {
  readonly kind: 'local' | 'supabase';
  upsertRsvp(rsvp: Rsvp): Promise<void>;
  addBlessing(blessing: Blessing): Promise<void>;
  listBlessings(limit: number, offset: number): Promise<Blessing[]>;
}

const RSVP_KEY = 'phulkari:rsvps';
const BLESSING_KEY = 'phulkari:blessings';

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage may be unavailable (private mode); fail silently */
  }
}

class LocalAdapter implements DataAdapter {
  readonly kind = 'local' as const;

  async upsertRsvp(rsvp: Rsvp) {
    const all = readJson<Rsvp[]>(RSVP_KEY, []);
    const key = rsvp.inviteCode ?? rsvp.id;
    const idx = all.findIndex((r) => (r.inviteCode ?? r.id) === key);
    if (idx >= 0) all[idx] = rsvp;
    else all.push(rsvp);
    writeJson(RSVP_KEY, all);
  }

  async addBlessing(blessing: Blessing) {
    const all = readJson<Blessing[]>(BLESSING_KEY, []);
    all.unshift(blessing);
    writeJson(BLESSING_KEY, all.slice(0, 200));
  }

  async listBlessings(limit: number, offset: number) {
    return readJson<Blessing[]>(BLESSING_KEY, []).slice(offset, offset + limit);
  }
}

class SupabaseAdapter implements DataAdapter {
  readonly kind = 'supabase' as const;
  constructor(
    private url: string,
    private key: string,
  ) {}

  private headers(extra: Record<string, string> = {}) {
    return {
      apikey: this.key,
      Authorization: `Bearer ${this.key}`,
      'Content-Type': 'application/json',
      ...extra,
    };
  }

  async upsertRsvp(rsvp: Rsvp) {
    const onConflict = rsvp.inviteCode ? 'invite_code' : 'id';
    const res = await fetch(`${this.url}/rest/v1/rsvps?on_conflict=${onConflict}`, {
      method: 'POST',
      headers: this.headers({ Prefer: 'resolution=merge-duplicates,return=minimal' }),
      body: JSON.stringify({
        id: rsvp.id,
        invite_code: rsvp.inviteCode,
        name: rsvp.name,
        attending: rsvp.attending,
        guest_count: rsvp.guestCount,
        events: rsvp.events,
        food_preference: rsvp.foodPreference,
        needs_stay: rsvp.needsStay,
        note: rsvp.note,
        created_at: rsvp.createdAt,
        updated_at: rsvp.updatedAt,
      }),
    });
    if (!res.ok) throw new Error(`RSVP failed: ${res.status}`);
  }

  async addBlessing(b: Blessing) {
    const res = await fetch(`${this.url}/rest/v1/blessings`, {
      method: 'POST',
      headers: this.headers({ Prefer: 'return=minimal' }),
      body: JSON.stringify({
        id: b.id,
        name: b.name,
        place: b.place ?? null,
        message: b.message,
        color_variant: b.colorVariant,
        approved: b.approved,
        created_at: b.createdAt,
      }),
    });
    if (!res.ok) throw new Error(`Blessing failed: ${res.status}`);
  }

  async listBlessings(limit: number, offset: number) {
    const res = await fetch(
      `${this.url}/rest/v1/blessings?approved=eq.true&order=created_at.desc&limit=${limit}&offset=${offset}`,
      { headers: this.headers() },
    );
    if (!res.ok) throw new Error(`Blessings failed: ${res.status}`);
    const rows = (await res.json()) as Array<Record<string, unknown>>;
    return rows.map((r) => ({
      id: String(r.id),
      name: String(r.name),
      place: r.place ? String(r.place) : undefined,
      message: String(r.message),
      colorVariant: (r.color_variant as BlessingColor) ?? 'sarson',
      approved: Boolean(r.approved),
      createdAt: String(r.created_at),
    }));
  }
}

let adapter: DataAdapter | null = null;

export function getAdapter(): DataAdapter {
  if (adapter) return adapter;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  adapter = url && key ? new SupabaseAdapter(url.replace(/\/$/, ''), key) : new LocalAdapter();
  return adapter;
}

/** Stable per-device id so a double tap or a retry never creates a second row. */
export function deviceId(key: string): string {
  const storageKey = `phulkari:${key}`;
  try {
    const existing = localStorage.getItem(storageKey);
    if (existing) return existing;
  } catch {
    /* ignore */
  }
  const id =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  try {
    localStorage.setItem(storageKey, id);
  } catch {
    /* ignore */
  }
  return id;
}

export function newId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/* ---------- Offline queue for RSVPs (PRD §7.8) ---------- */

const QUEUE_KEY = 'phulkari:rsvp-queue';

export function queueRsvp(rsvp: Rsvp) {
  const q = readJson<Rsvp[]>(QUEUE_KEY, []).filter((r) => r.id !== rsvp.id);
  q.push(rsvp);
  writeJson(QUEUE_KEY, q);
}

export async function flushRsvpQueue(): Promise<number> {
  const q = readJson<Rsvp[]>(QUEUE_KEY, []);
  if (!q.length) return 0;
  const remaining: Rsvp[] = [];
  for (const r of q) {
    try {
      await getAdapter().upsertRsvp(r);
    } catch {
      remaining.push(r);
    }
  }
  writeJson(QUEUE_KEY, remaining);
  return q.length - remaining.length;
}

export function hasQueuedRsvp(): boolean {
  return readJson<Rsvp[]>(QUEUE_KEY, []).length > 0;
}
