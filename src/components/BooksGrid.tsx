import Image from "next/image";

export type BookGridItem = {
  id: string;
  title: string;
  author: string;
  /**
   * Path under `public/`.
   * Example: `/assets/books/dont-make-me-think.webp`
   */
  coverSrc?: string;
  /** Spine palette: quiet Favre wash + same-hue shadow + mid ink. */
  spine?: {
    fill: string;
    fillDark?: string;
    shadow: string;
    shadowDark?: string;
    ink: string;
    inkDark?: string;
  };
};

const COVER_TONES = [
  "orange",
  "green",
  "violet",
  "sky",
  "rose",
] as const;

type CoverTone = (typeof COVER_TONES)[number];

const SHADOW_PARTNER: Record<CoverTone, string> = {
  orange: "var(--highlight-marker-violet)",
  green: "var(--highlight-marker-sky)",
  violet: "var(--highlight-marker-rose)",
  sky: "var(--highlight-marker-violet)",
  rose: "var(--highlight-marker-orange)",
};

/**
 * Physical hardback: spine edge + cover face + page block.
 * Favre colour-as-shadow for depth; cover photo stays graphic (no blur fluff).
 */
function BookHardback({
  item,
  tone,
}: {
  item: BookGridItem;
  tone: CoverTone;
}) {
  const fill = `var(--highlight-marker-${tone})`;
  const shadow = SHADOW_PARTNER[tone];

  return (
    <figure
      className="group m-0 flex shrink-0 flex-row items-end gap-4 min-w-0 w-[240px] sm:w-auto sm:shrink"
      role="listitem"
    >
      <div
        className="relative shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1.5 group-hover:rotate-[-1deg]"
        style={{ width: 108 }}
      >
        <div className="relative flex h-[128px] w-[100px] items-stretch sm:h-[140px] sm:w-[108px]">
          {/* Spine / board edge */}
          <div
            className="relative z-[1] w-[10px] shrink-0 self-stretch"
            style={{ backgroundColor: shadow }}
            aria-hidden
          >
            <span
              className="absolute inset-y-3 left-1/2 w-px -translate-x-1/2 opacity-35"
              style={{ backgroundColor: "var(--foreground)" }}
            />
          </div>

          {/* Cover face */}
          <div
            className="relative z-[2] min-w-0 flex-1 overflow-hidden border border-[var(--foreground)]/20"
            style={{ backgroundColor: fill }}
          >
            {item.coverSrc ? (
              <Image
                src={item.coverSrc}
                alt={`${item.title} cover`}
                fill
                className="object-cover contrast-[1.08] transition-[filter] duration-300 ease-out group-hover:contrast-[1.12]"
                sizes="(max-width: 640px) 88px, 98px"
                unoptimized
                priority={false}
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center font-mono text-xs text-[var(--foreground)]/60"
                aria-hidden
              >
                Cover
              </div>
            )}
            {/* Headband */}
            <span
              className="absolute inset-x-0 top-0 z-[1] h-[4px]"
              style={{ backgroundColor: shadow }}
              aria-hidden
            />
          </div>

          {/* Page block */}
          <div
            className="relative z-0 w-[7px] shrink-0 self-center overflow-hidden"
            style={{
              height: "92%",
              backgroundColor:
                "color-mix(in srgb, var(--background) 88%, var(--foreground))",
            }}
            aria-hidden
          >
            <div
              className="absolute inset-0 opacity-45"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent 0 3px, color-mix(in srgb, var(--foreground) 16%, transparent) 3px 4px)",
              }}
            />
          </div>
        </div>

        {/* Flat contact shadow */}
        <div
          aria-hidden
          className="absolute -bottom-1 left-2 right-0 h-[5px] opacity-50 transition-opacity duration-300 group-hover:opacity-80"
          style={{ backgroundColor: shadow }}
        />
      </div>

      <figcaption className="flex-1 min-w-0 pb-1">
        <div className="text-[14px] font-sans font-extrabold leading-snug text-[var(--foreground)] line-clamp-2">
          {item.title}
        </div>
        <div className="mt-1 text-[12px] font-sans font-light leading-relaxed text-neutral-500 line-clamp-1">
          {item.author}
        </div>
      </figcaption>
    </figure>
  );
}

export function BooksGrid({ items }: { items: BookGridItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="w-full">
      <div className="px-4 sm:px-6 md:px-12 lg:px-16">
        <div
          className="flex flex-nowrap gap-5 overflow-x-auto pb-3 sm:grid sm:grid-cols-3 lg:grid-cols-5 sm:gap-5 sm:overflow-visible"
          data-lenis-prevent-wheel
          role="list"
          aria-label="Books that shaped me"
        >
          {items.map((item, i) => (
            <BookHardback
              key={item.id}
              item={item}
              tone={COVER_TONES[i % COVER_TONES.length]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
