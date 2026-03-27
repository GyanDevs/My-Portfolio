"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";

const OFFSET_X = 14;
const OFFSET_Y = 14;
const CLAMP_MARGIN = 6;

/** Position spring after cross-link handoff — snappy settle (Kinetic Craft). */
const HANDOFF_SPRING_STIFFNESS = 0.42;
const HANDOFF_SPRING_EPS = 0.45;

const HANDOFF_SCALE_SPRING = {
  type: "spring" as const,
  stiffness: 520,
  damping: 28,
  mass: 0.55,
};

function clampFixedPositionToRect(
  left: number,
  top: number,
  pillW: number,
  pillH: number,
  rect: DOMRect,
): { left: number; top: number } {
  const m = CLAMP_MARGIN;
  const l =
    pillW <= rect.width - 2 * m
      ? Math.min(Math.max(rect.left + m, left), rect.right - pillW - m)
      : rect.left + m;
  const t =
    pillH <= rect.height - 2 * m
      ? Math.min(Math.max(rect.top + m, top), rect.bottom - pillH - m)
      : rect.top + m;
  return { left: l, top: t };
}

/** Shared dark pill + white label (case study + design love cursors). */
export const FOLLOW_CURSOR_PILL_ACCENT_CLASSNAME =
  "!bg-neutral-950/95 !text-white border-neutral-600 dark:!bg-neutral-950/95 dark:!text-white dark:border-neutral-600";

export type FollowCursorPillProps = {
  children: React.ReactNode;
  /** When set, the pill only appears while the pointer is over a matching element (via `element.closest()`). When omitted, the pill shows for the whole container. */
  activeWithinSelector?: string;
  /**
   * When set, the pill’s box is kept inside this descendant of the wrapper (viewport coords).
   * Use for bordered regions so the label does not spill past the visible frame.
   */
  clampWithinSelector?: string;
  /** Merged onto the pill container (e.g. theme overrides). */
  pillClassName?: string;
  /**
   * When true (with `activeWithinSelector` on anchors): scale pulse + position spring
   * when moving from one matching link’s `href` to another.
   */
  crossTargetHandoff?: boolean;
  label: React.ReactNode;
};

/**
 * Floating label that follows the pointer; position updates via refs (no per-frame React state).
 * Pointer moves are rAF-coalesced (≤1 layout pass per frame). Clamp bounds refresh on scroll/resize.
 * The pill is portaled to `document.body` so `position: fixed` uses the viewport.
 */
