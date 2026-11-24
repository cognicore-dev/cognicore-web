import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";
import { GuideLayout, guideBySlug } from "@/components/aeo/GuideLayout";
import { DocSection, Table } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { license, links, mcp } from "@/lib/site";

const guide = guideBySlug("built-in-memory-vs-cognicore");

export const metadata: Metadata = pageMetadata({
  title: guide.title,
  description: guide.description,
  path: `/learn/${guide.slug}`,
  type: "article",
});

const toc = [
  { id: "difference", label: "The difference" },
  { id: "apps", label: "Which apps share it" },
  { id: "inspect", label: "See and delete it" },
  { id: "storage", label: "Where it's stored" },
  { id: "self-host", label: "Hosting it yourself" },
];

const c = (s: string) => <code>{s}</code>;

export default function BuiltInVsSharedGuide() {
  return (
    <GuideLayout
      guide={guide}
      toc={toc}
      answer={
        <>
          Built-in memory belongs to the app that provides it, so what ChatGPT remembers stays in ChatGPT. A shared
          memory layer like CogniCore connects to many apps at once, so what you save in Claude is there in ChatGPT,
          Claude Code, Codex and Cursor too, and you can list and delete exactly what&apos;s stored.
        </>
      }
    >
      <DocSection id="difference" title="What is the difference between built-in memory and a shared memory layer?">
        <p>
          An AI app&apos;s own memory works inside that app. A shared memory layer sits outside every app and is reached
          through a standard interface, the Model Context Protocol (MCP), so any app that supports MCP servers can save
          to it and read from it.
        </p>
        <p>
          CogniCore is that layer. In chat apps, you add one connector URL and sign in with {mcp.signIn}. In Claude Code
          and Codex, a local plugin saves sessions automatically. The memory belongs to your sign-in, not to any one
          app.
        </p>
      </DocSection>

      <DocSection id="apps" title="Which apps can share one CogniCore memory?">
        <Table
          head={["App", "How it connects", "Setup"]}
          rows={[
            [
              "Claude (web, desktop, mobile)",
              "Custom connector",
              <Link key="c" href="/connect#claude">
                Claude
              </Link>,
            ],
            [
              "ChatGPT",
              "App, with developer mode",
              <Link key="g" href="/connect#chatgpt">
                ChatGPT
              </Link>,
            ],
            [
              "Claude Code and Codex",
              "Local plugin with hooks",
              <Link key="a" href="/connect#coding-agents">
                Coding agents
              </Link>,
            ],
            [
              "Cursor, VS Code, others",
              "Remote MCP server",
              <Link key="o" href="/connect#other-apps">
                Other apps
              </Link>,
            ],
          ]}
        />
        <p>
          The coding-agent plugin keeps memory on your computer. To share it with claude.ai, Claude Desktop and mobile,
          run {c("cognicore login")} once; only the redacted handoff is uploaded, never the transcript.
        </p>
        <p>
          One thing to know: Google and GitHub sign-ins are separate CogniCore accounts that are never linked. Use the
          same one in every app, or memories saved under one won&apos;t appear under the other.
        </p>
      </DocSection>

      <DocSection id="inspect" title="Can I see and delete what's stored?">
        <p>Yes, item by item:</p>
        <ul>
          <li>
            Ask your app to list your memories ({c("cognicore_list")}) or forget one ({c("cognicore_forget")}).
          </li>
          <li>For local plugin memory, open the read-only viewer:</li>
        </ul>
        <CodeBlock code="python -m cognicore.memory.viewer   # http://127.0.0.1:37780" />
        <p>
          To delete or export everything on the hosted server, email {links.email}; requests are handled within 30 days.
          Every hosted tool is labelled read, write, delete or external, so your app can ask before one changes
          anything. The full list is in{" "}
          <a href={links.docs.tools} target="_blank" rel="noreferrer">
            docs/mcp-tools.md
          </a>
          .
        </p>
      </DocSection>

      <DocSection id="storage" title="Where is a shared memory stored?">
        <p>
          On the hosted server, in a separate database for your account that other users cannot read, on servers run by
          our hosting provider (currently Microsoft Azure, in South Korea). We do not sell your data, show ads, or use
          it to train AI models. The{" "}
          <Link href="/privacy" className="text-brand underline underline-offset-[3px]">
            privacy policy
          </Link>{" "}
          has the details, including retention and which providers process what.
        </p>
        <p>
          For a team, project decisions and rules can live in {c(".cognicore/context.md")} in the repository, a plain
          Markdown file reviewed in pull requests like any other change (in the next release).
        </p>
      </DocSection>

      <DocSection id="self-host" title="Can I host the memory layer myself?">
        <p>
          Yes. CogniCore is open source under the {license.name}, and the hosted server is the same code as the
          repository. Deploying it with Docker Compose is covered in{" "}
          <a href={links.docs.remote} target="_blank" rel="noreferrer">
            docs/remote-mcp-server.md
          </a>
          . For memory with no server at all, use the local plugin, which never sends anything until you sign in.
        </p>
      </DocSection>
    </GuideLayout>
  );
}
