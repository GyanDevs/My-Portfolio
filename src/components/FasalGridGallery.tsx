"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
export default function FasalGridGallery() {
  const sectionRef = useRef<HTMLElement>(null);
// Flex values to determine relative width (Landscape vs Portrait/Square)
const images = [ { src: "/assets/fasal-rainbow.webp", flex: 2, caption: "Field Setup" }, { src: "/assets/fasal-crates.webp", flex: 1.3, caption: "Harvest Sorting" }, { src: "/assets/fasal-trees.webp", flex: 1.3, caption: "Orchard Survey" } ]; return ( <section ref={sectionRef} className="w-full h-[280px] md:h-[400px] flex gap-4 mb-12" > {images.map((img, i) => ( <motion.div key={i} className="relative h-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 group cursor-pointer" style={{ flex: img.flex }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }} > <div className="w-full h-full relative"> <img src={img.src} alt={img.caption} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out" /> <span className="absolute bottom-4 left-4 text-[10px] font-mono uppercase tracking-widest text-white drop-shadow-md bg-black/20 backdrop-blur-md px-3 py-1.5 z-10"> {img.caption} </span> </div> </motion.div> ))} </section> );
}
