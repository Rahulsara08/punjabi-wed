'use client';

import { useEffect, useRef, useState, type TouchEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { wedding } from '@/content/wedding';
import type { GalleryImage } from '@/content/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getGsap, useMediaQuery } from '@/lib/motion';

const INITIAL = 6;

/**
 * §7 Gallery (Yaadan): one set of photos of the couple, a parallax masonry whose columns drift at
 * 0.9×, 1.1× and 1.0× scroll speed. One photo + one caption per item. Lightbox with focus trap,
 * ←/→/Esc and swipe. Code-split from the shell. Hidden entirely when there are no photos.
 */
export default function Gallery() {
  const reduce = !!useReducedMotion();
  const images = wedding.gallery;
  const [showAll, setShowAll] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const desktop = useMediaQuery('(min-width: 768px)');
  const cols = desktop ? 3 : 2;
  const visible = showAll ? images : images.slice(0, INITIAL);
  const sectionRef = useRef<HTMLElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (reduce) return;
    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      colRefs.current.forEach((el, i) => {
        if (!el) return;
        const speed = [0.9, 1.1, 1.0][i % 3];
        const shift = (1 - speed) * 400;
        gsap.fromTo(
          el,
          { y: -shift },
          { y: shift, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true } },
        );
      });
    }, sectionRef);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [reduce, cols, showAll]);

  if (!images.length) return null;

  return (
    <section ref={sectionRef} id="gallery" className="section overflow-hidden">
      <SectionHeading accent={wedding.labels.gallery} title="Gallery" />

      <div className="mx-auto grid max-w-[1100px] items-start gap-4 px-4 md:gap-6" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {Array.from({ length: cols }, (_, c) => (
          <div
            key={c}
            ref={(el) => {
              colRefs.current[c] = el;
            }}
            className="flex flex-col gap-4 will-change-transform md:gap-6"
          >
            {visible
              .map((img, i) => ({ img, i }))
              .filter(({ i }) => i % cols === c)
              .map(({ img, i }) => (
                <figure key={img.src}>
                  <button
                    type="button"
                    className="block w-full bg-malmal p-2 shadow-paper-sm"
                    onClick={() => setLightbox(i)}
                    aria-label={`Open photo: ${img.alt}`}
                  >
                    <div className="border border-gold/60">
                      <img
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-full bg-sarson/30"
                        style={{ aspectRatio: `${img.width} / ${img.height}` }}
                      />
                    </div>
                  </button>
                  <figcaption className="mt-2 px-1 text-center text-[13px] leading-snug text-ink/70">{img.alt}</figcaption>
                </figure>
              ))}
          </div>
        ))}
      </div>

      {images.length > INITIAL && (
        <div className="mt-10 text-center">
          <button type="button" className="stitch-underline font-display text-[20px] text-maroon" onClick={() => setShowAll((s) => !s)}>
            {showAll ? 'Show fewer' : 'View Full Gallery →'}
          </button>
        </div>
      )}

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox images={images} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} reduce={reduce} />
        )}
      </AnimatePresence>
    </section>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onIndex,
  reduce,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
  reduce: boolean;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(index);
  const touchX = useRef<number | null>(null);
  indexRef.current = index;

  const go = (dir: 1 | -1) => onIndex((indexRef.current + dir + images.length) % images.length);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.querySelector<HTMLElement>('button')?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'Tab') {
        const items = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button, [href]') ?? []);
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const img = images[index];
  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={img.alt}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink/90 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.25 }}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button type="button" className="absolute right-4 top-4 h-11 w-11 rounded-full bg-ivory/15 text-[22px] text-ivory" aria-label="Close" onClick={onClose}>
        ×
      </button>
      <button
        type="button"
        className="absolute left-2 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-ivory/15 text-ivory"
        aria-label="Previous photo"
        onClick={(e) => {
          e.stopPropagation();
          go(-1);
        }}
      >
        ←
      </button>
      <button
        type="button"
        className="absolute right-2 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-ivory/15 text-ivory"
        aria-label="Next photo"
        onClick={(e) => {
          e.stopPropagation();
          go(1);
        }}
      >
        →
      </button>
      <figure className="flex max-h-full flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img src={img.src} alt={img.alt} className="max-h-[78vh] max-w-[92vw] bg-malmal p-2 object-contain" />
        <figcaption className="mt-3 text-center text-[14px] text-ivory/85">
          {img.alt} · {index + 1} / {images.length}
        </figcaption>
      </figure>
    </motion.div>
  );
}
