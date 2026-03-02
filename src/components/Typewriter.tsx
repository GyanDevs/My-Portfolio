"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useIntro } from "@/src/components/providers";

export interface TypewriterSegment {
  text: string;
  className?: string;
  delay?: number;
  newLine?: boolean;
  deleteLast?: boolean;
}

interface TypewriterProps {
  segments: TypewriterSegment[];
  typingSpeed?: number;
}

// Cursor state machine:
//  'pre'    — loading screen still showing, cursor not yet active
//  'typing' — animation running, cursor is SOLID (no blink — real terminals don't blink while typing)
//  'held'   — typing complete, 400ms "held breath" before blink starts — name lands with weight
//  'done'   — slow blink (1.4s period, calmer than the old 1.2s frantic blink)
type CursorState = "pre" | "typing" | "held" | "done";

export default function Typewriter({
  segments,
  typingSpeed = 80,
}: TypewriterProps) {
  const [completedSegments, setCompletedSegments] = useState<TypewriterSegment[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [currentClassName, setCurrentClassName] = useState<string | undefined>("");
  const { introComplete } = useIntro();
  const hasAnimatedRef = useRef(false);

  // Capture whether intro was already done when this component first mounted
  const wasAlreadyCompleteRef = useRef(introComplete);

  // Cursor starts in 'done' on back-nav (already complete), 'pre' on first load
  const [cursorState, setCursorState] = useState<CursorState>(
    wasAlreadyCompleteRef.current ? "done" : "pre"
  );

  useEffect(() => {
    // CASE 1: Back-navigation — introComplete was already true at mount.
    // Show the final state immediately without animating.
    if (wasAlreadyCompleteRef.current && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      const finalSegments: TypewriterSegment[] = [];
      for (const seg of segments) {
        if (seg.deleteLast) {
          finalSegments.pop();
        } else {
          finalSegments.push(seg);
        }
      }
      setCompletedSegments(finalSegments);
      setCurrentText("");
      // cursor already initialised as 'done' above
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // CASE 2: Fresh load — wait for introComplete to flip true, then animate.
    if (!introComplete) return;
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;
    let isCancelled = false;
    const localCompletedSegments: TypewriterSegment[] = [];

    const runAnimation = async () => {
      // Brief settling pause after the clip-path wipe
      await new Promise((r) => setTimeout(r, 100));

      // Cursor goes solid the moment typing begins
      setCursorState("typing");

      for (let i = 0; i < segments.length; i++) {
        if (isCancelled) return;
        const segment = segments[i];

        if (segment.deleteLast) {
          const partToDelete = localCompletedSegments.pop();
          if (partToDelete) {
            setCurrentClassName(partToDelete.className);
            setCompletedSegments([...localCompletedSegments]);
            const fullText = partToDelete.text;
            setCurrentText(fullText);

            if (segment.delay) {
              await new Promise((r) => setTimeout(r, segment.delay));
            }

            // Delete at half typing speed
            const deleteSpeed = typingSpeed / 2;
            for (let len = fullText.length; len >= 0; len--) {
              if (isCancelled) return;
              setCurrentText(fullText.slice(0, len));
              await new Promise((r) => setTimeout(r, deleteSpeed));
            }
          }
          continue;
        }

        setCurrentClassName(segment.className);
        setCurrentText("");

        if (segment.delay) {
          await new Promise((r) => setTimeout(r, segment.delay));
        }
        if (isCancelled) return;

        for (let charIdx = 1; charIdx <= segment.text.length; charIdx++) {
          if (isCancelled) return;
          setCurrentText(segment.text.slice(0, charIdx));
          await new Promise((r) => setTimeout(r, typingSpeed));
        }

        localCompletedSegments.push(segment);
        setCompletedSegments([...localCompletedSegments]);
        setCurrentText("");
      }

      if (isCancelled) return;

      // "Held breath" — 400ms of solid cursor after "Gyan" finishes.
      // The name lands. The machine is done speaking.
      setCursorState("held");
      await new Promise((r) => setTimeout(r, 400));

      if (!isCancelled) {
        setCursorState("done");
      }
    };

    runAnimation();
    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [introComplete]);

  // ── Cursor animation derived from state ────────────────────────────────────
  // 'pre' / 'typing' / 'held' → solid (opacity: 1, no repeat)
  // 'done' → slow editorial blink (1.4s, easeInOut — calmer than old 1.2s linear)
  const isSolid = cursorState === "pre" || cursorState === "typing" || cursorState === "held";

  const cursorAnimate = isSolid
    ? { opacity: 1 }
    : { opacity: [1, 0, 1] };

  const cursorTransition = isSolid
    ? { duration: 0 }
    : {
      duration: 1.4,
      repeat: Infinity,
      ease: "easeInOut" as const,
      times: [0, 0.5, 1],
    };

  return (
    <span className="inline-flex items-center flex-wrap">
      {completedSegments.map((seg, i) => (
        <span key={i} className={seg.className}>
          {seg.text}
          {seg.newLine && <span className="basis-full h-0" />}
        </span>
      ))}

      {/* Render current animating text */}
      {currentText && <span className={currentClassName}>{currentText}</span>}

      {/* Cursor — editorial thin bar, sits in x-height zone, always foreground */}
      <motion.span
        animate={cursorAnimate}
        transition={cursorTransition}
        className="inline-block bg-foreground ml-[3px] shrink-0"
        style={{ width: "1.5px", height: "0.85em", verticalAlign: "middle" }}
      />
    </span>
  );
}
