'use client';

import { useEffect, useId, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { wedding } from '@/content/wedding';
import { accentText } from '@/lib/accent';
import { useGuest } from '@/lib/guest';
import { getGsap } from '@/lib/motion';

/**
 * §2 Hero: three layers. A watercolour floral garland hangs across the top (back layer, moves
 * slower than the page and slowly zooms); the couple illustration stands behind the names
 * (middle layer, a touch of its own parallax); the names sit in front. On phones the text sits
 * between the garland and the couple; on wider screens the text is on the left and the couple on
 * the right. GSAP ScrollTrigger, scrubbed; static under reduced motion.
 */
export default function Hero() {
  const reduce = !!useReducedMotion();
  const guest = useGuest();
  const sectionRef = useRef<HTMLElement>(null);
  const floralRef = useRef<HTMLDivElement>(null);
  const coupleRef = useRef<HTMLDivElement>(null);
  const accent = accentText(wedding.labels.hero);
  const { hero, couple, tagline } = wedding;

  useEffect(() => {
    if (reduce || !sectionRef.current) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true };
      gsap.fromTo(floralRef.current, { yPercent: 0, scale: 1 }, { yPercent: 28, scale: 1.06, ease: 'none', scrollTrigger: trigger });
      gsap.fromTo(coupleRef.current, { yPercent: 0 }, { yPercent: 10, ease: 'none', scrollTrigger: trigger });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={sectionRef} id="hero" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Back layer: floral garland across the top */}
      <div ref={floralRef} className="pointer-events-none absolute inset-x-0 top-0 z-0 origin-top will-change-transform">
        <img
          src={hero.top.src}
          alt={hero.top.alt}
          width={hero.top.width}
          height={hero.top.height}
          fetchPriority="high"
          decoding="async"
          className="h-[24svh] w-full object-cover object-top lg:h-[36svh]"
        />
      </div>

      {/* Middle layer: the couple. The outer div owns the responsive position (GSAP never touches it);
          the inner div is the one that drifts, so a rotation or resize can't bake in a stale translate. */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[54svh] -translate-x-1/2 lg:left-auto lg:right-[6%] lg:h-[74svh] lg:translate-x-0">
        <div ref={coupleRef} className="h-full will-change-transform">
          <img
            src={hero.couple.src}
            alt={hero.couple.alt}
            width={hero.couple.width}
            height={hero.couple.height}
            fetchPriority="high"
            decoding="async"
            className="h-full w-auto object-contain object-bottom"
          />
        </div>
      </div>

      {/* Front layer: the names. Stacked above the couple on phones and tablets; beside them from lg. */}
      <div className="relative z-10 flex flex-1 flex-col items-center px-5 pt-[23svh] text-center lg:items-start lg:justify-center lg:pl-[10%] lg:pr-[46%] lg:pt-0 lg:text-left">
        <div className="rounded-[28px] bg-ivory/75 px-5 py-4 lg:bg-transparent lg:p-0">
          {accent && (
            <p className="text-[15px] text-goldtext">
              <span lang={accent.lang}>{accent.text}</span> · {wedding.labels.hero.roman}
            </p>
          )}
          <h1 className="mt-3 font-display text-[clamp(34px,11.5vw,76px)] font-medium leading-none text-maroon">
            {couple.bride}
            <span className="mx-2 font-script text-[0.55em] text-goldtext md:mx-4">&amp;</span>
            {couple.groom}
          </h1>
          <p className="mt-4 text-[17px] text-ink/85">{tagline}</p>
          {guest.name && <p className="mt-1 font-script text-[22px] text-goldtext">with love, for {guest.name}</p>}
          {wedding.hashtag && <p className="mt-3 text-[12px] uppercase tracking-[0.2em] text-ink/55">{wedding.hashtag}</p>}
        </div>
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
    <svg width="22" height="44" viewBox="0 0 22 44" aria-hidden="true" className="mt-6 text-gold lg:ml-2 lg:mt-10">
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="22" height="44">
          <path d={d} pathLength={1} fill="none" stroke="#fff" strokeWidth="6" className="restitch" />
        </mask>
      </defs>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" mask={`url(#${id})`} />
    </svg>
  );
}
