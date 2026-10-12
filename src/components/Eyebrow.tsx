import { cx } from "@/lib/styles";

interface EyebrowProps {
  children: string;
  /** "dark" is for use on the black Process section. */
  tone?: "light" | "dark";
  center?: boolean;
}

/** Small mono label with a lime dot in front. */
export function Eyebrow({ children, tone = "light", center = false }: EyebrowProps) {
  return (
    <div
      className={cx(
        "mb-[26px] flex items-center gap-2.5 font-mono text-xs uppercase tracking-[.12em]",
        "before:size-[9px] before:rounded-full before:border before:bg-lime before:content-['']",
        tone === "light" ? "text-ink-dim before:border-ink" : "text-muted before:border-lime",
        center && "justify-center",
      )}
    >
      {children}
    </div>
  );
}
