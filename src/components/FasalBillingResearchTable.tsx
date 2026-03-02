"use client";
import React from "react";
export default function FasalBillingResearchTable() {
  return (
    <div className="relative w-full overflow-hidden mt-8 lg:mt-12 border-y border-[var(--grid-line)]">
      {" "}
      <div className="w-full overflow-x-auto">
        {" "}
        <div className="min-w-[800px] grid grid-cols-3 bg-[var(--grid-line)] gap-[1px] border-x border-[var(--grid-line)]">
          {" "}
          {/* Header Row */}{" "}
          <div className="bg-background p-6 lg:p-8 flex items-center justify-start">
            {" "}
            <h3 className="font-mono text-[14px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 font-bold">
              Method
            </h3>{" "}
          </div>{" "}
          <div className="bg-background p-6 lg:p-8 flex items-center justify-start">
            {" "}
            <h3 className="font-mono text-[14px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 font-bold">
              Audience
            </h3>{" "}
          </div>{" "}
          <div className="bg-background p-6 lg:p-8 flex items-center justify-start">
            {" "}
            <h3 className="font-mono text-[14px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 font-bold">
              Goal
            </h3>{" "}
          </div>{" "}
          {/* Row 1 */}{" "}
          <div className="bg-background p-6 lg:p-8 flex items-center card-hover transition-all duration-300 ease-spring">
            {" "}
            <span className="font-bold text-foreground text-lg">
              Stakeholder Interviews
            </span>{" "}
          </div>{" "}
          <div className="bg-background p-6 lg:p-8 flex flex-col justify-center text-neutral-500 dark:text-neutral-400 text-[16px] leading-snug font-sans font-light card-hover transition-all duration-300 ease-spring">
            {" "}
            <p>Head of Sales, CS</p> <p>Lead, Accounts Team</p>{" "}
          </div>{" "}
          <div className="bg-background p-6 lg:p-8 flex items-center text-neutral-500 dark:text-neutral-400 text-[16px] leading-snug font-sans font-light card-hover transition-all duration-300 ease-spring">
            {" "}
            <p>
              Understand the operational burden of the current Invoicing model.
            </p>{" "}
          </div>{" "}
          {/* Row 2 */}{" "}
          <div className="bg-background p-6 lg:p-8 flex items-center card-hover transition-all duration-300 ease-spring">
            {" "}
            <span className="font-bold text-foreground text-lg">
              Field Research
            </span>{" "}
          </div>{" "}
          <div className="bg-background p-6 lg:p-8 flex flex-col justify-center text-neutral-500 dark:text-neutral-400 text-[16px] leading-snug font-sans font-light card-hover transition-all duration-300 ease-spring">
            {" "}
            <p>12 Farmers (varying farm sizes)</p>{" "}
          </div>{" "}
          <div className="bg-background p-6 lg:p-8 flex items-center text-neutral-500 dark:text-neutral-400 text-[16px] leading-snug font-sans font-light card-hover transition-all duration-300 ease-spring">
            {" "}
            <p>
              Decode the mental model of Payment and Validity in rural
              businesses.
            </p>{" "}
          </div>{" "}
          {/* Row 3 */}{" "}
          <div className="bg-background p-6 lg:p-8 flex items-center card-hover transition-all duration-300 ease-spring">
            {" "}
            <span className="font-bold text-foreground text-lg">
              Ticket Audits
            </span>{" "}
          </div>{" "}
          <div className="bg-background p-6 lg:p-8 flex flex-col justify-center text-neutral-500 dark:text-neutral-400 text-[16px] leading-snug font-sans font-light card-hover transition-all duration-300 ease-spring">
            {" "}
            <p>50+ Closed Support Tickets</p>{" "}
          </div>{" "}
          <div className="bg-background p-6 lg:p-8 flex items-center text-neutral-500 dark:text-neutral-400 text-[16px] leading-snug font-sans font-light card-hover transition-all duration-300 ease-spring">
            {" "}
            <p>
              Analyze the specific language users used when complaining about
              billing.
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
