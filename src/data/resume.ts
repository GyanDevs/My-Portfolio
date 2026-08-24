export const DATA_LAST_UPDATED = "2026-05-24";

/** Suggested filename when saving `/resume.pdf` from the site */
export const RESUME_PDF_DOWNLOAD_FILENAME = "Gyan_Prakash_Resume.pdf";

export const profile = {
  hook: "6+ years turning complexity into clarity.",
  tagline:
    "Lead Product Designer at Hewlett Packard Enterprise. Designed for enterprise IT, agriculture IoT, and B2B supply chain—where a bad design decision has real operational cost.",
};

export const summary =
  "Lead Product Designer with 6+ years of experience transforming complex, data-heavy IT systems into intuitive enterprise interfaces. I combine an engineering mindset with strategic UX architecture to deliver scalable, highly feasible UI solutions that drive business outcomes—including an 80% reduction in user support tickets.";

export const connect = [
  { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/gyandesign/" },
  {
    label: "Email ↗",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=mgyan1996@gmail.com",
  },
];

export const skills = [
  {
    category: "Expertise",
    description:
      "Enterprise Product Design, User Interface Design (UI), Data Visualization, Complex System Design, IoT Experience (IoT), Information Architecture (IA), Service Design, Usability Testing, A/B Testing.",
  },
  {
    category: "Design Leadership",
    description:
      "Design Systems (Scalability), Product Strategy, Agile/Scrum Methodology, Technical Feasibility Assessment, Cross functional Collaboration, ROI Driven Design.",
  },
];

export const tools = [
  "Figma (Variables & Auto layout)",
  "Cursor",
  "Claude",
  "JIRA",
  "Miro",
  "Useberry",
  "Notion",
  "Zeplin",
];

export const experience = [
  {
    title: "Lead Product Designer",
    period: { start: "2026", end: "Present", current: true },
    company: "Hewlett Packard Enterprise",
    sector: "Enterprise IT",
    bullets: [
      {
        label: "UX Architecture & Integration",
        text: "Leading the UX strategy to merge legacy Aruba and Juniper network ecosystems into a single, unified Network Services Platform (NSP) support portal.",
      },
      {
        label: "System Design & Scalability",
        text: "Architecting an acquisition proof and modular UI framework that allows IT admins to manage complex hybrid cloud networks without friction.",
      },
      {
        label: "Design-to-Development Handoff",
        text: "Standardizing the enterprise UI component library (Grommet) with responsive auto-layout and variables, significantly reducing design debt and accelerating engineering build times.",
      },
      {
        label: "Evidence-Based Design",
        text: "Implementing data-driven practices to validate high-density data visualizations and log structures against actual user pain points before frontend development begins.",
      },
    ],
  },
  {
    title: "Senior Product Designer",
    period: { start: "2022", end: "2026", current: false },
    company: "Fasal.co",
    sector: "IoT, SaaS",
    bullets: [
      {
        label: "Product & UX Strategy",
        text: "Led end to end user experience strategy for enterprise IoT monitoring platforms, achieving 15% growth in Daily Active Users (DAU) and a 10% increase in premium feature adoption.",
      },
      {
        label: "Data Visualization & UI",
        text: "Redesigned the core Sensor Dashboard to make telemetry data (humidity, soil moisture) readable for non technical farmers. Reduced decision making time by 40%.",
      },
      {
        label: "Design Systems & Scalability",
        text: "Architected a scalable Atomic Design System supporting 3 software verticals. Standardized UI components (Atoms to Organisms) across Web and Mobile, reducing design to development handoff time by 35% and cutting release time by 2 weeks per cycle.",
      },
      {
        label: "Operational Efficiency & AI Workflows",
        text: "Optimized design operations by introducing AI augmented prototyping workflows (Cursor/Claude) for rapid frontend code validation, cutting iteration cycles by 50%. Mentored 3 junior designers on data driven design and AI literacy.",
      },
    ],
  },
  {
    title: "Product Designer",
    period: { start: "2021", end: "2022", current: false },
    company: "BazaarNXT",
    sector: "B2B Supply Chain & Logistics Platform",
    bullets: [
      {
        label: "End to End Product Execution",
        text: "Designed and launched the BazaarNXT mobile app (Android/iOS) and internal merchandising & pricing tools for BDEs. 10,000+ users onboarded within the first 3 months.",
      },
      {
        label: "System Design & Efficiency",
        text: "Revamped three core web platforms (ProcureNXT, SellerNXT, PackNXT) under a Unified UI/UX Design Language, cutting frontend development time by 50%.",
      },
      {
        label: "User Retention Strategy",
        text: "Redesigned key customer touchpoints based on behavioral analytics, achieving a 30% increase in retention rate and a 50% decrease in bounce rate across the e-commerce funnel.",
      },
      {
        label: "Strategic Impact",
        text: "Designed high fidelity, investor facing product visions that helped secure Series A/Bridge funding by demonstrating product market fit.",
      },
    ],
  },
  {
    title: "Product Specialist",
    period: { start: "2020", end: "2021", current: false },
    company: "Ucertify",
    sector: "Ed Tech",
    bullets: [
      {
        label: "User Research",
        text: "Conducted 50+ product demonstrations and client interviews, translating feedback into UX product recommendations that measurably improved user satisfaction.",
      },
      {
        label: "Cross-functional Collaboration",
        text: "Worked with international engineering teams to refine product positioning, directly supporting revenue growth through upselling initiatives.",
      },
    ],
  },
];

export const education = [
  {
    degree: "B.Tech (Automobile Engineering)",
    institution: "Lovely Professional University",
    period: "2016-2020",
  },
  {
    degree: "IxDF Certification (Top 10%)",
    institution: "Human-Computer Interaction",
    period: "2020-2021",
  },
];
