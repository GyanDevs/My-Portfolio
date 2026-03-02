import React from "react";
import { notFound } from "next/navigation";
import projects from "@/src/data/projects.json";
import ProjectDetailClient from "@/src/components/ProjectDetailClient";

// 1. Static Params Generation (Server-Side)
export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.id,
    }));
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const project = projects.find((p) => p.id === slug);

    if (!project) {
        return notFound();
    }

    // 2. Pass data to Client Component
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <ProjectDetailClient project={project as any} />;
}

