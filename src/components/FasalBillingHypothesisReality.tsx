"use client";
import React from "react";
import { Target, AlertTriangle, RefreshCcw, CheckCircle2 } from "lucide-react";

export default function FasalBillingHypothesisReality() {
    const cards = [
        {
            label: "THE WIN",
            title: "Visual Urgency Works",
            description:
                "Heatmaps confirmed our Traffic Light theory. Users ignored the dates and immediately navigated to the Red Progress Bar (< 30 Days). The color coding worked instantly across all literacy levels.",
            icon: <Target className="w-5 h-5" />,
        },
        {
            label: "THE FAIL",
            title: "The Season Trap",
            description:
                "We hit a friction point. We had labeled plans as 'Season Packs' (thinking of crop cycles). Farmers paused. They looked for specific numbers. 'Season' was too vague.",
            icon: <AlertTriangle className="w-5 h-5" />,
        },
        {
            label: "THE PIVOT",
            title: "Explicit Durations",
            description:
                "We renamed every pack to explicit durations (90 Days / 180 Days / 365 Days).",
            icon: <RefreshCcw className="w-5 h-5" />,
        },
        {
            label: "THE RESULT",
            title: "Immediate Improvement",
            description:
                "Farmers stopped hesitating. Selection speed improved from the first session. Explicit durations beat evocative labels every time.",
            icon: <CheckCircle2 className="w-5 h-5" />,
        },
    ];

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[var(--grid-line)] border border-[var(--grid-line)] mb-12">
            {cards.map((card, idx) => (
                <div
                    key={idx}
                    className="bg-background p-8 md:p-10 flex flex-col h-full relative group card-hover transition-all duration-300 ease-spring"
                >
                    <div className="flex justify-between items-start mb-12">
                        {/* Brutalist Icon Box */}
                        <div className="w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shadow-[4px_4px_0px_0px_var(--grid-line)] group-hover:shadow-[6px_6px_0px_0px_var(--foreground)] group-hover:border-[var(--foreground)] transition-all duration-500 shrink-0 group-hover:-translate-y-1 group-hover:-translate-x-1 opacity-80 group-hover:opacity-100">
                            {card.icon}
                        </div>
                        <span className="font-mono text-[10px] text-neutral-400">
                            0{idx + 1}
                        </span>
                    </div>
                    <div className="space-y-4 flex-grow flex flex-col justify-end">
                        <p className="font-mono text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-medium">
                            {card.label}
                        </p>
                        <div>
                            <h5 className="text-[18px] font-bold tracking-tight mb-3 text-[var(--foreground)]">
                                {card.title}
                            </h5>
                            <p className="text-[16px] font-sans font-light leading-relaxed text-neutral-500 dark:text-neutral-400">
                                {card.description}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
