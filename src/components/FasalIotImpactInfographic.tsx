"use client";
import React from "react";
import { Eye, LifeBuoy, HelpCircle, LucideIcon } from "lucide-react";
interface ImpactMetric {
  icon: LucideIcon;
  value: string;
  label: string;
  desc: string;
  color: string;
}
const metrics: ImpactMetric[] = [
  {
    icon: Eye,
    value: "90%",
    label: "Easier to Read",
    desc: "Farmers said sensor readings were easier to understand, especially outdoors.",
    color: "",
  },
  {
    icon: LifeBuoy,
    value: "-80%",
    label: "Fewer Support Tickets",
    desc: "Tickets dropped from 50 to 10 per week once farmers could read the dials themselves.",
    color: "",
  },
  {
    icon: HelpCircle,
    value: "73%",
    label: "Contextual Help Used",
    desc: "Nearly 3 in 4 farmers explored the contextual help. They wanted to understand the data, not just see it.",
    color: "",
  },
];
export default function FasalIotImpactInfographic() {
  return (
    <div className="w-full border border-[var(--grid-line)] bg-background mb-12 overflow-hidden">
      {" "}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--grid-line)]">
        {" "}
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="p-8 space-y-6 group card-hover transition-colors group group relative"
          >
            {" "}
            <div className="flex justify-between items-start">
              {" "}
              <div
                className={`w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shadow-[4px_4px_0px_0px_var(--grid-line)] group-hover:shadow-[6px_6px_0px_0px_var(--foreground)] group-hover:border-[var(--foreground)] transition-[transform,box-shadow,opacity,border-color] duration-300 ease-out shrink-0 group-hover:-translate-y-1 group-hover:-translate-x-1 opacity-80 group-hover:opacity-100 ${metric.color}`}
              >
                {" "}
                <metric.icon className="w-6 h-6" />{" "}
              </div>{" "}
              <span className="font-mono text-[13px] text-neutral-400">
                0{idx + 1}
              </span>{" "}
            </div>{" "}
            <div>
              {" "}
              <div className="flex items-baseline gap-2 mb-1">
                {" "}
                <span className="text-[18px] font-bold tracking-tight text-[var(--foreground)]">
                  {" "}
                  {metric.value}{" "}
                </span>{" "}
              </div>{" "}
              <h4 className="text-[18px] font-bold tracking-tight mb-3 text-[var(--foreground)]">
                {" "}
                {metric.label}{" "}
              </h4>{" "}
              <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
                {" "}
                {metric.desc}{" "}
              </p>{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </div>
  );
}
