"use client";
import React from "react";

interface FasalGoalsGridProps {
  goals: string[];
}
/** * FasalGoalsGrid * Displays user testing goals in a grid format similar to the Design Process component. */
export default function FasalGoalsGrid({ goals }: FasalGoalsGridProps) {
  // Labels for the goals
  const goalTitles = [
    "Usability & Intuition", "User Preference", "Audio Effectiveness", "Experience Feedback",
    "Problem Validation", "Learning Curve", "Accessibility", "Error Prevention",
    "Efficiency", "Satisfaction", "Adoption"
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-background overflow-hidden text-[var(--foreground)] border-t border-l border-[var(--grid-line)]">
      {goals.map((goal, idx) => {
        return (
          <div key={idx} className="p-8 flex flex-col gap-6 group card-hover transition-colors border-r border-b border-[var(--grid-line)]" >
            <div className="flex justify-between items-start">
              <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">GOAL</p>
              <span className="font-mono text-[13px] text-neutral-400">{(idx + 1).toString().padStart(2, '0')}</span>
            </div>
            <div>
              <h4 className="text-xl font-bold tracking-tight mb-3 leading-tight text-[var(--foreground)]">
                {goalTitles[idx] || "Testing Objective"}
              </h4>
              <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
                {goal}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
