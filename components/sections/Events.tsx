'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { eventsForCeremony, venueById, wedding } from '@/content/wedding';
import type { WeddingEvent } from '@/content/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RitualIcon } from '@/components/motifs/RitualIcon';
import { eventAccentName } from '@/lib/accent';
import { coupleNames, formatLongDate, formatTime, mapsDirectionsUrl } from '@/lib/format';
import { useGuest } from '@/lib/guest';
import { getGsap } from '@/lib/motion';
import { buildIcs, downloadIcs } from '@/lib/ics';
import { slugify } from '@/lib/guest';

type Pt = { x: number; y: number };
type Geo = { w: number; h: number; pts: Pt[] };

/**
 * §6 Events & Rituals: a central vertical timeline. One continuous stitch line is sewn in solid
 * maroon up to the scroll position (a clip-path bound to a scrubbed ScrollTrigger keeps the dashes
 * crisp), a tiny gold needle leads it, and each node pops when the needle reaches it.
 * The path is measured from the real node positions, so it stays pixel-aligned at every width.
 */
export default function Events() {
  const guest = useGuest();
  const reduce = !!useReducedMotion();

  // Private (family-only) events render only on ?inner=1 links and never in the static HTML.
  const days = useMemo(
    () =>
      eventsForCeremony()
        .map((d) => ({ ...d, events: d.events.filter((e) => !e.private || guest.inner) }))
        .filter((d) => d.events.length > 0),
    [guest.inner],
  );
  const allEvents = useMemo(() => days.flatMap((d) => d.events), [days]);

  const containerRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<SVGRectElement>(null);
  const needleRef = useRef<SVGGElement>(null);
  const geoRef = useRef<Geo | null>(null);
  const progressRef = useRef(0);
  const [geo, setGeo] = useState<Geo | null>(null);
  const [reached, setReached] = useState(0);

  const measure = useCallback(() => {
    const c = containerRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const pts = Array.from(c.querySelectorAll<HTMLElement>('[data-node]')).map((n) => {
      const r = n.getBoundingClientRect();
      return { x: Math.round(r.left - rect.left + r.width / 2), y: Math.round(r.top - rect.top + r.height / 2) };
    });
    setGeo({ w: c.clientWidth, h: c.scrollHeight, pts });
  }, []);

  const apply = useCallback((p: number) => {
    progressRef.current = p;
    const g = geoRef.current;
    if (!g || g.pts.length < 2) return;
    const y0 = g.pts[0].y;
    const y1 = g.pts[g.pts.length - 1].y;
    const y = y0 + (y1 - y0) * p;
    clipRef.current?.setAttribute('height', String(Math.max(0, y)));
    let x = g.pts[0].x;
    for (let i = 1; i < g.pts.length; i++) {
      const a = g.pts[i - 1];
      const b = g.pts[i];
      if (y <= b.y) {
        const t = b.y === a.y ? 1 : (y - a.y) / (b.y - a.y);
        x = a.x + (b.x - a.x) * t;
        break;
      }
      x = b.x;
    }
    needleRef.current?.setAttribute('transform', `translate(${x} ${y})`);
    const count = g.pts.filter((pt) => pt.y <= y + 2).length;
    setReached((prev) => (prev === count ? prev : count));
  }, []);

  useEffect(() => {
    geoRef.current = geo;
    apply(progressRef.current);
  }, [geo, apply]);

  // Re-measure on resize, orientation change, font load, and whenever the container grows
  // (an "About this rasam" toggle shifts every node below it).
  useEffect(() => {
    measure();
    const c = containerRef.current;
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => measure()) : null;
    if (c && ro) ro.observe(c);
    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', measure);
    window.addEventListener('load', measure);
    document.fonts?.ready.then(() => measure()).catch(() => undefined);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('orientationchange', measure);
      window.removeEventListener('load', measure);
    };
  }, [measure, days]);

  useEffect(() => {
    if (!geo || geo.pts.length < 2) return;
    if (reduce) {
      apply(1);
      return;
    }
    const { gsap } = getGsap();
    const proxy = { p: 0 };
    const tween = gsap.to(proxy, {
      p: 1,
      ease: 'none',
      onUpdate: () => apply(proxy.p),
      scrollTrigger: { trigger: containerRef.current, start: 'top 62%', end: 'bottom 62%', scrub: 0.6 },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [geo, reduce, apply]);

  if (!allEvents.length) return null;

  const pathD = geo && geo.pts.length > 1 ? geo.pts.map((p, i) => `${i ? 'L' : 'M'}${p.x} ${p.y}`).join(' ') : '';
  const names = coupleNames(wedding.couple.bride, wedding.couple.groom);
  const saveAll = () =>
    downloadIcs(
      `${slugify(names)}-events.ics`,
      buildIcs(
        allEvents.filter((e) => !e.private),
        { coupleNames: names, siteUrl: window.location.origin + window.location.pathname },
      ),
    );

  let nodeIndex = -1;

  return (
    <section id="events" className="section">
      <SectionHeading
        accent={wedding.labels.events}
        title="Events & Rituals"
        intro={
          guest.name
            ? `${guest.name}, here is everything from the Mehndi to the Doli, with a line on what happens at each.`
            : 'Everything from the Mehndi to the Doli, with a line on what happens at each.'
        }
      />

      <div ref={containerRef} className="relative mx-auto max-w-[960px] px-4">
        {pathD && geo && (
          <svg className="pointer-events-none absolute left-0 top-0" width={geo.w} height={geo.h} aria-hidden="true">
            <defs>
              <clipPath id="stitch-clip">
                <rect ref={clipRef} x="0" y="0" width={geo.w} height="0" />
              </clipPath>
            </defs>
            {/* faint dotted guide ahead of the needle */}
            <path d={pathD} fill="none" stroke="var(--c-maroon)" strokeOpacity="0.28" strokeWidth="1" strokeDasharray="2 5" strokeLinecap="round" />
            {/* sewn stitch, revealed by the clip so the dash pattern never distorts */}
            <path d={pathD} fill="none" stroke="var(--c-maroon)" strokeWidth="1.5" strokeDasharray="6 4" strokeLinecap="round" clipPath="url(#stitch-clip)" />
            {/* the needle */}
            <g ref={needleRef} transform={`translate(${geo.pts[0].x} ${geo.pts[0].y})`}>
              <line x1="0" y1="-16" x2="0" y2="6" stroke="var(--c-gold)" strokeWidth="1.5" strokeLinecap="round" />
              <ellipse cx="0" cy="-11" rx="1.7" ry="3.2" fill="var(--c-bg)" stroke="var(--c-gold)" strokeWidth="1" />
            </g>
          </svg>
        )}

        <div className="relative">
          {days.map((day) => (
            <div key={day.dateLabel} className="pt-8">
              <p className="eyebrow pl-[68px] md:pl-0 md:text-center">
                <span className="inline-block bg-ivory px-2 py-1">{day.dateLabel}</span>
              </p>
              {day.events.map((ev) => {
                nodeIndex += 1;
                const idx = nodeIndex;
                return <EventNode key={ev.id} ev={ev} left={idx % 2 === 0} reached={idx < reached} reduce={reduce} />;
              })}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button type="button" onClick={saveAll} className="btn-outline lift">
            Save all events to calendar
          </button>
          <p className="mt-2 text-[12px] text-ink/55">One .ics file with every event, in Indian Standard Time.</p>
        </div>
      </div>

      <Glossary />
    </section>
  );
}

function EventNode({ ev, left, reached, reduce }: { ev: WeddingEvent; left: boolean; reached: boolean; reduce: boolean }) {
  const [open, setOpen] = useState(false);
  const venue = venueById(ev.venueId);
  const accent = eventAccentName(ev);
  const alignEnd = left ? 'md:justify-end' : '';

  return (
    <article className="grid grid-cols-[56px_1fr] gap-x-3 py-7 md:grid-cols-[1fr_72px_1fr] md:gap-x-8" aria-labelledby={`ev-${ev.id}`}>
      <div className="flex justify-center md:col-start-2 md:row-start-1">
        <motion.div
          data-node
          className={`flex h-11 w-11 items-center justify-center rounded-full border bg-ivory text-maroon transition-colors duration-500 ${
            reached ? 'border-maroon' : 'border-maroon/30'
          }`}
          animate={reached && !reduce ? { scale: [0.8, 1.05, 1] } : { scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <RitualIcon name={ev.icon} className="h-6 w-6" />
        </motion.div>
      </div>

      <div className={`md:row-start-1 ${left ? 'md:col-start-1 md:text-right' : 'md:col-start-3'}`}>
        <h3 id={`ev-${ev.id}`} className="font-display text-[26px] font-medium leading-tight text-maroon">
          {ev.name}
          {accent && (
            <span lang={accent.lang} className="ml-2 align-middle text-[15px] font-normal text-goldtext">
              {accent.text}
            </span>
          )}
        </h3>
        <p className="mt-1 text-[15px] leading-relaxed text-ink/85">{ev.whatHappens}</p>

        <div className={`mt-3 flex flex-wrap gap-2 ${alignEnd}`}>
          <span className="chip">🗓 {formatLongDate(ev.startTime)}</span>
          <span className="chip">
            🕘 {formatTime(ev.startTime)}
            {ev.endTime ? ` – ${formatTime(ev.endTime)}` : ''}
          </span>
        </div>
        {venue && (
          <div className={`mt-2 flex flex-wrap items-center gap-2 text-[14px] text-ink/80 ${alignEnd}`}>
            <span>
              📍 {venue.name}
              {venue.address ? `, ${venue.address}` : ''}
            </span>
            <a
              className="stitch-underline text-maroon"
              href={mapsDirectionsUrl(venue.mapQuery)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View location of ${venue.name} in Maps`}
            >
              View location →
            </a>
          </div>
        )}

        {ev.dressCode && (
          <div className={`mt-3 flex items-center gap-2 text-[13px] text-ink/75 ${alignEnd}`}>
            <span className="flex gap-1" aria-hidden="true">
              {ev.dressCode.colors.map((c, i) => (
                <span
                  key={i}
                  className="h-3 w-3 rounded-full border transition-colors duration-500"
                  style={{ borderColor: c, backgroundColor: reached ? c : 'transparent' }}
                />
              ))}
            </span>
            <span>Dress code: {ev.dressCode.note}</span>
          </div>
        )}
        {ev.private && <p className="mt-2 text-[12px] italic text-goldtext">Family only</p>}

        {ev.about && (
          <>
            <button
              type="button"
              className="stitch-underline mt-3 text-[13px] text-maroon"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              ⓘ About this rasam
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.35 }}
                >
                  <p className="pt-2 text-[14px] leading-relaxed text-ink/75">{ev.about}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </article>
  );
}

function Glossary() {
  if (!wedding.glossary.length) return null;
  return (
    <details className="column mt-14">
      <summary className="stitch-underline mx-auto block w-fit cursor-pointer list-none text-center text-[14px] text-maroon">
        Ritual glossary: every rasam in one line
      </summary>
      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        {wedding.glossary.map((g) => (
          <div key={g.rasam}>
            <dt className="font-display text-[18px] text-maroon">
              {g.rasam} <span className="ml-1 text-[12px] text-goldtext">{g.when}</span>
            </dt>
            <dd className="text-[14px] leading-relaxed text-ink/75">{g.meaning}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
