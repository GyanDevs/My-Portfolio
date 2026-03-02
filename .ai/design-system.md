# ANTIGRAVITY PORTFOLIO — DESIGN SYSTEM
> Living document. Last updated: 2026-02-18. Maintained by Lead Architect.

---

## 1. PHILOSOPHY

**Name:** Antigravity  
**Owner:** Gyan (Senior Product Designer, 6+ yrs, Bengaluru)  
**Aesthetic:** Brutalist-Editorial. Clean, high-contrast, grid-obsessed. No rounded corners. No gradients. No decorative shadows. Every element earns its place.

**Core Principles:**
- **Grid is law.** Every section is bounded by 1px `--grid-line` borders. The grid is the skeleton.
- **Mono + Serif + Sans trinity.** Three font roles, never mixed up.
- **Black & white first.** Colour is used only for semantic meaning (e.g. testimonial accents), never decoration.
- **Motion is purposeful.** Animations reveal information or guide attention — never decorative.
- **Zero border-radius.** Enforced globally via `* { border-radius: 0 !important; }` in `globals.css`.

---

## 2. COLOUR TOKENS

Defined in `app/globals.css` as CSS custom properties:

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--background` | `#ffffff` | `#0a0a0a` | Page/section backgrounds |
| `--foreground` | `#000000` | `#ffffff` | Primary text, borders, CTAs |
| `--grid-line` | `#e5e5e5` | `#262626` | All 1px divider lines |

**Neutral palette** (Tailwind defaults used directly):
- `text-neutral-400` — Muted body text, subtitles
- `text-neutral-500` — Meta text, labels, mono captions
- `text-neutral-200 / dark:text-neutral-800` — Grid cell fills (contact section animation)

---

## 3. TYPOGRAPHY

### Font Roles

| Role | Family | Tailwind Class | Usage |
|---|---|---|---|
| **Sans** | System / Helvetica | `font-sans` | Headings, body copy, UI labels |
| **Serif** | System Serif | `font-serif italic` | Accent/emphasis within body text |
| **Mono** | System Mono | `font-mono` | CTAs, labels, tags, metadata, navigation |

### Type Scale

| Element | Size | Weight | Tracking | Case |
|---|---|---|---|---|
| Hero H1 | `text-3xl` → `text-6xl` (responsive) | `font-normal` | `tracking-tighter` | Mixed |
| Section H2 | `text-[30px]` | `font-bold` | `tracking-tighter` | `uppercase` |
| Card Title | `text-xl` / `text-2xl` | `font-black` | `tracking-tighter` | `uppercase` |
| Body | `text-lg` → `text-2xl` | `font-light` | `tracking-tight` | Sentence |
| Mono Label | `text-xs` / `text-sm` | `font-bold` / `font-mono` | `tracking-widest` | `uppercase` |
| Footer Watermark | `text-[5vw]` | `font-black` | — | `uppercase` |

---

## 4. LAYOUT & GRID

### Page Container
```
max-w-[1600px] mx-auto border-x border-[var(--grid-line)]
```
All content lives inside this container. The `border-x` creates the left/right page rails.

### Section Anatomy
Every section follows this pattern:
```
<section className="border-b border-[var(--grid-line)] p-8 md:p-12">
```
- `border-b` — bottom divider (never `border-t` on the next element to avoid doubling)
- Padding: `p-8 md:p-12` standard. Some sections use `px-8 py-32` for vertical breathing room.

### Grid System (Case Studies)
```
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-[var(--grid-line)] gap-[1px]
```
The `bg-[var(--grid-line)]` + `gap-[1px]` trick creates 1px grid lines between cards without double borders.

### Fixed-Height Sections
The Contact section uses `height: 480px` (6 × 80px) so the 80px grid pattern tiles perfectly with no partial cells.

---

## 5. COMPONENT PATTERNS

### Primary CTA Button (Slide-Fill Hover)
Used in: Contact Section ("Email Me"), Resume Page ("Download PDF")

```tsx
<a className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-mono text-sm uppercase tracking-widest bg-transparent text-[var(--foreground)] border border-[var(--foreground)] hover:text-[var(--background)] transition-all duration-300">
  <span className="absolute inset-0 w-full h-full bg-[var(--foreground)] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
  <span className="relative z-10">Label</span>
</a>
```
**Rule:** The sliding `<span>` fills left-to-right (`translate-x-[-100%]` to `0`) on hover. Text sits above via `z-10`. Uses `bg-transparent` to adapt to theme.

