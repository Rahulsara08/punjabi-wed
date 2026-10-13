'use client';

import { Fragment, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { wedding } from '@/content/wedding';
import { accentText } from '@/lib/accent';
import { formatTime, istDateKey } from '@/lib/format';
import { BaghStar } from '@/components/motifs/BaghStar';

/** Recomputed from Date.now() every second (never decremented), so there is no drift after the tab sleeps. */
function useNow() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const i = setInterval(tick, 1000);
    document.addEventListener('visibilitychange', tick);
    return () => {
      clearInterval(i);
      document.removeEventListener('visibilitychange', tick);
    };
  }, []);
  return now;
}

/**
 * §3 Countdown: a framed sampler card. Digits roll vertically like an odometer; a gold glint runs
 * along the stitch border every 6s. Skeleton until hydrated, so server and client never disagree.
 */
export default function Countdown() {
  const reduce = !!useReducedMotion();
  const now = useNow();
  const target = new Date(wedding.mainCeremonyDateTime).getTime();
  const accent = accentText(wedding.labels.countdown);

  let state: 'loading' | 'before' | 'today' | 'after' = 'loading';
  if (now !== null) {
    if (istDateKey(new Date(now)) === istDateKey(new Date(target))) state = 'today';
    else if (now > target) state = 'after';
    else state = 'before';
  }
  const diff = now !== null ? Math.max(0, target - now) : 0;
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor(diff / 3_600_000) % 24;
  const mins = Math.floor(diff / 60_000) % 60;
  const secs = Math.floor(diff / 1000) % 60;

  const corners = ['left-[1px] top-[1px]', 'right-[1px] top-[1px]', 'bottom-[1px] left-[1px]', 'bottom-[1px] right-[1px]'];

  return (
    <section id="countdown" className="section">
      <div className="column">
        <motion.div
          className="paper relative px-4 py-9 sm:px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduce ? 0 : 0.9, ease: 'easeOut' }}
        >
          {/* Stitch border, glint path and corner bagh stars */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-3 border border-dashed border-gold/80" />
          <svg aria-hidden="true" className="pointer-events-none absolute inset-3 h-[calc(100%-24px)] w-[calc(100%-24px)] overflow-visible">
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              pathLength={1}
              fill="none"
              stroke="var(--c-gold)"
              strokeWidth="2"
              strokeDasharray="0.06 0.94"
              strokeLinecap="round"
              className="glint"
              style={{ opacity: 0 }}
            />
          </svg>
          {corners.map((pos) => (
            <BaghStar key={pos} size={22} className={`absolute ${pos} bg-malmal text-gold`} />
          ))}

          <header className="text-center">
            {accent && (
              <p className="text-[14px] text-goldtext">
                <span lang={accent.lang}>{accent.text}</span> · {wedding.labels.countdown.roman}
              </p>
            )}
            <h2 className="mt-1 font-display text-[30px] font-medium text-maroon">
              {state === 'today' ? 'Ajj Viah Hai!' : state === 'after' ? 'Viah ho gaya' : 'Counting the days'}
            </h2>
          </header>

          {state === 'loading' && (
            <div className="mt-6 flex justify-center gap-4" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="soft-pulse h-14 w-14 rounded bg-sarson sm:w-[76px]" />
              ))}
            </div>
          )}

          {state === 'before' && <Cells days={days} hours={hours} mins={mins} secs={secs} reduce={reduce} />}

          {state === 'today' && (
            <p className="mt-4 text-center text-[16px] text-ink/85">
              Today is the wedding! The ceremony begins at {formatTime(wedding.mainCeremonyDateTime)}.
            </p>
          )}

          {state === 'after' && (
            <p className="mt-4 text-center text-[16px] text-ink/85">
              Thank you for the blessings.{' '}
              <a href="#gallery" className="stitch-underline text-maroon">
                See the memories →
              </a>
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Cells({ days, hours, mins, secs, reduce }: { days: number; hours: number; mins: number; secs: number; reduce: boolean }) {
  const items = [
    { v: days, pa: 'Din', en: 'Days', d: days > 99 ? 3 : 2 },
    { v: hours, pa: 'Ghante', en: 'Hours', d: 2 },
    { v: mins, pa: 'Minat', en: 'Minutes', d: 2 },
    { v: secs, pa: 'Second', en: 'Seconds', d: 2 },
  ];
  return (
    <div
      className="mt-6 flex items-start justify-center"
      role="timer"
      aria-label={`${days} days, ${hours} hours, ${mins} minutes to the wedding`}
    >
      {items.map((it, i) => (
        <Fragment key={it.en}>
          {i > 0 && (
            <span aria-hidden="true" className="mx-1 mt-4 text-[11px] text-gold sm:mx-3">
              ✕
            </span>
          )}
          <div className="min-w-[52px] text-center sm:min-w-[80px]">
            <Rolling value={it.v} digits={it.d} reduce={reduce} />
            <p className="mt-1 font-display text-[17px] text-maroon">{it.pa}</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-ink/55">{it.en}</p>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

/** Odometer-style digits: the new digit rises in from below as the old one leaves above. */
function Rolling({ value, digits, reduce }: { value: number; digits: number; reduce: boolean }) {
  const str = value.toString().padStart(digits, '0');
  return (
    <div className="flex justify-center font-display text-[clamp(28px,9.5vw,48px)] font-medium leading-none tabular-nums text-maroon" aria-hidden="true">
      {str.split('').map((d, i) => (
        <Digit key={`${str.length}-${i}`} d={d} reduce={reduce} />
      ))}
    </div>
  );
}

function Digit({ d, reduce }: { d: string; reduce: boolean }) {
  return (
    <span className="relative inline-block h-[1em] w-[0.6em] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.span
          key={d}
          className="absolute inset-0 flex items-center justify-center"
          initial={reduce ? { opacity: 0 } : { y: '100%' }}
          animate={reduce ? { opacity: 1 } : { y: '0%' }}
          exit={reduce ? { opacity: 0 } : { y: '-100%' }}
          transition={{ duration: reduce ? 0.2 : 0.45, ease: [0.4, 0, 0.2, 1] }}
        >
          {d}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
