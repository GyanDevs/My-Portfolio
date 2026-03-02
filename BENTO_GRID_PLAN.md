# Bento Grid Plan: Case Study Showcase

Replace the current 6-block uniform grid with an asymmetric **bento grid** for the case study section. This plan is implementation-ready and aligned with the Kinetic Craft motion philosophy.

---

## 1. Goal

- **Current:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` — all cards equal (1×1).
- **Target:** Bento layout with mixed cell sizes (1×1, 2×1, 1×2) so some case studies are visually featured; staggered motion and spring-based hover.

---

## 2. Bento Layout Definition

Use a **single CSS Grid** with explicit row/column spans. One possible layout for 6 items (desktop):

```
+--------+--------+--------+
|   A    |   B    |   C    |
|  1×1   |  1×1   |  1×1   |
+--------+--------+--------+
|      D       |     E     |
|     2×1      |    1×1    |
+-------------+--------+---+
|      F      |   (or F 1×2)
|     2×1     |
+-------------+
```

**Alternative (more dramatic):**

```
+-------------+--------+
|      A      |   B    |
|     2×1     |  1×1   |
+------+------+--------+
|  C   |  D   |   E    |
| 1×1  | 1×1  |  1×1   |
+------+------+--------+
|           F          |
|         2×1         |
+----------------------+
```

**Recommendation:** Define a **layout template** (array of `{ rowSpan, colSpan }`) and optionally allow `projects.json` to assign size per project, or map by index (e.g. first = large, rest mixed).

---

## 3. Data Model

**Option A — Layout by index (no JSON change)**  
- In code, define something like: `const bentoSizes = [{ rowSpan: 1, colSpan: 2 }, { rowSpan: 1, colSpan: 1 }, … ];`  
- Map `projects[i]` → `bentoSizes[i % bentoSizes.length]` (or a fixed 6-length array).

**Option B — Explicit size in data (recommended for control)**  
- Add optional field to each project in `projects.json`:
  - `bento?: "small" | "wide" | "tall"`  
  - Or `bento?: { rowSpan: number; colSpan: number }`  
- "small" = 1×1, "wide" = 2×1, "tall" = 1×2.  
- If missing, default to 1×1.

**Filter:** Exclude `id === "coming-soon"` from the bento grid (or show it as a 1×1 placeholder).

---

## 4. Component Structure

| File | Responsibility |
|------|----------------|
| `app/page.tsx` | Replace current case-study grid with `<BentoCaseStudyGrid projects={...} />`. |
| `src/components/BentoCaseStudyGrid.tsx` | **New.** Renders the grid wrapper + computes span per project. Uses Framer Motion for stagger. |
| `src/components/ProjectCard.tsx` | **Extend.** Accept optional `rowSpan` and `colSpan` (or `size: "small" | "wide" | "tall"`). Card content can adapt: e.g. wide = image left, text right; tall = larger image. |
| Or `src/components/BentoProjectCard.tsx` | **Alternative.** New card variant used only in bento grid; keeps `ProjectCard` unchanged for reuse elsewhere. |

**Recommendation:** Add a **BentoProjectCard** that wraps or extends the same content as ProjectCard but applies span classes and optional layout variants (wide/tall). Keeps ProjectCard untouched for other uses.

---

## 5. Layout Implementation (CSS)

- **Grid container:**  
  `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4` (or 3 columns; 4 gives more flexibility for 2×1 spans).  
- **Cell spans:**  
  `row-span-1 col-span-1`, `row-span-1 col-span-2`, `row-span-2 col-span-1` via Tailwind.  
- **Gap / borders:**  
  Keep `gap-[1px]` and `bg-[var(--grid-line)]` so borders between cards stay consistent with the rest of the site.  
- **Responsive:**  
  - **Mobile:** Single column; all cards `col-span-1 row-span-1` (stacked).  
  - **Tablet (md):** 2 columns; wide = 2×1, tall = 1×2, small = 1×1.  
  - **Desktop (lg):** Full bento as defined above.

---

## 6. Motion (Kinetic Craft–aligned)

- **Staggered entry:**  
  Each card gets `initial={{ opacity: 0, y: 24 }}` and `animate={{ opacity: 1, y: 0 }}` with `transition: { type: "spring", stiffness: 260, damping: 32 }` and `delay: index * 60` (or 80).  
- **Hover:**  
  Slight scale (e.g. `scale: 1.02`) and/or lift (translateY -2px) with spring; existing grayscale → color and image scale can stay.  
- **Active/press:**  
  `active:scale-[0.98]` (already on ProjectCard); keep it.  
- **Reduced motion:**  
  Use `useReducedMotion()`; when true, skip stagger and use `opacity: 0 → 1` only (no y), and disable or simplify hover scale.  
- **No cursor-driven state in React:**  
  If you add glow later, drive it via CSS variables and a single global listener (per motion skill), not `useState` for mouse position.

---

## 7. Responsive Summary

| Breakpoint | Columns | Wide (2×1) | Tall (1×2) | Small (1×1) |
|------------|---------|------------|------------|-------------|
| Default    | 1       | col-span-1 | col-span-1 | col-span-1  |
| md         | 2       | col-span-2 | row-span-2 | col-span-1  |
| lg         | 3 or 4  | col-span-2 | row-span-2 | col-span-1  |

On small screens, everything stacks; no row-span-2 to avoid awkward tall gaps.

---

## 8. File Change Checklist

- [ ] **projects.json** — (Optional) Add `bento` field to one or more projects for "wide" or "tall".
- [ ] **BentoCaseStudyGrid.tsx** — New component: grid + map over projects, compute span, wrap each in motion.div with stagger; render BentoProjectCard.
- [ ] **BentoProjectCard.tsx** — New component: accepts `project`, `colSpan`, `rowSpan`, and optionally `size`. Renders same content as ProjectCard (image, title, description, meta) with layout variants for wide/tall; applies `col-span-*` / `row-span-*` and hover/active styles.
- [ ] **page.tsx** — Replace the case study section: use `<BentoCaseStudyGrid projects={projects.filter(p => p.id !== "coming-soon")} />` (or include coming-soon as 1×1).
- [ ] **RevealOnScroll** — Either wrap the whole BentoCaseStudyGrid once, or remove per-card RevealOnScroll in favor of the new stagger-in (avoid double animation).

---

## 9. Default Bento Layout (no JSON change)

If you don’t add `bento` to JSON, use a fixed pattern for the first 6 projects, e.g.:

- Index 0: **wide** (2×1) — e.g. Fasal User Research  
- Index 1: **small** (1×1)  
- Index 2: **small** (1×1)  
- Index 3: **wide** (2×1)  
- Index 4: **small** (1×1)  
- Index 5: **small** (1×1) or **wide** (2×1)

Or: 1 wide, 2 small, 1 tall, 2 small — adjust to taste. The grid template should be designed so rows line up (e.g. two 1×1 in row 1, one 2×1 in row 2, etc.).

---

## 10. Order of Implementation

1. Add **BentoProjectCard** with `colSpan` / `rowSpan` props; use it in a simple 2-column grid to verify spans.
2. Add **BentoCaseStudyGrid** with a fixed layout array and stagger; plug in BentoProjectCard.
3. Replace the section in **page.tsx** and hide "coming-soon" or give it 1×1.
4. Tune breakpoints and optional `bento` in **projects.json**.
5. Polish motion (stagger delay, spring constants, reduced-motion).

Done. You’ll have a bento case study showcase with clear hierarchy and motion that matches the Kinetic Craft skill.
