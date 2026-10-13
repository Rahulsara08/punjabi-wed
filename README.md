# Phulkari (ਫੁਲਕਾਰੀ) — a minimal Punjabi wedding invitation template

A single-page, mobile-first, animated wedding invitation for a North Indian (mainly Punjabi) wedding.
Ivory cloth, one maroon thread, silk gold: the whole page is held together by a running embroidery
stitch that sews itself across every section. Built from `PRD.md`, and checked against the Utsavy
template guide (`docs/template-checklist.md`).

## Run it

```bash
npm install
npm run placeholders   # writes light SVG placeholder photos to public/images (already done once)
npm run dev            # http://localhost:3000
```

Production build is a static export (`out/`) that can be dropped on Vercel, Netlify or any static host:

```bash
npm run build
```

## Edit one file: `content/wedding.ts`

Every name, date, ritual, venue, photo, contact and switch lives in `content/wedding.ts`.

| Switch | Values | What it changes |
|---|---|---|
| `ceremony` | `"anandKaraj"` \| `"phere"` | Invocation (ੴ / ॥ श्री गणेशाय नमः ॥), blessing line, the Path/Chowki event, Anand Karaj/Phere event and venue |
| `accentScript` | `"gurmukhi"` \| `"devanagari"` \| `"none"` | The small decorative label above each heading |
| `theme` | `"phulkari"` | Token file in `theme/` (colours, fonts, stitch size) |

Leave a field empty and its block hides neatly (no dress code → no swatch; no gallery photos → no
gallery; no `travelStay` → no travel block; `private: true` events only show on `?inner=1` links).

## Personalised links (every guest gets their own)

| Link | Effect |
|---|---|
| `/?to=Gill+Parivaar` | "Dear Gill Parivaar," in the opening animation, invitation, hero, events, RSVP, blessings, contact, thank-you and love note |
| `/?to=Priya&n=2` | …and the RSVP is pre-filled and capped at 2 guests; the card says "saprivaar" |
| `/?inner=1` | Shows family-only rituals (Chooda & Kaleere) |
| `/?ref=whatsapp` | Share source, for analytics |

Names are sanitised (letters in any script, digits, spaces, `. ' & -`, max 40 chars). If the link has no
name, the invitation card asks for it once ("Your name or family name"); it is remembered on the device
and used everywhere the same way. Until then the site says "Dearest Guest" / "Dear Guest".

## RSVPs and blessings

Out of the box, RSVPs and blessings are stored in the guest's browser (good for previews, or for a
wedding that collects RSVPs by phone). For a real dashboard:

1. Create a Supabase project and run `supabase/schema.sql` in the SQL editor.
2. Copy `.env.example` to `.env.local` and fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

The RSVP is accept-only ("Haanji, zaroor!"); guest count, events, food and stay are optional details
on the back of the card. RSVPs are idempotent (a device UUID plus the invite code; double taps never
create duplicates), queue offline and resend when the phone is back online, and a guest who already
accepted sees that state instead of the button. Blessings have a honeypot, a 250-character limit, a 1-per-minute rate limit per device and
an optional approval switch (`blessings.requireApproval`).

## Replace the placeholder art

`public/images` holds generated SVG placeholders. Replace them with real AVIF/WebP photos (hero
< 250 KB, story photos cropped 4:5, gallery any ratio) and update the `src`/`width`/`height` in
`content/wedding.ts`. For the WhatsApp preview, add a 1200×630 `public/og.png` (couple names + date
on ivory with a single bagh star) — the metadata already points to it.

## Structure

```
app/              layout (fonts, noindex metadata), page, global CSS
components/
  InviteShell.tsx preloader → veiled invitation → open; replay
  sections/       one file per section, each with its own signature motion
  motifs/         bagh star, ritual icons, venue line-art, five rivers
content/          wedding.ts (all copy) + types.ts
lib/              guest link, data adapters, .ics, formatting, GSAP helpers
theme/            phulkari.css design tokens
supabase/         schema + row-level security
docs/             template checklist
```

Every animation has a `prefers-reduced-motion` fallback. The site is `noindex, nofollow`; phone
numbers are assembled on tap and never appear in the HTML.
