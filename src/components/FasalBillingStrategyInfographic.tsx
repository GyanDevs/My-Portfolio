"use client";
import React from "react";
import {
  Layers,
  Eye,
  ShieldCheck,
  UserCog,
  Smartphone,
} from "lucide-react"; /** * FasalBillingStrategyInfographic * Visualizes the shift from Accountant-style billing to Farmer-centric subscription strategy. */
export default function FasalBillingStrategyInfographic() {
  return (
    <div className="w-full mb-12 flex flex-col gap-12">
      {" "}
      {/* Core Conflict Section */}{" "}
      <div className="w-full">
        {" "}
        <div className="space-y-8">
          {" "}
          <div className="inline-flex items-center px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-[13px] font-mono tracking-widest uppercase w-fit">
            {" "}
            The Core Conflict{" "}
          </div>{" "}
          <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-stretch">
            {" "}
            {/* Legacy Side */}{" "}
            <div className="md:col-span-5 p-8 border border-[var(--grid-line)] bg-background flex flex-col gap-6">
              {" "}
              <div className="flex items-center gap-3 opacity-40">
                {" "}
                <UserCog className="w-5 h-5" />{" "}
                <span className="font-mono text-[13px] uppercase tracking-wider">
                  The Accountant's View
                </span>{" "}
              </div>{" "}
              <div className="space-y-4">
                {" "}
                <h4 className="text-[18px] font-bold">
                  Invoices & Shared Pools
                </h4>{" "}
                <p className="text-[16px] text-neutral-500 dark:text-neutral-400 font-sans font-light leading-relaxed">
                  {" "}
                  Mental model built for{" "}
                  <span className="text-neutral-500 dark:text-neutral-400 font-medium">
                    corporate finance
                  </span>
                  . Money exists in abstract pools; deductions happen
                  globally.{" "}
                </p>{" "}
              </div>{" "}
            </div>{" "}
            {/* Middle VS */}{" "}
            <div className="md:col-span-1 flex items-center justify-center py-8 md:py-0">
              {" "}
              <span className="font-mono text-[18px] font-bold text-neutral-400">
                VS
              </span>{" "}
            </div>{" "}
            {/* Reality Side */}{" "}
            <div className="md:col-span-5 p-8 border border-[var(--grid-line)] bg-background flex flex-col gap-6">
              {" "}
              <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
                {" "}
                <Smartphone className="w-5 h-5" />{" "}
                <span className="font-mono text-[13px] uppercase tracking-wider">
                  The Farmer's Reality
                </span>{" "}
              </div>{" "}
              <div className="space-y-4">
                {" "}
                <h4 className="text-[18px] font-bold">
                  Validity & SIM Cards
                </h4>{" "}
                <p className="text-[16px] text-neutral-500 dark:text-neutral-400 font-sans font-light leading-relaxed">
                  {" "}
                  Mental model built for{" "}
                  <span className="text-neutral-500 dark:text-neutral-400 font-medium">
                    Prepaid SIMs
                  </span>
                  . Each device is an asset with its own "recharge" and life
                  cycle.{" "}
                </p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* Strategic Pivot + Three Pillars — one unit */}{" "}
      <div className="flex flex-col gap-6">
        {" "}
        <div className="space-y-4">
          {" "}
          <div className="inline-flex items-center px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[13px] font-mono tracking-widest uppercase w-fit">
            {" "}
            The Strategic Pivot{" "}
          </div>{" "}
          <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
            {" "}
            To bridge this gap, we tore down the legacy financial architecture
            and rebuilt it around{" "}
            <span className="font-medium text-neutral-500 dark:text-neutral-400">
              three pillars
            </span>{" "}
            that reflect the user's natural language.{" "}
          </p>{" "}
        </div>{" "}
        {/* Three Pillars Grid */}{" "}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-[var(--grid-line)]">
          {" "}
          {/* Pillar 1 */}{" "}
          <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-[var(--grid-line)] bg-background flex flex-col gap-6 card-hover transition-all duration-300 ease-spring group relative">
            {" "}
            <div className="w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shadow-[4px_4px_0px_0px_var(--grid-line)] group-hover:shadow-[6px_6px_0px_0px_var(--foreground)] group-hover:border-[var(--foreground)] transition-all duration-500 shrink-0 group-hover:-translate-y-1 group-hover:-translate-x-1 opacity-80 group-hover:opacity-100">
              {" "}
              <Layers className="w-6 h-6" />{" "}
            </div>{" "}
            <div className="space-y-3">
              {" "}
              <h5 className="font-bold text-[18px] leading-tight">
                Per-Device Billing &amp; Seasonality
              </h5>{" "}
              <p className="text-[16px] text-neutral-500 dark:text-neutral-400 font-sans font-light leading-relaxed">
                {" "}
                Moving from a{" "}
                <span className="font-medium text-neutral-500 dark:text-neutral-400">
                  Shared Wallet
                </span>{" "}
                to{" "}
                <span className="font-medium text-neutral-500 dark:text-neutral-400">
                  Asset-Level Billing
                </span>{" "}
                allowed farmers to pause specific devices during
                off-seasons.{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
          {/* Pillar 2 */}{" "}
          <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-[var(--grid-line)] bg-background flex flex-col gap-6 card-hover transition-all duration-300 ease-spring group relative">
            {" "}
            <div className="w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shadow-[4px_4px_0px_0px_var(--grid-line)] group-hover:shadow-[6px_6px_0px_0px_var(--foreground)] group-hover:border-[var(--foreground)] transition-all duration-500 shrink-0 group-hover:-translate-y-1 group-hover:-translate-x-1 opacity-80 group-hover:opacity-100">
              {" "}
              <Eye className="w-6 h-6" />{" "}
            </div>{" "}
            <div className="space-y-3">
              {" "}
              <h5 className="font-bold text-[18px] leading-tight">
                Radical Transparency
              </h5>{" "}
              <p className="text-[16px] text-neutral-500 dark:text-neutral-400 font-sans font-light leading-relaxed">
                {" "}
                Every rupee deducted has a visible digital paper trail.
                Eliminating &quot;hidden math&quot; turned skepticism into
                confidence.{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
          {/* Pillar 3 */}{" "}
          <div className="p-8 md:p-10 bg-background flex flex-col gap-6 card-hover transition-all duration-300 ease-spring group relative">
            {" "}
            <div className="w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shadow-[4px_4px_0px_0px_var(--grid-line)] group-hover:shadow-[6px_6px_0px_0px_var(--foreground)] group-hover:border-[var(--foreground)] transition-all duration-500 shrink-0 group-hover:-translate-y-1 group-hover:-translate-x-1 opacity-80 group-hover:opacity-100">
              {" "}
              <ShieldCheck className="w-6 h-6" />{" "}
            </div>{" "}
            <div className="space-y-3">
              {" "}
              <h5 className="font-bold text-[18px] leading-tight">
                Forgiveness
              </h5>{" "}
              <p className="text-[16px] text-neutral-500 dark:text-neutral-400 font-sans font-light leading-relaxed">
                {" "}
                The system handles hardware failures gracefully. We stop
                punishing the user for technical constraints beyond their
                control.{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
