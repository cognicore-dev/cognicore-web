/* All static copy for the landing page lives here so components stay presentational. */

export interface NavLink {
  href: string;
  label: string;
}

export interface Capability {
  num: string;
  name: string;
  desc: string;
}

export interface ProcessStep {
  tag: string;
  title: string;
  body: string;
}

export interface WorkItem {
  glyph: string;
  title: string;
  label: string;
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export type TerminalTone = "prompt" | "success" | "info" | "stat";

/** One coloured run of text inside a terminal line. */
export interface TerminalSegment {
  tone?: TerminalTone;
  text: string;
}

/** A terminal line is a list of segments; an empty array renders a blank line. */
export type TerminalLine = TerminalSegment[];

export type DemoTab = "write" | "install";

export const navLinks: NavLink[] = [
  { href: "#capabilities", label: "What it does" },
  { href: "#process", label: "How it works" },
  { href: "#work", label: "See it work" },
  { href: "#demo", label: "Demo" },
];

export const heroStats = [
  { value: "03", label: "AGENTS SUPPORTED" },
  { value: "LOCAL", label: "MEMORY MODEL" },
  { value: "2026", label: "IN DEVELOPMENT" },
];

export const marqueeFeatures = ["MEMORY THAT PERSISTS", "WORKS WITH EVERY AGENT", "ZERO RE-EXPLAINING"];

export const marqueeTools = ["CURSOR", "AIDER", "CLAUDE CODE", "CODEX", "WINDSURF", "VS CODE"];

export const capabilities: Capability[] = [
  { num: "01", name: "Shared memory", desc: "One memory layer every connected agent reads and writes to." },
  { num: "02", name: "Cross-agent sync", desc: "What Aider learns at 9am, Claude Code knows at 9:05." },
  {
    num: "03",
    name: "Local-first storage",
    desc: "Memory lives on your machine by default. Nothing leaves unless you say so.",
  },
  { num: "04", name: "Branch-aware recall", desc: "Memory tracks which repo, branch, and commit it belongs to." },
];

export const processSteps: ProcessStep[] = [
  {
    tag: "STEP 01",
    title: "Write",
    body: "An agent learns something — a convention, a decision, a gotcha — and writes it to the shared memory layer instead of its own throwaway context.",
  },
  {
    tag: "STEP 02",
    title: "Sync",
    body: "Every connected agent reads from the same memory, instantly, across tools and terminals.",
  },
  {
    tag: "STEP 03",
    title: "Persist",
    body: "Close the terminal. Restart the machine. Switch tools entirely. The memory holds.",
  },
];

export const workItems: WorkItem[] = [
  { glyph: "CS", title: "Cursor Sync", label: "REAL-TIME" },
  { glyph: "CR", title: "Cross-Agent Recall", label: "MULTI-TOOL" },
  { glyph: "BA", title: "Branch-Aware Memory", label: "GIT-SCOPED" },
  { glyph: "LF", title: "Local-First Store", label: "ON-DEVICE" },
];

export const demoTabs: { id: DemoTab; label: string }[] = [
  { id: "write", label: "WRITE + SYNC" },
  { id: "install", label: "INSTALL" },
];

export const terminalScripts: Record<DemoTab, TerminalLine[]> = {
  write: [
    [{ tone: "prompt", text: "$ " }, { text: 'agent write --memory "auth uses JWT, refresh tokens live in httpOnly cookies"' }],
    [{ tone: "success", text: "✓ written to cognicore // scope: repo:sellerflow, branch:main" }],
    [],
    [{ tone: "prompt", text: "$ " }, { text: "agent switch --tool aider" }],
    [{ tone: "info", text: "→ aider connected // 4 memory nodes loaded" }],
    [{ tone: "prompt", text: "aider > " }, { text: '"I see auth uses JWT with httpOnly refresh cookies. Continuing from there."' }],
    [],
    [{ tone: "prompt", text: "$ " }, { text: "agent recall --scope repo:sellerflow" }],
    [{ tone: "stat", text: "3 memories · 2 agents · last sync 4s ago" }],
  ],
  install: [
    [{ tone: "prompt", text: "$ " }, { text: "npm install -g cognicore" }],
    [{ tone: "success", text: "✓ cognicore installed globally" }],
    [],
    [{ tone: "prompt", text: "$ " }, { text: "cognicore setup" }],
    [{ tone: "info", text: "→ detecting agents on this machine..." }],
    [{ tone: "success", text: "✓ found: cursor, aider, claude code" }],
    [{ tone: "success", text: "✓ memory layer linked to all 3" }],
    [],
    [{ tone: "prompt", text: "$ " }, { text: "cognicore status" }],
    [{ tone: "stat", text: "memory layer active · 0 nodes · ready" }],
  ],
};

export const footerColumns: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { href: "#process", label: "How it works" },
      { href: "#capabilities", label: "What it does" },
      { href: "#demo", label: "Demo" },
    ],
  },
  {
    heading: "Community",
    links: [
      { href: "#", label: "GitHub" },
      { href: "#", label: "r/LocalLLaMA" },
      { href: "#", label: "Discord" },
    ],
  },
  {
    heading: "Early access",
    links: [
      { href: "#waitlist", label: "Join waitlist" },
      { href: "#", label: "Follow updates" },
    ],
  },
];
