// Case study pages. Each one shows up at /projects/<slug>.
// Anything wrapped in [square brackets] shows as a "To add" placeholder on the page.
// Never use client names here: describe the business instead.

import type { StaticImageData } from "next/image";

// Screenshots live in /public/case-studies/<slug>/. To swap one, replace the file and keep its name.
import leadIntake01 from "../../public/case-studies/ai-lead-intake/01-intake-overview.png";
import leadIntake02 from "../../public/case-studies/ai-lead-intake/02-future-intent.png";
import leadIntake03 from "../../public/case-studies/ai-lead-intake/03-red-escalation.png";
import leadIntake04 from "../../public/case-studies/ai-lead-intake/04-quote.png";
import leadIntake05 from "../../public/case-studies/ai-lead-intake/05-servicem8.png";
import leadIntake06 from "../../public/case-studies/ai-lead-intake/06-chat.png";

export type FlowNode = {
  id: string;
  label: string;
  icon: FlowIcon;
  x: number; // centre of the node, in px (each slide is 680px wide)
  y: number; // centre of the node's box, in px
  highlight?: boolean; // accent border, for the AI steps
  end?: boolean; // shows as a small "END" pill instead of a box
  w?: number; // width, for wide cards (default 56)
  items?: string[]; // turns the node into a card listing these items
  note?: string; // small line at the bottom of a card
};

