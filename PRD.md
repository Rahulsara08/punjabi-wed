# Product Requirements Document

## Working Title: "Phulkari" (ਫੁਲਕਾਰੀ): A Minimal Punjabi Wedding Invitation Template
*(Phulkari = "flower-work", the hand-stitched embroidery of Punjab that a bride traditionally receives from her mother and nani. Swap for the couple's own site name.)*

**Owner:** Rahul
**Doc status:** v1 draft
**Date:** October 2026

---

## 1. Overview

A single-page, mobile-first, animated wedding invitation website for a **North Indian, mainly Punjabi, wedding**. The guest scrolls through one continuous story: a stitched seal opens, a veiled invitation card is unveiled, then the couple's story, the family, every Punjabi *rasam* from Mehndi to Doli, the gallery, RSVP, blessings, venue, contacts, and a quiet closing note.

The look is **minimal and pure**: warm ivory cloth, lots of empty space, and a single thread of colour. Punjabi weddings are loud and joyful, and the site gives that energy room by staying calm itself. The one visual idea carried through the whole page is **the stitch**, a running line of embroidery (the darning stitch used in phulkari) that sews itself across the page. Each section uses the stitch differently, so the page holds together without repeating itself.

Because this is a **template**, every piece of copy (names, dates, rituals, venues, family names, contacts, story) lives in one content config, and a single switch (`ceremony: "anandKaraj" | "phere"`) adapts the site for a **Sikh (Anand Karaj)** or a **Hindu Punjabi (Phere)** wedding.

---

## 2. Goals & Non-Goals

**Goals**
- **Minimal and pure:** ivory background, at most 3 colours on screen at once, one motif per section, generous whitespace, slow and quiet motion.
- **Authentically Punjabi:** real ritual names (Maiyan, Jaggo, Chooda, Kaleere, Sehrabandi, Milni, Anand Karaj, Doli), each explained in one line for guests who don't know them, with Gurmukhi accents used as fixed decorative phrases.
- **Every section looks and moves differently.** Section 7.0 has a matrix that enforces this.
- **Scroll-first storytelling.** Taps are only for required actions (Open Invitation, RSVP, Blessing, Call/WhatsApp).
- **Template-ready:** re-skin for another couple by editing one file.
- **Easy for guests:** any guest, from a 19-year-old cousin to an 80-year-old Biji, can find *when, where, what to wear, and who to call* within 10 seconds.

**Non-goals (v1)**
- No admin/CMS dashboard. Content is edited in a config file.
- No payment, gift registry, or UPI *shagun* collection (possible v2, needs family sign-off).
- No full language toggle. Gurmukhi and Hindi phrases are fixed accents, not a translation layer.
- No native app. It's a responsive web link, shared mainly on WhatsApp.
- No autoplay music or video. An optional dhol/shehnai loop stays **off by default**.

---

## 3. Theme Selection

The theme is the most important decision in this PRD, so here is how it was chosen, with examples, so you can re-run the choice for a different couple.

### 3.1 Theme options considered

| # | Theme | Mood | Palette | Signature motif | Signature animation | Best for |
|---|---|---|---|---|---|---|
| **A** | **Phulkari** *(recommended)* | Heirloom, handmade, warm | Ivory cloth + one maroon thread + silk gold | Geometric phulkari *bagh* star, running-stitch lines | Lines that **stitch themselves** in dashes | Any Punjabi wedding, Sikh or Hindu. The most Punjabi and the most minimal at the same time |
| B | **Sarson da Khet** (mustard fields) | Spring, rural, sunny | Ivory + mustard yellow + soft field green | Mustard flowers, open fields, a lone *kikar* tree | Flowers sway, fields scroll in parallax | Feb–March (Basant season) weddings, farmhouse venues |
| C | **Noor** (light) | Spiritual, serene, all-white | White + ivory + pale gold | Diya flame, soft light rays | Light slowly brightening on scroll | Very traditional or small, gurdwara-only weddings |
| D | **Haveli** | Royal, architectural | Sandstone + deep teal + brass | Jharokha arches, *jaali* screens | Arches open like doors | Palace and heritage-hotel venues (drifts toward Rajasthani) |

### 3.2 Why Phulkari wins (decision example)

Score each theme 1–5 against the brief:

| Criterion (weight) | A Phulkari | B Sarson | C Noor | D Haveli |
|---|---|---|---|---|
| Recognisably **Punjabi** (×3) | 5 | 4 | 2 | 2 |
| Can stay **minimal & pure** (×3) | 5 | 3 | 5 | 2 |
| One motif that **animates well** (×2) | 5 | 4 | 3 | 3 |
| Works for **Sikh and Hindu** families (×2) | 5 | 5 | 4 | 4 |
| Doesn't feel like any existing template (×1) | 5 | 3 | 3 | 2 |
| **Weighted total** (max 55) | **55** | 42 | 38 | 27 |

**How to re-use this for another couple:** list 3–4 candidate themes, score them on the same five criteria, and adjust the weights to what the couple cares about (for example, raise "Doesn't feel like a template" for a design-conscious couple). The winner sets the palette, motif, and signature animation; everything else in this PRD stays the same.

### 3.3 Minimalism rules (the "ornament budget")

These rules exist so the site never turns into a busy wedding card:

1. **One motif per section.** A section gets the stitch *or* a floral corner *or* an illustration, never all three.
2. **Max 3 colours visible at once:** ivory plus two others.
3. **One animation per section.** Every section has exactly one signature motion (see 7.0). Secondary motion is limited to plain fades.
4. **Whitespace is a feature.** Section padding is 72px on mobile and 120px on desktop. Never fill empty space just because it's there.
5. **Text over decoration.** If an ornament competes with information (time, venue, dress code), remove the ornament.
6. **No hard shadows, no gradients on text, no glitter.** Soft paper shadows only (≤ 8% opacity).

---

## 4. Visual Design System

### 4.1 Palette (Phulkari)

| Role | Name | Hex | Use |
|---|---|---|---|
| Background | Khaddar Ivory | `#F7F2E8` | Page background, with a subtle hand-woven cloth texture (≤ 4% opacity) |
| Surface | Malmal White | `#FCF9F3` | The few cards that exist (Invitation, Countdown, RSVP) |
| Body ink | Charcoal Brown | `#2E2622` | All body text (≈ 13:1 on ivory) |
| Heading ink | Phulkari Maroon | `#7A1F1F` | Headings, couple names, the stitch thread |
| Accent (decorative) | Pat Silk Gold | `#C08A2E` | Hairlines, stitch highlights, icons. **Decorative only, not for text** |
| Accent (text-safe gold) | Deep Gold | `#8A5E1C` | Eyebrow labels and small gold text (passes 4.5:1) |
| Tint 1 | Sarson Cream | `#F3E3B5` | Blessing notes, Maiyan highlight |
| Tint 2 | Gulabi Dust | `#EFD9D3` | Blessing notes, RSVP accept state |

**Examples of correct and wrong use**
- ✅ Maroon heading "Saadi Kahaani" on ivory, with a gold hairline divider below.
- ✅ Gold stitch line drawing the timeline, with charcoal text next to it.
- ❌ Gold text for a time like "10:00 AM" (fails contrast; use charcoal).
- ❌ Maroon + gold + yellow + pink all in one viewport (breaks the 3-colour rule).

### 4.2 Typography

| Role | Font | Example |
|---|---|---|
| Couple names, headings | **Cormorant Garamond** (500–600) | *Simran & Arjun* |
| Script accent (sparingly) | **Pinyon Script** | *with love* (max one use per section) |
| Body | **Jost** (300–400) | "Join us as we begin our forever." |
| Eyebrow labels | Jost, uppercase, +0.2em tracking, 12px | `DAY II · THE JAGGO NIGHT` |
| Gurmukhi accents | **Noto Serif Gurmukhi** | ਜੀ ਆਇਆਂ ਨੂੰ |
| Devanagari accents (Hindu Punjabi) | **Tiro Devanagari Hindi** | ॥ श्री गणेशाय नमः ॥ |

All fonts come from Google Fonts with `font-display: swap`, subset to the characters actually used.

### 4.3 Motifs & texture

- **The stitch:** a dashed "running stitch" line (dash 6px, gap 4px, rounded caps) in maroon or gold. This is the core motif.
- **Bagh star:** the 8-point geometric phulkari star, drawn with stitch lines only and never filled solid.
- **Single-line ritual icons:** one consistent stroke weight (1.5px) for mehndi cone, dholki, gagar with diyas (Jaggo), chooda, kaleera, sehra, ghodi, doli, and so on (full list in 7.6).
- **Cloth texture:** faint khaddar weave on the background, never on text.
- **Five rivers:** a faint watercolour of five flowing lines (Punjab = *panj-aab*, "five waters"), used **once**, behind the Final Love Note only.

### 4.4 Religious and cultural sensitivity rules

- **Never** depict Sri Guru Granth Sahib Ji, the Golden Temple, or Gurus as decoration, background, or in any animation.
- The invocation (ੴ or ॥ श्री गणेशाय नमः ॥) appears **once**, small and static, at the top of the Invitation card. It is never animated, never in confetti, and never in a loader.
- The Anand Karaj event card states etiquette plainly: head covered, shoes removed, no alcohol or tobacco.
- Ritual explanations are written respectfully and checked by the family before launch.

---

## 5. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js (React) + TypeScript, static export | Fast, free to host, easy to template |
| Styling | Tailwind CSS (palette as CSS variables/tokens) | Pairs with shadcn/ui and Skiper UI; re-skin = change tokens |
| Components | shadcn/ui base + Skiper UI + Watermelon UI (restyled) | Copy-into-repo components you own and recolour |
| Element animation | Framer Motion | Entrances, staggers, the veil lift, the RSVP states |
| Scroll animation | GSAP + ScrollTrigger | Scrubbed effects: the stitch timeline, hero parallax, clothesline |
| Celebration | canvas-confetti (custom shapes: marigold petal, bagh star, heart) | RSVP accept moment |
| Data | **Supabase** (recommended) or Google Sheets via Apps Script | Supabase gives a real dashboard + row-level security; Sheets is free and fine for one wedding |
| Hosting | Vercel | Free tier, previews, image optimisation |
| Optional 3D | three.js via `@react-three/fiber` | Only a faint floating-thread particle field behind the Preloader. Gated on WebGL support, skipped under reduced motion and on low-end devices |

**Component mapping (from the Mayura v1 research; verify slugs before installing)**

| Component | Use it for |
|---|---|
| `@skiper-ui/skiper19`: SVG follow scroll | Base for the **stitch timeline** in Events |
| `@skiper-ui/skiper37`: Animated number | Base for the **rolling digits** in Countdown |
| `@skiper-ui/skiper30`: Oliver Parallax | **Gallery** multi-column parallax |
| `@skiper-ui/skiper40`: CssLink | Link and button micro-interactions: "Get Directions", "View Full Gallery →", RSVP buttons, Call/WhatsApp |
| `@skiper-ui/skiper29`: Siena parallax | Reference base for the **Hero** layers (simplified to 2–3 layers) |
| `@skiper-ui/skiper08/09`: preloaders | Timing and exit reference for the Preloader |
| Watermelon UI `card-split-accordian` | Base for the **Venue** "How to reach" expandable card |

---

## 6. Information Architecture (Section Order)

| # | Section | Punjabi label (accent) | Meaning |
|---|---|---|---|
| 0 | Preloader & Stitched Seal | — | — |
| 1 | Invitation Card ("Open Invitation") | ਜੀ ਆਇਆਂ ਨੂੰ · *Ji Aayan Nu* | Welcome |
| 2 | Hero (scroll parallax) | ਸ਼ੁਭ ਵਿਆਹ · *Shubh Viah* | Auspicious wedding |
| 3 | Countdown | ਬਸ ਕੁਝ ਦਿਨ ਹੋਰ · *Bas Kujh Din Hor* | Just a few more days |
| 4 | Our Story | ਸਾਡੀ ਕਹਾਣੀ · *Saadi Kahaani* | Our story |
| 5 | Family Union | ਸਾਡਾ ਪਰਿਵਾਰ · *Saada Parivaar* | Our family |
| 6 | Events & Rituals | ਰਸਮਾਂ · *Rasmaan* | The rituals |
| 7 | Gallery | ਯਾਦਾਂ · *Yaadan* | Memories |
| 8 | RSVP | ਤੁਸੀਂ ਆ ਰਹੇ ਹੋ? · *Tusi Aa Rahe Ho?* | Are you coming? |
| 9 | Blessings Wall | ਅਸੀਸ · *Asees* | Blessings |
| 10 | Venue | ਕਿੱਥੇ · *Kithe* | Where |
| 11 | **Contact Details** *(new)* | ਗੱਲ ਕਰੋ · *Gall Karo* | Talk to us |
| 12 | Closing (Thank You + Save the Date + Replay) | ਧੰਨਵਾਦ · *Dhanvaad* | Thank you |
| 13 | Final Love Note | ਪਿਆਰ ਨਾਲ · *Pyaar Naal* | With love |

Each label is shown small in Gurmukhi above the English heading. For a Hindu Punjabi family the same labels can be shown in Devanagari via config (`accentScript: "gurmukhi" | "devanagari" | "none"`).

---

## 7. Section-by-Section Specs

### 7.0 Uniqueness matrix (no two sections move alike)

| # | Section | Signature motion | Layout pattern |
|---|---|---|---|
| 0 | Preloader | Bagh star **stitches itself**, then the folded cloth **unfolds** | Full-bleed centred |
| 1 | Invitation | Sheer **chunni (veil) lifts** off the card | Single centred card |
| 2 | Hero | **Layered parallax** + slow zoom | Full-height layers |
| 3 | Countdown | Digits **roll vertically** like an odometer | Framed card, 4 cells |
| 4 | Our Story | Polaroids **swing in on a clothesline** with wooden clips | Horizontal string of photos |
| 5 | Family Union | **Line-by-line ink fade** (the calmest section) | Two text columns, no containers |
| 6 | Events | Stitch line **sews down the page** as you scroll; icons pop | Central vertical timeline |
| 7 | Gallery | Columns **drift at different speeds** | Multi-column masonry |
| 8 | RSVP | Card **flips** to the reply side; petals + confetti on accept | Single card, two faces |
| 9 | Blessings | Notes **hang and sway** from a thread like kaleere | Hanging strings |
| 10 | Venue | Line-art venue **draws itself** stroke by stroke | Illustration + info stack |
| 11 | Contact | Rows **slide in from alternating sides** (bride left, groom right) | Plain list rows |
| 12 | Closing | A few marigold petals **drift down** in a loop | Centred block |
| 13 | Love Note | Handwriting **writes itself** over the five-rivers wash | Full-bleed, no UI |

---

### 0. Preloader & Stitched Seal

- **Layout:** Full-bleed ivory screen. In the centre, an 8-point **bagh star** in maroon stitch, with the couple's initials in Cormorant inside a thin gold circle: **S ✦ A**.
- **Animation:**
  1. The star's outline is *stitched*: dashes appear one after another along the path (animate `stroke-dashoffset` on a dashed path, ~1.4s), as if a needle is running through cloth.
  2. Initials fade in and the gold ring closes (0.4s).
  3. **Exit:** the screen behaves like a folded phulkari dupatta. Two halves fold outward (a CSS 3D `rotateY` on two panels) and reveal the Invitation card underneath (0.6s).
- **Tech notes:** Masks the loading of hero and fonts. Tap anywhere after 1s to skip. Optional three.js floating-thread particles behind the star (progressive enhancement only).
- **Content fields:** `coupleInitials`, `weddingHashtag?` (e.g. `#SimArjKaViah`).
- **Example copy:** none besides the initials. Silence is the point.
- **Acceptance:** Total ≤ 2.5s; 60fps on mid-range Android; under `prefers-reduced-motion` the star appears fully drawn and cross-fades out.

---

### 1. Invitation Card ("Open Invitation")

- **Layout:** A single centred card on ivory:
  - Invocation, small and static: **ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ** (Anand Karaj) or **॥ श्री गणेशाय नमः ॥** (Phere)
  - Gurmukhi welcome: **ਜੀ ਆਇਆਂ ਨੂੰ**
  - Greeting: *"Dear Gill Parivaar,"* (from the personalised link) or *"Dearest Guest,"*
  - Line: *"With the blessings of Waheguru and our elders, you are warmly invited"* (Phere version: *"With the blessings of the Almighty and our elders…"*)
  - Couple names: **Simran** *weds* **Arjun**
  - Date: **Sunday, 21 February 2027 · Amritsar**
  - "Open Invitation" pill button (maroon outline, gold hover)
- **Animation:** The card sits under a **sheer, softly translucent chunni** (a CSS layer with a faint phulkari border at its edge). The text is readable but dimmed. On tap, the chunni **lifts upward and drifts off-screen** (Framer Motion, slight skew to feel like fabric), echoing the *Chunni Chadana* ritual. The button has a slow 3s breathing glow.
- **Interaction:** Scroll is locked until "Open Invitation" is tapped.
- **Personalised link examples:**
  - `?to=Gill+Parivaar` → *"Dear Gill Parivaar,"*
  - `?to=Priya&n=2` → *"Dear Priya,"* and RSVP pre-fills 2 guests
  - Family invites get the word **"Saprivaar"** (with family): *"You and your family are invited."*
- **Content fields:** `invocation` (auto from `ceremony`), `greetingLine`, `coupleNames`, `weddingDate`, `city`, `guestName?`, `partySize?`.
- **Acceptance:** Works with or without a guest name; the button is visible without scrolling at 360×640; names with special characters are sanitised before display.

---

### 2. Hero (Scroll Parallax)

- **Layout:** Full-height section with 3 layers:
  1. **Back:** soft watercolour of a mustard field at dawn (Sarson) or the couple's photo, desaturated warm.
  2. **Middle:** a thin phulkari border frame that fades in.
  3. **Front:** *Shubh Viah* (Gurmukhi, small), **Simran & Arjun**, tagline *"Two hearts, one thread."*, and a small stitched arrow as a scroll cue.
- **Animation:** Back layer moves at 0.4× scroll speed, front at 1× (GSAP ScrollTrigger `scrub`). The back layer also does a slow 1.0 → 1.08 Ken Burns zoom. The stitched arrow re-stitches itself every 4s.
- **Tech notes:** No `background-attachment: fixed` (breaks iOS). Hero image is AVIF/WebP, < 250KB, responsive `srcset`, with reserved dimensions so there is no layout shift.
- **Content fields:** `heroImage`, `coupleNames`, `tagline`.
- **Example taglines:** *"Two hearts, one thread."* · *"Stitched together, forever."* · *"Ik safar, do dil."*
- **Acceptance:** LCP element < 2.5s on 4G; parallax disabled under reduced motion (static image).

---

### 3. Countdown (Bas Kujh Din Hor)

- **Layout:** A framed card styled like a small embroidered sampler. A thin stitch border with one bagh star at each corner. Heading in Cormorant: **"Counting the days"**, Gurmukhi accent above. Four cells: **Din · Ghante · Minat · Second** (Days · Hours · Minutes · Seconds), English label below each in small caps, separated by tiny stitched crosses (✕).
- **Animation:** Digits **roll vertically** like an odometer when they change (based on `skiper37`). Every 6s a gold glint runs along the stitch border once. The card fades up on arrival.
- **Tech notes:** Computed client-side from an ISO datetime in `Asia/Kolkata`. Render a skeleton until hydrated (no server/client mismatch). The target is the **main ceremony** (Anand Karaj / Phere) time.
- **States:**
  - Before: live countdown
  - Day of: **"Ajj Viah Hai!"** *(Today is the wedding!)*
  - After: **"Viah ho gaya, thank you for the blessings"** + link to Gallery
- **Content fields:** `mainCeremonyDateTime`.
- **Acceptance:** Accurate to the second, no drift after the tab sleeps (recompute from `Date.now()`, don't decrement).

---

### 4. Our Story (Saadi Kahaani)

- **Layout:** A **clothesline**, the string of fairy lights that hangs in every Punjabi wedding house. A thin thread crosses the section; polaroid photos hang from it with small wooden clips. Each polaroid has a photo, chapter number (*I, II, III…*), title, year/place, and 2–3 sentences below.
  - Mobile: the line runs horizontally and the guest **swipes** through chapters (snap scrolling).
  - Desktop: the line sags gently across, showing 3 photos at a time.
- **Animation:** As each polaroid enters, it **swings in** from a slight angle (±8°) and settles with a damped pendulum (Framer spring). The thread's fairy-light dots twinkle very faintly.
- **Example chapters:**
  1. *"Where It Began"*, 2019 · Chandigarh: "A borrowed umbrella outside Sector 17, and a coffee that turned into three hours."
  2. *"The First Lohri Together"*, 2021: "He learnt the boliyan. Badly. Her family loved him anyway."
  3. *"The Roka"*, 2025: "Two families, one table full of mithai, and a lot of happy tears."
  4. *"Forever Begins"*, 2027: "And now, with your blessings, we tie the knot."
- **Content fields:** `chapters[] → { photo, number, title, year, place?, story }`.
- **Acceptance:** 3–6 chapters without layout break; all photos cropped 4:5; swipe works with touch, trackpad, and arrow keys.

---

### 5. Family Union (Saada Parivaar)

*Text only, with no cards, borders, or shadows.*

- **Layout:** Directly on the ivory background:
  - Opening line (centred, script): *"Vaddeyan di asees naal"* (ਵੱਡਿਆਂ ਦੀ ਅਸੀਸ ਨਾਲ, with the blessings of our elders)
  - Two columns (stacked on mobile):
    - **The Bride's Family:** *Grand-daughter of* Late S. Gurdev Singh & Sardarni Harbans Kaur · *Daughter of* **S. Harpreet Singh & Sardarni Manjeet Kaur** · warm line: *"Our Simran, our heartbeat."*
    - **The Groom's Family:** *Grandson of* Sh. Om Prakash Malhotra & Smt. Kamla Malhotra · *Son of* **Sh. Rajiv Malhotra & Smt. Neelam Malhotra** · warm line: *"Our Arjun, our pride."*
  - Between the columns: a single short vertical **stitch line** (not a box).
  - Closing line: *"…request the pleasure of your company, saprivaar."*
- **Honorific examples (configurable):** Sikh: *S. / Sardar, Sardarni*; Hindu Punjabi: *Sh. / Smt.*; mixed families can use different ones per side. Deceased elders are prefixed *"Late"* or shown with *"in loving memory"* (family's choice).
- **Animation:** The calmest section on the page. Each line fades from 0 to 1 opacity, 120ms apart, as if ink is soaking into cloth. No movement, no scale.
- **Content fields:** `blessingLine`, `brideFamily { grandparents?, parents, line }`, `groomFamily { … }`, `honorificStyle`.
- **Acceptance:** Zero visual containers; hierarchy readable from type alone; contrast passes on ivory.

---

### 6. Events & Rituals (Rasmaan)

The heart of the site. Every *rasam* gets its name in Punjabi + English, a one-line explanation for guests who don't know it, the time, the venue, and what to wear.

#### 6.1 Layout
- Grouped by day with an eyebrow label: `DAY I · FRIDAY, 19 FEB`.
- Each event is a **node** on a central vertical line: a circular single-line icon, event name (Cormorant) with its Gurmukhi name small beside it, a one-line *"What happens"*, time + venue chip (tap → maps), and a **dress-code swatch** (small colour dots + one line).
- A small **"ⓘ About this rasam"** toggle expands 2–3 more sentences, for guests from outside Punjabi culture.
- Events marked `private: true` (family only) are shown only on links with `?inner=1`.

#### 6.2 Animation (key requirement)
- One continuous **stitch line** runs down the centre and connects every event. As the user scrolls, the stitch **sews itself in solid maroon** up to the current scroll position, and a tiny gold **needle** leads the line. The rest of the path ahead shows as a faint dotted guide.
- Implementation: an SVG path with a dashed `stroke-dasharray` pattern, revealed with a clip-path/mask whose height is bound to scroll progress (GSAP ScrollTrigger `scrub`). Base it on `skiper19`. A plain dashoffset reveal would distort the dash pattern; the mask keeps the stitches crisp.
- When the needle reaches a node, its icon **pops** (scale 0.8 → 1.05 → 1) and the dress-code dots fill in.

#### 6.3 Sample event schedule (Anand Karaj version)

**Day I · Friday, 19 February 2027**

| Event | Gurmukhi | What happens (one line) | Time & place | Dress code | Icon |
|---|---|---|---|---|---|
| **Sukhmani Sahib Path** | ਸੁਖਮਨੀ ਸਾਹਿਬ ਪਾਠ | A prayer at home to seek blessings before the festivities begin, followed by langar. | 9:00 AM · Bride's home | Modest, head covered | Diya |
| **Mehndi** | ਮਹਿੰਦੀ | Henna for the bride and the ladies, with music and laughter all afternoon. | 2:00 PM · Bride's home | Greens & yellows | Mehndi cone |
| **Ladies Sangeet** | ਲੇਡੀਜ਼ ਸੰਗੀਤ | Dholki, giddha and boliyan: the women of both families sing and tease. | 7:00 PM · Kesar Bagh lawns | Bright & festive | Dholki |

**Day II · Saturday, 20 February 2027**

| Event | Gurmukhi | What happens | Time & place | Dress code | Icon |
|---|---|---|---|---|---|
| **Maiyan / Vatna** | ਮਾਈਆਂ / ਵਟਣਾ | Turmeric paste (vatna) is applied to bride and groom at their own homes for glow and good luck. On the groom's side, his *bhabhi* fills a *gharoli* (pitcher) for his bath. | 10:00 AM · Both homes | Yellow, clothes you don't mind staining | Bowl of vatna |
| **Jaggo** | ਜਾਗੋ | The night-long "wake up!" party: a decorated *gagar* (pot) lit with diyas is carried on the head, everyone dances through the lanes with a *khoonda* (stick). | 9:00 PM · Kesar Bagh | Punjabi suits, kurta-pajama, phulkari dupatta | Gagar with diyas |

**Day III · Sunday, 21 February 2027: The Wedding**

| Event | Gurmukhi | What happens | Time & place | Dress code | Icon |
|---|---|---|---|---|---|
| **Chooda & Kaleere** | ਚੂੜਾ ਤੇ ਕਲੀਰੇ | The bride's *mama* (maternal uncle) gives her the red-and-ivory chooda; golden kaleere are tied to it. Shaken over unmarried girls: whoever they fall on marries next! | 6:30 AM · Bride's home | Family only *(private)* | Bangles |
| **Sehrabandi & Ghodi** | ਸਿਹਰਾਬੰਦੀ ਤੇ ਘੋੜੀ | The groom's sehra is tied, his sister feeds the mare, and he rides out to bring his bride home. | 7:30 AM · Groom's home | Festive | Sehra / mare |
| **Baraat & Milni** | ਬਰਾਤ ਤੇ ਮਿਲਣੀ | The baraat arrives with dhol; elders of both families embrace and exchange shagun, starting with the fathers. | 9:00 AM · Gurdwara gate | Pastels | Two garlands |
| **Anand Karaj** | ਅਨੰਦ ਕਾਰਜ | The holy union: four *Laavan* around Sri Guru Granth Sahib Ji, each with its own hymn. | 10:00 AM · Gurdwara Sahib | Head covered for all, shoes removed, modest attire, no alcohol or tobacco | Four-loop circle |
| **Lunch & Juta Chupai** | ਜੁੱਤੀ ਛੁਪਾਈ | Lunch, and the bride's sisters hide the groom's shoes. Negotiations get serious. | 1:00 PM · Kesar Bagh | — | Juttis |
| **Doli** | ਡੋਲੀ | The emotional farewell: the bride throws *phulliyan* (puffed rice) over her head toward her home, wishing it prosperity. | 4:00 PM · Kesar Bagh | — | Doli |
| **Reception** | ਰਿਸੈਪਸ਼ਨ | Dinner, bhangra, and the newlyweds' first evening as one. | 8:00 PM · The Grand Ballroom | Formal / Indo-western | String of lights |

**Phere (Hindu Punjabi) variant:** swap *Sukhmani Sahib Path* → *Ganesh / Mata ki Chowki*, *Anand Karaj* → **Phere** (seven rounds around the sacred fire, often in the evening/night). Etiquette line becomes *"Modest attire; the ceremony may run late into the night."* Every other rasam stays the same.

#### 6.4 Ritual glossary (for the "About this rasam" toggles)

Not all of these appear as events; pre-wedding rituals are mentioned in Our Story or the glossary.

| Rasam | When | Short meaning |
|---|---|---|
| **Roka** | Months before | The families formally "stop" searching; the match is fixed with blessings and mithai |
| **Thaka** | Before engagement | The bride's family visits the groom's to formally accept him (often merged with Roka) |
| **Chunni Chadana** | Engagement | The groom's mother drapes a red chunni over the bride's head, welcoming her into the family |
| **Kurmai / Mangni** | Engagement | Ring ceremony; the groom's family gives shagun and gifts |
| **Path** | Days before | Prayer at home: Akhand Path, Sukhmani Sahib, or Mata ki Chowki |
| **Mehndi** | 1–2 days before | Henna; the darker the colour, the more love (so they say) |
| **Ladies Sangeet** | Evening before | Dholki, giddha, boliyan, the family's best dancers |
| **Maiyan / Vatna** | Day before | Turmeric paste ritual; the couple doesn't leave home until the wedding after this |
| **Gharoli** | Day before | The groom's bhabhi fills a pitcher from the gurdwara/well for his ceremonial bath |
| **Jaggo** | Night before | "Wake up!": a lit gagar procession to announce the wedding to the neighbourhood |
| **Chooda** | Wedding morning | The mama gives the bride her chooda, purified in milk and rose petals |
| **Kaleere** | Wedding morning | Golden ornaments tied to the chooda by friends and sisters |
| **Sehrabandi** | Wedding morning | Tying the sehra (floral or beaded veil) on the groom's turban |
| **Ghodi Chadna** | Wedding morning | The groom mounts the mare; his sister feeds it and receives a gift |
| **Baraat** | Wedding | The groom's procession with dhol and bhangra |
| **Milni** | Wedding | Matching relatives of both families embrace and exchange gifts |
| **Anand Karaj / Phere** | Wedding | The ceremony itself: four Laavan (Sikh) or seven Phere (Hindu) |
| **Juta Chupai** | After ceremony | Shoe-stealing by the bride's sisters for a "ransom" |
| **Doli / Vidaai** | After ceremony | The bride departs her parental home |
| **Paani Vaarna** | Arrival at groom's home | The groom's mother circles water over the couple's heads and sips it, warding off evil *(family only)* |
| **Phera Pauna** | Day after | The couple visits the bride's family for the first time as husband and wife *(family only)* |

- **Tech notes:** Recalculate the path on resize and orientation change. Keep ≤ 2 animated elements per viewport.
- **Content fields:** `days[] → { dateLabel, events[] → { id, name, gurmukhiName, icon, whatHappens, about?, startTime, endTime?, venueId, dressCode { colors[], note }, private? } }`.
- **Acceptance:** The stitch stays pixel-aligned to every node at 360px, 768px, and 1280px; smooth on touch and trackpad; private events never render in the public HTML.

---

### 7. Gallery (Yaadan)

- **Layout:** Two sub-galleries with a small toggle: **"Kudi de Pal"** *(The Bride's Moments)* and **"Munde de Pal"** *(The Groom's Moments)*, plus an optional **"Saathi"** *(Together)* set. Each is a 2-column (mobile) / 3-column (desktop) parallax masonry. Photos have a thin ivory mat and a 1px gold hairline: no heavy frames.
- **Animation:** Based on `skiper30` (Oliver Parallax): columns drift at 0.9×, 1.1×, 1.0× scroll speed. Switching the toggle cross-fades the sets. "View Full Gallery →" uses `skiper40` for an underline that stitches itself in.
- **Tech notes:** Lazy-load everything below the fold; blur-up placeholders; code-split this section. Accessible lightbox with focus trap, ←/→/Esc, swipe, and alt text on every image.
- **Content fields:** `brideGallery[]`, `groomGallery[]`, `togetherGallery[]?` → `{ src, alt, width, height }`.
- **Acceptance:** Initial gallery payload < 600KB; works fully with keyboard and touch.

---

### 8. RSVP (Tusi Aa Rahe Ho?)

- **Layout:** One card with two faces.
  - **Front:** *"Tusi aa rahe ho?"* + *"Will you join us?"*, guest name (pre-filled from the link, editable), and two buttons:
    - **"Haanji, zaroor!"** *(Yes, of course!)*, filled maroon
    - **"Maaf karna, iss vaari nahi"** *(Sorry, not this time)*, outline
  - Accept reveals: number of guests (stepper, capped by `partySize`), **which events** (checkbox chips: Mehndi, Sangeet, Jaggo, Anand Karaj, Reception), food preference (*Veg · Jain · No onion-garlic · Non-veg · Other*), *"Need help with stay/travel?"* toggle, and an optional note.
- **Animation:**
  - **Accept:** the card **flips** (3D `rotateY`) to its back face: *"Bas fir, milde aan!"* *(Then we'll see you there!)*. Simultaneously a short burst of canvas-confetti in **marigold petals, small bagh stars, and hearts** (palette: maroon, gold, sarson, gulabi), plus a few hearts floating up.
  - **Decline:** the card flips gently to *"Tuhaadi kami mehsoos hovegi. Your blessings mean the world."* No confetti.
  - Buttons use `skiper40` micro-interactions on hover/press.
- **Tech notes:** Idempotent submission (client UUID + disabled button while sending). If offline, the answer is queued locally with a *"We'll send this when you're back online"* note and a retry. Reduced motion: no flip, no confetti, just a cross-fade.
- **Stored fields:** `{ id, inviteCode?, name, attending, guestCount, events[], foodPreference, needsStay, note, createdAt }`.
- **Acceptance:** Name required; guest count 1–`partySize`; duplicate taps never create duplicate rows; the guest can change their answer later from the same link (upsert by `inviteCode`).

---

### 9. Blessings Wall (Asees)

- **Layout:** At the top, a simple input with no notebook graphic: a single underlined field *"Apni asees likho…"* (Write your blessing…), a name field, a live counter (`0/250`), and a **"Asees Bhejo"** *(Send Blessing)* button. Below, blessings **hang from three or four horizontal threads** like kaleere hanging from a chooda: small notes in Sarson Cream or Gulabi Dust, each hung on a short gold string, italic Cormorant text, signed *"— Biji, Ludhiana"*. Notes alternate heights for a loose, handmade rhythm.
- **Animation:** Notes **sway** very slightly (±1.5°, staggered, 5–7s loops) like kaleere moving. A new blessing **drops down on its string**, bounces once, and settles into place. When off-screen, the sway pauses (IntersectionObserver).
- **Example blessings (placeholder seed):**
  - *"Rabb tuhaanu sada khush rakhe."* (May God keep you happy always) — Nani ji
  - *"Arjun, she's way out of your league. Hold on tight!"* — Rohan (college)
  - *"Jodi salamat rahe."* (May the pair stay blessed) — Kaur Aunty, Jalandhar
- **Tech notes:** Same backend as RSVP. Honeypot field + 250-character limit + simple rate limit (1 per minute per device). Optional moderation: notes appear instantly for the sender but publicly only after `approved = true` (config switch). Load the latest 30, "Show more asees" for the rest.
- **Stored fields:** `{ id, name, place?, message, colorVariant, approved, createdAt }`.
- **Acceptance:** New blessing appears without reload; empty or too-long input shows a gentle inline message; emoji and Gurmukhi/Devanagari text render correctly.

---

### 10. Venue (Kithe)

- **Layout:** Eyebrow `THE VENUE` → venue name in Cormorant → a two-line description → **line-art illustration** of the venue (same single-stroke style as the icons) → info chips (📍 area, 🕘 timing) → **"Get Directions"** button → an italic insider tip → an expandable **"Kiven pahunchna"** *(How to reach)* card: by air, by train, by road.
  - Supports **multiple venues** (Gurdwara + Farmhouse + Ballroom) as a simple segmented switch above the illustration.
- **Example content:**
  - **Kesar Bagh Farmhouse** · GT Road, Amritsar · *"A quiet mustard-field farmhouse 20 minutes from the city."*
  - Insider tip: *"Park at Gate 2; the Jaggo starts from the back lawns."*
  - **By air:** Sri Guru Ram Dass Jee International Airport (ATQ), ~35 min drive · **By train:** Amritsar Junction (ASR), ~25 min · **By road:** ~4.5 hrs from Chandigarh via NH-3.
  - Gurdwara tip: *"Head coverings (rumaals) will be available at the entrance."*
- **Animation:** The illustration **draws itself** stroke by stroke (SVG `stroke-dashoffset`, solid lines here, not stitches, so it reads differently from the Events timeline), then chips and button fade in beneath it, staggered. The "How to reach" card opens with Watermelon UI's `card-split-accordian` behaviour.
- **Tech notes:** The directions link uses a universal Google Maps URL (`https://www.google.com/maps/dir/?api=1&destination=…`), which opens the native app on Android and iOS. Don't embed a live map iframe by default (heavy); show a "View map" link instead.
- **Content fields:** `venues[] → { id, name, address, description, hours?, mapLink, insiderTip?, artwork, travel { air?, train?, road? } }`.
- **Acceptance:** Map opens the native maps app on mobile; illustration is an inline SVG (< 40KB) with a text alternative.

---

### 11. Contact Details (Gall Karo) *(new section)*

Guests at Punjabi weddings call a person, not a website. This section shows exactly who to call for what.

- **Layout:** No cards. A heading *"Kisi cheez di lodd hove taan, gall karo"* *(If you need anything, just call)*, then two short lists side by side (stacked on mobile): **Bride's side** and **Groom's side**. Each row is:
  - **Name** (Cormorant), relation in small caps (*Bride's Brother*), and what to ask them about (*Stay & travel*)
  - Two icon buttons on the right: **📞 Call** (`tel:`) and **WhatsApp** (`https://wa.me/<number>?text=…`, pre-filled with *"Sat Sri Akal ji! I have a question about Simran & Arjun's wedding."*)
  - Thin gold hairline between rows
- **Example rows:**

  | Side | Name | Relation | Ask about | Languages |
  |---|---|---|---|---|
  | Bride | Gurpreet Singh | Brother | Stay, airport pickup | Punjabi, Hindi, English |
  | Bride | Jasleen Kaur | Cousin | Mehndi & Sangeet | Punjabi, English |
  | Groom | Karan Malhotra | Brother | Baraat, transport | Hindi, Punjabi, English |
  | Groom | Neha Malhotra | Sister | Anything else | Hindi, English |

- Optional extras: a **hotel/hospitality desk** row (hotel name + front-desk number) and a single line *"Best time to call: 10 AM – 9 PM"*.
- **Animation:** Rows **slide in from their own side**: bride's rows from the left, groom's from the right, 80ms apart. Call/WhatsApp icons do a tiny "ring" wiggle on hover. No other motion.
- **Privacy & safety:**
  - Only list people who have **agreed** to be listed.
  - Numbers aren't in plain HTML: they are assembled client-side on tap, so simple scrapers can't harvest them, and they are never put in OG/meta tags.
  - The whole site is `noindex` (it's a private invite, not a public page).
- **Content fields:** `contacts[] → { name, relation, side: "bride" | "groom" | "venue", askAbout, phone, whatsapp?, languages?[], hours? }`.
- **Acceptance:** Tap-to-call and WhatsApp open correctly on Android and iOS; the layout holds with 2–8 contacts; each row's text is readable without the icons (for screen readers: *"Call Gurpreet Singh, Bride's brother"*).

---

### 12. Closing (Dhanvaad)

- **Layout:** A centred block on ivory:
  - *"Dhanvaad"* in Gurmukhi, then a short thank-you: *"Your presence is the most precious shagun. Thank you for being part of our story."* — Simran & Arjun
  - **"Add to Calendar"** (one main ceremony event, or all public events) → `.ics` download + Google Calendar link
  - **"Leave an Asees"** → scrolls to the Blessings section
  - **"Replay Invitation"** → scrolls to top, re-locks scroll, and replays the Preloader + chunni veil
- **Animation:** 4–6 **marigold petals** drift slowly down the section in a loop (CSS transforms, low count). Buttons lift 2px on hover.
- **Content fields:** `closingMessage`, `calendarEvents[]` (generated from `days[]`, filtered by `private`).
- **Acceptance:** `.ics` opens correctly in iOS Calendar, Google Calendar (Android), and Outlook; times include the `Asia/Kolkata` timezone; replay fully resets lock state and scroll position.

---

### 13. Final Love Note (Pyaar Naal)

- **Layout:** A last, quiet, full-bleed section. In the background, a very faint watercolour of **five flowing river lines** (the *panj-aab* of Punjab). In the centre, a short handwritten-style note:
  > *"From two homes, two families, two hearts, now one. See you at the wedding.*
  > *Pyaar naal, Simran & Arjun"*
- **Animation:** The note **writes itself** (an SVG handwriting path or a masked text reveal, ~3s) when it enters the view. Nothing else moves.
- **Content fields:** `signOffMessage`, `coupleNames`, `showRivers` (default `true`).
- **Acceptance:** No buttons, links, or interactive elements: a deliberate, calm end.

---

## 8. Non-Functional Requirements

- **Performance:** LCP < 2.5s on 4G; total page weight ≤ 3MB (lighter than v1 thanks to line-art over photos); Gallery and three.js code-split; AVIF/WebP images; fonts subset and `swap`; ≤ 2 concurrent animations per viewport.
- **Accessibility:** `prefers-reduced-motion` fallback for **every** animation in 7.0; charcoal body text on ivory (no gold body text); alt text on all images; all forms and the lightbox keyboard-navigable; tap targets ≥ 44px; `lang` attributes on Gurmukhi (`pa`) and Devanagari (`hi`) phrases so screen readers pronounce them correctly.
- **Responsive:** Primary target is mobile portrait 360–430px. On desktop keep a centred column of about 640px, except Hero, Gallery, and Love Note, which may go full-bleed.
- **Elder-friendly:** Base font size 17px, times in 12-hour format with AM/PM, no information hidden behind hover only.
- **Sharing (WhatsApp first):** Open Graph image 1200×630 (couple names + date on ivory with a single bagh star), title *"Simran & Arjun · 21 Feb 2027"*, description *"You're invited to our wedding in Amritsar."*
- **Privacy:** `noindex, nofollow`; personalised links never expose other guests' data; RSVP data readable only by the couple (Supabase row-level security).

---

## 9. Data Model

| Table | Fields | Access |
|---|---|---|
| `rsvps` | id, invite_code, name, attending, guest_count, events (text[]), food_preference, needs_stay, note, created_at, updated_at | Anyone can insert/upsert their own row; only the owner can read |
| `blessings` | id, name, place, message (≤ 250), color_variant, approved, created_at | Anyone can insert; public can read where `approved = true` |

Contacts, events, and venues live in the content config, not the database.

---

## 10. Template / Reusability Strategy

All copy, images, and switches live in one file: `content/wedding.ts`. A trimmed example:

```ts
export const wedding = {
  ceremony: "anandKaraj",            // "anandKaraj" | "phere"
  accentScript: "gurmukhi",          // "gurmukhi" | "devanagari" | "none"
  theme: "phulkari",                 // "phulkari" | "sarson" | "noor"
  couple: { bride: "Simran", groom: "Arjun", initials: "S ✦ A" },
  hashtag: "#SimArjKaViah",
  mainCeremonyDateTime: "2027-02-21T10:00:00+05:30",
  city: "Amritsar",
  tagline: "Two hearts, one thread.",
  families: {
    bride: { parents: "S. Harpreet Singh & Sardarni Manjeet Kaur", line: "Our Simran, our heartbeat." },
    groom: { parents: "Sh. Rajiv Malhotra & Smt. Neelam Malhotra", line: "Our Arjun, our pride." },
  },
  days: [
    {
      dateLabel: "Day I · Friday, 19 Feb",
      events: [
        {
          id: "mehndi", name: "Mehndi", gurmukhiName: "ਮਹਿੰਦੀ", icon: "mehndi-cone",
          whatHappens: "Henna for the bride and the ladies, with music all afternoon.",
          startTime: "2027-02-19T14:00:00+05:30", venueId: "bride-home",
          dressCode: { colors: ["#5E7D3A", "#E2B93B"], note: "Greens & yellows" },
        },
      ],
    },
  ],
  contacts: [
    { name: "Gurpreet Singh", relation: "Bride's Brother", side: "bride",
      askAbout: "Stay, airport pickup", phone: "+91XXXXXXXXXX", languages: ["Punjabi", "Hindi", "English"] },
  ],
};
```

**Theme tokens** live separately in `theme/phulkari.css` (colours, fonts, stitch dash size). Switching `theme` swaps the token file and the motif set. Layout and logic never change.

---

## 11. Success Metrics

| Metric | Target |
|---|---|
| "Open Invitation" tap-through | ≥ 85% of visitors |
| RSVP completion (of invited parties) | ≥ 70% before the RSVP deadline |
| Average scroll depth | ≥ 75% (reaches Venue) |
| Blessings submitted | ≥ 1 per 5 guests |
| Contact taps (Call/WhatsApp) | Tracked; a spike means info is missing somewhere |
| WhatsApp shares | Tracked through `?ref=` on shared links |

---

## 12. Planning: Step by Step

### 12.1 Content collection checklist (get this from the family first)

- [ ] Couple names, initials, hashtag, tagline (pick from 3 options)
- [ ] Ceremony type: Anand Karaj or Phere
- [ ] Grandparents' and parents' names, honorifics, "Late" preferences
- [ ] Final list of rasmaan, with exact times, venues, and which are family-only
- [ ] Dress code per event (colours + one line)
- [ ] All venues: name, address, Google Maps link, insider tip, travel info
- [ ] 3–6 story chapters with one photo each
- [ ] 10–20 gallery photos per side (high-res, with consent)
- [ ] 2–4 contacts per side who **agreed** to be listed, with their "ask about"
- [ ] Hotel/hospitality desk details (if any)
- [ ] RSVP deadline and max party size per invite
- [ ] Guest list for personalised links (name / family name + party size)
- [ ] Family review of ritual descriptions (cultural accuracy)

### 12.2 Build phases

| Phase | What | Output | Est. |
|---|---|---|---|
| 1. Foundations | Next.js + Tailwind setup, Phulkari theme tokens, fonts, `wedding.ts` with sample content | Running skeleton | 1 day |
| 2. Static sections | All 14 sections built with real layout and content, **no animation** | Complete readable site | 3 days |
| 3. Art | Bagh star, stitch path, ritual icons, venue line-art, five-rivers wash, OG image | SVG asset set | 2 days |
| 4. Motion pass | Each section's signature animation from 7.0, one at a time, with reduced-motion fallbacks | Animated site | 3–4 days |
| 5. Data | Supabase tables + RLS, RSVP (upsert, offline queue), Blessings (moderation), personalised links | Working forms | 2 days |
| 6. Components | Skiper/Watermelon integration and re-theming (Gallery, links, digits, venue card) | Polished UI | 1–2 days |
| 7. QA | Accessibility, performance budget, real devices (low-end Android, iPhone, an elder's phone), `.ics` checks, WhatsApp preview | Launch-ready | 2 days |
| 8. Launch | Deploy to Vercel, custom domain, generate personalised links, family soft-launch, then send | Live | 1 day |

### 12.3 Pre-launch QA checklist

- [ ] Every section passes the reduced-motion test
- [ ] Stitch timeline aligned at 360 / 390 / 768 / 1280px
- [ ] Countdown correct in IST, and from a phone set to another timezone
- [ ] RSVP: accept, decline, change answer, offline, double-tap
- [ ] Blessings: Gurmukhi text, emoji, 250-char limit, spam honeypot
- [ ] Call + WhatsApp buttons on Android and iOS
- [ ] `.ics` on iOS, Android, Outlook
- [ ] WhatsApp link preview shows the right image and names
- [ ] Private events hidden on public links
- [ ] Family has proofread every name and ritual

---

## 13. Open Questions

1. **Backend:** Supabase (dashboard, recommended) or Google Sheets (zero cost)?
2. **Ceremony type** for the first couple: Anand Karaj, Phere, or both (some families do both)?
3. **Language accents:** Gurmukhi, Devanagari, or both side by side?
4. **Blessing moderation:** show instantly, or approve first?
5. **Music:** include an optional dhol/shehnai toggle (off by default), or no audio at all?
6. **Private events:** use an `?inner=1` link for close family, or skip private events entirely?
7. **Venue illustrations:** generate placeholders now, or wait for confirmed venues?
8. **Component slugs:** Skiper UI and Watermelon UI slugs come from earlier research and should be re-verified before installing.

---

## Appendix A: What changed from the Mayura PRD

| Area | Mayura (v1) | Phulkari (this PRD) |
|---|---|---|
| Culture | Vrindavan / Radha-Krishna | North Indian Punjabi, Sikh or Hindu |
| Theme | Green peacock & nature | Ivory cloth, one maroon thread, silk gold |
| Core motif | Peacock feather line art | The running stitch + bagh star |
| Opening | Seal + curtain part | Stitched star + folded dupatta unfolds + chunni veil lift |
| Events | Haldi · Mehndi · Sangeet · Wedding | Path · Mehndi · Sangeet · Maiyan · Jaggo · Chooda & Kaleere · Sehrabandi · Baraat & Milni · Anand Karaj/Phere · Juta Chupai · Doli · Reception |
| Timeline | Gold line drawing down | Stitch line sewn by a needle |
| Story | Card stack | Polaroids on a fairy-light clothesline |
| Blessings | Pinned sticky notes | Notes hanging and swaying like kaleere |
| Closing motif | Ganga watercolour | Five rivers of Punjab (panj-aab) |
| New | — | **Contact Details** section, ritual glossary, ceremony switch, per-event RSVP, private events, elder-friendly rules |
