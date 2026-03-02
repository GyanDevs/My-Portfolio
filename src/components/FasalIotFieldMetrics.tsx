"use client";
import React from "react";
import {
  BarChart3,
  PieChart,
} from "lucide-react"; /** * FasalIotFieldMetrics * Displays quantitative findings for the IoT project discovery phase. */
export default function FasalIotFieldMetrics() {
  const findings = [
    {
      icon: <PieChart className="w-5 h-5" />,
      value: "15%",
      label: "Misinterpretation Rate",
      desc: "15% of all support tickets were linked directly to confusion over sensor values or parameter meanings.",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      value: "65%",
      label: "User Dissatisfaction",
      desc: "65% of surveyed users expressed negative sentiment regarding dial size and color density.",
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
              <span className="font-mono text-[13px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                {item.label}
              </span>{" "}
            </div>{" "}
            <div>
              {" "}
              <div className="text-[20px] font-bold tracking-tight text-[var(--foreground)] mb-1">
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
