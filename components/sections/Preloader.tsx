'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { wedding } from '@/content/wedding';
import { starPath } from '@/lib/paths';
import { useGuest } from '@/lib/guest';

const STITCH_MS = 1400;
const RING_MS = 400;
const FOLD_MS = 650;
const EASE: [number, number, number, number] = [0.6, 0, 0.3, 1];

/**
 * §0 Preloader & Stitched Seal: the bagh star stitches itself, the initials appear inside a gold ring,
 * then the screen folds open like a phulkari dupatta. Tap after 1s to skip. Total ≈ 2.45s.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const reduce = !!useReducedMotion();
  const guest = useGuest();
  const [folding, setFolding] = useState(false);
  const [skippable, setSkippable] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setSkippable(true), 1000);
    const t2 = setTimeout(() => setFolding(true), reduce ? 1000 : STITCH_MS + RING_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduce]);

  useEffect(() => {
    if (!folding) return;
    const t = setTimeout(onDone, reduce ? 500 : FOLD_MS);
    return () => clearTimeout(t);
  }, [folding, onDone, reduce]);

  const outer = starPath(80, 80, 62, 30, 8);
  const inner = starPath(80, 80, 24, 12, 4);
  const stitch = (delay = 0, dur = STITCH_MS) => ({
    strokeDashoffset: reduce ? 0 : 1,
    animation: reduce ? undefined : `stitch-in ${dur}ms linear ${delay}ms forwards`,
  });
  const fold = { duration: reduce ? 0.5 : FOLD_MS / 1000, ease: EASE };

  return (
    <div
      className="fixed inset-0 z-50"
      style={{ perspective: 1200 }}
      onClick={() => skippable && setFolding(true)}
      role="presentation"
    >
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-ivory"
        style={{ transformOrigin: 'left center', backfaceVisibility: 'hidden' }}
        animate={reduce ? { opacity: folding ? 0 : 1 } : { rotateY: folding ? -92 : 0 }}
        transition={fold}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-ivory"
        style={{ transformOrigin: 'right center', backfaceVisibility: 'hidden' }}
        animate={reduce ? { opacity: folding ? 0 : 1 } : { rotateY: folding ? 92 : 0 }}
        transition={fold}
      />

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        animate={{ opacity: folding ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <svg width="176" height="176" viewBox="0 0 160 160" aria-hidden="true">
          <defs>
            <mask id="preloader-stitch" maskUnits="userSpaceOnUse" x="0" y="0" width="160" height="160">
              <path d={outer} pathLength={1} fill="none" stroke="#fff" strokeWidth="6" strokeDasharray="1" style={stitch()} />
              <path d={inner} pathLength={1} fill="none" stroke="#fff" strokeWidth="6" strokeDasharray="1" style={stitch(500, 800)} />
            </mask>
          </defs>
          <g mask="url(#preloader-stitch)" stroke="var(--c-maroon)" strokeWidth="1.5" strokeLinecap="round" fill="none">
            <path d={outer} strokeDasharray="6 4" />
            <path d={inner} strokeDasharray="5 4" />
          </g>
          <circle
            cx="80"
            cy="80"
            r="17"
            pathLength={1}
            fill="none"
            stroke="var(--c-gold)"
            strokeWidth="1"
            strokeDasharray="1"
            style={stitch(STITCH_MS, RING_MS)}
          />
          <motion.text
            x="80"
            y="84.5"
            textAnchor="middle"
            fontSize="12"
            fill="var(--c-maroon)"
            style={{ fontFamily: 'var(--font-display), Georgia, serif', letterSpacing: 1 }}
            initial={{ opacity: reduce ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduce ? 0 : STITCH_MS / 1000, duration: 0.4 }}
          >
            {wedding.couple.initials}
          </motion.text>
        </svg>

        {guest.name && (
          <motion.p
            className="mt-3 font-script text-[22px] text-goldtext"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduce ? 0.2 : (STITCH_MS + 200) / 1000, duration: 0.6 }}
          >
            for {guest.name}
          </motion.p>
        )}

        <p
          className={`mt-8 text-[11px] uppercase tracking-[0.25em] text-ink/40 transition-opacity duration-500 ${
            skippable ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Tap to continue
        </p>
      </motion.div>
    </div>
  );
}
