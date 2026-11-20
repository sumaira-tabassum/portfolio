// All the text on the home page lives here. Edit this file to change content.
// Wrap words in **double stars** to make them bold.

export const profile = {
  name: "Sumaira Tabassum",
  // The big coloured word at the top of the page and in the top bar.
  handle: "sumaira",
  role: "Automation Engineer & Full-Stack Developer",
  // The two roles that take turns on the home page.
  roles: ["Automation Engineer", "Full-Stack Developer"],
  tagline:
    "I build the automations that capture and follow up leads, and the apps that sit around them.",
  location: "Lahore, Pakistan",
  email: "sumairatabassum974@gmail.com",
  linkedin: "https://linkedin.com/in/sumaira-tabassum7",
  github: "https://github.com/sumaira-tabassum",
  // Put your resume PDF in the /public folder with this name.
  resume: "/resume.pdf",
  // Your number in international format, no spaces or +, e.g. "923001234567".
  // Fill one or both to show the icon. Empty = hidden.
  whatsapp: "923202469684", // digits only, used in wa.me links
  phone: "",
};

// Big numbers at the top of the About section. They count up from 0 when scrolled into view.
export const highlights: { value: number; suffix?: string; label: string }[] = [
  { value: 100, suffix: "+", label: "automations built" },
  { value: 2, suffix: "+", label: "years building for clients" },
  { value: 6, label: "apps shipped live" },
];

// "Why me" cards, shown after Projects and before Contact. Facts with proof, not praise.
export const reasons: { title: string; text: string }[] = [
  {
    title: "Automation and code",
    text: "When a no-code tool hits a limit, I write the missing piece myself, so a project doesn't stall waiting for a developer.",
  },
  {
    title: "Tested before handover",
    text: "Every workflow is checked against test scenarios before it goes live, so problems show up on my side, not yours.",
  },
  {
    title: "Plain-language communication",
    text: "My proposals and guides are written so non-technical clients can read them, understand them and approve them.",
  },
];

export const about = [
  "I build automations for clients based in the US, UK and Australia: lead capture, follow-ups, onboarding, and AI agents that answer enquiries and hand them to the team. So far that's **100+ automations** in **GoHighLevel**, **n8n**, **Zapier** and **ManyChat**.",
  "I started as a web developer, building apps with **React, Next.js, React Native and Node**, and I still do. So when a no-code tool can't do something, I can write the missing piece myself.",
  "I'm open to full-time roles, remote or in Lahore, and to freelance projects.",
];

export type Experience = {
  period: string;
  title: string;
  company: string;
  summary: string;
  tags: string[];
};

export const experience: Experience[] = [
  {
    period: "Jun 2026 – Present",
    title: "Automation Engineer & Full-Stack Developer",
    company: "Freelance software consultancy · Full-time · On-site · Lahore",
    summary:
      "Built and maintain 100+ automations in GoHighLevel, n8n, ManyChat, Zapier and CommentShark. Built AI agents that qualify leads and hand off to the team. Developed and tested web and mobile apps, including no-code apps in WeWeb and Base44, and wrote plain-language proposals and guides for clients.",
    tags: ["GoHighLevel", "n8n", "Zapier", "ManyChat", "AI Agents", "WeWeb", "Base44", "React Native", "PostgreSQL"],
  },
  {
    period: "Oct 2024 – Present",
    title: "Web Developer & Documentation Specialist",
    company: "Freelance · Part-time · Remote",
    summary:
      "Part-time role alongside my studies and full-time work, with a long-term client based in the UK. Built and launched their web projects, from domain setup to deployment. Wrote and organised their official business documents, including policies, procedures and course timetables.",
    tags: ["React", "Tailwind CSS", "Deployment", "Technical Writing", "Documentation"],
  },
  {
    period: "Mar – May 2026",
    title: "Full-Stack Web Development Intern",
    company: "IT Dukes · Internship · On-site · Lahore",
    summary:
      "Built full-stack web apps with Next.js, TypeScript and MongoDB, including an e-commerce app and a video-call dashboard using WebRTC. Added JWT login and role-based access. Deployed on AWS using Docker and Linux, and worked with Git workflows in a team.",
    tags: ["Next.js", "TypeScript", "MongoDB", "AWS", "Docker", "Linux", "WebRTC"],
  },
];

