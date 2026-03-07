"use client";
import React from "react";
import { Users, User } from "lucide-react";

/**
 * FasalIotFeedbackInfographic
 * A split-view component showing feedback from Internal Teams (Left) and Farmers (Right) for the IoT project.
 */
export default function FasalIotFeedbackInfographic() {
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
        <div className="p-8 md:p-10 border-b border-[var(--grid-line)] bg-background/50 backdrop-blur-sm z-10 shrink-0">
          <div className="flex items-center gap-4 group cursor-default">
            <div className="w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shrink-0 hidden md:flex text-[var(--foreground)]">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="font-mono text-[13px] tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-1 leading-none uppercase">
                Internal Narrative
              </p>
              <h4 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                Stakeholder Feedback
              </h4>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain hide-scrollbar p-8 md:p-10 pb-20 space-y-4">
          <FeedbackCard label="SALE" text="Sales team reported frequent complaints from farmers about difficulty reading sensor dials and understanding optimum ranges." />
          <FeedbackCard label="CSE" text="Customer success team noted an increase in support tickets related to misinterpreting dial readings and values." />
          <FeedbackCard label="CSE" text="Both teams observed that older farmers particularly struggled with the small size and visual density of the legacy dials." />
          <FeedbackCard label="SALE" text="Dial usability issues were becoming a barrier to new customer acquisition during field demos." />
        </div>
      </div>

      {/* Right Side: User Feedback */}
      <div className="flex-1 flex flex-col h-1/2 md:h-full bg-background overflow-hidden group/right">
        <div className="p-8 md:p-10 border-b border-[var(--grid-line)] bg-background/50 backdrop-blur-sm z-10 shrink-0">
          <div className="flex items-center gap-4 group cursor-default">
            <div className="w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shrink-0 hidden md:flex text-[var(--foreground)]">
              <User className="w-6 h-6" />
            </div>
            <div>
              <p className="font-mono text-[13px] tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-1 leading-none uppercase">
                Field Insights
              </p>
              <h4 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                Farmer Voice
              </h4>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain hide-scrollbar p-8 md:p-10 pb-20 space-y-4">
          <FarmerQuote
            hindi='"Mujhe chhote dial par rang samajhne mein dikkat hoti hai."'
            english="I have difficulty understanding colors on the small dial."
          />
          <FarmerQuote
            hindi='"Dial ke rang aur uske matlab mein confusion hota hai."'
            english="There's confusion between the dial's color and its meaning."
          />
          <FarmerQuote
            hindi='"Bade dial hote toh shayad behtar samajh aata."'
            english="If the dials were larger, maybe I could understand better."
          />
          <FarmerQuote
            hindi='"Kabhi kabhi to main dial ko ignore hi kar deta hoon kyunki samajh nahi aata."'
            english="Sometimes I just ignore the dial because I can't understand it."
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
        <p className="text-[16px] text-[var(--foreground)]">{text}</p>
      </div>
    </div>
  );
}

function FarmerQuote({ hindi, english }: { hindi: string; english: string }) {
  return (
    <div className="flex flex-col items-start gap-2 group/user w-full text-left">
      <div className="w-full relative p-6 bg-rose-500/10 dark:bg-rose-500/10 border border-rose-700/60 dark:border-rose-800/70 hover:bg-rose-500/15 transition-colors duration-200">
        <p className="text-[16px] text-[var(--foreground)] mb-3">{hindi}</p>
        <p className="text-[16px] font-serif italic text-[var(--foreground)] opacity-90">{english}</p>
      </div>
    </div>
  );
}
