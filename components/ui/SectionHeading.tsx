import type { Accent } from '@/content/types';
import { accentText } from '@/lib/accent';

/** Gurmukhi/Devanagari accent (small) above an English heading, with a gold hairline (PRD §6). */
export function SectionHeading({
  accent,
  title,
  intro,
  className = '',
}: {
  accent: Accent;
  title: string;
  intro?: string;
  className?: string;
}) {
  const a = accentText(accent);
  return (
    <header className={`column mb-10 text-center ${className}`}>
      <p className="text-[15px] text-goldtext">
        {a && (
          <span lang={a.lang} className="text-[17px]">
            {a.text}
          </span>
        )}
        {a && ' · '}
        <span className="italic">{accent.roman}</span>
      </p>
      <h2 className="mt-2 font-display text-[34px] font-medium leading-tight text-maroon md:text-[42px]">{title}</h2>
      <div className="hairline mt-4" />
      {intro && <p className="mx-auto mt-4 max-w-[46ch] text-[15px] leading-relaxed text-ink/75">{intro}</p>}
    </header>
  );
}
