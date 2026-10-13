'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import { wedding } from '@/content/wedding';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { VenueArt } from '@/components/motifs/VenueArt';
import { mapsDirectionsUrl, mapsSearchUrl } from '@/lib/format';

const stack: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 1.1 } } };
const item: Variants = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

/**
 * §10 Venue (Kithe): a segmented switch between venues, a line-art illustration that draws itself,
 * info chips, Get Directions (universal Google Maps URL → native app), an insider tip, and a
 * split-card "Kiven pahunchna" (How to reach). Followed by the Travel & Stay block.
 */
export default function Venue() {
  const reduce = !!useReducedMotion();
  const venues = wedding.venues.filter((v) => v.listed);
  const [activeId, setActiveId] = useState(venues[0]?.id);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const venue = venues.find((v) => v.id === activeId) ?? venues[0];
  const stay = wedding.travelStay;

  if (!venue && !stay) return null;

  return (
    <section id="venue" className="section">
      <SectionHeading accent={wedding.labels.venue} title="The Venue" />
      <div ref={ref} className="column">
        {venue && (
          <>
            {venues.length > 1 && (
              <div role="tablist" aria-label="Venues" className="mb-8 flex flex-wrap justify-center gap-2">
                {venues.map((v) => (
                  <button
                    key={v.id}
                    role="tab"
                    type="button"
                    aria-selected={v.id === venue.id}
                    data-active={v.id === venue.id}
                    className="chip"
                    onClick={() => {
                      setActiveId(v.id);
                      setOpen(false);
                    }}
                  >
                    {v.shortName}
                  </button>
                ))}
              </div>
            )}

            <motion.div key={venue.id} variants={stack} initial={reduce ? 'show' : 'hidden'} animate={inView ? 'show' : 'hidden'} className="text-center">
              <p className="eyebrow">The venue</p>
              <h3 className="mt-2 font-display text-[30px] font-medium leading-tight text-maroon">{venue.name}</h3>
              {venue.description && <p className="mx-auto mt-2 max-w-[42ch] text-[15px] leading-relaxed text-ink/80">{venue.description}</p>}

              <VenueArt artwork={venue.artwork} label={`Line drawing of ${venue.name}`} active={inView} className="mx-auto mt-6 w-full max-w-[380px]" />

              <motion.div variants={item} className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="chip">📍 {venue.address}</span>
                {venue.hours && <span className="chip">🕘 {venue.hours}</span>}
              </motion.div>

              <motion.div variants={item} className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <a className="btn-solid lift" href={mapsDirectionsUrl(venue.mapQuery)} target="_blank" rel="noopener noreferrer">
                  Get Directions
                </a>
                <a className="stitch-underline text-[14px] text-maroon" href={mapsSearchUrl(venue.mapQuery)} target="_blank" rel="noopener noreferrer">
                  View map
                </a>
              </motion.div>

              {venue.insiderTip && (
                <motion.p variants={item} className="mt-5 font-display text-[17px] italic text-ink/75">
                  “{venue.insiderTip}”
                </motion.p>
              )}

              {venue.travel && (venue.travel.air || venue.travel.train || venue.travel.road) && (
                <motion.div variants={item} className="paper mt-8 overflow-hidden text-left">
                  <button
                    type="button"
                    className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-3"
                    aria-expanded={open}
                    onClick={() => setOpen((o) => !o)}
                  >
                    <span className="font-display text-[21px] text-maroon">
                      Kiven pahunchna <span className="font-body text-[13px] text-ink/60">· How to reach</span>
                    </span>
                    <span aria-hidden="true" className={`text-gold transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
                      ▾
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0, y: -12 }}
                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -12 }}
                        transition={{ duration: reduce ? 0 : 0.45, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <dl className="grid gap-3 border-t border-dashed border-gold/70 px-5 py-4 text-[14px]">
                          {venue.travel.air && <Travel label="✈ By air" text={venue.travel.air} />}
                          {venue.travel.train && <Travel label="🚆 By train" text={venue.travel.train} />}
                          {venue.travel.road && <Travel label="🚗 By road" text={venue.travel.road} />}
                        </dl>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </motion.div>
          </>
        )}

        {stay && (
          <div className="mt-16 text-center">
            <p className="eyebrow">Rehna te safar · Travel & stay</p>
            <h3 className="mt-2 font-display text-[26px] font-medium leading-tight text-maroon">{stay.name}</h3>
            {stay.image ? (
              <img src={stay.image.src} alt={stay.image.alt} loading="lazy" className="mx-auto mt-4 w-full max-w-[380px]" />
            ) : (
              <VenueArt artwork="hotel" label={`Line drawing of ${stay.name}`} active={inView} className="mx-auto mt-4 w-full max-w-[300px]" />
            )}
            <p className="mx-auto mt-3 max-w-[48ch] text-[15px] leading-relaxed text-ink/80">{stay.message}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {stay.mapQuery && (
                <a className="btn-outline lift" href={mapsDirectionsUrl(stay.mapQuery)} target="_blank" rel="noopener noreferrer">
                  Directions to {stay.name.split(',')[0]}
                </a>
              )}
              {stay.phone && (
                <button type="button" className="stitch-underline text-[14px] text-maroon" onClick={() => (window.location.href = `tel:${stay.phone}`)}>
                  Call the front desk
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Travel({ label, text }: { label: string; text: string }) {
  return (
    <div className="grid grid-cols-[96px_1fr] gap-2">
      <dt className="text-goldtext">{label}</dt>
      <dd className="text-ink/85">{text}</dd>
    </div>
  );
}
