"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import type { BookGridItem } from "@/src/components/BooksGrid";

/**
 * Quiet Favre bookshelf: muted single-hue washes, flat silhouette,
 * colour-as-shadow side, sparse line marks. Fits the page grid.
 */

const FALLBACK_SPINE = {
  fill: "#EDE8F4",
  fillDark: "#282235",
  shadow: "#D6CCE4",
  shadowDark: "#1C1626",
  ink: "#6B5190",
  inkDark: "#C0A8D4",
};

const SPINE_WIDTHS = [44, 40, 54, 46, 42, 48, 50, 38];
const SPINE_HEIGHTS = [176, 196, 154, 184, 166, 190, 178, 160];
const SPINE_LEANS = [-0.5, 0.35, -0.15, 0.4, -0.35, 0.25, -0.2, 0.3];

type SpineMark = "none" | "rules" | "frame" | "band";
const SPINE_MARKS: SpineMark[] = ["none", "rules", "none", "frame", "none", "none", "none", "rules"];

const PULL_SPRING = { type: "spring" as const, stiffness: 420, damping: 28, mass: 0.85 };
const CHIP_SPRING = { type: "spring" as const, stiffness: 520, damping: 32, mass: 0.7 };
const TAP_SPRING = { type: "spring" as const, stiffness: 600, damping: 35, mass: 0.6 };

function resolveSpine(item: BookGridItem, isDark: boolean) {
  const s = item.spine ?? FALLBACK_SPINE;
  return {
    fill: isDark ? (s.fillDark ?? s.fill) : s.fill,
    shadow: isDark ? (s.shadowDark ?? s.shadow) : s.shadow,
    ink: isDark ? (s.inkDark ?? s.ink) : s.ink,
  };
}

