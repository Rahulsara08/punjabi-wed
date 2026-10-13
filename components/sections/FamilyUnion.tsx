'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { wedding } from '@/content/wedding';
import type { FamilySide } from '@/content/types';
import { SectionHeading } from '@/components/ui/SectionHeading';

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const line: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.9, ease: 'easeOut' } } };

/**
 * §5 Family Union: text only, no cards, borders or shadows. Each line fades in 120ms apart,
 * like ink soaking into cloth. No movement, no scale. The calmest section on the page.
 */
export default function FamilyUnion() {
  const reduce = !!useReducedMotion();
  const { families } = wedding;

  return (
    <section id="family" className="section">
      <SectionHeading accent={wedding.labels.family} title="Our Families" />
      <motion.div
        className="column text-center"
        variants={container}
        initial={reduce ? 'show' : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p variants={line} className="font-script text-[28px] leading-none text-maroon">
          {families.blessingLine.roman}
        </motion.p>
        <motion.p variants={line} className="mt-2 text-[14px] text-ink/65">
          <span lang="pa">{families.blessingLine.pa}</span> · {families.blessingLine.en}
        </motion.p>

        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-8">
          <Family side={families.bride} title="The Bride’s Family" />
          <motion.div variants={line} aria-hidden="true" className="flex justify-center">
            <span className="h-px w-16 border-t border-dashed border-gold md:h-full md:w-px md:border-l md:border-t-0" />
          </motion.div>
          <Family side={families.groom} title="The Groom’s Family" />
        </div>

        <motion.p variants={line} className="mt-10 font-display text-[21px] italic text-ink/85">
          {families.closingLine}
        </motion.p>
      </motion.div>
    </section>
  );
}

function Family({ side, title }: { side: FamilySide; title: string }) {
  return (
    <div>
      <motion.p variants={line} className="eyebrow">
        {title}
      </motion.p>
      {side.grandparents && (
        <>
          <motion.p variants={line} className="mt-4 text-[13px] italic text-ink/60">
            {side.grandLabel}
          </motion.p>
          <motion.p variants={line} className="text-[16px] text-ink/85">
            {side.grandparents}
          </motion.p>
        </>
      )}
      <motion.p variants={line} className="mt-3 text-[13px] italic text-ink/60">
        {side.parentLabel}
      </motion.p>
      <motion.p variants={line} className="font-display text-[22px] font-medium leading-snug text-maroon">
        {side.parents}
      </motion.p>
      <motion.p variants={line} className="mt-3 font-script text-[22px] text-goldtext">
        {side.line}
      </motion.p>
    </div>
  );
}
