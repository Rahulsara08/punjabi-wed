---
name: invitation-template-check
description: Check an invitation template (a Utsavy template pack in src/template-packs/packs/<slug>, or a standalone invitation project) against the Utsavy template rules and report what is done, what is missing and what is recommended. Use when someone is building or finishing an invitation template and asks what is left, whether it is ready, to review or audit the template, or to check it against the template guide or checklist. Read-only unless the person asks for fixes.
---

# Invitation template check

The team builds invitation templates (wedding and other events). This skill looks at one template and tells the
team, in plain words, what is **done**, what is **missing** (must have), and what is **recommended** (optional).
The rules are the 11 below; a human-friendly copy is `invitation-template-guide.md`, next to this skill's folder.
Keep the two in step when a rule changes.

All templates are paid templates, so plan limits (Free plan, the wishing wall's on/off switch) are **not** checked.

## 1. Find the template

- Ask which template if it isn't clear. Accept a pack slug, a folder path, or "the one I'm working on" (then use the
  folder with the most recent changes, and say which one you picked).
- **Utsavy template pack** (`src/template-packs/packs/<slug>/`): read `Template.tsx` (the section order), every file in
  `components/`, `schema.ts` (what the host can fill in), `adapter.ts`, `helpers/*` (the config built from the host's
  data), `manifest.ts` and `NOTES.md` if present.
- **Standalone project** (an invitation site not yet integrated): find the page's sections (components, HTML) and the
  data file the content comes from.
- Read the code. Never judge from file names alone; a section counts only when it is actually rendered.

## 2. Check every rule

Mark each line **Done**, **Partly done** (say what is missing), **Missing**, or **Not applicable** (say why, e.g. a
birthday has no "Our story"). Optional lines that are absent are **Recommended**, not Missing.

### Rule 1 — Guest name
Utsavy packs receive it as the `guestName` prop of the template (passed down to sections).
- Must: guest name shown in the **Welcome section** (first section after the opening), the **RSVP section**, the
  **Wishing wall**, the **Footer / Thank-you section**.
- Must: a fallback when there is no name (e.g. "Dear Guest"); look for `guestName ||` or similar.
- Optional: guest name in the **opening animation**.

### Rule 2 — Wishing wall that works with many wishes
In Utsavy packs, wishes come from the platform: the template posts `REQUEST_INITIAL_WISHES_DATA` and receives
`INITIAL_WISHES_DATA`; it sends `SUBMIT_NEW_WISH` and gets `WISH_SUBMITTED_SUCCESS` / `WISH_SUBMITTED_ERROR`.
- Must: only **4–6 wishes** visible at once (a `slice`, a page size, a carousel window, a fixed-height area).
- Must: a **"View all wishes"** button, popup, slider or pages to reach the rest.
- Must: the section's height does not grow with the number of wishes. Check that the list isn't simply mapped in full.
- Must: an empty state when there are no wishes.
- Must (Utsavy): wishes are loaded from and sent to the platform, not hard-coded sample data shown to real guests.

### Rule 3 — Events
- Must: designs for the events the template's tradition usually has (e.g. Haldi, Mehendi, Sangeet, Wedding,
  Reception), each with its own image or illustration.
- Must: a **general event design** for any event name the template doesn't know, so a host can add an event and it
  still looks right. Check how an unknown event name is rendered (a default case, a fallback image).
- Must: events come from the host's data as a **list** (in `schema.ts` / the config), not a fixed number of cards.
- Must, for every event: **name, date, time, address, dress code, View location** (a Maps link built from the
  address, opening in a new tab).
- Optional: **Save to calendar**, as **one button that saves all events together** (e.g. one `.ics` file with every
  event, or a single action). One button per event does not meet this.

### Rule 4 — Gallery
- Must: each item is **one photo + one caption**; the layout stays clean. 3 photos is enough.

### Rule 5 — Contact
- Must: **one person** with **name, relation and one number**.
- Must: the same number is used for a call (`tel:`) and for WhatsApp (`https://wa.me/<number>`, digits with country
  code, no `+` or spaces).

### Rule 6 — Travel & stay
- Must: a **message for guests** and the **travel / stay name**.
- Optional: an **image or illustration**.

### Rule 7 — Our story
- Must, per chapter: **title, chapter number, time & place**.
- Optional: **description**.

### Rule 8 — RSVP
Utsavy packs get `onAccept`, `hasResponded` and `accepted` props.
- Must: **simple — "Accept invitation" only** (no long form unless the template is meant to have one).
- Must: an **animation after accepting** that fits the theme.
- Must: a guest who already accepted sees the accepted state (uses `hasResponded` / `accepted`), not the button again.
- Must: the guest's name is used (rule 1).

### Rule 9 — Blessings
- Must: a **message box** to send a blessing / wish, greeting the guest by name ("Dear <name>").
- Must: the blessings shown keep the section the same size however many there are (same checks as rule 2).

### Rule 10 — Footer / Thank-you
- Must: **wedding details** (date, place), **couple details** (names), the **guest's name**, a **thank-you message**.
- Anything extra is the developer's choice; don't mark it.

### Rule 11 — Countdown
- Must: a **countdown to the wedding** (computed from the event date in the host's data, not a hard-coded date), or a
  **"Save the date"** style section.

### Good practice (mention only what's clearly off)
- Mobile first: no sideways scroll on a phone width.
- A detail the host left empty hides neatly instead of leaving a blank box.
- Heavy images (several MB) that would slow the page on mobile data.

## 3. Report

Reply in this shape, short and plain. Point to the file (and line when useful) for anything Missing or Partly done,
with a one-line idea of the fix.

```
Template: <name> (<path>)

Done (n)
- Rule 1 Guest name: welcome, RSVP, wishing wall, footer, with "Dear Guest" fallback

Missing (n) — must have
- Rule 2 Wishing wall: all wishes are listed, the section grows with every wish
  (components/WishingWall.tsx:120). Show 6 and add "View all wishes".

Partly done (n)
- Rule 3 Events: no dress code on the cards (components/EventSection.tsx). Add it from the event data.

Recommended (n) — optional
- Rule 3 Save to calendar: one button for all events.

Not applicable (n)
- Rule 7 Our story: birthday template.

Next step: the 2 must-haves above.
```

- Put the count in each heading; leave out a heading that would be empty.
- End with the most important next step.
- If something can't be told from the code (it depends on how the host fills it in), say so instead of guessing.

## 4. Rules for the agent

- **Read-only by default.** Don't change files unless the person asks; then fix only what they asked for and run
  the template again.
- Don't touch the database, the platform code outside the template's folder, or other templates.
- Check the code that runs, not comments or TODOs.
- When a rule is unclear for a template's style, say how you judged it in one line.
