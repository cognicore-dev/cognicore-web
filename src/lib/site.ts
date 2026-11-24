/* Every external URL and fact the site repeats lives here, so a change is made once.
   Source of truth: https://github.com/cognicore-dev/cognicore-env */

export const site = {
  name: "CogniCore",
  url: "https://www.cognicoree.tech",
  tagline: "Memory that follows you between AI apps",
  description:
    "CogniCore gives Claude, ChatGPT and coding agents like Claude Code and Codex a shared memory, so every new chat picks up where the last one stopped.",
  /** Latest release on PyPI, and its date (CHANGELOG.md). */
  version: "0.13.0",
  releaseDate: "2026-11-11",
  /** Date the site's content was last checked against the repository. */
  contentUpdated: "2026-11-24",
  pythonVersions: "3.10, 3.11 or 3.12",
  operatingSystems: "Windows, macOS, Linux",
} as const;

/** LICENSE in cognicore-env. */
export const license = {
  name: "Apache License 2.0",
  short: "Apache 2.0",
  spdx: "Apache-2.0",
  url: "https://www.apache.org/licenses/LICENSE-2.0",
} as const;

export const links = {
  github: "https://github.com/cognicore-dev/cognicore-env",
  githubOrg: "https://github.com/cognicore-dev",
  issues: "https://github.com/cognicore-dev/cognicore-env/issues",
  changelog: "https://github.com/cognicore-dev/cognicore-env/blob/main/CHANGELOG.md",
  license: "https://github.com/cognicore-dev/cognicore-env/blob/main/LICENSE",
  pypi: "https://pypi.org/project/cognicore-env/",
  linkedin: "https://www.linkedin.com/company/135163927/",
  email: "contact@cognicoree.tech",
  demoMp4: "https://github.com/cognicore-dev/cognicore-env/raw/main/docs/launch/kit/cognicore-demo.mp4",
  demoGif: "https://raw.githubusercontent.com/cognicore-dev/cognicore-env/main/docs/launch/kit/cognicore-demo.gif",
  libraryDemo: "https://github.com/cognicore-dev/cognicore-env/releases/download/demo-video/cognicore-demo.mp4",
  githubSignup: "https://github.com/signup",
  docs: {
    plugin: "https://github.com/cognicore-dev/cognicore-env/blob/main/plugins/cognicore/README.md",
    memoryPlugin: "https://github.com/cognicore-dev/cognicore-env/blob/main/plugins/cognicore-memory/README.md",
    tools: "https://github.com/cognicore-dev/cognicore-env/blob/main/docs/mcp-tools.md",
    remote: "https://github.com/cognicore-dev/cognicore-env/blob/main/docs/remote-mcp-server.md",
    transferAudit:
      "https://github.com/cognicore-dev/cognicore-env/blob/main/docs/transfer-audit.md#head-to-head-with-claude-mem-on-current-versions-2026-11-01",
    benchmarks: "https://github.com/cognicore-dev/cognicore-env/tree/main/benchmarks",
    longMemEval: "https://github.com/cognicore-dev/cognicore-env/blob/main/docs/benchmarks.md",
    neverTwice: "https://github.com/cognicore-dev/cognicore-env/tree/main/skills/never-twice",
    examples: "https://github.com/cognicore-dev/cognicore-env/tree/main/examples",
    contributing: "https://github.com/cognicore-dev/cognicore-env/blob/main/CONTRIBUTING.md",
    privacySource: "https://github.com/cognicore-dev/cognicore-env/blob/main/PRIVACY.md",
  },
} as const;

/** The hosted MCP server that Claude, ChatGPT and other apps connect to. */
export const mcp = {
  url: "https://mcp.cognicoree.tech/mcp/stream",
  health: "https://mcp.cognicoree.tech/health",
  tools: 31,
  signIn: "Google or GitHub",
} as const;

/** Install commands, exactly as the README and plugins/cognicore/README.md give them. */
export const install = {
  pipx: `pipx install "cognicore-env[mcp]"   # or: uv tool install "cognicore-env[mcp]"`,
  setup: "cognicore install                   # sets up Claude Code and Codex",
  pluginMarketplace: "/plugin marketplace add cognicore-dev/cognicore-env",
  plugin: "/plugin install cognicore@cognicore-beta-marketplace",
  memoryPlugin: "/plugin install cognicore-memory@cognicore-beta-marketplace",
  library: "pip install cognicore-env",
} as const;

