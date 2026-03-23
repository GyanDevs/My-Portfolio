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
};

export function BooksGrid({ items }: { items: BookGridItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="w-full">
      <div className="px-4 sm:px-6 md:px-12 lg:px-16">
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5"
          role="list"
          aria-label="Books that shaped me"
        >
          {items.map((item) => (
            <figure
              key={item.id}
              className="m-0 flex flex-row items-end gap-4 min-w-0 group"
              role="listitem"
            >
              {/* Row list: small thumbnail + text (like the songs list feel) */}
              <div className="relative shrink-0 w-[64px] sm:w-[72px] aspect-[3/4] border border-[var(--grid-line)] bg-background overflow-hidden">
                {item.coverSrc ? (
                  <Image
                    src={item.coverSrc}
                    alt={`${item.title} cover`}
                    fill
                    className="object-cover grayscale contrast-[1.1] brightness-[0.95] transition-[filter,transform] duration-300 ease-out group-hover:grayscale-0 group-hover:contrast-[1] group-hover:brightness-100"
                    sizes="(max-width: 640px) 64px, 72px"
                    unoptimized
                    priority={false}
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center text-neutral-500 font-mono text-xs"
                    aria-hidden
                  >
                    Cover
                  </div>
                )}
              </div>

              <figcaption className="flex-1 min-w-0">
                <div className="text-[13px] font-sans font-normal leading-snug text-[var(--foreground)] line-clamp-2">
                  {item.title}
                </div>
                <div className="mt-1 text-[12px] font-sans font-light leading-relaxed text-neutral-500 line-clamp-1">
                  {item.author}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

