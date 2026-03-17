"use client";
import React from "react";
import { motion } from "framer-motion"; /** * FasalIotPreferenceChart * Visualizes the 79% vs 21% preference split between Dials and Bars. */
export default function FasalIotPreferenceChart() {
  return (
    <div className="my-12 p-8 md:p-12 border border-[var(--grid-line)] bg-transparent relative overflow-hidden group">
      {" "}
      {/* Subtle background grid pattern */}{" "}
      <div
        className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-10"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />{" "}
      <h5 className="relative z-10 font-mono text-[13px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-10">
        {" "}
        User Preference Distribution{" "}
      </h5>{" "}
      <div className="relative z-10 space-y-10">
        {" "}
        {/* Metrics Header */}{" "}
        <div className="flex justify-between items-end">
          {" "}
          <div className="space-y-2">
            {" "}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-[20px] font-bold tracking-tight block leading-none text-black dark:text-white"
            >
              {" "}
              79%{" "}
            </motion.span>{" "}
            <span className="font-mono text-[13px] uppercase tracking-widest text-black/70 dark:text-white/70 block">
              {" "}
              PREFER DIALS (45){" "}
            </span>{" "}
          </div>{" "}
          <div className="text-right space-y-2">
            {" "}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-[20px] font-bold tracking-tight block leading-none text-neutral-400 dark:text-neutral-500"
            >
              {" "}
              21%{" "}
            </motion.span>{" "}
            <span className="font-mono text-[13px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block">
              {" "}
              PREFER BARS (12){" "}
            </span>{" "}
          </div>{" "}
        </div>{" "}
        {/* Progress Bar Visualization */}{" "}
        <div className="relative h-3 w-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
          {" "}
          {/* Dials Segment */}{" "}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "79%" }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="absolute left-0 top-0 h-full bg-black z-10"
          />{" "}
          {/* Bars Segment (Implicitly the remaining space) */}{" "}
          <div className="absolute right-0 top-0 h-full w-[21%] bg-neutral-300 dark:bg-neutral-700" />{" "}
          {/* Split line */}{" "}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            whileInView={{ opacity: 1, height: "100%" }}
            transition={{ delay: 1.5 }}
            className="absolute left-[79%] top-0 w-[2px] bg-white dark:bg-black z-20"
          />{" "}
        </div>{" "}
        {/* Insights Grid */}{" "}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {" "}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {" "}
            <h6 className="font-mono text-[13px] font-bold uppercase tracking-widest text-black dark:text-white">
              Dials Rationale
            </h6>{" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
              {" "}
              Farmers cited familiarity with analog machinery (tractors) and
              improved glanceability in bright sunlight as primary factors.{" "}
            </p>{" "}
          </motion.div>{" "}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {" "}
            <h6 className="font-mono text-[13px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              Bars Rationale
            </h6>{" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
              {" "}
              A small segment found vertical bars easier for comparing multiple
              sensor readings side-by-side during deep analysis.{" "}
            </p>{" "}
          </motion.div>{" "}
        </div>{" "}
        <div className="pt-8 border-t border-[var(--grid-line)] flex justify-between items-center">
          {" "}
          <span className="font-mono text-[13px] uppercase tracking-[0.2em] text-neutral-400">
            {" "}
            N=57 (12 In-Person • 45 Remote){" "}
          </span>{" "}
          <span className="font-mono text-[13px] uppercase tracking-[0.2em] text-neutral-400">
            {" "}
            Study: Useberry Analytics{" "}
          </span>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
