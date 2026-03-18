"use client";

import React, { useEffect, useMemo, useRef } from "react";

export type CountUpOnRevealProps = {
  to: number;
  decimals: number;
  suffix?: string;
  /**
   * Starting point as a ratio of `to`.
   * Example: 0.5 => start at 50% of the final value.
   */
  fromRatio?: number;
  /**
   * Midpoint as a ratio of `to`.
   * Example: 0.8 => briefly reach 80% of the final value before settling.
   */
  midRatio?: number;
  /** Total animation duration in ms. */
  durationMs?: number;
  /** Optional delay applied after the element becomes visible. */
  delayMs?: number;
  className?: string;
};

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
// Ease curves chosen to keep velocity continuous at phase boundaries.
// (We avoid an abrupt derivative jump that can make the number tween feel "janky".)
const easeInOutQuint = (t: number) =>
  t < 0.5 ? 16 * Math.pow(t, 5) : 1 - Math.pow(-2 * t + 2, 5) / 2;
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * Math.pow(t, 3) : 1 - Math.pow(-2 * t + 2, 3) / 2;

function formatValue(value: number, decimals: number, suffix?: string) {
  const fixed = value.toFixed(decimals);
  return `${fixed}${suffix ?? ""}`;
}

export default function CountUpOnReveal({
  to,
  decimals,
  suffix,
  fromRatio = 0.5,
  midRatio = 0.8,
  durationMs = 900,
  delayMs = 0,
  className = "",
}: CountUpOnRevealProps) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const startedRef = useRef(false);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const fromValue = to * fromRatio;
  const midValue = to * midRatio;

  const initialText = useMemo(() => {
    const initial = prefersReducedMotion ? to : fromValue;
    return formatValue(initial, decimals, suffix);
  }, [decimals, fromValue, prefersReducedMotion, suffix, to]);

  // Set initial content (and reduced-motion final) without re-rendering per frame.
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    el.textContent = initialText;
  }, [initialText]);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    if (prefersReducedMotion) return;
    if (startedRef.current) return;
    if (typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        startedRef.current = true;
        obs.disconnect();

        const startAnimation = () => {
          const phase1Ms = Math.round(durationMs * 0.7);
          const phase2Ms = Math.max(1, durationMs - phase1Ms);
          const totalMs = phase1Ms + phase2Ms;

          const t0 = performance.now();
          let lastText = "";

          const tick = (now: number) => {
            const elapsed = Math.max(0, now - t0);

            let current: number;
            if (elapsed < phase1Ms) {
              const p = clamp01(elapsed / phase1Ms);
              // Phase 1: from -> mid, smooth at both ends.
              current = fromValue + (midValue - fromValue) * easeInOutQuint(p);
            } else if (elapsed < phase1Ms + phase2Ms) {
              const p = clamp01((elapsed - phase1Ms) / phase2Ms);
              // Phase 2: mid -> to, smooth at both ends (start velocity matches phase 1 end velocity).
              current = midValue + (to - midValue) * easeInOutCubic(p);
            } else {
              current = to;
            }

            const nextText = formatValue(current, decimals, suffix);
            if (nextText !== lastText) {
              el.textContent = nextText;
              lastText = nextText;
            }

            if (elapsed < totalMs) {
              requestAnimationFrame(tick);
            } else {
              // Ensure the final value is exact.
              const finalText = formatValue(to, decimals, suffix);
              if (finalText !== lastText) el.textContent = finalText;
            }
          };

          requestAnimationFrame(tick);
        };

        if (delayMs > 0) {
          window.setTimeout(startAnimation, delayMs);
        } else {
          startAnimation();
        }
      },
      { threshold: 0.25 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [delayMs, decimals, durationMs, fromValue, midValue, prefersReducedMotion, suffix, to]);

  return (
    <div
      ref={elRef}
      className={className}
      aria-label={formatValue(to, decimals, suffix)}
      aria-live="off"
    >
      {initialText}
    </div>
  );
}

