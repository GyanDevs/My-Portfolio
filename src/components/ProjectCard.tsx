import React from "react";
import Link from "next/link";

import { calculateReadingTime } from "@/src/lib/utils";

interface Project {
  id: string;
  title: string;
  headline: string;
  metric: string;
  problem: string;
  card_description?: string;
  tags: string[];
  engineering_artifact?: string;
  about?: { description: string };
  sections?: {
    title?: string;
    type?: string;
    content?: string | string[];
    items?: string[];
  }[];
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const readingTime = calculateReadingTime(project);

  return (
    <Link
      href={`/projects/${project.id}`}
      className="col-span-1 block h-full group relative no-underline active:scale-[0.98] active:bg-neutral-100 dark:active:bg-white/10 transition-all duration-300 ease-spring card-hover"
    >
      <div className="flex flex-col h-full p-8 md:p-12 relative z-10">
        {/* 1. Header: Meta Data line */}
        {project.headline && (
          <div className="flex justify-between items-baseline mb-6">
            <span className="text-[14px] font-mono uppercase text-neutral-500 dark:text-neutral-400 group-hover:text-[var(--foreground)] transition-colors duration-[320ms]">
              {project.headline}
            </span>
            <span className="text-[13px] font-mono uppercase text-neutral-400 whitespace-nowrap">
              {readingTime} MIN READ
            </span>
          </div>
        )}

        {/* 2. Main Visual: Grayscale to Color */}
        <div className="relative w-full aspect-video mb-6 overflow-hidden bg-neutral-900 filter grayscale group-hover:grayscale-0 transition-all duration-500">
          <img
            src={project.engineering_artifact || "/assets/placeholder.png"}
            alt={project.title}
            className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Overlay Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
        </div>

        {/* 3. Typography: Editorial - Min Height Wrapper for Alignment */}
        <div className="flex flex-col min-h-[14rem] mb-8">
          <h3 className="text-2xl font-extrabold tracking-tighter mb-4 leading-none">
            {project.title}
          </h3>

          <p className="text-[16px] text-neutral-500 dark:text-neutral-400 max-w-[90%]">
            {(project.card_description || project.about?.description || project.problem)
              .split(/(\*\*.*?\*\*)/)
              .map((part, i) =>
                part.startsWith("**") && part.endsWith("**") ? (
                  <strong
                    key={i}
                    className="font-bold text-[var(--foreground)]"
                  >
                    {part.slice(2, -2)}
                  </strong>
                ) : (
                  part
                ),
              )}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
