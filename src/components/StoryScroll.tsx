"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { mcp } from "@/lib/site";
import { cx } from "@/lib/styles";
import { prefersReducedMotion, useInView } from "@/hooks/useInView";
import { Check } from "./icons";

const steps = [
  {
    title: "Connect it once",
    body: "Paste one link into Claude or ChatGPT and sign in with GitHub. Coding agents take two commands. That's the whole setup.",
  },
  {
    title: "Talk the way you already do",
    body: "Ask it to remember a preference, a decision or where you stopped. In Claude Code and Codex, sessions save themselves when they end.",
  },
  {
    title: "Pick up anywhere",
    body: "Open a new chat, in the same app or a different one, and it starts with what matters instead of a blank page.",
  },
];

/* ---------- small building blocks for the mock screens ---------- */

/** Fades and lifts its children in when `on`, after `delay` ms. Resets when `on` turns off. */
function Appear({
  on,
  delay = 0,
  as: Tag = "div",
  children,
  className,
}: {
  on: boolean;
  delay?: number;
  as?: "div" | "li";
  children: ReactNode;
  className?: string;
}) {
  return (
    <Tag
      className={cx(
        "transition-all duration-500 ease-out-expo",
        on ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        className,
      )}
      style={{ transitionDelay: on ? `${delay}ms` : "0ms" } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

function useTyping(text: string, on: boolean, speed = 28) {
  const [n, setN] = useState(on ? text.length : 0);
  useEffect(() => {
    if (!on) {
      setN(0);
      return;
    }
    if (prefersReducedMotion()) {
      setN(text.length);
      return;
    }
    setN(0);
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setN(i);
      if (i < text.length) timer = setTimeout(tick, speed);
    };
    timer = setTimeout(tick, 350);
    return () => clearTimeout(timer);
  }, [on, text, speed]);
  return { typed: text.slice(0, n), done: n >= text.length };
}

function Window({ app, title, children }: { app: string; title: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_1px_2px_rgba(18,18,17,.04),0_24px_48px_-20px_rgba(18,18,17,.2)]">
      <div className="flex items-center gap-3 border-b border-line bg-sunken px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </div>
        <span className="text-xs font-medium text-ink-2">{app}</span>
        <span className="truncate text-xs text-ink-3">{title}</span>
      </div>
      <div className="min-h-[330px] p-5 sm:p-6">{children}</div>
    </div>
  );
}

function ToolChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-brand/20 bg-brand-soft px-2 py-1 text-xs font-medium text-brand">
      <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
      {children}
    </span>
  );
}

/* ---------- the three screens ---------- */

function ConnectScreen({ on }: { on: boolean }) {
  const { typed, done } = useTyping(mcp.url, on);
  return (
    <Window app="Claude" title="Settings › Connectors">
      <p className="font-medium text-ink">Add custom connector</p>
      <div className="mt-5 space-y-4 text-sm">
        <div>
          <p className="mb-1.5 text-xs text-ink-3">Name</p>
          <div className="rounded-lg border border-line bg-paper px-3 py-2 text-ink">CogniCore</div>
        </div>
        <div>
          <p className="mb-1.5 text-xs text-ink-3">Remote MCP server URL</p>
          <div
            className={cx(
              "flex min-h-[38px] items-center rounded-lg border bg-paper px-3 py-2 font-mono text-[12.5px] text-ink transition-colors",
              on && !done ? "border-ink" : "border-line",
            )}
          >
            <span className="truncate">{typed}</span>
            {on && !done && <span className="ml-px h-4 w-px animate-blink bg-ink" aria-hidden="true" />}
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <Appear on={on && done} delay={250}>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand">
            <Check className="size-4" /> Connected with GitHub
          </span>
        </Appear>
        <span
          className={cx(
            "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-300",
            done && on ? "bg-ink text-white" : "bg-line text-ink-3",
          )}
        >
          Add
        </span>
      </div>
    </Window>
  );
}

function RememberScreen({ on }: { on: boolean }) {
  return (
    <Window app="Claude" title="New chat">
      <div className="space-y-4 text-[14px] leading-relaxed">
        <Appear on={on} delay={150} className="flex justify-end">
          <p className="max-w-[85%] rounded-2xl rounded-br-md bg-sunken px-4 py-2.5 text-ink">
            Remember that I like short answers with bullet points.
          </p>
        </Appear>
        <Appear on={on} delay={900}>
          <ToolChip>CogniCore · remember</ToolChip>
        </Appear>
        <Appear on={on} delay={1400}>
          <div className="rounded-xl border border-line bg-paper px-4 py-3 text-[13px] text-ink-2">
            <span className="text-ink-3">Saved · preference</span>
            <p className="mt-0.5 text-ink">Prefers short answers, formatted as bullet points.</p>
          </div>
        </Appear>
        <Appear on={on} delay={2000}>
          <p className="text-ink">
            Got it. I&apos;ll keep things short and in bullets from now on, in any app you connect.
          </p>
        </Appear>
      </div>
    </Window>
  );
}

