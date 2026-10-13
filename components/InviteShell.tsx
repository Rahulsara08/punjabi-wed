'use client';

import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { GuestProvider } from '@/lib/guest';
import { getGsap } from '@/lib/motion';
import Preloader from '@/components/sections/Preloader';
import Invitation from '@/components/sections/Invitation';
import Hero from '@/components/sections/Hero';
import Countdown from '@/components/sections/Countdown';
import OurStory from '@/components/sections/OurStory';
import FamilyUnion from '@/components/sections/FamilyUnion';
import Events from '@/components/sections/Events';
import Rsvp from '@/components/sections/Rsvp';
import Blessings from '@/components/sections/Blessings';
import Venue from '@/components/sections/Venue';
import Contact from '@/components/sections/Contact';
import Closing from '@/components/sections/Closing';
import LoveNote from '@/components/sections/LoveNote';

// The gallery is code-split so the first paint stays light (PRD §7.7).
const Gallery = dynamic(() => import('@/components/sections/Gallery'), {
  ssr: false,
  loading: () => <div className="section" aria-hidden="true" />,
});

type Phase = 'preloader' | 'veiled' | 'open';

/**
 * Orchestrates the opening: Preloader → veiled Invitation (scroll locked) → Open Invitation → free scroll.
 * "Replay Invitation" scrolls to the top, re-locks, and remounts the Preloader and the chunni.
 */
export default function InviteShell() {
  const [phase, setPhase] = useState<Phase>('preloader');
  const [run, setRun] = useState(0);

  useEffect(() => {
    const locked = phase !== 'open';
    document.documentElement.classList.toggle('scroll-locked', locked);
    if (!locked) {
      const { ScrollTrigger } = getGsap();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
    return () => document.documentElement.classList.remove('scroll-locked');
  }, [phase]);

  const onPreloaderDone = useCallback(() => setPhase('veiled'), []);
  const onOpen = useCallback(() => setPhase('open'), []);
  const replay = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setRun((r) => r + 1);
    setPhase('preloader');
  }, []);

  return (
    <GuestProvider>
      {phase === 'preloader' && <Preloader key={run} onDone={onPreloaderDone} />}
      <main>
        <Invitation key={`invitation-${run}`} opened={phase === 'open'} onOpen={onOpen} />
        <Hero />
        <Countdown />
        <OurStory />
        <FamilyUnion />
        <Events />
        <Gallery />
        <Rsvp />
        <Blessings />
        <Venue />
        <Contact />
        <Closing onReplay={replay} />
        <LoveNote />
      </main>
    </GuestProvider>
  );
}
