"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import {
  DiscAlbum,
  Pause,
  Play,
  SkipBack,
  SkipForward,
} from "lucide-react";
import type { LoveTrack } from "@/src/data/loveTracks";

const TAP_SPRING = {
  type: "spring" as const,
  stiffness: 600,
  damping: 26,
  mass: 0.5,
};

const PLAY_HOVER_SPRING = {
  type: "spring" as const,
  stiffness: 520,
  damping: 28,
  mass: 0.4,
};

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

/** Disc + label when switching tracks (interruptible spring; Kinetic Craft). */
const TRACK_SWAP_DISC_SPRING = {
  type: "spring" as const,
  stiffness: 420,
  damping: 30,
  mass: 0.48,
};

const TRACK_SWAP_LABEL_SPRING = {
  type: "spring" as const,
  stiffness: 380,
  damping: 32,
  mass: 0.42,
};

/** Scroll velocity → elastic stretch on range tracks + thumbs (interruptible spring). */
const ELASTIC_RANGE_SPRING = {
  stiffness: 340,
  damping: 28,
  mass: 0.42,
};

const DEFAULT_TRACK_VOLUME = 0.5;

const VOLUME_STORAGE_KEY = "love-tracks-volume";

function readStoredVolume(): number {
  if (typeof window === "undefined") return DEFAULT_TRACK_VOLUME;
  try {
    const raw = localStorage.getItem(VOLUME_STORAGE_KEY);
    if (raw == null) return DEFAULT_TRACK_VOLUME;
    const n = parseFloat(raw);
    if (!Number.isFinite(n) || n < 0 || n > 1) return DEFAULT_TRACK_VOLUME;
    return n;
  } catch {
    return DEFAULT_TRACK_VOLUME;
  }
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** Thin range track: filled portion uses foreground (black in light theme). */
function thinRangeFillStyle(fraction: number): CSSProperties {
  const pct = Math.min(100, Math.max(0, fraction * 100));
  return {
    background: `linear-gradient(to right, var(--foreground) 0%, var(--foreground) ${pct}%, var(--grid-line) ${pct}%, var(--grid-line) 100%)`,
  };
}

/** Aligns seek + volume sliders to the same track width (fixed side columns). */
const RANGE_ROW_GRID =
  "grid w-full min-w-0 grid-cols-[3rem_minmax(0,1fr)_3rem] items-center gap-3 sm:gap-4";

/** Seek / volume: track + circular thumb (thumb uses foreground fill for contrast vs page bg). */
const SEEK_RANGE_CLASSES =
  "h-[5px] w-full cursor-pointer appearance-none overflow-visible disabled:cursor-not-allowed disabled:opacity-40 " +
  "[&::-webkit-slider-runnable-track]:h-[5px] [&::-webkit-slider-runnable-track]:rounded-full " +
  "[&::-webkit-slider-thumb]:-mt-[4.5px] [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 " +
  "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full " +
  "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[var(--background)] " +
  "[&::-webkit-slider-thumb]:bg-[var(--foreground)] [&::-webkit-slider-thumb]:shadow-[0_1px_4px_rgba(0,0,0,0.22)] " +
  "dark:[&::-webkit-slider-thumb]:shadow-[0_1px_6px_rgba(0,0,0,0.55)] " +
  "[&::-moz-range-track]:h-[5px] [&::-moz-range-track]:rounded-full " +
  "[&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full " +
  "[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[var(--background)] [&::-moz-range-thumb]:bg-[var(--foreground)] " +
  "[&::-moz-range-thumb]:shadow-[0_1px_4px_rgba(0,0,0,0.22)] dark:[&::-moz-range-thumb]:shadow-[0_1px_6px_rgba(0,0,0,0.55)]";

function grooveRadii(count: number, outer: number, inner: number): number[] {
  const step = (outer - inner) / (count - 1);
  return Array.from({ length: count }, (_, i) => outer - i * step);
}

function RecordGrooves({ cx, cy }: { cx: number; cy: number }) {
  const radii = grooveRadii(22, 92, 34);
  return (
    <g aria-hidden>
      {radii.map((r, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          className="stroke-neutral-600 dark:stroke-neutral-400"
          strokeWidth={i % 3 === 0 ? 0.95 : 0.5}
          opacity={0.42 + (i / radii.length) * 0.48}
        />
      ))}
    </g>
  );
}

/** Three-bar equalizer; animates while audio is playing (respects reduced motion). */
function PlayingBars({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <span
      className={`inline-flex h-4 w-4 shrink-0 items-end justify-center gap-[3px] ${className ?? ""}`}
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block w-[3px] origin-bottom rounded-full bg-current"
          style={{ height: 14 }}
          animate={
            reduceMotion ? { scaleY: 0.55 } : { scaleY: [0.32, 1, 0.32] }
          }
          transition={{
            duration: 0.52,
            repeat: Infinity,
            delay: i * 0.13,
            ease: [0.45, 0, 0.55, 1],
          }}
        />
      ))}
    </span>
  );
}

