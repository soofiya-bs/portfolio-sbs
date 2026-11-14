/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT — edit everything about you in this one file.
 *  Anything wrapped in [brackets] is a placeholder to replace.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Soofiya Binth Shajahan",
  shortName: "SB",
  role: "Applied AI Engineer · Mentor · Founder",
  tagline: "Applied AI Engineer helping self-learners through guided self-learning.",
  description:
    "Soofiya Binth Shajahan is an applied AI engineer and mentor pursuing a BS at IIT Madras. Guided self-learning in applied AI engineering, expert AI sessions for institutions, and LLM applications and AI automation for companies.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  email: "work.with.soofiya.bs@gmail.com",
  /** WhatsApp number in international format, digits only (country code first). */
  whatsapp: "919495389547",
  whatsappMessage: "Hi Soofiya, I found your website and would like to know more.",
  /**
   * Free 15-min call booking link (Cal.com / Calendly). Leave empty to hide the
   * "Book a free call" buttons; paste your link here to show them everywhere.
   */
  bookingUrl: "",
  /**
   * Resume PDF for recruiters, e.g. "/resume.pdf" (put the file in /public).
   * Leave empty to hide the "Download resume" buttons.
   */
  resumeUrl: "",
  location: "Hyderabad · Kerala, India",
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
    "AI automation",
    "IIT Madras",
    "Soofiya Binth Shajahan",
    "AI engineer Hyderabad",
    "AI trainer Kerala",
  ],
  /** Empty links are hidden automatically. */
  socials: {
    instagram: "https://www.instagram.com/soofiya.bs/",
    youtube: "" /* add your YouTube URL */,
    linkedin: "https://www.linkedin.com/in/soofiya-binth-shajahan/",
    github: "" /* add your GitHub URL */,
  },
};

export const stats = [
  { value: "6,900+", label: "Learners on Instagram" },
  { value: "6,000+", label: "Followers on LinkedIn" },
  { value: "15+", label: "Live projects" },
  { value: "12+", label: "Countries my students come from" },
  { value: "4+", label: "Years of mentoring & development" },
  { value: "4", label: "Active platforms" },
  { value: "4+", label: "Countries worked with" },
];

/** Short first-person bio paragraphs, used on the About page. */
export const bio = [
  "I'm an applied AI engineer focused on building practical AI applications, automation systems and useful developer tools. I'm pursuing a BS in Programming and Applications at IIT Madras, and I bring experience across software development, Python, technical education and community building.",
  "My current focus is turning real workflows into useful AI products — from LLM applications and automation to retrieval-based systems, agentic workflows and Python APIs. I like taking an unclear problem, building a simple working solution, and improving it through testing, feedback and iteration.",
  "Teaching has been the other half of my work since 2023: lecturing in computer programming and mathematics, training polytechnic students in Python and AI, and now helping 6,900+ self-learners on Instagram and 6,000+ followers on LinkedIn understand applied AI engineering. Delivering AI sessions and consultations has taught me to translate technical ideas into practical solutions for non-technical people.",
];

export const education = [
  {
    school: "Indian Institute of Technology Madras",
    degree: "BS in Programming and Applications",
    period: "2023 — 2029",
    note: "Currently pursuing. Building applied AI and software engineering depth alongside full-time work.",
  },
];

