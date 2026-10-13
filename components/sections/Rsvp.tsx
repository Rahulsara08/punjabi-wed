'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { eventsForCeremony, wedding } from '@/content/wedding';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useGuest } from '@/lib/guest';
import { deviceId, flushRsvpQueue, getAdapter, hasQueuedRsvp, queueRsvp, type Rsvp } from '@/lib/data';
import { starPath } from '@/lib/paths';

type Face = 'front' | 'yes';
const LAST_KEY = 'phulkari:rsvp:last';
const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

/**
 * §8 RSVP: one card, two faces. The front greets the guest by name (pre-filled from the link or
 * the name typed on the invitation card) and has a single "Accept invitation" button. Accepting
 * flips the card to "Bas fir, milde aan!" with marigold petals, bagh stars and hearts. Details
 * (guests, events, food, stay, a note) are optional on the back. A guest who already accepted sees
 * that state, not the button. Idempotent (device UUID + invite code upsert), queued offline.
 */
export default function RsvpSection() {
  const guest = useGuest();
  const reduce = !!useReducedMotion();
  const rsvpEvents = useMemo(() => eventsForCeremony().flatMap((d) => d.events).filter((e) => e.rsvp && !e.private), []);
  const cap = guest.partySizeFromLink ? guest.partySize : wedding.rsvp.maxPartySize;

  const [face, setFace] = useState<Face>('front');
  const [name, setName] = useState('');
  const [count, setCount] = useState(1);
  const [events, setEvents] = useState<string[]>(() => rsvpEvents.map((e) => e.id));
  const [food, setFood] = useState(wedding.rsvp.foodOptions[0] ?? 'Veg');
  const [needsStay, setNeedsStay] = useState(false);
  const [note, setNote] = useState('');
  const [details, setDetails] = useState(false);
  const [sending, setSending] = useState(false);
  const [queued, setQueued] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedNote, setSavedNote] = useState<string | null>(null);
  const [burst, setBurst] = useState(0);
  const createdAt = useRef<string | null>(null);

  // The guest's name flows in from the link / invitation card; restore a previous answer from this device.
  useEffect(() => {
    if (!guest.ready) return;
    setCount(guest.partySizeFromLink ? guest.partySize : 1);
    try {
      const raw = localStorage.getItem(LAST_KEY);
      if (raw) {
        const last = JSON.parse(raw) as Rsvp;
        if (last.attending && (!guest.inviteCode || last.inviteCode === guest.inviteCode)) {
          setCount(Math.min(Math.max(last.guestCount || 1, 1), cap));
          if (last.events?.length) setEvents(last.events);
          if (last.foodPreference) setFood(last.foodPreference);
          setNeedsStay(!!last.needsStay);
          setNote(last.note ?? '');
          createdAt.current = last.createdAt;
          setFace('yes');
        }
      }
    } catch {
      /* ignore */
    }
  }, [guest.ready, guest.inviteCode, guest.partySize, guest.partySizeFromLink, cap]);

  useEffect(() => {
    if (guest.name) setName(guest.name);
  }, [guest.name]);

  // Retry anything queued while offline.
  useEffect(() => {
    if (hasQueuedRsvp()) setQueued(true);
    const onOnline = async () => {
      const n = await flushRsvpQueue();
      if (n > 0) setQueued(false);
    };
    window.addEventListener('online', onOnline);
    return () => window.removeEventListener('online', onOnline);
  }, []);

  async function send(opts: { celebrate: boolean }) {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please tell us your name first.');
      return;
    }
    if (sending) return;
    setError(null);
    setSending(true);
    guest.setName(trimmed);
    const now = new Date().toISOString();
    const rsvp: Rsvp = {
      id: deviceId('rsvp-id'),
      inviteCode: guest.inviteCode,
      name: trimmed,
      attending: true,
      guestCount: count,
      events,
      foodPreference: food,
      needsStay,
      note: note.trim(),
      createdAt: createdAt.current ?? now,
      updatedAt: now,
    };
    createdAt.current = rsvp.createdAt;
    try {
      localStorage.setItem(LAST_KEY, JSON.stringify(rsvp));
    } catch {
      /* ignore */
    }
    try {
      if (!navigator.onLine) throw new Error('offline');
      await getAdapter().upsertRsvp(rsvp);
      setQueued(false);
    } catch {
      queueRsvp(rsvp);
      setQueued(true);
    }
    setSending(false);
    setFace('yes');
    if (opts.celebrate && !reduce) {
      celebrate();
      setBurst((b) => b + 1);
    }
    if (!opts.celebrate) {
      setSavedNote('Details saved. Shukriya!');
      setTimeout(() => setSavedNote(null), 2500);
    }
  }

  const firstName = name.trim().split(' ')[0];
  const toggleEvent = (id: string) => setEvents((list) => (list.includes(id) ? list.filter((e) => e !== id) : [...list, id]));
  const faceStyle = { gridArea: '1 / 1', backfaceVisibility: 'hidden' as const };

  return (
    <section id="rsvp" className="section">
      <SectionHeading accent={wedding.labels.rsvp} title="RSVP" />
      <div className="column">
        <div style={{ perspective: 1400 }}>
          <motion.div
            className="grid"
            style={{ transformStyle: 'preserve-3d' }}
            animate={reduce ? {} : { rotateY: face === 'front' ? 0 : 180 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {/* FRONT */}
            <motion.div
              className="paper flex flex-col justify-center px-6 py-8 text-center sm:px-10"
              style={faceStyle}
              animate={reduce ? { opacity: face === 'front' ? 1 : 0 } : {}}
              inert={face !== 'front'}
              aria-hidden={face !== 'front'}
            >
              <p className="font-script text-[26px] leading-none text-ink">{guest.name ? `Dear ${guest.name},` : 'Dear Guest,'}</p>
              <h3 className="mt-3 font-display text-[32px] font-medium leading-tight text-maroon">Tusi aa rahe ho?</h3>
              <p className="text-[15px] text-ink/70">Will you join us?</p>

              <label className="mt-6 block text-left">
                <span className="eyebrow">Your name</span>
                <input
                  className="field mt-1"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    guest.setName(e.target.value);
                  }}
                  placeholder="Your name"
                  autoComplete="name"
                  maxLength={60}
                />
              </label>
              {error && (
                <p className="mt-2 text-left text-[13px] text-maroon" role="alert">
                  {error}
                </p>
              )}

              <button type="button" className="btn-solid lift mt-6 w-full" onClick={() => send({ celebrate: true })} disabled={sending}>
                {sending ? 'Sending…' : 'Haanji, zaroor! · Accept invitation'}
              </button>
            </motion.div>

            {/* BACK */}
            <motion.div
              className="paper flex flex-col justify-center px-6 py-8 text-center sm:px-10"
              style={{ ...faceStyle, rotateY: reduce ? 0 : 180 }}
              animate={reduce ? { opacity: face === 'front' ? 0 : 1 } : {}}
              inert={face === 'front'}
              aria-hidden={face === 'front'}
              aria-live="polite"
            >
              <div className="relative">
                {burst > 0 && <Hearts key={burst} />}
                <h3 className="font-display text-[32px] font-medium leading-tight text-maroon">Bas fir, milde aan!</h3>
                <p className="mt-1 text-[16px] text-ink/80">Then we’ll see you there{firstName ? `, ${firstName}` : ''}!</p>
              </div>
              <p className="mt-4 text-[13px] text-ink/60">
                Your acceptance is saved{queued ? ' on this phone; we’ll send it when you’re back online.' : '.'}
              </p>

              <button
                type="button"
                className="stitch-underline mx-auto mt-6 w-fit text-[14px] text-maroon"
                aria-expanded={details}
                onClick={() => setDetails((d) => !d)}
              >
                {details ? 'Hide details' : 'Add a few details (optional)'}
              </button>

              <AnimatePresence initial={false}>
                {details && (
                  <motion.div
                    className="overflow-hidden text-left"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
                  >
                    <div className="mt-5 grid gap-6 border-t border-dashed border-gold/70 pt-5">
                      <div>
                        <p className="eyebrow">Number of guests</p>
                        <div className="mt-2 flex items-center gap-4">
                          <button type="button" className="btn-outline h-11 w-11 !px-0" aria-label="Fewer guests" onClick={() => setCount((c) => Math.max(1, c - 1))}>
                            −
                          </button>
                          <span className="w-8 text-center font-display text-[26px] text-maroon" aria-live="polite">
                            {count}
                          </span>
                          <button type="button" className="btn-outline h-11 w-11 !px-0" aria-label="More guests" onClick={() => setCount((c) => Math.min(cap, c + 1))}>
                            +
                          </button>
                          <span className="text-[12px] text-ink/55">up to {cap}</span>
                        </div>
                      </div>

                      {rsvpEvents.length > 0 && (
                        <div>
                          <p className="eyebrow">Which events?</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {rsvpEvents.map((e) => (
                              <button key={e.id} type="button" className="chip" aria-pressed={events.includes(e.id)} onClick={() => toggleEvent(e.id)}>
                                {e.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <fieldset>
                        <legend className="eyebrow">Food preference</legend>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {wedding.rsvp.foodOptions.map((o) => (
                            <label key={o} className="chip cursor-pointer" data-active={food === o}>
                              <input type="radio" name="food" className="sr-only" checked={food === o} onChange={() => setFood(o)} />
                              {o}
                            </label>
                          ))}
                        </div>
                      </fieldset>

                      <label className="flex min-h-[44px] items-center justify-between gap-4">
                        <span className="text-[15px]">Need help with stay or travel?</span>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={needsStay}
                          onClick={() => setNeedsStay((s) => !s)}
                          className={`relative h-7 w-12 rounded-full border transition-colors ${needsStay ? 'border-maroon bg-maroon' : 'border-ink/30 bg-transparent'}`}
                        >
                          <span className={`absolute top-0.5 rounded-full transition-all ${needsStay ? 'left-6 bg-ivory' : 'left-0.5 bg-ink/40'}`} style={{ height: 22, width: 22 }} />
                        </button>
                      </label>

                      <label className="block">
                        <span className="eyebrow">A note for the couple (optional)</span>
                        <textarea className="field mt-1 resize-none" rows={2} maxLength={300} value={note} onChange={(e) => setNote(e.target.value)} />
                      </label>

                      <button type="button" className="btn-outline lift w-full" onClick={() => send({ celebrate: false })} disabled={sending}>
                        {sending ? 'Saving…' : 'Save details'}
                      </button>
                      {savedNote && (
                        <p className="text-center text-[13px] text-goldtext" role="status">
                          {savedNote}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Marigold petals, small bagh stars and hearts in the Phulkari palette. */
function celebrate() {
  const petal = confetti.shapeFromPath({ path: 'M0 5 C2 0 8 0 10 5 C8 10 2 10 0 5 Z' });
  const star = confetti.shapeFromPath({ path: starPath(5, 5, 5, 2.2, 8) });
  const heart = confetti.shapeFromPath({ path: 'M5 9 L1 5 A2.2 2.2 0 0 1 5 2.4 A2.2 2.2 0 0 1 9 5 Z' });
  const colors = ['#7A1F1F', '#C08A2E', '#F3E3B5', '#EFD9D3'];
  const base = { colors, ticks: 200, gravity: 0.9, scalar: 1.15, disableForReducedMotion: true };
  confetti({ ...base, particleCount: 70, spread: 75, startVelocity: 38, origin: { y: 0.6 }, shapes: [petal, star, heart] });
  setTimeout(() => confetti({ ...base, particleCount: 36, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, shapes: [petal, heart] }), 150);
  setTimeout(() => confetti({ ...base, particleCount: 36, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, shapes: [petal, star] }), 300);
}

/** A few hearts floating up from the message. */
function Hearts() {
  const hearts = [
    { x: -60, d: 0 },
    { x: -20, d: 0.25 },
    { x: 25, d: 0.1 },
    { x: 65, d: 0.4 },
    { x: 0, d: 0.55 },
  ];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
      {hearts.map((h, i) => (
        <motion.span
          key={i}
          className="absolute text-[18px] text-maroon"
          style={{ left: `calc(50% + ${h.x}px)` }}
          initial={{ y: 10, opacity: 0, scale: 0.6 }}
          animate={{ y: -110, opacity: [0, 1, 1, 0], scale: 1 }}
          transition={{ duration: 2.2, delay: h.d, ease: 'easeOut' }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}
