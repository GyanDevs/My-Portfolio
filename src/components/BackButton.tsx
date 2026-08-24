"use client";

import Link from "next/link";

interface BackButtonProps {
  href?: string;
}

/**
 * Same vocabulary as ConnectLink (footer): mono, bold, uppercase, animated underline.
 * Arrow points back, in front of the label; hover nudges left.
 */
export default function BackButton({ href = "/" }: BackButtonProps) {
  return (
    <Link
      href={href}
      className={
        "connect-link inline-flex items-center gap-1.5 font-mono font-bold uppercase tracking-wide text-[14px] text-[var(--foreground)] " +
        "decoration-2 underline-offset-4 " +
        "transition-transform duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] " +
        "hover:-translate-x-0.5 active:scale-[0.98] " +
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--grid-line)]"
      }
    >
      <span aria-hidden="true">←</span>
      Back
    </Link>
  );
}
