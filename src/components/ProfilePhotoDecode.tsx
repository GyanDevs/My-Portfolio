"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type ProfilePhotoDecodeProps = {
    imageSrc?: string;
    /** Full-color asset revealed on hover (crossfade from base). */
    colorImageSrc?: string;
    imageAlt?: string;
    className?: string;
    /** Smaller portrait for editorial / visiting-card layouts. */
    compact?: boolean;
    /** Fires when pointer enters/leaves the photo control (see parent `group` for shared hover). */
    onHoverChange?: (hovered: boolean) => void;
};

export function ProfilePhotoDecode({
    imageSrc,
    colorImageSrc,
    imageAlt = "Profile photo",
    className,
    compact = false,
    onHoverChange,
}: ProfilePhotoDecodeProps) {
    const reducedMotion = useReducedMotion();
    const photoSize = compact ? "h-36 w-36 md:h-44 md:w-44" : "h-44 w-44 md:h-52 md:w-52";
    const bracketInset = compact ? "-inset-1.5 md:-inset-2" : "-inset-2 md:-inset-3";
    const coverClass =
        "object-cover transition-[filter,opacity] duration-300 ease-out";
    const baseImageClass = colorImageSrc
        ? `${coverClass} grayscale contrast-[1.08] brightness-[0.98] group-hover:opacity-0`
        : `${coverClass} grayscale contrast-[1.08] brightness-[0.98] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100`;

    return (
        <div className={className ?? ""}>
            <motion.div
                className={`group relative inline-flex ${
                    reducedMotion
                        ? ""
                        : "will-change-transform transition-transform duration-[450ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.03]"
                }`}
                initial={false}
                onHoverStart={() => onHoverChange?.(true)}
                onHoverEnd={() => onHoverChange?.(false)}
                style={{ transformOrigin: "center center" }}
            >
                <div className={`relative overflow-hidden rounded-full ${photoSize}`}>
                    {imageSrc ? (
                        <>
                            <Image
                                src={imageSrc}
                                alt={imageAlt}
                                fill
                                className={baseImageClass}
                                sizes="(min-width: 768px) 208px, 176px"
                                priority
                            />
                            {colorImageSrc ? (
                                <Image
                                    src={colorImageSrc}
                                    alt=""
                                    aria-hidden
                                    fill
                                    className={`${coverClass} opacity-0 group-hover:opacity-100`}
                                    sizes="(min-width: 768px) 208px, 176px"
                                />
                            ) : null}
                        </>
                    ) : (
                        <div className="h-full w-full bg-neutral-200 dark:bg-neutral-800" aria-hidden />
                    )}

                    {/* Halftone wash only when there is no dedicated color asset */}
                    {!colorImageSrc ? (
                        <>
                            <div
                                className="pointer-events-none absolute inset-0 z-[1] rounded-full opacity-0 transition-opacity duration-[350ms] group-hover:opacity-100 dark:hidden"
                                style={{
                                    mixBlendMode: "multiply",
                                    backgroundImage:
                                        "radial-gradient(circle, rgba(0,0,0,0.35) 1px, transparent 1px)",
                                    backgroundSize: "4px 4px",
                                    transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                                }}
                            />
                            <div
                                className="pointer-events-none absolute inset-0 z-[1] hidden rounded-full opacity-0 transition-opacity duration-[350ms] group-hover:opacity-100 dark:block"
                                style={{
                                    mixBlendMode: "multiply",
                                    backgroundImage:
                                        "radial-gradient(circle, rgba(255,255,255,0.28) 1px, transparent 1px)",
                                    backgroundSize: "4px 4px",
                                    transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                                }}
                            />
                        </>
                    ) : null}
                </div>

                <div className={`pointer-events-none absolute z-[2] ${bracketInset}`} aria-hidden>
                    <BracketCorner corner="tl" />
                    <BracketCorner corner="tr" />
                    <BracketCorner corner="bl" />
                    <BracketCorner corner="br" />
                </div>
            </motion.div>
        </div>
    );
}

function BracketCorner({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) {
    const ease = "cubic-bezier(0.34, 1.56, 0.64, 1)";
    const base =
        "pointer-events-none absolute h-3 w-3 border-[var(--foreground)] opacity-0 transition-all duration-300 group-hover:opacity-100";

    const cls =
        corner === "tl"
            ? `${base} left-0 top-0 border-l-2 border-t-2 -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0`
            : corner === "tr"
              ? `${base} right-0 top-0 border-r-2 border-t-2 translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0`
              : corner === "bl"
                ? `${base} bottom-0 left-0 border-b-2 border-l-2 -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0`
                : `${base} bottom-0 right-0 border-b-2 border-r-2 translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0`;

    return <div className={cls} style={{ transitionTimingFunction: ease }} />;
}
