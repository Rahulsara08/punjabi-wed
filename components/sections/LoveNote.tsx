'use client';

import { useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { wedding } from '@/content/wedding';
import { accentText } from '@/lib/accent';
import { useGuest } from '@/lib/guest';
import { FiveRivers } from '@/components/motifs/FiveRivers';

/**
 * §13 Final Love Note (Pyaar Naal): a quiet full-bleed ending over the five-rivers wash.
 * The note writes itself (masked reveal, ~3s). No buttons, no links. Nothing else moves.
 */
export default function LoveNote() {
  const reduce = !!useReducedMotion();
  const guest = useGuest();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const accent = accentText(wedding.labels.loveNote);
  const message = guest.name ? wedding.signOffMessage.replace(/See you at the wedding\.?$/, `See you at the wedding, ${guest.name}.`) : wedding.signOffMessage;

  const write = (dur: number, delay: number) =>
    reduce
      ? {}
      : {
          clipPath: 'inset(0 100% 0 0)',
          animation: inView ? `write-in ${dur}s cubic-bezier(0.3, 0, 0.7, 1) ${delay}s forwards` : 'none',
        };

  return (
    <section id="love-note" aria-label="A final note" className="relative flex min-h-[80svh] items-center justify-center overflow-hidden">
      {wedding.showRivers && <FiveRivers className="absolute inset-0 h-full w-full opacity-[0.14]" />}
      <div ref={ref} className="column relative text-center">
        {accent && (
          <p className="text-[14px] text-goldtext">
            <span lang={accent.lang}>{accent.text}</span> · {wedding.labels.loveNote.roman}
          </p>
        )}
        <p className="mt-6 font-script text-[30px] leading-snug text-maroon md:text-[40px]" style={write(2.4, 0)}>
          “{message}”
        </p>
        <p className="mt-6 font-script text-[26px] text-ink md:text-[30px]" style={write(1.2, 2.3)}>
          Pyaar naal, {wedding.couple.bride} & {wedding.couple.groom}
        </p>
      </div>
    </section>
  );
}
