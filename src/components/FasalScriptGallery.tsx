"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
export default function FasalScriptGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const images = [
    {
      src: "/assets/fasal-onsite-interview.webp",
      flex: 1,
      caption: "On-site Interview",
    },
    { src: "/assets/fasal-iot-device.webp", flex: 1, caption: "Fasal Device" },
    {
      src: "/assets/fasal-field-selfie.webp",
      flex: 1,
      caption: "Selfie with Farmer",
    },
  ];
  return (
    <section
      ref={sectionRef}
      className="w-full mb-12"
    >
      {/* Mobile: horizontal scroll strip */}
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar md:hidden pb-2">
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="relative flex-none w-[78vw] aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-900 group cursor-pointer border border-[var(--grid-line)] snap-start"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <img
              src={img.src}
              alt={img.caption}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
            />
            <span className="absolute bottom-3 left-3 text-[10px] font-mono uppercase tracking-widest text-white drop-shadow-md bg-black/20 backdrop-blur-md px-3 py-1.5">
              {img.caption}
            </span>
          </motion.div>
        ))}
      </div>

      {/* md+: original side-by-side layout */}
      <div className="hidden md:flex gap-4 w-full aspect-[3/1] md:aspect-[3/1.1]">
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="relative h-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 group cursor-pointer border border-[var(--grid-line)]"
            style={{ flex: img.flex }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="w-full h-full relative flex items-center justify-center">
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out z-10"
              />
              <span className="absolute bottom-4 left-4 text-[10px] font-mono uppercase tracking-widest text-white drop-shadow-md bg-black/20 backdrop-blur-md px-3 py-1.5 z-20">
                {img.caption}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
