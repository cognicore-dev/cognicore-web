"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Small dot that follows the mouse exactly, plus a ring that lags behind.
 * Only switches on after the first real mouse movement, so touch devices keep the native cursor.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let enabled = false;
    let rafId = 0;

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      rafId = requestAnimationFrame(loop);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      if (!enabled) {
        enabled = true;
        document.body.classList.add("custom-cursor-active");
        loop();
      }
    };

    // Event delegation: works for every .cursor-target, including ones rendered later.
    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(".cursor-target")) ring.classList.add("hover");
    };
    const onOut = (e: PointerEvent) => {
      const from = (e.target as Element | null)?.closest(".cursor-target");
      const to = (e.relatedTarget as Element | null)?.closest?.(".cursor-target");
      if (from && from !== to) ring.classList.remove("hover");
    };

    window.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <>
      {/* Hidden until <body> gets .custom-cursor-active (first mouse move). Position comes from inline transforms. */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[999] hidden size-1.5 rounded-full bg-ink in-[.custom-cursor-active]:block motion-reduce:hidden!"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[999] hidden size-[34px] rounded-full border-[1.5px] border-ink bg-lime opacity-90 mix-blend-difference transition-[width,height,opacity] duration-250 ease-[ease] in-[.custom-cursor-active]:block motion-reduce:hidden! [&.hover]:size-16"
      />
    </>
  );
}
