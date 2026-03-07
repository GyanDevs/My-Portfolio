"use client";
import React from "react";
import { Users, User } from "lucide-react";

/**
 * FasalFeedbackInfographic
 * A split-view component showing feedback from Internal Teams (Left) and Farmers (Right).
 */
export default function FasalFeedbackInfographic() {
  return (
    <div className="w-full h-[600px] border border-[var(--grid-line)] bg-background flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[var(--grid-line)] overflow-hidden mb-12">
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Left Side: Internal Teams Feedback */}
      <div className="flex-1 flex flex-col h-1/2 md:h-full bg-background overflow-hidden group/left">
        {/* Fixed Header */}
        <div className="p-8 md:p-10 border-b border-[var(--grid-line)] bg-background/50 backdrop-blur-sm z-10 shrink-0">
          <div className="flex items-center gap-4 group cursor-default">
            <div className="w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shrink-0 hidden md:flex text-[var(--foreground)]">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="font-mono text-[13px] tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-1 leading-none uppercase">
                Internal Narrative
              </p>
              <h4 className="text-[18px] font-bold tracking-tight text-[var(--foreground)]">
                Stakeholder Feedback
              </h4>
            </div>
          </div>
        </div>
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain hide-scrollbar p-8 md:p-10 pb-20 space-y-4">
          <FeedbackCard label="CSE" text="Both teams emphasized the need for a more user-friendly help system that caters to farmers' preferences and limitations." />
          <FeedbackCard label="SALE" text="The importance of voice-based communication was consistently highlighted across both teams." />
          <FeedbackCard label="CSE" text="Language and literacy barriers were identified as significant obstacles in the current text-based help system." />
          <FeedbackCard label="SALE" text="Both teams agreed that improving the help section could lead to more efficient problem resolution and increased user satisfaction." />
        </div>
      </div>

      {/* Right Side: User Feedback */}
      <div className="flex-1 flex flex-col h-1/2 md:h-full bg-background overflow-hidden group/right">
        {/* Fixed Header */}
        <div className="p-8 md:p-10 border-b border-[var(--grid-line)] bg-background/50 backdrop-blur-sm z-10 shrink-0">
          <div className="flex items-center gap-4 group cursor-default">
            <div className="w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shrink-0 hidden md:flex text-[var(--foreground)]">
              <User className="w-6 h-6" />
            </div>
            <div>
              <p className="font-mono text-[13px] tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-1 leading-none uppercase">
                Field Insights
              </p>
              <h4 className="text-[18px] font-bold tracking-tight text-[var(--foreground)]">
                Farmer Voice
              </h4>
            </div>
          </div>
        </div>
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain hide-scrollbar p-8 md:p-10 pb-20 space-y-4">
          <FarmerQuote
            hindi='"Mujhe pata hi nahi hai ki kahan se complaint karte hain, kabhi check nahi kiya."'
            english="I have no idea how to raise a complaint in the app. I've never checked."
          />
          <FarmerQuote
            hindi='"Mujhe keyboard se type karne mein problem hai. WhatsApp mein bhi sirf audio message bhejta hoon, text message sirf padhta hoon."'
            english="I have difficulty typing on the keyboard. Even on WhatsApp, I only send audio messages and just read text messages."
          />
          <FarmerQuote
            hindi='"Mujhe di hui categories mein mera issue nahi milta jo main face kar raha hoon."'
            english="I can't find my issue in the given categories in the help section."
          />
          <FarmerQuote
            hindi='"Sales wale bande ko call karna mere liye easy hai."'
            english="It's easier for me to call the sales person. I can just pick up my phone and call them."
          />
        </div>
      </div>
    </div>
  );
}

function FeedbackCard({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex items-start gap-4 group/item w-full">
      <div className="w-10 h-10 shrink-0 border border-[var(--grid-line)] flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 card-hover transition-colors">
        <span className="font-mono text-[13px] font-bold">{label}</span>
      </div>
      <div className="relative p-5 bg-neutral-200/50 dark:bg-neutral-900/50 border border-[var(--grid-line)] flex-1 card-hover transition-colors">
        <p className="text-[16px] text-neutral-900 dark:text-neutral-100">{text}</p>
      </div>
    </div>
  );
}

function FarmerQuote({ hindi, english }: { hindi: string; english: string }) {
  return (
    <div className="flex flex-col items-start gap-2 group/user w-full text-left">
      <div className="w-full relative p-6 bg-rose-500/10 dark:bg-rose-500/10 border border-rose-700/60 dark:border-rose-800/70 hover:bg-rose-500/15 transition-colors duration-200">
        <p className="text-[16px] text-neutral-900 dark:text-neutral-100 mb-3">{hindi}</p>
        <p className="text-[16px] font-serif italic text-neutral-900 dark:text-neutral-100">{english}</p>
      </div>
    </div>
  );
}
