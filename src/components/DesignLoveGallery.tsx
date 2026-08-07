"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  playWhenVisible,
}: {
  item: DesignLoveShot;
  index: number;
  playWhenVisible: boolean;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isVideo = isVideoSrc(item.src);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.12, rootMargin: "48px 0px" },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideo) return;

    const shouldPlay = playWhenVisible && isVisible;
    if (shouldPlay) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVideo, isVisible, playWhenVisible]);

  return (
    <article
      ref={cardRef}
      data-design-love-shot
      className="relative flex-none aspect-square w-[min(68vw,360px)] cursor-default overflow-hidden bg-background md:w-[min(36vw,460px)] lg:w-[min(28vw,420px)]"
    >
      {item.src ? (
        isVideo ? (
          <video
            ref={videoRef}
            src={item.src}
            className="h-full w-full cursor-default object-cover"
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
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [marqueeActive, setMarqueeActive] = useState(false);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setMarqueeActive(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "120px 0px" },
    );

    observer.observe(marquee);
    return () => observer.disconnect();
  }, []);

  if (items.length === 0) return null;

  const renderStrip = (prefix: string, hidden = false, playWhenVisible = false) => (
    <div
      className="flex shrink-0 items-stretch gap-0"
      aria-hidden={hidden ? "true" : undefined}
    >
      {items.map((item, i) => (
        <ShotCard
          key={`${prefix}-${item.id}`}
          item={item}
          index={i}
          playWhenVisible={playWhenVisible && marqueeActive}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full min-w-0 [content-visibility:auto] [contain-intrinsic-size:auto_420px]">
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
            <span className="uppercase tracking-[0.16em]">
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
          ref={marqueeRef}
          className={[
            "gallery-marquee-container cursor-default overflow-hidden border border-[var(--grid-line)] bg-background",
            !marqueeActive ? "gallery-marquee-paused" : "",
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
