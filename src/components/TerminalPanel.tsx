"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import type { TerminalLine, TerminalTone } from "@/lib/content";
import { cx } from "@/lib/styles";

const toneClass: Record<TerminalTone, string> = {
  prompt: "text-faint",
  success: "text-lime",
  info: "text-term-blue",
  stat: "text-term-orange",
};

interface TerminalPanelProps {
  lines: TerminalLine[];
  /** Typing begins the first time this becomes true and never restarts. */
  started: boolean;
  /** Skip the typewriter and show the full output at once. */
  instant: boolean;
  hidden: boolean;
  /** Milliseconds per character. */
  speed?: number;
}

const LINE_PAUSE = 220;
const BLANK_LINE_PAUSE = 120;

/**
 * Typewriter terminal. The script is flattened into a list of "ticks" (one per character
 * or line break), each with the delay that follows it; rendering just shows the first N ticks.
 */
export function TerminalPanel({ lines, started, instant, hidden, speed = 13 }: TerminalPanelProps) {
  const delays = useMemo(() => {
    const out: number[] = [];
    for (const segs of lines) {
      if (segs.length === 0) {
        out.push(BLANK_LINE_PAUSE);
        continue;
      }
      for (const seg of segs) for (let i = 0; i < seg.text.length; i++) out.push(speed);
      out.push(LINE_PAUSE);
    }
    return out;
  }, [lines, speed]);

  const total = delays.length;
  const [shown, setShown] = useState(0);
  const count = instant && started ? total : shown;

  useEffect(() => {
    if (!started || instant || shown >= total) return;
    const wait = shown === 0 ? 0 : delays[shown - 1];
    const t = setTimeout(() => setShown((n) => n + 1), wait);
    return () => clearTimeout(t);
  }, [started, instant, shown, total, delays]);

  // Build the visible output from the first `count` ticks.
  let budget = count;
  const rendered = lines.map((segs, li) => {
    if (budget <= 0) return null;
    if (segs.length === 0) {
      budget -= 1;
      return <br key={li} />;
    }
    const parts = segs.map((seg, si) => {
      if (budget <= 0) return null;
      const visible = seg.text.slice(0, budget);
      budget -= visible.length;
      return (
        <span key={si} className={seg.tone && toneClass[seg.tone]}>
          {visible}
        </span>
      );
    });
    const lineDone = budget > 0;
    if (lineDone) budget -= 1;
    return (
      <Fragment key={li}>
        {parts}
        {lineDone && <br />}
      </Fragment>
    );
  });

  return (
    <div
      role="tabpanel"
      className={cx("min-h-[220px] p-[26px] font-mono text-[13px] leading-[1.9] text-term", hidden && "hidden")}
    >
      {rendered}
      {started && count >= total && (
        <span className="inline-block h-3.5 w-2 animate-blink bg-lime align-middle" />
      )}
    </div>
  );
}