export type FlowIcon =
  | "inbox"
  | "user-check"
  | "sparkles"
  | "split"
  | "car"
  | "home"
  | "building"
  | "target"
  | "flame"
  | "bell"
  | "calendar"
  | "clock"
  | "star"
  | "webhook"
  | "zap"
  | "search"
  | "tag"
  | "plus"
  | "bot"
  | "message"
  | "alert"
  | "users"
  | "flow";

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  status?: string;
  meta: { label: string; value: string }[];
  tags: string[];
  problem: { needed: string[]; broken: string[] };
  sections: { title: string; text: string }[];
  flow: {
    // Each part is one "screen" of the diagram; the + button slides to the next.
    parts: string[];
    height: number;
    nodes: FlowNode[];
    // [from, to] or [from, to, branch label]
    edges: ([string, string] | [string, string, string])[];
  };
  limits: { limit: string; fix: string }[];
  integration: {
    intro: string;
    steps: { from: string; to: string; what: string }[];
    notes: string[];
  };
  video?: string; // Loom share link; leave empty to show a placeholder
  // Imported images: their real size is read automatically, so a replaced file always shows uncropped.
  screenshots: { image?: StaticImageData; caption: string; note?: string }[];
  results: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "ai-lead-intake",
    title: "AI Lead Intake System",
    summary:
      "A full GoHighLevel setup for an Australian window tinting company. An AI agent qualifies every new enquiry and routes it to the right sales pipeline across three divisions, and the follow-ups, bookings and reviews run on their own.",
    status: "Ongoing",
    meta: [
      { label: "Client", value: "Window tinting company, Australia" },
      { label: "My role", value: "Automation Engineer, all build work" },
      { label: "Timeline", value: "[Start month] 2026 – present" },
      { label: "Divisions", value: "Automotive, Residential, Commercial" },
    ],
    tags: ["GoHighLevel", "Conversation AI", "Workflows", "Custom fields", "Webhooks", "ServiceM8"],
    problem: {
      needed: [
        "Enquiries come in for three very different divisions, and each needs its own sales process.",
        "The team wanted every lead answered fast, without anyone quoting prices too early.",
        "Bookings, reminders and reviews were handled by hand.",
      ],
      broken: [
        "The AI agent existed but had zero real enrollments, so no lead was actually going through it.",
        "Follow-up messages had been written but were left in draft.",
        "New leads were hitting an error path instead of becoming opportunities.",
      ],
    },
    sections: [
      { title: "Lead capture", text: "Forms, calls and messages from every channel land in one place." },
      { title: "AI and nurturing", text: "The AI agent qualifies the enquiry, then follow-ups keep the lead warm." },
      { title: "Sales and quotes", text: "Separate pipelines per division, with quote follow-ups." },
      { title: "Funnels", text: "[One line on what the funnels do]" },
      { title: "Bookings", text: "Confirmations, reminders and slot-filling for open appointments." },
      { title: "Aftercare and reviews", text: "Care instructions after the job, then a review request." },
      { title: "Reactivation", text: "Reaches out to old leads and past customers." },
      { title: "Monitoring", text: "Win/loss tracking and alerts when something fails." },
      { title: "[Section 9 name]", text: "[One line on what it does]" },
    ],
    // A simplified version of the real ~100-step intake workflow, in 4 slides.
    flow: {
      parts: ["Entry and checks", "Division routing", "AI qualification", "Route by intent"],
      height: 400,
      nodes: [
        // Slide 1: entry and checks (x 0–680)
        { id: "t1", label: "Chat started", icon: "zap", x: 70, y: 100 },
        { id: "t2", label: "New or reopened enquiry", icon: "zap", x: 70, y: 250 },
        { id: "busy", label: "Open enquiry already?", icon: "search", x: 200, y: 175 },
        { id: "check", label: "AI checks the request", icon: "bot", x: 330, y: 100, highlight: true },
        { id: "handled", label: "AI replies: already handled", icon: "message", x: 460, y: 60 },
        { id: "end1", label: "END", icon: "message", x: 590, y: 60, end: true },
        { id: "tag", label: "Tag: in progress", icon: "tag", x: 460, y: 250 },
        { id: "identify", label: "Identify division", icon: "split", x: 590, y: 250 },

        // Slide 2: division routing (x 680–1360)
        { id: "auto", label: "Automotive", icon: "car", x: 750, y: 70 },
        { id: "resi", label: "Residential", icon: "home", x: 750, y: 170 },
        { id: "comm", label: "Commercial", icon: "building", x: 750, y: 270 },
        { id: "clarify", label: "AI asks to clarify", icon: "bot", x: 750, y: 360, highlight: true },
        { id: "recheck", label: "Recheck division", icon: "split", x: 880, y: 360 },
        { id: "exc1", label: "Exception workflow", icon: "alert", x: 1010, y: 360 },
        { id: "find", label: "Find opportunity", icon: "search", x: 880, y: 170 },
        { id: "setdiv", label: "Set division", icon: "tag", x: 1010, y: 90 },
        { id: "create", label: "Create opportunity", icon: "plus", x: 1010, y: 250 },
        { id: "wait", label: "Wait for save", icon: "clock", x: 1140, y: 250 },
        { id: "refind", label: "Find it again", icon: "search", x: 1270, y: 250 },

        // Slide 3: AI qualification (x 1360–2040)
        { id: "source", label: "Set lead source", icon: "tag", x: 1430, y: 170 },
        { id: "campaign", label: "Save campaign and page", icon: "inbox", x: 1550, y: 170 },
        {
          id: "details",
          label: "AI asks, then saves",
          icon: "bot",
          x: 1690,
          y: 170,
          w: 170,
          highlight: true,
          items: [
            "Service needed",
            "Goal for the job",
            "Timing",
            "Follow-up date",
            "Property type",
            "Windows / rooms",
            "Suburb",
            "Tint shade",
          ],
          note: "Residential shown · Auto 5 · Commercial 8",
        },
        { id: "trade", label: "Trade partner? Tag it", icon: "tag", x: 1840, y: 170 },
        { id: "intent", label: "AI scores intent", icon: "flame", x: 1960, y: 170, highlight: true },

        // Slide 4: route by intent (x 2040–2720)
        { id: "high", label: "Team action required", icon: "target", x: 2140, y: 80 },
        { id: "followup", label: "Move to AI follow-up", icon: "bot", x: 2140, y: 200 },
        { id: "none", label: "Intent exception", icon: "alert", x: 2140, y: 320 },
        { id: "book", label: "Drop-off, site visit or photos", icon: "calendar", x: 2270, y: 80 },
        { id: "handoff", label: "Hand off to team", icon: "users", x: 2400, y: 80 },
        { id: "prep", label: "Prepare follow-up", icon: "bot", x: 2270, y: 200 },
        { id: "start", label: "Start follow-up workflow", icon: "flow", x: 2400, y: 200 },
        { id: "untag", label: "Remove in-progress tag", icon: "tag", x: 2530, y: 200 },
        { id: "closing", label: "AI closing message", icon: "message", x: 2650, y: 200, highlight: true },
      ],
      edges: [
        ["t1", "busy"],
        ["t2", "busy"],
        ["busy", "check", "Yes"],
        ["busy", "tag", "No"],
        ["check", "handled", "Same"],
        ["check", "tag", "New"],
        ["handled", "end1"],
        ["tag", "identify"],

        ["identify", "auto"],
        ["identify", "resi"],
        ["identify", "comm"],
        ["identify", "clarify", "Unclear"],
        ["clarify", "recheck"],
        ["recheck", "exc1", "Unclear"],
        ["auto", "find"],
        ["resi", "find"],
        ["comm", "find"],
        ["find", "setdiv", "Found"],
        ["find", "create", "Not found"],
        ["create", "wait"],
        ["wait", "refind"],

        ["setdiv", "source"],
        ["refind", "source"],
        ["source", "campaign"],
        ["campaign", "details"],
        ["details", "trade"],
        ["trade", "intent"],

        ["intent", "high", "High"],
        ["intent", "followup", "Med/Low/Future"],
        ["intent", "none", "None"],
        ["high", "book"],
        ["book", "handoff"],
        ["followup", "prep"],
        ["prep", "start"],
        ["handoff", "untag"],
        ["start", "untag"],
        ["none", "untag"],
        ["untag", "closing"],
      ],
    },
    limits: [
      {
        limit: "This workflow can't write to contact-level fields, but trade partner status has to live on the contact.",
        fix: "The intake adds a tag instead. A separate sync workflow fires on that tag, updates the contact field, then removes the tag.",
      },
      {
        limit: "GoHighLevel didn't find a newly created opportunity straight away.",
        fix: "I added a Wait step before finding it again. If it's still missing after that, the lead goes to an exception workflow instead of getting lost.",
      },
      {
        limit: "One person can have more than one enquiry, for example a car tint now and their house later.",
        fix: "When an open enquiry already exists, the AI checks if this is the same request or a new one, so each request gets its own opportunity.",
      },
    ],
    integration: {
      intro:
        "ServiceM8 is the job management software the team uses on site. I connected it to GoHighLevel with a custom webhook, so jobs and bookings stay in sync without anyone copying details across.",
      steps: [
        {
          from: "GoHighLevel",
          to: "ServiceM8",
          what: "Creates the work order. It checks for an existing job first, so nothing is created twice, and reuses the customer if they already exist.",
        },
        { from: "ServiceM8", to: "GoHighLevel", what: "Calendar mirror: job times show on the GoHighLevel calendar" },
      ],
      notes: [
        "If anything fails, or a job has been deleted in ServiceM8, the team gets a task to review it.",
      ],
    },
    video: "",
    screenshots: [
      {
        image: leadIntake01,
        caption:
          "Top of the main intake flow: returning-customer checks, then the split into each division's own questions.",
      },
      {
        image: leadIntake02,
        caption:
          "When a customer who said \"later\" comes back sooner, an AI step reassesses their intent. If they're now ready, it marks them urgent, stops the follow-ups and hands them to the team.",
      },
      {
        image: leadIntake03,
        caption:
          "When a customer raises something a person should handle, like a complaint, a warranty problem or price negotiation, the AI sets a priority, pauses, notifies the team and creates a task for them.",
      },
      {
        image: leadIntake04,
        caption:
          "After a quote is sent, an AI check reads the conversation before every follow-up and decides whether to send it now, wait or stop.",
        note: "If a deal is closed or accepted while it's waiting, the next check finds nothing open and the follow-ups stop on their own.",
      },
      {
        image: leadIntake05,
        caption:
          "Creates the work order in ServiceM8 through a custom webhook. It checks for an existing job first so nothing is created twice, reuses the customer if they already exist, and alerts the team if anything fails.",
      },
      {
        image: leadIntake06,
        caption:
          "A real test conversation with the AI agent, next to the workflow's execution log showing every step it ran behind the scenes.",
      },
    ],
    results: [
      "Restored opportunity creation across all three divisions.",
      "Every part was tested against official test scenarios before it was marked done.",
      "The client approved my simplification proposals section by section.",
      "[A number, if you have one: e.g. leads routed per week, response time]",
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
