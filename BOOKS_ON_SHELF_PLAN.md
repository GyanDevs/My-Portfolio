# Books on Shelf — Case Study Section Plan

Case studies shown as **books on a shelf**: each project is a **book spine** in a horizontal row (or rows). Click a spine to "pull it out" and open the case study. Strong metaphor: "Choose a book from the shelf."

---

## 1. Concept

- **Shelf:** One or more horizontal "shelves" (wood or neutral bar) with books standing side by side.
- **Books:** Each case study is a **book spine** — narrow vertical strip showing title (and optional thumbnail strip or color accent).
- **Interaction:** Hover = spine tilts or lifts slightly (like pulling a book); click = navigate to `/projects/[id]`.
- **Filter:** Exclude `coming-soon` or show as a placeholder spine ("Coming soon").

---

## 2. Visual Design

### Shelf surface
- **Option A — Wood:** Warm wood-like gradient or texture (`#c4a77d`, `#8b7355`, or similar); subtle grain or noise.
- **Option B — Minimal:** Neutral bar (`bg-neutral-200` / `dark:bg-neutral-700`) with a thin top edge to read as "shelf lip."
- **Option C — Match site:** Use `border-[var(--grid-line)]` and a light fill; clean, consistent with existing design.

### Book spine
- **Shape:** Tall narrow rectangle (e.g. 40–60px wide × 200–280px tall, or responsive). Rounded inner corners where spine meets "pages" (optional).
- **Content on spine:**
  - **Title** — primary; rotated 90° (vertical text) or horizontal if spine is wide enough. Font: bold, readable.
  - **Optional:** Thin strip of project thumbnail (gradient or cropped image) as "cover preview."
  - **Optional:** Headline or reading time in smaller type.
- **Spine treatment:**
  - Slight gradient or solid color per project (could derive from thumbnail or use a small palette).
  - Optional **depth** — left edge darker for 3D effect; right edge lighter.
  - **Shadow** between spines so they read as separate books.
  - **Hover:** Spine lifts/tilts forward (translateY -4px, rotate -2°) + stronger shadow.

### Section identity
- **Title (optional):** "Case studies" or "Pick a book" above the shelf.
- **Background:** Section can have a slightly different tone (e.g. warm shelf wall) so the shelf reads as a distinct zone.

---

## 3. Layout

- **Desktop:** 6 books in a single row on one shelf. Shelf spans full width; books distribute evenly or with slight irregular spacing (like real shelves).
- **Tablet:** Same row; may need horizontal scroll if spacing is tight, or 2 rows of 3.
- **Mobile:** Horizontal scroll (scroll-snap optional) so user swipes through spines; or 2 columns of 3 rows (smaller spines).
- **Gap:** Small gap (4–8px) between spines so they read as separate books. Or no gap with shadow/depth to separate.

---

## 4. Components

| Component | Role |
|-----------|------|
| **BookshelfSection** (or **CaseStudyShelf**) | Wrapper: section title, shelf background, container for BookSpine components. |
| **BookSpine** | One book: Link wrapper, spine visual (gradient/solid + optional image strip), vertical or horizontal title. Receives `project` and `index`. Hover: lift/tilt. Click: navigate. |
| **ProjectCard** | Not used in shelf view; BookSpine is a separate presentation. Content comes from project (title, headline, thumbnail for strip). |

---

## 5. Spine Dimensions

- **Width:** 48–64px per spine (desktop); ~36–44px on tablet; ~40px on mobile with scroll.
- **Height:** 220–280px (consistent across spines so shelf looks uniform).
- **Aspect:** Portrait (taller than wide), like a real book spine.

---

## 6. Text on Spine

- **Vertical text:** Use CSS `writing-mode: vertical-rl` or `transform: rotate(-90deg)` so title reads bottom-to-top when spine is narrow.
- **Alternative:** If spines are wide enough, keep title horizontal; truncate with ellipsis if long.
- **Font:** Bold, uppercase or mixed; ensure readability at small size.

---

## 7. Motion

- **Page load:** Spines stagger in (opacity 0 → 1, optional small y) with spring; or all at once.
- **Hover:**
  - Spine: `translateY(-4px)` and `rotateX` or `rotate(-2deg)` for "pulling out"; shadow increases.
  - Transition: spring (e.g. Framer Motion) for responsive feel.
- **Active/click:** Slight scale down (0.98) for press feedback; then navigate.
- **Reduced motion:** No hover lift/tilt; only opacity change on hover.

---

## 8. Responsive

| Breakpoint | Layout | Spine width |
|------------|--------|-------------|
| Mobile | Horizontal scroll, 1 row | ~40px |
| Tablet | 1 row, 6 spines or 2×3 | ~50px |
| Desktop | 1 row, 6 spines | ~56–64px |

If 6 spines don't fit in one row, wrap to 2 rows or enable horizontal scroll.

---

## 9. File Checklist

- [ ] **BookshelfSection.tsx** — Section wrapper: title, shelf bar (wood or neutral), flex/grid of BookSpine. Maps over `projects` (filter coming-soon).
- [ ] **BookSpine.tsx** — Link + spine visual: gradient or color, optional thumbnail strip, title (vertical or horizontal). Hover lift/tilt. Props: `project`, `index`.
- [ ] **page.tsx** — Replace case study grid with `<BookshelfSection projects={projects} />`.
- [ ] **RevealOnScroll** — Wrap whole section once for scroll-triggered entrance.

---

## 10. Optional Enhancements (later)

- **Spine colors:** Derive from project thumbnail (dominant color) or assign from a small palette (1 color per project).
- **Shelf depth:** 3D-style shelf with back wall and lip; spines "sit" in the shelf.
- **Book pull animation:** On click, spine could animate "pulling out" (scale up, brief delay) before navigation.
- **"Featured" spine:** Slightly taller or different color for one project.
- **Sound:** Optional soft "page turn" or "book slide" on hover (muted, with preference).

---

## Summary

| Item | Choice |
|------|--------|
| **Metaphor** | Books on a shelf |
| **Unit** | Book spine (narrow vertical strip) |
| **Content per spine** | Title (vertical) + optional thumbnail strip / color |
| **Interaction** | Hover = lift/tilt; click = go to case study |
| **Layout** | Horizontal row(s); horizontal scroll on mobile |
| **Components** | BookshelfSection, BookSpine |
