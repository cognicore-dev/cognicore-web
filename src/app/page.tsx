import Link from "next/link";
import { AppsMarquee } from "@/components/AppsMarquee";
import { BriefCard } from "@/components/BriefCard";
import { CodeBlock } from "@/components/CodeBlock";
import { CountUp } from "@/components/CountUp";
import { StoryScroll } from "@/components/StoryScroll";
import { ArrowRight, Check } from "@/components/icons";
import { ButtonLink, SectionHeading, delay } from "@/components/ui";
import { links, mcp } from "@/lib/site";

const connectCards = [
  {
    href: "/connect#claude",
    title: "Claude",
    where: "claude.ai, Desktop and mobile",
    time: "1 min",
    body: "Add CogniCore as a connector in Settings. Works on every Claude plan.",
  },
  {
    href: "/connect#chatgpt",
    title: "ChatGPT",
    where: "chatgpt.com",
    time: "2 min",
    body: "Add CogniCore as an app with developer mode, while our directory listing is reviewed.",
  },
  {
    href: "/connect#coding-agents",
    title: "Claude Code & Codex",
    where: "Your terminal",
    time: "2 min",
    body: "Two commands. Sessions save and resume automatically, with no model calls.",
  },
];

const privacy = [
  "Your memory lives in its own database. No other account can read it.",
  "We never sell your data, show ads or use it to train AI models.",
  "Delete a single memory by asking, or everything with one email.",
  "Coding-agent memory stays on your computer unless you turn on sync.",
];

const stats = [
  {
    value: "~450",
    unit: "tokens",
    label: "for the brief a new session starts with",
  },
  {
    value: "~1",
    unit: "second",
    label: "until a finished session is ready to resume",
  },
  {
    value: "0",
    unit: "model calls",
    label: "to save a session from Claude Code or Codex",
  },
  {
    value: String(mcp.tools),
    unit: "tools",
    label: "on the hosted server, for any MCP app",
  },
];

