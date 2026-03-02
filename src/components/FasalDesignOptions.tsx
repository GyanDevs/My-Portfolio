"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Maximize2 } from "lucide-react";

interface DesignOption {
  title: string;
  src: string;
  items: string[];
}

interface FasalDesignOptionsProps {
  options: DesignOption[];
  onImageClick: (src: string, alt: string) => void;
  mainTitle?: string;
  listLabel?: string;
}

const TAP_SPRING = {
  type: "spring",
  stiffness: 600,
  damping: 25,
  mass: 0.5,
} as const;

// Directional variants for the image panel
// custom: direction (1 = next/→, -1 = prev/←)
const imageVariants = {
  enter: (direction: 1 | -1) => ({
    opacity: 0,
    x: direction * 40,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      mass: 0.7,
    },
  },
  exit: (direction: 1 | -1) => ({
    opacity: 0,
    x: direction * -32,
    transition: { duration: 0.16, ease: [0.4, 0, 1, 1] as const },
  }),
};

// Content panel fades — no x movement needed, text isn't spatial
const contentVariants = {
  enter: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.14, ease: [0.4, 0, 1, 1] as const },
  },
};

export default function FasalDesignOptions({
  options,
  onImageClick,
  mainTitle = "Heat maps",
  listLabel = "Key Findings",
}: FasalDesignOptionsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // direction state: 1 = next (→), -1 = prev (←)
  // Both setDirection and setCurrentIndex are batched in the same render (React 18+),
  // so state is safe here — no stale read risk during the triggered re-render.
  const [direction, setDirection] = useState<1 | -1>(1);

  const nextOption = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % options.length);
  };

  const prevOption = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + options.length) % options.length);
  };

  const currentOption = options[currentIndex];

  return (
    <div className="w-full border border-[var(--grid-line)] bg-background relative overflow-hidden">
      {/* Header / Navigation Controls */}
      <div className="border-b border-[var(--grid-line)] p-4 flex items-center bg-background relative">
        <div className="flex-1 flex justify-start">
          <h4 className="text-[18px] font-bold tracking-tight">{mainTitle}</h4>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
          <span className="font-mono text-[13px] text-neutral-400">
            0{currentIndex + 1} / 0{options.length}
          </span>
        </div>

        <div className="flex-1 flex justify-end gap-4">
          {/* ← Prev: fill enters from LEFT */}
          <motion.button
            onClick={prevOption}
            whileTap={{ scale: 0.82, transition: TAP_SPRING }}
            className="relative p-3 border border-[var(--grid-line)] overflow-hidden group hover:text-[var(--background)]"
            aria-label="Previous option"
          >
            <span className="absolute inset-0 w-full h-full bg-[var(--foreground)] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-[300ms] ease-spring-bouncy" />
            <ArrowLeft className="w-4 h-4 relative z-10 transition-transform duration-[300ms] ease-spring-bouncy group-hover:-translate-x-[3px]" />
          </motion.button>

          {/* → Next: fill enters from RIGHT */}
          <motion.button
            onClick={nextOption}
            whileTap={{ scale: 0.82, transition: TAP_SPRING }}
            className="relative p-3 border border-[var(--grid-line)] overflow-hidden group hover:text-[var(--background)]"
            aria-label="Next option"
          >
            <span className="absolute inset-0 w-full h-full bg-[var(--foreground)] translate-x-[100%] group-hover:translate-x-0 transition-transform duration-[300ms] ease-spring-bouncy" />
            <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-[300ms] ease-spring-bouncy group-hover:translate-x-[3px]" />
          </motion.button>
        </div>
      </div>

      <div className="flex flex-col">
        {/* Image Section */}
        <div className="relative flex items-center justify-center p-6 bg-transparent overflow-hidden h-[250px] md:h-[400px]">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="visible"
              exit="exit"
              className="w-full h-full flex items-center justify-center group cursor-zoom-in"
              onClick={() => onImageClick(currentOption.src, currentOption.title)}
            >
              <img
                src={currentOption.src}
                alt={currentOption.title}
                className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-white/90 dark:bg-black/90 backdrop-blur-md px-4 py-2 flex items-center gap-2 text-[13px] font-mono border border-[var(--grid-line)]">
                  <Maximize2 className="w-3 h-3" /> CLICK TO EXPAND
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content Section */}
        <div className="p-8 lg:p-10 min-h-[250px] bg-background">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              variants={contentVariants}
              initial="enter"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                {listLabel === "All about option" ? currentOption.title : listLabel}
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {currentOption.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex gap-4 items-start text-[16px] text-neutral-500 dark:text-neutral-400"
                  >
                    <span className="font-mono text-[13px] text-neutral-400 mt-1 tabular-nums">
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