### Navigation Arrows (Slide-Fill)
Used in: Carousels (Testimonials, Infographics). Square buttons with directional fill.

**Next / Right Arrow (Fills Left → Right):**
```tsx
<button 
  disabled={isDisabled}
  className={`relative p-3 border border-[var(--grid-line)] rounded-none overflow-hidden ${
    isDisabled ? 'opacity-30 cursor-not-allowed' : 'group hover:text-[var(--background)]'
  }`}
>
  <span className="absolute inset-0 w-full h-full bg-[var(--foreground)] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
  <ArrowRight className="w-5 h-5 relative z-10" />
</button>
```

**Prev / Left Arrow (Fills Right → Left):**
```tsx
<button 
  disabled={isDisabled}
  className={`relative p-3 border border-[var(--grid-line)] rounded-none overflow-hidden ${
    isDisabled ? 'opacity-30 cursor-not-allowed' : 'group hover:text-[var(--background)]'
  }`}
>
  <span className="absolute inset-0 w-full h-full bg-[var(--foreground)] translate-x-[100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
  <ArrowLeft className="w-5 h-5 relative z-10" />
</button>
```
**Rule:** Directional fill provides intuitive feedback. `z-10` on icon ensures visibility over the fill.
**disabled state:** Remove `group` class and add `opacity-30 cursor-not-allowed` to prevents all hover effects.
**Rule:** Directional fill provides intuitive feedback. `z-10` on icon ensures visibility over the fill.

### Inline Text Link
```tsx
<Link className="font-mono text-sm uppercase tracking-widest text-[var(--foreground)] hover:underline decoration-2 underline-offset-4 transition-colors">
```
**Rule:** Always use `text-[var(--foreground)]` for links to ensure maximum contrast. Avoid `neutral-500` for primary actions.

### Tag / Badge (Filled)
```tsx
<span className="bg-[var(--foreground)] text-[var(--background)] px-3 py-1 text-sm font-mono font-bold uppercase tracking-widest">
```

### Tag / Badge (Outline)
```tsx
<span className="border border-[var(--grid-line)] px-2 py-1 text-xs font-mono uppercase tracking-widest text-neutral-500">
```

### Back Navigation
Use the `BackButton` component (`src/components/BackButton.tsx`) — never hand-code a back link again.

```tsx
<BackButton />                    // default: href="/"
<BackButton href="/some-path" />  // custom destination
```

**Interaction vocabulary (identical to slide-fill CTAs):**
- Slide-fill enters from LEFT (`translate-x[-100%]` → `0`) — consistent with site-wide hover vocabulary
- `←` arrow drifts LEFT on hover (`group-hover:translate-x-[-4px]`) — directional feedback, zero JS
- Spring press: `whileTap scale(0.94)` with `{ stiffness: 700, damping: 28, mass: 0.6 }` — matches `CtaButton`
- `border border-[var(--grid-line)]` — navigation element (secondary), not primary CTA

**Rule:** Always use `<BackButton />`. Do NOT use `hover:underline` for navigation — that pattern was deprecated in favour of the slide-fill vocabulary which is cohesive with every other interactive surface on the site.

### Accordion & Observation Cards (Fasal Case Study)
**Context:** specialized cards for user research findings.

**Visual Style:**
- **Background:** White/Transparent (Accordion) or Pastel Tint (Observation Post-its).
- **Border:** Grey (Accordion) or Colored Theme (Observation).
- **Typography:**
  - Header: `text-[18px]` (Accordion), `text-[20px]` (Observation Name).
  - Metadata: `text-neutral-500` + Mono + Uppercase + Tracking-widest.
  - Numbering: `#{Index}` format (e.g., `#01`).

**Semantic Color Themes:**
- **Issues:** Red Theme (`bg-rose-100`, `border-rose-300`, `text-rose-700`).
- **Solutions/Benefits:** Green Theme (`bg-green-100`, `border-green-300`, `text-green-700`).
- **Neutral/Observation:** Variable Pastel Themes (Yellow, Green, Blue, Rose, Purple, Orange).