function ResumeScreen({ on }: { on: boolean }) {
  return (
    <Window app="ChatGPT" title="New chat · the next morning">
      <div className="space-y-4 text-[14px] leading-relaxed">
        <Appear on={on} delay={100}>
          <ToolChip>CogniCore · 3 memories loaded</ToolChip>
        </Appear>
        <Appear on={on} delay={600} className="flex justify-end">
          <p className="max-w-[85%] rounded-2xl rounded-br-md bg-sunken px-4 py-2.5 text-ink">
            Help me plan launch week.
          </p>
        </Appear>
        <Appear on={on} delay={1200}>
          <p className="text-ink">Here&apos;s launch week, kept short:</p>
        </Appear>
        <ul className="space-y-1.5 text-ink">
          {[
            ["Mon", "Final pass on the approved copy"],
            ["Wed", "Screenshots in, page to Priya for review"],
            ["Fri", "Launch with the $96 annual plan"],
          ].map(([day, text], i) => (
            <Appear key={day} as="li" on={on} delay={1500 + i * 220} className="flex gap-3">
              <span className="w-9 shrink-0 font-mono text-xs leading-[22px] text-ink-3">{day}</span>
              {text}
            </Appear>
          ))}
        </ul>
      </div>
    </Window>
  );
}

const screens = [ConnectScreen, RememberScreen, ResumeScreen];

/* ---------- the section ---------- */

function StepText({
  i,
  active,
  onActive,
  children,
}: {
  i: number;
  active: boolean;
  onActive: (i: number) => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && onActive(i), {
      rootMargin: "-45% 0px -45% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [i, onActive]);

  const step = steps[i];
  return (
    <li ref={ref} className="lg:flex lg:min-h-[62vh] lg:items-center">
      <div
        className={cx(
          "border-l-2 pl-6 transition-colors duration-500",
          active ? "border-ink" : "border-line lg:[&_h3]:text-ink-3 lg:[&_p]:text-ink-3",
        )}
      >
        <span className="font-mono text-xs text-ink-3">0{i + 1}</span>
        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-ink transition-colors duration-500">
          {step.title}
        </h3>
        <p className="mt-3 max-w-md text-[16px] leading-relaxed text-ink-2 transition-colors duration-500">
          {step.body}
        </p>
      </div>
      {/* phones and tablets: the screen sits under its step */}
      <div className="mt-8 lg:hidden">{children}</div>
    </li>
  );
}

function MobileScreen({ i }: { i: number }) {
  const [ref, inView] = useInView<HTMLDivElement>({
    once: true,
    threshold: 0.4,
  });
  const Screen = screens[i];
  return (
    <div ref={ref}>
      <Screen on={inView} />
    </div>
  );
}

export function StoryScroll() {
  const [active, setActive] = useState(0);
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div ref={ref} className="mt-10 grid gap-16 lg:mt-4 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
      <ol className="space-y-16 lg:space-y-0">
        {steps.map((_, i) => (
          <StepText key={i} i={i} active={active === i} onActive={setActive}>
            <MobileScreen i={i} />
          </StepText>
        ))}
      </ol>

      <div className="hidden lg:block">
        <div className="sticky top-[calc(50vh-190px)]">
          <div className="relative">
            {screens.map((Screen, i) => (
              <div
                key={i}
                aria-hidden={active !== i}
                className={cx(
                  "transition-all duration-700 ease-out-expo",
                  i === 0 ? "relative" : "absolute inset-x-0 top-0",
                  active === i
                    ? "translate-y-0 scale-100 opacity-100"
                    : "pointer-events-none translate-y-4 scale-[0.98] opacity-0",
                )}
              >
                <Screen on={inView && active === i} />
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-center gap-1.5" aria-hidden="true">
            {steps.map((_, i) => (
              <span
                key={i}
                className={cx(
                  "h-1 rounded-full transition-all duration-500",
                  active === i ? "w-6 bg-ink" : "w-1.5 bg-line-strong",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
