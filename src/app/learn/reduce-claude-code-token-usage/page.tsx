import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { GuideLayout, guideBySlug } from "@/components/aeo/GuideLayout";
import { TokenBars } from "@/components/aeo/TokenBars";
import { Callout, DocSection, Table } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { bench, install, links, nextRelease } from "@/lib/site";

const guide = guideBySlug("reduce-claude-code-token-usage");

export const metadata: Metadata = pageMetadata({
  title: guide.title,
  description: guide.description,
  path: `/learn/${guide.slug}`,
  type: "article",
});

const toc = [
  { id: "where", label: "Where tokens go" },
  { id: "measure", label: "Measure it" },
  { id: "clear", label: "When to /clear" },
  { id: "brief", label: "How small the brief is" },
  { id: "overhead", label: "CogniCore's own cost" },
  { id: "benchmark", label: "Benchmark" },
];

const c = (s: string) => <code>{s}</code>;
const { claudeToClaude, claudeToCodex } = bench.handoff.newTokens;

export default function TokenUsageGuide() {
  return (
    <GuideLayout
      guide={guide}
      toc={toc}
      answer={
        <>
          Run <code>cognicore usage</code> to see, from Claude Code&apos;s own transcripts, how many tokens each project
          processes and how much context a long session resends every turn. Then start fresh with <code>/clear</code>:
          CogniCore has already saved the session, and the new one begins from a brief of a few hundred tokens instead
          of the old context.
        </>
      }
    >
      <DocSection id="where" title="Where do Claude Code's tokens go?">
        <p>Two places dominate:</p>
        <ul>
          <li>
            <strong>Startup context:</strong> what the first turn receives before you&apos;ve typed much, such as the
            system prompt, tools, MCP servers, {c("CLAUDE.md")} and any start-of-session brief.
          </li>
          <li>
            <strong>Final context:</strong> everything the conversation has accumulated. Continuing a long session
            resends it with every turn.
          </li>
        </ul>
        <p>
          So the longer a session runs, the more each new turn costs, even when you only need a fraction of what came
          before.
        </p>
      </DocSection>

      <DocSection id="measure" title="How do I see my own Claude Code token usage?">
        <p>
          {c("cognicore usage")} reads Claude Code&apos;s transcripts ({c("~/.claude/projects")}), which record the
          token usage of every model turn. It makes no model calls and sends nothing. It ships in the{" "}
          {nextRelease.label}; it&apos;s on the repository&apos;s {c("main")} branch now.
        </p>
        <CodeBlock
          code={`cognicore usage              # last 30 days
cognicore usage --days 7     # a shorter window
cognicore usage --json       # sessions and projects as JSON`}
        />
        <p>Per project it shows:</p>
        <Table
          head={["Column", "What it means"]}
          rows={[
            ["Sessions, turns", "How many sessions and model turns"],
            ["Input", "Input tokens processed over the sessions: fresh, cache reads and cache writes"],
            ["Startup", "What the first turn received"],
            ["Context", "What the last turn received, so what continuing resends every turn"],
            ["Brief", "The size of CogniCore's brief for that project today"],
            ["Saving after /clear", "context − (startup + brief), per turn"],
          ]}
        />
      </DocSection>

      <DocSection id="clear" title="When should I use /clear?">
        <p>
          When the final context is much larger than startup plus the brief, and the next task doesn&apos;t need the
          whole conversation. {c("cognicore usage")} prints that difference as the per-turn saving.
        </p>
        <p>
          With CogniCore installed you don&apos;t lose the thread: the Stop hook saves after every reply, and the new
          session starts with the goal, open tasks, decisions and exact values. Anything the brief leaves out is still
          searchable with {c("cognicore_recall")}.
        </p>
        <CodeBlock code={`${install.pipx}\n${install.setup}`} />
        <p>
          On {c("main")}, the Stop hook also tells you when a session resends a large context every turn and suggests{" "}
          {c("/clear")}. {c("COGNICORE_CLEAR_AT=0")} turns that message off.
        </p>
      </DocSection>

      <DocSection id="brief" title="How small is the session brief?">
        <p>
          In the {bench.handoff.date} benchmark it was {bench.handoff.briefTokens} tokens. The budget is set by{" "}
          {c("COGNICORE_RESUME_TOKENS")}; in the {nextRelease.label} its default drops from 1,000 to{" "}
          {nextRelease.briefBudget} tokens, and the brief shows at most 10 open tasks so decisions still fit. The rest
          are counted in a &ldquo;More available&rdquo; line and can be fetched on demand.
        </p>
        <p>A project with no history gets no brief at all, so CogniCore adds nothing to sessions in new projects.</p>
      </DocSection>

      <DocSection id="overhead" title="How many tokens does CogniCore itself add per turn?">
        <p>
          Because the hooks save and resume on their own, the plugin&apos;s MCP server loads one tool,{" "}
          {c("cognicore_recall")}. That&apos;s about 230 tokens per turn including its instructions; the earlier set of
          6 tools used about 1,240. Set {c("COGNICORE_TOOLSETS=memory,session")} if you want the save, resume and
          remember tools as well, at a higher per-turn cost.
        </p>
      </DocSection>

      <DocSection id="benchmark" title="What did the benchmark measure?">
        <p>
          On {bench.handoff.date}, the repository ran {bench.handoff.setup}. Each task was two sessions: session 1 did
          part of the work, its transcript was moved out of reach, and session 2 had to finish a deferred follow-up and
          answer 8 questions. Both systems did every follow-up. New tokens, counting background model work:
        </p>
        <TokenBars
          groups={[
            {
              title: "Claude Code → Claude Code",
              bars: [
                { label: "CogniCore", value: claudeToClaude.cognicore, highlight: true },
                { label: "claude-mem", value: claudeToClaude.claudeMem },
              ],
            },
            {
              title: "Claude Code → Codex",
              bars: [
                { label: "CogniCore", value: claudeToCodex.cognicore, highlight: true },
                { label: "claude-mem", value: claudeToCodex.claudeMem },
              ],
            },
          ]}
          caption={`Exact figures: ${claudeToClaude.cognicore.toLocaleString("en-US")} vs ${claudeToClaude.claudeMem.toLocaleString("en-US")}, and ${claudeToCodex.cognicore.toLocaleString("en-US")} vs ${claudeToCodex.claudeMem.toLocaleString("en-US")}. claude-mem 15.7.0, three tasks, one run each.`}
        />
        <Callout title="Where the result is weaker">
          It&apos;s a small sample: three small tasks, one run each, Sonnet only, on one machine. claude-mem summarizes
          every tool call in the background, which costs the tokens above but is likely an advantage on long, messy
          sessions this test doesn&apos;t cover. Neither system&apos;s Codex hooks were run by Codex itself.
        </Callout>
        <p>
          <a href={links.docs.transferAudit} target="_blank" rel="noreferrer">
            Method and full results in docs/transfer-audit.md
          </a>
          .
        </p>
      </DocSection>
    </GuideLayout>
  );
}
