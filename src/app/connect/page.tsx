import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CodeBlock, CopyField } from "@/components/CodeBlock";
import { Callout, DocLayout, PageHeader, Path, Step, Steps } from "@/components/ui";
import { links, mcp } from "@/lib/site";

export const metadata: Metadata = {
  title: "Connect CogniCore to Claude and ChatGPT",
  description:
    "Step-by-step setup for Claude (web, desktop and mobile), ChatGPT, Claude Code, Codex, Cursor and VS Code. CogniCore is coming to the Claude and ChatGPT app directories.",
};

const toc = [
  { id: "before-you-start", label: "Before you start" },
  { id: "claude", label: "Claude" },
  { id: "chatgpt", label: "ChatGPT" },
  { id: "try-it", label: "Try it" },
  { id: "coding-agents", label: "Claude Code & Codex" },
  { id: "other-apps", label: "Cursor, VS Code & others" },
  { id: "troubleshooting", label: "Troubleshooting" },
];

const pickers = [
  { id: "claude", title: "Claude", sub: "Web, desktop and mobile", time: "About 1 minute" },
  { id: "chatgpt", title: "ChatGPT", sub: "chatgpt.com", time: "About 2 minutes" },
  { id: "coding-agents", title: "Claude Code & Codex", sub: "Terminal", time: "About 2 minutes" },
];

const prompts = [
  { say: "Remember that I like short answers with bullet points.", does: "Saves a preference you'll keep everywhere." },
  { say: "Save where we are on this project so I can continue later.", does: "Saves a summary of the current chat." },
  { say: "Resume my last session.", does: "Brings back the goal, progress and next steps." },
  { say: "What do you remember about my pricing page?", does: "Searches your memory." },
  { say: "Show me everything you've saved.", does: "Lists your memories, newest first." },
  { say: "Forget the memory about my old address.", does: "Deletes that memory for good." },
];

