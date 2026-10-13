import { starPath } from '@/lib/paths';

/** The 8-point phulkari bagh star, drawn with stitch lines only, never filled (PRD §4.3). */
export function BaghStar({
  size = 24,
  className = '',
  stroke = 'currentColor',
}: {
  size?: number;
  className?: string;
  stroke?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d={starPath(50, 50, 46, 22, 8)}
        fill="none"
        stroke={stroke}
        strokeWidth="3"
        strokeDasharray="7 5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={starPath(50, 50, 17, 8, 4)}
        fill="none"
        stroke={stroke}
        strokeWidth="2.5"
        strokeDasharray="5 4"
        strokeLinecap="round"
      />
    </svg>
  );
}
