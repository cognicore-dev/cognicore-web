"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion, useInView } from "@/hooks/useInView";

/** Counts a value like "~450" up from zero the first time it scrolls into view. */
export function CountUp({ value, duration = 1200 }: { value: string; duration?: number }) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? Number(match[2]) : 0;
  const suffix = match?.[3] ?? "";

  const [ref, inView] = useInView<HTMLSpanElement>({
    once: true,
    threshold: 0.6,
  });
  const [n, setN] = useState(target);

  useEffect(() => {
    if (!inView || !match || prefersReducedMotion()) return;
    let frame = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setN(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    setN(0);
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {n}
      {suffix}
    </span>
  );
}
