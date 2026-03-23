"use client";

import {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
  useMemo,
  forwardRef,
} from "react";
import {
  motion,
  useScroll,
  useReducedMotion,
  useMotionValueEvent,
  animate,
  useMotionValue,
} from "framer-motion";
import { CareerMilestone } from "@/src/data/careerStory";

/** Matches CtaButton / ThemeSwitch: one press vocabulary sitewide. */
const TAP_SPRING = {
  type: "spring" as const,
  stiffness: 600,
  damping: 25,
  mass: 0.5,
};

/** Matches `globals.css` `.reveal`: expo-out, decisive deceleration. */
const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

const NODE_ENTRANCE_SPRING = {
  type: "spring" as const,
  stiffness: 420,
  damping: 28,
  mass: 0.45,
};

/** First paint: ink draws from the top node down to the current scroll position (Emil-style spring). */
const SPINE_INK_INTRO_SPRING = {
  type: "spring" as const,
  stiffness: 52,
  damping: 18,
  mass: 0.72,
};

type Theme = {
  /** More/Less hint — neutral, no chroma. */
  ctaHint: string;
};

const TIMELINE_THEME: Theme = {
  ctaHint:
    "text-neutral-600 dark:text-neutral-400 group-hover:text-[var(--foreground)]",
};

interface CareerTimelineProps {
  milestones: CareerMilestone[];
  /**
   * Default: classic spine timeline.
   * Grid: square milestone tiles with hover-reveal behavior.
   */
  layout?: "spine" | "grid";
  /**
   * Total number of square tiles ("slots") to render in grid mode.
   * Milestones are randomly assigned to `milestones.length` of those slots,
   * leaving the remaining slots empty (grey outlines still visible).
   */
  gridSlots?:
    | number
    | {
        base?: number;
        sm?: number;
        lg?: number;
      };
  /**
   * In grid mode: when false, render only empty square tiles
   * (grey outlines) and do not place milestone cards.
   */
  gridShowCards?: boolean;
  /**
   * In grid mode: optional exact slot indices to populate with milestone cards.
   * If provided and `gridShowCards` is true, milestones will be assigned in order
   * (milestones[0] → slotIndices[0], milestones[1] → slotIndices[1], etc).
   * All other slots remain empty.
   */
  gridFilledSlotIndices?: number[];
}

