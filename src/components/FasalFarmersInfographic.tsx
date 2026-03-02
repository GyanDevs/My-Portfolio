"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react"; /** * FasalFarmersInfographic * Horizontal Scroll Layout for Farmer Categories. * Features unified container, clean typography, and manual navigation arrows. */
export default function FasalFarmersInfographic() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };
  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      checkScroll();
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (container) container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.clientWidth * 0.8;
      const newScrollLeft =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;
      container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    }
  };
  return (
    <div
      className="w-full border border-[var(--grid-line)] mb-12 flex flex-col"
      style={{ background: "var(--background)" }}
    >
      {" "}
      {/* Header Section with Navigation */}{" "}
      <div className="border-b border-[var(--grid-line)] p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {" "}
        {/* Title & Icon Group */}{" "}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 group relative">
          {" "}
          <div className="w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shrink-0 hidden md:flex text-[var(--foreground)]">
            {" "}
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
              className="text-[var(--foreground)]"
            >
              {" "}
              <path
                d="M4 10C4 10 7 6 16 6C25 6 28 10 28 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />{" "}
              <path
                d="M2 13H30"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />{" "}
              <path
                d="M9 13V20C9 24 12 26 16 26C20 26 23 24 23 20V13"
                stroke="currentColor"
                strokeWidth="1.5"
              />{" "}
              <path
                d="M6 30C6 27 9 26 16 26C23 26 26 27 26 30"
                stroke="currentColor"
                strokeWidth="1.5"
              />{" "}
            </svg>{" "}
          </div>{" "}
          <div>
            {" "}
            <h3 className="font-mono text-[13px] tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-1">
              {" "}
              User Segments{" "}
            </h3>{" "}
            <p className="text-[18px] font-bold tracking-tight text-[var(--foreground)]">
              {" "}
              Farmer Profiles &amp; Tech Literacy{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {/* Navigation Arrows */}{" "}
        <div className="flex gap-4">
          {" "}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`relative p-2.5 md:p-3 border border-[var(--grid-line)] rounded-none overflow-hidden ${!canScrollLeft ? "opacity-30 cursor-not-allowed" : "group hover:text-[var(--background)]"}`}
            aria-label="Scroll left"
          >
            {" "}
            <span className="absolute inset-0 w-full h-full bg-[var(--foreground)] translate-x-[100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />{" "}
            <ArrowLeft className="w-5 h-5 relative z-10" />{" "}
          </button>{" "}
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`relative p-2.5 md:p-3 border border-[var(--grid-line)] rounded-none overflow-hidden ${!canScrollRight ? "opacity-30 cursor-not-allowed" : "group hover:text-[var(--background)]"}`}
            aria-label="Scroll right"
          >
            {" "}
            <span className="absolute inset-0 w-full h-full bg-[var(--foreground)] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />{" "}
            <ArrowRight className="w-5 h-5 relative z-10" />{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
      {/* Scrollable Content Area */}{" "}
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto no-scrollbar scroll-smooth"
      >
        {" "}
        <div className="flex min-w-min">
          {" "}
          {/* Card 1 */}{" "}
          <div className="min-w-[240px] md:min-w-[280px] p-6 md:p-10 flex flex-col justify-between card-hover transition-colors border-r border-[var(--grid-line)]">
            {" "}
            <span className="font-mono text-[13px] font-bold mb-6 block text-neutral-400">
              01
            </span>{" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
              {" "}
              Farmers with low tech literacy.{" "}
            </p>{" "}
          </div>{" "}
          {/* Card 2 */}{" "}
          <div className="min-w-[240px] md:min-w-[280px] p-6 md:p-10 flex flex-col justify-between card-hover transition-colors border-r border-[var(--grid-line)]">
            {" "}
            <span className="font-mono text-[13px] font-bold mb-6 block text-neutral-400">
              02
            </span>{" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
              {" "}
              Farmers with high tech literacy.{" "}
            </p>{" "}
          </div>{" "}
          {/* Card 3 */}{" "}
          <div className="min-w-[240px] md:min-w-[280px] p-6 md:p-10 flex flex-col justify-between card-hover transition-colors border-r border-[var(--grid-line)]">
            {" "}
            <span className="font-mono text-[13px] font-bold mb-6 block text-neutral-400">
              03
            </span>{" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
              {" "}
              Farm managers - those who have large farms and employ other
              farmers.{" "}
            </p>{" "}
          </div>{" "}
          {/* Card 4 */}{" "}
          <div className="min-w-[240px] md:min-w-[280px] p-6 md:p-10 flex flex-col justify-between card-hover transition-colors border-r border-[var(--grid-line)]">
            {" "}
            <span className="font-mono text-[13px] font-bold mb-6 block text-neutral-400">
              04
            </span>{" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
              {" "}
              Regular Fasal app users and occasional users.{" "}
            </p>{" "}
          </div>{" "}
          {/* Card 5 */}{" "}
          <div className="min-w-[240px] md:min-w-[280px] p-6 md:p-10 flex flex-col justify-between card-hover transition-colors">
            {" "}
            <span className="font-mono text-[13px] font-bold mb-6 block text-neutral-400">
              05
            </span>{" "}
            <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
              {" "}
              Farmers categorized by crop type and period of engagement.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
