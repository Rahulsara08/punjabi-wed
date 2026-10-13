/**
 * Generates light SVG placeholders for the hero, story polaroids and gallery, so the template
 * runs before the couple's real photos arrive. Replace the files in public/images with real
 * AVIF/WebP photos and update content/wedding.ts.
 *
 *   npm run placeholders
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');
mkdirSync(join(root, 'gallery'), { recursive: true });

const star = (cx, cy, outer, inner, points = 8) => {
  const parts = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = -Math.PI / 2 + (i * Math.PI) / points;
    parts.push(`${i === 0 ? 'M' : 'L'}${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return parts.join(' ') + ' Z';
};

const tints = ['#F3E3B5', '#EFD9D3', '#FCF9F3'];

function placeholder(w, h, tint, label) {
  const cx = w / 2;
  const cy = h / 2;
  const R = Math.min(w, h) * 0.17;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs><pattern id="weave" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 3H6M3 0V6" stroke="#2E2622" stroke-opacity="0.045" stroke-width="1"/></pattern></defs>
<rect width="100%" height="100%" fill="${tint}"/>
<rect width="100%" height="100%" fill="url(#weave)"/>
<path d="${star(cx, cy, R, R * 0.46)}" fill="none" stroke="#7A1F1F" stroke-width="${Math.max(1.5, R / 30).toFixed(1)}" stroke-dasharray="${(R / 8).toFixed(1)} ${(R / 12).toFixed(1)}" stroke-linecap="round"/>
<path d="${star(cx, cy, R * 0.38, R * 0.18, 4)}" fill="none" stroke="#C08A2E" stroke-width="${Math.max(1.2, R / 40).toFixed(1)}" stroke-dasharray="${(R / 10).toFixed(1)} ${(R / 14).toFixed(1)}" stroke-linecap="round"/>
<text x="${cx}" y="${(cy + R * 1.75).toFixed(0)}" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.max(14, w / 30).toFixed(0)}" fill="#8A5E1C" letter-spacing="2">${label}</text>
</svg>
`;
}

// The hero art (public/images/hero-floral.webp, hero-couple.webp) is real artwork, not generated here.

for (let i = 1; i <= 4; i++) {
  writeFileSync(join(root, `story-${i}.svg`), placeholder(800, 1000, tints[(i - 1) % 3], `Chapter photo · 4:5`));
}

const galleryShapes = [
  [800, 1000],
  [800, 600],
  [800, 1100],
  [800, 800],
  [800, 950],
  [800, 650],
  [800, 1000],
  [800, 700],
];
for (let i = 1; i <= 6; i++) {
  const [w, h] = galleryShapes[(i - 1) % galleryShapes.length];
  writeFileSync(join(root, 'gallery', `photo-${i}.svg`), placeholder(w, h, tints[i % 3], `Photo · ${i}`));
}

console.log('Placeholders written to', root);
