'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import { wedding } from '@/content/wedding';
import { accentText } from '@/lib/accent';
import { useGuest } from '@/lib/guest';

/**
 * §1 Invitation Card: a single centred card under a sheer chunni. The card is readable but dimmed;
 * "Open Invitation" lifts the veil (Chunni Chadana) and unlocks scrolling.
 * If the link carries no guest name, the card asks for it once; the greeting updates as they type
 * and the name then appears in the RSVP, blessings, thank-you and love note.
 */
export default function Invitation({ opened, onOpen }: { opened: boolean; onOpen: () => void }) {
  const reduce = !!useReducedMotion();
  const guest = useGuest();
  const [typed, setTyped] = useState('');
  const { invitation, couple, city, labels, ceremony } = wedding;
  const invocation = invitation.invocation[ceremony];
  const accent = accentText(labels.invitation);
  const greeting = guest.name ? `Dear ${guest.name},` : 'Dearest Guest,';
  const saprivaar = guest.partySizeFromLink && guest.partySize > 1;
  const askName = guest.ready && !guest.nameFromLink;

  // A name typed on an earlier visit is remembered on the device; show it so it can be corrected.
  useEffect(() => {
    if (guest.ready && !guest.nameFromLink && guest.name) setTyped((t) => t || guest.name || '');
  }, [guest.ready, guest.nameFromLink, guest.name]);

  return (
    <section
      id="invitation"
      aria-label="Invitation"
      className={`relative flex min-h-[100svh] items-center justify-center px-5 py-8 ${opened ? '' : 'max-h-[100svh] overflow-y-auto'}`}
    >
      <div className="relative my-auto w-full max-w-[420px]">
        <div className="paper relative px-6 py-8 text-center sm:px-10 sm:py-10">
          {/* Invocation: once, small, static (PRD §4.4) */}
          <p lang={invocation.lang} className="text-[13px] text-goldtext">
            {invocation.text}
          </p>

          {accent && (
            <p lang={accent.lang} className="mt-5 text-[24px] leading-none text-maroon">
              {accent.text}
            </p>
          )}
          <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-ink/55">
            {labels.invitation.roman} · {labels.invitation.en}
          </p>

          <p className="mt-6 font-script text-[25px] leading-none text-ink" aria-live="polite">
            {greeting}
          </p>
          <p className="mx-auto mt-3 max-w-[30ch] text-[15px] leading-relaxed text-ink/85">
            {invitation.blessingLine[ceremony]}
            {saprivaar ? ', saprivaar' : ''}
          </p>

          <p className="mt-5 font-display text-[36px] leading-none text-maroon">
            {couple.bride} <span className="font-script text-[22px] text-goldtext">weds</span> {couple.groom}
          </p>
          <p className="mt-4 text-[15px] text-ink">
            {invitation.dateLine} · {city}
          </p>
          {saprivaar && <p className="mt-2 text-[13px] italic text-ink/65">You and your family are invited.</p>}

          {askName && (
            <label className="mx-auto mt-6 block max-w-[280px] text-left">
              <span className="eyebrow">Your name or family name</span>
              <input
                className="field mt-1 text-center"
                value={typed}
                onChange={(e) => {
                  setTyped(e.target.value);
                  guest.setName(e.target.value);
                }}
                placeholder="e.g. Gill Parivaar"
                autoComplete="name"
                maxLength={40}
                disabled={opened}
              />
            </label>
          )}

          <button
            type="button"
            onClick={onOpen}
            disabled={opened}
            className={`btn-outline mt-7 ${opened ? 'opacity-70' : 'breathe'}`}
          >
            {opened ? 'Scroll to begin ↓' : 'Open Invitation'}
          </button>
        </div>

        <AnimatePresence>{!opened && <Chunni reduce={reduce} />}</AnimatePresence>
      </div>
    </section>
  );
}

/** Sheer veil with a faint phulkari border at its hem. Lifts upward with a slight skew, like fabric. */
function Chunni({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-x-3 -top-5 bottom-0 overflow-hidden"
      initial={{ opacity: 1, y: 0 }}
      exit={
        reduce
          ? { opacity: 0, transition: { duration: 0.5 } }
          : { y: '-125%', skewY: -7, opacity: 0, transition: { duration: 1.1, ease: [0.5, 0, 0.2, 1] } }
      }
    >
      {/* Sheer wash only: the card stays readable, just dimmed */}
      <div className="absolute inset-0 bg-[rgba(252,249,243,0.45)]" />
      <svg className="absolute inset-x-0 bottom-0 h-4 w-full" aria-hidden="true">
        <defs>
          <pattern id="chunni-border" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M8 2 L14 8 L8 14 L2 8 Z" fill="none" stroke="var(--c-maroon)" strokeWidth="1" />
            <path d="M8 6 L10 8 L8 10 L6 8 Z" fill="var(--c-gold)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#chunni-border)" />
      </svg>
    </motion.div>
  );
}
