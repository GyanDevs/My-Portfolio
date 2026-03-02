"use client";
import React from "react";
import { ArrowDown } from "lucide-react";
/** * FasalBillingLogicFlowchart * Visualises the three parallel logic flows for edge-case handling: * System Logic / Financial Logic / User Logic * Design language: brutalist grid, monospace labels, offset shadows. */ interface FlowNode {
  role: "start" | "process" | "end";
  label: string;
  desc: string;
}
interface FlowColumn {
  title: string;
  nodes: FlowNode[];
}
const flows: FlowColumn[] = [
  {
    title: "System Logic",
    nodes: [
      { role: "start", label: "START", desc: "Gateway subscription expired" },
      {
        role: "process",
        label: "PROCESS",
        desc: "Signal lost to connected sensors",
      },
      { role: "end", label: "END", desc: "Sensor paused" },
    ],
  },
  {
    title: "Financial Logic",
    nodes: [
      { role: "start", label: "START", desc: "Existing credit value" },
      { role: "process", label: "PROCESS", desc: "Divide by new daily rate" },
      {
        role: "end",
        label: "END",
        desc: "Transparent validity days calculated",
      },
    ],
  },
  {
    title: "User Logic",
    nodes: [
      { role: "start", label: "START", desc: "User taps pause button" },
      {
        role: "process",
        label: "PROCESS",
        desc: "Device enters seasonal mode",
      },
      { role: "end", label: "END", desc: "Billing stopped" },
    ],
  },
];
const roleStyle: Record<
  FlowNode["role"],
  { label: string; mono: string; shadow: string; border: string }
> = {
  start: {
    label: "emerald",
    mono: "text-[var(--foreground)]",
    shadow: "",
    border: "border-[var(--grid-line)]",
  },
  process: {
    label: "amber",
    mono: "text-[var(--foreground)]",
    shadow: "",
    border: "border-[var(--grid-line)]",
  },
  end: {
    label: "rose",
    mono: "text-[var(--foreground)]",
    shadow: "",
    border: "border-[var(--grid-line)]",
  },
};
export default function FasalBillingLogicFlowchart() {
  return (
    <div className="w-full border border-[var(--grid-line)] bg-background mb-12">
      {" "}
      {/* Column headers */}{" "}
      <div className="grid grid-cols-1 md:grid-cols-3 border-b border-[var(--grid-line)]">
        {" "}
        {flows.map((col, i) => (
          <div
            key={i}
            className={`px-8 py-5 ${i < flows.length - 1 ? "border-b md:border-b-0 md:border-r border-[var(--grid-line)]" : ""}`}
          >
            {" "}
            <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
              {" "}
              {col.title}{" "}
            </p>{" "}
          </div>
        ))}{" "}
      </div>{" "}
      {/* Flow columns */}{" "}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {" "}
        {flows.map((col, ci) => (
          <div
            key={ci}
            className={`px-8 py-10 flex flex-col items-center gap-0 ${ci < flows.length - 1 ? "border-b md:border-b-0 md:border-r border-[var(--grid-line)]" : ""}`}
          >
            {" "}
            {col.nodes.map((node, ni) => {
              const s = roleStyle[node.role];
              return (
                <React.Fragment key={ni}>
                  {" "}
                  {/* Node card */}{" "}
                  <div
                    className={`w-full max-w-[260px] border ${s.border} bg-background ${s.shadow} p-5 flex flex-col gap-2 text-center card-hover transition-all duration-300 ease-spring`}
                  >
                    {" "}
                    <span
                      className={`font-mono text-[11px] uppercase tracking-[0.25em] font-bold ${s.mono}`}
                    >
                      {" "}
                      {node.label}{" "}
                    </span>{" "}
                    <p className="text-[16px] font-sans font-light leading-snug text-neutral-500 dark:text-neutral-400">
                      {" "}
                      {node.desc}{" "}
                    </p>{" "}
                  </div>{" "}
                  {/* Connector arrow (not after last node) */}{" "}
                  {ni < col.nodes.length - 1 && (
                    <div className="flex flex-col items-center py-3 gap-1">
                      {" "}
                      <div className="w-[1px] h-5 bg-[var(--grid-line)]" />{" "}
                      <ArrowDown className="w-4 h-4 text-neutral-400" />{" "}
                    </div>
                  )}{" "}
                </React.Fragment>
              );
            })}{" "}
          </div>
        ))}{" "}
      </div>{" "}
      {/* Footer label */}{" "}
      <div className="border-t border-[var(--grid-line)] px-8 py-4">
        {" "}
        <p className="font-mono text-[13px] text-neutral-400 uppercase tracking-widest text-center">
          {" "}
          Graceful degradation across all three logic layers{" "}
        </p>{" "}
      </div>{" "}
    </div>
  );
}
