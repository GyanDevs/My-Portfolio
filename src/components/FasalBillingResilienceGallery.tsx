"use client";
import React from "react";
import { motion } from "framer-motion";

const images = [
  {
    src: "/assets/fasal-billing-pending.webp",
    caption: "Transaction Pending",
    objectPosition: "center bottom",
  },
  {
    src: "/assets/fasal-billing-expired.webp",
    caption: "Subscription Expired",
    objectPosition: "center top",
  },
  {
    src: "/assets/fasal-billing-failed.webp",
    caption: "Payment Failed",
    objectPosition: "center bottom",
  },
];

interface Props {
  onImageClick: (src: string, alt: string) => void;
}

export default function FasalBillingResilienceGallery({ onImageClick }: Props) {
  return (
    <div className="w-full h-[480px] md:h-[600px] flex gap-3">
      {images.map((img, i) => (
        <motion.div
          key={i}
          className="relative h-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 group cursor-zoom-in flex-1"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          onClick={() => onImageClick(img.src, img.caption)}
        >
          <img
            src={img.src}
            alt={img.caption}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
            style={{ objectPosition: img.objectPosition }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          <span className="absolute bottom-4 left-4 text-[10px] font-mono uppercase tracking-widest text-white/90 bg-black/30 backdrop-blur-sm px-3 py-1.5 z-10 border border-white/10">
            {img.caption}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
