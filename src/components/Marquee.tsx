import { Fragment } from "react";
import { cx } from "@/lib/styles";

interface MarqueeProps {
  items: string[];
  direction: "left" | "right";
  variant?: "dark" | "lime";
}

/** Infinite horizontal ticker. The run is rendered twice so the CSS loop (-50%) is seamless. */
export function Marquee({ items, direction, variant = "dark" }: MarqueeProps) {
  const lime = variant === "lime";
  const run = items.map((item) => (
    <Fragment key={item}>
      {item} <i className={cx("not-italic", lime ? "text-bg" : "text-lime")}>✦</i>{" "}
    </Fragment>
  ));
  const runClass = cx(
    "flex items-center gap-10 font-display text-[26px] font-semibold",
    lime ? "text-ink" : "text-bg",
  );

  return (
    <div className={cx("overflow-hidden py-5", lime ? "bg-lime" : "border-y border-line bg-ink")}>
      <div
        className={cx(
          "flex w-max gap-10 whitespace-nowrap",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
        )}
      >
        <span className={runClass}>{run}</span>
        <span className={runClass} aria-hidden="true">
          {run}
        </span>
      </div>
    </div>
  );
}
