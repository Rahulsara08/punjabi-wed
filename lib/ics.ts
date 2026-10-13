import type { WeddingEvent } from '@/content/types';
import { venueById } from '@/content/wedding';

/**
 * .ics generation with an explicit Asia/Kolkata VTIMEZONE so iOS Calendar,
 * Google Calendar and Outlook all land on the right hour (PRD §7.12).
 */

const TZ = 'Asia/Kolkata';

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

/** ISO "2027-02-21T10:00:00+05:30" → "20270221T100000" (local wall-clock in IST). */
function toLocalStamp(iso: string) {
  const d = new Date(iso);
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '00';
  const hour = get('hour') === '24' ? '00' : get('hour');
  return `${get('year')}${get('month')}${get('day')}T${hour}${get('minute')}${get('second')}`;
}

function toUtcStamp(d: Date) {
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(
    d.getUTCMinutes(),
  )}${pad(d.getUTCSeconds())}Z`;
}

function escapeText(s: string) {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

function fold(line: string) {
  // RFC 5545: lines ≤ 75 octets, continuation lines start with a space
  const out: string[] = [];
  let rest = line;
  while (rest.length > 73) {
    out.push(rest.slice(0, 73));
    rest = ' ' + rest.slice(73);
  }
  out.push(rest);
  return out.join('\r\n');
}

export function buildIcs(events: WeddingEvent[], opts: { coupleNames: string; siteUrl?: string }) {
  const now = toUtcStamp(new Date());
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Phulkari//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VTIMEZONE',
    `TZID:${TZ}`,
    'BEGIN:STANDARD',
    'DTSTART:19700101T000000',
    'TZOFFSETFROM:+0530',
    'TZOFFSETTO:+0530',
    'TZNAME:IST',
    'END:STANDARD',
    'END:VTIMEZONE',
  ];

  for (const ev of events) {
    const venue = venueById(ev.venueId);
    const start = toLocalStamp(ev.startTime);
    const end = ev.endTime
      ? toLocalStamp(ev.endTime)
      : toLocalStamp(new Date(new Date(ev.startTime).getTime() + 2 * 60 * 60 * 1000).toISOString());
    const desc = [ev.whatHappens, ev.dressCode ? `Dress code: ${ev.dressCode.note}` : '', opts.siteUrl ?? '']
      .filter(Boolean)
      .join('\n');
    lines.push(
      'BEGIN:VEVENT',
      `UID:${ev.id}-${start}@phulkari.invite`,
      `DTSTAMP:${now}`,
      `DTSTART;TZID=${TZ}:${start}`,
      `DTEND;TZID=${TZ}:${end}`,
      fold(`SUMMARY:${escapeText(`${ev.name} · ${opts.coupleNames}`)}`),
      fold(`DESCRIPTION:${escapeText(desc)}`),
      fold(`LOCATION:${escapeText(venue ? `${venue.name}, ${venue.address}` : '')}`),
      'END:VEVENT',
    );
  }

  lines.push('END:VCALENDAR');
  return lines.join('\r\n') + '\r\n';
}

export function downloadIcs(filename: string, ics: string) {
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function googleCalendarUrl(ev: WeddingEvent, coupleNames: string) {
  const venue = venueById(ev.venueId);
  const start = toLocalStamp(ev.startTime);
  const end = ev.endTime
    ? toLocalStamp(ev.endTime)
    : toLocalStamp(new Date(new Date(ev.startTime).getTime() + 2 * 60 * 60 * 1000).toISOString());
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${ev.name} · ${coupleNames}`,
    dates: `${start}/${end}`,
    ctz: TZ,
    details: ev.whatHappens,
    location: venue ? `${venue.name}, ${venue.address}` : '',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
