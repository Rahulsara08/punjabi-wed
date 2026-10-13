'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { VenueArtwork } from '@/content/types';

/**
 * Line-art venue illustrations that draw themselves stroke by stroke (solid lines, not stitches,
 * so they read differently from the Events timeline — PRD §7.10). Inline SVG, < 4KB each.
 */
const ART: Record<VenueArtwork | 'hotel', string[]> = {
  farmhouse: [
    'M10 160H310',
    'M90 160V105H200V160',
    'M80 108L145 62L210 108',
    'M135 160V128H155V160',
    'M105 120h20v16h-20z',
    'M180 82V64h10v26',
    'M255 160V125',
    'M235 128c-6-18 6-34 20-34s26 16 20 34c-8 8-32 8-40 0z',
    'M20 160V148M34 160V146M48 160V150M62 160V147M76 160V151',
    'M17 146a3 3 0 1 0 6 0a3 3 0 1 0-6 0M31 144a3 3 0 1 0 6 0a3 3 0 1 0-6 0M59 145a3 3 0 1 0 6 0a3 3 0 1 0-6 0',
    'M222 160V140M246 160V140M222 146H246M222 154H246',
    'M254 60a16 16 0 1 0 32 0a16 16 0 1 0-32 0',
    'M40 60q5-6 10 0M52 52q5-6 10 0',
  ],
  gurdwara: [
    'M10 170H310',
    'M70 170V110H250V170',
    'M95 170V140a14 14 0 0 1 28 0V170',
    'M146 170V135a14 14 0 0 1 28 0V170',
    'M197 170V140a14 14 0 0 1 28 0V170',
    'M78 110V100H242V110',
    'M135 100V80H185V100',
    'M128 80c0-28 20-42 32-50c12 8 32 22 32 50z',
    'M160 30V20M156 22h8',
    'M85 100c0-12 8-18 12-22c4 4 12 10 12 22z',
    'M211 100c0-12 8-18 12-22c4 4 12 10 12 22z',
    'M280 170V40',
    'M280 42L302 52L280 62',
    'M60 178H260',
  ],
  ballroom: [
    'M10 175H310',
    'M40 175V95a35 35 0 0 1 70 0V175',
    'M125 175V85a35 35 0 0 1 70 0V175',
    'M210 175V95a35 35 0 0 1 70 0V175',
    'M160 20V45',
    'M135 55H185',
    'M135 55c5 12 45 12 50 0',
    'M145 61v8M160 62v10M175 61v8',
    'M40 95c8 20 8 50 0 80',
    'M110 95c-8 20-8 50 0 80',
    'M70 175v-14M58 161h24',
    'M250 175v-14M238 161h24',
  ],
  mandap: [
    'M10 170H310',
    'M80 170V70',
    'M240 170V70',
    'M70 70Q160 40 250 70',
    'M100 62l3 9M130 56l3 9M160 54l3 9M190 56l3 9M220 62l3 9',
    'M80 70q40 30 80 0q40 30 80 0',
    'M135 170V150H185V170',
    'M160 150c-10-12-8-22 0-30c8 8 10 18 0 30',
    'M160 140c-4-5-4-10 0-14c4 4 4 9 0 14',
    'M50 170v-12h16v12',
    'M254 170v-12h16v12',
  ],
  home: [
    'M10 160H310',
    'M100 160V100H220V160',
    'M90 102L160 56L230 102',
    'M150 160V128H170V160',
    'M115 115h20v16h-20z',
    'M185 115h20v16h-20z',
    'M265 160V128',
    'M250 130c-4-14 8-26 15-26s19 12 15 26c-6 6-24 6-30 0z',
    'M140 172c0 3 40 3 40 0',
  ],
  hotel: [
    'M10 170H310',
    'M80 170V50H240V170',
    'M100 70h20v16h-20zM150 70h20v16h-20zM200 70h20v16h-20z',
    'M100 100h20v16h-20zM150 100h20v16h-20zM200 100h20v16h-20z',
    'M100 130h20v16h-20zM200 130h20v16h-20z',
    'M148 170V135H172V170',
    'M135 135H185',
    'M135 135c0-8 50-8 50 0',
    'M130 50V36H190V50',
    'M140 43h40',
    'M250 170V150M270 170V150M250 150H270',
    'M60 170V155a10 10 0 0 1 20 0V170',
  ],
};

export function VenueArt({
  artwork,
  label,
  active = true,
  className = '',
}: {
  artwork: VenueArtwork | 'hotel';
  label: string;
  active?: boolean;
  className?: string;
}) {
  const reduce = !!useReducedMotion();
  const [drawn, setDrawn] = useState(reduce);

  useEffect(() => {
    if (!active) return;
    const id = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(id);
  }, [active]);

  const paths = ART[artwork] ?? ART.home;

  return (
    <svg
      viewBox="0 0 320 200"
      role="img"
      aria-label={label}
      className={className}
      fill="none"
      stroke="var(--c-maroon)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>{label}</title>
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: drawn || reduce ? 0 : 1,
            transition: reduce ? 'none' : `stroke-dashoffset 0.8s ease-out ${i * 0.14}s`,
          }}
        />
      ))}
    </svg>
  );
}
