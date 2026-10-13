const TZ = 'Asia/Kolkata';

/** "10:00 AM" in IST, elder-friendly 12-hour format (PRD §8). */
export function formatTime(iso: string) {
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: TZ,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
    .format(new Date(iso))
    .replace(/\s?(am|pm)/i, (m) => ' ' + m.trim().toUpperCase());
}

/** "Sunday, 21 February 2027" */
export function formatLongDate(iso: string) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: TZ,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}

/** Calendar date in IST as YYYY-MM-DD, for "is it the wedding day" checks. */
export function istDateKey(d: Date) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
}

export function mapsDirectionsUrl(destination: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}

export function mapsSearchUrl(destination: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`;
}

export function coupleNames(bride: string, groom: string) {
  return `${bride} & ${groom}`;
}
