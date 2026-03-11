"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import CtaButton from "@/src/components/CtaButton";

const CELL_SIZE = 80;
// Muted, subtle but noticeable colour palette (light mode hex values)
const MUTED_COLORS = [
  "#fde8e8", "#fef3c7", "#d1fae5", "#dbeafe", "#ede9fe", "#fce7f3", "#ecfdf5", "#fff7ed", "#f0fdf4", "#f5f3ff",
];
// Dark mode equivalents (deeper but still muted)
const MUTED_COLORS_DARK = [
  "#3b1a1a", "#3b2f00", "#0a2e1f", "#0c1f3b", "#1e1433", "#3b0f24", "#062318", "#3b2200", "#0a2e14", "#1a1033",
];

function getGridDimensions(width: number, height: number) {
  const cols = Math.ceil(width / CELL_SIZE);
  const rows = Math.ceil(height / CELL_SIZE);
  return { cols, rows, total: cols * rows };
}

function buildRandomFills(total: number): number[] {
  // -1 = empty, 0..N = colour index
  const density = 0.3 + Math.random() * 0.2;
  return Array.from({ length: total }, () => Math.random() < density ? Math.floor(Math.random() * MUTED_COLORS.length) : -1);
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [dims, setDims] = useState({ cols: 0, rows: 0, total: 0 });
  const [fills, setFills] = useState<number[]>([]);
  const [visible, setVisible] = useState<boolean[]>([]);
  const animFrameRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isDark, setIsDark] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setIsDark(document.documentElement.classList.contains("dark") || mq.matches);
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const measure = useCallback(() => {
    if (!sectionRef.current) return;
    const { offsetWidth, offsetHeight } = sectionRef.current;
    const d = getGridDimensions(offsetWidth, offsetHeight);
    setDims(d);
    return d;
  }, []);

  const animateCells = useCallback((newFills: number[]) => {
    setVisible([]);
    const filledIndices = newFills
      .map((v, i) => (v >= 0 ? i : -1))
      .filter((i) => i >= 0)
      .sort(() => Math.random() - 0.5);
    let step = 0;
    const reveal = () => {
      if (step >= filledIndices.length) return;
      const batchSize = Math.max(1, Math.floor(filledIndices.length / 20));
      const batch = filledIndices.slice(step, step + batchSize);
      setVisible((prev) => {
        const next = [...prev];
        batch.forEach((idx) => {
          next[idx] = true;
        });
        return next;
      });
      step += batchSize;
      animFrameRef.current = setTimeout(reveal, 40);
    };
    reveal();
  }, []);

  const runAnimation = useCallback(() => {
    const d = measure();
    if (!d) return;
    const newFills = buildRandomFills(d.total);
    setFills(newFills);
    animateCells(newFills);
  }, [measure, animateCells]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) runAnimation();
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (animFrameRef.current) clearTimeout(animFrameRef.current);
    };
  }, [runAnimation]);

  useEffect(() => {
    const handleResize = () => measure();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [measure]);

  const palette = isDark ? MUTED_COLORS_DARK : MUTED_COLORS;

  return (
    <section ref={sectionRef} className="border-b border-[var(--grid-line)] relative overflow-hidden bg-background flex items-center" style={{ height: "480px" }}>
      {/* Grid lines + coloured cells */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <pattern id="contact-grid" x="0" y="0" width={CELL_SIZE} height={CELL_SIZE} patternUnits="userSpaceOnUse">
            <path d={`M ${CELL_SIZE} 0 L 0 0 0 ${CELL_SIZE}`} fill="none" stroke="var(--grid-line)" strokeWidth="1" />
          </pattern>
        </defs>
        {/* Coloured cells — rendered BELOW grid lines */}
        {dims.cols > 0 && fills.map((colorIdx, idx) => {
          if (colorIdx < 0) return null;
          const col = idx % dims.cols;
          const row = Math.floor(idx / dims.cols);
          const isVisible = visible[idx];
          return (
            <rect key={idx} x={col * CELL_SIZE + 1} y={row * CELL_SIZE + 1} width={CELL_SIZE - 1} height={CELL_SIZE - 1} fill={palette[colorIdx]} style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.35s ease", }} />
          );
        })}
        {/* Grid lines on top */}
        <rect width="100%" height="100%" fill="url(#contact-grid)" />
      </svg>

      {/* Content */}
      <div className="w-full max-w-[1600px] mx-auto px-8 md:px-12 flex flex-col items-center justify-center relative z-10 text-center">
        <h2 className="text-[36px] md:text-[48px] font-bold tracking-tighter mb-12 text-foreground font-sans">
          Let&apos;s <span className="font-serif italic font-light">design</span> to <span className="font-serif italic font-light">delight</span>.
        </h2>
        <CtaButton
          as="anchor"
          href="https://mail.google.com/mail/?view=cm&fs=1&to=mgyan1996@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          label="Let's talk"
          icon="arrow-right"
        />
      </div>
    </section>
  );
}
