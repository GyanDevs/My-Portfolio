"use client";

import { useEffect } from "react";
import { useMotionValue, type MotionValue } from "framer-motion";
import { useLenis } from "lenis/react";

/** Scroll Y synced to Lenis (falls back to window.scrollY when Lenis is inactive). */
export function useLenisScrollY(): MotionValue<number> {
  const scrollY = useMotionValue(0);

  useLenis((lenis) => {
    scrollY.set(lenis.scroll);
  });

  useEffect(() => {
    const sync = () => scrollY.set(window.scrollY);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, [scrollY]);

  return scrollY;
}
