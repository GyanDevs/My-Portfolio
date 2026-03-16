"use client";
import { useEffect, useState } from "react";
import { useIntro } from "./providers";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// ---------------------------------------------------------------------------
// DigitColumn — renders 0-9 as a vertical strip, animates Y to show the digit
// Pure transform animation — zero layout thrashing, GPU composited
// ---------------------------------------------------------------------------
function DigitColumn({ digit }: { digit: number }) {
  const prefersReduced = useReducedMotion();
  return (
    <span
      className="relative inline-block overflow-hidden"
      style={{ height: "1em" }}
      aria-hidden="true"
    >
      <motion.span
        className="flex flex-col"
        animate={{ y: prefersReduced ? 0 : `${-digit * 10}%` }}
        transition={{
          type: "spring",
          stiffness: 320,
          damping: 38,
          mass: 0.7,
          restDelta: 0.001,
        }}
        style={{ willChange: "transform" }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
          <span key={d} style={{ height: "1em", lineHeight: 1, display: "block" }}>
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

// ---------------------------------------------------------------------------
// SlotCounter — odometer-style rolling counter, always 3 chars + %
// "000%" → "100%" — the leading zeros reinforce the machine aesthetic
// ---------------------------------------------------------------------------
function SlotCounter({ value }: { value: number }) {
  const clamped = Math.min(Math.max(value, 0), 100);
  const h = Math.floor(clamped / 100);      // 0 or 1
  const t = Math.floor((clamped % 100) / 10);
  const o = clamped % 10;

  return (
    <span
      className="font-mono text-xs font-bold tabular-nums text-foreground flex items-center"
      style={{ height: "1em" }}
      aria-label={`${clamped}%`}
    >
      <DigitColumn digit={h} />
      <DigitColumn digit={t} />
      <DigitColumn digit={o} />
      <span style={{ lineHeight: 1 }}>%</span>
    </span>
  );
}

// ---------------------------------------------------------------------------
// LoadingScreen
// ---------------------------------------------------------------------------
export default function LoadingScreen() {
  const { hasPlayed, setHasPlayed, setIntroComplete } = useIntro();
  const [progress, setProgress] = useState(0);
  const prefersReduced = useReducedMotion();

  // Fallback: force completion after 6s so the site never stays stuck
  useEffect(() => {
    if (hasPlayed) return;
    const fallback = setTimeout(() => {
      setProgress(100);
    }, 6000);
    return () => clearTimeout(fallback);
  }, [hasPlayed]);

  // Progress ticker — same algorithm as before, untouched
  useEffect(() => {
    if (hasPlayed) return;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        let increment;
        if (prev < 30) {
          increment = Math.random() * 2.2 + 0.8;
        } else if (prev < 70) {
          increment = Math.random() * 5 + 2;
        } else {
          increment = Math.random() * 10 + 10;
        }
        return Math.min(prev + increment, 100);
      });
    }, 30);
    return () => clearInterval(timer);
  }, [hasPlayed]);

  // Dismiss after 100 — give slot counter a breath to settle (350ms)
  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setHasPlayed(true);
      }, 350);
      return () => clearTimeout(timeout);
    }
  }, [progress, setHasPlayed]);

  // Exit: vertical clip-path wipe upward — same cubic-bezier as Theme Switch
  // Reduced motion: instant opacity fade, no translate
  const exitVariant = prefersReduced
    ? { opacity: 0 }
    : { clipPath: "inset(0 0 100% 0)" };

  const exitTransition = prefersReduced
    ? { duration: 0.01 }
    : { duration: 0.72, ease: [0.9, 0, 0.1, 1] as const };

  const skipIntro = () => {
    setHasPlayed(true);
    setIntroComplete(true);
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={() => setIntroComplete(true)}>
      {!hasPlayed && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[9999] bg-background flex flex-col cursor-pointer"
          role="button"
          tabIndex={0}
          onClick={skipIntro}
          onKeyDown={(e) => e.key === "Enter" && skipIntro()}
          aria-label="Loading — click or wait to continue"
          // Start fully visible (clip reveals everything)
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={exitVariant}
          transition={exitTransition}
          style={{ willChange: "clip-path" }}
        >
          {/* ── TOP BAR — Brutalist editorial header ─────────────────────── */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-[var(--grid-line)]">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground">
              Gyan
            </span>
            <SlotCounter value={Math.round(progress)} />
          </div>

          {/* ── MIDDLE — editorial breathing room ────────────────────────── */}
          <div className="flex-1 flex flex-col justify-end px-8 pb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-600">
              Portfolio · 2026
            </span>
          </div>

          {/* ── BOTTOM — full-viewport-width spring progress bar ──────────── */}
          <div
            className="h-[1px] w-full bg-neutral-200 dark:bg-neutral-800 relative overflow-hidden"
            aria-hidden="true"
          >
            <motion.div
              className="absolute inset-0 h-full bg-foreground origin-left"
              animate={{ scaleX: progress / 100 }}
              initial={{ scaleX: 0 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 60,
                mass: 1,
                restDelta: 0.001,
              }}
              style={{ willChange: "transform" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
