# Room / Space Metaphor — Case Study Section Plan

Case studies presented as a **room or space** the user “enters”: projects are **doors** or **windows**; clicking one opens the case study; back returns to the room. Strong visual metaphor without changing site routing.

---

## 1. Concept

- **One “room” view** as the main case-study section (e.g. “Studio,” “Work,” “Projects”).
- **3–4 projects** shown as **doors**, **windows**, or **frames** in that room—each is a clear clickable entry point.
- **Click** = navigate to the case study page (existing `/projects/[slug]`).
- **Back** from a case study = return to the same room view (existing browser back or link to `/`).
- Optional: **“Next room”** or pagination to show more projects (e.g. 4 per room, “Enter next room” for the rest).

---

## 2. Visual Metaphor Options

### A. Literal room (perspective)
- **Frame:** The section looks like a room interior (e.g. one wall, or isometric corner).
- **Doors/windows:** Each project is a “door” or “window” on the wall—card content (image, title) appears *in* the frame (like a poster or window view).
- **Depth:** Soft perspective or parallax so the room has depth; doors can have slight shadow/frame.
- **Best for:** Strong “enter the studio” vibe; more illustration/art direction.

### B. Flat “room” (grid of frames)
- **No perspective:** Section is a single “wall” or “gallery wall.”
- **Frames:** Each project is a **framed card** (border + optional mat) so it reads as “thing on the wall” rather than a generic grid cell.
- **Layout:** 2×2 or 1×3 or 2+2 (e.g. 4 visible, “View more” or “Next room” for rest).
- **Best for:** Easier to implement; still reads as “space” via framing and copy (e.g. “Step inside” / “Enter”).

### C. Corridor / hallway
- **One horizontal strip:** Projects are “doors” along a corridor (left to right).
- **Scroll or arrows:** User scrolls horizontally (or clicks arrows) to see more “doors”; each door is a project card.
- **Best for:** Linear exploration; “walk down the hall” feeling.

**Recommendation:** Start with **B (flat room / gallery wall)**—framed cards, optional section title like “The studio” or “Step inside”—then add perspective or corridor later if desired.

---

## 3. Layout (Gallery wall)

- **Desktop:** 2×2 grid (4 projects in view) or 1×3 row. Each cell is a **frame** (border + padding) containing the project card content (image, title, one-line description).
- **More than 4 projects:** Either:
  - **Pagination:** “Next room” / “Previous room” shows next 4 (or 3).
  - **Single “View all”** that scrolls or expands to show the rest in a grid below.
  - **Two “walls”:**
    - Wall 1: first 4 projects as frames.
    - “Enter next room” link/button → scroll or route to Wall 2 (next set of projects).
- **Mobile:** 1 column of framed cards, or 2 columns; “Next room” unchanged.

---

## 4. Frame Treatment

- **Frame:** Each project sits inside a **frame** (e.g. 2–4px border, color `var(--grid-line)` or a warm neutral). Optional **mat** (inner padding) so content doesn’t touch the frame.
- **Content:** Same as current card: thumbnail image, title, headline, reading time, short description. Image can be **aspect-ratio** fixed (e.g. 16/10) so all frames feel consistent.
- **Hover:** Frame can get a subtle glow or border color change; card content can lift slightly (shadow) so it feels “selected” before you click.
- **Optional:** Small label under or on the frame (“Case study 01”, “Research”, or project headline).

---

## 5. Section Identity (“The room”)

- **Title:** One heading for the section, e.g. “The studio”, “Step inside”, “Work”, or “Selected projects.”
- **Subtitle (optional):** One line that reinforces the metaphor, e.g. “Pick a door to explore” or “Each frame is a case study.”
- **Background:** Section background can be slightly different from the rest of the page (e.g. one shade darker/lighter, or very subtle texture) so the “room” is clearly one zone. Optional: left/right borders or max-width so the room has “walls.”

---

## 6. Components

