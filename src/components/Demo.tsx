"use client";

import { useEffect, useRef, useState } from "react";
import { demoTabs, terminalScripts, type DemoTab } from "@/lib/content";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cx } from "@/lib/styles";
import { SectionHead } from "./SectionHead";
import { TerminalPanel } from "./TerminalPanel";

export function Demo() {
  const reduced = usePrefersReducedMotion();
  const terminalRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<DemoTab>("write");
  const [started, setStarted] = useState<Record<DemoTab, boolean>>({ write: false, install: false });

  const start = (tab: DemoTab) => setStarted((s) => (s[tab] ? s : { ...s, [tab]: true }));

  // Begin typing the first panel once the terminal scrolls into view.
  useEffect(() => {
    const el = terminalRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted((s) => (s.write ? s : { ...s, write: true }));
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const selectTab = (tab: DemoTab) => {
    setActive(tab);
    start(tab);
  };

  return (
    <section id="demo" className="wrap">
      <SectionHead eyebrow="CONCEPTUAL PREVIEW" title="What it looks like from the agent's side.">
        <p>Illustrative only — a preview of the interaction model CogniCore is being built around.</p>
      </SectionHead>
      <div className="reveal">
        <div className="mb-3.5 flex gap-2" role="tablist">
          {demoTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              className={cx(
                "cursor-target rounded-full border px-4 py-2 font-mono text-xs leading-[normal]",
                active === tab.id ? "border-ink bg-ink text-lime" : "border-line bg-transparent text-ink-dim",
              )}
              onClick={() => selectTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div ref={terminalRef} className="overflow-hidden rounded-[14px] bg-ink">
          <div className="flex items-center gap-2 border-b border-edge px-[18px] py-3.5">
            <span className="ml-2 size-[9px] rounded-full bg-dot-red" />
            <span className="ml-2 size-[9px] rounded-full bg-dot-yellow" />
            <span className="ml-2 size-[9px] rounded-full bg-lime" />
            <span className="ml-2 font-mono text-[11.5px] text-faint">~/projects/sellerflow — cognicore</span>
          </div>
          {demoTabs.map((tab) => (
            <TerminalPanel
              key={tab.id}
              lines={terminalScripts[tab.id]}
              started={started[tab.id]}
              instant={reduced}
              hidden={active !== tab.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
