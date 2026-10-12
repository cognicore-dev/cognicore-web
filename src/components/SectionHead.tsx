import type { ReactNode } from "react";
import { cx } from "@/lib/styles";
import { Eyebrow } from "./Eyebrow";

interface SectionHeadProps {
  eyebrow: string;
  title: string;
  tone?: "light" | "dark";
  children?: ReactNode;
}

export function SectionHead({ eyebrow, title, tone = "light", children }: SectionHeadProps) {
  return (
    <div
      className={cx(
        "reveal mb-[60px] max-w-[640px]",
        "[&_p]:mt-4 [&_p]:max-w-[52ch] [&_p]:text-base",
        tone === "light" ? "[&_p]:text-ink-dim" : "[&_p]:text-muted",
      )}
    >
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2 className="mt-[18px] font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-[-.01em]">{title}</h2>
      {children}
    </div>
  );
}