function bodyParagraphs(body: string): string[] {
  return body
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

const TimelineNode = forwardRef<
  HTMLSpanElement,
  { isLast: boolean }
>(function TimelineNode({ isLast }, ref) {
  const reduceMotion = useReducedMotion();
  const base =
    "career-timeline-node relative z-10 block h-3 w-3 shrink-0 border-2 border-[var(--background)]";
  const defaultFill = "bg-[var(--foreground)]";
  /** Current-era node: green accent + same ripple/glow treatment as pre-monochrome cyan. */
  const lastFill = "bg-green-600 dark:bg-green-500";
  const lastRipple = "bg-green-400/45 dark:bg-green-400/35";
  const lastGlow =
    "shadow-[0_0_10px_rgba(34,197,94,0.55)] dark:shadow-[0_0_12px_rgba(74,222,128,0.45)]";

  if (reduceMotion) {
    return (
      <span
        ref={ref}
        className={`${base} ${isLast ? lastFill : defaultFill}`}
      />
    );
  }

  if (isLast) {
    return (
      <span
        ref={ref}
        className="career-timeline-node relative z-10 flex h-3 w-3 shrink-0 items-center justify-center overflow-visible"
      >
        {/* CSS ripple: start/end opacity 0 so loop boundary is invisible (no Framer repeat snap). */}
        <span
          aria-hidden
          className={`career-timeline-node-ripple pointer-events-none absolute inset-0 ${lastRipple}`}
        />
        <motion.span
          className={`career-timeline-node relative z-[1] block h-3 w-3 border-2 border-[var(--background)] ${lastFill} ${lastGlow}`}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={NODE_ENTRANCE_SPRING}
        />
      </span>
    );
  }

  return (
    <motion.span
      ref={ref}
      className={`${base} ${defaultFill}`}
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={NODE_ENTRANCE_SPRING}
    />
  );
});

function MilestoneExpandable({
  paragraphs,
  sectionMark,
  isOpen,
  borderTopClass,
  theme,
}: {
  paragraphs: string[];
  /** Per-milestone glyph from data; contextual to each career chapter. */
  sectionMark?: string;
  isOpen: boolean;
  borderTopClass: string;
  theme: Theme;
}) {
  const reduceMotion = useReducedMotion();
  if (paragraphs.length === 0) return null;

  const layoutTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: REVEAL_EASE };

  return (
    <>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={layoutTransition}
        className="overflow-hidden"
      >
        <ul
          className={`mt-2 space-y-1.5 border-t pt-2 font-mono text-sm leading-relaxed text-[var(--foreground)] ${borderTopClass}`}
        >
          {paragraphs.map((line, j) => (
            <li key={j} className="flex gap-2.5">
              <span
                className="mt-[0.35em] inline-flex h-4 w-4 shrink-0 items-center justify-center font-mono text-[12px] leading-none text-[var(--foreground)]"
                aria-hidden
              >
                {sectionMark ?? "·"}
              </span>
              <span className="font-mono text-sm leading-relaxed text-[var(--foreground)]">
                {line}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
      <span
        className={`mt-2 block font-mono text-[12px] uppercase tracking-[0.2em] transition-colors duration-[280ms] ${theme.ctaHint}`}
        aria-hidden
      >
        {isOpen ? "↑ Less" : "↓ More"}
      </span>
    </>
  );
}

/** Default: years · tag (line 1), designation (line 2). Optional per-milestone combined second line. */
function MilestoneMeta({
  milestone,
  className = "",
}: {
  milestone: CareerMilestone;
  className?: string;
}) {
  if (milestone.combineMetaSecondLine) {
    const metaSecondLine =
      milestone.designation || milestone.tag
        ? [milestone.designation, milestone.tag].filter(Boolean).join(" · ")
        : null;
    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        <span className="font-mono text-[14px] tabular-nums text-neutral-500">
          {milestone.years}
        </span>
        {metaSecondLine && (
          <span className="font-sans text-[14px] font-normal leading-snug text-neutral-600 dark:text-neutral-400">
            {metaSecondLine}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="font-mono text-[14px] tabular-nums text-neutral-500">
          {milestone.years}
        </span>
        {milestone.tag && (
          <>
            <span className="font-mono text-[14px] text-[var(--grid-line)]" aria-hidden>
              ·
            </span>
            <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-neutral-500">
              {milestone.tag}
            </span>
          </>
        )}
      </div>
      {milestone.designation && (
        <span className="font-sans text-[14px] font-normal leading-snug text-neutral-600 dark:text-neutral-400">
          {milestone.designation}
        </span>
      )}
    </div>
  );
}

function MilestoneCard({
  milestone,
  theme,
  paragraphs,
  isOpen,
  onToggle,
  variant,
  hideMeta = false,
  isScrollReached = false,
}: {
  milestone: CareerMilestone;
  theme: Theme;
  paragraphs: string[];
  isOpen: boolean;
  onToggle: () => void;
  variant: "mobile" | "desktop";
  /** Desktop: meta sits in the opposite grid column next to the spine. */
  hideMeta?: boolean;
  /** Spine progress has reached this milestone’s node — black border / accent. */
  isScrollReached?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const hasExpandable = paragraphs.length > 0;

  const title = (
    <h3 className="break-words text-lg font-bold leading-tight tracking-tight text-[var(--foreground)]">
      {milestone.title}
    </h3>
  );

  const expandable = (
    <MilestoneExpandable
      paragraphs={paragraphs}
      sectionMark={milestone.mark}
      isOpen={isOpen}
      borderTopClass={variant === "desktop" ? "border-[var(--grid-line)]/60" : "border-[var(--grid-line)]"}
      theme={theme}
    />
  );

  const inner = (
    <>
      {!(variant === "desktop" && hideMeta) && (
        <MilestoneMeta milestone={milestone} className="mb-1" />
      )}
      {title}
      {expandable}
    </>
  );

  const interactiveClass =
    "group cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";

  const tap = reduceMotion ? undefined : { scale: 0.985, transition: TAP_SPRING };

  const borderClass = isScrollReached
    ? "border-[var(--foreground)]"
    : "border-[var(--grid-line)]";

  if (variant === "mobile") {
    const mobileStyle = {
      borderLeftWidth: "4px",
      borderLeftColor: isScrollReached ? "var(--foreground)" : "var(--grid-line)",
    } as const;

    if (!hasExpandable) {
      return (
        <div
          className={`w-full min-w-0 border ${borderClass} bg-transparent p-3.5 sm:p-4 md:hidden`}
          style={mobileStyle}
        >
          {inner}
        </div>
      );
    }

    return (
      <motion.div
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-label={`${milestone.title}. ${isOpen ? "Collapse" : "Expand"} story.`}
        className={`w-full min-w-0 border ${borderClass} bg-transparent p-3 sm:p-3.5 md:hidden ${interactiveClass}`}
        style={mobileStyle}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        whileTap={tap}
      >
        {inner}
      </motion.div>
    );
  }

  if (!hasExpandable) {
    return (
      <div className={`max-w-md border ${borderClass} bg-transparent p-4`}>{inner}</div>
    );
  }

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-label={`${milestone.title}. ${isOpen ? "Collapse" : "Expand"} story.`}
      className={`max-w-md border ${borderClass} bg-transparent p-4 ${interactiveClass}`}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      whileTap={tap}
    >
      {inner}
    </motion.div>
  );
}

export function CareerTimeline({
  milestones,
  layout = "spine",
  gridSlots,
  gridShowCards = true,
  gridFilledSlotIndices,
}: CareerTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spineTrackRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [spineStartPx, setSpineStartPx] = useState(0);
  const [spineHeightPx, setSpineHeightPx] = useState(0);
  const [nodeCenterYs, setNodeCenterYs] = useState<number[]>([]);
  /** Raw scroll 0–1 for reach math (no spring — avoids flicker when layout/scroll range changes). */
  const [rawScrollP, setRawScrollP] = useState(0);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [hoveredMilestoneId, setHoveredMilestoneId] = useState<string | null>(
    null,
  );
  const prefersReduced = useReducedMotion();

  // Parsing milestone bodies into paragraph lines is pure and expensive enough
  // to avoid re-running on every scroll-driven render.
  const milestoneParagraphsById = useMemo(() => {
    const map: Record<string, string[]> = {};
    milestones.forEach((m) => {
      map[m.id] = bodyParagraphs(m.body);
    });
    return map;
  }, [milestones]);

  const defaultGridSlots = milestones.length;
  const normalizedGridSlots =
    typeof gridSlots === "number"
      ? { base: gridSlots, sm: gridSlots, lg: gridSlots }
      : gridSlots;

  const [slotCount, setSlotCount] = useState<number>(() => {
    if (typeof window === "undefined") return normalizedGridSlots?.base ?? defaultGridSlots;
    const w = window.innerWidth;
    if (w >= 1024) return normalizedGridSlots?.lg ?? normalizedGridSlots?.sm ?? normalizedGridSlots?.base ?? defaultGridSlots;
    if (w >= 640) return normalizedGridSlots?.sm ?? normalizedGridSlots?.base ?? defaultGridSlots;
    return normalizedGridSlots?.base ?? defaultGridSlots;
  });

  // Shuffle seed should stay stable for this component instance,
  // so hover/click doesn't reshuffle tiles.
  const [gridSeed] = useState(() => Math.floor(Math.random() * 1_000_000_000));

  useEffect(() => {
    if (typeof window === "undefined") return;

    const compute = () => {
      const w = window.innerWidth;
      if (w >= 1024) return normalizedGridSlots?.lg ?? normalizedGridSlots?.sm ?? normalizedGridSlots?.base ?? defaultGridSlots;
      if (w >= 640) return normalizedGridSlots?.sm ?? normalizedGridSlots?.base ?? defaultGridSlots;
      return normalizedGridSlots?.base ?? defaultGridSlots;
    };

    const onResize = () => setSlotCount(compute());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [defaultGridSlots, normalizedGridSlots]);

  function mulberry32(a: number) {
    return () => {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const slotAssignments = useMemo(() => {
    const total = Math.max(0, slotCount);
    if (total === 0) return [];

    if (gridShowCards && gridFilledSlotIndices && gridFilledSlotIndices.length > 0) {
      const assignments: Array<number | null> = new Array(total).fill(null);
      const max = Math.min(milestones.length, gridFilledSlotIndices.length);
      for (let mIndex = 0; mIndex < max; mIndex++) {
        const slotIdx = gridFilledSlotIndices[mIndex];
        if (slotIdx < 0 || slotIdx >= total) continue;
        assignments[slotIdx] = mIndex;
      }
      return assignments;
    }

    const count = Math.min(milestones.length, total);

    // Positions where we will place milestones; remaining slots stay empty.
    const positions = Array.from({ length: total }, (_, i) => i);
    const rng = mulberry32(gridSeed);

    // Fisher–Yates shuffle.
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const tmp = positions[i];
      positions[i] = positions[j];
      positions[j] = tmp;
    }

    const assignments: Array<number | null> = new Array(total).fill(null);
    for (let mIndex = 0; mIndex < count; mIndex++) {
      assignments[positions[mIndex]] = mIndex;
    }
    return assignments;
  }, [gridSeed, gridFilledSlotIndices, gridShowCards, milestones, slotCount]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  /** 0–1 scaleY for the foreground spine; intro animates from first dot to current scroll, then follows scroll. */
  const filledScale = useMotionValue(0);
  /** Set true once intro is scheduled (layout valid); prevents duplicate runs when spine metrics update. */
  const spineIntroStartedRef = useRef(false);
  const spineIntroFinishedRef = useRef(false);
  const spineIntroAnimRef = useRef<ReturnType<typeof animate> | null>(null);
  const careerTimelineMountedRef = useRef(true);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setRawScrollP(latest);
    if (prefersReduced) return;
    if (spineIntroFinishedRef.current) {
      filledScale.set(latest);
    }
  });

  const updateSpineLayout = useCallback(() => {
    const track = spineTrackRef.current;
    const n = milestones.length;
    if (!track || n === 0) return;
    const tr = track.getBoundingClientRect();
    const centers: number[] = [];
    for (let i = 0; i < n; i++) {
      const el = nodeRefs.current[i];
      if (!el) return;
      const nr = el.getBoundingClientRect();
      centers[i] = nr.top + nr.height / 2 - tr.top;
    }
    setNodeCenterYs(centers);
    const firstCenterY = centers[0];
    const lastCenterY = centers[n - 1];
    // Use sub-pixel precision to keep the ink line aligned with node centers.
    // Rounding can make the line creep past the intended endpoints.
    setSpineStartPx(Math.max(0, firstCenterY));
    setSpineHeightPx(Math.max(0, lastCenterY - firstCenterY));
  }, [milestones.length]);

  useLayoutEffect(() => {
    updateSpineLayout();
  }, [updateSpineLayout, milestones, expanded]);

  useEffect(() => {
    setRawScrollP(scrollYProgress.get());
  }, [scrollYProgress]);

  useLayoutEffect(() => {
    if (prefersReduced) {
      spineIntroFinishedRef.current = true;
      return;
    }
    if (spineIntroStartedRef.current) return;
    if (spineHeightPx <= 0 || nodeCenterYs.length !== milestones.length) {
      return;
    }
    spineIntroStartedRef.current = true;
    spineIntroFinishedRef.current = false;
    filledScale.set(0);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!careerTimelineMountedRef.current) return;
        const target = scrollYProgress.get();
        spineIntroAnimRef.current = animate(filledScale, target, {
          ...SPINE_INK_INTRO_SPRING,
          onComplete: () => {
            if (!careerTimelineMountedRef.current) return;
            spineIntroFinishedRef.current = true;
            filledScale.set(scrollYProgress.get());
          },
        });
      });
    });
  }, [
    prefersReduced,
    spineHeightPx,
    nodeCenterYs.length,
    milestones.length,
    scrollYProgress,
    filledScale,
  ]);

  useEffect(() => {
    careerTimelineMountedRef.current = true;
    return () => {
      careerTimelineMountedRef.current = false;
      spineIntroAnimRef.current?.stop();
      spineIntroAnimRef.current = null;
    };
  }, []);

  useEffect(() => {
    const track = spineTrackRef.current;
    if (!track || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => updateSpineLayout());
    ro.observe(track);
    window.addEventListener("resize", updateSpineLayout);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateSpineLayout);
    };
  }, [updateSpineLayout]);

  /** Scroll-only reach (no “latched” ink while expanded): latch made every row stay black after scrolling down once. */
  const isMilestoneReached = useCallback(
    (i: number) => {
      if (nodeCenterYs.length <= i || spineHeightPx <= 0) return false;
      const cy = nodeCenterYs[i];
      if (cy === undefined) return false;
      const filledEnd = spineStartPx + rawScrollP * spineHeightPx;
      return filledEnd >= cy - 0.5;
    },
    [nodeCenterYs, spineStartPx, spineHeightPx, rawScrollP],
  );

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useLayoutEffect(() => {
    nodeRefs.current.length = milestones.length;
  }, [milestones.length]);

  if (layout === "grid") {
    return (
      <div
        ref={containerRef}
        className="relative mx-auto w-full min-w-0 max-w-none p-0"
      >
        <div className="grid grid-cols-1 gap-[1px] bg-[var(--grid-line)] py-[1px] pl-0 pr-0 sm:grid-cols-2 lg:grid-cols-4">
          {gridShowCards
            ? slotAssignments.map((milestoneIndex, slotIdx) => {
                const milestone =
                  milestoneIndex === null ? null : milestones[milestoneIndex];

                if (!milestone) {
                  return (
                    <div
                      key={`empty-${slotIdx}`}
                      className="aspect-square bg-background"
                      aria-hidden
                    />
                  );
                }

                const paragraphs = milestoneParagraphsById[milestone.id] ?? [];
                const isClickedOpen = !!expanded[milestone.id];
                const isHoverOpen = hoveredMilestoneId === milestone.id;
                const isOpen = isClickedOpen || isHoverOpen;
                const theme = TIMELINE_THEME;

                return (
                  <div
                    key={milestone.id}
                    className="aspect-square bg-background"
                  >
                    <button
                      type="button"
                      onClick={() => toggle(milestone.id)}
                      onMouseEnter={() => setHoveredMilestoneId(milestone.id)}
                      onMouseLeave={() => setHoveredMilestoneId(null)}
                      onFocus={() => setHoveredMilestoneId(milestone.id)}
                      onBlur={() => setHoveredMilestoneId(null)}
                      className="group relative h-full w-full bg-transparent p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)]"
                      aria-label={`${milestone.title}. ${
                        isOpen ? "Collapse" : "Expand"
                      } story.`}
                      aria-expanded={isOpen}
                    >
                      {/* 3D flip: front = title/meta; back = expanded story. */}
                      <div
                        className="relative h-full w-full [transform-style:preserve-3d]"
                        style={{ perspective: 900 }}
                      >
                        <motion.div
                          className="absolute inset-0 [transform-style:preserve-3d] transform-gpu"
                          animate={{ rotateY: isOpen ? 180 : 0 }}
                          transition={
                            prefersReduced
                              ? { duration: 0 }
                              : {
                                  type: "spring",
                                  stiffness: 420,
                                  damping: 34,
                                  mass: 0.55,
                                }
                          }
                        >
                          {/* FRONT */}
                          <div className="absolute inset-0 [backface-visibility:hidden]">
                            <div className="flex h-full min-h-0 flex-col overflow-hidden p-4 bg-background">
                              <div className="mt-auto flex flex-col">
                                <MilestoneMeta
                                  milestone={milestone}
                                  className="mb-2"
                                />
                                <h3
                                  className="break-words text-lg font-bold leading-tight tracking-tight text-[var(--foreground)] [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden"
                                >
                                  {milestone.title}
                                </h3>
                              </div>
                            </div>
                          </div>

                          {/* BACK */}
                          <div
                            className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]"
                          >
                            <div className="flex h-full min-h-0 flex-col overflow-hidden p-4 bg-[var(--grid-line)]">
                              <div className="mt-auto min-h-0 overflow-hidden">
                                {paragraphs.length > 0 ? (
                                  <MilestoneExpandable
                                    paragraphs={paragraphs}
                                    sectionMark={milestone.mark}
                                    isOpen={isOpen}
                                    borderTopClass="border-[var(--grid-line)]/60"
                                    theme={theme}
                                  />
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </button>
                  </div>
                );
              })
            : Array.from({ length: slotCount }, (_, slotIdx) => (
                <div
                  key={`empty-${slotIdx}`}
                  className="aspect-square bg-background"
                  aria-hidden
                />
              ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full min-w-0 max-w-5xl px-0 sm:px-0 md:px-2 lg:px-4"
    >
      {/* Spine track: line runs first-node center → last-node center (no tail into “Now”, like no tail above first). */}
      {/* overflow-visible: expanded cards must not be clipped; spine is 1px wide */}
      <div ref={spineTrackRef} className="relative overflow-visible">
        <div
          className="pointer-events-none absolute left-1/2 z-0 w-px -translate-x-1/2 bg-[var(--grid-line)]"
          style={{ top: spineStartPx, height: spineHeightPx }}
          aria-hidden
        />
        {!prefersReduced && (
          <motion.div
            className="pointer-events-none absolute left-1/2 z-[1] w-px origin-top -translate-x-1/2 bg-[var(--foreground)] will-change-transform"
            style={{ top: spineStartPx, height: spineHeightPx, scaleY: filledScale }}
            aria-hidden
          />
        )}

        <ul className="relative z-[2] w-full min-w-0 space-y-0">
          {milestones.map((milestone, i) => {
          const theme = TIMELINE_THEME;
          const isLeft = i % 2 === 0;
          const isLast = i === milestones.length - 1;
          const isOpen = !!expanded[milestone.id];
          const paragraphs = milestoneParagraphsById[milestone.id] ?? [];

          const reached = isMilestoneReached(i);
          const cardProps = {
            milestone,
            theme,
            paragraphs,
            isOpen,
            onToggle: () => toggle(milestone.id),
            isScrollReached: reached,
          };
          const connectorClass = reached
            ? "bg-[var(--foreground)]"
            : "bg-[var(--grid-line)]";

            return (
              <li className="relative w-full min-w-0 py-4 sm:py-5 md:py-8 lg:py-10" key={milestone.id}>
                <MilestoneCard {...cardProps} variant="mobile" />

                <div className="hidden w-full min-w-0 md:grid md:grid-cols-[1fr_40px_1fr] md:items-center md:gap-0">
                  {isLeft ? (
                    <>
                      <div className="grid min-h-[5rem] w-full min-w-0 grid-cols-[auto_1fr] items-center gap-0 md:min-h-[5.5rem] lg:min-h-[6rem]">
                        <div className="min-w-0 shrink-0">
                          <MilestoneCard {...cardProps} variant="desktop" hideMeta />
                        </div>
                        {/* 1fr bar: flush to card; -mr-5 overlaps 40px spine col to node center */}
                        <div
                          className={`relative z-[1] h-px min-h-px min-w-[3rem] w-full self-center -mr-5 ${connectorClass}`}
                          aria-hidden
                        />
                      </div>
                      <div className="relative flex min-h-[5rem] items-center justify-center md:min-h-[5.5rem] lg:min-h-[6rem]">
                        <TimelineNode
                          ref={(el) => {
                            nodeRefs.current[i] = el;
                          }}
                          isLast={isLast}
                        />
                      </div>
                      <div className="flex min-h-[5rem] items-center justify-start pl-2 md:min-h-[5.5rem] lg:min-h-[6rem]">
                        <MilestoneMeta milestone={milestone} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex min-h-[5rem] items-center justify-end pr-2 md:min-h-[5.5rem] lg:min-h-[6rem]">
                        <MilestoneMeta milestone={milestone} className="items-end text-right" />
                      </div>
                      <div className="relative flex min-h-[5rem] items-center justify-center md:min-h-[5.5rem] lg:min-h-[6rem]">
                        <TimelineNode
                          ref={(el) => {
                            nodeRefs.current[i] = el;
                          }}
                          isLast={isLast}
                        />
                      </div>
                      <div className="grid min-h-[5rem] w-full min-w-0 grid-cols-[1fr_auto] items-center gap-0 md:min-h-[5.5rem] lg:min-h-[6rem]">
                        <div
                          className={`-ml-5 relative z-[1] h-px min-h-px min-w-[3rem] w-full self-center ${connectorClass}`}
                          aria-hidden
                        />
                        <div className="min-w-0 shrink-0">
                          <MilestoneCard {...cardProps} variant="desktop" hideMeta />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
