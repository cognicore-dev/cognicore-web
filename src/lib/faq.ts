/* Questions and answers, shown on the page and emitted as FAQPage JSON-LD from the same array, so the two
   can never disagree. Answers are plain text. Facts come from cognicore-env (README, PRIVACY.md, docs/). */
import { license, mcp, site } from "@/lib/site";

export type Faq = { q: string; a: string };

/** The four on the home page. */
export const homeFaqs: Faq[] = [
  {
    q: "Do I need to know how to code?",
    a: "No. Connecting CogniCore to Claude or ChatGPT is done in the app's settings: you paste one link and sign in. The terminal setup is only for people using coding agents.",
  },
  {
    q: "Why do I sign in with Google or GitHub?",
    a: "Signing in gives each person a private, separate memory without us storing passwords. With Google we receive only your Google account ID; with GitHub, only your GitHub ID and username. The two are separate CogniCore accounts and are never linked.",
  },
  {
    q: "What does it cost?",
    a: `CogniCore is free and open source under the ${license.name}. Claude and ChatGPT may need a plan that allows custom connectors or apps; the setup guide notes which.`,
  },
  {
    q: "Isn't this the same as the memory built into ChatGPT or Claude?",
    a: "Built-in memory stays inside one app. CogniCore is shared: what you save in Claude is there in ChatGPT, Claude Code and Codex too, and you can see and delete exactly what's stored.",
  },
];

/** The full list on /faq. */
export const faqs: Faq[] = [
  {
    q: "What is CogniCore?",
    a: "CogniCore is an open-source memory layer for AI apps and coding agents. In Claude, ChatGPT and other MCP apps you save and recall memories through a hosted connector. In Claude Code and Codex, a local plugin saves each session automatically and gives the next one a short brief of the goal, open tasks, decisions and exact values.",
  },
  {
    q: "Which apps does it work with?",
    a: "Claude (claude.ai, the desktop app and mobile), ChatGPT with developer mode, Claude Code, Codex, Cursor, VS Code and any other app that supports remote MCP servers. Everything you save is shared across the apps you connect with the same sign-in.",
  },
  {
    q: "Do I need a vector database or an API key?",
    a: "No. The plugin stores memory in local SQLite and searches it with full-text search (BM25), and the hosted server uses BM25 over your own entries, with no embedding service. Semantic search is optional, through the [memory] extra of the Python package.",
  },
  {
    q: "Where is my data stored?",
    a: "With the Claude Code and Codex plugin, memory stays on your computer in ~/.cognicore/mcp unless you turn on sync with cognicore login. With the hosted connector, your memories are kept in a separate database for your account on servers run by our hosting provider, currently Microsoft Azure in South Korea.",
  },
  {
    q: "How do I delete my memories?",
    a: "Ask your AI app to forget a memory, which uses the cognicore_forget tool. To delete or export everything on the hosted server, email contact@cognicoree.tech and we act within 30 days. For local memory, delete the ~/.cognicore/mcp folder.",
  },
  {
    q: "How is it different from the memory built into ChatGPT or Claude?",
    a: "Built-in memory stays inside the app that provides it. CogniCore is shared between apps: what you save in Claude is there in ChatGPT, Claude Code, Codex and Cursor, and you can list, inspect and delete exactly what is stored.",
  },
  {
    q: "Does saving a session call an AI model?",
    a: "No. The plugin's hooks save each Claude Code or Codex session from the agent's own transcript with rules, not model calls. AI compression of long sessions is optional. If you sync sessions to the hosted server, it may send the redacted handoff (not the transcript) to Sarvam AI to shorten it.",
  },
  {
    q: "What does the plugin read from my sessions?",
    a: "What you and the agent said, plus the paths of edited files. It never reads tool output, file contents or the model's thinking, and it redacts detected secrets before saving.",
  },
  {
    q: "Can I host it myself?",
    a: "Yes. The hosted server is the same open-source code, and docs/remote-mcp-server.md in the repository covers deploying it with Docker Compose. For memory with no server at all, use the local plugin or the local MCP server in the Python package.",
  },
  {
    q: "What license is CogniCore under?",
    a: `The ${license.name}. The source is at github.com/cognicore-dev/cognicore-env and the package is cognicore-env on PyPI.`,
  },
  {
    q: "What does the hosted service collect?",
    a: "Your sign-in ID (a Google account ID, or a GitHub user ID and username), what you ask it to remember, and server logs that are deleted after 14 days. We do not sell your data, show ads, use analytics trackers or use your data to train AI models.",
  },
  {
    q: "Which tools does the hosted server have?",
    a: `${mcp.tools} tools in six groups: memory and sessions, experiences, Figma, ElevenLabs preferences, Cognitive Fabric, and an experimental marketplace with no real money involved. Each tool is labelled as read, write, delete or external, so your app can ask before it runs.`,
  },
  {
    q: "What do I need to install the coding-agent plugin?",
    a: `Python ${site.pythonVersions} on Windows, macOS or Linux, and pipx or uv. Run pipx install "cognicore-env[mcp]" and then cognicore install, which sets up Claude Code and Codex.`,
  },
  {
    q: "Does it work offline?",
    a: "The plugin's memory is local, so saving and resuming work offline. With sync on, uploads run in the background and the download at session start gives up after 3 seconds.",
  },
];
