"use client";
import React from "react";
import {
  Search,
  Target,
  Lightbulb,
  Layout,
  Palette,
} from "lucide-react";

export default function BazaarNxtProcessInfographic() {
  const steps = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Research & Discovery",
      desc: "Conducted stakeholder interviews, field visits, and market analysis to map B2B procurement pain points.",
      label: "RESEARCH",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Problem Definition",
      desc: "Synthesized findings to define core problems and opportunities in the packaging procurement process.",
      label: "DEFINE",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Ideation",
      desc: "Brainstormed solutions focused on creating an intuitive digital marketplace for packaging materials.",
      label: "IDEATE",
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Wireframing & Prototyping",
      desc: "Developed low-fidelity wireframes and interactive prototypes to validate structure and core flows.",
      label: "PROTOTYPE",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Visual Design",
      desc: "Created high-fidelity designs aligned with BazaarNXT's brand, accessible to buyers of all tech literacy levels.",
      label: "DESIGN",
    },
  ];

  return (
    <div className="w-full border border-[var(--grid-line)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 bg-background">
      {steps.map((step, idx) => (
        <div
          key={idx}
          className={`p-8 flex flex-col gap-6 group card-hover transition-all duration-300 ease-spring bg-background ${
            idx !== steps.length - 1
              ? "border-b lg:border-b-0 lg:border-r border-[var(--grid-line)]"
              : "border-b md:border-b-0"
          } ${idx === 1 ? "md:border-r-0 lg:border-r" : ""} ${idx === 3 ? "md:border-r-0 lg:border-r" : ""}`}
        >
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shadow-[4px_4px_0px_0px_var(--grid-line)] group-hover:shadow-[6px_6px_0px_0px_var(--foreground)] group-hover:border-[var(--foreground)] transition-all duration-500 shrink-0 group-hover:-translate-y-1 group-hover:-translate-x-1 opacity-80 group-hover:opacity-100">
              {step.icon}
            </div>
            <span className="font-mono text-[13px] text-neutral-400">
              0{idx + 1}
            </span>
          </div>
          <div>
            <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-2">
              {step.label}
            </p>
            <h4 className="text-[18px] font-bold tracking-tight mb-3 leading-tight">
              {step.title}
            </h4>
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
              {step.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
