"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion, useInView } from "@/hooks/useInView";
import { cx } from "@/lib/styles";

/** Hero illustration: a memory saved in one app and picked up in another. Example content only. */
const scenarios = [
  {
    from: "Claude",
    to: "ChatGPT",
    rows: [
      { label: "Goal", text: "Launch the new pricing page" },
      {
        label: "Where you stopped",
        text: "Copy is approved. Design is waiting on final screenshots.",
      },
      {
        label: "Decided",
        text: "Annual plan at $96 — monthly felt too steep for small teams.",
      },
      {
        label: "Next",
        text: "Swap in the screenshots, then send the page to Priya for review.",
      },
    ],
  },
  {
    from: "ChatGPT",
    to: "Claude",
    rows: [
      { label: "Goal", text: "Finish chapter 3 of the thesis" },
      {
        label: "Where you stopped",
        text: "Literature review is done. Methods section is half written.",
      },
      {
        label: "Decided",
        text: "Interviews, not surveys — the sample is too small for statistics.",
      },
      {
        label: "Next",
        text: "Draft the interview questions and email Dr. Mehta for sign-off.",
      },
    ],
  },
  {
    from: "Claude Code",
    to: "Codex",
    rows: [
      {
        label: "Goal",
        text: "Fix AUTH-1423: users logged out after a refresh",
      },
      {
        label: "Where you stopped",
        text: "Root cause found: the refresh cookie is missing SameSite.",
      },
      {
        label: "Decided",
        text: "Stay on PyJWT 2.8.0 — upgrading broke two auth tests.",
      },
      {
        label: "Next",
        text: "Add a regression test, then open the pull request.",
      },
    ],
  },
];

const TICK = 520; // ms per animation step
const LAST_STEP = 15; // rows land on steps 3–6, the card holds, then fades out on the last two steps
const SHOWN = LAST_STEP - 2; // fully shown: the server render, and the only state with reduced motion

export function BriefCard() {
  const [{ index, step }, setState] = useState({ index: 0, step: SHOWN });
  const [paused, setPaused] = useState(false);
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.3 });

  useEffect(() => {
    if (prefersReducedMotion()) return;
    setState((s) => ({ ...s, step: 0 }));
  }, []);

  useEffect(() => {
    if (!inView || paused || prefersReducedMotion()) return;
    const id = setInterval(() => {
      setState((s) =>
        s.step < LAST_STEP ? { ...s, step: s.step + 1 } : { index: (s.index + 1) % scenarios.length, step: 0 },
      );
    }, TICK);
    return () => clearInterval(id);
  }, [inView, paused]);

  const scenario = scenarios[index];
  const saving = step < 2;
  const leaving = step >= LAST_STEP - 1;

  const show = (i: number) => {
    setState({ index: i, step: prefersReducedMotion() ? SHOWN : 0 });
  };

  return (
    <figure ref={ref} className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-16 -z-10 bg-[radial-gradient(closest-side,var(--color-brand-soft),transparent)]"
      />

      {/* app-to-app handoff strip */}
      <div className="mb-3 flex items-center gap-3 text-xs font-medium text-ink-2" aria-hidden="true">
        <AppChip name={scenario.from} active={saving} />
        <svg viewBox="0 0 100 8" preserveAspectRatio="none" className="h-2 flex-1 text-line-strong">
          <line
            x1="0"
            y1="4"
            x2="100"
            y2="4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            vectorEffect="non-scaling-stroke"
            className={cx(!leaving && "animate-flow")}
          />
        </svg>
        <AppChip name={scenario.to} active={!saving} />
      </div>

      <div
        className={cx(
          "overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_1px_2px_rgba(18,18,17,.04),0_18px_40px_-16px_rgba(18,18,17,.18)] transition-opacity duration-500",
          leaving ? "opacity-0" : "opacity-100",
        )}
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
          <div className="flex items-center gap-2.5 text-[13px] font-medium text-ink" aria-live="polite">
            <span
              className={cx("size-2 rounded-full", saving ? "animate-blink bg-ink-3" : "animate-pulse-ring bg-lime")}
              aria-hidden="true"
            />
            {saving ? `Saving in ${scenario.from}…` : `Picked up in ${scenario.to}`}
          </div>
          <span className="text-xs text-ink-3">{saving ? "just now" : "2 hours later"}</span>
        </div>
        <dl className="divide-y divide-line">
          {scenario.rows.map((row, i) => {
            const visible = step >= i + 3;
            return (
              <div
                key={`${index}-${row.label}`}
                className={cx(
                  "grid gap-1 px-5 py-3.5 transition-all duration-500 ease-out-expo sm:grid-cols-[132px_1fr] sm:gap-4",
                  visible ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0",
                )}
              >
                <dt className="text-[13px] text-ink-3">{row.label}</dt>
                <dd className="text-[14px] leading-snug text-ink">{row.text}</dd>
              </div>
            );
          })}
        </dl>
        <div className="flex items-center justify-between gap-3 border-t border-line bg-sunken px-5 py-3 text-xs text-ink-3">
          <span>{scenario.rows.length} things remembered</span>
          <div className="flex gap-1.5" role="tablist" aria-label="Examples">
            {scenarios.map((s, i) => (
              <button
                key={s.from}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Example ${i + 1}: ${s.from} to ${s.to}`}
                onClick={() => show(i)}
                className={cx(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index ? "w-5 bg-ink" : "w-1.5 bg-line-strong hover:bg-ink-3",
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <figcaption className="sr-only">
        An example of the short brief CogniCore gives a new chat: the goal, where you stopped, what was decided, and
        what comes next.
      </figcaption>
    </figure>
  );
}

function AppChip({ name, active }: { name: string; active: boolean }) {
  return (
    <span
      className={cx(
        "rounded-full border px-2.5 py-1 transition-colors duration-300",
        active ? "border-ink bg-ink text-white" : "border-line bg-surface text-ink-2",
      )}
    >
      {name}
    </span>
  );
}