export default function FollowCursorPill({
  children,
  activeWithinSelector,
  clampWithinSelector,
  pillClassName = "",
  crossTargetHandoff = false,
  label,
}: FollowCursorPillProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [handoffGeneration, setHandoffGeneration] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || prefersReduced) return;

    const container = containerRef.current;
    const pill = pillRef.current;
    if (!container || !pill) return;

    let active = false;
    let lastHref: string | null = null;
    let targetX = 0;
    let targetY = 0;
    let displayX = 0;
    let displayY = 0;
    let positionSpringing = false;
    let springRafId: number | null = null;

    /** Cached clamp rect — invalidated when the viewport or scroll position moves the gallery. */
    let clampRectCache: DOMRect | null = null;

    const invalidateClampRect = () => {
      clampRectCache = null;
    };

    const getClampRect = (): DOMRect | null => {
      if (!clampWithinSelector) return null;
      if (clampRectCache) return clampRectCache;
      const el = container.querySelector(clampWithinSelector);
      if (!el) return null;
      clampRectCache = el.getBoundingClientRect();
      return clampRectCache;
    };

    const cancelSpringRaf = () => {
      if (springRafId != null) {
        cancelAnimationFrame(springRafId);
        springRafId = null;
      }
    };

    const springTick = () => {
      const k = HANDOFF_SPRING_STIFFNESS;
      displayX += (targetX - displayX) * k;
      displayY += (targetY - displayY) * k;
      pill.style.left = `${displayX}px`;
      pill.style.top = `${displayY}px`;
      const dist = Math.hypot(targetX - displayX, targetY - displayY);
      if (dist < HANDOFF_SPRING_EPS) {
        displayX = targetX;
        displayY = targetY;
        pill.style.left = `${displayX}px`;
        pill.style.top = `${displayY}px`;
        positionSpringing = false;
        springRafId = null;
        return;
      }
      springRafId = requestAnimationFrame(springTick);
    };

    const ensureSpringLoop = () => {
      if (springRafId == null) {
        springRafId = requestAnimationFrame(springTick);
      }
    };

    const applyInstantPosition = (x: number, y: number) => {
      displayX = x;
      displayY = y;
      pill.style.left = `${x}px`;
      pill.style.top = `${y}px`;
    };

    let pendingMove: MouseEvent | null = null;
    let pointerRafId: number | null = null;

    const cancelPointerRaf = () => {
      if (pointerRafId != null) {
        cancelAnimationFrame(pointerRafId);
        pointerRafId = null;
      }
      pendingMove = null;
    };

    const flushPointerMove = () => {
      pointerRafId = null;
      const e = pendingMove;
      if (!e) return;
      pendingMove = null;

      let left = e.clientX + OFFSET_X;
      let top = e.clientY + OFFSET_Y;

      const rect = getClampRect();
      if (rect) {
        const pw = pill.offsetWidth || 1;
        const ph = pill.offsetHeight || 1;
        const clamped = clampFixedPositionToRect(left, top, pw, ph, rect);
        left = clamped.left;
        top = clamped.top;
      }

      targetX = left;
      targetY = top;

      if (activeWithinSelector) {
        const match = (e.target as Element | null)?.closest?.(
          activeWithinSelector,
        );
        if (match) {
          if (!active) {
            active = true;
            pill.style.opacity = "1";
            invalidateClampRect();
            applyInstantPosition(targetX, targetY);
            if (
              crossTargetHandoff &&
              match instanceof HTMLAnchorElement
            ) {
              lastHref = match.getAttribute("href") || "";
            }
          } else if (
            crossTargetHandoff &&
            match instanceof HTMLAnchorElement
          ) {
            const href = match.getAttribute("href") || "";
            if (lastHref && href && lastHref !== href) {
              setHandoffGeneration((g) => g + 1);
              positionSpringing = true;
              ensureSpringLoop();
            }
            lastHref = href;
          }
        } else {
          if (active) {
            active = false;
            pill.style.opacity = "0";
            lastHref = null;
            positionSpringing = false;
            cancelSpringRaf();
          }
          return;
        }
      } else {
        if (!active) {
          active = true;
          pill.style.opacity = "1";
          applyInstantPosition(targetX, targetY);
        }
      }

      if (pill.style.opacity === "0") {
        return;
      }

      if (!positionSpringing) {
        applyInstantPosition(targetX, targetY);
      } else {
        ensureSpringLoop();
      }
    };

    const onMove = (e: MouseEvent) => {
      pendingMove = e;
      if (pointerRafId == null) {
        pointerRafId = requestAnimationFrame(flushPointerMove);
      }
    };

    const onLeave = () => {
      cancelPointerRaf();
      if (active) {
        active = false;
        pill.style.opacity = "0";
        lastHref = null;
        positionSpringing = false;
        cancelSpringRaf();
      }
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);

    let scrollResizeAttached = false;
    if (clampWithinSelector) {
      scrollResizeAttached = true;
      window.addEventListener("resize", invalidateClampRect, { passive: true });
      window.addEventListener("scroll", invalidateClampRect, {
        passive: true,
        capture: true,
      });
    }

    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      cancelPointerRaf();
      cancelSpringRaf();
      if (scrollResizeAttached) {
        window.removeEventListener("resize", invalidateClampRect);
        window.removeEventListener("scroll", invalidateClampRect, {
          capture: true,
        });
      }
    };
  }, [
    mounted,
    prefersReduced,
    activeWithinSelector,
    clampWithinSelector,
    crossTargetHandoff,
  ]);

  if (prefersReduced) {
    return <>{children}</>;
  }

  const showHandoffScale =
    crossTargetHandoff && handoffGeneration > 0;

  const pillNode = (
    <div
      ref={pillRef}
      className="pointer-events-none fixed left-0 top-0 z-[100] opacity-0 will-change-[opacity,left,top]"
      aria-hidden
    >
      <motion.div
        key={handoffGeneration}
        initial={
          showHandoffScale ? { scale: 0.94 } : false
        }
        animate={{ scale: 1 }}
        transition={HANDOFF_SCALE_SPRING}
        className={`flex items-center gap-2 border border-[var(--grid-line)] bg-background/95 px-3 py-2 font-mono text-[11px] text-foreground shadow-sm backdrop-blur-sm dark:bg-black/85 ${pillClassName}`}
      >
        {label}
      </motion.div>
    </div>
  );

  return (
    <>
      <div ref={containerRef} className="relative w-full">
        {children}
      </div>
      {mounted && typeof document !== "undefined"
        ? createPortal(pillNode, document.body)
        : null}
    </>
  );
}
