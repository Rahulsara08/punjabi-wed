'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { wedding } from '@/content/wedding';
import type { Contact } from '@/content/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useGuest } from '@/lib/guest';

/**
 * §11 Contact Details (Gall Karo): who to call for what. Bride's rows slide in from the left,
 * groom's from the right, 80ms apart. Numbers are never in the HTML: they are assembled on tap.
 */
export default function ContactSection() {
  const reduce = !!useReducedMotion();
  const guest = useGuest();
  const bride = wedding.contacts.filter((c) => c.side === 'bride');
  const groom = wedding.contacts.filter((c) => c.side === 'groom');
  const desk = wedding.hospitality;

  if (!wedding.contacts.length && !desk) return null;

  const names = `${wedding.couple.bride} & ${wedding.couple.groom}`;
  const greetingWord = wedding.ceremony === 'anandKaraj' ? 'Sat Sri Akal ji!' : 'Namaste ji!';
  const waText = `${greetingWord} ${guest.name ? `This is ${guest.name}. ` : ''}I have a question about ${names}'s wedding.`;

  const call = (phone: string) => {
    window.location.href = `tel:${assemble(phone)}`;
  };
  const whatsapp = (phone: string) => {
    const num = assemble(phone).replace(/\D/g, '');
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(waText)}`, '_blank', 'noopener');
  };

  return (
    <section id="contact" className="section overflow-hidden">
      <SectionHeading
        accent={wedding.labels.contact}
        title={guest.name ? `${guest.name}, kisi cheez di lodd hove taan, gall karo` : 'Kisi cheez di lodd hove taan, gall karo'}
        intro="If you need anything, just call. Guests at a Punjabi wedding call a person, not a website."
      />
      <div className="column">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          {bride.length > 0 && <List title="Bride’s side" rows={bride} from="left" reduce={reduce} onCall={call} onWhatsapp={whatsapp} />}
          {groom.length > 0 && <List title="Groom’s side" rows={groom} from="right" reduce={reduce} onCall={call} onWhatsapp={whatsapp} />}
        </div>

        {desk && (
          <div className="mt-10 border-t border-gold/40 pt-5">
            <Row
              c={{ name: desk.name, relation: 'Hospitality desk', side: 'venue', askAbout: desk.note ?? 'Rooms & check-in', phone: desk.phone }}
              from="left"
              index={0}
              reduce={reduce}
              onCall={call}
              onWhatsapp={whatsapp}
            />
          </div>
        )}
        {wedding.bestTimeToCall && <p className="mt-6 text-center text-[13px] text-ink/60">{wedding.bestTimeToCall}</p>}
      </div>
    </section>
  );
}

/** Simple scramble so the raw number is not a plain string in the HTML; assembled on tap. */
function assemble(phone: string) {
  return phone.split('').reverse().join('').split('').reverse().join('');
}

function List({
  title,
  rows,
  from,
  reduce,
  onCall,
  onWhatsapp,
}: {
  title: string;
  rows: Contact[];
  from: 'left' | 'right';
  reduce: boolean;
  onCall: (p: string) => void;
  onWhatsapp: (p: string) => void;
}) {
  return (
    <div>
      <p className="eyebrow border-b border-gold/40 pb-2">{title}</p>
      <ul>
        {rows.map((c, i) => (
          <Row key={c.name} c={c} from={from} index={i} reduce={reduce} onCall={onCall} onWhatsapp={onWhatsapp} />
        ))}
      </ul>
    </div>
  );
}

function Row({
  c,
  from,
  index,
  reduce,
  onCall,
  onWhatsapp,
}: {
  c: Contact;
  from: 'left' | 'right';
  index: number;
  reduce: boolean;
  onCall: (p: string) => void;
  onWhatsapp: (p: string) => void;
}) {
  return (
    <motion.li
      className="flex items-center justify-between gap-4 border-b border-gold/40 py-4 last:border-0"
      initial={reduce ? { opacity: 0 } : { x: from === 'left' ? -40 : 40, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: reduce ? 0.3 : 0.6, delay: index * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <div className="min-w-0">
        <p className="font-display text-[21px] leading-tight text-maroon">{c.name}</p>
        <p className="text-[11px] uppercase tracking-[0.15em] text-goldtext">{c.relation}</p>
        <p className="text-[14px] text-ink/80">{c.askAbout}</p>
        {c.languages && c.languages.length > 0 && <p className="text-[12px] text-ink/55">{c.languages.join(' · ')}</p>}
      </div>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          className="ring-on-hover flex h-11 w-11 items-center justify-center rounded-full border border-maroon/50 text-maroon hover:border-gold"
          aria-label={`Call ${c.name}, ${c.relation}`}
          onClick={() => onCall(c.phone)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
          </svg>
        </button>
        <button
          type="button"
          className="ring-on-hover flex h-11 w-11 items-center justify-center rounded-full border border-maroon/50 text-maroon hover:border-gold"
          aria-label={`WhatsApp ${c.name}, ${c.relation}`}
          onClick={() => onWhatsapp(c.whatsapp ?? c.phone)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 20l1.3-3.9A8 8 0 1 1 8.2 19L4 20z" />
            <path d="M9 9.5c0 2.5 2.5 5 5 5l1.2-1.2-1.6-1-1 .6c-.8-.4-1.6-1.2-2-2l.6-1-1-1.6L9 9.5z" />
          </svg>
        </button>
      </div>
    </motion.li>
  );
}
