/* Builds /llms.txt and /llms-full.txt from site.ts and faq.ts, so they change whenever the site does. */
import { faqs } from "@/lib/faq";
import { bench, guides, install, license, links, mcp, site } from "@/lib/site";

const abs = (path: string) => `${site.url}${path}`;

function header() {
  return `# ${site.name}

> ${site.description} Open source under the ${license.name}. Current release: ${site.version} on PyPI (${site.releaseDate}).`;
}

function keyLinks() {
  return `## Key links

- [Connect to Claude, ChatGPT and other apps](${abs("/connect")}): paste one link and sign in with ${mcp.signIn}
- [Developer documentation](${abs("/developers")}): plugin, hosted MCP server, Python library, benchmarks, CLI
- [FAQ](${abs("/faq")})
- [Privacy policy](${abs("/privacy")})
- [Source on GitHub](${links.github})
- [Package on PyPI](${links.pypi})
- [Hosted MCP tool reference](${links.docs.tools}): all ${mcp.tools} tools
- [Changelog](${links.changelog})`;
}

function guideList() {
  return `## Guides

${guides.map((g) => `- [${g.title}](${abs(`/learn/${g.slug}`)}): ${g.description}`).join("\n")}`;
}

function setup() {
  return `## Connect

- Claude, ChatGPT, Cursor, VS Code or any app with remote MCP servers: add a custom connector with the URL ${mcp.url} and sign in with ${mcp.signIn}.
- Claude Code and Codex (Python ${site.pythonVersions}):

\`\`\`bash
${install.pipx}
${install.setup}
\`\`\`

Then restart Claude Code. In Codex, run /hooks once and trust the three CogniCore hooks. Optional sync with claude.ai, Desktop and mobile: cognicore login.

- Claude Code only, from inside Claude Code:

\`\`\`
${install.pluginMarketplace}
${install.plugin}
\`\`\``;
}

export function llmsTxt() {
  return [header(), keyLinks(), setup(), guideList()].join("\n\n") + "\n";
}

export function llmsFullTxt() {
  const facts = `## Facts

- Memory for the Claude Code and Codex plugin stays on your computer in ~/.cognicore/mcp (SQLite) unless you turn on sync.
- Saving a session makes no model calls: hooks capture it from the agent's own transcript.
- No vector database, embedding server or API key is needed. Search is full-text (BM25).
- The hosted server has ${mcp.tools} MCP tools, and each account gets its own database.
- Measured on ${bench.handoff.date} (${bench.handoff.setup}): the brief at the next session start was ${bench.handoff.briefTokens} tokens, memory was ready ${bench.handoff.readyAfter} after a session ended, and the 3-task benchmark used ${bench.handoff.newTokensRange} new tokens including background work. Method: ${links.docs.transferAudit}
- LongMemEval strict R@5, multi-hop adapter vs zero-shot baseline: ${bench.longMemEval
    .map((r) => `${r.window} ${r.multiHop} vs ${r.baseline}`)
    .join("; ")}. At 20 chunks brute force catches up.`;

  const faq = `## Frequently asked questions

${faqs.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}`;

  return [header(), keyLinks(), setup(), facts, guideList(), faq].join("\n\n") + "\n";
}
