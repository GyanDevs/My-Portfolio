"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export default function VelocityStretchCursor() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const dotOuterRef = useRef<HTMLDivElement | null>(null);
  const dotShapeRef = useRef<HTMLDivElement | null>(null);
  const pillOuterRef = useRef<HTMLDivElement | null>(null);
  const pillInnerRef = useRef<HTMLDivElement | null>(null);

  const enabledRef = useRef(false);
  const hasPointerRef = useRef(false);

  // Target mouse position (no lag).
  const targetRef = useRef({ x: 0, y: 0 });
  // Smoothed position for the dot (small lag for organic feel).
  const currentRef = useRef({ x: 0, y: 0 });

  // Velocity stored in pixels/frame-ish units, then decayed per animation frame.
  const velRef = useRef({ x: 0, y: 0 });
  const lastAngleRadRef = useRef(0);

  // Smoothed stretch scale (0..1). Helps the “return to circle” feel natural.
  const stretchScaleRef = useRef(0);

  // Hover state for home case study CTA.
  const caseHoverRef = useRef(false);

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reducedMotion) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    enabledRef.current = true;

    const prevHtmlCursor = document.documentElement.style.cursor;
    const prevBodyCursor = document.body.style.cursor;
    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    const REST = 8;
    const MAX_WIDTH = 38;
    const MIN_HEIGHT = 4;
    const THRESHOLD = 1.5;
    const DECAY = 0.85;
    const LAG = 0.15;
    const MAX_SPEED_FULL = 20; // tune: speed that maps to max stretch

    const dotOuter = dotOuterRef.current;
    const dotShape = dotShapeRef.current;
    const pillOuter = pillOuterRef.current;

    if (!dotOuter || !dotShape || !pillOuter) return;

    // Avoid showing at (0,0) until the first move.
    dotOuter.style.opacity = "0";

    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      if (!hasPointerRef.current) {
        hasPointerRef.current = true;
        targetRef.current = { x: e.clientX, y: e.clientY };
        currentRef.current = { x: e.clientX, y: e.clientY };
        dotOuter.style.opacity = caseHoverRef.current ? "0" : "1";
      } else {
        const dx = e.clientX - targetRef.current.x;
        const dy = e.clientY - targetRef.current.y;
        // Store velocity and let rAF decay it.
        velRef.current.x = dx;
        velRef.current.y = dy;
        targetRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      if (!enabledRef.current) return;

      const { x: tx, y: ty } = targetRef.current;
      const { x: cx, y: cy } = currentRef.current;

      // Dot lag follow.
      const nx = cx + (tx - cx) * LAG;
      const ny = cy + (ty - cy) * LAG;
      currentRef.current.x = nx;
      currentRef.current.y = ny;

      // Decay velocity each frame to keep the stretch “afterglow”.
      velRef.current.x *= DECAY;
      velRef.current.y *= DECAY;

      const speed = Math.hypot(velRef.current.x, velRef.current.y);
      const canStretch = speed > THRESHOLD;

      if (canStretch) {
        lastAngleRadRef.current = Math.atan2(velRef.current.y, velRef.current.x);
      }

      const targetStretch = canStretch
        ? clamp01((speed - THRESHOLD) / (MAX_SPEED_FULL - THRESHOLD))
        : 0;

      // Smooth scale changes to avoid visible jitter.
      stretchScaleRef.current +=
        (targetStretch - stretchScaleRef.current) * 0.25;

      const t = stretchScaleRef.current;
      const scaleX = (REST + (MAX_WIDTH - REST) * t) / REST;
      const scaleY = (REST - (REST - MIN_HEIGHT) * t) / REST;
      const angleDeg = (lastAngleRadRef.current * 180) / Math.PI;

      // Position updates (no transitions to keep it crisp).
      dotOuter.style.transform = `translate3d(${nx}px, ${ny}px, 0)`;
      pillOuter.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;

      // Shape updates via transform-only (GPU-friendly).
      dotShape.style.transform = `translate(-50%, -50%) rotate(${angleDeg}deg) scaleX(${scaleX}) scaleY(${scaleY})`;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      enabledRef.current = false;
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      document.documentElement.style.cursor = prevHtmlCursor;
      document.body.style.cursor = prevBodyCursor;
    };
  }, [reducedMotion]);

  useEffect(() => {
    // If not on home page, ensure CTA pill is hidden.
    const pillInner = pillInnerRef.current;
    const dotOuter = dotOuterRef.current;

    if (!pillInner || !dotOuter) return;

    if (!isHome) {
      caseHoverRef.current = false;
      pillInner.style.opacity = "0";
      pillInner.style.transform = "translate(-50%, -50%) scale(0)";
      dotOuter.style.opacity = "1";
      return;
    }

    if (reducedMotion) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-case-study-card]")
    );
    if (elements.length === 0) return;

    const applyHoverIn = () => {
      caseHoverRef.current = true;
      dotOuter.style.opacity = "0";

      // Scale in with a slight overshoot.
      pillInner.style.opacity = "1";
      pillInner.style.transition = `transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 150ms ease`;
      pillInner.style.transform = "translate(-50%, -50%) scale(1)";
    };

    const applyHoverOut = () => {
      caseHoverRef.current = false;
      dotOuter.style.opacity = "1";

      // Scale out a bit faster.
      pillInner.style.opacity = "0";
      pillInner.style.transition = `transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 150ms ease`;
      pillInner.style.transform = "translate(-50%, -50%) scale(0)";
    };

    elements.forEach((el) => {
      el.addEventListener("mouseenter", applyHoverIn);
      el.addEventListener("mouseleave", applyHoverOut);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", applyHoverIn);
        el.removeEventListener("mouseleave", applyHoverOut);
      });
    };
  }, [isHome, reducedMotion]);

  return (
    <>
      <div
        ref={dotOuterRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[100000] pointer-events-none transition-opacity duration-150 ease-in-out"
        style={{ opacity: 0 }}
      >
        <div
          ref={dotShapeRef}
          className="absolute top-0 left-0 bg-[var(--foreground)] will-change-transform"
          style={{
            width: 8,
            height: 8,
          }}
        />
      </div>

      <div
        ref={pillOuterRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[100001] pointer-events-none"
      >
        <div
          ref={pillInnerRef}
          className="inline-flex items-center gap-2 px-4 py-2 bg-background border border-[var(--grid-line)] text-[var(--foreground)] font-mono text-[12px] uppercase tracking-widest will-change-transform opacity-0 transition-opacity duration-150 ease-in-out"
          style={{
            transform: "translate(-50%, -50%) scale(0)",
          }}
        >
          <span>View case study</span>
          <span aria-hidden="true">→</span>
        </div>
      </div>
    </>
  );
}

