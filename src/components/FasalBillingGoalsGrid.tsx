"use client";
import React from "react";
import {
  Layers,
  Eye,
  ShieldCheck,
  Server,
  Cpu,
  WifiOff,
} from "lucide-react";

export default function FasalBillingGoalsGrid() {
  const goals = [
    {
      icon: <Layers className="w-6 h-6" />,
      label: "GRANULARITY",
      title: "Per-Device Control",
      desc: "Enable Pause / Resume management at the individual asset level, not the entire account.",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      label: "TRANSPARENCY",
      title: "Full Rupee Visibility",
      desc: "100% visibility into every deduction. The Passbook feature gives farmers a verifiable paper trail.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      label: "REVENUE PROTECTION",
      title: "Grace Period Design",
      desc: "Reduce involuntary churn by designing better Low Balance alerts and soft Grace Period states.",
    },
  ];
  const constraints = [
    {
      icon: <Server className="w-6 h-6" />,
      label: "BACKEND MIGRATION",
      title: "Wallet → Subscription",
      desc: "A massive DB migration was required. The UI had to gracefully handle both Legacy and New user states simultaneously.",
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      label: "HARDWARE DEPENDENCY",
      title: "Device Expiry Chain",
      desc: "If a Main Unit expires, connected Sensor Nodes go silent. Billing logic had to respect this hardware hierarchy.",
    },
    {
      icon: <WifiOff className="w-6 h-6" />,
      label: "OFFLINE-FIRST",
      title: "No Infinite Spinners",
      desc: "Payments happen in low-network areas. The UI needed robust Pending / Processing states that never left farmers confused.",
    },
  ];
  return (
    <div className="w-full flex flex-col gap-10">
      {/* Design Goals */}
      <div className="flex flex-col gap-4">
        <div className="inline-flex items-center px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[13px] font-mono tracking-widest uppercase w-fit">
          Design Goals
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 border border-emerald-500/20">
          {goals.map((item, idx) => (
            <div
              key={idx}
              className={`p-8 flex flex-col gap-6 group transition-colors duration-200 bg-background hover:bg-emerald-500/10 ${idx !== goals.length - 1
                ? "border-b md:border-b-0 md:border-r border-emerald-500/20"
                : ""
                }`}
            >
              <div className="flex justify-between items-start">
                {/* Icon box — emerald shadow-shift on hover */}
                <div className="w-12 h-12 border border-emerald-500/30 flex items-center justify-center bg-background text-emerald-600 dark:text-emerald-400 shadow-[4px_4px_0px_0px_rgba(16,185,129,0.2)] group-hover:shadow-[6px_6px_0px_0px_rgba(16,185,129,0.5)] group-hover:border-emerald-500/70 transition-[transform,box-shadow,opacity,border-color] duration-300 ease-out shrink-0 group-hover:-translate-y-1 group-hover:-translate-x-1 opacity-80 group-hover:opacity-100">
                  {item.icon}
                </div>
                <span className="font-mono text-[13px] text-emerald-400/60">
                  0{idx + 1}
                </span>
              </div>
              <div>
                <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-emerald-600/70 dark:text-emerald-400/70 mb-2">
                  {item.label}
                </p>
                <h5 className="text-[18px] font-bold tracking-tight mb-3 leading-tight text-emerald-900 dark:text-emerald-100">
                  {item.title}
                </h5>
                <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical & Business Constraints */}
      <div className="flex flex-col gap-4">
        <div className="inline-flex items-center px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[13px] font-mono tracking-widest uppercase w-fit">
          Technical &amp; Business Constraints
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 border border-amber-500/20">
          {constraints.map((item, idx) => (
            <div
              key={idx}
              className={`p-8 flex flex-col gap-6 group transition-colors duration-200 bg-background hover:bg-amber-500/10 ${idx !== constraints.length - 1
                ? "border-b md:border-b-0 md:border-r border-amber-500/20"
                : ""
                }`}
            >
              <div className="flex justify-between items-start">
                {/* Icon box — amber shadow-shift on hover */}
                <div className="w-12 h-12 border border-amber-500/30 flex items-center justify-center bg-background text-amber-600 dark:text-amber-400 shadow-[4px_4px_0px_0px_rgba(245,158,11,0.2)] group-hover:shadow-[6px_6px_0px_0px_rgba(245,158,11,0.5)] group-hover:border-amber-500/70 transition-[transform,box-shadow,opacity,border-color] duration-300 ease-out shrink-0 group-hover:-translate-y-1 group-hover:-translate-x-1 opacity-80 group-hover:opacity-100">
                  {item.icon}
                </div>
                <span className="font-mono text-[13px] text-amber-400/60">
                  0{idx + 1}
                </span>
              </div>
              <div>
                <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-amber-600/70 dark:text-amber-400/70 mb-2">
                  {item.label}
                </p>
                <h5 className="text-[18px] font-bold tracking-tight mb-3 leading-tight text-amber-900 dark:text-amber-100">
                  {item.title}
                </h5>
                <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
