/* Every external URL and fact the site repeats lives here, so a change is made once.
   Source of truth: https://github.com/cognicore-dev/cognicore-env */

export const site = {
  name: "CogniCore",
  url: "https://www.cognicoree.tech",
  tagline: "Memory that follows you between AI apps",
  description:
    "CogniCore gives Claude, ChatGPT and coding agents like Claude Code and Codex a shared memory, so every new chat picks up where the last one stopped.",
  version: "0.11.0",
} as const;

export const links = {
  github: "https://github.com/cognicore-dev/cognicore-env",
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
    tools: "https://github.com/cognicore-dev/cognicore-env/blob/main/docs/mcp-tools.md",
    remote: "https://github.com/cognicore-dev/cognicore-env/blob/main/docs/remote-mcp-server.md",
    transferAudit:
      "https://github.com/cognicore-dev/cognicore-env/blob/main/docs/transfer-audit.md#head-to-head-with-claude-mem-on-current-versions-2026-11-01",
    benchmarks: "https://github.com/cognicore-dev/cognicore-env/tree/main/benchmarks",
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
} as const;

export const nav = [
  { href: "/connect", label: "Connect" },
  { href: "/developers", label: "Developers" },
  { href: "/developers#benchmarks", label: "Benchmarks" },
] as const;
