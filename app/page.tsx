"use client";

import React from "react";
import ProjectCard from "@/src/components/ProjectCard";
import Typewriter from "@/src/components/Typewriter";
import Testimonials from "@/src/components/Testimonials";
import ContactSection from "@/src/components/ContactSection";
import CtaButton from "@/src/components/CtaButton";
import ConnectLink from "@/src/components/ConnectLink";
import projects from "@/src/data/projects.json";
import { useIntro } from "@/src/components/providers";
import { motion, useReducedMotion } from "framer-motion";
import RevealOnScroll from "@/src/components/RevealOnScroll";

// HeroEntry — staggered reveal gated on first-load only.
// Uses wasAlreadyComplete ref (same pattern as Typewriter) to distinguish:
//   First load: children start invisible, spring in after introComplete fires
//   Back-nav:   introComplete already true at mount → render instantly, no motion
function HeroEntry({
  children,
  delay,
  isFirstLoad,
  shouldAnimate,
}: {
  children: React.ReactNode;
  delay: number;
  isFirstLoad: boolean;
  shouldAnimate: boolean;
}) {
  const prefersReduced = useReducedMotion();

  // Back-nav or reduced-motion: show instantly, no wrapper
  if (!isFirstLoad || prefersReduced) {
    return <>{children}</>;
  }

  // First load: start hidden, animate to visible when shouldAnimate fires
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 32,
        mass: 0.8,
        delay: shouldAnimate ? delay : 0,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const { introComplete } = useIntro();

  // Capture introComplete at mount time — true means we're on a back-navigation.
  // Ref is used in the effect below; lazy useState initializers capture the value
  // at mount without reading .current during render (satisfies react-hooks/refs).
  const wasAlreadyComplete = React.useRef(introComplete);
  const [isFirstLoad] = React.useState(() => !introComplete);

  // Only meaningful on first load — fires after loading screen clip-path wipe completes
  const [shouldAnimate, setShouldAnimate] = React.useState(() => introComplete);

  React.useEffect(() => {
    if (introComplete && !wasAlreadyComplete.current) {
      // rAF ensures we paint one frame after the wipe before starting the stagger
      const raf = requestAnimationFrame(() => setShouldAnimate(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [introComplete]);


  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-0 border-x border-[var(--grid-line)] max-w-[1600px] mx-auto">

      {/* 1. MASTHEAD SECTION */}
      <section className="p-8 md:p-12 pt-12 md:pt-20 pb-8 md:pb-12">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
          <div>
            {/* Block 1: Typewriter h1 */}
            <HeroEntry delay={0} isFirstLoad={isFirstLoad} shouldAnimate={shouldAnimate}>
              <h1 className="text-3xl md:text-5xl lg:text-6xl leading-[1.1] font-normal tracking-tighter mb-6 text-neutral-400 min-h-[1.2em]">
                <Typewriter
                  typingSpeed={50}
                  segments={[
                    { text: "Hi, ", delay: 0 },
                    { text: "", deleteLast: true, delay: 1200 },
                    { text: "I am ", delay: 500 },
                    { text: "Gyan", className: "font-serif italic font-medium ml-2 text-foreground" },
                  ]}
                />
              </h1>
            </HeroEntry>

            {/* Block 2: Role badge + metadata */}
            <HeroEntry delay={0.08} isFirstLoad={isFirstLoad} shouldAnimate={shouldAnimate}>
              <div className="flex flex-col md:flex-row gap-4 md:items-center">
                <span className="bg-[var(--foreground)] text-[var(--background)] px-3 py-1 text-sm font-mono font-bold uppercase tracking-widest inline-block w-fit whitespace-nowrap">
                  SENIOR PRODUCT DESIGNER
                </span>
                <div className="font-mono text-sm text-neutral-500 whitespace-nowrap flex items-center gap-2">
                  <span>6+ YEARS EXP // BENGALURU // IxDF CERTIFIED</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
              </div>
            </HeroEntry>
          </div>

          {/* Block 3: Right column — bio + CTA */}
          <HeroEntry delay={0.16} isFirstLoad={isFirstLoad} shouldAnimate={shouldAnimate}>
            <div className="flex flex-col gap-8 max-w-2xl border-l border-[var(--grid-line)] pl-6 lg:ml-32">
              <p className="text-[16px] md:text-xl lg:text-2xl leading-[1.3] font-sans text-neutral-500 font-light tracking-tight [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden">
                I grew up inside <span className="text-foreground italic font-serif">creative work</span>, <span className="text-foreground italic font-serif">design</span> was just the word for it.
              </p>

              <CtaButton
                as="link"
                href="/about-me"
                label="About me"
                icon="arrow-right"
                className="w-fit self-start"
              />
            </div>
          </HeroEntry>
        </div>
      </section>

      {/* 2. TICKER TAPE / DIVIDER */}
      <div className="marquee-container border-t border-b border-[var(--grid-line)] py-4 overflow-hidden bg-[var(--grid-line)]/5">
        <div className="animate-marquee flex whitespace-nowrap">
          {/* Strip 1 */}
          <div className="font-mono text-[12px] md:text-[14px] uppercase tracking-[0.3em] text-neutral-500 flex gap-12 px-6 shrink-0">
            <span>Data Visualization</span>
            <span>+</span>
            <span>Design Systems</span>
            <span>+</span>
            <span>Information Architecture (IA)</span>
            <span>+</span>
            <span>Complex Prototyping</span>
            <span>+</span>
            <span>Stakeholder Management</span>
            <span>+</span>
            <span>A/B Testing &amp; Validation</span>
            <span>+</span>
            <span>Product Thinking</span>
            <span>+</span>
            <span>Technical Feasibility</span>
            <span>+</span>
            <span>Figma (Variables/Auto-layout)</span>
            <span>+</span>
            <span>Miro</span>
            <span>+</span>
            <span>Useberry (Testing)</span>
            <span>+</span>
            <span>JIRA (Agile)</span>
            <span>+</span>
          </div>
          {/* Strip 2 — exact duplicate, screen readers skip */}
          <div className="font-mono text-[12px] md:text-[14px] uppercase tracking-[0.3em] text-neutral-500 flex gap-12 px-6 shrink-0" aria-hidden="true">
            <span>Data Visualization</span>
            <span>+</span>
            <span>Design Systems</span>
            <span>+</span>
            <span>Information Architecture (IA)</span>
            <span>+</span>
            <span>Complex Prototyping</span>
            <span>+</span>
            <span>Stakeholder Management</span>
            <span>+</span>
            <span>A/B Testing &amp; Validation</span>
            <span>+</span>
            <span>Product Thinking</span>
            <span>+</span>
            <span>Technical Feasibility</span>
            <span>+</span>
            <span>Figma (Variables/Auto-layout)</span>
            <span>+</span>
            <span>Miro</span>
            <span>+</span>
            <span>Useberry (Testing)</span>
            <span>+</span>
            <span>JIRA (Agile)</span>
            <span>+</span>
          </div>
        </div>
      </div>

      {/* 3. CASE STUDY GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-[var(--grid-line)] gap-[1px] border-b border-[var(--grid-line)]">
        {/* gap-[1px] with bg-grid-line creates inner borders between cards */}
        {projects.map((project, index) => (
          <RevealOnScroll
            key={project.id}
            delay={index * 80}
            className="bg-background h-full flex flex-col"
          >
            <ProjectCard project={project} />
          </RevealOnScroll>
        ))}
      </section>

      {/* 4. TESTIMONIALS */}
      <RevealOnScroll>
        <Testimonials />
      </RevealOnScroll>

      {/* 5. CONTACT SECTION */}
      <ContactSection />

      {/* 6. FOOTER */}
      <footer className="py-12 px-8 md:px-12 lg:px-24 relative flex flex-col items-start justify-center">
        <div className="mb-8">
          <h3 className="font-mono text-[14px] uppercase tracking-[0.2em] text-neutral-500 mb-4">Social</h3>
          <ul className="space-y-3 font-mono font-bold uppercase tracking-wide text-[14px]">
            {[
              { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/gyandesign/" },
              { label: "Dribbble ↗", href: "https://dribbble.com/gyaan_design" },
              { label: "Behance ↗", href: "https://www.behance.net/gyandesign" },
            ].map(({ label, href }) => (
              <li key={href}>
                <ConnectLink href={href} label={label} />
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full flex items-end justify-between">
          <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-2">
            © 2026 GYAN PRAKASH
          </div>
          <h2 className="text-[5vw] leading-[0.8] font-black text-[var(--foreground)] opacity-5 text-right select-none pointer-events-none uppercase">
            NOT<br />THE END
          </h2>
        </div>
      </footer>
    </main>
  );
}
