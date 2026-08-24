import type { Metadata } from "next";
import BackButton from "@/src/components/BackButton";
import RevealOnScroll from "@/src/components/RevealOnScroll";
import { AboutMeVisitingCard } from "@/src/components/AboutMeVisitingCard";
import { CareerTimeline } from "@/src/components/CareerTimeline";
import { DesignLoveGallery } from "@/src/components/DesignLoveGallery";
import { LoveTracksSection } from "@/src/components/LoveTracksSection";
import ConnectLink from "@/src/components/ConnectLink";
import { careerMilestones } from "@/src/data/careerStory";
import { booksShelfRows } from "@/src/data/booksGridItems";
import { designLoveShots } from "@/src/data/designLoveShots";
import { loveTracks } from "@/src/data/loveTracks";
import { RESUME_PDF_DOWNLOAD_FILENAME } from "@/src/data/resume";

export const metadata: Metadata = {
  title: "Gyan: About me",
  description:
    "The short story behind my path into interaction design, plus a gallery of design work. Download the CV PDF when you need the formal version.",
};

export default function AboutMePage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-neutral-200 selection:text-black border-x border-[var(--grid-line)] max-w-[1600px] mx-auto">
      <header className="sticky top-0 z-[100] isolate bg-background/80 backdrop-blur-md border-b border-[var(--grid-line)] px-4 md:px-8 h-16 flex items-center">
        <BackButton />
      </header>

      <RevealOnScroll className="bg-about-grid px-4 pb-20 sm:px-6 sm:pb-24 md:px-8 md:pb-28 lg:px-12 lg:pb-32">
        <div className="about-grid-cta absolute right-16 top-8 md:right-20 md:top-8">
          <ConnectLink
            href="/resume.pdf"
            label="Download CV"
            external={false}
            download={RESUME_PDF_DOWNLOAD_FILENAME}
          />
        </div>
        <div className="about-grid-content relative pt-14 md:pt-16">
          <AboutMeVisitingCard />
        </div>
      </RevealOnScroll>

      <section className="px-4 pt-0 pb-6 sm:px-6 sm:pb-8 md:px-10 md:pb-10 lg:px-14 lg:pb-14">
        <RevealOnScroll>
          <div className="w-full min-w-0">
            <CareerTimeline milestones={careerMilestones} />
          </div>
        </RevealOnScroll>
      </section>

      <section className="py-6 sm:py-8 md:py-12 lg:py-16">
        <RevealOnScroll>
          <div className="w-full min-w-0 px-4 sm:px-6 md:px-12 lg:px-16">
            <LoveTracksSection
              tracks={loveTracks}
              shelves={booksShelfRows}
              showHeading={false}
            />
          </div>
        </RevealOnScroll>
      </section>

      <section className="pt-0 pb-0 sm:pt-0 sm:pb-0 md:pt-0 md:pb-0 lg:pt-0 lg:pb-0">
        <RevealOnScroll>
          <div className="w-full min-w-0">
            <DesignLoveGallery
              items={designLoveShots}
            />
          </div>
        </RevealOnScroll>
      </section>

      {/* FOOTER (mirrors Home page social block) */}
      <footer className="py-12 px-8 md:px-12 lg:px-24 relative flex flex-col items-start justify-center">
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[repeating-linear-gradient(135deg,rgba(170,170,170,0.18)_0px,rgba(170,170,170,0.18)_2px,transparent_2px,transparent_12px)]" />
        <div className="relative z-10 w-full">
          <div className="mb-8">
            <h3 className="font-mono text-[14px] uppercase tracking-[0.2em] text-neutral-500 mb-4">
              Social
            </h3>
            <ul className="space-y-3 font-mono font-bold uppercase tracking-wide text-[14px]">
              {[
                { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/gyandesign/" },
                { label: "Dribbble ↗", href: "https://dribbble.com/gyaan_design" },
                { label: "Behance ↗", href: "https://www.behance.net/gyadesign" },
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
            <h2 className="font-['Helvetica'] text-[5vw] leading-[0.8] font-black tracking-tighter text-[var(--foreground)] opacity-5 subpixel-antialiased text-right select-none pointer-events-none uppercase">
              MORE<br />
              TO COME
            </h2>
          </div>
        </div>
      </footer>
    </main>
  );
}