function GuideSection({
  id,
  title,
  lead,
  children,
}: {
  id: string;
  title: string;
  lead?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-line py-14 first:border-0 first:pt-0">
      <h2 className="text-2xl font-semibold tracking-[-0.02em] text-ink">
        <a href={`#${id}`}>{title}</a>
      </h2>
      {lead && <div className="mt-3 text-[15px] leading-relaxed text-ink-2">{lead}</div>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Note({ children }: { children: ReactNode }) {
  return <p className="mt-8 text-sm leading-relaxed text-ink-3">{children}</p>;
}

export default function ConnectPage() {
  return (
    <>
      <PageHeader
        eyebrow="Setup guide"
        title="Connect CogniCore to the apps you use"
        lead="Pick your app and follow the steps. Claude and ChatGPT need no installation: you paste one link and sign in. Everything you save is shared across every app you connect."
      />

      <DocLayout toc={toc}>
        {/* Announcement */}
        <div className="rounded-2xl border border-brand/25 bg-brand-soft p-6 sm:p-7">
          <p className="text-xs font-medium uppercase tracking-wider text-brand">Coming soon</p>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.01em] text-ink">
            One-click install in Claude and ChatGPT
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
            We&apos;ve submitted CogniCore to Anthropic&apos;s Claude connector directory and to the ChatGPT app
            directory. Once they&apos;re approved, you&apos;ll be able to find CogniCore by searching inside the app and
            add it in one click. Until then, the steps below take a minute or two. They connect to the same service, so
            anything you save now will still be there after the listing goes live.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {pickers.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong"
            >
              <p className="font-medium text-ink">{p.title}</p>
              <p className="mt-0.5 text-sm text-ink-3">{p.sub}</p>
              <p className="mt-3 text-xs text-ink-3">{p.time}</p>
            </a>
          ))}
        </div>

        <div className="mt-14">
          <GuideSection
            id="before-you-start"
            title="Before you start"
            lead="For Claude and ChatGPT you need two things."
          >
            <ul className="space-y-6">
              <li>
                <p className="font-medium text-ink">A GitHub account</p>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-2">
                  CogniCore uses GitHub to sign you in, so your memory is private to you and there&apos;s no new
                  password to manage. We only read your GitHub ID and username. Don&apos;t have one?{" "}
                  <a
                    href={links.githubSignup}
                    className="text-brand underline underline-offset-[3px]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Create a free account
                  </a>{" "}
                  first.
                </p>
              </li>
              <li>
                <p className="font-medium text-ink">This connection link</p>
                <p className="mb-3 mt-1 text-[15px] leading-relaxed text-ink-2">
                  You&apos;ll paste it into Claude or ChatGPT in the steps below.
                </p>
                <CopyField value={mcp.url} className="max-w-xl" />
              </li>
            </ul>
          </GuideSection>

          <GuideSection
            id="claude"
            title="Claude"
            lead="Works on claude.ai and the Claude desktop app. Once added, it's also available in the Claude mobile app."
          >
            <Steps>
              <Step
                title={
                  <>
                    Open Claude and go to <Path>Settings › Connectors</Path>
                  </>
                }
              >
                <p>
                  On{" "}
                  <a
                    href="https://claude.ai"
                    className="text-brand underline underline-offset-[3px]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    claude.ai
                  </a>{" "}
                  or in the desktop app, click your name in the bottom-left corner, then Settings.
                </p>
              </Step>
              <Step
                title={
                  <>
                    Click <Path>Add custom connector</Path>
                  </>
                }
              >
                <p>Fill in the two fields, then click Add.</p>
                <dl className="grid max-w-xl gap-3 rounded-xl border border-line bg-surface p-4 text-sm sm:grid-cols-[110px_1fr] sm:items-center">
                  <dt className="text-ink-3">Name</dt>
                  <dd className="font-medium text-ink">CogniCore</dd>
                  <dt className="text-ink-3">Remote MCP server URL</dt>
                  <dd className="min-w-0">
                    <CopyField value={mcp.url} />
                  </dd>
                </dl>
              </Step>
              <Step title="Click Connect and sign in with GitHub">
                <p>
                  A CogniCore page opens. Continue to GitHub, click Authorize, and you&apos;ll be sent back to Claude.
                  CogniCore now shows as connected.
                </p>
              </Step>
              <Step title="Turn it on in a chat">
                <p>
                  In a new chat, open the tools menu below the message box and check that CogniCore is switched on. Then
                  try one of the{" "}
                  <a href="#try-it" className="text-brand underline underline-offset-[3px]">
                    prompts below
                  </a>
                  .
                </p>
              </Step>
            </Steps>
            <Note>
              The free Claude plan allows one custom connector. On Team and Enterprise plans, an organization owner may
              need to add CogniCore first before members can connect it.
            </Note>
          </GuideSection>

          <GuideSection
            id="chatgpt"
            title="ChatGPT"
            lead={
              <>
                Until CogniCore appears in the ChatGPT app directory, ChatGPT only accepts it with{" "}
                <strong className="font-medium text-ink">developer mode</strong> turned on. Developer mode is available
                on chatgpt.com for Plus, Pro, Business, Enterprise and Edu plans.
              </>
            }
          >
            <Steps>
              <Step title={<>Turn on developer mode</>}>
                <p>
                  On{" "}
                  <a
                    href="https://chatgpt.com"
                    className="text-brand underline underline-offset-[3px]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    chatgpt.com
                  </a>
                  , open <Path>Settings › Apps & Connectors › Advanced settings</Path> and switch on Developer mode.
                </p>
              </Step>
              <Step title={<>Create the CogniCore app</>}>
                <p>Go back to Apps & Connectors and click Create. Fill in:</p>
                <dl className="grid max-w-xl gap-3 rounded-xl border border-line bg-surface p-4 text-sm sm:grid-cols-[110px_1fr] sm:items-center">
                  <dt className="text-ink-3">Name</dt>
                  <dd className="font-medium text-ink">CogniCore</dd>
                  <dt className="text-ink-3">Description</dt>
                  <dd className="text-ink">Shared memory across my AI apps</dd>
                  <dt className="text-ink-3">MCP server URL</dt>
                  <dd className="min-w-0">
                    <CopyField value={mcp.url} />
                  </dd>
                  <dt className="text-ink-3">Authentication</dt>
                  <dd className="font-medium text-ink">OAuth</dd>
                </dl>
                <p>Confirm that you trust the app, then click Create.</p>
              </Step>
              <Step title="Sign in with GitHub">
                <p>ChatGPT opens the CogniCore sign-in page. Continue to GitHub and click Authorize.</p>
              </Step>
              <Step title="Use it in a chat">
                <p>
                  In a new chat, click <Path>+</Path> next to the message box, choose More, then pick CogniCore. ChatGPT
                  may ask you to confirm before CogniCore saves or deletes something. That&apos;s expected.
                </p>
              </Step>
            </Steps>
            <Note>
              ChatGPT renames its menus from time to time. If something looks different, look for Apps or Connectors in
              Settings.
            </Note>
          </GuideSection>

          <GuideSection
            id="try-it"
            title="Try it"
            lead="Talk to Claude or ChatGPT normally. These are good first things to say."
          >
            <div className="overflow-hidden rounded-xl border border-line bg-surface">
              <ul className="divide-y divide-line">
                {prompts.map((p) => (
                  <li key={p.say} className="grid gap-1 px-5 py-4 sm:grid-cols-[1.4fr_1fr] sm:gap-6">
                    <p className="text-[15px] text-ink">&ldquo;{p.say}&rdquo;</p>
                    <p className="text-sm text-ink-3">{p.does}</p>
                  </li>
                ))}
              </ul>
            </div>
            <Note>
              If the assistant doesn&apos;t use CogniCore on its own, mention it by name: &ldquo;Use CogniCore to
              remember…&rdquo;.
            </Note>
          </GuideSection>

          <GuideSection
            id="coding-agents"
            title="Claude Code & Codex"
            lead="The local plugin saves each session automatically when it ends and gives the next one a short brief, even if the next one runs in a different agent. Memory stays on your computer. You need Python 3.10 or newer."
          >
            <Steps>
              <Step title="Install CogniCore">
                <CodeBlock
                  code={`pipx install "cognicore-env[mcp]"   # or: uv tool install "cognicore-env[mcp]"\ncognicore install                   # sets up Claude Code and Codex`}
                />
              </Step>
              <Step title="Restart your agents">
                <p>
                  Restart Claude Code. In Codex, run <code className="font-mono text-[13px] text-ink">/hooks</code> once
                  and trust the three CogniCore hooks.
                </p>
              </Step>
              <Step title="Optional: sync with claude.ai, Desktop and mobile">
                <p>
                  Sign in once, and sessions from your terminal show up in the Claude apps, and the other way round.
                </p>
                <CodeBlock code="cognicore login" />
                <p className="text-sm text-ink-3">
                  Only the redacted handoff is sent, never the transcript. Nothing leaves your machine until you sign
                  in.
                </p>
              </Step>
            </Steps>

            <h3 className="mt-12 font-semibold text-ink">Using Claude Code only?</h3>
            <p className="mb-4 mt-2 text-[15px] leading-relaxed text-ink-2">
              After the <code className="font-mono text-[13px] text-ink">pipx</code> line, you can install the plugin
              from inside Claude Code instead:
            </p>
            <CodeBlock label="claude code" code="/plugin install cognicore --marketplace cognicore-dev/cognicore-env" />
            <p className="mb-4 mt-6 text-[15px] leading-relaxed text-ink-2">
              Or connect the hosted server, with nothing installed locally:
            </p>
            <CodeBlock code={`claude mcp add --transport http cognicore ${mcp.url}`} />
          </GuideSection>

          <GuideSection
            id="other-apps"
            title="Cursor, VS Code and other apps"
            lead="Any app that supports remote MCP servers can use the hosted connector. Add the URL and sign in with GitHub when prompted."
          >
            <h3 className="font-semibold text-ink">Cursor</h3>
            <p className="mb-4 mt-2 text-[15px] text-ink-2">
              Add to <code className="font-mono text-[13px] text-ink">.cursor/mcp.json</code>:
            </p>
            <CodeBlock
              label="json"
              code={`{\n  "mcpServers": {\n    "cognicore": {\n      "url": "${mcp.url}"\n    }\n  }\n}`}
            />
            <h3 className="mt-10 font-semibold text-ink">VS Code</h3>
            <p className="mb-4 mt-2 text-[15px] text-ink-2">
              Add to <code className="font-mono text-[13px] text-ink">.vscode/mcp.json</code>:
            </p>
            <CodeBlock
              label="json"
              code={`{\n  "servers": {\n    "cognicore": {\n      "type": "http",\n      "url": "${mcp.url}"\n    }\n  }\n}`}
            />
            <h3 className="mt-10 font-semibold text-ink">Fully local, in Claude Desktop</h3>
            <p className="mb-4 mt-2 text-[15px] text-ink-2">
              Prefer memory that never leaves your computer? Add this to{" "}
              <code className="font-mono text-[13px] text-ink">claude_desktop_config.json</code> and restart Claude
              Desktop. It needs{" "}
              <a
                href="https://docs.astral.sh/uv/"
                className="text-brand underline underline-offset-[3px]"
                target="_blank"
                rel="noreferrer"
              >
                uv
              </a>
              .
            </p>
            <CodeBlock
              label="json"
              code={`{\n  "mcpServers": {\n    "cognicore-memory": {\n      "command": "uvx",\n      "args": ["cognicore-env[extension]", "cognicore-extension"]\n    }\n  }\n}`}
            />
          </GuideSection>

          <GuideSection id="troubleshooting" title="Troubleshooting">
            <dl className="space-y-7">
              {[
                {
                  q: "The connection fails or keeps loading",
                  a: (
                    <>
                      Check the{" "}
                      <a
                        href={mcp.health}
                        className="text-brand underline underline-offset-[3px]"
                        target="_blank"
                        rel="noreferrer"
                      >
                        server status
                      </a>
                      . If it says <code className="font-mono text-[13px]">&quot;ok&quot;</code>, remove CogniCore from
                      your connectors and add it again, making sure the URL ends in{" "}
                      <code className="font-mono text-[13px]">/mcp/stream</code>.
                    </>
                  ),
                },
                {
                  q: "My memories are missing in another app",
                  a: "Memories belong to the GitHub account you signed in with. Make sure every app is connected with the same GitHub account.",
                },
                {
                  q: "The assistant ignores CogniCore",
                  a: "Check that CogniCore is switched on for the chat, then ask for it by name, for example “Use CogniCore to resume my last session.”",
                },
                {
                  q: "I want to disconnect",
                  a: (
                    <>
                      Remove CogniCore in your app&apos;s connector settings, then revoke it on GitHub under{" "}
                      <Path>Settings › Applications › Authorized OAuth Apps</Path>. Disconnecting doesn&apos;t delete
                      stored memories;{" "}
                      <a href={`mailto:${links.email}`} className="text-brand underline underline-offset-[3px]">
                        email us
                      </a>{" "}
                      if you want them deleted.
                    </>
                  ),
                },
              ].map((item) => (
                <div key={item.q}>
                  <dt className="font-medium text-ink">{item.q}</dt>
                  <dd className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{item.a}</dd>
                </div>
              ))}
            </dl>
            <Callout className="mt-10">
              Still stuck?{" "}
              <a
                href={links.issues}
                className="text-brand underline underline-offset-[3px]"
                target="_blank"
                rel="noreferrer"
              >
                Open an issue on GitHub
              </a>{" "}
              or email{" "}
              <a href={`mailto:${links.email}`} className="text-brand underline underline-offset-[3px]">
                {links.email}
              </a>
              .
            </Callout>
          </GuideSection>
        </div>
      </DocLayout>
    </>
  );
}
