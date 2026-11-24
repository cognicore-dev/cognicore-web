import type { CSSProperties } from "react";
import { CountUp } from "@/components/CountUp";
import { cx } from "@/lib/styles";

type Bar = { label: string; value: number; highlight?: boolean };

/**
 * Horizontal bars that grow from the left when revealed (see .token-bar in aeo.css). Widths are relative to the
 * largest value in the group. Only for measured figures.
 */
export function TokenBars({ groups, caption }: { groups: { title: string; bars: Bar[] }[]; caption: string }) {
  const max = Math.max(...groups.flatMap((g) => g.bars.map((b) => b.value)));
  return (
    <figure data-reveal className="rounded-xl border border-line bg-surface p-5 sm:p-6">
      <div className="space-y-6">
        {groups.map((g) => (
          <div key={g.title}>
            <p className="mb-3 text-sm font-medium text-ink">{g.title}</p>
            <ul className="space-y-2.5">
              {g.bars.map((b, i) => (
                <li
                  key={b.label}
                  className="grid grid-cols-[88px_1fr_auto] items-center gap-3 text-sm sm:grid-cols-[110px_1fr_auto]"
                >
                  <span className="text-ink-2">{b.label}</span>
                  <span className="h-2.5 overflow-hidden rounded-full bg-sunken">
                    <span
                      className={cx("token-bar block h-full rounded-full", b.highlight ? "bg-lime" : "bg-line-strong")}
                      style={{ "--w": b.value / max, "--i": i } as CSSProperties}
                    />
                  </span>
                  <span className="w-14 text-right font-mono text-[13px] text-ink">
                    <CountUp value={`${Math.round(b.value / 1000)}k`} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <figcaption className="mt-5 text-xs leading-relaxed text-ink-3">{caption}</figcaption>
    </figure>
  );
}
