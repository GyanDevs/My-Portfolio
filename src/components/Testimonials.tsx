"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import testimonialsData from "@/src/data/testimonials.json";

// Spring used only for event-driven tap — matches CtaButton vocabulary
const TAP_SPRING = {
  type: "spring",
  stiffness: 600,
  damping: 25,
  mass: 0.5,
} as const;

// Card variants — direction-aware enter/exit.
// custom: { direction: 1 | -1, index: number }
// direction 1 = next (→), -1 = prev (←)
// Enter from the direction of travel; exit in the opposite direction.
// GPU-composited: only x (transform) + opacity — zero layout triggers.
const cardVariants = {
  enter: ({ direction }: { direction: 1 | -1; index: number }) => ({
    opacity: 0,
    x: direction * 56,
  }),
  visible: ({ index }: { direction: 1 | -1; index: number }) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 280,
      damping: 28,
      mass: 0.8,
      delay: index * 0.055,
    },
  }),
  exit: ({ direction }: { direction: 1 | -1; index: number }) => ({
    opacity: 0,
    x: direction * -40,
    transition: {
      duration: 0.18,
      ease: [0.4, 0, 1, 1] as const,
    },
  }),
};

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const TESTIMONIAL_HIGHLIGHT_PHRASES = [
  // Core decision-making / influence
  "what and how",
  "why behind",
  "ownership",
  "ownership.",
  "open to",
  "maturity",
  "collaborative",
  "team player",
  "positive attitude",
  "sense of humor",
  "fun to work with",
  // Product + users
  "user behaviour",
  "user behavior",
  "user experience",
  "product experiences",
  "business goals",
  "constraints",
  "clean, intuitive",
  "user-friendly",
  "effective product designer",
  "incredibly effective",
  // Evidence + rigor
  "data-driven",
  "confirmation bias",
  "data-driven design decisions",
  // Strategy / innovation
  "innovative ideas",
  "forward-thinking",
  "forward-thinking mindset",
  "game-changer",
  "cutting-edge",
  "impactful products",
  // Debates / alignment
  "difficult debates",
  "challenge the status quo",
] as const;

const TESTIMONIAL_HIGHLIGHT_MAX = 3;

// Pre-built regex so we don't allocate per render.
// Note: contains `gi` so we can use `exec` and limit highlights.
const TESTIMONIAL_HIGHLIGHT_REGEX = (() => {
  const sorted = [...TESTIMONIAL_HIGHLIGHT_PHRASES].sort((a, b) => b.length - a.length);
  const escaped = sorted.map(escapeRegExp);
  return new RegExp(`(${escaped.join("|")})`, "gi");
})();

/**
 * Lightweight “impact” highlighting for testimonials.
 * Wraps a few high-signal phrases with the same bold style
 * used for Impact sections elsewhere (`**...**` → <strong>...).
 */
