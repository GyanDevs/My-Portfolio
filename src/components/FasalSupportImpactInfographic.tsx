"use client";
import React from "react";
import {
  TrendingUp,
  Users,
  Smartphone,
  MessageSquare,
} from "lucide-react"; /** * FasalSupportImpactInfographic * Visualizes the post-launch metrics and business impact. */
export default function FasalSupportImpactInfographic() {
  const stats = [
    {
      icon: <MessageSquare className="w-5 h-5" />,
      value: "107.6%",
      label: "Increase in tickets raised",
      desc: "Showing massively improved accessibility.",
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      value: "34.28%",
      label: "Audio feature adoption",
      desc: "Confirmed language barriers as a primary friction point.",
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      value: "24.9%",
      label: "Mobile submission growth",
      desc: "Better optimization for handheld field reporting.",
    },
    {
      icon: <Users className="w-5 h-5" />,
      value: "80%",
      label: "Ticket resolution efficiency",
      desc: "Diagnostic automation reduced manual agent intervention.",
    },
  ];
  return (
    <div className="w-full border border-[var(--grid-line)] bg-background">
      {" "}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {" "}
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`bg-background p-8 space-y-6 card-hover transition-colors group relative border-b lg:border-b-0 lg:border-r border-[var(--grid-line)] ${idx === stats.length - 1 ? "lg:border-r-0" : ""} ${idx % 2 === 0 ? "md:border-r" : "md:border-r-0 lg:border-r"}`}
          >
            {" "}
            <div className="flex justify-between items-start">
              {" "}
              <div className="w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shadow-[4px_4px_0px_0px_var(--grid-line)] group-hover:shadow-[6px_6px_0px_0px_var(--foreground)] group-hover:border-[var(--foreground)] transition-[transform,box-shadow,opacity,border-color] duration-300 ease-out shrink-0 group-hover:-translate-y-1 group-hover:-translate-x-1 opacity-80 group-hover:opacity-100">
                {" "}
                {stat.icon}{" "}
              </div>{" "}
              <span className="font-mono text-[13px] text-neutral-400">
                {(idx + 1).toString().padStart(2, "0")}
              </span>{" "}
            </div>{" "}
            <div>
              {" "}
              <div className="text-[18px] font-bold tracking-tight text-[var(--foreground)] mb-1">
                {" "}
                {stat.value}{" "}
              </div>{" "}
              <div className="font-mono text-[13px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-4 font-bold">
                {" "}
                {stat.label}{" "}
              </div>{" "}
              <p className="text-[16px] text-neutral-500 dark:text-neutral-400 font-sans font-light leading-relaxed">
                {" "}
                {stat.desc}{" "}
              </p>{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </div>{" "}
      <div className="bg-background p-6 border-t border-[var(--grid-line)]">
        {" "}
        <p className="font-mono text-[13px] text-center text-neutral-400 uppercase tracking-widest">
          {" "}
          Data based on 6 months post-deployment tracking and stakeholder
          interviews.{" "}
        </p>{" "}
      </div>{" "}
    </div>
  );
}
