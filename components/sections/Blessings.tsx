'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { wedding } from '@/content/wedding';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useGuest } from '@/lib/guest';
import { getAdapter, newId, type Blessing } from '@/lib/data';
import { useMediaQuery } from '@/lib/motion';

const PAGE = 30;
const VISIBLE = 6;
const MAX = 250;
const RATE_KEY = 'phulkari:blessing-last';

function seedBlessings(): Blessing[] {
  return wedding.blessings.seed.map((s, i) => ({
    id: `seed-${i}`,
    name: s.name,
    place: s.place,
    message: s.message,
    colorVariant: i % 2 ? 'gulabi' : 'sarson',
    approved: true,
    createdAt: new Date(2026, 0, 1 + i).toISOString(),
  }));
}

/**
 * §9 Blessings Wall (Asees): two fields, the blessing and the guest's name (filled in from the
 * link or the invitation card). Blessings hang from gold threads like kaleere and sway very
 * slightly. Only the latest six hang on the wall, so the section stays the same height with 2 or
 * 200 blessings; "View all asees" opens the rest in a popup. A new blessing drops down on its
 * string and bounces once. Sway pauses off-screen.
 */
export default function Blessings() {
  const guest = useGuest();
  const reduce = !!useReducedMotion();
  const wide = useMediaQuery('(min-width: 640px)');
  const perRow = wide ? 3 : 2;

  const [list, setList] = useState<Blessing[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [msg, setMsg] = useState<{ kind: 'error' | 'ok'; text: string } | null>(null);
  const [sending, setSending] = useState(false);
  const [newIds, setNewIds] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [paused, setPaused] = useState(false);
  const wallRef = useRef<HTMLDivElement>(null);

  // The name follows the guest: from the link, or whatever they typed on the invitation / RSVP.
  useEffect(() => {
    if (guest.name) setName(guest.name);
  }, [guest.name]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let fetched: Blessing[] = [];
      try {
        fetched = await getAdapter().listBlessings(PAGE, 0);
      } catch {
        /* show seeds only */
      }
      if (cancelled) return;
      setList([...fetched, ...seedBlessings()]);
      setLoaded(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = wallRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (honeypot) return;
    const n = name.trim();
    const m = message.trim();
    if (!n) return setMsg({ kind: 'error', text: 'Please add your name.' });
    if (!m) return setMsg({ kind: 'error', text: 'Write a few words first.' });
    if (m.length > MAX) return setMsg({ kind: 'error', text: `Please keep it under ${MAX} characters.` });
    try {
      const last = Number(localStorage.getItem(RATE_KEY) ?? 0);
      if (Date.now() - last < 60_000) return setMsg({ kind: 'error', text: 'One asees a minute, please. Try again shortly.' });
    } catch {
      /* ignore */
    }
    setSending(true);
    const blessing: Blessing = {
      id: newId(),
      name: n.slice(0, 40),
      message: m,
      colorVariant: list.length % 2 ? 'gulabi' : 'sarson',
      approved: !wedding.blessings.requireApproval,
      createdAt: new Date().toISOString(),
    };
    try {
      await getAdapter().addBlessing(blessing);
    } catch {
      setSending(false);
      return setMsg({ kind: 'error', text: 'Could not send right now. Please try again in a moment.' });
    }
    try {
      localStorage.setItem(RATE_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
    setList((l) => [blessing, ...l]);
    setNewIds((ids) => [...ids, blessing.id]);
    setMessage('');
    setSending(false);
    setMsg({
      kind: 'ok',
      text: wedding.blessings.requireApproval
        ? 'Shukriya! Your asees will hang for everyone once the family approves it.'
        : 'Shukriya! Your asees is hanging on the wall.',
    });
  }

  const visible = list.slice(0, VISIBLE);
  const rows: Blessing[][] = [];
  for (let i = 0; i < visible.length; i += perRow) rows.push(visible.slice(i, i + perRow));

  return (
    <section id="blessings" className="section overflow-hidden">
      <SectionHeading accent={wedding.labels.blessings} title="Blessings Wall" />
      <div className="column">
        <form onSubmit={submit} className="mx-auto max-w-[460px]" noValidate>
          <p className="text-center font-script text-[26px] leading-none text-ink">
            {guest.name ? `Dear ${guest.name}, send your asees` : 'Dear Guest, send your asees'}
          </p>
          <p className="mt-1 text-center text-[13px] text-ink/60">
            A line of blessing for {wedding.couple.bride} & {wedding.couple.groom}
          </p>

          <label className="mt-6 block">
            <span className="eyebrow">Your blessing</span>
            <textarea
              className="field mt-1 resize-none"
              rows={2}
              placeholder="Apni asees likho… (Write your blessing)"
              value={message}
              maxLength={MAX + 20}
              onChange={(e) => setMessage(e.target.value)}
              aria-describedby="asees-count"
            />
          </label>
          <div className="mt-1 flex justify-end text-[12px] text-ink/50" id="asees-count" aria-live="polite">
            {message.trim().length}/{MAX}
          </div>

          <label className="mt-3 block">
            <span className="eyebrow">Your name</span>
            <input className="field mt-1" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} autoComplete="name" />
          </label>
          {/* honeypot: hidden from people, filled by bots */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />

          <div className="mt-5 flex flex-col items-center gap-2">
            <button type="submit" className="btn-solid lift" disabled={sending}>
              {sending ? 'Sending…' : 'Asees Bhejo · Send Blessing'}
            </button>
            {msg && (
              <p className={`text-center text-[13px] ${msg.kind === 'error' ? 'text-maroon' : 'text-goldtext'}`} role={msg.kind === 'error' ? 'alert' : 'status'}>
                {msg.text}
              </p>
            )}
          </div>
        </form>

        {/* The wall: a fixed number of hanging notes */}
        <div ref={wallRef} className={`mt-14 ${paused ? 'sway-paused' : ''}`}>
          {loaded && list.length === 0 && (
            <Row>
              <Note
                b={{ id: 'empty', name: `${wedding.couple.bride} & ${wedding.couple.groom}`, message: 'No asees yet. Be the first to bless us!', colorVariant: 'sarson', approved: true, createdAt: '' }}
                index={0}
                isNew={false}
                reduce={reduce}
              />
            </Row>
          )}
          {!loaded && (
            <Row>
              {[0, 1].map((i) => (
                <div key={i} className="soft-pulse mt-5 h-24 w-[40vw] max-w-[180px] bg-sarson/60" />
              ))}
            </Row>
          )}
          {rows.map((row, r) => (
            <Row key={r}>
              {row.map((b, i) => (
                <Note key={b.id} b={b} index={r * perRow + i} isNew={newIds.includes(b.id)} reduce={reduce} />
              ))}
            </Row>
          ))}
        </div>

        {list.length > VISIBLE && (
          <div className="mt-8 text-center">
            <button type="button" className="btn-outline lift" onClick={() => setShowAll(true)}>
              View all asees ({list.length})
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showAll && <AllBlessings initial={list} onClose={() => setShowAll(false)} reduce={reduce} onMore={(more) => setList((l) => [...l, ...more])} />}
      </AnimatePresence>
    </section>
  );
}

/** One gold thread with notes hanging below it. */
function Row({ children }: { children: React.ReactNode }) {
  return <div className="relative flex items-start justify-around border-t border-gold/70 px-2">{children}</div>;
}

function Note({ b, index, isNew, reduce }: { b: Blessing; index: number; isNew: boolean; reduce: boolean }) {
  const stringHeight = [18, 36, 26][index % 3];
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={isNew && !reduce ? { y: -80, opacity: 0 } : false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 170, damping: 9 }}
    >
      <span aria-hidden="true" className="w-px bg-gold/80" style={{ height: stringHeight }} />
      <blockquote
        className={`sway w-[40vw] max-w-[180px] px-3 py-3 text-center shadow-paper-sm sm:w-[180px] sm:px-4 sm:py-4 ${b.colorVariant === 'gulabi' ? 'bg-gulabi' : 'bg-sarson'}`}
        style={{ animationDelay: `${(index * 0.9) % 5}s`, animationDuration: `${5 + (index % 3)}s` }}
      >
        <p className="font-display text-[15px] italic leading-snug text-ink sm:text-[16px]">{b.message}</p>
        <footer className="mt-2 text-[12px] text-ink/65">
          — {b.name}
          {b.place ? `, ${b.place}` : ''}
          {!b.approved && <span className="block text-[11px] text-goldtext">visible to you until approved</span>}
        </footer>
      </blockquote>
    </motion.div>
  );
}

/** Popup with every blessing, loading more pages from the data adapter. */
function AllBlessings({ initial, onClose, onMore, reduce }: { initial: Blessing[]; onClose: () => void; onMore: (more: Blessing[]) => void; reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState(initial);
  const [offset, setOffset] = useState(PAGE);
  const [done, setDone] = useState(initial.length < PAGE);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>('button')?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prev?.focus();
    };
  }, [onClose]);

  async function loadMore() {
    setLoading(true);
    try {
      const more = await getAdapter().listBlessings(PAGE, offset);
      const seen = new Set(items.map((b) => b.id));
      const fresh = more.filter((b) => !seen.has(b.id));
      setItems((l) => [...l, ...fresh]);
      onMore(fresh);
      setOffset((o) => o + PAGE);
      if (more.length < PAGE) setDone(true);
    } catch {
      setDone(true);
    }
    setLoading(false);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.25 }}
      onClick={onClose}
    >
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="All blessings"
        className="paper flex max-h-[85vh] w-full max-w-[560px] flex-col rounded-t-2xl sm:rounded-none"
        initial={reduce ? {} : { y: 40 }}
        animate={{ y: 0 }}
        exit={reduce ? {} : { y: 40 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-dashed border-gold/70 px-5 py-4">
          <h3 className="font-display text-[24px] text-maroon">All asees · {items.length}</h3>
          <button type="button" className="h-11 w-11 rounded-full text-[24px] text-maroon" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>
        <ul className="flex-1 overflow-y-auto px-5 py-4">
          {items.map((b) => (
            <li key={b.id} className="border-b border-gold/30 py-3 last:border-0">
              <p className="font-display text-[17px] italic leading-snug text-ink">{b.message}</p>
              <p className="mt-1 text-[12px] text-ink/60">
                — {b.name}
                {b.place ? `, ${b.place}` : ''}
              </p>
            </li>
          ))}
        </ul>
        {!done && (
          <div className="border-t border-dashed border-gold/70 p-4 text-center">
            <button type="button" className="btn-outline" onClick={loadMore} disabled={loading}>
              {loading ? 'Loading…' : 'Show more asees'}
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
