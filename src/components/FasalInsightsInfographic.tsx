"use client"; /** * FasalInsightsInfographic * Brutalist grid layout for"Insights to gather during the visit". * Content transcribed from user reference (7 points). */
export default function FasalInsightsInfographic() {
  return (
    <div
      className="w-full border border-[var(--grid-line)] mb-12"
      style={{ background: "var(--background)" }}
    >
      {" "}
      {/* Header / Title Row */}{" "}
      <div className="border-b border-[var(--grid-line)] p-6 md:p-10 flex items-center gap-6">
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
            {/* Lightbulb Icon */}{" "}
            <path
              d="M16 22V26"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />{" "}
            <path
              d="M16 2C11.5817 2 8 5.58172 8 10C8 12.5 9.5 14.5 11.5 15.5C12.5 16 13 17 13 18V21C13 21.5523 13.4477 22 14 22H18C18.5523 22 19 21.5523 19 21V18C19 17 19.5 16 20.5 15.5C22.5 14.5 24 12.5 24 10C24 5.58172 20.4183 2 16 2Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />{" "}
            <path
              d="M12 26H20"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />{" "}
            <path
              d="M14 29H18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />{" "}
            {/* Rays (optional subtle fun) - kept clean for now, just the bulb */}{" "}
          </svg>{" "}
        </div>{" "}
        <div>
          {" "}
          <h3 className="font-mono text-[13px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-1">
            {" "}
            Observational Goals{" "}
          </h3>{" "}
          <p className="text-[18px] font-bold tracking-tight text-[var(--foreground)]">
            {" "}
            Key Insights to Gather{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
      {/* Grid Content */}{" "}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {" "}
        {/* 1. Qualitative Feedback */}{" "}
        <div className="border-b border-[var(--grid-line)] md:border-r p-6 md:p-10">
          {" "}
          <span className="font-mono text-[13px] font-bold text-neutral-400 mb-4 block">
            01
          </span>{" "}
          <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
            {" "}
            Collect qualitative feedback on the issues faced by farmers.{" "}
          </p>{" "}
        </div>{" "}
        {/* 2. Mental Models */}{" "}
        <div className="border-b border-[var(--grid-line)] p-6 md:p-10">
          {" "}
          <span className="font-mono text-[13px] font-bold text-neutral-400 mb-4 block">
            02
          </span>{" "}
          <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
            {" "}
            Understand farmers mental models towards different everyday
            applications.{" "}
          </p>{" "}
        </div>{" "}
        {/* 3. Tech Literacy */}{" "}
        <div className="border-b border-[var(--grid-line)] md:border-r p-6 md:p-10">
          {" "}
          <span className="font-mono text-[13px] font-bold text-neutral-400 mb-4 block">
            03
          </span>{" "}
          <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
            {" "}
            Assess farmers&apos; tech literacy and general literacy about other
            languages and practices in farming.{" "}
          </p>{" "}
        </div>{" "}
        {/* 4. Learning Methods */}{" "}
        <div className="border-b border-[var(--grid-line)] p-6 md:p-10">
          {" "}
          <span className="font-mono text-[13px] font-bold text-neutral-400 mb-4 block">
            04
          </span>{" "}
          <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
            {" "}
            Determine how farmers learn about new things in the market or in
            general.{" "}
          </p>{" "}
        </div>{" "}
        {/* 5. Willingness to Update */}{" "}
        <div className="border-b border-[var(--grid-line)] md:border-r p-6 md:p-10">
          {" "}
          <span className="font-mono text-[13px] font-bold text-neutral-400 mb-4 block">
            05
          </span>{" "}
          <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
            {" "}
            Gauge farmers&apos; willingness to update their farming information
            on our app.{" "}
          </p>{" "}
        </div>{" "}
        {/* 6. Preparation Time */}{" "}
        <div className="border-b border-[var(--grid-line)] p-6 md:p-10">
          {" "}
          <span className="font-mono text-[13px] font-bold text-neutral-400 mb-4 block">
            06
          </span>{" "}
          <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
            {" "}
            Estimate the preparation time needed for action items.{" "}
          </p>{" "}
        </div>{" "}
        {/* 7. Impact on UX (Span 2) */}{" "}
        <div className="col-span-1 md:col-span-2 p-6 md:p-10">
          {" "}
          <span className="font-mono text-[13px] font-bold text-neutral-400 mb-4 block">
            07
          </span>{" "}
          <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
            {" "}
            Evaluate the impact on the product&apos;s UX.{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