export const experience = [
  {
    kind: "Development",
    title: "Head of Artificial Intelligence",
    org: "Made For Easy",
    period: "Jun 2023 — Present · Kochi",
    points: [
      "Lead AI product work at Made For Easy.",
      "Built the Skillage Assessment Tracker (about 600 active users, with voice-message updates for leadership) and an AI Resume Evaluator — both in use at Skillage Academy.",
    ],
  },
  {
    kind: "Training",
    title: "Content Creator — AI Engineering",
    org: "Instagram",
    period: "May 2026 — Present",
    points: ["Create Instagram content on AI engineering and software engineering for 6,900+ followers, making the concepts easy to learn for tech aspirants."],
  },
  {
    kind: "Development",
    title: "Lead of Technical and Growth",
    org: "CortexIntel (United Kingdom)",
    period: "Jan 2026 — Jun 2026",
    points: [],
  },
  {
    kind: "Training",
    title: "Mathematics Specialist",
    org: "90+ My Tuition App (UAE)",
    period: "Mar 2025 — Apr 2026",
    points: [],
  },
  {
    kind: "Business",
    title: "Business Development Executive",
    org: "Brototype",
    period: "Aug 2025 — Feb 2026 · Kochi",
    points: ["Joined as an intern and was promoted to Business Development Executive."],
  },
  {
    kind: "Training",
    title: "AI & Python Internship Trainer",
    org: "Cozmek Pvt Ltd · Govt Model Polytechnic College, Vatakara",
    period: "Jun 2025 — Aug 2025",
    points: [
      "Trained final-year Electronics students in Python and AI basics through hands-on sessions and structured modules.",
      "Guided real-world mini projects applying AI to electronics use cases.",
    ],
  },
  {
    kind: "Training",
    title: "Lead Tutor — Mathematics",
    org: "Knowlix Learning",
    period: "Dec 2023 — Aug 2025",
    points: ["Delivered IGCSE and CBSE mathematics sessions for students across India and the GCC, and ran occasional teacher training."],
  },
  {
    kind: "Training",
    title: "Mathematics Teacher",
    org: "Escola International School",
    period: "Jun 2024 — Mar 2025",
    points: ["Class 10 in-charge and high school coordinator for the inter-school arts competition."],
  },
  {
    kind: "Training",
    title: "Lead Lecturer — Computer Programming, CS & Mathematics",
    org: "Wadi Twaiba Girls Residential College",
    period: "Jul 2023 — Jun 2024 · Ernakulam",
    points: ["Mathematics and computer programming faculty, full-stack trainer and course coordinator."],
  },
];

export const writing = [
  { title: "What is Agentic AI and AI Agents?", href: "" },
  { title: "What Is Docker? The Real Problem It Solves for Applied AI Engineers", href: "" },
  { title: "Building Your Personal Brand on LinkedIn as an Applied AI Engineer", href: "" },
];

export const certifications = [
  "Claude Code 101 — Anthropic",
  "Claude 101 — Anthropic",
  "Introduction to Claude Cowork — Anthropic",
  "Ganitha Garima",
  "HackerRank Gold Badge (5 Star) — Problem Solving",
  "Workshop on Python Programming",
  "Modern Mathematical Methods and High Performance Computing in Science & Engineering",
  "Short Term Training Program on Algebra and Analysis",
];

/** SBS Personal Mentoring — from the Program Guide for Prospective Learners. */
export const program = {
  name: "SBS Personal Mentoring",
  summary:
    "A one-to-one, self-paced mentoring program in Applied AI and Agentic AI, with a MERN + AI direction. You follow a structured weekly roadmap, learn from carefully chosen online resources, and meet for a review every seventh day — so your self-learning has structure and direction.",
  steps: [
    {
      title: "Orientation",
      body: "Learn how the program works, how to approach self-learning, and get your first week's day-by-day roadmap.",
    },
    {
      title: "Days 1–6: learn & practise",
      body: "Work through the assigned topics with recommended resources, plus short activities to practise communication.",
    },
    {
      title: "Report progress",
      body: "Share your work and progress regularly, so your learning stays visible and on track.",
    },
    {
      title: "Day 7: review",
      body: "A live one-to-one review on Google Meet to discuss your progress — sometimes with an industry expert.",
    },
  ],
  glance: [
    { k: "Format", v: "One-to-one mentoring" },
    { k: "Learning model", v: "Self-paced, with a weekly roadmap and guidance" },
    { k: "Focus", v: "Applied AI & Agentic AI — MERN + AI direction" },
    { k: "Weekly rhythm", v: "6 days of guided learning, review on day 7" },
    { k: "Daily commitment", v: "8 hours (full-time) · 4 hours (working learners)" },
    { k: "Live sessions", v: "Google Meet" },
  ],
  join: {
    title: "Interested in joining? Let's talk.",
    body: "Every learner starts from a different place, so we begin with a conversation. Send an inquiry and I'll share the orientation details, how the program fits your goals, and everything you need to get started.",
  },
  tracks: [
    "Programming foundations",
    "MERN stack: MongoDB, Express, React, Node.js",
    "LLM applications & prompting",
    "Adding AI features to full-stack apps",
    "AI agents & automation",
    "Building & deploying full-stack AI products",
  ],
  included: [
    "A structured weekly roadmap, with a day-by-day plan",
    "Guidance on what to learn, how to organise it, and which online resources to use",
    "Weekly one-to-one review sessions",
    "Optional doubt-clearing sessions when you need focused help",
  ],
  notIncluded: [
    "Recorded tutorial videos — learning uses recommended external resources and your own practice",
    "Placement assistance or a job guarantee",
    "A promise of a fixed time to become industry-ready",
  ],
  faqs: [
    {
      q: "Who can join?",
      a: "The program is open to learners at different starting points. There is no fixed programming or technology prerequisite — your roadmap and pace are discussed during orientation so the plan matches you.",
    },
    {
      q: "How much time does it take?",
      a: "Full-time learners are expected to commit eight hours a day. Working learners are expected to commit four hours a day.",
    },
    {
      q: "Are there live classes or recorded videos?",
      a: "Neither. It is guided self-learning: you follow the roadmap using recommended online resources, and we meet live on Google Meet for your weekly review and any doubt-clearing sessions you book.",
    },
    {
      q: "How do I join?",
      a: "Send an inquiry through the Work With Me page, email, or a DM on Instagram. I'll get back to you with orientation details, program fees and the next steps.",
    },
    {
      q: "Do you offer placement or a job guarantee?",
      a: "No. The program gives you a structured, industry-oriented learning path and honest feedback, but it does not include placement assistance or promise a particular job or outcome.",
    },
  ],
};

