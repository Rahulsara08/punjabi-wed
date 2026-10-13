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

// Deterministic pseudo-random so the hero looks the same on every run.
let seed = 7;
const rand = () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};

function hero() {
  const flowers = [];
  for (let i = 0; i < 220; i++) {
    const x = (rand() * 1640 - 20).toFixed(0);
    const y = (640 + rand() * 360).toFixed(0);
    const r = (2 + rand() * 4).toFixed(1);
    flowers.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="#E6B422" opacity="${(0.35 + rand() * 0.4).toFixed(2)}"/>`);
  }
  const stems = [];
  for (let i = 0; i < 60; i++) {
    const x = (rand() * 1600).toFixed(0);
    const y = (700 + rand() * 300).toFixed(0);
    stems.push(`<path d="M${x} ${y}v${(14 + rand() * 20).toFixed(0)}" stroke="#7C8A3E" stroke-opacity="0.35" stroke-width="1.5"/>`);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FCF9F3"/><stop offset="1" stop-color="#F3E3B5"/></linearGradient>
  <linearGradient id="field" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EAD58F"/><stop offset="1" stop-color="#D7B65A"/></linearGradient>
  <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="18"/></filter>
  <filter id="softer" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="40"/></filter>
</defs>
<rect width="1600" height="1000" fill="url(#sky)"/>
<circle cx="1180" cy="300" r="130" fill="#C08A2E" opacity="0.3" filter="url(#softer)"/>
<ellipse cx="800" cy="580" rx="1100" ry="70" fill="#CDBF9A" opacity="0.5" filter="url(#soft)"/>
<path d="M0 610 Q400 570 800 610 T1600 610 V1000 H0 Z" fill="url(#field)"/>
<path d="M0 660 Q400 620 800 660 T1600 660 V1000 H0 Z" fill="#E2C56A" opacity="0.6" filter="url(#soft)"/>
${stems.join('\n')}
${flowers.join('\n')}
<path d="M1230 610V470" stroke="#5A4634" stroke-width="7" stroke-linecap="round"/>
<path d="M1230 505l-55-45M1230 525l50-50M1230 485l-22-55" stroke="#5A4634" stroke-width="4" stroke-linecap="round"/>
<ellipse cx="1225" cy="440" rx="100" ry="50" fill="#8A8A5A" opacity="0.55" filter="url(#soft)"/>
<ellipse cx="1175" cy="465" rx="60" ry="32" fill="#8A8A5A" opacity="0.5" filter="url(#soft)"/>
<ellipse cx="1280" cy="472" rx="60" ry="30" fill="#8A8A5A" opacity="0.5" filter="url(#soft)"/>
<rect width="1600" height="1000" fill="#F7F2E8" opacity="0.2"/>
</svg>
`;
}

writeFileSync(join(root, 'hero-sarson.svg'), hero());

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
