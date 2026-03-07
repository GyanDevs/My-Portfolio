import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import projects from "@/src/data/projects.json";
import ProjectDetailClient from "@/src/components/ProjectDetailClient";

// 1. Static Params Generation (Server-Side)
export async function generateStaticParams() {
  return projects
    .filter((project) => !project.isPlaceholder)
    .map((project) => ({
      slug: project.id,
    }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Plain-text description for meta tags (strip markdown bold). */
function toPlainDescription(raw: string | undefined): string {
  if (!raw) return "";
  return raw.replace(/\*\*([^*]+)\*\*/g, "$1").slice(0, 160);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug) as (typeof projects)[0] | undefined;
  if (!project || project.isPlaceholder) {
    return { title: "Project Not Found" };
  }
  const title = `${project.title} // Gyan — Senior Product Designer`;
  const description =
    toPlainDescription(project.card_description) ||
    project.headline ||
    project.system_diagram ||
    "Case study by Gyan, Senior Product Designer.";
  const url = `https://gyan.design/projects/${slug}`;
  return {
    title,
    description,
    metadataBase: new URL("https://gyan.design"),
    openGraph: {
      title,
      description,
      url,
      siteName: "gyan.design",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  // Hide placeholder projects from the live route
  if (!project || project.isPlaceholder) {
    return notFound();
  }

  // 2. Pass data to Client Component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <ProjectDetailClient project={project as any} />;
}