function BookSpine({
  item,
  width,
  height,
  lean,
  mark,
}: {
  item: BookGridItem;
  width: number;
  height: number;
  lean: number;
  mark: SpineMark;
}) {
  const reduceMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const { fill, shadow, ink } = resolveSpine(item, isDark);

  const sideW = Math.max(6, Math.round(width * 0.18));
  const faceW = Math.max(22, width - sideW);

  return (
    <motion.div
      tabIndex={0}
      aria-label={`${item.title} by ${item.author}`}
      className="group relative min-w-0 cursor-default outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]"
      style={{ flex: `${width} 1 0px`, height: height + 28 }}
      initial="rest"
      whileHover="pull"
      whileFocus="pull"
      whileTap={reduceMotion ? undefined : "press"}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 z-30 -translate-x-1/2 whitespace-nowrap bg-[var(--foreground)] px-2.5 py-1 font-mono text-[14px] uppercase tracking-tight text-[var(--background)]"
        variants={{
          rest: {
            opacity: 0,
            y: 6,
            scale: 0.92,
            transition: reduceMotion
              ? { duration: 0.12 }
              : { ...CHIP_SPRING, opacity: { duration: 0.15 } },
          },
          pull: {
            opacity: 1,
            y: -6,
            scale: 1,
            transition: reduceMotion
              ? { duration: 0.15 }
              : { ...CHIP_SPRING, delay: 0.04 },
          },
          press: {
            opacity: 1,
            y: -4,
            scale: 0.97,
            transition: TAP_SPRING,
          },
        }}
      >
        {item.author}
      </motion.span>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-1 left-[2px] right-[-3px] z-0 h-[4px]"
        style={{
          background: `color-mix(in srgb, ${shadow} 40%, transparent)`,
          clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)",
        }}
        variants={{
          rest: { opacity: 0.35, scaleX: 1 },
          pull: { opacity: 0.08, scaleX: 0.88 },
          press: { opacity: 0.22, scaleX: 0.95 },
        }}
        transition={reduceMotion ? { duration: 0.12 } : PULL_SPRING}
      />

      <motion.div
        className="absolute inset-x-0 bottom-0 z-[1] origin-bottom will-change-transform"
        style={{ height }}
        variants={{
          rest: { y: 0, rotate: lean, zIndex: 1 },
          pull: {
            y: reduceMotion ? -6 : -18,
            rotate: lean - (reduceMotion ? 0 : 1.2),
            zIndex: 20,
          },
          press: {
            y: reduceMotion ? -2 : -8,
            rotate: lean - 0.5,
            zIndex: 20,
          },
        }}
        transition={reduceMotion ? { duration: 0.15, ease: [0.32, 0.72, 0, 1] } : PULL_SPRING}
      >
        <div className="flex h-full w-full items-stretch">
          <div
            className="relative flex min-w-0 flex-1 flex-col overflow-hidden"
            style={{
              width: faceW,
              backgroundColor: fill,
              boxShadow: `inset 1px 0 0 color-mix(in srgb, ${shadow} 55%, transparent)`,
            }}
          >
            {mark === "band" && (
              <span
                className="absolute inset-x-[18%] top-[16%] h-px"
                style={{ backgroundColor: ink, opacity: 0.55 }}
                aria-hidden
              />
            )}

            <div className="relative z-[1] flex min-h-0 flex-1 flex-col items-center justify-center gap-2 px-0.5 py-4">
              {mark === "frame" ? (
                <span
                  className="inline-flex max-h-[78%] items-center justify-center border px-0.5 py-1.5"
                  style={{ borderColor: `color-mix(in srgb, ${ink} 55%, transparent)` }}
                >
                  <span
                    className="max-h-full font-mono text-[9px] font-semibold uppercase leading-none tracking-[0.16em]"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      color: ink,
                    }}
                  >
                    {item.title}
                  </span>
                </span>
              ) : (
                <span
                  className="max-h-full font-mono text-[9px] font-semibold uppercase leading-none tracking-[0.16em]"
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    color: ink,
                  }}
                >
                  {item.title}
                </span>
              )}

              {mark === "rules" && (
                <span className="flex flex-col gap-[3px]" aria-hidden>
                  <span
                    className="h-px w-2.5"
                    style={{ backgroundColor: ink, opacity: 0.55 }}
                  />
                  <span
                    className="h-px w-2.5"
                    style={{ backgroundColor: ink, opacity: 0.55 }}
                  />
                </span>
              )}
            </div>
          </div>

          <div
            className="relative shrink-0 self-stretch"
            style={{ width: sideW, backgroundColor: shadow }}
            aria-hidden
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function ShelfRow({
  items,
  toneOffset,
}: {
  items: BookGridItem[];
  toneOffset: number;
}) {
  return (
    <div className="relative min-w-0 flex-1">
      <div className="flex w-full items-end justify-between gap-1.5 px-1 pb-0 pt-2 sm:gap-2 sm:px-2">
        {items.map((item, i) => {
          const globalIndex = toneOffset + i;
          return (
            <BookSpine
              key={item.id}
              item={item}
              width={SPINE_WIDTHS[globalIndex % SPINE_WIDTHS.length]}
              height={SPINE_HEIGHTS[globalIndex % SPINE_HEIGHTS.length]}
              lean={SPINE_LEANS[globalIndex % SPINE_LEANS.length]}
              mark={SPINE_MARKS[globalIndex % SPINE_MARKS.length]}
            />
          );
        })}
      </div>

      <div className="relative z-[2] h-[10px] w-full">
        <div
          className="absolute inset-x-0 top-0 h-[1px] bg-[var(--grid-line)]"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[9px]"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--grid-line) 55%, transparent), transparent)",
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}

type BookshelfIllustrationProps = {
  shelves?: BookGridItem[][];
  items?: BookGridItem[];
};

export function BookshelfIllustration({
  shelves,
  items,
}: BookshelfIllustrationProps) {
  const rows =
    shelves && shelves.length > 0
      ? shelves.filter((row) => row.length > 0)
      : items && items.length > 0
        ? [items]
        : [];

  if (rows.length === 0) return null;

  let toneOffset = 0;

  return (
    <div className="bookshelf-case w-full" aria-label="Books that shaped me">
      <div className="relative flex w-full flex-col gap-6 px-1 pb-1 pt-1 sm:px-2 md:flex-row md:items-end md:gap-8 lg:gap-10">
        {rows.map((row) => {
          const offset = toneOffset;
          toneOffset += row.length;
          return (
            <ShelfRow
              key={row.map((b) => b.id).join("-")}
              items={row}
              toneOffset={offset}
            />
          );
        })}
      </div>
    </div>
  );
}