export const services = [
  {
    id: "mentoring",
    eyebrow: "For learners",
    title: "SBS Personal Mentoring",
    body: "One-to-one, self-paced learning in Applied AI & Agentic AI (MERN + AI), on a weekly roadmap with a review every seventh day.",
    points: ["One-to-one mentoring", "Weekly roadmap, day-by-day plan", "Day-7 review on Google Meet", "Contact to join"],
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
    points: ["LLM & RAG applications", "AI agents & workflow automation", "Python APIs & databases (PostgreSQL)", "Full-stack delivery (React, Node.js)"],
    cta: { label: "Start a project", href: "/work-with-me?type=project" },
  },
];

export type Project = {
  slug: string;
  title: string;
  meta?: string;
  /** e.g. "Live" or "Launching soon" — shown as a badge */
  status?: string;
  summary: string;
  /** concrete results, shown as a checklist */
  highlights?: string[];
  tags: string[];
  link: string;
  repo: string;
};

export const projects: Project[] = [
  {
    slug: "skillage",
    title: "Skillage Assessment Tracker",
    meta: "Made For Easy · In use at Skillage Academy",
    status: "Live",
    summary:
      "An AI-integrated web platform for training institutes to assign, evaluate and rank learner work — replacing manual tracking across the academic department.",
    highlights: [
      "About 600 active users",
      "Reduced the academic department's manual workload",
      "Heads of department and the CEO get progress updates as voice messages",
    ],
    tags: ["AI", "EdTech", "Voice", "Full-stack"],
    link: "https://skillage-assessment-tracker.vercel.app/",
    repo: "",
  },
  {
    slug: "resumeai",
    title: "AI Resume Evaluator",
    meta: "Made For Easy · In use at Skillage Academy",
    status: "Live",
    summary:
      "An AI system that evaluates student resumes against target roles and gives clear, actionable feedback — used by Skillage Academy for both student coaching and hiring.",
    highlights: [
      "In daily use at Skillage Academy",
      "Evaluates student resumes and suggests improvements",
      "Supports the academy's hiring process",
    ],
    tags: ["LLM", "Document analysis", "Full-stack"],
    link: "https://resumeai-soofiya.vercel.app/",
    repo: "",
  },
  {
    slug: "evermi",
    title: "Evermi — AI-Powered Beauty & Skincare Platform",
    meta: "Made For Easy · Oct 2026 — Present · Full production build in progress",
    status: "MVP live",
    summary:
      "Taking a beauty and skincare startup from MVP to a production-grade e-commerce platform — with Mia, a voice-enabled AI shopping assistant that recommends products grounded in the store's own catalog.",
    highlights: [
      "Mia AI assistant: talk or type about skin concerns and routines, with speech-to-text input and natural voice replies",
      "Recommendations and ingredient answers come only from approved product records — no made-up claims",
      "Full store: catalog with ingredients and routines, search and filters, cart, wishlist, checkout and order tracking",
      "Admin dashboard for sales, orders and catalog, plus Razorpay / Stripe payments, email and courier integrations",
    ],
    tags: ["Voice AI", "LLM", "E-commerce", "Full-stack", "Payments"],
    link: "https://mhakaie.vercel.app/",
    repo: "",
  },
  {
    slug: "made-for-easy-health",
    title: "Made For Easy — Digital Health Records",
    meta: "Made For Easy · Healthcare",
    summary:
      "A centralised digital health records platform that brings a patient's records, doctor appointments and lab tests together in one secure place.",
    highlights: [
      "Doctor appointment booking and lab test scheduling in one flow",
      "Encrypted storage for sensitive medical records",
      "Real-time updates with Socket.IO and online payments with Stripe",
    ],
    tags: ["MERN", "Socket.IO", "Stripe", "Healthcare"],
    link: "",
    repo: "",
  },
  {
    slug: "knowlix-platform",
    title: "Knowlix Learning Platform",
    meta: "E-learning",
    summary: "An e-learning platform connecting students with educational institutions, with demo access and course management.",
    tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    link: "",
    repo: "",
  },
  {
    slug: "ember-upgrade",
    title: "Legacy Ember.js Upgrade for a Danish Client",
    meta: "Client project · Denmark",
    summary: "Upgraded a legacy codebase to the latest Ember.js and modernised the UI/UX for better performance.",
    tags: ["Ember.js", "Node.js", "PostgreSQL"],
    link: "",
    repo: "",
  },
];

