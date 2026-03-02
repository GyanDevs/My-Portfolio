"use client";

import React from "react";

interface BazaarNxtProblemsGridProps {
  items: string[];
}

export default function BazaarNxtProblemsGrid({ items }: BazaarNxtProblemsGridProps) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 bg-background border-t border-l border-[var(--grid-line)] mb-12 overflow-hidden">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="p-8 flex flex-col gap-6 group card-hover transition-colors border-r border-b border-[var(--grid-line)]"
        >
          <div className="flex justify-between items-start">
            <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 font-bold">
              PROBLEM
            </p>
            <span className="font-mono text-[13px] text-neutral-400">
              {(idx + 1).toString().padStart(2, "0")}
            </span>
          </div>
          <p className="text-[16px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}
