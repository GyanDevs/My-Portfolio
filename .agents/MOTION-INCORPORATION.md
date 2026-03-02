# Kinetic Craft Motion — incorporation guide

**Source:** `antigravity-portfolio/.agents/skills/motion_designer/SKILL.md`  
**Role:** Elite Motion Design & UI Engineer (Jhey Tompkins + Emil Kowalski). Use this doc to audit and implement high-end, fluid, whimsical motion across the portfolio.

---

## 1. Superhead: core philosophy (6 rules)

| # | Rule | In one line |
|---|------|-------------|
| 1 | **Frictionless & native-feeling** | Layout and state changes should interpolate (width, height, position). No instant snap; feel like a top-tier native app. |
| 2 | **Whimsical & experimental** | Delight and surprise: micro-interactions, hover states, scroll-driven animations, view transitions, `@property`, trig. Push web APIs. |
| 3 | **Interruptible physics & springs** | No basic `ease-in-out` for spatial props. Use spring physics (Framer Motion or custom curves). Animations must reverse smoothly from current velocity if the user cancels. |
| 4 | **CSS-first, JS for the symphony** | Drive glows, magnetic pulls, cursor effects via **CSS variables** (e.g. `--x`, `--y` from cursor). Use JS for layout fluidity, shared transitions, gestures. |
| 5 | **Purposeful choreography** | Staggered entrances, slight translates, spatial awareness. Motion guides the eye. Continuous feedback (e.g. scale down on `:active`). |
| 6 | **Radical accessibility** | Always respect `prefers-reduced-motion`. Provide fallbacks (e.g. crossfade instead of flying elements). |

---

## 2. Signature techniques to use

- **Fluid layout animations** — height 0 → auto; modals that scale background back for depth.
- **Dynamic glows & particles** — cursor proximity via radial gradients; squish on drag.
- **Magnetic elements** — buttons that subtly pull toward the cursor.
- **View transitions & shared layouts** — morph thumbnail → full-screen.
- **Performant cursor tracking (Emil Kowalski trick)** — Do **not** use React state for mouse `(x, y)` on heavy UI. Use one global vanilla listener that updates **CSS variables** (`--mouse-x`, `--mouse-y`) on the DOM via `.style.setProperty()`. Bypasses React render cycle → liquid-smooth at 60fps.

---

## 3. How the current codebase aligns

| Area | Status | Notes |
|------|--------|--------|
| **ThemeSwitch** | ✅ Aligned | Spring press, view-transition wipe, reduced-motion fallback, no hover scale on fixed element. |
| **FasalDesignOptions, Testimonials, FasalFarmerObservations** | ✅ Aligned | Springs, `whileTap`, AnimatePresence, `ease-spring-bouncy` in Tailwind. |
| **UnfoldResume** | ✅ Aligned | Springs, stagger, `useReducedMotion`. |
| **RevealOnScroll** | ✅ Aligned | CSS-only transitions, single IntersectionObserver, no React state on scroll; reduced-motion in CSS. |
| **Tailwind** | ✅ Aligned | `ease-spring`, `ease-spring-bouncy`, `ease-smooth` in config. |
| **BackgroundGrid** | ⚠️ Improved | Was using Framer `useMotionValue` for cursor → React-driven. Switched to **vanilla JS + CSS vars** (Emil Kowalski trick) so the radial glow doesn’t cause render jitter. |
| **Gallery components** | ⚠️ Optional upgrade | `FasalBillingSessionGallery`, `FasalBillingResilienceGallery`, `FasalFieldDiscoveryGallery` use `ease-in-out` for image hover scale. Per skill: prefer spring or custom curve for spatial props. Can replace with `transition-timing-function: var(--ease-spring)` or a short spring in Framer if the card is motion-based. |
| **RevealOnScroll + reduced-motion** | ✅ OK | When `prefers-reduced-motion`, observer isn’t attached but CSS forces `.reveal` to opacity: 1 and no transform, so content still shows. |

---

## 4. Seasonal themes + motion (from SEASONAL-THEMES-PLAN.md)

When you add **season switcher** and **gradient variables**:

- **Season change transition** — Don’t snap gradients. Use `transition` on the gradient-related CSS variables (or a short crossfade on the gradient layer) so switching Spring → Winter feels fluid. Optionally reuse View Transition API (like ThemeSwitch) for a full-page season wipe.
- **SeasonSwitcher UI** — Apply the same motion rules: spring-based tap, interruptible, optional stagger when opening the dropdown. Respect `prefers-reduced-motion`.
- **BackgroundGrid + seasons** — Grid already uses `var(--glow-color)` (or will, once seasons are in). Cursor-driven glow stays smooth because it’s CSS-var-driven (Emil Kowalski trick); only the color changes per season.

---

## 5. Checklist for new or touched components

When adding or editing motion:

- [ ] **Spatial (position, scale, size):** Use spring or custom cubic-bezier, not `ease-in-out`.
- [ ] **Cursor / mouse driving effect:** Prefer one listener → CSS vars on the element; avoid `useState({ x, y })` or `useMotionValue` in a hot path that repaints often.
- [ ] **Enter/exit:** Stagger and slight translate where it helps hierarchy; consider AnimatePresence for exit.
- [ ] **Buttons / taps:** `whileTap={{ scale: 0.8x }}` with a spring; optional hover pull (magnetic) if it fits.
- [ ] **Reduced motion:** Gate or shorten animations with `matchMedia("prefers-reduced-motion: reduce")` and/or CSS `@media (prefers-reduced-motion: reduce)`.
- [ ] **View transitions:** For theme/season/page changes, consider `document.startViewTransition` with a clear choreography (e.g. clip-path wipe).

---

## 6. Files changed to incorporate the skill

- **BackgroundGrid.tsx** — Cursor position now updates CSS custom properties `--mouse-x`, `--mouse-y` via a single vanilla `mousemove` listener on the grid container. Radial gradient reads `var(--mouse-x)` and `var(--mouse-y)`. No React state for cursor → no re-renders → smooth 60fps glow. Glow color can later be `var(--glow-color)` for seasonal theming.

Use this doc as the **motion design source of truth** when auditing or implementing animations in the portfolio.
