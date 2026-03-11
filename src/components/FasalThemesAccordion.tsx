"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
// Data derived from the user request and image


const THEMES = [
  {
    title: "Navigation",
    headers: ["Identified Issues", "Proposed Solution", "Impact & Advantages"],
    rows: [
      {
        c1: "Unable to go back using our back button multiple times.",
        c2: "Tech : Fix back button issue. Phone back button is what users are accessing so it can be single click one step back, click twice show warning to exit the app?",
        c3: "Navigation towards going back would match users expectation hence improving experience and removing confusion.",
      },
      {
        c1: "Most of them were not using the menu but just the card that is visible on the home. Some of them use alerts but mostly the home.",
        c2: "Following a widget or dashboard like structure might help us position all the features upfront and accessible.",
        c3: "This will add feature visibility on the application and add quick access from one page to most of the features by decreasing the travel distance of finer and no of clicks. might help in clearing the bias when showcasing the features.",
      },
      {
        c1: "3 gauges present on home but more data is present and scattered across the page loosing context from the plot page.",
        c2: "Follow the same order as present on the plot card & Provide insight to the user about what they can expect after clicking on gauges section.",
        c3: "Follow the same order as present on the plot card & Provide insight to the user about what they can expect after clicking on gauges section.",
      },
      {
        c1: "Time taken to find activities, forecast from the data screen is around 15-20secs.",
        c2: "Using Iconography can improve the visibility of these tabs.",
        c3: "It will act as visual cues for the user to remember easily & reduce the time expenditure to find activities & forecast.",
      },
      {
        c1: "Contextual Clicks are absent",
        c2: "Provide insight to the user about what they can expect after clicking on gauges section. Follow the same order as present on the plot card.",
        c3: "This might provide value to the farmer by removing confusion and adding context to the user so that they wont feel lost and improve adoption on the app. - App usage time might be improved.",
      },
    ],
  },
  {
    title: "Information readability & perceiving",
    headers: ["Identified Issues", "Proposed Solution", "Impact & Advantages"],
    rows: [
      {
        c1: "Information redesign on gauges (Gauges are too small, hence creating a confusion.)",
        c2: "Redesign the gauges in a way so that value & importance of shown readings be clearly visible to the farmer.",
        c3: "It will decrease the confusion and will improve farmers decision for irrigation and pest advisories.",
      },
      {
        c1: "Difficulty in reading recommended chemical names",
        c2: "Provide pronunciation guide in their selected regional language along with text to speech to understand difficult chemical names. This will enable the user to pronounce and increase the understanding about difficult chemical names. Also might improve advisory adoption as they will be able to pronounce easily after this.",
        c3: "It will enable the farmer to pronounce and increase the understanding about difficult chemical names. Also might improve advisory adoption as they will be able to pronounce easily after this.",
      },
      {
        c1: "Unable to understand what is the lowest or the highest value from data points - Advisories Information Readability or accessibility",
        c2: "Provide risk percentage of upcoming disease/irrigation advisory based on the shown readings.",
        c3: "It will help the farmer in better risk management of upcoming diseases & irrigation advisories, adds value to the user. Might provoke the user to read advisories.",
      },
      {
        c1: "Crop Cycle - Stage is being ignored on the top and the advisories are followed based on the green line on the side.",
        c2: "By keeping crop stages in the center and making it more visually appealing by icons and microinteractions.",
        c3: "Farmers will be able to map crop stages with upcoming & present activities seamlessly",
      },
      {
        c1: "Difficulty in understanding Delta T value in the spraying guide.",
        c2: "Introduce Contextual Help.",
        c3: "It will help the user in understanding and clearing the confusion about technical terms.",
      },
    ],
  },
  {
    title: "Influences & Biases",
    headers: ["Identified Issues", "Proposed Solution", "Impact & Advantages"],
    rows: [
      {
        c1: "Influence of shop vendors on our chemical & Fertilizer suggestion",
        c2: "Building trust through providing markers from govt board.",
        c3: "This will help the farmers to use the fasal recomended pesticides as they are well researched and good fro their yield.",
      },
      {
        c1: "Influence of shop vendors on our chemical & Fertilizer suggestion",
        c2: "Suggesting shopkeepers who can suggest Fasal recommended stuff in that region. - can collect data of what farmer uses and how much from the recognized Fasal keeper, can get some points for being that as they provide some positioning in the market.",
        c3: "Creates a supportive ecosystem where local vendors reinforce the app's recommendations rather than contradicting them.",
      },
      {
        c1: "Influence of shop vendors on our chemical & Fertilizer suggestion",
        c2: "Take input from the farmer whether he has sprayed with the same chemical name & further map it with other famer’s advisories that these many famers are using the same chemical and found it helpful.",
        c3: "Leverages social proof to validate recommendations and build confidence in the advisory.",
      },
      {
        c1: "Influence of shop vendors on our chemical & Fertilizer suggestion",
        c2: "Map the value of the chemical of our suggestion based on the harshness of the chemical along with the impact of it.",
        c3: "Educates farmers on the long-term impact of harsh chemicals versus recommended sustainable alternatives.",
      },
    ],
  },
  {
    title: "Learning & Adoption",
    headers: ["Identified Issues", "Proposed Solution", "Impact & Advantages"],
    rows: [
      {
        c1: "Farmers have not explored other than what has been communicated on demo or by CS Team",
        c2: "Contextual Help.",
        c3: "This will help in motivating the user to explore & adapt other sections of the application, which can help farmer in better tracking and management of his actions on the field.",
      },
      {
        c1: "Farmers have not explored other than what has been communicated on demo or by CS Team",
        c2: "Chip like design to provide value of particular block or feature. Showing Impact below the data or advisories we show might add value and might motivate user to adopt and explore more.",
        c3: "Directly highlights the value proposition of features, encouraging curiosity and self-driven exploration.",
      },
      {
        c1: "Farmers have not explored other than what has been communicated on demo or by CS Team",
        c2: "Build motivation to explore by gamifying through rewards when completed certain steps in the app, or used for certain days everyday",
        c3: "Gamification creates a stickiness factor and rewards learning behavior, increasing overall app engagement.",
      },
      {
        c1: "Adoption is seen majorly for Soil moisture data and some for alerts.",
        c2: "Fix Accuracy (Tech Driven)",
        c3: "This will help in motivating the farmer to explore & adapt other sections of the application, which can help farmer in better tracking and management of his actions on the field.",
      },
      {
        c1: "Adoption is seen majorly for Soil moisture data and some for alerts.",
        c2: "Adding chip: Information showing that farmers have followed in your region and had good yield.",
        c3: "Social proof drives adoption by showing tangible success stories from peers in the same region.",
      },
      {
        c1: "Adoption is seen majorly for Soil moisture data and some for alerts.",
        c2: "Credibility or trust issue - Providing trust markers like fasal is guarding your farm sleep peacefully etc. - This might help in building trust and help in building that experimenting and adoption behavior in user.",
        c3: "Emotional reassurance helps overcome the fear of relying on technology for critical farming decisions.",
      },
      {
        c1: "Adoption is seen majorly for Soil moisture data and some for alerts.",
        c2: "Community Centre - Where farmers/ Fasal can post pictures/Videos of their crops, yields, diseases, testimonials etc & other famers are able to react to it. With the help of community Centre we will be able to observe the adoption level of product features by farmers and these pictures/videos can directly be used as an insight to improve the product further.",
        c3: "Community gathering places create a sense of belonging and allow for peer-to-peer learning, accelerating adoption through observation.",
      },
    ],
  },
  {
    title: "Differences in expected behavior",
    headers: ["Identified Issues", "Proposed Solution", "Impact & Advantages"],
    rows: [
      {
        c1: "Farmers are not marking the activities as done after completing it.",
        c2: "Gamification of crop planner",
        c3: "This will help the farmers in adoption of advisories which inturn can be beneficial for farmers interms of their yeild.",
      },
      {
        c1: "Farmers are not marking the activities as done after completing it.",
        c2: 'A reminder notific which will lead to that particular advisory, more like conversation "Have you completed this: check button"',
        c3: "Conversational reminders feel less like chores and more like helpful nudges, improving compliance.",
      },
      {
        c1: "Farmers are not using our help section to raise an issue by themselves.",
        c2: "Introduce audio ticketing and request for a call back option to increase the adoption of help section in farmer’s day today lives.",
        c3: "This will make farmers independent in raising tickets and will decrease the operational dependency on customer success team.",
      },
      {
        c1: "Farmers are not making irrigation & spray decisions as per our sent advisories.",
        c2: "Provide risk percentage of upcoming disease/irrigation advisory based on the shown readings.",
        c3: "This will help farmers in making better spraying decisions based on the risk percentage.",
      },
      {
        c1: "Farmers are not making irrigation & spray decisions as per our sent advisories.",
        c2: "Provide Crop health based on advisories if followed (expected).",
        c3: "This will help the farmers in adoption of advisories which inturn can be beneficial for farmers interms of their yeild.",
      },
      {
        c1: "Farmers are not making irrigation & spray decisions as per our sent advisories.",
        c2: "Comparison after fasal advisory. Might match their expectation and try to understand the advisory better.",
        c3: "Visual comparisons bridge the gap between their experience and the app's recommendations.",
      },
    ],
  },
  {
    title: "Understanding product features",
    headers: ["Identified Issues", "Proposed Solution", "Impact & Advantages"],
    rows: [
      {
        c1: "Raise an Issue - Most of the farmers are not familiar with this section, some of the farmers are but they have never used it.",
        c2: "Introduce audio ticketing and request for a call back option to increase the adoption of help section in farmer’s day today lives.",
        c3: "Audio ticketing and request for a call back option to increase the adoption of help section in farmer’s day today lives, which in turn put farmers more at ease.",
      },
    ],
  },
];

