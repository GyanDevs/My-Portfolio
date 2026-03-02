"use client";
import React from "react";
import {
  Smartphone,
  LogOut,
} from "lucide-react"; /** * FasalFieldMetrics * Displays key quantitative findings from the field discovery phase. * Shifted upward with a backdrop blur to overlap the feedback section. */
export default function FasalFieldMetrics() {
  const findings = [
    {
      icon: <Smartphone className="w-5 h-5" />,
      value: "42%",
      label: "App Submissions",
      desc: "Only 42% of tickets were raised via the app; the majority remained offline or via direct calls.",
    },
    {
      icon: <LogOut className="w-5 h-5" />,
      value: "22.5%",
      label: "Abandonment Rate",
      desc: "Users abandoned the ticket-raising process mid-way, highlighting high cognitive friction.",
    },
  ];
  return (
    <div className="w-full relative -mt-24 z-30">
      {" "}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-background/80 backdrop-blur-xl md:divide-x divide-[var(--grid-line)] border-b border-l border-r border-[var(--grid-line)]">
        {" "}
        {findings.map((item, idx) => (
          <div
            key={idx}
            className="p-8 space-y-4 group card-hover transition-colors border-b md:border-b-0 border-[var(--grid-line)] relative"
          >
            {" "}
            <div className="flex items-center gap-3">
              {" "}
              <div className="w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shadow-[4px_4px_0px_0px_var(--grid-line)] group-hover:shadow-[6px_6px_0px_0px_var(--foreground)] group-hover:border-[var(--foreground)] transition-all duration-500 shrink-0 group-hover:-translate-y-1 group-hover:-translate-x-1 opacity-80 group-hover:opacity-100">
                {" "}
                {item.icon}{" "}
              </div>{" "}
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                {item.label}
              </span>{" "}
            </div>{" "}
            <div>
              {" "}
              <div className="text-lg font-bold tracking-tight text-[var(--foreground)] mb-1">
                {" "}
                {item.value}{" "}
              </div>{" "}
              <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
                {" "}
                {item.desc}{" "}
              </p>{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </div>
  );
}
