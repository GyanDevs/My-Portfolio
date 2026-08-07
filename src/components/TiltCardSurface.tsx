"use client";

import {
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

/** Interruptible tilt return — matches site spring vocabulary (Kinetic Craft). */
const TILT_SPRING = {
  stiffness: 280,
  damping: 26,
  mass: 0.55,
};

const ROTATE_Y_MAX = 6;
const ROTATE_X_MAX = 4;
const PERSPECTIVE_PX = 900;

type TiltCardSurfaceProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Pointer-tracked 3D tilt + CSS-var shine (Emil: RAF + setProperty, no React x/y state).
 */
export function TiltCardSurface({
  children,
  className = "",
}: TiltCardSurfaceProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const prefersReduced = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, TILT_SPRING);
  const smoothRotateY = useSpring(rotateY, TILT_SPRING);

  useEffect(() => {
    const root = rootRef.current;
    const surface = surfaceRef.current;
    if (!root || !surface || prefersReduced) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;

    const resetShine = () => {
      surface.style.setProperty("--mx", "0.5");
      surface.style.setProperty("--my", "0.5");
    };
    resetShine();

    const handleMove = (event: MouseEvent) => {
      if (rafRef.current !== null) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const rect = surface.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;

        const mx = (event.clientX - rect.left) / rect.width;
        const my = (event.clientY - rect.top) / rect.height;

        surface.style.setProperty("--mx", String(mx));
        surface.style.setProperty("--my", String(my));
        rotateY.set((mx - 0.5) * ROTATE_Y_MAX);
        rotateX.set((my - 0.5) * -ROTATE_X_MAX);
      });
    };

    const handleEnter = () => {
      surface.style.willChange = "transform";
    };

    const handleLeave = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      surface.style.willChange = "auto";
      resetShine();
      rotateX.set(0);
      rotateY.set(0);
    };

    root.addEventListener("mousemove", handleMove);
    root.addEventListener("mouseenter", handleEnter);
    root.addEventListener("mouseleave", handleLeave);

    return () => {
      root.removeEventListener("mousemove", handleMove);
      root.removeEventListener("mouseenter", handleEnter);
      root.removeEventListener("mouseleave", handleLeave);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReduced, rotateX, rotateY]);

  if (prefersReduced) {
    return (
      <div ref={rootRef} className={`h-full ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div ref={rootRef} className={`project-tilt-card h-full ${className}`}>
      <motion.div
        ref={surfaceRef}
        className="project-tilt-surface relative h-full"
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformPerspective: PERSPECTIVE_PX,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