export const skills = [
  "Python", "LLM applications", "RAG", "AI agents", "AI automation", "Python APIs",
  "PostgreSQL", "Database design", "Docker", "Claude Code", "React", "Node.js",
  "TypeScript", "Java", "Spring Boot", "AWS",
];

/** wa.me link with an optional pre-filled message */
export function whatsappLink(message?: string) {
  const text = encodeURIComponent(message ?? site.whatsappMessage);
  return `https://wa.me/${site.whatsapp}?text=${text}`;
}

export const nav = [
  { label: "About", href: "/about" },
  { label: "Mentorship", href: "/mentorship" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Tutorials", href: "/tutorials" },
  { label: "Hire me", href: "/hire" },
];

/** Extra links shown only in the footer */
export const footerNav = [{ label: "Gallery", href: "/gallery" }];

/* ─────────────────────────────────────────────────────────────
 *  TESTIMONIALS & GALLERY
 *  Entries with `sample: true` are placeholders: they show while you run
 *  `npm run dev` (with a "Sample" badge) and are hidden on the live site.
 *  Replace them with real ones and delete the `sample` line.
 * ───────────────────────────────────────────────────────────── */

export const showSamples = process.env.NODE_ENV !== "production";

export type Testimonial = {
  quote: string;
  name: string;
  /** e.g. "Final-year B.Tech student" or "Head of CSE, ABC College" */
  role: string;
  /** who it's from — controls which pages show it */
  category: "student" | "institution" | "client";
  /** optional photo in /public/testimonials/ */
  photo?: string;
  /** where the face is in the photo, e.g. "60% 31%" (default "50% 34%") */
  photoFocus?: string;
  /** how far to zoom into the face (default 1.7) */
  photoZoom?: number;
  sample?: boolean;
};

/**
 * Add real testimonials here (with permission). The sections on Home, Mentorship
 * and Services stay hidden until this list has at least one entry. Example:
 *
 *   {
 *     quote: "…",
 *     name: "Learner name",
 *     role: "Final-year B.Tech student · SBS Personal Mentoring",
 *     category: "student",           // "student" | "institution" | "client"
 *     photo: "/testimonials/name.jpg", // optional
 *   },
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "What I love about Soofiya is that she first understood my background, then she understood my goals, and then she helped me achieve what I want. I came from a 7+ year graphic design background — now I am building agents and working as an Agentic AI Engineer.",
    name: "Abdul Masood",
    role: "Agentic AI Student · SBS Personal Mentoring · UAE",
    category: "student",
  },
  {
    quote:
      "You never make us feel hesitant to ask questions. You patiently listen to our doubts, clarify them, and help us understand things better. You are not just a mentor to me — you are like an elder sister who stands beside me, encourages me, and guides me whenever I need support. … Your guidance gives me more clarity, confidence, and motivation to keep learning and improving.",
    name: "Hasna Fidha",
    role: "Applied AI Student · SBS Personal Mentoring",
    category: "student",
    photo: "/testimonials/hasna-fidha.webp",
  },
  {
    quote:
      "Learning from Soofiya Ma'am has been a great experience. Ma'am's knowledge of AI Engineering, simple teaching approach, and constant guidance make Ma'am an inspiring mentor. Truly grateful for the guidance, support, and valuable lessons.",
    name: "Muhammed Aslam",
    role: "Applied AI Student · SBS Personal Mentoring",
    category: "student",
    photo: "/testimonials/muhammed-aslam.jpg",
    photoFocus: "60% 31%",
    photoZoom: 2.7,
  },
  {
    quote:
      "Miss Soofiya is very professional and kind. She is very patient all the time to understand our requirements. The project delivery was on time, and everything was perfect.",
    name: "Rishad",
    role: "Client · Evermi",
    category: "client",
  },
];

export type GalleryItem = {
  /** image in /public/gallery/ — leave empty on samples */
  src?: string;
  alt: string;
  caption: string;
  category: "Workshops" | "Mentoring" | "Talks & Events" | "Behind the scenes";
  /** the image's real pixel size (keeps the layout stable while loading) */
  width: number;
  height: number;
  sample?: boolean;
};

