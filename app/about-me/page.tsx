import type { Metadata } from "next";
import CtaButton from "@/src/components/CtaButton";
import BackButton from "@/src/components/BackButton";
import RevealOnScroll from "@/src/components/RevealOnScroll";
import { CareerTimeline } from "@/src/components/CareerTimeline";
import { DesignLoveGallery } from "@/src/components/DesignLoveGallery";
import { LoveTracksSection } from "@/src/components/LoveTracksSection";
import { ProfilePhotoDecode } from "@/src/components/ProfilePhotoDecode";
import { BooksGrid } from "@/src/components/BooksGrid";
import ConnectLink from "@/src/components/ConnectLink";
import { careerMilestones, careerPageIntro } from "@/src/data/careerStory";
import { booksGridItems } from "@/src/data/booksGridItems";
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
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-[var(--grid-line)] px-4 md:px-8 h-16 flex justify-between items-center">
        <BackButton />
      </header>

      <RevealOnScroll>
        <section className="border-b border-[var(--grid-line)] px-4 py-8 pb-8 sm:px-6 sm:py-10 md:p-12 lg:p-16 md:pb-10">
          <div className="flex w-full flex-col gap-5 sm:gap-6 md:flex-row md:items-start md:gap-12 lg:gap-16">
            <div className="group flex w-full flex-col gap-8 sm:gap-9 md:flex-row md:items-center md:min-w-0 md:flex-1 md:gap-12 lg:gap-16">
              <div className="flex w-full shrink-0 justify-start md:w-auto">
                <ProfilePhotoDecode
                  imageSrc="/assets/cv-profile-headshot.jpg"
                  imageAlt="Portrait"
                />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="font-mono text-[12px] md:text-sm uppercase tracking-[0.2em] text-neutral-500 mb-3 md:mb-4">
                  {careerPageIntro.eyebrow}
                </p>
                <div className="space-y-2">
                  <h1 className="font-['Helvetica'] font-black text-[19px] leading-snug text-[var(--foreground)] tracking-tight sm:text-[20px]">
                    {careerPageIntro.title}
                  </h1>
                  <p className="max-w-[72ch] text-[17px] leading-relaxed font-sans font-light tracking-tight text-neutral-500 dark:text-neutral-400 sm:text-[18px]">
                    {careerPageIntro.leadSegments.map((seg, i) =>
                      seg.highlight ? (
                        <span
                          key={i}
                          className="font-serif italic font-normal text-[var(--foreground)]"
                        >
                          {seg.text}
                        </span>
                      ) : (
                        <span key={i}>{seg.text}</span>
                      ),
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-full shrink-0 justify-start pt-1 md:w-auto md:justify-end md:self-start md:pt-0">
              <CtaButton
                as="anchor"
                href="/resume.pdf"
                download={RESUME_PDF_DOWNLOAD_FILENAME}
                label="Download CV"
                icon="download"
              />
            </div>
          </div>
        </section>
      </RevealOnScroll>

      <section className="px-4 py-6 sm:px-6 sm:py-8 md:p-10 lg:p-14">
        <RevealOnScroll>
          <div className="w-full min-w-0">
            <CareerTimeline milestones={careerMilestones} />
          </div>
        </RevealOnScroll>
      </section>

      <section className="border-t border-[var(--grid-line)] py-6 sm:py-8 md:py-12 lg:py-16">
        <RevealOnScroll>
          <div className="w-full min-w-0">
            <div className="mb-4 px-4 sm:mb-8 sm:px-6 md:px-12 lg:px-16">
              <h2 className="font-mono text-[14px] uppercase tracking-tight text-[var(--foreground)]">
                Books that shaped me & music I like
              </h2>
            </div>
            <BooksGrid items={booksGridItems} />
            <div className="mt-12 sm:mt-16 px-4 sm:px-6 md:px-12 lg:px-16">
              <div className="border-x-0 lg:border-x lg:border-[var(--grid-line)] bg-background">
                <LoveTracksSection tracks={loveTracks} showHeading={false} />
              </div>
            </div>
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
          <h2 className="text-[5vw] leading-[0.8] font-black text-[var(--foreground)] opacity-5 text-right select-none pointer-events-none uppercase">
            MORE<br />
            TO COME
          </h2>
        </div>
      </footer>
    </main>
  );
}

