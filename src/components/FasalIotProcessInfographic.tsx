"use client";
import React from "react";
import {
  Search,
  Lightbulb,
  PenTool,
  CheckCircle2,
} from "lucide-react"; /** * FasalIotProcessInfographic * Visualizes the 4-stage design process for the IoT Sensor Dial redesign. */
export default function FasalIotProcessInfographic() {
  const steps = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Analysis & Field Visit",
      desc: "Visited farms to watch farmers use the app live, mapping exactly where dials caused confusion.",
      label: "DISCOVERY",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Ideation & Design",
      desc: "Explored dial and bar designs, testing how size and color changes affected outdoor readability.",
      label: "IDEATION",
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "Prototyping & Testing",
      desc: "Built interactive prototypes and tested them with farmers in the field via Useberry.",
      label: "EXECUTION",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Feedback Implementation",
      desc: "Applied farmer feedback to the final design: animations, simplified states, clearer labels.",
      label: "REFINEMENT",
    },
  ];
  return (
    <div className="w-full border border-[var(--grid-line)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-background mb-12">
      {" "}
      {steps.map((step, idx) => (
        <div
          key={idx}
          className={`p-8 flex flex-col gap-6 group card-hover transition-colors ${idx !== steps.length - 1 ? "border-b lg:border-b-0 lg:border-r border-[var(--grid-line)]" : "border-b md:border-b-0"} ${idx === 1 ? "md:border-r-0 lg:border-r" : ""}`}
        >
          {" "}
          <div className="flex justify-between items-start">
            {" "}
            <div className="w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shadow-[4px_4px_0px_0px_var(--grid-line)] group-hover:shadow-[6px_6px_0px_0px_var(--foreground)] group-hover:border-[var(--foreground)] transition-all duration-500 shrink-0 group-hover:-translate-y-1 group-hover:-translate-x-1 opacity-80 group-hover:opacity-100">
              {" "}
              {step.icon}{" "}
            </div>{" "}
            <span className="font-mono text-[13px] text-neutral-400">
              0{idx + 1}
            </span>{" "}
          </div>{" "}
          <div>
            {" "}
            <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-2">
              {step.label}
            </p>{" "}
            <h4 className="text-xl font-bold tracking-tight mb-3 leading-tight">
              {step.title}
            </h4>{" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
              {" "}
              {step.desc}{" "}
            </p>{" "}
          </div>{" "}
        </div>
      ))}{" "}
    </div>
  );
}
