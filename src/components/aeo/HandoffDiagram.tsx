import type { CSSProperties } from "react";
import { cx } from "@/lib/styles";

type Node = { tag: string; text: string; tone?: "fail" | "brief" | "ok" };

/** A dashed connector. `flow` animates it with the site's animate-flow (the dashes move towards the next box). */
function Connector({ flow }: { flow?: boolean }) {
  const stroke = flow ? "var(--color-lime)" : "var(--color-line-strong)";
  const line = cx(flow && "animate-flow");
  return (
    <>
      <svg aria-hidden="true" viewBox="0 0 48 12" className="hidden h-3 w-12 shrink-0 self-center sm:block">
        <path
          d="M2 6 H40"
          stroke={stroke}
          strokeWidth="2"
          strokeDasharray="5 5"
          strokeLinecap="round"
          className={line}
        />
        <path d="M38 2 L44 6 L38 10" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      </svg>
      <svg aria-hidden="true" viewBox="0 0 12 32" className="ml-6 h-8 w-3 shrink-0 sm:hidden">
        <path
          d="M6 2 V24"
          stroke={stroke}
          strokeWidth="2"
          strokeDasharray="5 5"
          strokeLinecap="round"
          className={line}
        />
        <path d="M2 22 L6 28 L10 22" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      </svg>
    </>
  );
}

function Lane({ title, nodes, flow, offset }: { title: string; nodes: Node[]; flow?: boolean; offset: number }) {
  return (
    <div>
      <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-ink-3">{title}</p>
      <ol className="flex flex-col sm:flex-row sm:items-stretch">
        {nodes.map((n, i) => (
          <li key={i} className="flex flex-col sm:flex-1 sm:flex-row">
            {i > 0 && <Connector flow={flow} />}
            <div
              className={cx(
                "diagram-node flex-1 rounded-lg border px-3.5 py-2.5 text-[13px] leading-snug",
                n.tone === "fail" && "border-line bg-sunken text-ink-2",
                n.tone === "brief" && "border-lime/60 bg-brand-soft text-ink",
                n.tone === "ok" && "border-brand/30 bg-surface text-ink",
                !n.tone && "border-line bg-surface text-ink-2",
              )}
              style={{ "--i": offset + i } as CSSProperties}
            >
              <span className="block text-[11px] font-medium text-ink-3">{n.tag}</span>
              {n.text}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** "Retries the failed fix" vs "remembers it": what the next Claude Code session does without and with a brief. */
export function HandoffDiagram() {
  return (
    <figure data-reveal="fade" className="rounded-xl border border-line bg-paper p-5 sm:p-6">
      <div className="space-y-7">
        <Lane
          title="Without memory: retries the failed fix"
          offset={0}
          nodes={[
            { tag: "Session 1", text: "Tries fix A. It doesn't work.", tone: "fail" },
            { tag: "Session 2", text: "Starts from zero." },
            { tag: "Session 2", text: "Tries fix A again.", tone: "fail" },
          ]}
        />
        <Lane
          title="With CogniCore: remembers it"
          offset={3}
          flow
          nodes={[
            { tag: "Session 1", text: "Tries fix A. It doesn't work.", tone: "fail" },
            { tag: "Brief", text: "Rejected: fix A, and why.", tone: "brief" },
            { tag: "Session 2", text: "Skips A and tries fix B.", tone: "ok" },
          ]}
        />
      </div>
      <figcaption className="mt-5 text-xs leading-relaxed text-ink-3">
        Failed attempts (&ldquo;we tried X but it doesn&apos;t work&rdquo;) are saved as rejected approaches and come
        back in the next session&apos;s brief.
      </figcaption>
    </figure>
  );
}
