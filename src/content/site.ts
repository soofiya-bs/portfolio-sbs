/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT — edit everything about you in this one file.
 *  Anything wrapped in [brackets] is a placeholder to replace.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "[Your Name]",
  shortName: "[YN]",
  role: "Applied AI Engineer · Mentor · Founder",
  tagline: "I build production AI systems — and teach engineers to build them too.",
  description:
    "Applied AI engineer and mentor from IIT Madras. Guided self-learning programs on industry-approved AI engineering roadmaps, expert talks for institutions, and AI product development for companies.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  email: "[hello@yourdomain.com]",
  location: "Chennai, India",
  keywords: [
    "applied AI engineering",
    "AI engineering mentor",
    "AI mentorship India",
    "LLM engineering course",
    "generative AI training",
    "AI expert talk",
    "guest lecture AI",
    "hire AI engineer",
    "RAG development",
    "AI agents developer",
    "IIT Madras",
  ],
  socials: {
    instagram: "https://instagram.com/[handle]",
    youtube: "https://youtube.com/@[handle]",
    linkedin: "https://linkedin.com/in/[handle]",
    github: "https://github.com/[handle]",
  },
};

export const stats = [
  { value: "[500+]", label: "Learners mentored" },
  { value: "[40+]", label: "Workshops & talks" },
  { value: "[25+]", label: "AI projects shipped" },
  { value: "[3+]", label: "Years in industry" },
];

export const education = [
  {
    school: "Indian Institute of Technology Madras",
    degree: "[BS in Data Science and Applications]",
    period: "[2023 — Present]",
    note: "[Focus areas, CGPA, clubs or anything worth highlighting]",
  },
];

export const experience = [
  {
    kind: "Training",
    title: "[Founder & Lead Mentor]",
    org: "[Your Mentoring Program]",
    period: "[2024 — Present]",
    points: [
      "[Designed a roadmap-driven applied AI curriculum with weekly and daily modules]",
      "[Run weekly expert reviews for every cohort]",
    ],
  },
  {
    kind: "Training",
    title: "[Corporate / Academic Trainer]",
    org: "[Institution or company]",
    period: "[2023 — 2024]",
    points: ["[Delivered X workshops on GenAI, LLMs and MLOps to Y participants]"],
  },
  {
    kind: "Development",
    title: "[AI Engineer]",
    org: "[Company]",
    period: "[2022 — Present]",
    points: [
      "[Built and shipped an LLM-powered product used by N users]",
      "[Designed RAG pipelines and evaluation harnesses]",
    ],
  },
];

/** The guided self-learning program. */
export const program = {
  name: "[Program Name]",
  summary:
    "A guided self-learning program on industry-approved applied AI engineering roadmaps. You learn on a clear daily plan, ship real work every week, and get it reviewed by an expert — so you never study in the dark.",
  steps: [
    {
      title: "Industry roadmap",
      body: "Start from a roadmap shaped by what AI teams actually hire for — not a random playlist.",
    },
    {
      title: "Weekly modules",
      body: "Each week is one focused theme with a clear outcome and a project to ship.",
    },
    {
      title: "Daily modules",
      body: "Bite-sized daily tasks: read, build, reflect. Steady progress, no overwhelm.",
    },
    {
      title: "Weekly expert review",
      body: "Every week you present your work and get direct, honest feedback from me.",
    },
  ],
  tracks: [
    "Python & software foundations for AI",
    "Machine learning essentials",
    "LLMs, prompting & structured outputs",
    "RAG systems & vector search",
    "AI agents & tool use",
    "Evaluation, deployment & LLMOps",
  ],
  faqs: [
    {
      q: "Who is this for?",
      a: "Students and working engineers who want to move into applied AI engineering and need structure, accountability and expert feedback.",
    },
    {
      q: "How much time does it take?",
      a: "[Around 1–2 hours a day]. Daily modules are designed to fit around college or work.",
    },
    {
      q: "Is it live classes?",
      a: "No. It is guided self-learning: you follow the roadmap at your own pace each day, and we meet for a live expert review every week.",
    },
    {
      q: "What do I need to start?",
      a: "[Basic programming familiarity]. We will place you on the right starting point after your inquiry.",
    },
  ],
};

export const services = [
  {
    id: "mentoring",
    eyebrow: "For learners",
    title: "Guided AI Mentorship",
    body: "Roadmap-based self-learning with weekly expert reviews. Structured, accountable and built around real projects.",
    points: ["Industry-approved roadmap", "Weekly + daily modules", "Weekly expert review", "Portfolio-ready projects"],
    cta: { label: "Apply as a student", href: "/work-with-me?type=student" },
  },
  {
    id: "talks",
    eyebrow: "For institutions",
    title: "Expert Talks & Workshops",
    body: "Guest lectures, hands-on workshops and bootcamps on applied AI for colleges, academies and companies.",
    points: ["Guest lectures & keynotes", "Hands-on GenAI workshops", "Faculty development programs", "Hackathon mentoring & judging"],
    cta: { label: "Book a session", href: "/work-with-me?type=institution" },
  },
  {
    id: "development",
    eyebrow: "For companies",
    title: "AI Product Development",
    body: "From prototype to production: LLM applications, RAG systems, AI agents and automation that actually ship.",
    points: ["LLM & RAG applications", "AI agents & workflow automation", "Evaluation & reliability", "Full-stack delivery (Next.js, Python)"],
    cta: { label: "Start a project", href: "/work-with-me?type=project" },
  },
];

export const projects = [
  {
    slug: "project-one",
    title: "[Project One — e.g. Enterprise RAG Assistant]",
    summary: "[One line on the problem and the outcome, ideally with a number.]",
    tags: ["RAG", "LLM", "Next.js"],
    link: "",
    repo: "",
  },
  {
    slug: "project-two",
    title: "[Project Two — e.g. Multi-agent Research Workflow]",
    summary: "[One line on the problem and the outcome.]",
    tags: ["Agents", "Python", "Evaluation"],
    link: "",
    repo: "",
  },
  {
    slug: "project-three",
    title: "[Project Three — e.g. Learner Progress Platform]",
    summary: "[One line on the problem and the outcome.]",
    tags: ["Full-stack", "Postgres", "AI"],
    link: "",
    repo: "",
  },
  {
    slug: "project-four",
    title: "[Project Four — e.g. Document Intelligence Pipeline]",
    summary: "[One line on the problem and the outcome.]",
    tags: ["OCR", "Extraction", "FastAPI"],
    link: "",
    repo: "",
  },
];

export const skills = [
  "Python", "PyTorch", "LLMs", "RAG", "LangGraph", "Agents", "Vector DBs",
  "FastAPI", "Next.js", "TypeScript", "Postgres", "Docker", "Evaluation", "MLOps",
];

export const nav = [
  { label: "About", href: "/about" },
  { label: "Mentorship", href: "/mentorship" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
];
