"use client";

/**
 * CtaButton — Unified CTA Interaction System
 *
 * One interaction vocabulary, applied consistently across all CTAs.
 *
 * Motion anatomy (performance-first):
 *   1. Slide-fill    → CSS transition on transform (GPU composited, zero JS)
 *   2. Label nudge   → CSS group-hover:translate-x-1 (GPU composited, zero JS)
 *   3. Icon drift    → CSS group-hover, direction-aware (GPU composited, zero JS)
 *   4. Press spring  → Framer Motion whileTap only (event-driven, not sustained)
 *
 * All hover effects are pure CSS — no JS mouseover listeners,
 * no useState, no requestAnimationFrame. Framer Motion only fires on tap.
 */

import Link from "next/link";
import { motion } from "framer-motion";

// Framer Motion spring — typed as const so TS narrows "spring" to a literal
const TAP_SPRING = {
    type: "spring",
    stiffness: 600,
    damping: 25,
    mass: 0.5,
} as const;

// Wrap Next.js Link with Framer Motion so whileTap works on the <a> element
const MotionLink = motion(Link);
const MotionAnchor = motion.a;

// ─────────────────────────────────────────────────────────────────────────────
// Icon atoms — each drifts in its semantic direction via CSS group-hover
// ─────────────────────────────────────────────────────────────────────────────

function ArrowRightIcon() {
    return (
        <span
            aria-hidden="true"
            className="
        inline-block relative z-10
        transition-transform duration-[320ms] ease-spring-bouncy
        group-hover:translate-x-[6px]
      "
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
            </svg>
        </span>
    );
}

function DownloadIcon() {
    return (
        <span
            aria-hidden="true"
            className="
        inline-block relative z-10
        transition-transform duration-[320ms] ease-spring-bouncy
        group-hover:translate-y-[5px]
      "
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
        </span>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared inner layout — same DOM structure for all variants
// ─────────────────────────────────────────────────────────────────────────────

function CtaInner({
    label,
    icon,
}: {
    label: string;
    icon?: React.ReactNode;
}) {
    return (
        <>
            {/* Slide-fill — pure CSS transform, GPU layer promoted by overflow:hidden parent */}
            <span
                aria-hidden="true"
                className="
          absolute inset-0 w-full h-full
          bg-[var(--foreground)]
          translate-x-[-100%] group-hover:translate-x-0
          transition-transform duration-[320ms] ease-spring-bouncy
        "
            />

            {/* Content row — nudges right as a unit on hover */}
            <span
                className="
          relative z-10 flex items-center gap-2
          transition-transform duration-[320ms] ease-spring-bouncy
          group-hover:translate-x-[3px]
        "
            >
                {icon}
                <span>{label}</span>
            </span>
        </>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Base class — applied to every CTA regardless of variant
// ─────────────────────────────────────────────────────────────────────────────

const BASE_CLASS = `
  group relative inline-flex items-center justify-center gap-2
  font-mono text-sm uppercase tracking-widest
  bg-transparent text-[var(--foreground)] border border-[var(--foreground)]
  hover:text-[var(--background)]
  px-6 py-3 overflow-hidden
  transition-colors duration-[280ms]
  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--foreground)]
  select-none
`.trim();

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

export type CtaIcon = "arrow-right" | "download" | "none";

interface CtaButtonProps {
    label: string;
    icon?: CtaIcon;
    className?: string;
}

// Internal link (Next.js navigation)
interface CtaLinkProps extends CtaButtonProps {
    as: "link";
    href: string;
}

// External / mailto link
interface CtaAnchorProps extends CtaButtonProps {
    as: "anchor";
    href: string;
    target?: string;
    rel?: string;
    /** `true` or the file name the browser should use (same-origin URLs). */
    download?: boolean | string;
}

// Button with click handler
interface CtaButtonClickProps extends CtaButtonProps {
    as: "button";
    onClick: () => void;
}

type Props = CtaLinkProps | CtaAnchorProps | CtaButtonClickProps;

export default function CtaButton(props: Props) {
    const { label, icon = "none", className = "" } = props;

    const iconNode =
        icon === "arrow-right" ? <ArrowRightIcon /> :
            icon === "download" ? <DownloadIcon /> :
                null;

    if (props.as === "link") {
        return (
            <MotionLink
                href={props.href}
                className={`${BASE_CLASS} ${className}`}
                whileTap={{ scale: 0.96, transition: TAP_SPRING }}
            >
                <CtaInner label={label} icon={iconNode} />
            </MotionLink>
        );
    }

    if (props.as === "button") {
        return (
            <motion.button
                onClick={props.onClick}
                className={`${BASE_CLASS} ${className}`}
                whileTap={{ scale: 0.96, transition: TAP_SPRING }}
            >
                <CtaInner label={label} icon={iconNode} />
            </motion.button>
        );
    }

    return (
        <MotionAnchor
            href={props.href}
            target={props.target}
            rel={props.rel}
            download={props.download}
            className={`${BASE_CLASS} ${className}`}
            whileTap={{ scale: 0.96, transition: TAP_SPRING }}
        >
            <CtaInner label={label} icon={iconNode} />
        </MotionAnchor>
    );
}