| Component | Role |
|-----------|------|
| **RoomSection** (or **CaseStudyRoom**) | Wrapper: section title, optional subtitle, “room” background, grid of frames. Handles pagination if “next room” is used. |
| **RoomFrame** (or **CaseStudyFrame**) | One “door”/frame: border + inner padding (mat), contains Link + card content (image, title, meta, description). Receives `project` and optional `label`. |
| **ProjectCard** | Reuse for *content* only (image, title, text) inside RoomFrame, or a **RoomCard** variant that is slimmer (no extra wrapper styling). |

Recommendation: **RoomFrame** wraps a Link; inside it, reuse the same content structure as ProjectCard (or a **RoomCard** that only does image + title + one line) so the “room” is just a new wrapper and layout.

---

## 7. Navigation / “Next room”

- If **all projects** fit in one view (e.g. 4–6), no “next room” needed.
- If **more than 4 (or 6):**
  - **Option 1 — Pagination:** State: `roomIndex`. “Next room” → show projects `[4,5,6,7]`; “Previous” → show `[0,1,2,3]`. URL can stay `/` or use query `?room=2` for shareability.
  - **Option 2 — Scroll:** First “wall” is 4 frames; below it, “View more” or “Enter next room” scrolls to a second grid with the rest (or expands it).
  - **Option 3 — Second route:** “Enter next room” goes to `/work` or `/projects` with a second “room” view (same component, different project list).

---

## 8. Motion

- **Entering the section:** Section can fade or slide in (e.g. RevealOnScroll). Frames can stagger in (opacity + small y) with spring.
- **Hover on frame:** Slight scale (1.02), shadow increase, optional border/glow; spring transition.
- **Click:** Optional micro-interaction (e.g. frame “opens” with scale 1.02 then navigate); or instant navigate. Back from case study = normal back to home, room is there again.
- **Reduced motion:** No stagger; no hover scale or only opacity change.

---

## 9. Responsive

- **Mobile:** 1 column of framed cards; section title and “next room” (if any) stack above/below.
- **Tablet:** 2 columns.
- **Desktop:** 2×2 (or 1×3) as above. Frames keep consistent padding and aspect so the “wall” stays readable.

---

## 10. File checklist

- [ ] **RoomSection.tsx** (or **CaseStudyRoom.tsx**) — Section wrapper, title, subtitle, background, grid. If pagination: state for `roomIndex`, slice `projects` to show 4 (or 6), render RoomFrame per project. “Next room” / “Previous room” buttons.
- [ ] **RoomFrame.tsx** — Frame (border + mat), Link, inner content (image, title, meta, description). Props: `project`, optional `label` or `index`.
- [ ] **RoomCard.tsx** (optional) — Slim card content for inside the frame (image + title + one line). Or reuse ProjectCard content with different wrapper.
- [ ] **page.tsx** — Replace current case study grid with `<RoomSection projects={...} />`. Pass filtered list (e.g. exclude `coming-soon`).
- [ ] **RevealOnScroll** — Use once for the whole section or for each row of frames; avoid double animation.

---

## 11. Copy suggestions

- Section title: “The studio”, “Step inside”, “Work”, “Selected projects”, “Case studies”.
- Subtitle: “Pick a door to explore”, “Each frame is a case study”, “Click a project to enter”.
- Next room button: “Next room”, “More projects”, “Enter next room”.
- Back (on case study page): Default “Back” or “← Back to studio” linking to `/#work` or `/`.

---

## 12. Optional enhancements (later)

- **Isometric or 3D room:** One wall in perspective; doors recede slightly (CSS transform or illustration).
- **Sound:** Soft “door open” or “click” on frame click (muted, optional, with preference).
- **URL hash:** `/#studio` or `/#work` for the section; “Back to studio” scrolls to that section.
- **One “featured” frame:** Slightly larger or different border for the first project.

This gives you a clear room/space metaphor: one main view (the room), projects as doors/frames, click to enter the case study, back returns to the room—with optional “next room” for more projects.
