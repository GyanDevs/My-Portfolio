"use client";

import React from "react";
import {
  Package,
  FileText,
  UserCheck,
  Users,
  Calendar,
  ClipboardList,
  Image,
  Banknote,
  CheckCircle2,
  Smartphone,
  FileCheck,
  MessageSquare,
  Flag,
  PauseCircle,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

/** Horizontal arrow — 1px line + arrowhead, grid-line colour (design-system compliant) */
function FlowArrow({ className = "", vertical = false }: { className?: string; vertical?: boolean }) {
  return (
    <svg
      viewBox="0 0 40 16"
      className={`shrink-0 text-[var(--grid-line)] ${className}`}
      style={vertical ? { transform: "rotate(90deg)" } : undefined}
      aria-hidden
    >
      <line x1="0" y1="8" x2="28" y2="8" stroke="currentColor" strokeWidth="1" />
      <polyline points="24,4 32,8 24,12" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/**
 * Flow360DeploymentInfographic
 * Brutalist-Editorial: grid-line borders, zero radius, mono labels, semantic green (gate) / amber (on-hold) only.
 * Ref: .ai/design-system.md, .ai/agents/architect.md
 */
export default function Flow360DeploymentInfographic() {
  const phase1 = [
    { icon: Package, label: "Shipped" },
    { icon: FileText, label: "Deployment request generated" },
    { icon: UserCheck, label: "Senior CSE auto-assigned" },
    { icon: Users, label: "CSE & EM assigned" },
  ];

  const phase2 = [
    { icon: Calendar, label: "Plan deployment (Step 1)" },
    { icon: ClipboardList, label: "Pre-deployment form (Step 2)" },
    { icon: Image, label: "Deploy & upload images (Step 3)" },
    { icon: Banknote, label: "Upload balance payment (Step 4)" },
    { icon: CheckCircle2, label: "Accounts confirms payment", isGate: true },
    { icon: Smartphone, label: "Activate device (Step 5)" },
    { icon: FileCheck, label: "Post-deployment form (Step 6)" },
  ];

  const phase3 = [
    { icon: MessageSquare, label: "EM captures CSAT" },
    { icon: Flag, label: "Complete" },
  ];

  const StepNode = ({
    icon: Icon,
    label,
    stepNum,
    isGate,
    stepIndex,
  }: {
    icon: React.ElementType;
    label: string;
    stepNum?: string;
    isGate?: boolean;
    stepIndex?: number;
  }) => (
    <div
      className={`flex flex-col p-4 border-2 bg-background min-w-0 flex-1 min-h-[72px] transition-colors ${isGate ? "border-green-500/50 bg-green-500/10 hover:border-green-500/70" : "border-[var(--grid-line)] hover:border-[var(--foreground)]/30"}`}
    >
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <div className={`w-12 h-12 shrink-0 border-2 flex items-center justify-center bg-background ${isGate ? "border-green-500/50" : "border-[var(--grid-line)]"}`}>
          <Icon className={`w-6 h-6 ${isGate ? "text-green-600 dark:text-green-400" : "text-neutral-600 dark:text-neutral-400"}`} />
        </div>
        <div className="min-w-0 flex-1">
          {stepNum && (
            <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 block mb-0.5">
              {stepNum}
            </span>
          )}
          {isGate && (
            <span className="font-mono text-[11px] uppercase tracking-wider text-green-600 dark:text-green-400 block mb-0.5">
              Gate
            </span>
          )}
          <span className="text-[15px] font-semibold text-foreground leading-snug block break-words">
            {label}
          </span>
        </div>
      </div>
      {stepIndex !== undefined && (
        <div className="flex justify-end mt-2 pt-2 border-t border-[var(--grid-line)]">
          <span className="font-mono text-[11px] text-neutral-500 tabular-nums" aria-hidden>
            {String(stepIndex + 1).padStart(2, "0")}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full border border-[var(--grid-line)] bg-background overflow-hidden">
      <div className="p-6 md:p-8 border-b border-[var(--grid-line)]">
        <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-1">
          Deployment state machine
        </p>
        <h4 className="text-[20px] font-bold tracking-tight text-foreground">
          Flow 360: Shipment to CSAT
        </h4>
        <p className="text-[15px] text-neutral-500 dark:text-neutral-400 mt-2 max-w-2xl">
          Three phases: setup and assignment, then the CSE 6-step execution, then payment confirmation and CSAT. If delivery or payment fails, the deployment goes On Hold and returns to Plan deployment.
        </p>
      </div>

      <div className="p-6 md:p-8 space-y-0">
        {/* Phase 1 */}
        <section className="border-b border-[var(--grid-line)] pb-8 md:pb-10" aria-labelledby="phase-1-heading">
          <div className="flex items-baseline gap-4 mb-6">
            <span className="font-mono text-2xl font-black text-foreground tabular-nums" aria-hidden>01</span>
            <h5 id="phase-1-heading" className="font-mono text-[12px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
              Trigger & assignment
            </h5>
          </div>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-0 items-stretch sm:items-center">
            {phase1.map((step, idx) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={idx}>
                  <StepNode icon={Icon} label={step.label} stepIndex={idx} />
                  {idx < phase1.length - 1 && (
                    <div className="hidden sm:flex shrink-0 items-center justify-center w-12 h-[72px]">
                      <FlowArrow className="w-10 h-4" />
                    </div>
                  )}
                  {idx < phase1.length - 1 && (
                    <div className="sm:hidden flex shrink-0 items-center justify-center py-1 w-full">
                      <FlowArrow className="w-8 h-4" vertical />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </section>

        {/* Connector */}
        <div className="flex flex-col items-center py-4 border-b border-[var(--grid-line)]" aria-hidden>
          <div className="w-px h-8 bg-[var(--grid-line)]" />
          <ChevronDown className="w-5 h-5 text-[var(--grid-line)] mt-1" />
        </div>

        {/* Phase 2 */}
        <section className="border-b border-[var(--grid-line)] pt-2 pb-8 md:pb-10" aria-labelledby="phase-2-heading">
          <div className="flex items-baseline gap-4 mb-6">
            <span className="font-mono text-2xl font-black text-foreground tabular-nums" aria-hidden>02</span>
            <h5 id="phase-2-heading" className="font-mono text-[12px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
              CSE execution (6 steps)
            </h5>
          </div>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="flex-1 flex flex-col gap-3 min-w-0">
              {phase2.map((step, idx) => {
                const Icon = step.icon;
                const isOnHoldSource = idx === 2;
                const isGate = "isGate" in step && step.isGate;
                const cseStepNum = idx < 4 ? idx + 1 : idx;
                const stepLabel = isGate ? undefined : `Step ${cseStepNum}`;
                if (isGate) {
                  return (
                    <React.Fragment key={idx}>
                      <StepNode icon={Icon} label={step.label} isGate={true} />
                      <div className="flex shrink-0 items-center justify-center py-1 text-[var(--grid-line)]">
                        <ChevronDown className="w-5 h-5" aria-hidden />
                      </div>
                    </React.Fragment>
                  );
                }
                return (
                  <React.Fragment key={idx}>
                    <div className="relative">
                      <StepNode icon={Icon} label={step.label} stepNum={stepLabel} />
                      {isOnHoldSource && (
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 lg:right-auto lg:top-auto lg:left-full lg:translate-y-0 lg:translate-x-4 z-10">
                          <div className="flex items-center gap-2 px-2 py-1 border-2 border-dashed border-amber-500/60 bg-amber-500/10">
                            <PauseCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                            <span className="text-[12px] font-mono font-semibold text-amber-700 dark:text-amber-300 whitespace-nowrap uppercase tracking-wider">
                              On Hold
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    {idx < phase2.length - 1 && (
                      <div className="flex shrink-0 items-center justify-center py-1 text-[var(--grid-line)]">
                        <ChevronDown className="w-5 h-5" aria-hidden />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            <div className="lg:w-72 shrink-0 flex flex-col gap-3 p-5 border-2 border-dashed border-amber-500/50 bg-amber-500/5">
              <div className="flex items-center gap-2">
                <PauseCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                <span className="font-mono text-[12px] uppercase tracking-wider text-amber-700 dark:text-amber-300 font-semibold">
                  On Hold branch
                </span>
              </div>
              <p className="text-[14px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                If the order is not delivered, returned, or the farmer refuses to pay the balance, status becomes <strong>On Hold</strong>. CSE returns to <strong>Plan deployment</strong> to set a new date. Sales POC & Manager are notified automatically if payment is refused.
              </p>
              <div className="flex items-center gap-2 mt-auto pt-2 border-t border-[var(--grid-line)]">
                <ArrowRight className="w-4 h-4 rotate-[-90deg] text-amber-600 dark:text-amber-400" />
                <span className="text-[13px] font-mono font-medium text-foreground uppercase tracking-wider">Back to Step 1</span>
              </div>
            </div>
          </div>
        </section>

        {/* Connector */}
        <div className="flex flex-col items-center py-4 border-b border-[var(--grid-line)]" aria-hidden>
          <div className="w-px h-8 bg-[var(--grid-line)]" />
          <ChevronDown className="w-5 h-5 text-[var(--grid-line)] mt-1" />
        </div>

        {/* Phase 3 */}
        <section className="pt-2" aria-labelledby="phase-3-heading">
          <div className="flex items-baseline gap-4 mb-6">
            <span className="font-mono text-2xl font-black text-foreground tabular-nums" aria-hidden>03</span>
            <h5 id="phase-3-heading" className="font-mono text-[12px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
              Payment & close
            </h5>
          </div>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-0 items-stretch sm:items-center">
            {phase3.map((step, idx) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={idx}>
                  <StepNode icon={Icon} label={step.label} stepIndex={idx} />
                  {idx < phase3.length - 1 && (
                    <div className="hidden sm:flex shrink-0 items-center justify-center w-12 h-[72px]">
                      <FlowArrow className="w-10 h-4" />
                    </div>
                  )}
                  {idx < phase3.length - 1 && (
                    <div className="sm:hidden flex shrink-0 items-center justify-center py-1 w-full">
                      <FlowArrow className="w-8 h-4" vertical />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
