export type CareerLeadSegment = {
  text: string;
  highlight?: boolean;
};

export type CareerMilestone = {
  id: string;
  /** Era / years - shown small, muted (mono). */
  years: string;
  /** Role or title for this era (e.g. Senior Product Designer). Shown between years and tag. */
  designation?: string;
  /** Optional secondary label (IoT, HCI, …). */
  tag?: string;
  /**
   * When true: line 1 = years only; line 2 = designation · tag (sans, same as designation).
   * Default: line 1 = years · tag (mono); line 2 = designation.
   */
  combineMetaSecondLine?: boolean;
  title: string;
  body: string;
  /** Single character or symbol for visual rhythm (no images required). */
  mark?: string;
};

export const careerPageIntro = {
  eyebrow: "How I got here",
  title: "From tinkering to interaction design",
  /**
   * CV hero lead: default = muted sans; `highlight` = serif italic, foreground.
   */
  leadSegments: [
    { text: "I didn’t stumble into " },
    { text: "product design", highlight: true },
    { text: " through a single course. I grew up inside " },
    { text: "creative work", highlight: true },
    { text: "; " },
    { text: "human-computer interaction", highlight: true },
    { text: " came later and gave me " },
    { text: "vocabulary and rigor", highlight: true },
    { text: " for what I was already reaching toward. " },
    { text: "The timeline below", highlight: true },
    { text: " carries the " },
    { text: "full arc", highlight: true },
    { text: "." },
  ] satisfies CareerLeadSegment[],
};

export const careerMilestones: CareerMilestone[] = [
  {
    id: "roots-creative",
    years: "From early age",
    combineMetaSecondLine: true,
    tag: "Creative roots",
    title: "Making things before I named the habit",
    mark: "◇",
    body:
      "I drew, built, and fixed things long before I had a name for the work. Creativity wasn’t a hobby box; it was how I made sense of the world. That instinct never pointed to a single job title, but it set the bar: I care how something feels to use, not only how it looks.",
  },
  {
    id: "engineering-btech",
    years: "2016 - 2020",
    designation: "B.Tech, Automobile Engineering",
    title: "Engineering taught me constraints",
    mark: "◈",
    body:
      "Automobile engineering taught me that physics, safety, and systems don’t forgive sloppy thinking. I didn’t leave that behind when I moved toward design. I still reach for it when software has to work in the real world, especially in the field.",
  },
  {
    id: "ixdf-hci",
    years: "2020 - 2021",
    combineMetaSecondLine: true,
    tag: "HCI",
    title: "HCI gave the chaos a path",
    mark: "○",
    body:
      "IxDF’s HCI track wasn’t a certificate for the wall. It was the first time I could name what I was reaching for: clear ways to think about behavior, feedback, and error. Interaction design as a discipline, not a mood board.",
  },
  {
    id: "ucertify-edtech",
    years: "2020 - 2021",
    designation: "Product Specialist",
    tag: "EDTECH",
    title: "Talking to users before I called it research",
    mark: "□",
    body:
      "At Ucertify I lived in demos and client calls, listening until patterns showed up. Empathy stopped being a buzzword and became a habit: what people say, what they do, and what the product actually asks them to do.",
  },
  {
    id: "bazaarnxt-scale",
    years: "2021 - 2023",
    designation: "Product Designer",
    tag: "B2B · SUPPLY CHAIN",
    title: "B2B at real scale",
    mark: "△",
    body:
      "BazaarNXT stretched me across mobile and internal tools where mistakes cost real money and time. I learned to ship coherent systems, not just screens: one language across products, with retention and adoption as the honest scoreboard.",
  },
  {
    id: "fasal-iot-today",
    years: "2023 - PRESENT",
    designation: "Senior Product Designer",
    tag: "IOT, B2B SaaS",
    title: "Where I am now: clarity in the field",
    mark: "◆",
    body:
      "At Fasal, my current chapter, I design where telemetry meets real farms: sensors, dashboards, and workflows for people who don’t owe us their patience. Less support load on messy sensor flows, shared design systems across verticals, and ideas tested in production, not only in slides. In interviews I tell it as one arc: from making things without a title to systems that still have to work when the network doesn’t.",
  },
];
