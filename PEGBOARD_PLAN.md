# Pegboard Case Study Section — Plan

Case studies shown as **cards pinned to a pegboard**: one clear “board” surface with pins and slight rotation so it feels hand-placed and explorable.

---

## 1. Concept

- **Board:** One section that reads as a physical board (cork, fabric, or soft grid).
- **Cards:** Each case study is a card that looks **pinned** (pin/thumbtack at top, optional corner fold or shadow).
- **Placement:** Cards sit in a grid but with **small random rotation** and optional **slight offset** so they feel manually pinned, not aligned.
- **Interaction:** Hover = card “lifts” off the board (shadow, slight scale); click = go to case study.

---

## 2. Visual Design

### Board surface
- **Option A — Cork/fabric:** Warm neutral background (`#d4c4a8`, `#e8dcc8`, or similar) with subtle texture (noise, or a tiled cork image at low opacity). Border or drop shadow so the section reads as “one board.”
- **Option B — Minimal:** Same as today’s `bg-background` with a very light grid or dot pattern so it reads as “board” without literal cork.
- **Option C — Align with site:** Use `var(--grid-line)` to draw a soft grid behind the cards; cards sit “on top” of this grid like on a board.

### Pin treatment
- **Per card:** A small “pin” at the **top centre** (or top-left) of the card:
  - Simple: small circle (e.g. 8–12px) with a tiny highlight, or a minimal SVG thumbtack.
  - Pin color: neutral (gray) or one accent so it’s visible on both light/dark.
- Pin stays **fixed to the board** in the metaphor: on hover, the *card* lifts; the pin can stay in place (card slides up a bit from the pin) or move with the card—either is fine.

### Card style
- Keep current content: thumbnail, title, headline, reading time, description snippet.
- Add:
  - **Shadow** so the card reads as a layer above the board (stronger on hover).
  - **Slight rotation** per card (e.g. -2° to +2°), either random per index or from a small list so it’s deterministic.
  - Optional: **folded corner** (small triangle) at one corner for a “note” feel; not required.

---

## 3. Layout

- **Underlying structure:** CSS Grid (e.g. 2 cols on tablet, 3 on desktop) so layout stays predictable and accessible.
- **Per card:** Apply inline (or data-driven) **transform: rotate(...)** and optionally **translate** (e.g. 2–4px in x/y) so cards feel slightly scattered.
- **Gap:** Slightly larger gap than current (e.g. 24–32px) so the board doesn’t feel cramped; cards have “air” between them.
- **Filter:** Exclude `coming-soon` or show it as a pinned “Coming soon” placeholder card.

---

## 4. Components

| Component | Role |
|-----------|------|
| **PegboardSection** (or **CaseStudyPegboard**) | Wrapper for the whole block: board background, optional title (“Work” / “Case studies”), grid container. |
| **PegboardCard** | Wrapper around card content: renders the **pin** (absolute at top), applies **rotation/offset**, and **shadow**. Can wrap existing `ProjectCard` content or a slim duplicate (image + title + meta + description). Styled so the card clearly sits “on” the board. |
| **ProjectCard** | Reuse as-is for *content* (link, image, text), or copy its content into PegboardCard and style for the pinned look. |

Recommendation: **PegboardCard** contains the pin + rotation + shadow and wraps the same Link + content as ProjectCard (or a slimmer variant). No need to change `ProjectCard` itself if you prefer to keep it for other uses.

---

## 5. Rotation / offset (deterministic)

- Use a **small array** of rotations, e.g. `[-1.5, 1, -2, 0.5, 1.5, -0.5]` (degrees), and use `index % length` so each card gets a repeatable tilt.
- Optional: same for **translate** (e.g. 0, 4px, -4px in x and y) so cards aren’t perfectly aligned. Keep values small so the grid still reads.

---

## 6. Motion

- **Page load:** Cards stagger in (e.g. opacity 0 → 1, optional small y) with spring; rotation already applied so they “land” on the board.
- **Hover:**
  - Card: slight **scale** (e.g. 1.02) and **translateY(-4px)** (or -6px); **shadow** increases so it clearly “lifts.”
  - Pin: can stay fixed (card moves up from it) or move with card; both work.
  - Use **spring** transition (e.g. Framer Motion or CSS) so it feels responsive.
- **Active/click:** Slight scale down (e.g. 0.98) for press feedback.
- **Reduced motion:** No rotation/offset if `prefers-reduced-motion`; no hover lift, or only opacity change.

---

## 7. Responsive

- **Mobile:** Single column; rotation can be reduced or zero so it doesn’t feel messy on small screens.
- **Tablet / desktop:** 2–3 columns, rotation and gap as above.
- Board background and pin treatment stay the same across breakpoints.

---

## 8. File checklist

- [ ] **PegboardSection.tsx** (or **CaseStudyPegboard.tsx**) — Board wrapper: background, grid, optional section title. Maps over `projects` and renders PegboardCard for each.
- [ ] **PegboardCard.tsx** — Pin visual + rotation/offset + shadow; wraps Link + card content (reuse or mirror ProjectCard content). Receives `project` and `index` (for rotation).
- [ ] **page.tsx** — Replace current case study grid with `<PegboardSection projects={...} />`. Pass filtered list (e.g. exclude `coming-soon`).
- [ ] **RevealOnScroll** — Either wrap the whole pegboard once for “board” entrance, or use stagger inside PegboardSection; avoid double animation on the same element.
- [ ] **Styles** — Board background (and optional texture) in Tailwind or a small CSS block. Ensure contrast for pin and card text on the board.

---

## 9. Optional enhancements (later)

- **Board frame:** Border or inner shadow so the board has clear edges.
- **Section label:** Small label like “Pinned” or “Case studies” in a corner of the board.
- **One “featured” pin:** Slightly larger card or different pin color for the first (or one) project.
- **Sound:** Soft “pin” or “paper” sound on hover (muted, optional, with preference).

This gives you a clear pegboard metaphor: one board, cards pinned with rotation and shadow, hover to lift, click to open—without changing your project data or routing.
