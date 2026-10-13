import type { Accent, WeddingEvent } from '@/content/types';
import { wedding } from '@/content/wedding';

/** Resolve a decorative label to the configured script (PRD §6). */
export function accentText(a: Accent): { text: string; lang: 'pa' | 'hi' } | null {
  if (wedding.accentScript === 'gurmukhi') return { text: a.pa, lang: 'pa' };
  if (wedding.accentScript === 'devanagari') return { text: a.hi, lang: 'hi' };
  return null;
}

/** The ritual's name in the configured script, shown small beside the English name. */
export function eventAccentName(ev: WeddingEvent): { text: string; lang: 'pa' | 'hi' } | null {
  if (wedding.accentScript === 'gurmukhi') return { text: ev.gurmukhiName, lang: 'pa' };
  if (wedding.accentScript === 'devanagari' && ev.devanagariName) return { text: ev.devanagariName, lang: 'hi' };
  if (wedding.accentScript === 'devanagari') return { text: ev.gurmukhiName, lang: 'pa' };
  return null;
}
