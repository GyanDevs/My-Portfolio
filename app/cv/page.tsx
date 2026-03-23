import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Gyan: About me",
  description:
    "The short story behind my path into interaction design, plus a gallery of design work. Download the CV PDF when you need the formal version.",
};

export default function CvPage() {
  redirect("/about-me");
}
