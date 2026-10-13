import type { IconName } from '@/content/types';
import { starPath } from '@/lib/paths';

/**
 * Single-line ritual icons, one consistent 1.5px stroke (PRD §4.3).
 * Unknown names fall back to a small bagh star so any event a host adds still looks finished.
 */
const PATHS: Record<IconName, string> = {
  diya: 'M4 14h16M4 14c0 4 3.5 6 8 6s8-2 8-6M12 4.5c-2.5 3-2.5 5 0 7 2.5-2 2.5-4 0-7z',
  bell: 'M12 3v2M8 15c0-6 1-9 4-9s4 3 4 9l2 3H6l2-3zM10 19.5c0 1.3 4 1.3 4 0',
  'mehndi-cone': 'M10 3h4l-2 15-2-15zM12 18c-3 0-4 3-1 3 2 0 2-2 0-2M9.5 7h5',
  dholki: 'M5 8h14v8H5zM5 12c0 2.2.7 4 1.5 4S8 14.2 8 12s-.7-4-1.5-4S5 9.8 5 12zM19 12c0 2.2-.7 4-1.5 4S16 14.2 16 12s.7-4 1.5-4 1.5 1.8 1.5 4zM9 8l2 8M13 8l2 8',
  'vatna-bowl': 'M4 12h16c0 5-4 8-8 8s-8-3-8-8zM12 12c0-4 2-6 5-7 0 4-2 6-5 7M12 12c-1-2-2-3-4-3.5',
  gagar: 'M8 10h8l2 10H6l2-10zM9 10V8h6v2M9.5 7.5c-1.5-1.5 0-3 .5-4 .5 1 2 2.5 0 4M14.5 7.5c-1.5-1.5 0-3 .5-4 .5 1 2 2.5 0 4',
  bangles: 'M12 8c3.9 0 7 1.1 7 2.5S15.9 13 12 13s-7-1.1-7-2.5S8.1 8 12 8zM5 13.5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5M5 16.5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5',
  sehra: 'M5 10c0-5 14-5 14 0M5 10h14M7 10v8M10 10v9M13 10v9M16 10v8M4 10c0-2 1-3 2-3M20 10c0-2-1-3-2-3',
  garlands: 'M4 6c3 8 13 8 16 0M4 10c3 8 13 8 16 0M8 10.5v2M12 12v2M16 10.5v2',
  'four-loops': 'M12 4.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5zM12 14.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5zM4.5 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0zM14.5 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0zM12 11.3v1.4',
  'sacred-fire': 'M12 3c-4 5-4 8 0 12 4-4 4-7 0-12zM12 9c-1.5 2-1.5 3.5 0 5 1.5-1.5 1.5-3 0-5M5 19l14-3M5 16l14 3',
  juttis: 'M4 14c0-3 4-5 8-5 3 0 6 1 8 3l-2 3c-3 1-10 1-14-1zM20 12c1-1 1-3-1-3M8 13c1.5-.5 3-.5 4.5 0',
  doli: 'M5 9l7-5 7 5M6 9h12v7H6zM2 16h20M11 11h2v5h-2z',
  lights: 'M3 6c6 6 12 6 18 0M8 9v2M12 10v2M16 9v2M8 12.5a1.2 1.2 0 1 0 0 .1M12 13.5a1.2 1.2 0 1 0 0 .1M16 12.5a1.2 1.2 0 1 0 0 .1',
};

export function RitualIcon({ name, className = '' }: { name: IconName | string; className?: string }) {
  const d = (PATHS as Record<string, string>)[name];
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {d ? <path d={d} /> : <path d={starPath(12, 12, 9, 4.2, 8)} strokeDasharray="2.2 1.6" />}
    </svg>
  );
}
