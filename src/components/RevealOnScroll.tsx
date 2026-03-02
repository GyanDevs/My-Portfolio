"use client";
import { useEffect, useRef } from "react";
import { useIntro } from "@/src/components/providers";

// ============================================================
// Module-level singleton IntersectionObserver
// ONE observer watches ALL RevealOnScroll elements on the page.
// Cost: O(1) setup, O(n) callbacks only when elements cross threshold.
// No React state updates on scroll — classList mutation only.
// ============================================================
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver(): IntersectionObserver {
    if (sharedObserver) return sharedObserver;

    sharedObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Direct DOM mutation — zero React render cycle
                    (entry.target as HTMLElement).classList.add("is-revealed");
                    // Unobserve immediately — once revealed, always revealed
                    sharedObserver?.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -32px 0px",
        },
    );

    return sharedObserver;
}

interface RevealOnScrollProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

export default function RevealOnScroll({
    children,
    delay = 0,
    className = "",
}: RevealOnScrollProps) {
    const elRef = useRef<HTMLDivElement>(null);
    const { introComplete } = useIntro();

    // Capture introComplete at mount time — same wasAlreadyComplete pattern
    // used by Typewriter and HeroEntry:
    //   true  → back-nav / case study nav → observe immediately
    //   false → first load → wait for introComplete before observing
    //           (loading screen is `position:fixed` so IO sees page content
    //            as "in viewport" even while hidden — MUST gate on introComplete)
    const wasAlreadyComplete = useRef(introComplete);

    // CASE 1: Back-navigation or direct case study link — intro already done.
    // Start observing immediately on mount.
    useEffect(() => {
        if (!wasAlreadyComplete.current) return;

        const el = elRef.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const obs = getSharedObserver();
        obs.observe(el);
        return () => obs.unobserve(el);
    }, []);

    // CASE 2: First load — wait for loading screen to exit, then observe.
    // introComplete flips true after the clip-path wipe's onExitComplete.
    useEffect(() => {
        if (wasAlreadyComplete.current) return; // already handled above
        if (!introComplete) return;

        const el = elRef.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const obs = getSharedObserver();
        obs.observe(el);
        return () => obs.unobserve(el);
    }, [introComplete]);

    return (
        <div
            ref={elRef}
            className={`reveal${className ? ` ${className}` : ""}`}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
        >
            {children}
        </div>
    );
}