type ThemeRow = {
  c1: string;
  c2: string;
  c3: string;
};

type Theme = {
  title: string;
  headers?: string[];
  rows?: ThemeRow[];
  cards?: string[];
};

export default function FasalThemesAccordion() {
  // Only "Navigation" (index 0) open by default
  const [openSection, setOpenSection] = useState<string | null>("Navigation");

  const toggleSection = (title: string) => {
    setOpenSection(openSection === title ? null : title);
  };

  return (
    <section className="w-full mb-12 space-y-4">
      {THEMES.map((theme: Theme, i) => {
        const isOpen = openSection === theme.title;
        return (
          <div
            key={i}
            className="border border-[var(--grid-line)] bg-background"
          >
            {/* Accordion Header */}
            <button
              onClick={() => toggleSection(theme.title)}
              className="w-full px-6 py-4 flex justify-between items-center bg-background card-hover transition-colors"
            >
              <h3 className="font-bold text-[18px] text-[var(--foreground)] text-left tracking-tight">
                {theme.title}
              </h3>
              {isOpen ? (
                <ChevronUp className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
              )}
            </button>

            {/* Accordion Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-6 border-t border-[var(--grid-line)] bg-background">
                    {/* TABLE LAYOUT FOR NAVIGATION (If 'rows' exists) */}
                    {theme.rows ? (
                      <div className="flex flex-col gap-4">
                        {/* Header Row (Desktop) */}
                        <div className="hidden lg:grid grid-cols-3 gap-4 pb-2 border-b border-[var(--grid-line)] font-mono font-medium text-[13px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                          {theme.headers?.map((h, idx) => (
                            <div key={idx}>{h}</div>
                          ))}
                        </div>

                        {/* Data Rows */}
                        {theme.rows.map((row, rIdx) => (
                          <div
                            key={rIdx}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-4"
                          >
                            {[row.c1, row.c2, row.c3].map((content, cIdx) => {
                              let cardTheme = {
                                bg: "bg-[var(--background)]",
                                border: "border-[var(--grid-line)]",
                                text: "text-neutral-500",
                              };
                              if (cIdx === 0) {
                                // Issue
                                cardTheme = {
                                  bg: "bg-rose-100 dark:bg-rose-900/20",
                                  border: "border-rose-300 dark:border-rose-700/80",
                                  text: "text-rose-700 dark:text-rose-500",
                                };
                              } else if (cIdx === 1) {
                                // Solution
                                cardTheme = {
                                  bg: "bg-green-100 dark:bg-green-900/20",
                                  border: "border-green-300 dark:border-green-700/80",
                                  text: "text-green-700 dark:text-green-500",
                                };
                              } else if (cIdx === 2) {
                                // Benefit
                                cardTheme = {
                                  bg: "bg-green-100 dark:bg-green-900/20",
                                  border: "border-green-300 dark:border-green-700/80",
                                  text: "text-green-700 dark:text-green-500",
                                };
                              }

                              const prevRow = theme.rows?.[rIdx - 1];
                              const isRepeatedIssue =
                                cIdx === 0 &&
                                rIdx > 0 &&
                                !!prevRow &&
                                row.c1 === prevRow.c1;

                              return (
                                <div
                                  key={cIdx}
                                  className={`p-6 border flex flex-col justify-between min-h-[160px] shadow-sm transition-colors ${cardTheme.bg} ${cardTheme.border}`}
                                >
                                  <div>
                                    {/* Mobile Label */}
                                    <span
                                      className={`lg:hidden block font-mono text-[13px] uppercase tracking-widest mb-2 ${cardTheme.text}`}
                                    >
                                      {theme.headers?.[cIdx] ?? ""}
                                    </span>

                                    {isRepeatedIssue ? (
                                      <div className="flex flex-col items-center justify-center py-4 opacity-70">
                                        <span className="text-4xl font-serif leading-none mb-1">
                                          "
                                        </span>
                                        <span className="text-xs font-light uppercase tracking-widest">
                                          Same
                                        </span>
                                      </div>
                                    ) : (
                                      <p className="font-sans font-light text-[16px] leading-relaxed text-[var(--foreground)]">
                                        {content}
                                      </p>
                                    )}
                                  </div>

                                  <div
                                    className={`mt-4 flex items-center gap-2 text-[13px] font-mono uppercase tracking-widest ${cardTheme.text}`}
                                  >
                                    <span>#{String(rIdx + 1).padStart(2, "0")}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* CARD GRID FOR OTHER THEMES */
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(theme.cards ?? []).map((cardText: string, idx: number) => (
                          <div
                            key={idx}
                            className="bg-[var(--background)] border border-[var(--grid-line)] p-6 flex flex-col justify-between min-h-[140px] shadow-sm hover:border-neutral-400 card-hover transition-colors"
                          >
                            <p className="font-sans font-light text-[16px] leading-relaxed text-[var(--foreground)]">
                              {cardText}
                            </p>
                            <div className="mt-4 flex items-center gap-2 text-[13px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                              <span>#{String(idx + 1).padStart(2, "0")}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </section>
  );
}
