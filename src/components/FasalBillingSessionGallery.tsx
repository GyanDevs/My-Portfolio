"use client";
import React from "react";
import { motion } from "framer-motion";

const images = [
  {
    src: "/assets/fasal-billing-session-1.webp",
    flex: 1.3,
    caption: "Testing Session",
    objectPosition: "center 20%",
  },
  {
    src: "/assets/fasal-billing-session-2.webp",
    flex: 1.1,
    caption: "Farmer in Vineyard",
    objectPosition: "center 15%",
  },
  {
    src: "/assets/fasal-billing-session-3.webp",
    flex: 1.1,
    caption: "On-Site Walkthrough",
    objectPosition: "center 10%",
  },
];

export default function FasalBillingSessionGallery() {
  return (
    <div className="w-full mb-12">
      {/* Mobile: horizontal scrollable gallery */}
      <div className="md:hidden h-[300px]">
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar h-full">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className="relative flex-none w-[78vw] h-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 group cursor-pointer snap-start"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                style={{ objectPosition: img.objectPosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <span className="absolute bottom-4 left-4 text-[10px] font-mono uppercase tracking-widest text-white/90 bg-black/30 backdrop-blur-sm px-3 py-1.5 z-10 border border-white/10">
                {img.caption}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* md+: original side-by-side gallery */}
      <div className="hidden md:flex h-[440px] flex gap-3">
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="relative h-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 group cursor-pointer"
            style={{ flex: img.flex }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <img
              src={img.src}
              alt={img.caption}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
              style={{ objectPosition: img.objectPosition }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            <span className="absolute bottom-4 left-4 text-[10px] font-mono uppercase tracking-widest text-white/90 bg-black/30 backdrop-blur-sm px-3 py-1.5 z-10 border border-white/10">
              {img.caption}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
