import type { Metadata } from "next";
import CtaButton from "@/src/components/CtaButton";
import BackButton from "@/src/components/BackButton";
import RevealOnScroll from "@/src/components/RevealOnScroll";
import ConnectLink from "@/src/components/ConnectLink";
import {
  connect,
  education,
  experience,
  RESUME_PDF_DOWNLOAD_FILENAME,
  skills,
  summary,
  tools,
} from "@/src/data/resume";

export const metadata: Metadata = {
  title: "Gyan // Resume — Lead Product Designer",
  description:
    "Lead Product Designer with 6+ years in enterprise IT, IoT, and B2B supply chain. Specialist in data visualization and design systems for complex, data-heavy products.",
};

function formatPeriod(start: string, end: string, current?: boolean) {
  if (current) {
    return (
      <>
        {start} — <span className="text-emerald-500">PRESENT</span>
      </>
    );
  }
  return `${start} — ${end}`;
}

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-neutral-200 selection:text-black border-x border-[var(--grid-line)] max-w-[1600px] mx-auto">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-[var(--grid-line)] px-4 md:px-8 h-16 flex justify-between items-center">
        <BackButton />
      </header>

      <RevealOnScroll>
        <section className="border-b border-[var(--grid-line)] p-8 md:p-12 lg:p-24 pb-12 pt-12 relative flex flex-col gap-8">
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="font-['Helvetica'] font-bold text-xl md:text-3xl uppercase text-[var(--foreground)]">
              Gyan // Lead Product Designer
            </h1>
            <span className="font-mono text-[14px] text-neutral-500 uppercase tracking-widest">
              BENGALURU, INDIA
            </span>
          </div>
        </section>
      </RevealOnScroll>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        <aside className="lg:col-span-4 border-r border-[var(--grid-line)] p-8 md:p-12 space-y-12">
          <RevealOnScroll delay={0}>
            <div>
              <h3 className="font-mono text-[14px] uppercase tracking-[0.2em] text-neutral-500 mb-6">
                Professional Summary
              </h3>
              <p className="text-[16px] text-neutral-500 dark:text-neutral-200">{summary}</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <div>
              <h3 className="font-mono text-[14px] uppercase tracking-[0.2em] text-neutral-500 mb-6">
                Connect
              </h3>
              <ul className="space-y-4 font-mono font-bold uppercase tracking-wide text-[14px]">
                {connect.map(({ label, href }) => (
                  <li key={href}>
                    <ConnectLink href={href} label={label} />
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={160}>
            <div>
              <h3 className="font-mono text-[14px] uppercase tracking-[0.2em] text-neutral-500 mb-6">
                Skills
              </h3>
              <div className="space-y-6">
                {skills.map(({ category, description }) => (
                  <div key={category}>
                    <h4 className="font-mono font-bold text-[14px] mb-2 uppercase tracking-wide">
                      {category}
                    </h4>
                    <p className="text-[16px] text-neutral-500 dark:text-neutral-200">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={240}>
            <div>
              <h3 className="font-mono text-[14px] uppercase tracking-[0.2em] text-neutral-500 mb-6">
                Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="border border-[var(--grid-line)] px-2 py-1 text-[14px] font-mono uppercase text-neutral-500"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </aside>

        <div className="lg:col-span-8">
          {experience.map((role, index) => (
            <RevealOnScroll key={`${role.company}-${role.title}`} delay={index * 80}>
              <div className="border-b border-[var(--grid-line)] p-8 md:p-12 hover:bg-[var(--grid-line)]/10 transition-colors group">
                <div className="flex flex-col md:flex-row justify-between md:items-baseline mb-4 gap-2">
                  <h3 className="text-[20px] font-bold uppercase tracking-tight">{role.title}</h3>
                  <span className="font-mono text-[14px] text-neutral-500">
                    {formatPeriod(role.period.start, role.period.end, role.period.current)}
                  </span>
                </div>
                <div className="font-mono text-[14px] uppercase tracking-widest text-neutral-500 mb-6">
                  {role.company} // {role.sector}
                </div>
                <ul className="list-disc list-outside ml-4 space-y-4 text-[16px] text-neutral-500 dark:text-neutral-200 mt-6">
                  {role.bullets.map((bullet) => (
                    <li key={bullet.label}>
                      <strong>{bullet.label}:</strong> {bullet.text}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          ))}

          <RevealOnScroll delay={experience.length * 80}>
            <div className="p-8 md:p-12 bg-[var(--grid-line)]/5">
              <h3 className="font-mono text-[14px] uppercase tracking-[0.2em] text-neutral-500 mb-8">
                Education & Certification
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                {education.map((item) => (
                  <div key={item.degree}>
                    <h4 className="font-bold uppercase tracking-wide mb-1">{item.degree}</h4>
                    <p className="font-['Helvetica'] text-[16px] text-neutral-500 dark:text-neutral-200">
                      {item.institution}
                    </p>
                    <p className="font-mono text-[14px] text-neutral-500">{item.period}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div className="border-t border-[var(--grid-line)] px-4 py-6 md:px-8 md:py-8 flex items-center justify-between">
        <span className="font-mono text-[12px] text-neutral-500 uppercase tracking-widest">
          Need a copy?
        </span>
        <CtaButton
          as="anchor"
          href="/resume.pdf"
          download={RESUME_PDF_DOWNLOAD_FILENAME}
          label="Download CV"
        />
      </div>
    </main>
  );
}
