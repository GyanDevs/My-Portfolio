"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import FollowCursorPill, {
  FOLLOW_CURSOR_PILL_ACCENT_CLASSNAME,
} from "@/src/components/FollowCursorPill";

/**
 * Home case-study grid: “View case study” near the default arrow over project links only.
 */
export default function CaseStudyCursorPill({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FollowCursorPill
      activeWithinSelector='a[href^="/projects/"]'
      crossTargetHandoff
      pillClassName={FOLLOW_CURSOR_PILL_ACCENT_CLASSNAME}
      label={
        <>
          <span className="uppercase tracking-[0.16em]">View case study</span>
          <ArrowRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} aria-hidden />
        </>
      }
    >
      {children}
    </FollowCursorPill>
  );
}
