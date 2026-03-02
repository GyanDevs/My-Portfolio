import type { Metadata } from "next";
import CtaButton from "@/src/components/CtaButton";
import BackButton from "@/src/components/BackButton";
import RevealOnScroll from "@/src/components/RevealOnScroll";

export const metadata: Metadata = {
    title: "Gyan // Resume — Senior Product Designer",
    description:
        "6 years designing enterprise software for AgriTech IoT and B2B Supply Chain. Specialist in Data Visualization and Design Systems for complex, data-heavy products.",
};

export default function ResumePage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-neutral-200 selection:text-black border-x border-[var(--grid-line)] max-w-[1600px] mx-auto">
            {/* STICKY HEADER / NAV */}
            <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-[var(--grid-line)] px-4 md:px-8 h-16 flex justify-between items-center">
                <BackButton />
            </header>

            {/* PROFILE HEADER */}
            <RevealOnScroll>
                <section className="border-b border-[var(--grid-line)] p-8 md:p-12 lg:p-24 pb-12 pt-12 relative flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h1 className="font-['Helvetica'] font-bold text-xl md:text-3xl uppercase text-[var(--foreground)]">
                            Gyan // Senior Product Designer
                        </h1>
                        <span className="font-mono text-[14px] text-neutral-500 uppercase tracking-widest">
                            BENGALURU, INDIA
                        </span>
                    </div>
                </section>
            </RevealOnScroll>

            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
                {/* SIDEBAR / SKILLS */}
                <aside className="lg:col-span-4 border-r border-[var(--grid-line)] p-8 md:p-12 space-y-12">
                    <RevealOnScroll delay={0}>
                        <div>
                            <h3 className="font-mono text-[14px] uppercase tracking-[0.2em] text-neutral-500 mb-6">Professional Summary</h3>
                            <p className="text-[16px] text-neutral-500 dark:text-neutral-200">
                                6 years designing enterprise software for AgriTech IoT and B2B Supply Chain, where a bad design decision has a real operational cost. Specialist in Data Visualization and Design Systems for complex, data-heavy products. My Automobile Engineering background means I read technical constraints the way most designers read Figma files. Most recently: reduced support tickets at Fasal by 80% through self-serve workflow redesign.
                            </p>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={80}>
                        <div>
                            <h3 className="font-mono text-[14px] uppercase tracking-[0.2em] text-neutral-500 mb-6">Connect</h3>
                            <ul className="space-y-4 font-mono font-bold uppercase tracking-wide text-[14px]">
                                <li><a href="https://www.linkedin.com/in/gyandesign/" target="_blank" rel="noopener noreferrer" className="hover:underline decoration-2 underline-offset-4 transition-colors">LinkedIn ↗</a></li>
                                <li><a href="https://mail.google.com/mail/?view=cm&fs=1&to=mgyan1996@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:underline decoration-2 underline-offset-4 transition-colors">Email ↗</a></li>
                            </ul>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={160}>
                        <div>
                            <h3 className="font-mono text-[14px] uppercase tracking-[0.2em] text-neutral-500 mb-6">Skills</h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-mono font-bold text-[14px] mb-2 uppercase tracking-wide">Expertise</h4>
                                    <p className="text-[16px] text-neutral-500 dark:text-neutral-200">
                                        B2B SaaS Architecture, Data Visualization, Complex System Design, IoT Experience, Information Architecture (IA), Service Design, Usability Testing.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-mono font-bold text-[14px] mb-2 uppercase tracking-wide">Design Leadership</h4>
                                    <p className="text-[16px] text-neutral-500 dark:text-neutral-200">
                                        Design Systems (Scalability), Product Strategy, Agile/Scrum Methodology, Technical Feasibility Assessment, Cross-functional Collaboration, ROI-Driven Design.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={240}>
                        <div>
                            <h3 className="font-mono text-[14px] uppercase tracking-[0.2em] text-neutral-500 mb-6">Tools</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Figma (Variables & Auto-layout)", "JIRA", "Miro", "Useberry", "Notion", "Zeplin"].map((tool) => (
                                    <span key={tool} className="border border-[var(--grid-line)] px-2 py-1 text-[14px] font-mono uppercase text-neutral-500">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </RevealOnScroll>
                </aside>

                {/* MAIN CONTENT / EXPERIENCE */}
                <div className="lg:col-span-8">
                    {/* EXPERIENCE ITEM 1 */}
                    <RevealOnScroll delay={0}>
                        <div className="border-b border-[var(--grid-line)] p-8 md:p-12 hover:bg-[var(--grid-line)]/10 transition-colors group">
                            <div className="flex flex-col md:flex-row justify-between md:items-baseline mb-4 gap-2">
                                <h3 className="text-[20px] font-bold uppercase tracking-tight">
                                    Senior Product Designer
                                </h3>
                                <span className="font-mono text-[14px] text-neutral-500">2023 — <span className="text-emerald-500">PRESENT</span></span>
                            </div>
                            <div className="font-mono text-[14px] uppercase tracking-widest text-neutral-500 mb-6">
                                Fasal.co // IoT, SaaS
                            </div>
                            <ul className="list-disc list-outside ml-4 space-y-4 text-[16px] text-neutral-500 dark:text-neutral-200 mt-6">
                                <li><strong>Product Strategy & Business Growth:</strong> Led end-to-end UX strategy for precision agriculture tools, achieving 15% growth in DAU and 10% increase in premium feature adoption.</li>
                                <li><strong>Data Visualization & IoT:</strong> Redesigned the core Sensor Dashboard to make telemetry data (humidity, soil moisture) readable for non-technical farmers. Reduced decision-making time by 40%.</li>
                                <li><strong>Design Systems & Scalability:</strong> Architected and maintained a scalable design system supporting 3 product verticals. Standardized components across Web and Mobile, reducing design-to-development handoff time by 35% and cutting release time by 2 weeks per cycle.</li>
                                <li><strong>Operational Efficiency:</strong> Optimized design operations by introducing AI-augmented prototyping workflows, cutting iteration cycles by 50%. Mentored 3 junior designers on data-driven design and AI literacy.</li>
                            </ul>
                        </div>
                    </RevealOnScroll>

                    {/* EXPERIENCE ITEM 2 */}
                    <RevealOnScroll delay={80}>
                        <div className="border-b border-[var(--grid-line)] p-8 md:p-12 hover:bg-[var(--grid-line)]/10 transition-colors group">
                            <div className="flex flex-col md:flex-row justify-between md:items-baseline mb-4 gap-2">
                                <h3 className="text-[20px] font-bold uppercase tracking-tight">
                                    Product Designer
                                </h3>
                                <span className="font-mono text-[14px] text-neutral-500">2021 — 2023</span>
                            </div>
                            <div className="font-mono text-[14px] uppercase tracking-widest text-neutral-500 mb-6">
                                BazaarNXT // B2B Supply Chain & Logistics Platform
                            </div>
                            <ul className="list-disc list-outside ml-4 space-y-4 text-[16px] text-neutral-500 dark:text-neutral-200 mt-6">
                                <li><strong>End-to-End Product Execution:</strong> Designed and launched the BazaarNXT mobile app (Android/iOS) and internal merchandising & pricing tools for BDEs. 10,000+ users onboarded within the first 3 months.</li>
                                <li><strong>System Design & Efficiency:</strong> Revamped three core web platforms (ProcureNXT, SellerNXT, PackNXT) under a Unified Design Language, cutting frontend development time by 50%.</li>
                                <li><strong>User Retention Strategy:</strong> Redesigned key customer touchpoints based on behavioral analytics, achieving a 30% increase in retention rate and a 50% decrease in bounce rate across the e-commerce funnel.</li>
                                <li><strong>Strategic Impact:</strong> Designed high-fidelity, investor-facing product visions that helped secure Series A/Bridge funding by demonstrating product-market fit.</li>
                            </ul>
                        </div>
                    </RevealOnScroll>

                    {/* EXPERIENCE ITEM 3 */}
                    <RevealOnScroll delay={160}>
                        <div className="border-b border-[var(--grid-line)] p-8 md:p-12 hover:bg-[var(--grid-line)]/10 transition-colors group">
                            <div className="flex flex-col md:flex-row justify-between md:items-baseline mb-4 gap-2">
                                <h3 className="text-[20px] font-bold uppercase tracking-tight">
                                    Product Specialist
                                </h3>
                                <span className="font-mono text-[14px] text-neutral-500">2020 — 2021</span>
                            </div>
                            <div className="font-mono text-[14px] uppercase tracking-widest text-neutral-500 mb-6">
                                Ucertify // Ed Tech
                            </div>
                            <ul className="list-disc list-outside ml-4 space-y-4 text-[16px] text-neutral-500 dark:text-neutral-200 mt-6">
                                <li><strong>User Research:</strong> Conducted 50+ product demonstrations and client interviews, translating feedback into product recommendations that measurably improved user satisfaction.</li>
                                <li><strong>Cross-functional Collaboration:</strong> Worked with international teams to refine product positioning, directly supporting revenue growth through upselling initiatives.</li>
                            </ul>
                        </div>
                    </RevealOnScroll>

                    {/* EDUCATION */}
                    <RevealOnScroll delay={240}>
                        <div className="p-8 md:p-12 bg-[var(--grid-line)]/5">
                            <h3 className="font-mono text-[14px] uppercase tracking-[0.2em] text-neutral-500 mb-8">Education & Certification</h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold uppercase tracking-wide mb-1">B.Tech (Automobile Engineering)</h4>
                                    <p className="font-['Helvetica'] text-[16px] text-neutral-500 dark:text-neutral-200">Lovely Professional University</p>
                                    <p className="font-mono text-[14px] text-neutral-500">2016–2020</p>
                                </div>
                                <div>
                                    <h4 className="font-bold uppercase tracking-wide mb-1">IxDF Certification</h4>
                                    <p className="font-['Helvetica'] text-[16px] text-neutral-500 dark:text-neutral-200">Human-Computer Interaction</p>
                                    <p className="font-mono text-[14px] text-neutral-500">2020–2021</p>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>

            {/* Bottom CTA so it never sits under the theme toggle */}
            <div className="border-t border-[var(--grid-line)] px-4 py-6 md:px-8 md:py-8 flex items-center justify-between">
                <span className="font-mono text-[12px] text-neutral-500 uppercase tracking-widest">
                    Need a copy?
                </span>
                <CtaButton
                    as="anchor"
                    href="/resume.pdf"
                    download
                    label="Download Resume"
                />
            </div>
        </main>
    );
}