export type Project = {
  title: string;
  kind: "Automation" | "App";
  description: string;
  tags: string[];
  live?: string;
  code?: string;
  caseStudy?: string; // slug from caseStudies.ts → links to /projects/<slug>
  featured?: boolean; // featured projects get the wide, full-row card on the home page

  badge?: boolean; // false hides the status badge
  icon?: "gear" | "stethoscope" | "robot" | "laptop" | "mobile_phone";
  status?: string;
  // Screenshot at the top of the card, e.g. "/projects/webrtc.png" (file in public/projects/).
  // Without one, the card shows the 3D icon instead.
  image?: string;
};

// Order matters: wide card, two cards, wide card, two cards.

export const projects: Project[] = [
  {
    title: "AI Lead Intake System",
    kind: "Automation",
    description:
      "An AI agent qualifies every new enquiry for an Australian window tinting company and routes it to the right sales pipeline across three divisions. Includes a ServiceM8 integration built with custom webhooks.",
    tags: ["GoHighLevel", "Conversation AI", "Webhooks", "ServiceM8"],
    featured: true,
    icon: "gear",
    status: "Ongoing",
    caseStudy: "ai-lead-intake",
  },
  {
    title: "Client Onboarding & Investor Journeys",
    kind: "Automation",
    description:
      "About 30 GoHighLevel workflows covering two full customer journeys for a US trucking and real-estate investment business, plus comment-to-lead automation on Instagram, TikTok and YouTube.",
    tags: ["GoHighLevel", "ManyChat", "CommentShark"],
    caseStudy: "client-onboarding", // case study page not written yet
  },
  {
    title: "AI Support Agent with RAG",
    kind: "Automation",
    description:
      "A self-hosted n8n agent that answers from company documents, remembers the conversation and escalates to Slack. Extended into a 41-node sales workflow with lead scoring and PDF quotes.",
    tags: ["n8n", "RAG", "Groq", "Docker"],
    caseStudy: "ai-support-agent", // case study page not written yet
  },
  {
    title: "Health Tracking Platform",
    kind: "App",
    description:
      "Clinic CRM, React Native app and installable PWA on one Node and PostgreSQL API. I built offline sync, live updates, push notifications and English/Spanish support.",
    tags: ["React", "React Native", "Node.js", "PostgreSQL"],
    featured: true,
    icon: "stethoscope",
    caseStudy: "health-tracking", // case study page not written yet
  },
  {
    title: "WebRTC Video Dashboard",
    kind: "App",
    description:
      "Video calls for up to 6 people with guest join links, roles and live notifications. Signalling runs on Supabase Realtime.",
    tags: ["Next.js", "TypeScript", "Supabase", "WebRTC"],
    live: "https://webrtc-dashboard-one.vercel.app",
    image: "/projects/webrtc-dashboard.png", // not added yet: the card shows the 3D icon until it is
    code: "https://github.com/sumaira-tabassum/webrtc-dashboard",
  },
  {
    title: "1st Nationwide Security",
    kind: "App",
    description:
      "Responsive multi-page website for a UK security company's SIA Door Supervisor courses, with a hero slider, course pages and a contact form.",
    tags: ["React", "Vite", "Tailwind CSS"],
    live: "https://1stnationwidesecurity.netlify.app",
    image: "/projects/1st-nationwide-security.png",
    code: "https://github.com/sumaira-tabassum/1stnationwidesecurity",
  },
];

// Extra projects shown only on the /projects page (not on the home page).
export const extraProjects: Project[] = [
  {
    title: "Mind Mirror",
    kind: "App",
    description:
      "My final year project. An AI tool that compares documents by meaning, not just matching words, and shows how similar they are.",
    tags: ["React", "FastAPI", "Python", "Cohere"],
    live: "https://mindmirror-ai-pk.vercel.app",
    image: "/projects/mindmirror-ai.png",
    code: "https://github.com/sumaira-tabassum/MindMirror",
  },
  {
    title: "E-commerce App",
    kind: "App",
    description:
      "Full-stack e-commerce store built during my internship, containerised with Docker and set up for AWS deployment.",
    tags: ["React", "Node.js", "MongoDB", "Docker"],
    live: "https://ecommerce-react-app-pink-five.vercel.app",
    image: "/projects/ecommerce.png",
    code: "https://github.com/sumaira-tabassum/ecommerce-react-app",
  },
];
