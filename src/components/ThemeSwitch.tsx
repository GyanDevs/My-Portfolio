"use client";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";

// ---
// "Ink Press" Theme Switcher
// Motion Design Philosophy:
//   - Page wipe: hard-edged horizontal inset() clip-path — editorial, not circular
//   - Button: spring-based press + icon rotation — interruptible physics
//   - Tooltip: font-mono label stamps in/out on hover
//   - Reduced-motion: instant crossfade fallback
// ---

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
);

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
    </svg>
);

// Spring config: heavy, satisfying press — like a mechanical key
// NOTE: whileHover scale removed — avoids compositor thrash on fixed-position element
const PRESS_SPRING = { type: "spring", stiffness: 700, damping: 28, mass: 0.6 } as const;
const ICON_SPRING = { type: "spring", stiffness: 400, damping: 20 } as const;

interface ThemeButtonProps {
    isActive: boolean;
    label: string;
    onClick: () => void;
    icon: React.ReactNode;
    ariaLabel: string;
    btnRef: React.RefObject<HTMLButtonElement | null>;
    /**
     * Delay (ms) before the rotation spring fires on activation.
     * Used to sync the spin with when the view-transition wipe
     * actually reveals this button's position in the viewport.
     * Dark button (top-right) is revealed LAST in a L→R wipe (~500ms),
     * so needs a delay. Light button is revealed FIRST (R→L wipe), delay = 0.
     */
    rotationDelay?: number;
}

function ThemeButton({ isActive, label, onClick, icon, ariaLabel, btnRef, rotationDelay = 0 }: ThemeButtonProps) {
    const [hovered, setHovered] = useState(false);
    const iconControls = useAnimationControls();

    useEffect(() => {
        if (isActive) {
            // Newly active — spring spin, delayed so it fires when the
            // view-transition wipe has actually revealed this button.
            iconControls.start({
                rotate: 360,
                transition: {
                    ...ICON_SPRING,
                    delay: rotationDelay / 1000,
                },
            });
        } else {
            // Deactivating — instant reset, no animation, invisible
            iconControls.set({ rotate: 0 });
        }
    }, [isActive, iconControls, rotationDelay]);

    return (
        <motion.div className="relative" onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}>
            {/* Tooltip — stamps in from below */}
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        key="tooltip"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 3 }}
                        transition={{ duration: 0.12, ease: [0.2, 0, 0, 1] }}
                        // Right-anchor so it never overflows the viewport edge
                        className="absolute -bottom-7 right-0 pointer-events-none z-50"
                    >
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] whitespace-nowrap bg-[var(--foreground)] text-[var(--background)] px-2 py-[3px] block">
                            {label}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* The button — spring press on tap only (no hover scale = no perf hit) */}
            <motion.button
                ref={btnRef}
                onClick={onClick}
                aria-label={ariaLabel}
                aria-pressed={isActive}
                whileTap={{ scale: 0.80, transition: PRESS_SPRING }}
                className={`relative p-2 transition-colors duration-200 overflow-hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--foreground)]
                    ${isActive
                        ? "text-[var(--background)] bg-[var(--foreground)]"
                        : "text-neutral-400 hover:text-[var(--foreground)]"
                    }`}
            >
                {/* Active indicator: a sharp inset line sliding in from the left */}
                <AnimatePresence>
                    {isActive && (
                        <motion.span
                            key="active-fill"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            exit={{ scaleX: 0 }}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            className="absolute inset-0 bg-[var(--foreground)] origin-left"
                            style={{ zIndex: 0 }}
                        />
                    )}
                </AnimatePresence>

                {/* Icon — rotates 360° ONLY on activation. Deactivation resets instantly (no reverse spin). */}
                <motion.span
                    className="relative z-10 block"
                    animate={iconControls}
                >
                    {icon}
                </motion.span>
            </motion.button>
        </motion.div>
    );
}

