import React from "react";

const BRICK_ROWS = 4;
const BRICK_COLUMNS = 8;

const bricks = Array.from({ length: BRICK_ROWS * BRICK_COLUMNS });

export default function UnderConstructionWall() {
  return (
    <div className="border border-[var(--grid-line)] bg-background px-6 py-8 md:px-10 md:py-12 lg:px-12 lg:py-14 flex flex-col justify-between min-h-[320px] lg:min-h-[420px]">
      <div className="mb-8 md:mb-10">
        <div className="font-mono text-[11px] md:text-xs uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400 mb-3">
          Case Study 06
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-[1.05] mb-3">
          Under Construction
        </h2>
        <p className="text-[15px] md:text-[16px] text-neutral-500 dark:text-neutral-400 max-w-xl">
          I&apos;m still laying the bricks for this story. Check back soon.
        </p>
      </div>

      <div className="mt-auto">
        <div className="bg-[var(--grid-line)] grid grid-cols-8 gap-[1px] aspect-[8/3]">
          {bricks.map((_, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className="uc-brick bg-[var(--foreground)]/4 dark:bg-[var(--foreground)]/15 border border-[var(--grid-line)]"
              style={
                {
                  "--brick-delay": `${index * 40}ms`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

