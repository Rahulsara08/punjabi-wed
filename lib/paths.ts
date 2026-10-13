/** Geometry helpers for the phulkari motifs. */

/** An n-point star outline (default 8-point bagh star), closed path. */
export function starPath(cx: number, cy: number, outer: number, inner: number, points = 8): string {
  const steps = points * 2;
  const parts: string[] = [];
  for (let i = 0; i < steps; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = -Math.PI / 2 + (i * Math.PI) / points;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    parts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return parts.join(' ') + ' Z';
}

/** Point on a quadratic Bézier, used to hang fairy lights on the clothesline. */
export function quadPoint(t: number, p0: [number, number], p1: [number, number], p2: [number, number]) {
  const mt = 1 - t;
  return {
    x: mt * mt * p0[0] + 2 * mt * t * p1[0] + t * t * p2[0],
    y: mt * mt * p0[1] + 2 * mt * t * p1[1] + t * t * p2[1],
  };
}