const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const darkBtnRef = useRef<HTMLButtonElement>(null);
    const lightBtnRef = useRef<HTMLButtonElement>(null);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { setMounted(true); }, []);

    const switchTheme = useCallback(
        (newTheme: string, btnRef: React.RefObject<HTMLButtonElement | null>) => {
            if (newTheme === theme) return; // No-op if already active

            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (!btnRef.current || !document.startViewTransition || prefersReducedMotion) {
                setTheme(newTheme);
                return;
            }

            // --- "Ink Press" wipe direction ---
            // Dark → Light: wipe RIGHT-to-LEFT (like lifting a page to reveal white paper)
            // Light → Dark: wipe LEFT-to-RIGHT (like ink flooding across the page)
            const wipeDark = newTheme === "dark";

            const transition = document.startViewTransition(() => {
                setTheme(newTheme);
            });

            transition.ready.then(() => {
                // Hard-edged horizontal inset wipe — pure editorial geometry
                const keyframes = wipeDark
                    ? [
                        { clipPath: "inset(0 100% 0 0)" }, // Start: fully clipped from right
                        { clipPath: "inset(0 0% 0 0)" },   // End: fully revealed
                    ]
                    : [
                        { clipPath: "inset(0 0 0 100%)" }, // Start: fully clipped from left
                        { clipPath: "inset(0 0 0 0%)" },   // End: fully revealed
                    ];

                document.documentElement.animate(keyframes, {
                    duration: 520,
                    // Custom cubic-bezier for a hard acceleration — like ink hitting paper
                    easing: "cubic-bezier(0.9, 0, 0.1, 1)",
                    pseudoElement: "::view-transition-new(root)",
                    fill: "forwards",
                });

                // Simultaneously, slide out the old view in the opposite direction
                const oldKeyframes = wipeDark
                    ? [
                        { clipPath: "inset(0 0 0 0)" },
                        { clipPath: "inset(0 0 0 100%)" },
                    ]
                    : [
                        { clipPath: "inset(0 0 0 0)" },
                        { clipPath: "inset(0 100% 0 0)" },
                    ];

                document.documentElement.animate(oldKeyframes, {
                    duration: 520,
                    easing: "cubic-bezier(0.9, 0, 0.1, 1)",
                    pseudoElement: "::view-transition-old(root)",
                    fill: "forwards",
                });
            });
        },
        [theme, setTheme]
    );

    if (!mounted) return null;

    return (
        <>
            {/*
                View Transition override styles — must be injected globally.
                This suppresses Next.js's default cross-fade so our custom clip-path wipe takes over.
            */}
            <style>{`
                ::view-transition-old(root),
                ::view-transition-new(root) {
                    animation: none;
                    mix-blend-mode: normal;
                }
                ::view-transition-old(root) {
                    z-index: 1;
                }
                ::view-transition-new(root) {
                    z-index: 2;
                }
                @media (prefers-reduced-motion: reduce) {
                    ::view-transition-old(root),
                    ::view-transition-new(root) {
                        animation-duration: 0.01ms !important;
                    }
                }
            `}</style>

            <div
                className="fixed top-[12px] right-4 md:right-8 z-[100] flex items-center bg-background border border-[var(--grid-line)]"
                role="group"
                aria-label="Theme switcher"
            >
                <ThemeButton
                    btnRef={darkBtnRef}
                    isActive={theme === "dark"}
                    label="Dark"
                    ariaLabel="Switch to dark mode"
                    icon={<MoonIcon />}
                    onClick={() => switchTheme("dark", darkBtnRef)}
                    rotationDelay={430}
                />

                {/* 1px vertical separator — grid language */}
                <div className="w-[1px] h-4 bg-[var(--grid-line)]" aria-hidden="true" />

                <ThemeButton
                    btnRef={lightBtnRef}
                    isActive={theme === "light"}
                    label="Light"
                    ariaLabel="Switch to light mode"
                    icon={<SunIcon />}
                    onClick={() => switchTheme("light", lightBtnRef)}
                />
            </div>
        </>
    );
};

export default ThemeSwitch;
