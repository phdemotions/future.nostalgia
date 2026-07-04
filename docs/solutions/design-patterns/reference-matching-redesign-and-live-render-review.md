---
module: futurenostalgia-web
date: 2026-07-04
problem_type: design_pattern
component: development_workflow
severity: medium
applies_when:
  - "Redesigning a site to closely match a reference/inspiration site's aesthetic"
  - "Running a polish or design-review pass on frontend spacing, alignment, contrast, and a11y"
  - "Building static HTML/CSS marketing pages that must hold together as a composition"
related_components:
  - documentation
  - tooling
tags:
  - frontend-design
  - design-review
  - accessibility
  - progressive-enhancement
  - css
  - preview-tools
---

# Reference-matching redesign + live-render design review

A repeatable methodology for redesigning a site to closely match a reference
site, then polishing it to an award-grade, zero-defect bar. Learned building the
`future.nostalgia` homepage to match [units.gr](https://units.gr) (branch
`feat/units-wes-redesign`, commit `d25abb8`).

## Context

The task was "make my site look very close to units.gr." The first mockup was
built from **text descriptions** of units.gr — a `WebFetch` summary (small model)
plus the Awwwards writeup. Both described it as "cream background, big lifestyle
photography, clean sans." That produced a cream-editorial mockup with stock
photos — which the user immediately rejected: *"not even close… what are you
anchoring on?"*

The real units.gr (seen once a screenshot was provided) is the near-opposite:
an **electric-blue gridded field** with **floating cream cards**, a **geometric
color graphic** (not a photo), heavy black grotesque type. The text descriptions
had produced a confidently wrong mental model.

## Guidance

Five practices, in order of how much pain they save:

**1. Anchor on real pixels, never on text descriptions.**
For any "match this site" task, get an actual **screenshot of the target before
designing**. WebFetch's markdown/small-model summaries and even human writeups
(Awwwards) routinely mischaracterize layout, color field, and photo-vs-graphic.
If a browser tool is unavailable, ask the user for 2–3 screenshots (hero, a mid
section, footer) rather than guessing.

**2. Separate structure from palette.**
Take the reference's **structure** (layout grid, component shapes, corner radii,
type scale, motion) and swap the **palette** to fit the brand. Here: units.gr's
floating-card + color-rail + pill + bookend-band *structure*, re-colored to a
muted "Wes Anderson" (Asteroid City) palette. The user wanted "very close to
units" *and* "my own colors" — structure/palette separation delivers both.

**3. Compose holistically — sections relate, they aren't polished in isolation.**
A polish pass that optimizes each card individually can destroy the composition.
De-echoing the page removed a top ticker band — which was the only horizontal
element binding the top row, leaving the logo and CTA as two islands over dead
space while a strong contact band anchored the bottom. Fix: **bookend** — a
colored top band mirroring the colored bottom band, framing the neutral card
grid between them. Always screenshot and judge the **whole page**, not just the
element you touched.

**4. Design-review against the live render, with parallel independent lenses.**
Don't eyeball screenshots for spacing/contrast. **Measure the live DOM** for
exact pixels (bottom-alignment deltas, gap consistency, overflow, computed
contrast ratios), and run **independent reviewer lenses in parallel** — one for
spacing/alignment, one for contrast/a11y. Then fix **root causes** (design
tokens), not per-element symptoms. This caught: no `:focus-visible` anywhere,
opacity-dimmed text failing AA, off-scale magic numbers, uneven mobile rows.

**5. Bake in the non-negotiables** (the difference between award-grade and
amateur):
- **WCAG AA contrast**, verified by computing ratios — not by eye. Never dim
  text with `opacity` (it silently clips AA); darken the token instead.
- **Visible keyboard focus** on every control, on any background.
- **Progressive enhancement**: content must be visible with JS off; gate the
  hidden-then-reveal state behind a `.js` class.
- **No JS dependency for core visuals**: build decorative graphics as static
  HTML/CSS, not JS-injected DOM.

## Why This Matters

- **Wrong anchor = wasted iterations + lost trust.** One screenshot up front
  would have skipped an entire rejected mockup.
- **Holistic gaps read as "unfinished."** A page can pass every element-level
  check and still not hold together; the composition is its own review axis.
- **The a11y/PE fixes are load-bearing.** They are invisible when present and
  glaring when absent (keyboard users lost, contact form hidden if JS fails).

## When to Apply

- Reference/inspiration-matching redesigns.
- Any "polish this to a high bar" or "nothing P4 or worse" frontend pass.
- Static-site builds where you control the whole design system.

## Examples

**Preview-tool gotcha — measure only after a paint.** After navigating the
preview with `location.href = ...`, `document.documentElement.clientWidth` reads
**0** until a paint forces layout, so every element looks like it overflows and
the mobile breakpoint (`<820px`) falsely activates. Take a **screenshot first**
(it forces real layout at the true viewport), *then* measure.

```js
// After reload, this returns garbage (innerWidth === 0):
document.documentElement.scrollWidth - document.documentElement.clientWidth  // 298 (false)
// Screenshot the page, THEN re-run — now it's correct:
// overflowX === 0, gutters 34/34, navHeights all equal.
```

**Contrast: darken the token, don't dim with opacity.**

```css
/* before — cream on terracotta ≈ 3.14:1 (fails AA); desc dimmed to .8 also fails */
--terra:#C1744E;
.nav__desc{ color:var(--on-accent); opacity:.8; }   /* 3.8–4.2:1 ✗ */

/* after — darken token + drop opacity → 5.12:1 and 5.3–6.3:1 ✓ */
--terra:#A5522C;
.nav__desc{ color:var(--on-accent); }                /* opaque */
```

**Progressive-enhancement reveal (visible with JS off):**

```css
.js .reveal{ opacity:0; transform:translateY(16px); transition:.6s; }
.js .reveal.in{ opacity:1; transform:none; }
```
```js
document.documentElement.classList.add("js");        // only then is content hidden-then-revealed
```

**Focus ring that works on any background (light cards, ink, terracotta):**

```css
a:focus-visible, button:focus-visible{
  outline:none;
  box-shadow:0 0 0 3px var(--field), 0 0 0 5px var(--ink);  /* two-tone: shows everywhere */
}
```

**Deterministic card composition** (avoid `margin-top:auto` + `padding-top`
fighting each other): center the content block and attach the eyebrow to the
headline instead of pinning it to the top with an uncontrolled gap.