export const gallery: GalleryItem[] = [
  {
    src: "/gallery/learners-at-skillage.jpg",
    alt: "Soofiya Binth Shajahan teaching a full classroom of learners with laptops at Skillage Digital Academy",
    caption: "A full house of learners at Skillage Digital Academy",
    category: "Talks & Events",
    width: 2000,
    height: 1333,
  },
  {
    src: "/gallery/expert-session-skillage.jpg",
    alt: "Soofiya Binth Shajahan speaking in front of a large screen during a session at Skillage Digital Academy",
    caption: "Expert session at Skillage Digital Academy",
    category: "Talks & Events",
    width: 2000,
    height: 1333,
  },
  {
    src: "/gallery/hands-on-lab-session.jpg",
    alt: "Soofiya Binth Shajahan guiding students at their computers during a hands-on lab",
    caption: "Guiding students through a hands-on lab",
    category: "Workshops",
    width: 1200,
    height: 1600,
  },
  {
    src: "/gallery/talk-at-skillage.jpg",
    alt: "Soofiya Binth Shajahan explaining a concept to learners during a talk",
    caption: "Explaining a concept during a live session",
    category: "Talks & Events",
    width: 2000,
    height: 1333,
  },
  {
    src: "/gallery/prompting-workshop-whiteboard.jpg",
    alt: "Soofiya Binth Shajahan teaching a workshop, with context and constraints written on the whiteboard",
    caption: "Prompting workshop: context, constraints and output formats",
    category: "Workshops",
    width: 960,
    height: 1280,
  },
  {
    src: "/portrait.jpg",
    alt: "Soofiya Binth Shajahan at work",
    caption: "At work",
    category: "Behind the scenes",
    width: 1280,
    height: 1280,
  },
];

export const visibleTestimonials = (category?: Testimonial["category"]) =>
  testimonials.filter((t) => (showSamples || !t.sample) && (!category || t.category === category));

export const visibleGallery = () => gallery.filter((g) => showSamples || !g.sample);

/* ─────────────────────────────────────────────────────────────
 *  HIRING & PACKAGES
 * ───────────────────────────────────────────────────────────── */

