"use client"; /** * FasalResearchGoalsInfographic * Mixed Grid Layout for Research Goals (5 key points). * Row 1: Points 1 & 2 * Row 2: Points 3 & 4 * Row 3: Point 5 (Full Width) */
export default function FasalResearchGoalsInfographic() {
  return (
    <div
      className="w-full border border-[var(--grid-line)]"
      style={{ background: "var(--background)" }}
    >
      {" "}
      {/* Header row with Icon */}{" "}
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
            {/* Target/Goal Icon */}{" "}
            <circle
              cx="16"
              cy="16"
              r="10"
              stroke="currentColor"
              strokeWidth="1.5"
            />{" "}
            <circle
              cx="16"
              cy="16"
              r="6"
              stroke="currentColor"
              strokeWidth="1.5"
            />{" "}
            <circle cx="16" cy="16" r="2" fill="currentColor" />{" "}
          </svg>{" "}
        </div>{" "}
        <div>
          {" "}
          <h3 className="font-mono text-[13px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-1">
            {" "}
            Research Objectives{" "}
          </h3>{" "}
          <p className="text-[18px] font-bold tracking-tight text-[var(--foreground)]">
            {" "}
            Key Areas of Inquiry{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
      {/* Grid Content - 2 Columns on MD */}{" "}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {" "}
        {/* 1. Adoption & Routine */}{" "}
        <div className="p-6 md:p-10 border-b border-[var(--grid-line)] md:border-r transition-colors card-hover ">
          {" "}
          <span className="font-mono text-[13px] font-bold text-neutral-400 mb-4 block">
            01
          </span>{" "}
          <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
            {" "}
            To understand the adoption of our application and the factors that
            influence it in farmers everyday routines.{" "}
          </p>{" "}
        </div>{" "}
        {/* 2. Issues Faced */}{" "}
        <div className="p-6 md:p-10 border-b border-[var(--grid-line)] transition-colors card-hover ">
          {" "}
          <span className="font-mono text-[13px] font-bold text-neutral-400 mb-4 block">
            02
          </span>{" "}
          <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
            {" "}
            To understand the issues faced by farmers with our application or
            hardware.{" "}
          </p>{" "}
        </div>{" "}
        {/* 3. Expectations & Pain Points */}{" "}
        <div className="p-6 md:p-10 border-b border-[var(--grid-line)] md:border-b-0 md:border-r">
          {" "}
          <span className="font-mono text-[13px] font-bold text-neutral-400 mb-4 block">
            03
          </span>{" "}
          <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
            {" "}
            To understand farmers expectations and pain points in terms of
            features and services.{" "}
          </p>{" "}
        </div>{" "}
        {/* 4. Intent & Features */}{" "}
        <div className="p-6 md:p-10 border-b border-[var(--grid-line)] md:border-b-0 transition-colors card-hover ">
          {" "}
          <span className="font-mono text-[13px] font-bold text-neutral-400 mb-4 block">
            04
          </span>{" "}
          <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
            {" "}
            To understand farmers&apos; intent for using the application and
            correlate it with existing product features.{" "}
          </p>{" "}
        </div>{" "}
        {/* 5. Depth of Understanding (Full Width) */}{" "}
        <div className="p-6 md:p-10 border-t border-[var(--grid-line)] md:col-span-2 transition-colors card-hover ">
          {" "}
          <div className="flex flex-col md:flex-row gap-4 items-start">
            {" "}
            <span className="font-mono text-[13px] font-bold text-neutral-400 shrink-0 w-8 pt-1">
              05
            </span>{" "}
            <div className="w-full">
              {" "}
              <p className="text-[16px] text-neutral-500 dark:text-neutral-400 mb-6">
                {" "}
                To understand the depth of farmers understanding &amp; awareness
                of product features that they value or have strong intent
                towards.{" "}
              </p>{" "}
              <div className="pl-0 md:pl-0">
                {" "}
                <ul className="space-y-4 border-l-2 border-[var(--grid-line)] pl-6 ml-1">
                  {" "}
                  <li className="text-[16px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {" "}
                    <span className="font-bold text-neutral-500 dark:text-neutral-400 mr-2">
                      a.
                    </span>{" "}
                    Identify pain points impacting user experience.{" "}
                  </li>{" "}
                  <li className="text-[16px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {" "}
                    <span className="font-bold text-neutral-500 dark:text-neutral-400 mr-2">
                      b.
                    </span>{" "}
                    Identify reasons for such pain points, such as farmers&apos;
                    technical competency, the product&apos;s learning curve or
                    intuitiveness.{" "}
                  </li>{" "}
                </ul>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
