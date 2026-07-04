---
type: reference
title: Design References — units.gr redesign direction
project: futurenostalgia.ca
status: active
created: 2026-07-04
tags: [design, redesign, references, units.gr, aesthetic]
---

# Design References — units.gr direction

Primary aesthetic target for the future.nostalgia redesign. Do **not** lose these.

## Reference links

| What | URL | Why it matters |
|---|---|---|
| **units.gr** — the live site | https://units.gr/ | The aesthetic we're matching. Student-housing brand by Big Horror Athens. |
| **Awwwards feature** | https://www.awwwards.com/sites/units | Site of the Day (2 Jul 2026), 7.33/10. Design rationale, tech stack, credits. |

> ⚠️ Anchor on the **actual pixels**, not text summaries. Early WebFetch/Awwwards
> text descriptions were misleading (said "cream background + big photography" —
> wrong). The real site is a **blue gridded field with floating cream cards**, and
> the hero is a **geometric color graphic, not a photo**. Always look at a real
> screenshot before designing.

## The units.gr design language (from real screenshots)

- **Electric-blue field** (~`#1A66F0`) with a faint white grid overlay. This is the
  page background — the cream is *cards floating on top*, not the base.
- **Big rounded corners everywhere** — outer cards ~40px, modules ~16–18px, pills fully round.
- **Multi-primary pop palette** — blue + yellow + orange + green + purple + red, all
  saturated, at once. Bauhaus / Swiss-grid-meets-pop. NOT a restrained two-color scheme.
- **Heavy BLACK grotesque type**, tight tracking (units uses a bold neutral grotesque;
  our match = Hanken Grotesk 800–900).
- **Left rail of colored nav blocks** — stacked rounded squares, each a different
  bright color, each with a number (01/02/03…) + `↗` arrow + label.
- **Black pill CTAs** with `↗`; outlined pill tags.
- **Green-on-blue feature ticker** bar (marquee of amenities/services).
- **Geometric graphic hero** — a one-point-perspective "tunnel" of colored panels +
  room photos receding to center. Illustration/graphic driven, **not** stock photography.
- Simple **line icons** for feature lists.
- Motion: scrollytelling, hover reveals, WebGL, Lottie, smooth transitions.
- Tech: Contentful CMS, WebGL, Lottie. Credits: Big Horror Athens (PRO) + Georgios Lemonidis.

## How we translate it to future.nostalgia

Take units.gr's **structure**, swap its palette for a **Wes Anderson** register (Josh's call,
2026-07-04 — muted/harmonized fits "future.nostalgia" better than units' bold primaries).

- Keep **Fraunces ONLY for the wordmark** (`future.nostalgia`) + rare italic accents — the
  brand's one custom-font moment. Everything else → heavy grotesque (Hanken 800–900).
- Keep the **floating rounded cards + color-block rail + pill CTAs + feature ticker** structure.
- **Field = warm oat/cream** (not units' electric blue). Cards = soft ivory.
- **Palette = Wes Anderson muted:** dusty rose `#D69B94`, ochre `#DBAA5B`, sage `#9FB088`,
  cadet blue `#8DA9AE`, terracotta `#C1744E` (action color), warm charcoal ink `#3A362D`
  (not pure black). Desaturated, coordinated, vintage.
- Map nav blocks → the four real services (below) + Start a project.

## Real positioning & services (confirmed by Josh, 2026-07-04)

Do NOT reintroduce the old booth-only / events-only framing or invented claims.

- **Positioning:** "A creative studio & marketing agency." NOT "creative studio *for events*."
- **Services (the only four):**
  1. **App development** — apps that market/grow a business (NOT "event-app marketing").
  2. **Content & strategy** — the marketing work is *mainly content and strategy*.
  3. **Analog print booth** — instant prints at events/venues (real; full booth page at `/booth/`).
  4. **Guerrilla / brand activations.**
- **Real tagline (keep):** "what you do now is worth remembering later."
- Killed invented filler: "we run the whole night," "same-day reply," "your event on every border,"
  "app-launch marketing." Don't resurrect.
- Graphic hero = **symmetrical nested frames** in muted tones (Wes symmetry × units geometry;
  "every moment, framed" = booth motif). Optionally a big rounded **real-photo** hero later.
- One **8px spacing scale**, applied everywhere. Dedicated mobile layout is mandatory.
- Retain existing brand assets in `/assets/brand/` (wordmark PNGs, icons).

## Current mockup

- `mockups/home.html` — self-contained **v3**: oat field, Wes muted color rail, ivory cards,
  Hanken grotesque, symmetrical nested-frames graphic, 8px spacing scale, dedicated mobile
  layout. Served by `python3 -m http.server 4173` (`.claude/launch.json`), path `/mockups/home.html`.
  Disposable brainstorm artifact — **not** the live site yet.
- **Open decisions:** (1) fine-tune the Wes palette (which film's register); (2) add a real
  rounded-photo hero using booth photos?

## Build status — 2026-07-04

Branch: **`feat/units-wes-redesign`** (not merged, not committed at time of writing).

- ✅ **Homepage shipped to real files:** `styles.css` (new design system — palette locked to
  **Asteroid City**, all design-review P1–P4 fixes baked in) + `index.html` (honest copy, real
  links, schema/OG, skip-link, footer, cadet top band bookending the ochre contact band).
  Verified desktop + mobile, WCAG AA contrast, visible focus, no console errors.
- 🔒 **`styles-legacy.css`** = frozen copy of the OLD monochrome styles. Only `booth/` links it.
- ⏸️ **`booth/` and `deck/` are DEFERRED** (Josh, 2026-07-04) — pulled out of scope for a
  thorough pass later. Both still exist and function, but are **unlinked from the homepage**.

### Deferred: booth + deck redesign (do thoroughly, own sessions)

- **`booth/index.html`** — analog print-booth landing + Web3Forms booking page. Still on the OLD
  aesthetic (`styles-legacy.css`). Needs a full port into the new card/band language: hero,
  how-it-works (3 steps), why-analog (pullquote + values), ideal-for (chips), the booking form,
  footer. A starter set of booth components was drafted in `styles.css` then reverted — rebuild
  cleanly. When done: re-link `/booth/` from the homepage nav + a "See the booth" CTA + the Print
  booth service card, then delete `styles-legacy.css` if unused.
- **`deck/index.html`** — a **6-slide venue pitch deck** (fixed 1280×720, keyboard nav, progress
  bar, print-to-PDF). It's a *presentation*, not a web page — do NOT force it into the card grid.
  Re-skin only: its self-contained `:root` tokens → Wes palette, font link (Fraunces+Inter →
  Hanken+Fraunces), add radii, keep the slide format + print layout.
