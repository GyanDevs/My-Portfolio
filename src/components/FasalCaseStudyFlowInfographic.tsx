"use client";

import React from "react";
import {
  BookOpen,
  Target,
  Lightbulb,
  FileText,
  Users,
  MessageCircle,
  LayoutGrid,
  Layers,
  ListOrdered,
} from "lucide-react";

/** Horizontal arrow in Flow 360 style: line + right-pointing arrowhead */
function FlowArrow({ className = "", vertical = false }: { className?: string; vertical?: boolean }) {
  return (
    <svg
      viewBox="0 0 40 16"
      className={`shrink-0 text-neutral-400 ${className}`}
      style={vertical ? { transform: "rotate(90deg)" } : undefined}
      aria-hidden
    >
      <line x1="0" y1="8" x2="28" y2="8" stroke="currentColor" strokeWidth="1" />
      <polyline points="24,4 32,8 24,12" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

const STEPS = [
  { icon: BookOpen, label: "Introduction" },
  { icon: Target, label: "Research goals" },
  { icon: Lightbulb, label: "Insights to gather" },
  { icon: FileText, label: "Script writing" },
  { icon: Users, label: "Sample set" },
  { icon: MessageCircle, label: "User interviews" },
  { icon: LayoutGrid, label: "Card sorting" },
  { icon: Layers, label: "Theme identification" },
  { icon: ListOrdered, label: "Task prioritization" },
] as const;

const PHASES = [
  { label: "Plan", start: 0, end: 3 },
  { label: "Execute", start: 3, end: 6 },
  { label: "Synthesize", start: 6, end: 9 },
];

/** Step node matching Flow 360 card style */
const StepNode = ({
  icon: Icon,
  label,
  stepIndex,
}: {
  icon: React.ElementType;
  label: string;
  stepIndex?: number;
}) => (
  <div className="flex items-center gap-4 p-4 rounded-lg border-2 border-[var(--grid-line)] bg-background transition-colors min-w-0 flex-1 hover:border-[var(--foreground)]/50">
    <div className="flex justify-between items-start w-full gap-2">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <div className="w-12 h-12 shrink-0 rounded-full border-2 border-[var(--grid-line)] flex items-center justify-center bg-background">
          <Icon className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
        </div>
        <div className="min-w-0">
          <span className="text-[15px] font-semibold text-foreground leading-snug">
            {label}
          </span>
        </div>
      </div>
      {stepIndex !== undefined && (
        <span className="font-mono text-[11px] text-neutral-400 shrink-0">
          {String(stepIndex + 1).padStart(2, "0")}
        </span>
      )}
    </div>
  </div>
);

/**
 * FasalCaseStudyFlowInfographic
 * Case study flow aligned with Flow 360 style: same StepNode, arrows, and phase layout.
 */
export default function FasalCaseStudyFlowInfographic() {
  return (
    <div className="w-full border border-[var(--grid-line)] bg-background overflow-hidden">
      <div className="p-6 md:p-8 border-b border-[var(--grid-line)]">
        <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-1">
          01 Case study flow
        </p>
        <h4 className="text-[20px] font-bold tracking-tight">
          From goals to prioritization
        </h4>
        <p className="text-[15px] text-neutral-500 dark:text-neutral-400 mt-2 max-w-2xl">
          Three phases: define what to learn, run the research, then synthesize and prioritize.
        </p>
      </div>

      <div className="p-6 md:p-8 space-y-10">
        {PHASES.map((phase, phaseIdx) => {
          const phaseSteps = STEPS.slice(phase.start, phase.end);
          return (
            <section
              key={phase.label}
              className="rounded-lg border border-[var(--grid-line)] bg-[var(--grid-line)]/5 p-5 md:p-6"
            >
              <h5 className="font-mono text-[12px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-4">
                Phase {phaseIdx + 1}: {phase.label}
              </h5>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-0 items-stretch sm:items-center">
                {phaseSteps.map((step, idx) => {
                  const globalIdx = phase.start + idx;
                  const Icon = step.icon;
                  return (
                    <React.Fragment key={globalIdx}>
                      <StepNode
                        icon={Icon}
                        label={step.label}
                        stepIndex={globalIdx}
                      />
                      {idx < phaseSteps.length - 1 && (
                        <div className="hidden sm:flex shrink-0 items-center justify-center w-12 h-[72px]">
                          <FlowArrow className="w-10 h-4" />
                        </div>
                      )}
                      {idx < phaseSteps.length - 1 && (
                        <div className="sm:hidden flex shrink-0 items-center justify-center py-1 w-full">
                          <FlowArrow className="w-8 h-4" vertical />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
