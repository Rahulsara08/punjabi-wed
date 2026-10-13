# Utsavy template checklist — Phulkari

Checked against `.claude/skills/invitation-template-guide.md` (the 11 rules). ✅ done · ◻ optional, done · — not applicable.

## 1. Use the guest's name
- ✅ Welcome section (Invitation card): "Dear Gill Parivaar," — `components/sections/Invitation.tsx`
- ✅ RSVP: "Dear Gill Parivaar, Tusi aa rahe ho?" + name pre-filled — `Rsvp.tsx`
- ✅ Wishing wall / Blessings: "Dear Gill Parivaar, send your asees" + name pre-filled — `Blessings.tsx`
- ✅ Footer / Thank-you: "Dear Gill Parivaar," — `Closing.tsx`
- ◻ Opening animation: "for Gill Parivaar" under the initials — `Preloader.tsx`
- ✅ Also: Hero ("with love, for …"), Events intro, Contact heading, Love Note ("See you at the wedding, …")
- ✅ Fallback without a name: "Dearest Guest" / "Dear Guest"; the card then asks for the name once, remembers it on the device, and every section updates (`lib/guest.tsx`)

## 2. Wishing wall that works with many wishes
- ✅ Only 6 notes hang on the wall (`VISIBLE = 6`)
- ✅ "View all asees (N)" opens a popup with the rest + "Show more" paging
- ✅ Section height is the same with 2 or 200 blessings
- ✅ Empty state: a single note "No asees yet. Be the first to bless us!"

## 3. Events section
- ✅ 12 Punjabi rituals, each with its own single-line icon — `components/motifs/RitualIcon.tsx`
- ✅ Global design: any unknown `icon` falls back to a bagh star; the node layout is the same for every event
- ✅ Per event: name, date, time, address (venue name + address), dress code, "View location →" (Google Maps)
- ◻ "Save all events to calendar": one tap, one .ics with every public event (also in Closing)

## 4. Gallery
- ✅ One set of photos of the couple; one photo + one caption per item (`alt` doubles as the caption)
- ✅ Clean 2/3-column masonry, 6 shown first, "View Full Gallery →" for the rest; hidden when empty

## 5. Contact
- ✅ Three people, each with name, relation and one number used for both Call and WhatsApp — `Contact.tsx`

## 6. Travel & stay
- ✅ Message for guests + stay name (`travelStay` in `content/wedding.ts`), shown under the Venue
- ◻ Illustration: a line-art hotel, or `travelStay.image` if the host provides one

## 7. Our story
- ✅ Title, chapter number, time & place per chapter
- ◻ Description (`story`, optional; hidden when empty)

## 8. RSVP
- ✅ Simple: one button, "Haanji, zaroor! · Accept invitation" (no decline)
- ✅ After accepting: card flips, marigold petals + bagh stars + hearts confetti, hearts float up
- ✅ Already accepted → sees "Bas fir, milde aan!" with optional details, not the button (saved on the device, upserted by invite code)
- ✅ Guest's name used and pre-filled

## 9. Blessings
- ✅ Two fields only: the blessing and the guest's name (auto-filled); greeting by name above; fixed-size wall (see rule 2)

## 10. Footer / Thank-you
- ✅ Wedding details (date, ceremony time, city), couple names, guest's name, thank-you message
- ✅ Extras: Add to Calendar (.ics / Google), Leave an Asees, Replay Invitation, drifting petals

## 11. Countdown
- ✅ Days · hours · minutes · seconds to the main ceremony (IST), with "Ajj Viah Hai!" and after-wedding states
- ✅ Save-the-date block in the Closing section

## Good practice
- ✅ Mobile first (checked at 310–440 px and 1280 px)
- ✅ Empty details hide neatly: dress code, about, insider tip, travel, grandparents, languages, hashtag, story text, gallery, contacts
- ✅ Light images: SVG placeholders; real photos should be AVIF/WebP (hero < 250 KB)
- ✅ Every animation has a reduced-motion fallback; site is noindex; phone numbers assembled on tap
