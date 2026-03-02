"use client";
import React from "react";
import { TicketX, BadgeCheck, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

const metrics = [
  {
    icon: <TicketX className="w-5 h-5" />,
    metric: "80%",
    title: "Support Ticket Reduction",
    description:
      "The Passbook and Device-Specific Status cards let farmers self-diagnose deductions. The primary source of confusion ('Where did my money go?') was eliminated.",
  },
  {
    icon: <BadgeCheck className="w-5 h-5" />,
    metric: "100%",
    title: "Revenue Recognition Accuracy",
    description:
      "Moved from estimating revenue on wallet balances to tracking exact subscription days. Every rupee is now correctly classified as deferred or recognised.",
  },
  {
    icon: <RefreshCcw className="w-5 h-5" />,
    metric: "Churn",
    title: "Involuntary Exits Reduced",
    description:
      "Renewal nudges at 15, 7, and 3 days remaining, plus a soft Grace Period instead of a hard block, reduced churn caused by accidental expiry.",
  },
];

export default function FasalBillingImpactGrid() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[var(--grid-line)] border border-[var(--grid-line)]">
      {metrics.map((item, idx) => (
        <motion.div
          key={idx}
          className="bg-background flex flex-col h-full relative group card-hover transition-all duration-300 ease-spring p-8 md:p-10"
          style={{ minHeight: "280px" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <div className="flex justify-between items-start mb-12">
            <div className="w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shadow-[4px_4px_0px_0px_var(--grid-line)] group-hover:shadow-[6px_6px_0px_0px_var(--foreground)] group-hover:border-[var(--foreground)] transition-all duration-500 shrink-0 group-hover:-translate-y-1 group-hover:-translate-x-1 opacity-80 group-hover:opacity-100">
              {item.icon}
            </div>
            <span className="font-mono text-[10px] text-neutral-400">
              0{idx + 1}
            </span>
          </div>

          <div className="space-y-4 flex-grow flex flex-col justify-end">
            <p className="font-mono text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-medium">
              {item.metric}
            </p>
            <div>
              <h5 className="text-[18px] font-bold tracking-tight mb-3 text-[var(--foreground)]">
                {item.title}
              </h5>
              <p className="text-[16px] font-sans font-light leading-relaxed text-neutral-500 dark:text-neutral-400">
                {item.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
