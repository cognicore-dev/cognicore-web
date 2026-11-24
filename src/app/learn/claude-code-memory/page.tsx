import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";
import { GuideLayout, guideBySlug } from "@/components/aeo/GuideLayout";
import { HandoffDiagram } from "@/components/aeo/HandoffDiagram";
import { DocSection, Step, Steps, Table } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { bench, install, links, nextRelease } from "@/lib/site";

const guide = guideBySlug("claude-code-memory");

export const metadata: Metadata = pageMetadata({
  title: guide.title,
  description: guide.description,
  path: `/learn/${guide.slug}`,
  type: "article",
});

const toc = [
  { id: "why-forget", label: "Why it forgets" },
  { id: "install", label: "Install" },
  { id: "what-it-sees", label: "What the next session sees" },
  { id: "failed-fixes", label: "Failed fixes" },
  { id: "projects", label: "Which project" },
  { id: "other-agents", label: "Codex and claude.ai" },
  { id: "results", label: "Measured results" },
  { id: "privacy", label: "What it reads" },
];

const c = (s: string) => <code>{s}</code>;

export default function ClaudeCodeMemoryGuide() {
  return (
    <GuideLayout
      guide={guide}
      toc={toc}
      answer={
        <>
          Install CogniCore with <code>pipx install &quot;cognicore-env[mcp]&quot;</code> and{" "}
          <code>cognicore install</code>; its hooks save each Claude Code session from the transcript when it ends, with
          no model calls. The next session in that project starts with a short brief of the goal, open tasks, decisions
          with their reasons and exact values like ticket IDs and versions.
        </>
      }
    >
      <DocSection id="why-forget" title="Why does Claude Code forget between sessions?">
        <p>
          Every new session starts from zero. Close Claude Code after a day of debugging and the next session asks the
          same questions, walks into the same dead ends and proposes fixes that were already rejected. The transcript
          records what was said, not what was tried, what failed and what worked.
        </p>
        <p>
          CogniCore keeps that context for you. Its plugin hooks into Claude Code (and Codex), so saving and resuming
          happen without you or the agent calling anything.
        </p>
      </DocSection>

      <DocSection id="install" title="How do I add memory to Claude Code?">
        <p>You need Python 3.10, 3.11 or 3.12 on Windows, macOS or Linux, and pipx or uv.</p>
        <div data-reveal="words" className="steps-stagger">
          <Steps>
            <Step title="Install the package and the hooks">
              <CodeBlock code={`${install.pipx}\n${install.setup}`} />
            </Step>
            <Step title="Restart Claude Code">
              <p>
                That&apos;s all for Claude Code. In Codex, run {c("/hooks")} once and trust the three CogniCore hooks.
              </p>
            </Step>
            <Step title="Work as usual">
              <p>
                When a session ends, it&apos;s saved. When the next one starts in the same project, the brief is
                injected before your first message.
              </p>
            </Step>
          </Steps>
        </div>
        <p>Prefer to install from inside Claude Code? After the {c("pipx")} line, run:</p>
        <CodeBlock label="claude code" code={`${install.pluginMarketplace}\n${install.plugin}`} />
      </DocSection>

      <DocSection id="what-it-sees" title="What does the next session actually see?">
        <p>
          A brief, sized to a token budget, with the most important items first: the goal, where things stand, open
          tasks, decisions with their reasons, and exact values such as IDs, versions, paths and error codes, kept
          verbatim. The agent can ask for more sections when it needs them, and the plugin&apos;s one MCP tool,{" "}
          {c("cognicore_recall")}, searches everything the brief leaves out.
        </p>
        <p>
          In the {bench.handoff.date} benchmark the brief was {bench.handoff.briefTokens} tokens. In the{" "}
          {nextRelease.label}, the default budget is {nextRelease.briefBudget} tokens, and you can pin what must be
          right as project context in {c(".cognicore/context.md")}, which every brief reads first:
        </p>
        <CodeBlock
          code={`cognicore project set goal "Ship the billing export"
cognicore project add decision "Use Decimal for money" --why "finance requires commercial rounding"
cognicore project add rule "Never commit keys"`}
        />
        <p>
          The file is plain Markdown at the repository root, so you can edit it, review it in pull requests and roll it
          back with git. To see what&apos;s stored in your local memory, open the read-only viewer:
        </p>
        <CodeBlock code="python -m cognicore.memory.viewer   # http://127.0.0.1:37780" />
      </DocSection>

      <DocSection id="failed-fixes" title="Does it remember fixes that didn't work?">
        <p>
          Yes. A sentence like &ldquo;we tried X but it doesn&apos;t work&rdquo; is saved as a rejected approach, and
          rejected decisions come back in the brief, so the next session doesn&apos;t retry them.
        </p>
        <HandoffDiagram />
        <p>
          For mistakes you want checked before every similar task, record a lesson. {c("check")} prints at most 3
          matching lessons in about 200 tokens, and nothing when none match:
        </p>
        <CodeBlock
          code={`cognicore lesson add --mistake "npm install broke the lockfile" --fix "use pnpm" --why "the repo uses pnpm" --when "installing packages"
cognicore lesson check "add axios"`}
        />
      </DocSection>

      <DocSection id="projects" title="Which project does a session belong to?">
        <p>
          A session is filed under its git repository&apos;s top-level folder, whichever subfolder it ran in, and every{" "}
          {c("git worktree")} of a repository counts as the same project. Outside a repository, it&apos;s the folder the
          session started in, even if the agent later {c("cd")}s elsewhere. A repository at your home folder (dotfiles)
          doesn&apos;t count.
        </p>
      </DocSection>

      <DocSection id="other-agents" title="Does it carry over to Codex or claude.ai?">
        <p>
          Yes. Work saved in Claude Code resumes in Codex, and the other way round; {c("cognicore install")} sets up
          both. To share it with claude.ai, Claude Desktop and mobile, sign in once:
        </p>
        <CodeBlock code="cognicore login" />
        <p>
          Only the redacted handoff is uploaded, never the transcript, and nothing leaves your machine until you sign
          in. See{" "}
          <Link href="/connect" className="text-brand underline underline-offset-[3px]">
            Connect
          </Link>{" "}
          for the Claude and ChatGPT side.
        </p>
      </DocSection>

      <DocSection id="results" title="How well does it work?">
        <p>
          The repository measured it on three small coding tasks, each run as two real Claude Code sessions: session 1
          does part of the work and defers a follow-up, its transcript is moved out of reach, and session 2 must finish
          the follow-up and answer 8 questions.
        </p>
        <Table
          head={["Run", "Questions right", "Follow-ups done"]}
          rows={[
            [`No memory (${bench.noMemory.date})`, bench.noMemory.questions, bench.noMemory.followUps],
            [`CogniCore hooks (${bench.noMemory.date})`, bench.noMemory.withHooks, "3 / 3"],
            [`CogniCore hooks, rerun (${bench.handoff.date})`, bench.handoff.questions, "3 / 3"],
          ]}
        />
        <p>
          In the {bench.handoff.date} rerun, claude-mem 15.7.0 also did every follow-up, but used{" "}
          {bench.handoff.claudeMemNewTokensRange} new tokens including its background summarizing, against{" "}
          {bench.handoff.newTokensRange} for CogniCore. The limits: three small tasks, one run each, Sonnet only, on one
          machine. claude-mem observes every tool call, which is likely an advantage on long, messy sessions this test
          doesn&apos;t cover.{" "}
          <a href={links.docs.transferAudit} target="_blank" rel="noreferrer">
            Method and full results
          </a>
          .
        </p>
      </DocSection>

      <DocSection id="privacy" title="What does it read, and where is it stored?">
        <ul>
          <li>Memory stays on your computer in {c("~/.cognicore/mcp")} (SQLite), unless you turn on sync.</li>
          <li>
            It keeps what you and the agent said, plus the paths of edited files. It never reads tool output, file
            contents or the model&apos;s thinking.
          </li>
          <li>Detected secrets are redacted before saving.</li>
          <li>
            To remove it: {c("cognicore setup codex --remove")} for Codex, {c("/plugin uninstall cognicore")} in Claude
            Code, and delete {c("~/.cognicore/mcp")} to delete the memory itself.
          </li>
        </ul>
      </DocSection>
    </GuideLayout>
  );
}
