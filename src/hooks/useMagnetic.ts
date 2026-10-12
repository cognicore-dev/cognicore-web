"use client";

import { useEffect, useRef } from "react";

/**
 * "Magnetic" hover: the element drifts toward the pointer while hovered
 * and springs back when the pointer leaves.
 */
export function useMagnetic<T extends HTMLElement>(strengthX = 0.25, strengthY = 0.4) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let resetTimer: ReturnType<typeof setTimeout> | undefined;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * strengthX}px, ${y * strengthY}px)`;
    };
    const onEnter = () => {
      clearTimeout(resetTimer);
      el.style.transition = "";
    };
    const onLeave = () => {
      el.style.transition = "transform .4s cubic-bezier(.34,1.56,.64,1)";
      el.style.transform = "translate(0,0)";
      resetTimer = setTimeout(() => {
        el.style.transition = "";
      }, 400);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      clearTimeout(resetTimer);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strengthX, strengthY]);

  return ref;
}
