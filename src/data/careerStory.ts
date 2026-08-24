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
  /** Employer name shown in timeline meta (e.g. Fasal, Ucertify). */
  company?: string;
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

export type DesignPhilosophyPillar = {
  title: string;
  body: string;
};

/**
 * About-page storytelling: belief → tension → growth → synthesis,
 * then proof (timeline), life, creed, conversational close.
 */
export const careerPageIntro = {
  eyebrow: "About me",
  title: "I am Gyan, curious by nature, rigorous by choice.",
  /**
   * Multi-beat story. Default = muted sans; `highlight` = marker wash.
   * Voice: conversational — like telling a friend, not pitching a creed.
   */
  storyParagraphs: [
    [
      {
        text: "I spend a lot of my time in systems that are already messy: farms, ops tools, enterprise products, places where a bad call isn’t just an ugly slide. What I’m usually after is making that mess a little clearer for the people who live with it, shaping ",
      },
      { text: "clarity from complexity", highlight: true },
      { text: " without pretending the mess wasn’t there." },
    ],
    [
      {
        text: "I’ve been called detail-obsessed more than once, and it’s not wrong. Underneath the checklists is just ",
      },
      { text: "care", highlight: true },
      {
        text: ". I want the work to feel honest when someone is tired, rushed, or unsure.",
      },
    ],
    [
      {
        text: "I used to hold onto things forever, waiting for perfect. I still spot every edge case. I’ve just learned I grow faster by ",
      },
      { text: "doing", highlight: true },
      {
        text: ": shipping, listening, adjusting, more than polishing alone in a corner.",
      },
    ],
    [
      {
        text: "These days I try to stay close to the craft and still know when to let go so the team can move. The timeline below is that path, from ",
      },
      { text: "creative roots", highlight: true },
      { text: " to " },
      { text: "enterprise scale", highlight: true },
      { text: "." },
    ],
  ] satisfies CareerLeadSegment[][],
};

export const designPhilosophy = {
  eyebrow: "Design philosophy",
  pillars: [
    {
      title: "Listen in the field",
      body: "The closer I get to real use (farms, dashboards, ops floors), the fewer assumptions survive. Research isn’t a phase; it’s how I find the truth worth designing for.",
    },
    {
      title: "Wrestle chaos into simplicity",
      body: "Good design should feel simple. Not because it was easy, but because someone stayed with the mess until only what matters was left.",
    },
    {
      title: "Design for impact that sticks",
      body: "I don’t design for novelty. I design for the quiet kind of change: fewer support tickets, clearer decisions, a day that goes a little smoother for someone who didn’t ask for more complexity.",
    },
  ] satisfies DesignPhilosophyPillar[],
};

export const lifeBeyondDesign = {
  eyebrow: "There’s life beyond the screen",
  title:
    "When I’m not designing, I’m usually with a book, a playlist, or something I made just because I wanted to.",
};

export const aboutPageClose = {
  afterTimeline:
    "Still here? Good. That usually means the arc landed. Here’s a little of who I am when the Figma tab is closed.",
  closingEyebrow: "Next step",
  closingTitle: "You’ve scrolled this far. Let’s do something useful with that.",
  closingBody:
    "If you’re building something complex and want a designer who can stay with it, say hello, grab the CV, or find me on LinkedIn.",
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
      "Long before I had a name for the work, I drew, built, and fixed things. Creativity wasn’t a hobby box; it was how I made sense of the world. That instinct never pointed to a single job title, but it set the bar: I care how something feels to use, not only how it looks.",
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
    tag: "IxDF · HCI",
    title: "HCI gave the chaos a path",
    mark: "○",
    body:
      "IxDF’s HCI track wasn’t a certificate for the wall. It was the first time I could name what I was reaching for: clear ways to think about behavior, feedback, and error. Interaction design as a discipline, not a mood board, while I was at Ucertify, running demos and client calls alongside the coursework.",
  },
  {
    id: "ucertify-edtech",
    years: "2020 - 2021",
    designation: "Product Specialist",
    tag: "EDTECH",
    company: "Ucertify",
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
    company: "BazaarNXT",
    title: "B2B at real scale",
    mark: "△",
    body:
      "BazaarNXT stretched me across mobile and internal tools where mistakes cost real money and time. I learned to ship coherent systems, not just screens: one language across products, with retention and adoption as the honest scoreboard.",
  },
  {
    id: "fasal-iot",
    years: "2023 - 2026",
    designation: "Senior Product Designer",
    tag: "IOT · B2B SaaS",
    company: "Fasal",
    title: "Clarity in the field",
    mark: "◆",
    body:
      "At Fasal I designed where telemetry meets real farms: sensors, dashboards, and workflows for people who don’t owe us their patience.\n\nThe work that mattered most: untangling messy sensor flows, building a shared design language across verticals, and testing ideas in production, not only in slides.",
  },
  {
    id: "hpe-lead",
    years: "2026 - PRESENT",
    designation: "Lead Product Designer",
    tag: "HEWLETT PACKARD ENTERPRISE",
    title: "Where I am now: enterprise at scale",
    mark: "◈",
    body:
      "At Hewlett Packard Enterprise I lead product design on complex enterprise systems: long-lived workflows, many stakeholders, interfaces that have to stay clear under scrutiny.\n\nIt’s the same bar I held in the field: clarity when the system is messy and the user didn’t choose to be patient, now at enterprise scale.",
  },
];
