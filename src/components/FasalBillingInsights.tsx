"use client";
import React from "react";
export default function FasalBillingInsights() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[1px] bg-[var(--grid-line)] border border-[var(--grid-line)] mt-12 mb-16">
      {" "}
      {/* Insight 1 */}{" "}
      <div className="bg-background flex flex-col h-full relative group card-hover transition-all duration-300">
        {" "}
        {/* Visual Area */}{" "}
        <div className="h-48 p-8 flex items-center justify-start">
          {" "}
          <div className="w-32 h-24 border border-[var(--grid-line)] flex items-center justify-center gap-3 relative bg-background shadow-[6px_6px_0px_0px_var(--grid-line)] group-hover:shadow-[8px_8px_0px_0px_var(--foreground)] group-hover:border-[var(--foreground)] transition-all duration-500 shrink-0 group-hover:-translate-y-1 group-hover:-translate-x-1 opacity-70 group-hover:opacity-100">
            {" "}
            {/* Central Wallet */}{" "}
            <div className="w-10 h-10 border border-[var(--grid-line)] flex items-center justify-center bg-background z-10 transition-colors duration-500 group-hover:border-[var(--foreground)] shrink-0">
              <span className="font-serif italic font-bold text-sm">
                &#8377;
              </span>
            </div>{" "}
            {/* Connections */}{" "}
            <div className="flex flex-col gap-2 relative shrink-0">
              {" "}
              <div className="w-4 h-[1px] bg-[var(--grid-line)] group-hover:bg-[var(--foreground)] transition-colors duration-500" />{" "}
              <div className="w-4 h-[1px] bg-[var(--grid-line)] group-hover:bg-[var(--foreground)] opacity-50 transition-colors duration-500" />{" "}
              <div className="w-4 h-[1px] bg-[var(--grid-line)] group-hover:bg-[var(--foreground)] opacity-20 transition-colors duration-500" />{" "}
            </div>{" "}
            {/* Devices */}{" "}
            <div className="flex flex-col gap-1.5 shrink-0">
              {" "}
              <div className="w-3 h-3 border border-[var(--grid-line)] bg-[var(--grid-line)] group-hover:border-[var(--foreground)] transition-all duration-500 group-hover:bg-[var(--foreground)]" />{" "}
              <div className="w-3 h-3 border border-[var(--grid-line)] bg-background group-hover:border-[var(--foreground)] transition-colors duration-500" />{" "}
              <div className="w-3 h-3 border border-[var(--grid-line)] bg-background group-hover:border-[var(--foreground)] transition-colors duration-500" />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="p-8 md:p-10 flex-grow pt-0 md:pt-0">
          {" "}
          <div className="flex items-center gap-3 mb-6">
            {" "}
            <span className="font-mono text-[13px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 border border-[var(--grid-line)] px-3 py-1">
              Insight 01
            </span>{" "}
          </div>{" "}
          <h3 className="text-[18px] font-bold mb-4 font-sans text-foreground tracking-tight">
            The Shared Wallet Fallacy
          </h3>{" "}
          <div className="space-y-4 text-neutral-500 dark:text-neutral-400 text-[16px]  text-neutral-500 dark:text-neutral-400 font-sans leading-relaxed">
            {" "}
            <p>
              <strong className="text-foreground font-medium">
                What we found:
              </strong>{" "}
              Fasal used a &apos;Common Pool&apos; wallet that automatically
              deducted fees for all connected devices daily.
            </p>{" "}
            <p>
              <strong className="text-foreground font-medium">
                Why it mattered:
              </strong>{" "}
              Farmers operate seasonally. They want to pay for active crops and
              pause fallow land. The shared pool forced them to pay for
              everything simultaneously or risk losing connections.
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* Insight 2 */}{" "}
      <div className="bg-background flex flex-col h-full relative group card-hover transition-all duration-300">
        {" "}
        {/* Visual Area */}{" "}
        <div className="h-48 p-8 flex items-center justify-start">
          {" "}
          {/* Abstract SIM/Validity Representation */}{" "}
          <div className="w-32 h-24 border border-[var(--grid-line)] flex overflow-hidden relative bg-background shadow-[6px_6px_0px_0px_var(--grid-line)] group-hover:shadow-[8px_8px_0px_0px_var(--foreground)] group-hover:border-[var(--foreground)] transition-all duration-500 shrink-0 group-hover:-translate-y-1 group-hover:-translate-x-1 opacity-70 group-hover:opacity-100">
            {" "}
            <div className="absolute top-2 left-2 w-5 h-6 border border-[var(--grid-line)] group-hover:border-[var(--foreground)] opacity-50 transition-colors" />{" "}
            <div className="flex-1 flex flex-col items-end justify-end p-3">
              {" "}
              <div className="font-mono text-[9px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-1">
                Validity
              </div>{" "}
              <div className="font-mono text-2xl font-bold text-foreground leading-none">
                {" "}
                180
                <span className="text-[10px] ml-1 font-normal opacity-50 tracking-widest">
                  DAYS
                </span>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="p-8 md:p-10 flex-grow pt-0 md:pt-0">
          {" "}
          <div className="flex items-center gap-3 mb-6">
            {" "}
            <span className="font-mono text-[13px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 border border-[var(--grid-line)] px-3 py-1">
              Insight 02
            </span>{" "}
          </div>{" "}
          <h3 className="text-[18px] font-bold mb-4 font-sans text-foreground tracking-tight">
            The Prepaid SIM Model
          </h3>{" "}
          <div className="space-y-4 text-neutral-500 dark:text-neutral-400 text-[16px]  text-neutral-500 dark:text-neutral-400 font-sans leading-relaxed">
            {" "}
            <p>
              <strong className="text-foreground font-medium">
                What we found:
              </strong>{" "}
              Farmers are comfortable with complex payments if it matches the
              Telecom Model (like Jio/Airtel).
            </p>{" "}
            <p>
              <strong className="text-foreground font-medium">
                Why it mattered:
              </strong>{" "}
              They understand &apos;Validity&apos; (Days Left) much better than
              an abstract &apos;Balance&apos; (Currency Left). They want to
              &apos;Recharge&apos; specific devices for a specific time.
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* Insight 3 */}{" "}
      <div className="bg-background flex flex-col h-full relative group card-hover transition-all duration-300">
        {" "}
        {/* Visual Area */}{" "}
        <div className="h-48 p-8 flex items-center justify-start">
          {" "}
          {/* Ledger Representation enclosed in matching rect format */}{" "}
          <div className="w-32 h-24 border border-[var(--grid-line)] bg-background relative flex flex-col gap-2 p-3 shadow-[6px_6px_0px_0px_var(--grid-line)] group-hover:shadow-[8px_8px_0px_0px_var(--foreground)] group-hover:border-[var(--foreground)] transition-all duration-500 shrink-0 group-hover:-translate-y-1 group-hover:-translate-x-1 justify-center opacity-70 group-hover:opacity-100">
            {" "}
            <div className="flex items-center justify-between">
              {" "}
              <div className="w-10 h-[2px] bg-[var(--grid-line)] group-hover:bg-[var(--foreground)] transition-colors" />{" "}
              <div className="font-mono text-[9px] text-red-500/80">
                -&#8377;10
              </div>{" "}
            </div>{" "}
            <div className="flex items-center justify-between">
              {" "}
              <div className="w-6 h-[2px] bg-[var(--grid-line)] group-hover:bg-[var(--foreground)] transition-colors" />{" "}
              <div className="font-mono text-[9px] text-red-500/80">
                -&#8377;10
              </div>{" "}
            </div>{" "}
            <div className="flex items-center justify-between">
              {" "}
              <div className="w-12 h-[2px] bg-[var(--grid-line)] group-hover:bg-[var(--foreground)] transition-colors" />{" "}
              <div className="font-mono text-[9px] text-red-500/80">
                -&#8377;10
              </div>{" "}
            </div>{" "}
            <div className="flex items-center justify-between mt-1 pt-1 border-t border-[var(--grid-line)] group-hover:border-[var(--foreground)] transition-colors">
              {" "}
              <div className="w-8 h-[2px] bg-[var(--foreground)] opacity-30 group-hover:opacity-100 transition-opacity" />{" "}
              <div className="font-mono text-[9px] text-green-500 font-bold">
                +&#8377;500
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="p-8 md:p-10 flex-grow pt-0 md:pt-0">
          {" "}
          <div className="flex items-center gap-3 mb-6">
            {" "}
            <span className="font-mono text-[13px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 border border-[var(--grid-line)] px-3 py-1">
              Insight 03
            </span>{" "}
          </div>{" "}
          <h3 className="text-[18px] font-bold mb-4 font-sans text-foreground tracking-tight">
            The Trust Deficit
          </h3>{" "}
          <div className="space-y-4 text-neutral-500 dark:text-neutral-400 text-[16px]  text-neutral-500 dark:text-neutral-400 font-sans leading-relaxed">
            {" "}
            <p>
              <strong className="text-foreground font-medium">
                What we found:
              </strong>{" "}
              The existing app showed a &apos;Current Balance&apos; but zero
              history of how it was consumed.
            </p>{" "}
            <p>
              <strong className="text-foreground font-medium">
                Why it mattered:
              </strong>{" "}
              Without a visible ledger (Passbook), every automated deduction
              felt like theft. Without transparency and auditability, there is
              no financial trust.
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
