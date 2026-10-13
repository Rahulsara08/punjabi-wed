'use client';

import { useRef, type KeyboardEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { wedding } from '@/content/wedding';
import type { Chapter } from '@/content/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { quadPoint } from '@/lib/paths';
import { useMediaQuery } from '@/lib/motion';

/**
 * §4 Our Story: polaroids hanging from a fairy-light clothesline. Mobile swipes with snap scrolling;
 * desktop shows a gently sagging line. Each polaroid swings in and settles like a pendulum.
 */
export default function OurStory() {
  const reduce = !!useReducedMotion();
  const desktop = useMediaQuery('(min-width: 768px)');
  const scroller = useRef<HTMLDivElement>(null);
  const chapters = wedding.chapters;

  if (!chapters.length) return null;

  const scrollByCard = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-polaroid]');
    const w = card ? card.offsetWidth + 24 : 280;
    el.scrollBy({ left: dir * w, behavior: reduce ? 'auto' : 'smooth' });
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollByCard(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollByCard(-1);
    }
  };

  return (
    <section id="story" className="section overflow-hidden">
      <SectionHeading accent={wedding.labels.story} title="Our Story" />
      <div className="relative mx-auto max-w-[1200px]">
        <Thread sag={desktop} />
        <div
          ref={scroller}
          tabIndex={0}
          role="region"
          aria-label="Our story, chapter by chapter. Use the left and right arrow keys to move between chapters."
          onKeyDown={onKey}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-[calc(50%-120px)] pb-6 pt-12 md:px-10"
        >
          {chapters.map((c, i) => (
            <Polaroid key={c.number} chapter={c} index={i} reduce={reduce} />
          ))}
        </div>
        <div className="mt-2 flex justify-center gap-3 md:hidden">
          <button type="button" className="btn-outline h-11 w-11 !px-0" aria-label="Previous chapter" onClick={() => scrollByCard(-1)}>
            ←
          </button>
          <button type="button" className="btn-outline h-11 w-11 !px-0" aria-label="Next chapter" onClick={() => scrollByCard(1)}>
            →
          </button>
        </div>
      </div>
    </section>
  );
}

/** The fairy-light string: straight on mobile, a gentle sag on desktop. Dots twinkle faintly. */
function Thread({ sag }: { sag: boolean }) {
  const p0: [number, number] = [0, 6];
  const p1: [number, number] = [500, sag ? 30 : 6];
  const p2: [number, number] = [1000, 6];
  const lights = Array.from({ length: 14 }, (_, i) => quadPoint((i + 0.5) / 14, p0, p1, p2));
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[26px] h-10">
      <svg className="h-full w-full" viewBox="0 0 1000 40" preserveAspectRatio="none">
        <path d={`M${p0[0]} ${p0[1]} Q${p1[0]} ${p1[1]} ${p2[0]} ${p2[1]}`} fill="none" stroke="var(--c-gold)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      </svg>
      {lights.map((pt, i) => (
        <span
          key={i}
          className="twinkle absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
          style={{ left: `${pt.x / 10}%`, top: `${pt.y}px`, animationDelay: `${(i * 0.37) % 3}s` }}
        />
      ))}
    </div>
  );
}

function Polaroid({ chapter, index, reduce }: { chapter: Chapter; index: number; reduce: boolean }) {
  const tilt = index % 2 ? 2 : -2;
  return (
    <motion.figure
      data-polaroid
      className="relative w-[240px] shrink-0 snap-center"
      style={{ transformOrigin: 'top center' }}
      initial={reduce ? { opacity: 0 } : { rotate: tilt * 4, y: -10, opacity: 0 }}
      whileInView={{ rotate: tilt, y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={reduce ? { duration: 0.4 } : { type: 'spring', stiffness: 60, damping: 7, mass: 1 }}
    >
      {/* wooden clip */}
      <span aria-hidden="true" className="absolute -top-4 left-1/2 z-10 h-7 w-3 -translate-x-1/2 rounded-[3px] bg-[var(--c-wood)] shadow-paper-sm" />
      <div className="paper p-3 pb-4">
        <div className="aspect-[4/5] overflow-hidden bg-sarson/40">
          <img src={chapter.photo} alt={chapter.title} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        </div>
        <figcaption className="mt-3 text-center">
          <p className="eyebrow">Chapter {chapter.number}</p>
          <h3 className="mt-1 font-display text-[22px] font-medium leading-tight text-maroon">{chapter.title}</h3>
          <p className="text-[13px] text-ink/60">
            {chapter.year}
            {chapter.place ? ` · ${chapter.place}` : ''}
          </p>
          {chapter.story && <p className="mt-2 text-[14px] leading-relaxed text-ink/80">{chapter.story}</p>}
        </figcaption>
      </div>
    </motion.figure>
  );
}
