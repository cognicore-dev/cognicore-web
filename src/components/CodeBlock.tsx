"use client";

import { useState } from "react";
import { cx } from "@/lib/styles";

function useCopy(text: string) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked: the text is still selectable */
    }
  };
  return { copied, copy };
}

/** Dark code block with a copy button. Lines starting with "#" are dimmed as comments. */
export function CodeBlock({ code, label, className }: { code: string; label?: string; className?: string }) {
  const { copied, copy } = useCopy(code);

  return (
    <div className={cx("overflow-hidden rounded-xl border border-code-line bg-code", className)}>
      <div className="flex items-center justify-between border-b border-code-line px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-wider text-code-dim">{label ?? "terminal"}</span>
        <button
          type="button"
          onClick={copy}
          className="rounded px-1.5 py-0.5 font-mono text-[11px] text-code-dim transition-colors hover:text-code-ink"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[13px] leading-[1.7] text-code-ink">
        <code>
          {code.split("\n").map((line, i) => {
            const at = line.search(/(^|\s)#/);
            return (
              <span key={i} className="block">
                {at === -1 ? (
                  line || " "
                ) : (
                  <>
                    {line.slice(0, at)}
                    <span className="text-code-dim">{line.slice(at)}</span>
                  </>
                )}
              </span>
            );
          })}
        </code>
      </pre>
    </div>
  );
}

/** A single value (like the connector URL) with a copy button, styled for light backgrounds. */
export function CopyField({ value, className }: { value: string; className?: string }) {
  const { copied, copy } = useCopy(value);
  return (
    <div
      className={cx(
        "flex min-w-0 items-center gap-2 rounded-lg border border-line-strong bg-surface py-1.5 pl-3 pr-1.5",
        className,
      )}
    >
      <code className="min-w-0 flex-1 truncate font-mono text-[13px] text-ink">{value}</code>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 rounded-md bg-ink px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-ink-2"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
