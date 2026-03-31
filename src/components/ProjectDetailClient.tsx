"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Maximize2 } from "lucide-react";

import { calculateReadingTime } from "@/src/lib/utils";

import FasalIntroInfographic from "@/src/components/FasalIntroInfographic";
import FasalResearchGoalsInfographic from "@/src/components/FasalResearchGoalsInfographic";
import FasalInsightsInfographic from "@/src/components/FasalInsightsInfographic";
import FasalFarmersInfographic from "@/src/components/FasalFarmersInfographic";
import FasalScriptInfographic from "@/src/components/FasalScriptInfographic";
import FasalScriptGallery from "@/src/components/FasalScriptGallery";
import FasalFarmerObservations from "@/src/components/FasalFarmerObservations";
import FasalGridGallery from "@/src/components/FasalGridGallery";
import FasalCardSorting from "@/src/components/FasalCardSorting";
import FasalThemesAccordion from "@/src/components/FasalThemesAccordion";

import FasalSupportProcessInfographic from "@/src/components/FasalSupportProcessInfographic";
import FasalSupportImpactInfographic from "@/src/components/FasalSupportImpactInfographic";
import FasalSupportHeroInfographic from "@/src/components/FasalSupportHeroInfographic";
import FasalFeedbackInfographic from "@/src/components/FasalFeedbackInfographic";
import FasalFieldMetrics from "@/src/components/FasalFieldMetrics";

import FasalIotFeedbackInfographic from "@/src/components/FasalIotFeedbackInfographic";
import FasalIotFieldMetrics from "@/src/components/FasalIotFieldMetrics";
import FasalIotProcessInfographic from "@/src/components/FasalIotProcessInfographic";
import FasalIotPreferenceChart from "@/src/components/FasalIotPreferenceChart";
import FasalIotImpactInfographic from "@/src/components/FasalIotImpactInfographic";

import ImageViewer from "@/src/components/ImageViewer";
import FasalDesignOptions from "@/src/components/FasalDesignOptions";
import FasalGoalsGrid from "@/src/components/FasalGoalsGrid";
import FasalConclusionGrid from "@/src/components/FasalConclusionGrid";
import FasalRequirementsGrid from "@/src/components/FasalRequirementsGrid";
import RevealOnScroll from "@/src/components/RevealOnScroll";
import BackButton from "@/src/components/BackButton";
import CtaButton from "@/src/components/CtaButton";

import FasalBillingHero from "@/src/components/FasalBillingHero";
import FasalBillingDataFindings from "@/src/components/FasalBillingDataFindings";
import FasalBillingResearchTable from "@/src/components/FasalBillingResearchTable";
import FasalBillingInsights from "@/src/components/FasalBillingInsights";
import FasalBillingStrategyInfographic from "@/src/components/FasalBillingStrategyInfographic";
import FasalBillingProcessInfographic from "@/src/components/FasalBillingProcessInfographic";
import FasalBillingGoalsGrid from "@/src/components/FasalBillingGoalsGrid";
import FasalBillingImpactGrid from "@/src/components/FasalBillingImpactGrid";
import FasalBillingLogicFlowchart from "@/src/components/FasalBillingLogicFlowchart";
import FasalBillingHypothesisReality from "@/src/components/FasalBillingHypothesisReality";
import FasalBillingSessionGallery from "@/src/components/FasalBillingSessionGallery";
import FasalBillingResilienceGallery from "@/src/components/FasalBillingResilienceGallery";
import FasalBillingLessons from "@/src/components/FasalBillingLessons";
import FasalFieldDiscoveryGallery from "@/src/components/FasalFieldDiscoveryGallery";
import BazaarNxtProcessInfographic from "@/src/components/BazaarNxtProcessInfographic";
import BazaarNxtProblemsGrid from "@/src/components/BazaarNxtProblemsGrid";
import Flow360DeploymentInfographic from "@/src/components/Flow360DeploymentInfographic";
import UnderConstructionWall from "@/src/components/UnderConstructionWall";

type KeyAction = { label: string; value: string };

type DesignOption = { title: string; src: string; items: string[] };

type ColourSwatch = { id?: string; hex: string };

type ProjectSection = {
  type: "text" | "image" | "list" | "quote" | "design-options" | "figma-link" | "colour-palette" | "typography";
  title?: string;
  content?: string | string[];
  src?: string;
  caption?: string;
  href?: string;
  items?: string[];
  options?: DesignOption[];
  grayscale?: boolean;
  showGrid?: boolean;
  lightBg?: boolean;
  maxHeight?: string;
  colours?: { brand: ColourSwatch[]; neutral: ColourSwatch[] };
  font?: string;
  designer?: string;
  description?: string;
  weights?: string[];
  specimen?: string;
};

type Project = {
  id: string;
  title: string;
  headline: string;
  metric: string;
  problem: string;
  tags: string[];
  system_diagram: string;
  engineering_artifact: string;
  caption: string;
  designation?: string;
  focus_areas?: string[];
  tools?: string[];
  about_app?: string;
  about?: {
    description: string;
    key_actions?: KeyAction[];
  };
  problem_statement?: string;
  hide_metric?: boolean;
  sections?: ProjectSection[];
  isPlaceholder?: boolean;
};

type ProjectDetailClientProps = {
  project: Project;
};

