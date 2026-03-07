"use client";

import React from "react";

export interface ConnectLinkProps {
  href: string;
  label: string;
  external?: boolean;
}

/**
 * Shared link for Connect (resume) and Social (footer).
 * Animated underline on hover, slight nudge, tactile active scale.
 * Respects prefers-reduced-motion.
 */
export default function ConnectLink({
  href,
  label,
  external = true,
}: ConnectLinkProps) {
  const base =
    "connect-link inline-block font-mono font-bold uppercase tracking-wide text-[14px] text-[var(--foreground)] " +
    "decoration-2 underline-offset-4 " +
    "transition-transform duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] " +
    "hover:translate-x-0.5 active:scale-[0.98] " +
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--grid-line)]";

  const attrs = external
    ? { target: "_blank", rel: "noopener noreferrer" as const }
    : {};

  return (
    <a href={href} className={base} {...attrs}>
      {label}
    </a>
  );
}