/** Organisations I've built for or taught with — shown as a "worked with" strip. */
export const workedWith = [
  "Skillage Academy",
  "Made For Easy",
  "CortexIntel (UK)",
  "Brototype",
  "90+ My Tuition (UAE)",
  "Govt Model Polytechnic College",
  "Knowlix Learning",
  "Escola International School",
];

/** The recruiter-facing summary on /hire. Only verified facts. */
export const hire = {
  headline: "Applied AI engineer who ships — and explains it clearly.",
  lead:
    "I build production AI: LLM applications, retrieval-based systems, voice AI and automations that real teams use every day. I'm open to Applied AI Engineer / AI Developer roles — remote or on-site in Kerala and Hyderabad — and to selected contract work.",
  roles: ["Applied AI Engineer", "AI Developer", "LLM / GenAI Engineer", "AI Automation Engineer"],
  facts: [
    { k: "Open to", v: "Remote & on-site roles · Kerala · Hyderabad" },
    { k: "Education", v: "BS in Programming and Applications, IIT Madras (ongoing)" },
    { k: "Experience", v: "4+ years across AI development and technical training" },
    { k: "Current", v: "Head of Artificial Intelligence, Made For Easy" },
  ],
  impact: [
    { metric: "~600", label: "active users on the Skillage Assessment Tracker I built — it cut the academic team's manual work" },
    { metric: "2", label: "AI products in daily use at Skillage Academy, including a resume evaluator used in hiring" },
    { metric: "15+", label: "live projects shipped, from MVPs to production platforms" },
    { metric: "Voice AI", label: "built Mia, a speech-enabled shopping assistant grounded in a product catalog (Evermi)" },
  ],
  skills: [
    { group: "AI & LLMs", items: ["LLM applications", "RAG & retrieval", "AI agents", "Voice AI (speech-to-text / text-to-speech)", "Prompt design & evaluation", "AI automation"] },
    { group: "Backend & data", items: ["Python", "Python APIs", "Node.js", "Java · Spring Boot", "PostgreSQL", "Database design"] },
    { group: "Frontend & cloud", items: ["React", "TypeScript", "Full-stack delivery", "Docker", "AWS", "Claude Code"] },
  ],
  strengths: [
    { t: "End-to-end ownership", d: "From scoping and architecture to a deployed product that users rely on — not just a notebook demo." },
    { t: "Clear communicator", d: "Years of teaching mean I can explain AI decisions to engineers, founders and non-technical stakeholders." },
    { t: "Product-minded", d: "As Head of AI, I think in outcomes: less manual work, faster decisions, measurable usage." },
    { t: "Fast learner, IIT-trained", d: "Studying at IIT Madras alongside full-time work — comfortable picking up new tools and domains quickly." },
  ],
};

/** Productized offers for companies. No prices — every project gets a written quote. */
export const packages = [
  {
    name: "AI Automation Sprint",
    for: "Teams drowning in a repetitive manual process",
    timeline: "1–2 weeks",
    outcome: "One manual workflow turned into an AI-powered one, live and in use.",
    includes: ["Workflow audit & success metric", "AI automation built and deployed", "Handover, docs and a walkthrough"],
  },
  {
    name: "AI MVP Build",
    for: "Founders who need a working AI product to test with users",
    timeline: "3–6 weeks",
    outcome: "A deployed full-stack MVP with real AI features your users can try.",
    includes: ["Product scoping & architecture", "Full-stack app with LLM / RAG features", "Deployed MVP, demo and next-step roadmap"],
    featured: true,
  },
  {
    name: "Production AI Platform",
    for: "Products ready to scale beyond an MVP",
    timeline: "12–16 weeks",
    outcome: "A secure, production-grade platform — like Evermi, with a voice AI assistant.",
    includes: ["Backend architecture, database & admin dashboard", "Chat / voice AI assistant grounded in your data", "Payments, integrations, security & launch"],
  },
  {
    name: "AI Support Retainer",
    for: "Live AI products that need to stay healthy",
    timeline: "Monthly",
    outcome: "Monitoring, fixes and steady improvements, with priority support.",
    includes: ["Uptime and health monitoring", "Bug fixes, security & dependency updates", "Small enhancements each month"],
  },
];
