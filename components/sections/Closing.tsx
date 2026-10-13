'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { eventsForCeremony, mainCeremonyEvent, wedding } from '@/content/wedding';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useGuest, slugify } from '@/lib/guest';
import { buildIcs, downloadIcs, googleCalendarUrl } from '@/lib/ics';
import { coupleNames, formatLongDate, formatTime } from '@/lib/format';

/**
 * §12 Closing (Dhanvaad): thank-you with the wedding details, the couple and the guest's name,
 * Add to Calendar (.ics + Google), Leave an Asees, Replay Invitation. A few marigold petals drift down.
 */
export default function Closing({ onReplay }: { onReplay: () => void }) {
  const reduce = !!useReducedMotion();
  const guest = useGuest();
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const names = coupleNames(wedding.couple.bride, wedding.couple.groom);
  const publicEvents = eventsForCeremony()
    .flatMap((d) => d.events)
    .filter((e) => !e.private);
  const main = mainCeremonyEvent();

  useEffect(() => {
    if (!menu) return;
    const onDoc = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenu(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, [menu]);

  const siteUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : undefined;
  const saveMain = () => main && downloadIcs(`${slugify(names)}-wedding.ics`, buildIcs([main], { coupleNames: names, siteUrl }));
  const saveAll = () => downloadIcs(`${slugify(names)}-all-events.ics`, buildIcs(publicEvents, { coupleNames: names, siteUrl }));
  const petals = [
    { left: '8%', dur: 11, delay: 0 },
    { left: '26%', dur: 14, delay: 3 },
    { left: '47%', dur: 12, delay: 6 },
    { left: '68%', dur: 13, delay: 1.5 },
    { left: '88%', dur: 15, delay: 4.5 },
  ];

  return (
    <section id="closing" className="section relative overflow-hidden">
      {/* marigold petals, low count, CSS transforms only */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {petals.map((p, i) => (
          <svg
            key={i}
            className="petal absolute top-0 h-5 w-4 text-gold"
            style={{ left: p.left, ['--dur' as string]: `${p.dur}s`, ['--delay' as string]: `${p.delay}s`, opacity: reduce ? 0.5 : undefined, top: reduce ? `${15 + i * 15}%` : undefined }}
            viewBox="0 0 12 16"
          >
            <path d="M6 0 C10 3 10 10 6 16 C2 10 2 3 6 0 Z" fill="currentColor" opacity="0.75" />
            <path d="M6 2 V14" stroke="var(--c-maroon)" strokeWidth="0.6" opacity="0.5" />
          </svg>
        ))}
      </div>

      <SectionHeading accent={wedding.labels.closing} title="Thank You" />
      <div className="column relative text-center">
        <p className="font-script text-[26px] leading-none text-ink">{guest.name ? `Dear ${guest.name},` : 'Dear Guest,'}</p>
        <p className="mx-auto mt-4 max-w-[40ch] text-[17px] leading-relaxed text-ink/85">{wedding.closingMessage}</p>
        <p className="mt-4 font-display text-[24px] text-maroon">— {names}</p>

        <div className="mx-auto mt-8 max-w-[360px] border-y border-dashed border-gold/70 py-4 text-[15px] text-ink/85">
          <p className="eyebrow">Save the date</p>
          <p className="mt-1 font-display text-[22px] text-maroon">{formatLongDate(wedding.mainCeremonyDateTime)}</p>
          <p>
            {main ? `${main.name} at ${formatTime(main.startTime)}` : formatTime(wedding.mainCeremonyDateTime)} · {wedding.city}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <div ref={menuRef} className="relative">
            <button type="button" className="btn-solid lift" aria-haspopup="menu" aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
              Add to Calendar
            </button>
            {menu && (
              <div role="menu" className="paper absolute left-1/2 top-full z-20 mt-2 w-[240px] -translate-x-1/2 py-1 text-left">
                {main && (
                  <button role="menuitem" type="button" className="block w-full px-4 py-3 text-[14px] hover:bg-sarson/50" onClick={saveMain}>
                    Main ceremony (.ics)
                  </button>
                )}
                <button role="menuitem" type="button" className="block w-full px-4 py-3 text-[14px] hover:bg-sarson/50" onClick={saveAll}>
                  All events (.ics)
                </button>
                {main && (
                  <a role="menuitem" className="block w-full px-4 py-3 text-[14px] hover:bg-sarson/50" href={googleCalendarUrl(main, names)} target="_blank" rel="noopener noreferrer">
                    Google Calendar
                  </a>
                )}
              </div>
            )}
          </div>
          <button type="button" className="btn-outline lift" onClick={() => document.getElementById('blessings')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })}>
            Leave an Asees
          </button>
          <button type="button" className="btn-ghost lift" onClick={onReplay}>
            Replay Invitation
          </button>
        </div>
      </div>
    </section>
  );
}
