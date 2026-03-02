"use client";
import React from "react";

const lessons = [
  {
    label: "Trust is the UX",
    body: "For a farmer, a billing dashboard isn't a utility; it's a financial statement. Radical transparency is the only way to build trust in B2B.",
  },
  {
    label: "Design is Business Logic",
    body: "The Happy Path is easy. The real value of a Senior Designer lies in the edge cases: payment failures mid-harvest, hardware dependency chains, and financial math that farmers shouldn't have to see.",
  },
];

export default function FasalBillingLessons() {
  return (
    <div className="relative w-full h-[400px] overflow-hidden group mb-8 border border-[var(--grid-line)] card-hover transition-all duration-300 ease-spring">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/fasal-farm-field.png"
          alt="Farm field in Anantapur"
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-spring grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-between text-neutral-100">
        <h4 className="text-xl font-bold tracking-tight text-white drop-shadow-sm">
          What This Project Taught Me
        </h4>
        <div className="space-y-6 max-w-2xl">
          {lessons.map((lesson) => (
            <div key={lesson.label} className="space-y-1">
              <p className="text-base md:text-[16px] font-sans text-white/90 leading-snug drop-shadow-md">
                <strong className="font-sans font-bold text-white">
                  {lesson.label}:
                </strong>{" "}
                {lesson.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
