'use client';

import { useEffect, useId, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { wedding } from '@/content/wedding';
import { accentText } from '@/lib/accent';
import { useGuest } from '@/lib/guest';
import { getGsap } from '@/lib/motion';

/**
 * §2 Hero: three layers. The watercolour back layer moves slower than the page and slowly zooms
 * (GSAP ScrollTrigger, scrubbed); a thin phulkari frame fades in; the names sit in front.
 * No background-attachment: fixed (breaks iOS). Static under reduced motion.
 */
export default function Hero() {
  const reduce = !!useReducedMotion();
  const guest = useGuest();
  const sectionRef = useRef<HTMLElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const accent = accentText(wedding.labels.hero);
  const { heroImage, couple, tagline } = wedding;

  useEffect(() => {
    if (reduce || !sectionRef.current || !backRef.current) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        backRef.current,
        { yPercent: -6, scale: 1 },
        {
          yPercent: 14,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={sectionRef} id="hero" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* Back layer */}
      <div ref={backRef} className="absolute inset-x-0 -bottom-[12%] -top-[12%] will-change-transform">
        <img
          src={heroImage.src}
          alt={heroImage.alt}
          width={heroImage.width}
          height={heroImage.height}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ivory/40" />
      </div>

      {/* Middle layer: thin phulkari frame */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-5 border border-gold/70 md:inset-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduce ? 0 : 1.4, delay: 0.2 }}
      >
        <div className="absolute inset-1 border border-dashed border-maroon/40" />
      </motion.div>

      {/* Front layer */}
      <div className="relative z-10 px-6 text-center">
        {accent && (
          <p className="text-[15px] text-goldtext">
            <span lang={accent.lang}>{accent.text}</span> · {wedding.labels.hero.roman}
          </p>
        )}
        <h1 className="mt-4 font-display text-[clamp(34px,11.5vw,72px)] font-medium leading-none text-maroon">
          {couple.bride}
          <span className="mx-2 font-script text-[0.55em] text-goldtext md:mx-4">&amp;</span>
          {couple.groom}
        </h1>
        <p className="mt-5 text-[17px] text-ink/85">{tagline}</p>
        {guest.name && <p className="mt-2 font-script text-[22px] text-goldtext">with love, for {guest.name}</p>}
        {wedding.hashtag && <p className="mt-3 text-[12px] uppercase tracking-[0.2em] text-ink/55">{wedding.hashtag}</p>}
        <StitchedArrow />
      </div>
    </section>
  );
}

/** Scroll cue that re-stitches itself every 4s. */
function StitchedArrow() {
  const id = useId();
  const d = 'M11 2V38M3 30L11 38L19 30';
  return (
    <svg width="22" height="44" viewBox="0 0 22 44" aria-hidden="true" className="mx-auto mt-12 text-gold">
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="22" height="44">
          <path d={d} pathLength={1} fill="none" stroke="#fff" strokeWidth="6" className="restitch" />
        </mask>
      </defs>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" mask={`url(#${id})`} />
    </svg>
  );
}
