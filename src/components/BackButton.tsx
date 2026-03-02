"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const TAP_SPRING = { type: "spring", stiffness: 700, damping: 28, mass: 0.6 } as const;

interface BackButtonProps {
  href?: string;
}

export default function BackButton({ href = "/" }: BackButtonProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.94, transition: TAP_SPRING }}
      className="w-fit"
    >
      <Link
        href={href}
        className="group relative flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-[var(--foreground)] hover:text-[var(--background)] border border-[var(--grid-line)] overflow-hidden px-3 py-2"
      >
        {/* Slide-fill: enters from left — consistent with site-wide slide-fill vocabulary */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[var(--foreground)] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-[300ms] ease-spring-bouncy"
        />
        {/* Arrow drifts left on hover — directional feedback */}
        <span className="relative z-10 transition-transform duration-[300ms] ease-spring-bouncy group-hover:translate-x-[-4px]">
          ←
        </span>
        <span className="relative z-10">BACK</span>
      </Link>
    </motion.div>
  );
}
