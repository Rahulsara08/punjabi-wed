/** Faint watercolour of the five rivers of Punjab (panj-aab). Used once, behind the Love Note (PRD §4.3). */
export function FiveRivers({ className = '' }: { className?: string }) {
  const rivers = [
    'M-40 90C140 40 300 150 460 100S720 50 860 110',
    'M-40 170C160 120 320 230 480 180S740 130 860 190',
    'M-40 250C180 200 340 300 500 250S760 210 860 270',
    'M-40 330C200 280 360 380 520 330S780 290 860 350',
    'M-40 410C220 360 380 460 540 410S800 370 860 430',
  ];
  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <filter id="river-wash" x="-10%" y="-20%" width="120%" height="140%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
      </defs>
      <g fill="none" strokeLinecap="round" filter="url(#river-wash)">
        {rivers.map((d, i) => (
          <path
            key={d}
            d={d}
            stroke={i % 2 ? 'var(--c-gold)' : 'var(--c-maroon)'}
            strokeWidth={7 - i * 0.6}
            strokeOpacity={0.9}
          />
        ))}
      </g>
    </svg>
  );
}