/** Section labels in problem_statement: bold foreground, no marker (other **…** keeps marker). */
const PROBLEM_STATEMENT_STRUCTURAL_LABELS = new Set([
  "Problem Statement:",
  "How Might We Statement:",
  "The Challenge:",
  "The Fix:",
  "The Problem:",
  "The Solution:",
  '"Last Updated"',
]);

function isProblemStatementStructuralLabel(inner: string): boolean {
  return PROBLEM_STATEMENT_STRUCTURAL_LABELS.has(inner.trim());
}

function renderProblemStatementRichText(text: string) {
  return text.split(/(\*\*.*?\*\*)/).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2);
      if (isProblemStatementStructuralLabel(inner)) {
        return (
          <strong key={i} className="font-sans font-bold text-[var(--foreground)]">
            {inner}
          </strong>
        );
      }
      return (
        <strong
          key={i}
          className="font-sans font-bold text-[var(--foreground)]"
        >
          {inner}
        </strong>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

/** Right column: **…** is bold + foreground only (no yellow marker). */
function renderInlineRichText(text: string) {
  return text.split(/(\*\*.*?\*\*|\^\^.*?\^\^)/).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-sans font-bold text-[var(--foreground)]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("^^") && part.endsWith("^^")) {
      return (
        <span key={i} className="font-serif italic">
          {part.slice(2, -2)}
        </span>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [viewerImage, setViewerImage] = useState<{ src: string; alt: string } | null>(
    null,
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const readingTime = useMemo(() => calculateReadingTime(project), [project]);

  // Scroll Progress Logic moved to ProgressBar component below for performance

  const sections = useMemo(() => {
    return (project.sections ?? []).filter((s) => s.title !== "My Role");
  }, [project.sections]);

  const isPlaceholder = project.isPlaceholder;

  const shouldShowTopArtifact =
    (project.id === "iot-b2b-saas" ||
      (project.engineering_artifact && project.id !== "ethnographic-study")) &&
    project.id !== "fasal-iot-ops" &&
    project.id !== "fasal-billing-subscription" &&
    project.id !== "bazaarnxt-b2b" &&
    project.id !== "flow360-internal-tools";

  return (
    <main className="relative min-h-screen bg-background text-foreground font-sans transition-colors duration-0 border-x border-[var(--grid-line)] max-w-[1600px] mx-auto">
      <header className="sticky lg:absolute top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-[var(--grid-line)] h-16 flex items-center w-full">
        <div className="w-full grid grid-cols-4 lg:grid-cols-12 items-center h-full relative">
          <div className="col-span-2 lg:col-span-4 flex items-center h-full px-6 md:px-12">
            <BackButton />
          </div>
          {/* Desktop only — hidden on mobile to avoid overlapping the fixed ThemeSwitch */}
          <div className="hidden lg:flex col-span-8 items-center justify-end h-full px-12">
            <span className="font-mono text-[13px] uppercase tracking-[0.2em] text-neutral-400">
              {readingTime} MIN READ
            </span>
          </div>
          {/* Mobile only — dead-center in the header bar, clear of back button and theme toggle */}
          <div className="lg:hidden absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400">
              {readingTime} MIN READ
            </span>
          </div>
        </div>
        <ProgressBar scrollContainerRef={scrollContainerRef} />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen lg:h-screen lg:overflow-hidden">
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[var(--grid-line)] px-6 pb-12 pt-6 md:px-12 md:pt-12 lg:pt-32 h-fit lg:h-full lg:overflow-y-auto no-scrollbar">
          <RevealOnScroll className="mb-16 lg:mb-20" delay={150}>
            <p className="text-base md:text-[16px] text-neutral-500 dark:text-neutral-400 mb-6">
              {project.headline}
            </p>
            <h1 className="text-3xl md:text-5xl font-black uppercase leading-[0.9] mb-6 tracking-tighter">
              {project.title}
            </h1>

            {project.system_diagram && (
              <p className="font-serif italic text-base md:text-lg font-light leading-snug text-neutral-500 dark:text-neutral-400 mb-10">
                {project.system_diagram}
              </p>
            )}

            <div className="space-y-12 lg:space-y-16 mb-8">
              {project.problem_statement && (
                <div>
                  <h3 className="font-mono text-[13px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-4 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    Problem &amp; Solution
                  </h3>
                  <div className="text-base md:text-[16px] text-neutral-500 dark:text-neutral-400 whitespace-pre-wrap">
                    {renderProblemStatementRichText(project.problem_statement)}
                  </div>
                </div>
              )}

              {(project.about?.description || project.problem) && (
                <div>
                  <h3 className="font-mono text-[13px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-4 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                    Impact
                  </h3>
                  {project.about ? (
                    <div className="space-y-4">
                      <p className="text-base md:text-[16px] text-neutral-500 dark:text-neutral-400 whitespace-pre-wrap">
                        {project.about.description
                          .split(/(\*\*.*?\*\*)/)
                          .map((part, i) =>
                            part.startsWith("**") && part.endsWith("**") ? (
                              <strong
                                key={i}
                                className="font-sans font-bold text-[var(--foreground)]"
                              >
                                {part.slice(2, -2)}
                              </strong>
                            ) : (
                              <React.Fragment key={i}>{part}</React.Fragment>
                            ),
                          )}
                      </p>
                      {project.about.key_actions && (
                        <ul className="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
                          <li className="font-bold text-xs uppercase tracking-wider text-[var(--foreground)] mt-4 mb-2">
                            Key Actions:
                          </li>
                          {project.about.key_actions.map((action, i) => (
                            <li key={i} className="leading-relaxed">
                              <span className="font-bold text-neutral-700 dark:text-neutral-400">
                                {action.label}:
                              </span>{" "}
                              {action.value}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 whitespace-pre-wrap">
                      {project.problem}
                    </p>
                  )}
                </div>
              )}

              {project.focus_areas && (
                <div>
                  <h3 className="font-mono text-[13px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-4 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    Focus Areas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.focus_areas.map((area) => (
                      <span
                        key={area}
                        className="border border-[var(--grid-line)] px-2 py-1 text-xs font-mono uppercase tracking-widest text-neutral-500"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.tools && (
                <div>
                  <h3 className="font-mono text-[13px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-4 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                    Tools Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="border border-[var(--grid-line)] px-2 py-1 text-xs font-mono uppercase tracking-widest text-neutral-500"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {!project.designation && !project.focus_areas && !project.tools && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[13px] font-bold font-mono border border-[var(--grid-line)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors uppercase cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {project.about_app && (
              <div className="mt-16 lg:mt-20">
                <h3 className="font-mono text-[13px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-4 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                  About {project.id === "bazaarnxt-b2b" ? "BazaarNXT" : project.id === "flow360-internal-tools" ? "Flow 360" : "Fasal"} App
                </h3>
                <p className="text-base md:text-[16px] text-neutral-500 dark:text-neutral-400">
                  {project.about_app}
                </p>
              </div>
            )}
          </RevealOnScroll>
        </div>

        <div
          ref={scrollContainerRef}
          className="lg:col-span-8 bg-[var(--grid-line)]/5 xl:bg-transparent lg:h-full lg:overflow-y-auto no-scrollbar"
        >
          <div className="px-6 pb-6 pt-6 md:px-12 md:pb-12 md:pt-12 lg:pt-32">
            {isPlaceholder ? (
              <RevealOnScroll>
                <UnderConstructionWall />
              </RevealOnScroll>
            ) : (
              <>
                <RevealOnScroll>
                  {shouldShowTopArtifact && (
                    <>
                      <h4 className="text-xl font-bold uppercase tracking-tight flex items-center gap-3 mb-6">
                        <span className="text-neutral-500 dark:text-neutral-400/50 font-mono text-sm">
                          01
                        </span>
                        {project.caption || "App Architecture"}
                      </h4>

                      <div className="relative overflow-hidden group mb-12">
                        {project.id === "iot-b2b-saas" ? (
                          <svg
                            viewBox="0 0 1000 320"
                            className="w-full h-auto text-[var(--foreground)]"
                          >
                            {/* ROW 1: L -> R */}
                            <circle cx="20" cy="62" r="4" fill="#7ed321" />
                            <rect x="40" y="40" width="240" height="44" fill="none" stroke="currentColor" strokeWidth="1" />
                            <text x="160" y="67" textAnchor="middle" fontSize="13" fontWeight="400" fill="currentColor" className="font-mono uppercase tracking-wider">Introduction</text>
                            <line x1="280" y1="62" x2="310" y2="62" stroke="currentColor" strokeWidth="1" />
                            <polyline points="306,60.5 310,62 306,63.5" fill="none" stroke="currentColor" strokeWidth="1" />

                            <rect x="320" y="40" width="240" height="44" fill="none" stroke="currentColor" strokeWidth="1" />
                            <text x="440" y="67" textAnchor="middle" fontSize="13" fontWeight="400" fill="currentColor" className="font-mono uppercase tracking-wider">Research goals</text>
                            <line x1="560" y1="62" x2="590" y2="62" stroke="currentColor" strokeWidth="1" />
                            <polyline points="586,60.5 590,62 586,63.5" fill="none" stroke="currentColor" strokeWidth="1" />

                            <rect x="600" y="40" width="240" height="44" fill="none" stroke="currentColor" strokeWidth="1" />
                            <text x="720" y="67" textAnchor="middle" fontSize="13" fontWeight="400" fill="currentColor" className="font-mono uppercase tracking-wider">Insights to gather</text>

                            {/* CONNECT ROW 1 TO ROW 2 */}
                            <polyline points="840,62 880,62 880,162 840,162" fill="none" stroke="currentColor" strokeWidth="1" />
                            <polyline points="844,160.5 840,162 844,163.5" fill="none" stroke="currentColor" strokeWidth="1" />

                            {/* ROW 2: R <- L */}
                            <rect x="600" y="140" width="240" height="44" fill="none" stroke="currentColor" strokeWidth="1" />
                            <text x="720" y="167" textAnchor="middle" fontSize="13" fontWeight="400" fill="currentColor" className="font-mono uppercase tracking-wider">Script writing</text>
                            <line x1="600" y1="162" x2="570" y2="162" stroke="currentColor" strokeWidth="1" />
                            <polyline points="574,160.5 570,162 574,163.5" fill="none" stroke="currentColor" strokeWidth="1" />

                            <rect x="320" y="140" width="240" height="44" fill="none" stroke="currentColor" strokeWidth="1" />
                            <text x="440" y="167" textAnchor="middle" fontSize="13" fontWeight="400" fill="currentColor" className="font-mono uppercase tracking-wider">Sample set</text>
                            <line x1="320" y1="162" x2="290" y2="162" stroke="currentColor" strokeWidth="1" />
                            <polyline points="294,160.5 290,162 294,163.5" fill="none" stroke="currentColor" strokeWidth="1" />

                            <rect x="40" y="140" width="240" height="44" fill="none" stroke="currentColor" strokeWidth="1" />
                            <text x="160" y="167" textAnchor="middle" fontSize="13" fontWeight="400" fill="currentColor" className="font-mono uppercase tracking-wider">User Interviews</text>

                            {/* CONNECT ROW 2 TO ROW 3 */}
                            <polyline points="40,162 10,162 10,262 40,262" fill="none" stroke="currentColor" strokeWidth="1" />
                            <polyline points="36,260.5 40,262 36,263.5" fill="none" stroke="currentColor" strokeWidth="1" />

                            {/* ROW 3: L -> R */}
                            <rect x="40" y="240" width="240" height="44" fill="none" stroke="currentColor" strokeWidth="1" />
                            <text x="160" y="267" textAnchor="middle" fontSize="13" fontWeight="400" fill="currentColor" className="font-mono uppercase tracking-wider">Card Sorting</text>
                            <line x1="280" y1="262" x2="310" y2="262" stroke="currentColor" strokeWidth="1" />
                            <polyline points="306,260.5 310,262 306,263.5" fill="none" stroke="currentColor" strokeWidth="1" />

                            <rect x="320" y="240" width="240" height="44" fill="none" stroke="currentColor" strokeWidth="1" />
                            <text x="440" y="267" textAnchor="middle" fontSize="13" fontWeight="400" fill="currentColor" className="font-mono uppercase tracking-wider">Theme Identification</text>
                            <line x1="560" y1="262" x2="590" y2="262" stroke="currentColor" strokeWidth="1" />
                            <polyline points="586,260.5 590,262 586,263.5" fill="none" stroke="currentColor" strokeWidth="1" />

                            <rect x="600" y="240" width="240" height="44" fill="none" stroke="currentColor" strokeWidth="1" />
                            <text x="720" y="267" textAnchor="middle" fontSize="13" fontWeight="400" fill="currentColor" className="font-mono uppercase tracking-wider">Task prioritization</text>
                            <circle cx="860" cy="262" r="4" fill="#ff2d20" />
                          </svg>
                        ) : (
                          <div
                            className="w-full overflow-hidden cursor-zoom-in group/artifact relative"
                            onClick={() =>
                              setViewerImage({
                                src: project.engineering_artifact!,
                                alt: project.caption || "Project artifact",
                              })
                            }
                          >
                            <img
                              src={project.engineering_artifact}
                              alt={project.caption || "Project artifact"}
                              className="w-full h-auto object-cover transition-all duration-500 group-hover/artifact:scale-[1.02]"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover/artifact:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover/artifact:opacity-100">
                              <div className="bg-white/80 dark:bg-black/80 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono border border-[var(--grid-line)]">
                                <Maximize2 className="w-3 h-3" /> CLICK TO VIEW
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RevealOnScroll>

                <div className={shouldShowTopArtifact ? "mt-20 lg:mt-32" : ""}>
                  {(() => {
                    let visibleSectionCount = shouldShowTopArtifact ? 2 : 1;

                    const filteredSections = sections.filter(
                      (section) =>
                        !(
                          project.id === "fasal-billing-subscription" &&
                          section.title?.startsWith("Insight ")
                        ),
                    );

                    return filteredSections.map((section, index) => {
                      const isSubSection =
                        !section.title ||
                        section.title === "Goals of user testing" ||
                        section.title === "Heat maps" ||
                        section.title === "Design Options" ||
                        section.title === "Key Requirements:" ||
                        section.title === "Constraints" ||
                        section.title === "Designing Financial Trust for the Indian Farmer." ||
                        (project.id === "fasal-billing-subscription" &&
                          (section.title === "Data Findings (The Quantitative Signal)" ||
                            section.title === "Technical & Business Constraints" ||
                            section.title?.startsWith("Insight ") ||
                            section.title === "The Logic Layer: Designing for Edge Cases" ||
                            section.title === "Hypothesis vs. Reality" ||
                            section.title === "What This Project Taught Me"));

                      const showTitle = section.title && !isSubSection;
                      const currentDisplayNumber = showTitle
                        ? visibleSectionCount++
                        : null;

                      const sectionWrapperClass =
                        section.title === "Designing Financial Trust for the Indian Farmer."
                          ? "mb-16 lg:mb-20"
                          : isSubSection
                            ? "mt-8 lg:mt-10"
                            : index === 0
                              ? ""
                              : "mt-20 lg:mt-32";

                      return (
                        <RevealOnScroll
                          key={`${section.title ?? "untitled"}-${index}`}
                          className={`${sectionWrapperClass} space-y-6 lg:space-y-8`}
                        >
                          {showTitle && currentDisplayNumber !== null && (
                            <h4 className="text-xl font-bold uppercase tracking-tight flex items-center gap-3">
                              <span className="text-neutral-500 dark:text-neutral-400/50 font-mono text-sm">
                                {currentDisplayNumber.toString().padStart(2, "0")}
                              </span>
                              {section.title}
                            </h4>
                          )}

                          {project.id === "bazaarnxt-b2b" &&
                            section.title === "About BazaarNXT" && (
                              <div className="mb-8">
                                {/* Mobile: horizontal scrollable strip */}
                                <div className="md:hidden h-[400px]">
                                  <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar h-full">
                                    <div className="flex-none w-[78vw] h-full overflow-hidden relative snap-start">
                                      <img
                                        src="/assets/bazaarnxt-field-photo-1.png"
                                        alt="BazaarNXT merchant showing the app"
                                        className="w-full h-full object-cover object-top transition-all duration-500"
                                      />
                                    </div>
                                    <div className="flex-none w-[78vw] h-full overflow-hidden relative snap-start">
                                      <img
                                        src="/assets/bazaarnxt-field-photo-2.png"
                                        alt="BazaarNXT buyer using the app in store"
                                        className="w-full h-full object-cover object-top transition-all duration-500"
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* md+: original 2-column grid */}
                                <div className="hidden md:grid grid-cols-[2fr_3fr] gap-4 items-start">
                                  <div className="overflow-hidden relative h-[400px]">
                                    <img
                                      src="/assets/bazaarnxt-field-photo-1.png"
                                      alt="BazaarNXT merchant showing the app"
                                      className="w-full h-full object-cover object-top transition-all duration-500"
                                    />
                                  </div>
                                  <div className="overflow-hidden relative h-[400px]">
                                    <img
                                      src="/assets/bazaarnxt-field-photo-2.png"
                                      alt="BazaarNXT buyer using the app in store"
                                      className="w-full h-full object-cover object-top transition-all duration-500"
                                    />
                                  </div>
                                </div>
                              </div>
                            )}

                          {section.type === "text" &&
                            section.content &&
                            !(
                              project.id === "iot-b2b-saas" &&
                              section.title === "Script Writing & Ice Breaking"
                            ) && (
                              <div className="max-w-none">
                                {Array.isArray(section.content) ? (
                                  <div className="space-y-6">
                                    {section.content.map((paragraph, i) => (
                                      <p
                                        key={i}
                                        className="text-[16px] text-neutral-500 dark:text-neutral-400"
                                      >
                                        {renderInlineRichText(paragraph)}
                                      </p>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
                                    {renderInlineRichText(section.content)}
                                  </p>
                                )}

                                {project.id === "iot-b2b-saas" &&
                                  section.title === "Task prioritization : Rice framework" && (
                                    <div className="mt-8">
                                      <Link
                                        href="/assets/Finalised%20Solutions%20-%20Task%20Priortisation%20_%20Rice%20Framework.pdf"
                                        target="_blank"
                                        className="font-mono text-sm uppercase tracking-widest text-[var(--foreground)] hover:underline decoration-2 underline-offset-4 transition-colors"
                                      >
                                        VIEW PDF →
                                      </Link>
                                    </div>
                                  )}
                              </div>
                            )}

                          {project.id === "iot-b2b-saas" &&
                            section.title === "Introduction" && (
                              <FasalIntroInfographic />
                            )}

                          {project.id === "iot-b2b-saas" &&
                            typeof section.content === "string" &&
                            section.content.startsWith("P.S. It started raining") && (
                              <FasalGridGallery />
                            )}

                          {project.id === "iot-b2b-saas" &&
                            section.title === "Card sorting : Common Observation" && (
                              <FasalCardSorting />
                            )}

                          {project.id === "iot-b2b-saas" &&
                            (section.title === "Product Research Goals : Fasal IOT" ||
                              section.title === "Research Goals") && (
                              <FasalResearchGoalsInfographic />
                            )}

                          {project.id === "iot-b2b-saas" &&
                            section.title === "Insights to gather during the visit" && (
                              <FasalInsightsInfographic />
                            )}

                          {project.id === "iot-b2b-saas" &&
                            section.title === "Selection criterion for farmers" && (
                              <FasalFarmersInfographic />
                            )}

                          {project.id === "iot-b2b-saas" &&
                            section.title === "Selection of Farmers & Script Writing" && (
                              <>
                                <FasalScriptInfographic />
                                <FasalScriptGallery />
                              </>
                            )}

                          {project.id === "iot-b2b-saas" &&
                            section.title === "Observations from farmer interviews" && (
                              <FasalFarmerObservations />
                            )}

                          {project.id === "fasal-iot-ops" &&
                            section.title === "Introduction" && (
                              <FasalSupportHeroInfographic />
                            )}

                          {project.id === "fasal-iot-ops" &&
                            section.title === "Field Discovery" && (
                              <div className="flex flex-col">
                                <FasalFeedbackInfographic />
                                <FasalFieldMetrics />
                              </div>
                            )}

                          {project.id === "ethnographic-study" &&
                            section.title === "Field Discovery" && (
                              <div className="flex flex-col">
                                <FasalFieldDiscoveryGallery />
                                <FasalIotFeedbackInfographic />
                                <FasalIotFieldMetrics />
                              </div>
                            )}

                          {project.id === "fasal-iot-ops" &&
                            section.title === "Design Process" && (
                              <FasalSupportProcessInfographic />
                            )}

                          {project.id === "ethnographic-study" &&
                            section.title === "Design Process" && (
                              <FasalIotProcessInfographic />
                            )}

                          {project.id === "fasal-iot-ops" &&
                            section.title === "Impact" && <FasalSupportImpactInfographic />}

                          {project.id === "ethnographic-study" &&
                            section.title === "Key findings" && <FasalIotPreferenceChart />}

                          {project.id === "ethnographic-study" &&
                            section.title === "Impact" && <FasalIotImpactInfographic />}

                          {project.id === "fasal-billing-subscription" &&
                            section.title === "Designing Financial Trust for the Indian Farmer." && (
                              <FasalBillingHero />
                            )}
                          {project.id === "fasal-billing-subscription" &&
                            section.title === "Data Findings (The Quantitative Signal)" && (
                              <FasalBillingDataFindings />
                            )}
                          {project.id === "fasal-billing-subscription" &&
                            section.title === "Research Methodology" && (
                              <FasalBillingResearchTable />
                            )}
                          {project.id === "fasal-billing-subscription" &&
                            section.title === "Key Insights & Mental Models" && (
                              <div className="mt-8">
                                <FasalBillingInsights />
                              </div>
                            )}
                          {project.id === "fasal-billing-subscription" &&
                            section.title === "Design Process" && (
                              <FasalBillingProcessInfographic />
                            )}
                          {project.id === "bazaarnxt-b2b" &&
                            section.title === "Design Process" && (
                              <BazaarNxtProcessInfographic />
                            )}
                          {project.id === "flow360-internal-tools" &&
                            section.title === "Solution: The 360 Flow" && (
                              <div className="mt-8">
                                <Flow360DeploymentInfographic />
                              </div>
                            )}
                          {project.id === "bazaarnxt-b2b" &&
                            section.title === "Problems in the current landscape" && (
                              <BazaarNxtProblemsGrid items={section.items || []} />
                            )}
                          {project.id === "fasal-billing-subscription" &&
                            section.title === "The Strategy" && (
                              <FasalBillingStrategyInfographic />
                            )}
                          {project.id === "fasal-billing-subscription" &&
                            section.title === "Design Goals" && <FasalBillingGoalsGrid />}

                          {project.id === "fasal-billing-subscription" &&
                            section.title === "The Business Impact" && <FasalBillingImpactGrid />}

                          {project.id === "fasal-billing-subscription" &&
                            section.title === "What This Project Taught Me" && (
                              <FasalBillingLessons />
                            )}

                          {project.id === "fasal-billing-subscription" &&
                            section.title === "The Reality Check: Testing with 12 Farmers" && (
                              <FasalBillingSessionGallery />
                            )}

                          {project.id === "fasal-billing-subscription" &&
                            section.title === "Hypothesis vs. Reality" && (
                              <FasalBillingHypothesisReality />
                            )}

                          {section.type === "list" &&
                            section.title === "Conclusion" && (
                              <div className="space-y-8">
                                <FasalConclusionGrid items={section.items || []} />
                                {section.items?.find((item) =>
                                  item.startsWith("These findings suggest"),
                                ) && (
                                    <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
                                      {section.items.find((item) =>
                                        item.startsWith("These findings suggest"),
                                      )}
                                    </p>
                                  )}
                              </div>
                            )}

                          {section.type === "list" &&
                            section.title === "Goals of user testing" && (
                              <FasalGoalsGrid goals={section.items || []} />
                            )}

                          {section.type === "list" &&
                            (section.title === "Key Requirements:" ||
                              section.title === "Constraints") && (
                              <FasalRequirementsGrid
                                items={section.items || []}
                                label={
                                  section.title === "Constraints" ? "CONSTRAINT" : "GOAL"
                                }
                              />
                            )}

                          {section.type === "list" &&
                            section.title === "Hypothesis vs. Reality" &&
                            project.id !== "fasal-billing-subscription" && (
                              <FasalBillingHypothesisReality />
                            )}

                          {section.type === "list" &&
                            section.title !== "Goals of user testing" &&
                            section.title !== "Key Requirements:" &&
                            section.title !== "Constraints" &&
                            section.title !== "Conclusion" &&
                            section.title !== "Problems in the current landscape" &&
                            section.title !== "Hypothesis vs. Reality" &&
                            !(project.id === "fasal-iot-ops" && section.title === "Impact") &&
                            !(project.id === "ethnographic-study" && section.title === "Impact") &&
                            !(
                              project.id === "fasal-billing-subscription" &&
                              section.title === "Design Goals"
                            ) &&
                            !(
                              project.id === "fasal-billing-subscription" &&
                              section.title === "Technical & Business Constraints"
                            ) &&
                            !(
                              project.id === "fasal-billing-subscription" &&
                              section.title?.startsWith("Insight ")
                            ) &&
                            !(
                              project.id === "fasal-billing-subscription" &&
                              section.title === "The Business Impact"
                            ) &&
                            !(
                              project.id === "fasal-billing-subscription" &&
                              section.title === "What This Project Taught Me"
                            ) && (
                              <>
                                {project.id === "fasal-billing-subscription" &&
                                  section.title ===
                                  "The Logic Layer: Designing for Edge Cases" ? (
                                  <div className="space-y-8">
                                    <div className="inline-flex items-center px-3 py-1 bg-neutral-500/10 border border-neutral-500/20 text-neutral-600 dark:text-neutral-400 text-[13px] font-mono tracking-widest uppercase w-fit">
                                      The Logic Layer: Designing for Edge Cases
                                    </div>
                                    {section.content && (
                                      <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
                                        {section.content as string}
                                      </p>
                                    )}
                                    <ul className="grid gap-4">
                                      {section.items?.map((item, i) => (
                                        <li
                                          key={i}
                                          className="flex gap-4 items-start text-[16px] text-neutral-500 dark:text-neutral-400"
                                        >
                                          <span className="font-mono text-[13px] text-neutral-400 mt-1 shrink-0">
                                            {(i + 1).toString().padStart(2, "0")}
                                          </span>
                                          <div className="flex-1">
                                            {renderInlineRichText(item)}
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                    <FasalBillingLogicFlowchart />
                                  </div>
                                ) : project.id === "iot-b2b-saas" &&
                                  section.title ===
                                  "Identified Themes and Possible Solutions" ? (
                                  <div className="space-y-6">
                                    {section.content && (
                                      <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
                                        {section.content}
                                      </p>
                                    )}
                                    <FasalThemesAccordion />
                                  </div>
                                ) : (
                                  <div className="space-y-6">
                                    {section.content && (
                                      <p className="text-[16px] text-neutral-500 dark:text-neutral-400">
                                        {section.content}
                                      </p>
                                    )}
                                    <ul className="grid gap-4">
                                      {section.items?.map((item, i) => (
                                        <li
                                          key={i}
                                          className="flex gap-4 items-start text-[16px] text-neutral-500 dark:text-neutral-400"
                                        >
                                          <span className="font-mono text-[13px] text-neutral-400 mt-1">
                                            {(i + 1).toString().padStart(2, "0")}
                                          </span>
                                          <div className="flex-1 whitespace-pre-line text-[16px] text-neutral-500 dark:text-neutral-400">
                                            {renderInlineRichText(item)}
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </>
                            )}

                          {project.id === "fasal-billing-subscription" &&
                            section.title === "Resilience: When the Network Breaks" && (
                              <FasalBillingResilienceGallery
                                onImageClick={(src, alt) => setViewerImage({ src, alt })}
                              />
                            )}

                          {section.type === "design-options" && section.options && (
                            <FasalDesignOptions
                              options={section.options}
                              onImageClick={(src, alt) => setViewerImage({ src, alt })}
                              mainTitle={section.title}
                              listLabel={section.title === "Design Options" ? "All about option" : "Key Findings"}
                            />
                          )}

                          {section.type === "image" && section.src && (
                            <div className="space-y-6">
                              {section.content && (
                                <div className="space-y-4">
                                  {Array.isArray(section.content) ? (
                                    section.content.map((paragraph, i) => (
                                      <p key={i} className="text-[16px] text-neutral-500 dark:text-neutral-400 whitespace-pre-line">
                                        {renderInlineRichText(paragraph)}
                                      </p>
                                    ))
                                  ) : (
                                    <p className="text-[16px] text-neutral-500 dark:text-neutral-400 whitespace-pre-line">
                                      {renderInlineRichText(section.content)}
                                    </p>
                                  )}
                                </div>
                              )}

                              <div
                                className={`w-full overflow-hidden relative ${section.lightBg ? "p-6 lg:p-10" : section.showGrid ? "p-8 lg:p-12 bg-neutral-50 dark:bg-neutral-900/50" : "bg-transparent"} ${section.src.endsWith(".mp4") ? "" : "cursor-zoom-in group/img"}`}
                                style={section.lightBg ? { backgroundColor: "var(--background)" } : undefined}
                                onClick={() => {
                                  if (!section.src?.endsWith(".mp4")) {
                                    setViewerImage({
                                      src: section.src!,
                                      alt: section.caption || "Case study artifact",
                                    });
                                  }
                                }}
                              >
                                {section.showGrid && (
                                  <div
                                    className={`absolute inset-0 pointer-events-none ${section.lightBg ? "opacity-20 dark:opacity-30 text-neutral-500 dark:text-neutral-400" : "opacity-10 dark:opacity-20 text-black dark:text-white"}`}
                                    style={{
                                      backgroundImage:
                                        "radial-gradient(currentColor 1.5px, transparent 1.5px)",
                                      backgroundSize: "20px 20px",
                                    }}
                                  />
                                )}

                                {section.src.endsWith(".mp4") ? (
                                  <video
                                    src={section.src}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-auto object-cover relative z-10 shadow-sm"
                                  />
                                ) : (
                                  <img
                                    src={section.src}
                                    alt={section.caption || "Case study artifact"}
                                    className={`w-full h-auto object-cover relative z-10 will-change-transform transition-[transform,filter] duration-500 ${section.grayscale
                                      ? "grayscale group-hover/img:grayscale-0 group-hover/img:scale-[1.01]"
                                      : "group-hover/img:scale-[1.02]"
                                      }`}
                                    style={{
                                      ...(section.maxHeight ? { maxHeight: section.maxHeight } : {}),
                                    }}
                                  />
                                )}

                                {!section.src.endsWith(".mp4") && (
                                  <div className="absolute inset-0 bg-transparent group-hover/img:bg-black/10 transition-opacity duration-200 flex items-center justify-center opacity-0 group-hover/img:opacity-100 z-20">
                                    <div className="bg-white/90 dark:bg-black/90 px-4 py-2 flex items-center gap-2 text-xs font-mono border border-[var(--grid-line)]">
                                      <Maximize2 className="w-3 h-3" /> CLICK TO VIEW
                                    </div>
                                  </div>
                                )}
                              </div>

                              {section.caption && (
                                <p className="text-[13px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest text-right">
                                  {section.caption}
                                </p>
                              )}
                            </div>
                          )}

                          {section.type === "colour-palette" && section.colours && (
                            <div className="w-full border border-[var(--grid-line)]">
                              <div className="flex flex-row">
                                {section.colours.brand.map((swatch, i) => {
                                  const isLight = parseInt(swatch.hex.replace("#", ""), 16) > 0xAAAAAA;
                                  const text = i === 0 ? "text-white" : (isLight ? "text-black" : "text-white");
                                  return (
                                    <div
                                      key={i}
                                      className={`flex flex-col justify-between p-4 h-44 lg:h-52 ${i === 0 ? "flex-[2]" : "flex-1"}`}
                                      style={{ backgroundColor: swatch.hex }}
                                    >
                                      <div className={`flex items-center justify-between mt-auto ${text}`}>
                                        <span className="font-mono text-xs opacity-60">{swatch.id}</span>
                                        <span className="font-mono text-sm">{swatch.hex.toUpperCase()}</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="grid grid-cols-5">
                                {section.colours.neutral.map((swatch, i) => {
                                  const isLight = parseInt(swatch.hex.replace("#", ""), 16) > 0x888888;
                                  const text = isLight ? "text-black" : "text-white";
                                  return (
                                    <div
                                      key={i}
                                      className={`flex flex-col justify-end p-3 h-24`}
                                      style={{ backgroundColor: swatch.hex }}
                                    >
                                      {swatch.id && (
                                        <span className={`font-mono text-[10px] opacity-60 mb-1 ${text}`}>{swatch.id}</span>
                                      )}
                                      <span className={`font-mono text-[11px] opacity-80 ${text}`}>{swatch.hex.toUpperCase()}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {section.type === "typography" && (
                            <div className="w-full border border-[var(--grid-line)]">
                              <div className="p-6 lg:p-8 border-b border-[var(--grid-line)]">
                                <h3 className="text-3xl lg:text-4xl font-bold">Typography</h3>
                              </div>
                              <div className="grid grid-cols-1 lg:grid-cols-3 lg:divide-x divide-[var(--grid-line)]">
                                <div className="p-6 lg:p-8 border-b lg:border-b-0 border-[var(--grid-line)]">
                                  <p className="text-xl font-bold italic mb-6 text-[var(--foreground)]">{section.font}</p>
                                  <p className="text-sm text-neutral-400 dark:text-neutral-500 leading-relaxed font-light tracking-wide">
                                    {section.specimen}
                                  </p>
                                </div>
                                <div className="p-6 lg:p-8 border-b lg:border-b-0 border-[var(--grid-line)]">
                                  <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-4">
                                    Designed by {section.designer}
                                  </p>
                                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                    {section.description}
                                  </p>
                                </div>
                                <div className="p-6 lg:p-8 flex flex-col items-end justify-between gap-6">
                                  <span className="text-[96px] lg:text-[120px] font-bold leading-none text-[var(--foreground)]">
                                    Aa
                                  </span>
                                  <p className="font-mono text-xs text-neutral-500 text-right">
                                    {section.weights?.join(", ")}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {section.type === "figma-link" && (
                            <div className="border border-[var(--grid-line)] p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                              <p className="text-base text-neutral-500 dark:text-neutral-400">
                                {section.content || "Every state documented: from expired devices to mid-cycle upgrades."}
                              </p>
                              <CtaButton
                                as="anchor"
                                href={section.href || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                label="Open in Figma"
                                icon="arrow-right"
                                className="shrink-0"
                              />
                            </div>
                          )}

                          {section.type === "quote" &&
                            !(
                              project.id === "iot-b2b-saas" &&
                              typeof section.content === "string" &&
                              section.content.startsWith("Hi <farmer name>")
                            ) && (
                              <blockquote className="border-l-4 border-[var(--foreground)] pl-6 py-2 my-8">
                                <p className="text-xl italic font-serif text-neutral-700 dark:text-neutral-400">
                                  "{section.content}"
                                </p>
                              </blockquote>
                            )}
                        </RevealOnScroll>
                      );
                    });
                  })()}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <ImageViewer
        src={viewerImage?.src || ""}
        alt={viewerImage?.alt || ""}
        isOpen={!!viewerImage}
        onClose={() => setViewerImage(null)}
      />
    </main>
  );
}

// Direct DOM update — bypasses React render cycle entirely (Emil Kowalski rule).
// CSS var --progress drives scaleX; zero re-renders on scroll.
function ProgressBar({ scrollContainerRef }: { scrollContainerRef: React.RefObject<HTMLDivElement | null> }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;

    const setBar = (value: number) => {
      barRef.current?.style.setProperty("--progress", String(value));
    };

    const updateProgress = (
      scrollTop: number,
      scrollHeight: number,
      clientHeight: number,
    ) => {
      const totalHeight = scrollHeight - clientHeight;
      if (totalHeight <= 0) { setBar(0); return; }
      setBar(Math.min(1, Math.max(0, scrollTop / totalHeight)));
    };

    const handleWindowScroll = () => {
      if (window.innerWidth < 1024) {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          updateProgress(
            window.scrollY || document.documentElement.scrollTop,
            document.documentElement.scrollHeight,
            window.innerHeight,
          );
        });
      }
    };

    const handleContainerScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        updateProgress(target.scrollTop, target.scrollHeight, target.clientHeight);
      });
    };

    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleContainerScroll, { passive: true });
      updateProgress(container.scrollTop, container.scrollHeight, container.clientHeight);
    }

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
      cancelAnimationFrame(rafId);
      if (container) {
        container.removeEventListener("scroll", handleContainerScroll);
      }
    };
  }, [scrollContainerRef]);

  return (
    <div
      ref={barRef}
      className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--foreground)] z-[60] origin-left pointer-events-none"
      style={{ transform: "scaleX(var(--progress, 0))", willChange: "transform" }}
    />
  );
}
