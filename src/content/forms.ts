export type FieldDef = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "date" | "number" | "select" | "textarea";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  full?: boolean;
};

export type InquiryType = "student" | "institution" | "project";

export const inquiryForms: Record<
  InquiryType,
  { tab: string; title: string; blurb: string; submit: string; fields: FieldDef[] }
> = {
  student: {
    tab: "Join as a student",
    title: "Apply for the mentorship",
    blurb: "Tell me where you are and where you want to go. I'll reply with orientation details and how to get started.",
    submit: "Send application",
    fields: [
      { name: "name", label: "Full name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "WhatsApp / phone", type: "tel", required: true },
      { name: "status", label: "Current status", type: "select", required: true, options: ["College student", "Working professional", "Career switcher", "Other"] },
      { name: "org", label: "College / company", type: "text" },
      { name: "level", label: "Current AI / coding level", type: "select", required: true, options: ["Beginner — new to coding", "Some Python, new to AI", "Comfortable with ML basics", "Already building with LLMs"] },
      { name: "source", label: "Where did you find me?", type: "select", options: ["Instagram", "YouTube", "LinkedIn", "Friend / referral", "Other"] },
      { name: "hours", label: "Which plan suits you?", type: "select", required: true, options: ["Full-time — 8 hours a day", "Working learner — 4 hours a day", "Not sure yet"] },
      { name: "goal", label: "What do you want to achieve?", type: "textarea", required: true, full: true, placeholder: "e.g. land an AI engineer role, build my own AI product, upskill at work…" },
    ],
  },
  institution: {
    tab: "Book an expert talk",
    title: "Invite me to your institution",
    blurb: "Expert talks, hands-on workshops, bootcamps, faculty programs and hackathons — online or on campus.",
    submit: "Send booking request",
    fields: [
      { name: "name", label: "Your name", type: "text", required: true },
      { name: "email", label: "Official email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel", required: true },
      { name: "institution", label: "Institution / organisation", type: "text", required: true },
      { name: "institutionType", label: "Type", type: "select", required: true, options: ["College / university", "Academy / training institute", "Company", "Student club / community", "Other"] },
      { name: "engagement", label: "Engagement", type: "select", required: true, options: ["Expert talk / guest lecture", "Hands-on workshop", "Multi-day bootcamp", "Faculty development program", "Hackathon mentor / judge", "Other"] },
      { name: "mode", label: "Mode", type: "select", required: true, options: ["In person", "Online", "Hybrid"] },
      { name: "date", label: "Preferred date", type: "date" },
      { name: "audience", label: "Expected audience size", type: "number", placeholder: "e.g. 120" },
      { name: "city", label: "City", type: "text" },
      { name: "details", label: "Topic & details", type: "textarea", required: true, full: true, placeholder: "Audience background, topic you have in mind, duration, any budget or honorarium details…" },
    ],
  },
  project: {
    tab: "Hire me for a project",
    title: "Start an AI project",
    blurb: "Share what you're building. I'll come back within [2 working days] with questions or a proposal.",
    submit: "Send project brief",
    fields: [
      { name: "name", label: "Your name", type: "text", required: true },
      { name: "email", label: "Work email", type: "email", required: true },
      { name: "company", label: "Company", type: "text" },
      { name: "projectType", label: "What do you need?", type: "select", required: true, options: ["LLM / GenAI application", "RAG / knowledge assistant", "AI agents & automation", "Full-stack product with AI", "AI consulting / architecture review", "Full-time or contract role", "Other"] },
      { name: "budget", label: "Budget range", type: "select", options: ["Under ₹1L", "₹1L – ₹5L", "₹5L – ₹15L", "₹15L+", "Not sure yet"] },
      { name: "timeline", label: "Timeline", type: "select", options: ["ASAP", "Within 1 month", "1–3 months", "Flexible"] },
      { name: "description", label: "Project description", type: "textarea", required: true, full: true, placeholder: "The problem, who it's for, what exists today, and what success looks like." },
    ],
  },
};

export const inquiryTypes = Object.keys(inquiryForms) as InquiryType[];
