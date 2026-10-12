"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useIntro } from "./IntroProvider";
import { prefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Full-screen percentage counter that slides away, then triggers the hero reveal. */
export function Preloader() {
  const { finishIntro } = useIntro();
  const loaderRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setHidden(true);
      finishIntro();
      return;
    }

    let p = 0;
    let tween: gsap.core.Tween | undefined;
    let finishTimer: ReturnType<typeof setTimeout> | undefined;

    const iv = setInterval(() => {
      p += Math.random() * 14 + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        finishTimer = setTimeout(() => {
          tween = gsap.to(loaderRef.current, {
            yPercent: -100,
            duration: 0.9,
            ease: "power4.inOut",
            onComplete: () => setHidden(true),
          });
          finishIntro();
        }, 250);
      }
      setPct(p);
    }, 140);

    return () => {
      clearInterval(iv);
      clearTimeout(finishTimer);
      tween?.kill();
    };
  }, [finishIntro]);

  if (hidden) return null;

  return (
    <div
      ref={loaderRef}
      aria-hidden="true"
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-ink text-bg motion-reduce:hidden"
    >
      <div className="absolute left-10 top-8 font-mono text-[11px] tracking-[.1em] text-faint">COGNICORE_</div>
      <div className="font-display text-[clamp(64px,14vw,140px)] font-semibold tracking-[-.02em]">
        {String(Math.floor(pct)).padStart(2, "0")}
      </div>
      <div className="mt-7 h-0.5 w-[220px] overflow-hidden bg-track">
        <i className="block h-full bg-lime" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-3.5 font-mono text-[11px] uppercase tracking-[.15em] text-faint">Preparing memory layer</div>
    </div>
  );
}