**Behavior:**
- **Repetitive Content:** If an "Identified Issue" repeats in standard grid layouts, replace text with:
  - Center-aligned large serif quote (`"`)
  - Label "SAME" (Mono, Uppercase).
```

---

## 6. SECTION INVENTORY

| # | Section | Component | Notes |
|---|---|---|---|
| 1 | Masthead / Hero | `app/page.tsx` inline | Typewriter headline, role badge, bio blurb |
| 2 | Ticker Tape | `app/page.tsx` inline | Marquee of skills, `animate-marquee` |
| 3 | Case Study Grid | `ProjectCard.tsx` | 3-col grid, 1px gap trick |
| 4 | Testimonials | `Testimonials.tsx` | Carousel, finite scroll, 1/6 counter |
| 5 | Contact | `ContactSection.tsx` | Animated grid fill, Gmail CTA |
| 6 | Footer | `app/page.tsx` inline | Copyright + large watermark text |

### Project Detail Pages (`/projects/[slug]`)
- **Layout:** 12-col grid. Left col (4): sticky context sidebar. Right col (8): scrollable content.
- **Sidebar:** Title, headline, metric, designation, focus areas, tools, tags
- **Content:** Sections typed as `'text' | 'image' | 'list' | 'quote'`
- **Data source:** `src/data/projects.json` (cast with `as any` in page.tsx due to TS literal inference)

### Resume Page (`/resume`)
- Header: Name, title, location in Helvetica Bold. Separators use `//`.
- Download CTA: Same slide-fill pattern as Email Me button.

---

## 7. ANIMATION SYSTEM

| Animation | Trigger | Implementation |
|---|---|---|
| Loading screen | Page load | `LoadingScreen.tsx` — progress bar, slide-up exit with `blur(10px)` |
| Typewriter | On mount | `Typewriter.tsx` — segment-by-segment reveal with cursor |
| Ticker tape | Always | CSS `animate-marquee` (50s linear infinite) |
| Contact grid fill | Scroll into view | `IntersectionObserver` → random 30-50% cell fill, staggered 40ms batches |
| CTA hover | Hover | CSS `translate-x` slide, 300ms ease-in-out |

**Loading screen logic:**
- 30ms tick interval
- Slow start (small increments), fast finish (large increments near 100)
- Exit: slide up `y: "-100%"` + `filter: "blur(10px)"`

---

## 8. DATA ARCHITECTURE

### `src/data/projects.json`
Array of project objects. Key fields:
```ts
{
  id: string           // URL slug
  title: string
  headline: string     // One-line impact statement
  metric: string       // Key result (e.g. "40% reduction")
  hide_metric?: boolean
  problem: string
  tags: string[]
  designation?: string
  focus_areas?: string[]
  tools?: string[]
  about?: { description: string }
  sections?: ProjectSection[]  // Content blocks
}
```

### `ProjectSection` types
- `text` — `{ title, content: string[] }`
- `image` — `{ src, caption }`
- `list` — `{ title, items: string[] }`
- `quote` — `{ content: string }`

---

## 9. TECH STACK

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion + CSS transitions |
| Icons | Inline SVG (no icon library dependency) |
| Fonts | System stack (no Google Fonts import) |
| Data | Static JSON (`src/data/`) |

---

## 10. RULES FOR FUTURE AGENTS

1. **Never add `border-radius`** — it's globally zeroed out. Don't fight it.
2. **Never use `border-t` on a section if the section above has `border-b`** — this creates double borders.
3. **Grid lines are always `border-[var(--grid-line)]`** — never hardcoded colours.
4. **CTA buttons always use the slide-fill pattern** — no plain `hover:bg-*` swaps.
5. **Section heights that contain grid patterns must be multiples of 80px** — e.g. 480px, 560px.
6. **All new sections must have `border-b border-[var(--grid-line)]`** — the footer has no `border-t`.
7. **Font mono for all labels, tags, nav, CTAs** — sans for headings and body only.
8. **Serif italic is accent only** — used inline within body text for emphasis, never standalone.
9. **Animations must use `IntersectionObserver` or scroll-triggered** — not auto-play on mount unless it's the loading screen.
10. **New components go in `src/components/`** — imported with `@/src/components/` alias.
