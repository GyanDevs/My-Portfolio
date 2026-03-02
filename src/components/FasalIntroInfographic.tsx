"use client"; /** * FasalIntroInfographic * Brutalist-editorial 3-panel infographic for the Fasal case study Introduction. * Design language: 1px grid lines, currentColor, font-mono labels, zero border-radius. * Layout mirrors the contact section grid aesthetic. */
export default function FasalIntroInfographic() {
  return (
    <div
      className="w-full border border-[var(--grid-line)] grid grid-cols-1 md:grid-cols-2"
      style={{ background: "var(--background)" }}
    >
      {" "}
      {/* ── LEFT PANEL: Introduction (spans 2 rows on md+) ── */}{" "}
      <div className="border-b md:border-b-0 md:border-r border-[var(--grid-line)] p-6 md:p-10 flex flex-col gap-6 md:row-span-2 group relative card-hover transition-colors cursor-default">
        {" "}
        <div className="w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shadow-[4px_4px_0px_0px_var(--grid-line)] group-hover:shadow-[6px_6px_0px_0px_var(--foreground)] group-hover:border-[var(--foreground)] transition-all duration-500 shrink-0 group-hover:-translate-y-1 group-hover:-translate-x-1 opacity-80 group-hover:opacity-100">
          {" "}
          <svg
            width="24"
            height="24"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            className=""
          >
            {" "}
            {/* Sun */}{" "}
            <circle
              cx="24"
              cy="18"
              r="7"
              stroke="currentColor"
              strokeWidth="1.5"
            />{" "}
            <line
              x1="24"
              y1="4"
              x2="24"
              y2="8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />{" "}
            <line
              x1="24"
              y1="28"
              x2="24"
              y2="32"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />{" "}
            <line
              x1="10"
              y1="18"
              x2="14"
              y2="18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />{" "}
            <line
              x1="34"
              y1="18"
              x2="38"
              y2="18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />{" "}
            <line
              x1="14"
              y1="8"
              x2="17"
              y2="11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />{" "}
            <line
              x1="31"
              y1="25"
              x2="34"
              y2="28"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />{" "}
            <line
              x1="34"
              y1="8"
              x2="31"
              y2="11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />{" "}
            <line
              x1="17"
              y1="25"
              x2="14"
              y2="28"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />{" "}
            {/* Field rows */}{" "}
            <line
              x1="4"
              y1="38"
              x2="44"
              y2="38"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />{" "}
            <line
              x1="8"
              y1="42"
              x2="40"
              y2="42"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />{" "}
            <line
              x1="12"
              y1="46"
              x2="36"
              y2="46"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />{" "}
          </svg>{" "}
        </div>{" "}
        <div>
          {" "}
          <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400/40 mb-2">
            Introduction
          </p>{" "}
          <h3 className="text-[18px] font-bold tracking-tight leading-snug mb-4">
            {" "}
            Five Days in Anantapur{" "}
          </h3>{" "}
          <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
            {" "}
            Over a span of five days in Anantapur, Andhra Pradesh, we engaged
            with at least two farmers daily to understand our users better &amp;
            identify issues farmers are facing with our app.{" "}
          </p>{" "}
          <p className="text-[16px] text-neutral-500 dark:text-neutral-400 mt-3">
            {" "}
            This initiative was spearheaded by the Product Team, with support
            from the Customer Success and Agri Research Teams.{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
      {/* ── TOP-RIGHT PANEL: Why Anantapur ── */}{" "}
      <div className="border-b border-[var(--grid-line)] p-6 md:p-10 flex flex-col gap-6 group relative card-hover transition-colors cursor-default">
        {" "}
        <div className="w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shadow-[4px_4px_0px_0px_var(--grid-line)] group-hover:shadow-[6px_6px_0px_0px_var(--foreground)] group-hover:border-[var(--foreground)] transition-all duration-500 shrink-0 group-hover:-translate-y-1 group-hover:-translate-x-1 opacity-80 group-hover:opacity-100">
          {" "}
          <svg
            width="24"
            height="24"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            className=""
          >
            {" "}
            <path
              d="M24 4C17.373 4 12 9.373 12 16C12 24 24 44 24 44C24 44 36 24 36 16C36 9.373 30.627 4 24 4Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />{" "}
            <circle
              cx="24"
              cy="16"
              r="4"
              stroke="currentColor"
              strokeWidth="1.5"
            />{" "}
          </svg>{" "}
        </div>{" "}
        <div>
          {" "}
          <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400/40 mb-2">
            Location
          </p>{" "}
          <h3 className="text-[18px] font-bold tracking-tight leading-snug mb-4">
            {" "}
            Why Anantapur?{" "}
          </h3>{" "}
          <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
            {" "}
            Anantapur was chosen for its concentration of large and influential
            farmers, despite the presence of Fasal devices nationwide.{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
      {/* ── BOTTOM-RIGHT PANEL: About Fasal.co ── */}{" "}
      <div className="p-6 md:p-10 flex flex-col gap-6 group relative card-hover transition-colors cursor-default">
        {" "}
        <div className="w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shadow-[4px_4px_0px_0px_var(--grid-line)] group-hover:shadow-[6px_6px_0px_0px_var(--foreground)] group-hover:border-[var(--foreground)] transition-all duration-500 shrink-0 group-hover:-translate-y-1 group-hover:-translate-x-1 opacity-80 group-hover:opacity-100">
          {" "}
          <svg
            width="24"
            height="24"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            className=""
          >
            {" "}
            <rect
              x="8"
              y="12"
              width="32"
              height="32"
              stroke="currentColor"
              strokeWidth="1.5"
            />{" "}
            <rect
              x="4"
              y="20"
              width="8"
              height="24"
              stroke="currentColor"
              strokeWidth="1.5"
            />{" "}
            <rect
              x="36"
              y="20"
              width="8"
              height="24"
              stroke="currentColor"
              strokeWidth="1.5"
            />{" "}
            {/* Windows */}{" "}
            <rect
              x="14"
              y="18"
              width="5"
              height="5"
              stroke="currentColor"
              strokeWidth="1"
            />{" "}
            <rect
              x="23"
              y="18"
              width="5"
              height="5"
              stroke="currentColor"
              strokeWidth="1"
            />{" "}
            <rect
              x="29"
              y="18"
              width="5"
              height="5"
              stroke="currentColor"
              strokeWidth="1"
            />{" "}
            <rect
              x="14"
              y="28"
              width="5"
              height="5"
              stroke="currentColor"
              strokeWidth="1"
            />{" "}
            <rect
              x="23"
              y="28"
              width="5"
              height="5"
              stroke="currentColor"
              strokeWidth="1"
            />{" "}
            <rect
              x="29"
              y="28"
              width="5"
              height="5"
              stroke="currentColor"
              strokeWidth="1"
            />{" "}
            {/* Door */}{" "}
            <rect
              x="20"
              y="36"
              width="8"
              height="8"
              stroke="currentColor"
              strokeWidth="1"
            />{" "}
          </svg>{" "}
        </div>{" "}
        <div>
          {" "}
          <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400/40 mb-2">
            Company
          </p>{" "}
          <h3 className="text-[18px] font-bold tracking-tight leading-snug mb-4">
            {" "}
            Fasal.co{" "}
          </h3>{" "}
          <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
            {" "}
            Fasal is helping farmers improve practices via an IoT device
            connected to an app available on Android &amp; iOS.{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
