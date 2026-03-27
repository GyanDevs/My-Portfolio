"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import FollowCursorPill, {
  FOLLOW_CURSOR_PILL_ACCENT_CLASSNAME,
} from "@/src/components/FollowCursorPill";
import type { DesignLoveShot } from "@/src/data/designLoveShots";

function isVideoSrc(src?: string): boolean {
  return Boolean(src && /\.(mp4|webm|ogg)$/i.test(src));
}

interface DesignLoveGalleryProps {
  items: DesignLoveShot[];
  title?: string;
}

function ShotCard({
  item,
  index,
  playVideos,
}: {
  item: DesignLoveShot;
  index: number;
  playVideos: boolean;
}) {
  return (
    <article
      data-design-love-shot
      className="relative flex-none aspect-square w-[min(68vw,360px)] cursor-default overflow-hidden bg-background md:w-[min(36vw,460px)] lg:w-[min(28vw,420px)]"
    >
      {item.src ? (
        isVideoSrc(item.src) ? (
          <video
            src={item.src}
            className="h-full w-full cursor-default object-cover"
            autoPlay={playVideos}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={item.alt}
          />
        ) : (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="cursor-default object-cover"
            sizes="(max-width: 767px) 86vw, (max-width: 1280px) 44vw, 38vw"
            priority={index === 0}
          />
        )
      ) : (
        <div
          className="absolute inset-0 cursor-default bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-400 dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-950"
          aria-hidden
        />
      )}

    </article>
  );
}

export function DesignLoveGallery({ items, title }: DesignLoveGalleryProps) {
  if (items.length === 0) return null;

  const renderStrip = (prefix: string, hidden = false, playVideos = false) => (
    <div
      className="flex shrink-0 items-stretch gap-0"
      aria-hidden={hidden ? "true" : undefined}
    >
      {items.map((item, i) => (
        <ShotCard
          key={`${prefix}-${item.id}`}
          item={item}
          index={i}
          playVideos={playVideos}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full min-w-0">
      {title ? (
        <div className="mb-4 px-4 sm:mb-8 sm:px-6 md:px-12 lg:px-16">
          <h2 className="font-mono text-[14px] uppercase tracking-tight text-[var(--foreground)]">
            {title}
          </h2>
        </div>
      ) : null}

      <FollowCursorPill
        activeWithinSelector="[data-design-love-shot]"
        clampWithinSelector=".gallery-marquee-container"
        pillClassName={FOLLOW_CURSOR_PILL_ACCENT_CLASSNAME}
        label={
          <>
            <span className="tracking-tight normal-case">
              for the love of design
            </span>
            <Heart
              className="h-3.5 w-3.5 shrink-0 fill-red-600 text-red-600"
              strokeWidth={1.75}
              aria-hidden
            />
          </>
        }
      >
        <div
          className={[
            "gallery-marquee-container cursor-default overflow-hidden border border-[var(--grid-line)] bg-background",
            !title ? "mt-10 sm:mt-12" : "",
          ].join(" ")}
        >
          <div className="animate-marquee transform-gpu [animation-timing-function:linear]">
            {renderStrip("a", false, true)}
            {renderStrip("b", true, false)}
          </div>
        </div>
      </FollowCursorPill>
    </div>
  );
}
