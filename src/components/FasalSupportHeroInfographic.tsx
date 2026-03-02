"use client";
import React from "react";
import {
  ShieldAlert,
  Headphones,
  CheckCircle,
  Workflow,
} from "lucide-react"; /** * FasalSupportHeroInfographic * A high-impact 4-panel introduction visual for the Support System case study. */
export default function FasalSupportHeroInfographic() {
  return (
    <div className="w-full border border-[var(--grid-line)] grid grid-cols-1 md:grid-cols-2 bg-background">
      {" "}
      {/* Panel 1: The Pivot (Top Left) */}{" "}
      <div className="p-8 border-b md:border-r border-[var(--grid-line)] group card-hover transition-colors duration-500 relative">
        {" "}
        <div className="space-y-6">
          {" "}
          <div className="w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shadow-[4px_4px_0px_0px_var(--grid-line)] group-hover:shadow-[6px_6px_0px_0px_var(--foreground)] group-hover:border-[var(--foreground)] transition-all duration-500 shrink-0 group-hover:-translate-y-1 group-hover:-translate-x-1 opacity-80 group-hover:opacity-100">
            {" "}
            <Headphones className="w-6 h-6" />{" "}
          </div>{" "}
          <div>
            {" "}
            <p className="font-mono text-[13px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
              The Pivot
            </p>{" "}
            <h4 className="text-[18px] font-bold tracking-tight">
              Audio First
            </h4>{" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400 mt-2">
              {" "}
              Redesigned the help architecture to prioritize voice reporting and
              simplified status tracking for a 100% resolution success
              rate.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* Panel 2: The Goal (Top Right) */}{" "}
      <div className="p-8 border-b border-[var(--grid-line)] group card-hover transition-colors duration-500 relative">
        {" "}
        <div className="space-y-6">
          {" "}
          <div className="w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shadow-[4px_4px_0px_0px_var(--grid-line)] group-hover:shadow-[6px_6px_0px_0px_var(--foreground)] group-hover:border-[var(--foreground)] transition-all duration-500 shrink-0 group-hover:-translate-y-1 group-hover:-translate-x-1 opacity-80 group-hover:opacity-100">
            {" "}
            <CheckCircle className="w-6 h-6" />{" "}
          </div>{" "}
          <div>
            {" "}
            <p className="font-mono text-[13px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
              The Goal
            </p>{" "}
            <h4 className="text-[18px] font-bold tracking-tight">
              Scale Support
            </h4>{" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400 mt-2">
              {" "}
              Enable 50k+ farmers to self-diagnose hardware issues while
              streamlining agent workflows for complex inquiries.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* Panel 3: The Friction (Bottom Left) */}{" "}
      <div className="p-8 border-b md:border-b-0 md:border-r border-[var(--grid-line)] group card-hover transition-colors duration-500 relative">
        {" "}
        <div className="space-y-6">
          {" "}
          <div className="w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shadow-[4px_4px_0px_0px_var(--grid-line)] group-hover:shadow-[6px_6px_0px_0px_var(--foreground)] group-hover:border-[var(--foreground)] transition-all duration-500 shrink-0 group-hover:-translate-y-1 group-hover:-translate-x-1 opacity-80 group-hover:opacity-100">
            {" "}
            <ShieldAlert className="w-6 h-6" />{" "}
          </div>{" "}
          <div>
            {" "}
            <p className="font-mono text-[13px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
              The Friction
            </p>{" "}
            <h4 className="text-[18px] font-bold tracking-tight">
              Support Overload
            </h4>{" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400 mt-2">
              {" "}
              Legacy text-only help system failed to account for language
              barriers and varying literacy levels, causing user
              frustration.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* Panel 4: The Limit (Bottom Right) */}{" "}
      <div className="p-8 group card-hover transition-colors duration-500 relative">
        {" "}
        <div className="space-y-6">
          {" "}
          <div className="w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shadow-[4px_4px_0px_0px_var(--grid-line)] group-hover:shadow-[6px_6px_0px_0px_var(--foreground)] group-hover:border-[var(--foreground)] transition-all duration-500 shrink-0 group-hover:-translate-y-1 group-hover:-translate-x-1 opacity-80 group-hover:opacity-100">
            {" "}
            <Workflow className="w-6 h-6" />{" "}
          </div>{" "}
          <div>
            {" "}
            <p className="font-mono text-[13px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
              The Limit
            </p>{" "}
            <h4 className="text-[18px] font-bold tracking-tight">
              Constraints
            </h4>{" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400 mt-2">
              {" "}
              The ideal solution would be to provide an upfront calling option;
              however, operational limitations prevented implementation.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