function highlightTestimonialsText(text: string) {
  let highlightsUsed = 0;
  let lastIndex = 0;
  const out: React.ReactNode[] = [];

  // Reset lastIndex since regex is module-scoped.
  TESTIMONIAL_HIGHLIGHT_REGEX.lastIndex = 0;

  let match: RegExpExecArray | null = null;
  while (highlightsUsed < TESTIMONIAL_HIGHLIGHT_MAX && (match = TESTIMONIAL_HIGHLIGHT_REGEX.exec(text))) {
    const m = match[0];
    const index = match.index ?? 0;

    if (index > lastIndex) out.push(text.slice(lastIndex, index));
    out.push(
      <strong key={`hl-${index}-${highlightsUsed}`} className="font-sans font-bold text-[var(--foreground)]">
        {m}
      </strong>,
    );
    highlightsUsed += 1;
    lastIndex = index + m.length;
  }

  if (lastIndex < text.length) out.push(text.slice(lastIndex));
  return out;
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  // direction state: 1 = next (→), -1 = prev (←)
  // setDirection and setCurrentIndex are batched (React 18+) so the triggered
  // re-render sees the correct direction value without a ref.
  const [direction, setDirection] = useState<1 | -1>(1);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerPage(3);
      else if (window.innerWidth >= 768) setItemsPerPage(2);
      else setItemsPerPage(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonialsData.length - itemsPerPage);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  React.useEffect(() => {
    setCurrentIndex((prev) =>
      Math.min(prev, Math.max(0, testimonialsData.length - itemsPerPage))
    );
  }, [itemsPerPage]);

  const visibleTestimonials = testimonialsData.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  const atStart = currentIndex === 0;
  const atEnd = currentIndex >= maxIndex;

  return (
    <section className="bg-background py-24">
      <div className="max-w-[1600px] mx-auto px-8 md:px-12">
        {/* Header with Navigation */}
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            From the people I've worked with
          </h2>

          <div className="flex gap-4">
            {/* ← Prev: fill enters from LEFT — semantic for "going back" */}
            <motion.button
              onClick={prevSlide}
              disabled={atStart}
              whileTap={atStart ? {} : { scale: 0.82, transition: TAP_SPRING }}
              className={`relative p-3 border border-[var(--grid-line)] overflow-hidden
                ${atStart
                  ? "opacity-30 cursor-not-allowed"
                  : "group hover:text-[var(--background)]"
                }`}
              aria-label="Previous testimonial"
            >
              {/* Fill enters from left */}
              <span className="absolute inset-0 w-full h-full bg-[var(--foreground)] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-[300ms] ease-spring-bouncy" />
              {/* Icon drifts left on hover */}
              <ArrowLeft className="w-5 h-5 relative z-10 transition-transform duration-[300ms] ease-spring-bouncy group-hover:-translate-x-[3px]" />
            </motion.button>

            {/* → Next: fill enters from RIGHT — semantic for "going forward" */}
            <motion.button
              onClick={nextSlide}
              disabled={atEnd}
              whileTap={atEnd ? {} : { scale: 0.82, transition: TAP_SPRING }}
              className={`relative p-3 border border-[var(--grid-line)] overflow-hidden
                ${atEnd
                  ? "opacity-30 cursor-not-allowed"
                  : "group hover:text-[var(--background)]"
                }`}
              aria-label="Next testimonial"
            >
              {/* Fill enters from right */}
              <span className="absolute inset-0 w-full h-full bg-[var(--foreground)] translate-x-[100%] group-hover:translate-x-0 transition-transform duration-[300ms] ease-spring-bouncy" />
              {/* Icon drifts right on hover */}
              <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-[300ms] ease-spring-bouncy group-hover:translate-x-[3px]" />
            </motion.button>
          </div>
        </div>

        {/* Testimonials Grid — overflow-hidden clips the directional x slide */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden">
          <AnimatePresence mode="popLayout">
            {visibleTestimonials.map((item, index) => {
              const actualIndex = currentIndex + index;
              const custom = { direction, index };

              return (
                <motion.div
                  key={`${item.id}-${currentIndex}`}
                  custom={custom}
                  variants={cardVariants}
                  initial="enter"
                  animate="visible"
                  exit="exit"
                  className={`
                    ${index !== 0 ? "border-l border-[var(--grid-line)] pl-8" : ""}
                    pr-12 py-4 flex flex-col justify-between min-h-[300px]
                    ${index === 1 ? "hidden md:flex" : ""}
                    ${index === 2 ? "hidden lg:flex" : ""}
                  `}
                >
                  <div>
                    <div className="flex justify-end items-start mb-6">
                      <span className="font-mono text-xs text-neutral-400">
                        {actualIndex + 1}/{testimonialsData.length}
                      </span>
                    </div>
                    <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
                      {highlightTestimonialsText(item.text)}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-4">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.author}
                        className="w-10 h-10 object-cover border border-[var(--grid-line)]"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-serif italic text-neutral-400 border border-[var(--grid-line)]">
                        {item.author.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="font-mono font-bold text-sm uppercase tracking-wide">
                        {item.author}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mt-1 uppercase">
                        {item.role}
                        {item.company ? ` at ${item.company}` : ""}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