function RecordCard({
  track,
  index,
  isPlaying,
  canPlay,
  onToggle,
  isActive,
  currentTime,
  duration,
  metaDuration,
  onSeek,
  volume,
  onVolumeChange,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: {
  track: LoveTrack;
  index: number;
  isPlaying: boolean;
  canPlay: boolean;
  onToggle: () => void;
  isActive: boolean;
  currentTime: number;
  duration: number;
  /** Duration from preloaded metadata (shows total before play). */
  metaDuration: number;
  onSeek: (seconds: number) => void;
  volume: number;
  onVolumeChange: (v: number) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const stretchFromScroll = useTransform(scrollVelocity, (v) =>
    Math.min(Math.abs(v), 3200),
  );
  const smoothStretch = useSpring(stretchFromScroll, ELASTIC_RANGE_SPRING);
  const elasticScaleX = useTransform(smoothStretch, [0, 2200], [1, 1.048]);
  const elasticScaleY = useTransform(smoothStretch, [0, 2200], [1, 0.9]);
  const tap = reduceMotion ? undefined : { scale: 0.94, transition: TAP_SPRING };
  const spins = isPlaying && !reduceMotion;

  const dur = Number.isFinite(duration) && duration > 0 ? duration : 0;
  const totalSeconds =
    isActive && dur > 0 ? dur : metaDuration > 0 ? metaDuration : 0;
  const seekMax = totalSeconds > 0 ? totalSeconds : 1;
  const seekValue = isActive ? Math.min(currentTime, seekMax) : 0;
  const seekFill = seekMax > 0 ? seekValue / seekMax : 0;

  const discEnter = reduceMotion
    ? { opacity: 0.88 }
    : { scale: 0.93, opacity: 0.45, rotate: -4 };
  const discAnimate = { scale: 1, opacity: 1, rotate: 0 };
  const discTransition = reduceMotion
    ? { duration: 0.2, ease: REVEAL_EASE }
    : TRACK_SWAP_DISC_SPRING;

  const labelEnter = reduceMotion
    ? { opacity: 0.9 }
    : { opacity: 0, y: 10 };
  const labelAnimate = { opacity: 1, y: 0 };
  const labelTransition = reduceMotion
    ? { duration: 0.18, ease: REVEAL_EASE }
    : { ...TRACK_SWAP_LABEL_SPRING, delay: 0.04 };

  return (
    <motion.article
      className="mx-auto flex h-full w-full max-w-[377px] min-h-0 flex-col bg-background p-4 sm:p-5"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{
        duration: 0.55,
        ease: REVEAL_EASE,
        delay: Math.min(index * 0.06, 0.36),
      }}
    >
      <div className="relative mx-auto w-full max-w-[200px] shrink-0 overflow-visible sm:max-w-[216px]">
        <div className="relative aspect-square w-full">
          <motion.div
            aria-hidden
            className={`pointer-events-none absolute inset-0 z-0 aspect-square bg-cover bg-center !rounded-full blur-[12px] ${
              track.coverSrc
                ? "saturate-[1.12] brightness-[1.03] dark:saturate-[1.08] dark:brightness-[1.02]"
                : "bg-[radial-gradient(circle_at_50%_50%,rgba(200,200,200,0.28)_0%,rgba(130,130,130,0.14)_48%,transparent_72%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(90,90,90,0.26)_0%,rgba(45,45,45,0.1)_55%,transparent_78%)]"
            }`}
            style={
              track.coverSrc
                ? { backgroundImage: `url(${track.coverSrc})` }
                : undefined
            }
            initial={false}
            animate={{
              opacity: isPlaying ? 0.48 : 0,
              scale: reduceMotion ? 1 : isPlaying ? 1 : 0.98,
            }}
            transition={{
              duration: reduceMotion ? 0.18 : 0.45,
              ease: REVEAL_EASE,
            }}
          />
          <motion.div
            key={track.id}
            className="relative z-10 h-full w-full origin-center will-change-transform"
            initial={discEnter}
            animate={discAnimate}
            transition={discTransition}
          >
          <svg
              className="h-full w-full"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
          <defs>
            {/* Off-center radial greys so rotation reads as movement (highlight sweeps). */}
            <radialGradient
              id={`love-vinyl-face-${track.id}-light`}
              cx="32%"
              cy="28%"
              r="78%"
              fx="22%"
              fy="20%"
            >
              <stop offset="0%" stopColor="#f3f3f3" />
              <stop offset="42%" stopColor="#c9c9c9" />
              <stop offset="72%" stopColor="#9a9a9a" />
              <stop offset="100%" stopColor="#6b6b6b" />
            </radialGradient>
            <radialGradient
              id={`love-vinyl-face-${track.id}-dark`}
              cx="32%"
              cy="28%"
              r="78%"
              fx="22%"
              fy="20%"
            >
              <stop offset="0%" stopColor="#525252" />
              <stop offset="42%" stopColor="#3d3d3d" />
              <stop offset="72%" stopColor="#2a2a2a" />
              <stop offset="100%" stopColor="#171717" />
            </radialGradient>
            <clipPath id={`love-disc-full-clip-${track.id}`}>
              <circle cx="100" cy="100" r="98" />
            </clipPath>
          </defs>
          <g
            className={
              spins
                ? "love-vinyl-disc-spin love-vinyl-disc-spin--running"
                : "love-vinyl-disc-spin"
            }
          >
            {track.coverSrc ? (
              <>
                <g clipPath={`url(#love-disc-full-clip-${track.id})`}>
                  <image
                    key={track.coverSrc}
                    href={track.coverSrc}
                    x="2"
                    y="2"
                    width="196"
                    height="196"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden
                  />
                </g>
                <circle
                  cx="100"
                  cy="100"
                  r="98"
                  fill="none"
                  strokeWidth="1.25"
                  className="stroke-neutral-400 dark:stroke-neutral-600"
                />
                <RecordGrooves cx={100} cy={100} />
              </>
            ) : (
              <>
                <circle
                  cx="100"
                  cy="100"
                  r="98"
                  fill={`url(#love-vinyl-face-${track.id}-light)`}
                  strokeWidth="1.25"
                  className="stroke-neutral-400 dark:hidden"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="98"
                  fill={`url(#love-vinyl-face-${track.id}-dark)`}
                  strokeWidth="1.25"
                  className="hidden stroke-neutral-600 dark:block"
                />
                <RecordGrooves cx={100} cy={100} />
                <circle
                  cx="100"
                  cy="100"
                  r="30"
                  strokeWidth="1"
                  className="fill-neutral-100 stroke-neutral-300 dark:fill-neutral-700 dark:stroke-neutral-600"
                />
              </>
            )}
            <circle
              cx="100"
              cy="100"
              r="5"
              className="fill-neutral-500 dark:fill-neutral-400"
              opacity="0.9"
            />
          </g>
        </svg>
        </motion.div>
        </div>
      </div>

      <motion.div
        key={track.id}
        className="mt-4 flex shrink-0 flex-col px-1 text-center"
        initial={labelEnter}
        animate={labelAnimate}
        transition={labelTransition}
      >
        <h3 className="font-['Helvetica'] text-sm font-black leading-snug tracking-tight text-[var(--foreground)] sm:text-base">
          {track.title}
        </h3>
        <p className="mt-1.5 line-clamp-3 font-sans text-xs font-light leading-relaxed tracking-tight text-neutral-600 dark:text-neutral-400">
          {track.artist}
        </p>
      </motion.div>

      {/* Transport: seek row → prev / play / next → volume */}
      <div className="mt-auto flex w-full flex-col gap-3 pt-5 sm:pt-6">
        <div className={RANGE_ROW_GRID}>
          <span
            className="justify-self-start font-mono text-[11px] tabular-nums text-[var(--foreground)] sm:text-xs"
            aria-live="polite"
            aria-label="Current position"
          >
            {formatTime(isActive ? currentTime : 0)}
          </span>
          <motion.div
            className="relative flex min-h-[2.25rem] min-w-0 w-full origin-center items-center overflow-visible py-1 will-change-transform"
            style={
              reduceMotion
                ? undefined
                : {
                    scaleX: elasticScaleX,
                    scaleY: elasticScaleY,
                  }
            }
          >
            <input
              type="range"
              min={0}
              max={seekMax}
              step={0.01}
              value={seekValue}
              disabled={!isActive || !canPlay || totalSeconds <= 0}
              aria-label={`Seek ${track.title}`}
              style={thinRangeFillStyle(seekFill)}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                if (isActive) onSeek(v);
              }}
              className={SEEK_RANGE_CLASSES}
            />
          </motion.div>
          <span
            className="justify-self-end text-right font-mono text-[11px] tabular-nums text-neutral-500 sm:text-xs"
            aria-label="Track length"
          >
            {formatTime(totalSeconds)}
          </span>
        </div>

        <div className="flex w-full items-center justify-center gap-6 pt-1 sm:gap-8">
          <motion.button
            type="button"
            disabled={!hasPrevious || !onPrevious}
            onClick={onPrevious}
            whileTap={!hasPrevious || reduceMotion ? undefined : tap}
            aria-label="Previous track"
            className={
              hasPrevious && onPrevious
                ? "inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-[var(--hover-glow)] hover:text-[var(--foreground)] active:scale-[0.97] dark:text-neutral-400"
                : "inline-flex min-h-[44px] min-w-[44px] cursor-not-allowed items-center justify-center rounded-full text-neutral-400 opacity-25 dark:text-neutral-600"
            }
          >
            <SkipBack className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </motion.button>

          <motion.button
            type="button"
            disabled={!canPlay}
            onClick={onToggle}
            whileHover={
              canPlay && !reduceMotion
                ? { scale: 1.05, transition: PLAY_HOVER_SPRING }
                : undefined
            }
            whileTap={!canPlay || reduceMotion ? undefined : tap}
            aria-pressed={isPlaying}
            aria-label={
              !canPlay
                ? "No audio file for this track"
                : isPlaying
                  ? `Pause ${track.title}`
                  : `Play ${track.title}`
            }
            className={
              canPlay
                ? "inline-flex min-h-[44px] min-w-[44px] items-center justify-center p-0 transition-opacity duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]"
                : "inline-flex min-h-[44px] min-w-[44px] cursor-not-allowed items-center justify-center p-0"
            }
          >
            {canPlay ? (
              isPlaying ? (
                <Pause
                  className="h-9 w-9 fill-black stroke-none dark:fill-neutral-100"
                  strokeWidth={0}
                  aria-hidden
                />
              ) : (
                <Play
                  className="h-9 w-9 fill-black stroke-none dark:fill-neutral-100"
                  strokeWidth={0}
                  aria-hidden
                />
              )
            ) : (
              <Play
                className="h-9 w-9 fill-neutral-400 stroke-none dark:fill-neutral-600"
                strokeWidth={0}
                aria-hidden
              />
            )}
          </motion.button>

          <motion.button
            type="button"
            disabled={!hasNext || !onNext}
            onClick={onNext}
            whileTap={!hasNext || reduceMotion ? undefined : tap}
            aria-label="Next track"
            className={
              hasNext && onNext
                ? "inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-[var(--hover-glow)] hover:text-[var(--foreground)] active:scale-[0.97] dark:text-neutral-400"
                : "inline-flex min-h-[44px] min-w-[44px] cursor-not-allowed items-center justify-center rounded-full text-neutral-400 opacity-25 dark:text-neutral-600"
            }
          >
            <SkipForward className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </motion.button>
        </div>

        <div className={`${RANGE_ROW_GRID} pt-1`}>
          <span className="justify-self-start font-mono text-[12px] uppercase tracking-[0.18em] text-neutral-500">
            Vol
          </span>
          <motion.div
            className="relative flex min-h-[2.25rem] min-w-0 w-full origin-center items-center overflow-visible py-1 will-change-transform"
            style={
              reduceMotion
                ? undefined
                : {
                    scaleX: elasticScaleX,
                    scaleY: elasticScaleY,
                  }
            }
          >
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              aria-label={`Volume for ${track.title}`}
              style={thinRangeFillStyle(volume)}
              className={SEEK_RANGE_CLASSES}
            />
          </motion.div>
          <span className="justify-self-end text-right font-mono text-[11px] tabular-nums text-neutral-500 sm:text-xs">
            {Math.round(volume * 100)}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

interface LoveTracksSectionProps {
  tracks: LoveTrack[];
  title?: string;
  subtitle?: string;
  /**
   * When false, hides the section heading (title/subtitle block) while
   * keeping the player UI.
   */
  showHeading?: boolean;
}

export function LoveTracksSection({
  tracks,
  title = "Tracks I love",
  subtitle,
  showHeading = true,
}: LoveTracksSectionProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  /** Which track is loaded in the shared audio element (persists while paused so seek still works). */
  const [transportTrackId, setTransportTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  /** Per-track duration from `preload="metadata"` (no playback required). */
  const [metaDurations, setMetaDurations] = useState<Record<string, number>>({});
  /** Single volume (0–1) for all tracks; persisted in localStorage. */
  const [volume, setVolume] = useState(readStoredVolume);
  const volumeRef = useRef(volume);
  volumeRef.current = volume;

  /** Which track the single player shows; kept in sync with transport when playing. */
  const [activeTrackId, setActiveTrackId] = useState(() => tracks[0]?.id ?? "");

  useEffect(() => {
    if (transportTrackId) setActiveTrackId(transportTrackId);
  }, [transportTrackId]);

  useEffect(() => {
    try {
      localStorage.setItem(VOLUME_STORAGE_KEY, String(volume));
    } catch {
      /* quota / private mode */
    }
  }, [volume]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = volume;
  }, [volume]);

  /** Warm browser cache for all cover art (same-origin paths load fast). */
  useEffect(() => {
    const urls = [
      ...new Set(
        tracks.map((t) => t.coverSrc).filter((s): s is string => Boolean(s)),
      ),
    ];
    const imgs: HTMLImageElement[] = [];
    urls.forEach((src) => {
      const img = new Image();
      img.src = src;
      imgs.push(img);
    });
    return () => {
      imgs.forEach((img) => {
        img.src = "";
      });
    };
  }, [tracks]);

  useEffect(() => {
    const loaders: HTMLAudioElement[] = [];
    let cancelled = false;

    tracks.forEach((track) => {
      if (!track.audioSrc) return;
      const a = new Audio();
      a.preload = "metadata";
      loaders.push(a);

      const apply = () => {
        if (cancelled) return;
        const d = a.duration;
        if (Number.isFinite(d) && d > 0 && !Number.isNaN(d)) {
          setMetaDurations((prev) =>
            prev[track.id] === d ? prev : { ...prev, [track.id]: d },
          );
        }
      };

      a.addEventListener("loadedmetadata", apply);
      a.addEventListener("durationchange", apply);
      a.src = track.audioSrc;
      a.load();
    });

    return () => {
      cancelled = true;
      loaders.forEach((a) => {
        a.pause();
        a.removeAttribute("src");
        a.load();
      });
    };
  }, [tracks]);

  const syncAudioUi = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    setCurrentTime(el.currentTime);
    const d = el.duration;
    if (Number.isFinite(d) && !Number.isNaN(d)) {
      setDuration(d);
    }
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onEnded = () => {
      setIsPlaying(false);
      setTransportTrackId(null);
      setCurrentTime(0);
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    el.addEventListener("ended", onEnded);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("timeupdate", syncAudioUi);
    el.addEventListener("loadedmetadata", syncAudioUi);
    el.addEventListener("durationchange", syncAudioUi);
    return () => {
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("timeupdate", syncAudioUi);
      el.removeEventListener("loadedmetadata", syncAudioUi);
      el.removeEventListener("durationchange", syncAudioUi);
    };
  }, [syncAudioUi]);

  const seekTo = useCallback((seconds: number) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = seconds;
    setCurrentTime(seconds);
  }, []);

  const toggleTrack = useCallback(
    async (track: LoveTrack) => {
      if (!track.audioSrc) return;
      const audio = audioRef.current;
      if (!audio) return;

      if (transportTrackId === track.id) {
        if (isPlaying) {
          audio.pause();
        } else {
          try {
            await audio.play();
          } catch {
            setIsPlaying(false);
          }
        }
        return;
      }

      audio.pause();
      audio.currentTime = 0;
      audio.src = track.audioSrc;
      audio.volume = volumeRef.current;
      setCurrentTime(0);
      setDuration(0);
      setTransportTrackId(track.id);
      try {
        await audio.play();
        syncAudioUi();
      } catch {
        setTransportTrackId(null);
        setIsPlaying(false);
      }
    },
    [transportTrackId, isPlaying, syncAudioUi],
  );

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const playerTrack =
    tracks.find((tr) => tr.id === activeTrackId) ?? tracks[0];

  const playerIndex = tracks.findIndex((t) => t.id === playerTrack.id);

  const goPrevTrack = useCallback(() => {
    if (playerIndex <= 0) return;
    const t = tracks[playerIndex - 1];
    if (!t.audioSrc) return;
    setActiveTrackId(t.id);
    void toggleTrack(t);
  }, [tracks, playerIndex, toggleTrack]);

  const goNextTrack = useCallback(() => {
    if (playerIndex < 0 || playerIndex >= tracks.length - 1) return;
    const t = tracks[playerIndex + 1];
    if (!t.audioSrc) return;
    setActiveTrackId(t.id);
    void toggleTrack(t);
  }, [tracks, playerIndex, toggleTrack]);

  const recordNavProps =
    tracks.length > 1
      ? {
          hasPrevious: playerIndex > 0,
          hasNext: playerIndex >= 0 && playerIndex < tracks.length - 1,
          onPrevious: goPrevTrack,
          onNext: goNextTrack,
        }
      : {
          hasPrevious: false,
          hasNext: false,
          onPrevious: undefined as (() => void) | undefined,
          onNext: undefined as (() => void) | undefined,
        };

  return (
    <div className="w-full min-w-0">
      <audio ref={audioRef} className="hidden" preload="metadata" />

      {showHeading ? (
        <div className="mb-6 flex flex-col gap-2 px-4 sm:mb-8 sm:px-6 md:mb-6 md:px-12 lg:mb-6 lg:px-16">
          <h2
            id="love-tracks-heading"
            className="font-mono text-[14px] uppercase tracking-tight text-[var(--foreground)]"
          >
            {title}
          </h2>
          {subtitle ? (
            <p className="max-w-2xl font-sans text-sm font-light leading-relaxed tracking-tight text-neutral-600 dark:text-neutral-400">
              {subtitle}
            </p>
          ) : null}
        </div>
      ) : null}

      {tracks.length === 0 ? null : tracks.length === 1 ? (
        <div className="mx-auto w-full max-w-xl border border-[var(--grid-line)] bg-background p-px">
          <RecordCard
            track={tracks[0]}
            index={0}
            isPlaying={transportTrackId === tracks[0].id && isPlaying}
            canPlay={Boolean(tracks[0].audioSrc)}
            onToggle={() => toggleTrack(tracks[0])}
            isActive={transportTrackId === tracks[0].id}
            currentTime={currentTime}
            duration={duration}
            metaDuration={metaDurations[tracks[0].id] ?? 0}
            onSeek={seekTo}
            volume={volume}
            onVolumeChange={setVolume}
            {...recordNavProps}
          />
        </div>
      ) : (
        <div className="w-full min-w-0 border-y border-[var(--grid-line)] border-x-0 bg-background -mt-px">
          <div className="grid grid-cols-1 lg:grid-cols-[391px_minmax(0,1fr)] lg:items-stretch">
            <div className="min-w-0 w-full border-b border-[var(--grid-line)] bg-background lg:border-b-0">
              <RecordCard
                track={playerTrack}
                index={0}
                isPlaying={transportTrackId === playerTrack.id && isPlaying}
                canPlay={Boolean(playerTrack.audioSrc)}
                onToggle={() => toggleTrack(playerTrack)}
                isActive={transportTrackId === playerTrack.id}
                currentTime={currentTime}
                duration={duration}
                metaDuration={metaDurations[playerTrack.id] ?? 0}
                onSeek={seekTo}
                volume={volume}
                onVolumeChange={setVolume}
                {...recordNavProps}
              />
            </div>

            <aside
              className="flex h-full min-h-0 min-w-0 flex-col lg:border-l lg:border-[var(--grid-line)]"
              aria-label="Track list"
            >
              <ul className="flex min-h-0 flex-1 flex-col divide-y divide-[var(--grid-line)]">
                {tracks.map((track) => {
                  const selected = activeTrackId === track.id;
                  const playing = transportTrackId === track.id && isPlaying;
                  return (
                    <li key={track.id} className="flex min-h-0 flex-1 flex-col">
                      <button
                        type="button"
                        disabled={!track.audioSrc}
                        onClick={() => {
                          setActiveTrackId(track.id);
                          toggleTrack(track);
                        }}
                        className="group relative flex min-h-0 w-full flex-1 items-center gap-3 px-4 py-4 text-left overflow-hidden disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {/* Grey full-fill hover (matches other slide-fill hover patterns). */}
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-[var(--hover-glow)] transition-opacity duration-200 opacity-0 group-hover:opacity-100 disabled:opacity-0"
                        />
                        {playing ? (
                          <PlayingBars
                            className={
                              selected
                                ? "relative z-10 text-[var(--foreground)]"
                                : "relative z-10 text-neutral-500 dark:text-neutral-400"
                            }
                          />
                        ) : (
                          <DiscAlbum
                            className={`relative z-10 h-4 w-4 shrink-0 ${
                              selected
                                ? "text-[var(--foreground)]/65"
                                : "text-neutral-400 dark:text-neutral-500"
                            }`}
                            strokeWidth={1.75}
                            aria-hidden
                          />
                        )}
                        {playing ? (
                          <span className="sr-only">Now playing</span>
                        ) : null}
                        <span className="relative z-10 flex min-w-0 flex-1 flex-col gap-1">
                          <span className="font-['Helvetica'] text-sm font-extrabold leading-snug tracking-tight">
                            {track.title}
                          </span>
                          <span className="line-clamp-2 font-sans text-xs font-light leading-relaxed text-neutral-600 dark:text-neutral-400">
                            {track.artist}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}