const faqs = [
  {
    q: "Do I need to know how to code?",
    a: "No. Connecting CogniCore to Claude or ChatGPT is done in the app's settings: you paste one link and sign in. The terminal setup is only for people using coding agents.",
  },
  {
    q: "Why do I sign in with GitHub?",
    a: "GitHub sign-in gives each person a private, separate memory without us storing passwords. We only read your GitHub ID and username. A GitHub account is free to create.",
  },
  {
    q: "What does it cost?",
    a: "CogniCore is free and open source under the MIT license. Claude and ChatGPT may need a plan that allows custom connectors or apps; the setup guide notes which.",
  },
  {
    q: "Isn't this the same as the memory built into ChatGPT or Claude?",
    a: "Built-in memory stays inside one app. CogniCore is shared: what you save in Claude is there in ChatGPT, Claude Code and Codex too, and you can see and delete exactly what's stored.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle,var(--color-line-strong)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
        />
        <div className="wrap grid items-center gap-14 pb-24 pt-16 sm:pt-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <Link
              href="/connect"
              data-reveal
              className="group mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1 pl-1 pr-3 text-[13px] text-ink-2 hover:border-line-strong"
            >
              <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-medium text-brand">Soon</span>
              In the Claude and ChatGPT app directories
              <ArrowRight className="size-3 text-ink-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <h1
              data-reveal
              style={delay(80)}
              className="text-[clamp(40px,6vw,66px)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink"
            >
              Stop <span className="accent pr-1 text-[1.08em]">re-explaining</span> yourself to AI.
            </h1>
            <p data-reveal style={delay(160)} className="mt-6 max-w-[34rem] text-lg leading-relaxed text-ink-2">
              CogniCore is a shared memory for Claude, ChatGPT and coding agents. Tell it once — your project, your
              preferences, where you stopped — and every new chat starts already knowing.
            </p>
            <div data-reveal style={delay(240)} className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/connect" size="lg">
                Connect to Claude or ChatGPT
              </ButtonLink>
              <ButtonLink href="/developers" variant="secondary" size="lg">
                Install for developers
              </ButtonLink>
            </div>
            <p data-reveal style={delay(320)} className="mt-5 text-sm text-ink-3">
              Free and open source · Set up in about a minute
            </p>
          </div>
          <div data-reveal="scale" style={delay(250)}>
            <BriefCard />
          </div>
        </div>
      </section>

      <AppsMarquee />

      {/* How it works */}
      <section className="wrap pb-12 pt-24 lg:pb-8">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              One memory, <span className="accent">wherever</span> you talk to AI.
            </>
          }
          lead="Every AI chat starts from zero. You end up pasting the same background, repeating the same preferences and re-explaining decisions you already made. CogniCore keeps that context for you."
        />
        <StoryScroll />
      </section>

      {/* Connect */}
      <section className="border-y border-line bg-surface">
        <div className="wrap py-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Get started"
              title={
                <>
                  Add it to the apps you <span className="accent">already</span> use.
                </>
              }
              lead="We've submitted CogniCore to the Claude and ChatGPT app directories, so it will soon be a one-click install. Until then, you can add it yourself in about a minute."
            />
            <ButtonLink href="/connect" variant="secondary" className="shrink-0">
              Full setup guide <ArrowRight />
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {connectCards.map((card, i) => (
              <Link
                key={card.title}
                href={card.href}
                data-reveal
                style={delay(i * 110)}
                className="group flex flex-col rounded-2xl border border-line bg-paper p-6 transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_18px_40px_-20px_rgba(18,18,17,.25)]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs text-ink-3">{card.where}</p>
                  <span className="rounded-full bg-surface px-2 py-0.5 text-[11px] font-medium text-ink-2 ring-1 ring-line">
                    {card.time}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-ink">{card.title}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-2">{card.body}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                  Show me how
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="wrap grid gap-12 py-24 lg:grid-cols-2 lg:gap-20">
        <SectionHeading
          eyebrow="Privacy"
          title={
            <>
              Your memory <span className="accent">belongs to you.</span>
            </>
          }
          lead={
            <>
              CogniCore only keeps what you ask it to keep. The code is open source, so anyone can check how it handles
              your data.{" "}
              <Link href="/privacy" className="text-brand underline underline-offset-[3px]">
                Read the privacy policy
              </Link>
              .
            </>
          }
        />
        <ul className="space-y-4 self-center">
          {privacy.map((item, i) => (
            <li
              key={item}
              data-reveal
              style={delay(i * 90)}
              className="flex gap-3 text-[15px] leading-relaxed text-ink-2"
            >
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                <Check className="size-3" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Developers */}
      <section className="relative overflow-hidden bg-code text-code-ink">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--color-code-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-code-line)_1px,transparent_1px)] [background-size:48px_48px] opacity-40 [mask-image:radial-gradient(ellipse_60%_70%_at_80%_40%,black,transparent)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-10 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(154_230_0/0.1),transparent)]"
        />
        <div className="wrap relative grid gap-12 py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div data-reveal>
            <p className="mb-3 text-[13px] font-medium text-code-green">For developers</p>
            <h2 className="text-[clamp(26px,3.4vw,36px)] font-semibold leading-[1.15] tracking-[-0.025em] text-white">
              Close Claude Code. Open Codex. <span className="accent text-code-green">Keep going.</span>
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-code-dim">
              Hooks save each session from the agent&apos;s own transcript and hand the next one a short brief: the
              goal, open tasks, decisions with their reasons, and exact values like ticket IDs and versions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/developers" variant="inverse">
                Read the docs
              </ButtonLink>
              <ButtonLink href={links.github} variant="outlineDark">
                View on GitHub
              </ButtonLink>
            </div>
          </div>
          <div data-reveal style={delay(150)} className="min-w-0">
            <CodeBlock
              code={`pipx install "cognicore-env[mcp]"\ncognicore install    # sets up Claude Code and Codex`}
            />
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8">
              {stats.map((s) => (
                <div key={s.label} className="border-t border-code-line pt-4">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="text-3xl font-semibold tracking-[-0.02em] text-white">
                      <CountUp value={s.value} />
                    </span>{" "}
                    <span className="text-sm text-code-dim">{s.unit}</span>
                    <p className="mt-1 text-[13px] leading-snug text-code-dim">{s.label}</p>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-xs text-code-dim">
              Measured on real sessions against claude-mem 15.7.0.{" "}
              <Link href="/developers#benchmarks" className="underline underline-offset-2 hover:text-code-ink">
                See the method
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="wrap grid gap-12 py-24 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <SectionHeading
          eyebrow="Questions"
          title={
            <>
              Common <span className="accent">questions</span>
            </>
          }
          lead={
            <>
              Something else?{" "}
              <a href={`mailto:${links.email}`} className="text-brand underline underline-offset-[3px]">
                Email us
              </a>{" "}
              or{" "}
              <a
                href={links.issues}
                className="text-brand underline underline-offset-[3px]"
                target="_blank"
                rel="noreferrer"
              >
                open an issue
              </a>
              .
            </>
          }
        />
        <div data-reveal style={delay(120)} className="divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-medium text-ink">
                {f.q}
                <span
                  aria-hidden="true"
                  className="text-xl font-light leading-none text-ink-3 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 pr-8 text-[15px] leading-relaxed text-ink-2">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="wrap">
        <div
          data-reveal="scale"
          className="relative overflow-hidden rounded-3xl bg-ink px-8 py-14 text-white sm:px-14 sm:py-16"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-40 size-[560px] animate-float rounded-full bg-[radial-gradient(closest-side,rgb(154_230_0/0.2),transparent)]"
          />
          <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-[clamp(28px,3.6vw,40px)] font-semibold leading-[1.1] tracking-[-0.025em]">
                Give your next chat a <span className="accent text-lime">head start.</span>
              </h2>
              <p className="mt-3 text-white/65">Setup takes about a minute. No credit card, no waitlist.</p>
            </div>
            <ButtonLink href="/connect" variant="inverse" size="lg" className="shrink-0">
              Get started <ArrowRight />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
