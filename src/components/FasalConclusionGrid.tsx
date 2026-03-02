"use client";
import React from "react";

interface FasalConclusionGridProps {
  items: string[];
}
/** * FasalConclusionGrid * Displays user testing conclusions in a premium grid format. */
export default function FasalConclusionGrid({ items }: FasalConclusionGridProps) {
  // Labels for the conclusions
  const conclusionTitles = [
    "User Preference", "Audio Effectiveness", "Process Efficiency", "Discoverability", "Reporting Flexibility", "Areas for Improvement"
  ];

  // Filter out the summary paragraph if it's passed here (the one that starts with "These findings suggest...")
  const gridItems = items.filter(item => !item.startsWith("These findings suggest"));

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-background overflow-hidden text-[var(--foreground)] border-t border-l border-[var(--grid-line)]">
      {gridItems.map((item, idx) => {
        // Split bold title if present in the data string
        const hasBoldTitle = item.startsWith("**");
        let title = conclusionTitles[idx] || "Key Finding";
        let content = item;

        if (hasBoldTitle) {
          const parts = item.split(":** ");
          if (parts.length > 1) {
            title = parts[0].replace(/\*\*/g, "");
            content = parts[1];
          } else {
            // Just bold title without colon
            const boldMatch = item.match(/^\*\*(.*?)\*\*([\s\S]*)/);
            if (boldMatch) {
              title = boldMatch[1];
              content = boldMatch[2].trim();
            }
          }
        }

        return (
          <div key={idx} className={`p-8 flex flex-col gap-6 group card-hover transition-colors border-r border-b border-[var(--grid-line)] ${title === "Areas for improvement" ? "md:col-span-1 lg:col-span-1" : ""}`} >
            <div className="flex justify-between items-start">
              <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">FINDING</p>
              <span className="font-mono text-[13px] text-neutral-400">{(idx + 1).toString().padStart(2, '0')}</span>
            </div>
            <div>
              <h4 className="text-xl font-bold tracking-tight mb-3 leading-tight text-[var(--foreground)]"> {title} </h4>
              <div className="text-[16px] text-neutral-500 dark:text-neutral-400 whitespace-pre-line">
                {content.split("\n").map((line, i) => {
                  const renderText = (text: string) => {
                    return text.split(/(\*\*.*?\*\*|\^\^.*?\^\^)/).map((part, index) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={index} className="font-sans font-bold text-[var(--foreground)]">{part.slice(2, -2)}</strong>;
                      }
                      if (part.startsWith('^^') && part.endsWith('^^')) {
                        return <span key={index} className="font-serif italic text-[18px]">{part.slice(2, -2)}</span>;
                      }
                      return part;
                    });
                  };

                  if (line.trim().startsWith("- ")) {
                    return (
                      <div key={i} className="flex gap-3 mt-2">
                        <span className="text-neutral-500 dark:text-neutral-400/30 mt-1">•</span>
                        <span className="text-[16px] text-neutral-500 dark:text-neutral-400">{renderText(line.replace("- ", ""))}</span>
                      </div>
                    );
                  }

                  if (line.trim() === "") {
                    return <div key={i} className="h-4" />;
                  }

                  return <p key={i} className="text-[16px] text-neutral-500 dark:text-neutral-400">{renderText(line)}</p>;
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
