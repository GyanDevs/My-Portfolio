# Portfolio Next.js Architecture & Patterns

## Current Progress Status
- **Core Engine:** Built on Next.js App Router with Tailwind CSS and Framer Motion. 
- **Content Pipeline:** Case studies are driven by structured data, mapped through dynamic routing (`/projects/[slug]`).
- **Recent Enhancements (Fasal Billing Case Study):**
  - Integrated a "Graphic Illustrator Skill" focusing on vibrant, "Creative Mints" inspired visual design (glassmorphism, saturated radial glows, textured elements).
  - Built highly specific React components to visualize isolated sections of complex case studies (e.g., `<FasalBillingLogicFlowchart />`, `<FasalBillingGoalsGrid />`).
  - Adjusted the global layout to a split-pane design (Sticky Context Left, Scrollable Artifacts Right).
  - Defined a future roadmap (`PROTOTYPE_PLAN.md`) for building interactive, state-driven mobile app prototypes directly inside the case study views.

## Architecture
- **Framework:** Next.js (React Server Components + Client Components where interactivity is needed).
- **Styling:** Tailwind CSS integrated with extensive CSS Variables defined in `globals.css` to handle fluid theming (light/dark modes natively without flashing).
- **Routing:** App Router (`src/app/...`)
- **Key Files:**
  - `src/components/ProjectDetailClient.tsx`: The primary rendering engine for case studies. Uses a complex mapping system to detect `section.type`, `section.title`, and `project.id` to conditionally inject custom visualization components.
  - `src/data/...` or API layer: Where the structured JSON data for the case studies lives.

## Established Coding Patterns

### 1. Highly-Specific Component Injection
Instead of relying entirely on standard rich text rendering, we intercept specific sections of specific case studies and inject custom-built visualization components.
```tsx
// Pattern used in ProjectDetailClient.tsx
{project.id === 'fasal-billing-subscription' && section.title === 'The Logic Layer' && (
  <FasalBillingLogicFlowchart />
)}
```

### 2. Exclusion from Default Rendering
When injecting a custom component that replaces a standard text/list section from the JSON, we actively ensure the default renderer ignores it via exclusion arrays to prevent duplicate content.
```tsx
// Filtering logic in the main section map
project.sections?.filter(section => 
  !(project.id === 'fasal-billing-subscription' && section.title === 'Hypothesis vs. Reality')
)
```

### 3. Vibrant / "Creative Mints" Aesthetics
- **Colors:** Avoid generic Tailwind colors (e.g., `text-red-500`). Use customized HSL/Hex values or CSS variable gradients that feel premium. 
- **Textures:** Utilizing SVG noise overlays or radial gradients to give flat surfaces depth (`kinetic-glow` standard).
- **Glassmorphism:** Leveraging `backdrop-blur-md` combined with semi-transparent background colors (e.g., `bg-white/80 dark:bg-black/80`).

### 4. Motion & Micro-Interactions (Kinetic Design)
- Utilize `framer-motion` for complex layout shifts.
- Rely on custom, refined easing curves rather than default browser linear transitions:
  - Spring physics where possible.
  - Standard ease: `cubic-bezier(0.32, 0.72, 0, 1)` or `transition={{ ease: [0.32, 0.72, 0, 1], duration: 0.5 }}`.
- All interactive elements must have a tactile response (e.g., `active:scale-95`).

### 5. Brutalist Grid System
The site relies heavily on a structured, visible grid system. Elements often feature 1px borders (`border-[var(--grid-line)]`) to establish clear hierarchy and separation of content blocks.
