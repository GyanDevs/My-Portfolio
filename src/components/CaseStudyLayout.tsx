import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
interface CaseStudyLayoutProps {
  title: string;
  headline: string;
  artifactPath: string;
  caption: string;
  children: React.ReactNode;
}
const CaseStudyLayout: React.FC<CaseStudyLayoutProps> = ({
  title,
  headline,
  artifactPath,
  caption,
  children,
}) => {
  const [isBlueprintMode, setIsBlueprintMode] = useState(false);
  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
      {" "}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {" "}
        {/* Main Content Area */}{" "}
        <div className="lg:col-span-7">
          {" "}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            {" "}
            {title}{" "}
          </motion.h1>{" "}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-cyan-400 font-mono mb-8 uppercase tracking-widest"
          >
            {" "}
            {headline}{" "}
          </motion.p>{" "}
          <div className="prose prose-invert prose-lg text-slate-300">
            {" "}
            {children}{" "}
          </div>{" "}
        </div>{" "}
        {/* Engineering Artifact Panel */}{" "}
        <div className="lg:col-span-5 sticky top-12 self-start">
          {" "}
          <div className="bg-slate-900/50 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
            {" "}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
              {" "}
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                {" "}
                System Architecture{" "}
              </h3>{" "}
              <button
                onClick={() => setIsBlueprintMode(!isBlueprintMode)}
                className={`px-3 py-1 text-[10px] font-mono uppercase tracking-widest rounded-full border transition-all ${isBlueprintMode ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]" : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10"}`}
              >
                {" "}
                {isBlueprintMode ? "Blueprint Active" : "View Blueprint"}{" "}
              </button>{" "}
            </div>{" "}
            <div className="relative aspect-video bg-grid-pattern group">
              {" "}
              <AnimatePresence mode="wait">
                {" "}
                <motion.div
                  key={isBlueprintMode ? "blueprint" : "standard"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full"
                >
                  {" "}
                  {/* Image Placeholder / Actual Image */}{" "}
                  <div
                    className={`w-full h-full bg-slate-800 flex items-center justify-center overflow-hidden transition-all duration-700 ${isBlueprintMode ? "filter contrast-[1.2] grayscale invert border-4 border-white" : ""}`}
                  >
                    {" "}
                    {/* In a real scenario, use <img src={artifactPath} /> here */}{" "}
                    {/* Using a placeholder div for now to demonstrate the effect */}{" "}
                    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 text-center">
                      {" "}
                      {artifactPath ? (
                        <div className="text-sm font-mono text-slate-500">
                          {" "}
                          [IMAGE: {artifactPath}] <br />{" "}
                          <span className="text-xs opacity-50 block mt-2">
                            {" "}
                            {isBlueprintMode
                              ? "RENDERING LOGIC SCHEMATIC..."
                              : "DISPLAYING PREVIEW"}{" "}
                          </span>{" "}
                        </div>
                      ) : (
                        <span className="text-slate-600">
                          No Artifact Available
                        </span>
                      )}{" "}
                      {/* Blueprint decorative lines (only visible in blueprint mode) */}{" "}
                      {isBlueprintMode && (
                        <>
                          {" "}
                          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black" />{" "}
                          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black" />{" "}
                          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black" />{" "}
                          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black" />{" "}
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />{" "}
                        </>
                      )}{" "}
                    </div>{" "}
                  </div>{" "}
                </motion.div>{" "}
              </AnimatePresence>{" "}
            </div>{" "}
            <div className="p-3 bg-black/40 border-t border-white/10">
              {" "}
              <p className="text-xs font-mono text-center text-cyan-500/80">
                {" "}
                FIG 1.0 // {caption}
{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default CaseStudyLayout;