/**
 * Measured figures, each from the repository's own benchmark write-ups. Keep the setup next to the number
 * wherever it is shown.
 */
export const bench = {
  /** docs/transfer-audit.md, "Head-to-head with claude-mem on current versions (2026-11-01)". */
  handoff: {
    date: "2026-11-01",
    setup:
      "three small coding tasks, one run each, on Claude Code 2.1.316 (Sonnet), Codex CLI 0.164 and claude-mem 15.7.0",
    briefTokens: "380–510",
    briefTokensApprox: "~450",
    claudeMemBriefTokens: "1,050–1,110",
    newTokensRange: "53k–60k",
    claudeMemNewTokensRange: "147k–216k",
    readyAfter: "~1 second",
    claudeMemReadyAfter: "70–130 seconds",
    /** New tokens including background model work, Claude Code → Claude Code and Claude Code → Codex. */
    newTokens: {
      claudeToClaude: { cognicore: 52_609, claudeMem: 215_888 },
      claudeToCodex: { cognicore: 60_310, claudeMem: 146_520 },
    },
    questions: "24 / 24",
  },
  /** docs/transfer-audit.md, "Real-world comparison with claude-mem (Claude Code, 2026-10-31)". */
  noMemory: { date: "2026-10-31", questions: "8 / 24", followUps: "0 / 3", withHooks: "24 / 24" },
  /** README.md, LongMemEval strict R@5. */
  longMemEval: [
    { window: "5 chunks", baseline: "78.8%", multiHop: "85.2%", delta: "+6.4" },
    { window: "10 chunks", baseline: "87.2%", multiHop: "92.8%", delta: "+5.6" },
    { window: "20 chunks", baseline: "95.0%", multiHop: "95.0%", delta: "—" },
  ],
  /** plugins/cognicore/README.md: per-turn cost of the plugin's MCP server. */
  pluginToolTokens: "~230",
} as const;

/**
 * On main and in CHANGELOG.md under "Unreleased", so not yet in the PyPI release. Pages label these "next release".
 * Move an item out of here once a release ships it.
 */
export const nextRelease = {
  label: "next release",
  briefBudget: 700,
  projectContextTokens: 300,
} as const;

export const guides = [
  {
    slug: "claude-code-memory",
    title: "How to give Claude Code memory across sessions",
    short: "Claude Code memory",
    description:
      "Install two commands and every new Claude Code session starts from a short brief of the last one: the goal, open tasks, decisions and exact values.",
    updated: "2026-11-24",
  },
  {
    slug: "memory-without-vector-database",
    title: "AI memory without a vector database",
    short: "No vector database",
    description:
      "How CogniCore stores and searches agent memory with SQLite full-text search and BM25, what the LongMemEval numbers show, and where lexical search falls short.",
    updated: "2026-11-24",
  },
  {
    slug: "reduce-claude-code-token-usage",
    title: "Cut Claude Code token use",
    short: "Cut token use",
    description:
      "Measure where your Claude Code tokens go with cognicore usage, then start fresh with /clear and a small session brief instead of resending a long context.",
    updated: "2026-11-24",
  },
  {
    slug: "built-in-memory-vs-cognicore",
    title: "Built-in AI memory vs a shared memory layer",
    short: "Built-in vs shared memory",
    description:
      "The difference between the memory inside one AI app and a memory layer that Claude, ChatGPT, Claude Code, Codex and Cursor share, and how to inspect and delete it.",
    updated: "2026-11-24",
  },
] as const;

export type Guide = (typeof guides)[number];

export const nav = [
  { href: "/connect", label: "Connect" },
  { href: "/developers", label: "Developers" },
  { href: "/developers#benchmarks", label: "Benchmarks" },
  { href: "/learn", label: "Guides" },
] as const;

/** Every page, for the sitemap and llms.txt. `updated` is when its content last changed. */
export const pages = [
  { path: "", title: "Home", updated: "2026-11-24" },
  { path: "/connect", title: "Connect CogniCore to Claude and ChatGPT", updated: "2026-11-24" },
  { path: "/developers", title: "Developer documentation", updated: "2026-11-24" },
  { path: "/faq", title: "Frequently asked questions", updated: "2026-11-24" },
  { path: "/learn", title: "Guides", updated: "2026-11-24" },
  ...guides.map((g) => ({ path: `/learn/${g.slug}`, title: g.title, updated: g.updated })),
  { path: "/privacy", title: "Privacy policy", updated: "2026-11-24" },
] as const;
