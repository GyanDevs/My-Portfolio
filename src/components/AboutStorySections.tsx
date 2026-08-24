"use client";

import ConnectLink from "@/src/components/ConnectLink";
import CtaButton from "@/src/components/CtaButton";
import {
  aboutPageClose,
  designPhilosophy,
} from "@/src/data/careerStory";
import { RESUME_PDF_DOWNLOAD_FILENAME } from "@/src/data/resume";

/** Shared prose: same as testimonials body. */
const BODY = "text-[16px] text-neutral-500 dark:text-neutral-400";
const EYEBROW =
  "font-mono text-[14px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400";
const DISPLAY =
  "font-['Helvetica'] font-black tracking-tighter text-[var(--foreground)]";

export function AboutDesignPhilosophy() {
  return (
    <div className="w-full min-w-0">
      <p className={EYEBROW}>{designPhilosophy.eyebrow}</p>
      <div className="mt-6 grid grid-cols-1 gap-px bg-[var(--grid-line)] md:grid-cols-3 border border-[var(--grid-line)]">
        {designPhilosophy.pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="bg-background px-5 py-6 sm:px-6 sm:py-8"
          >
            <h3 className="font-mono text-[14px] font-bold uppercase tracking-[0.18em] text-[var(--foreground)]">
              {pillar.title}
            </h3>
            <p className={`mt-4 ${BODY}`}>{pillar.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AboutCloseCta() {
  return (
    <div className="w-full min-w-0 border border-[var(--grid-line)] bg-[var(--hover-glow)] px-5 py-10 sm:px-8 sm:py-12 md:px-12 md:py-14">
      <p className={EYEBROW}>{aboutPageClose.closingEyebrow}</p>
      <h2
        className={`mt-4 max-w-[28ch] ${DISPLAY} text-[28px] leading-[1.1] sm:text-[36px] md:text-[42px]`}
      >
        {aboutPageClose.closingTitle}
      </h2>
      <p className={`mt-5 max-w-[52ch] ${BODY}`}>{aboutPageClose.closingBody}</p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
        <CtaButton
          as="anchor"
          href="https://mail.google.com/mail/?view=cm&fs=1&to=mgyan1996@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          label="Email me"
          icon="arrow-right"
        />
        <CtaButton
          as="anchor"
          href="/resume.pdf"
          download={RESUME_PDF_DOWNLOAD_FILENAME}
          label="Download CV"
          icon="download"
        />
        <ConnectLink
          href="https://www.linkedin.com/in/gyandesign/"
          label="LinkedIn ↗"
        />
      </div>
    </div>
  );
}
