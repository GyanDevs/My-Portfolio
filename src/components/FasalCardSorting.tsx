"use client";
import React from "react";
import { motion } from "framer-motion";
const theme = {
  cardBg: "bg-background dark:bg-blue-900/20",
  border: "border-[var(--grid-line)] dark:border-blue-700/80",
  metaText: "dark:text-blue-500",
};
const OBSERVATIONS = [
  "Users are using our application on regular basis, Average usage time is 10min a day.",
  "Farmers are told that our devices only useful for water management and so the market got biased towards it.",
  "Everybody was keen on understanding pest and disease technical names. They were more inclined towards us showing trade names.",
  "People were more keen on contacting the CS than raising a ticket as it is more person to person.",
  "They had difficulty in understanding crop cycle stage wise segregation of activities as the stage name or ribbon was getting ignored.",
  "Most of the farmers have great knowledge about POM Farming and we have observed compare & confirmation bias.",
  "Their decision of pest and disease sprays from Fasal advisory are being manipulated by Local shop vendors.",
  "Most of them were maintaining dairies for activities done farm and finances as that was more comfortable and easily accessible according to them.",
  "Most of them were not using the menu but just the card that is visible on the home. Some of them use alerts but mostly the home.",
  "Farmers were talking about innovation in farming like Robots, AI scanning for disease and pest.",
  "Dosage suggestion was a common ask among all farmers.",
  "Farmers had difficulty in using our back button, they were trying to use main navigation buttons and as a result app was closing.",
  "Most of the farmers are following BT Gore and very keen to learn about new farming methods and how they can improve further.",
  "Diifficulty in Understanding the technical terms we present on application.",
  "Most of the farmers seemed to not have onboarding properly.",
];
export default function FasalCardSorting() {
  return (
    <section className="w-full">
      {" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {" "}
        {OBSERVATIONS.map((obs, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            viewport={{ once: true }}
            className={`${theme.cardBg} p-6 border ${theme.border} hover:border-[var(--grid-line)] dark:hover:border-[var(--grid-line)] transition-colors duration-500 flex flex-col justify-between min-h-[160px] group`}
          >
            {" "}
            <p className="font-sans font-light text-[16px] leading-relaxed text-neutral-500 dark:text-neutral-400">
              {" "}
              {obs}{" "}
            </p>{" "}
            <div
              className={`mt-4 flex items-center gap-3 text-[13px] font-mono uppercase tracking-widest ${theme.metaText}`}
            >
              {" "}
              <span className="opacity-70">
                #{String(i + 1).padStart(2, "0")}
              </span>{" "}
            </div>{" "}
          </motion.div>
        ))}{" "}
      </div>{" "}
    </section>
  );
}
