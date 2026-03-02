"use client";
import React from "react";
import { Ticket, Search, UserMinus } from "lucide-react";
export default function FasalBillingDataFindings() {
  const findings = [
    {
      metric: "40%",
      title: "High Ticket Volume",
      description:
        "of all high-priority tickets were billing-related disputes.",
      icon: <Ticket className="w-5 h-5" />,
    },
    {
      metric: "Top complaint",
      title: "The Vanishing Money Myth",
      description:
        "The word 'deduction' led every complaint log. Farmers felt money was vanishing, and Fasal had no answer for it.",
      icon: <Search className="w-5 h-5" />,
    },
    {
      metric: "3x",
      title: "Churn Correlation",
      description:
        "Users who faced an unexpected deduction were 3x more likely to churn than users with hardware issues.",
      icon: <UserMinus className="w-5 h-5" />,
    },
  ];
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[var(--grid-line)] border border-[var(--grid-line)] mb-12">
      {findings.map((finding, idx) => (
        <div
          key={idx}
          className="bg-background flex flex-col h-full relative group card-hover transition-all duration-300 ease-spring p-8 md:p-10"
          style={{ minHeight: "280px" }}
        >
          {" "}
          <div className="flex justify-between items-start mb-12">
            {" "}
            {/* Brutalist Icon Box */}{" "}
            <div className="w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shadow-[4px_4px_0px_0px_var(--grid-line)] group-hover:shadow-[6px_6px_0px_0px_var(--foreground)] group-hover:border-[var(--foreground)] transition-all duration-500 shrink-0 group-hover:-translate-y-1 group-hover:-translate-x-1 opacity-80 group-hover:opacity-100">
              {" "}
              {finding.icon}{" "}
            </div>{" "}
            <span className="font-mono text-[10px] text-neutral-400">
              0{idx + 1}
            </span>{" "}
          </div>{" "}
          <div className="space-y-4 flex-grow flex flex-col justify-end">
            {" "}
            <p className="font-mono text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-medium">
              {" "}
              {finding.metric}{" "}
            </p>{" "}
            <div>
              {" "}
              <h5 className="text-[18px] font-bold tracking-tight mb-3 text-[var(--foreground)]">
                {" "}
                {finding.title}{" "}
              </h5>{" "}
              <p className="text-[16px] font-sans font-light leading-relaxed text-neutral-500 dark:text-neutral-400">
                {" "}
                {finding.description}{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      ))}{" "}
    </div>
  );
}
