"use client";
import React, { useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
export default function Spotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
// Smooth out the mouse movement
const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 }); const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 }); useEffect(() => { function handleMouseMove(e: MouseEvent) { mouseX.set(e.clientX); mouseY.set(e.clientY); } window.addEventListener("mousemove", handleMouseMove); return () => window.removeEventListener("mousemove", handleMouseMove); }, [mouseX, mouseY]); return ( <motion.div className="pointer-events-none fixed inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(255, 255, 255, 0.06), transparent 80%)`, }} /> );
}
