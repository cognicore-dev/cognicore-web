"use client";

import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { heroStats } from "@/lib/content";
import { prefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIntro } from "./IntroProvider";
import { MagneticLink } from "./MagneticLink";
import { Eyebrow } from "./Eyebrow";

/** Wraps each word in a mask span so it can slide up from below. */
function SplitWords({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\s+)/).map((part, i) =>
        part.trim() === "" ? (
          <Fragment key={i}>{part}</Fragment>
        ) : (
          <span key={i} className="overflow-hidden">
            <span className="rup inline-block">{part}</span>
          </span>
        ),
      )}
    </>
  );
}

export function Hero() {
  const { introDone } = useIntro();
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const h1 = headlineRef.current;
    if (!introDone || !h1) return;
    const words = h1.querySelectorAll<HTMLElement>(".rup");

    if (prefersReducedMotion()) {
      gsap.set(words, { y: 0 });
      return;
    }
    const tween = gsap.to(words, { y: 0, duration: 0.9, ease: "power4.out", stagger: 0.035, delay: 0.1 });
    return () => {
      tween.kill();
    };
  }, [introDone]);

  return (
    <section className="mx-auto max-w-[1240px] pb-20 pt-30">
      <Eyebrow>MEMORY LAYER FOR AI CODING AGENTS</Eyebrow>
      <h1
        ref={headlineRef}
        className="max-w-[15ch] overflow-hidden font-display text-[clamp(38px,6.4vw,84px)] font-semibold leading-[1.02] tracking-[-.02em]"
      >
        <SplitWords text="Your codebase deserves more than " />
        <span className="relative text-ink after:absolute after:-left-[2%] after:-right-[2%] after:bottom-[6%] after:z-[-1] after:h-[32%] after:bg-lime after:content-['']">
          <SplitWords text="a blank slate" />
        </span>
        <SplitWords text=" every session." />
      </h1>
      <p className="mt-7 max-w-[46ch] text-lg text-ink-dim">
        One shared memory layer for Cursor, Aider, Claude Code, and every agent you run. Context persists across
        sessions, tools, and terminals — so you stop re-explaining your own codebase.
      </p>
      <div className="mt-[38px] flex flex-wrap gap-3.5">
        <MagneticLink href="#waitlist" variant="lime">
          Join the waitlist →
        </MagneticLink>
        <MagneticLink href="#process" variant="outline">
          See how it works
        </MagneticLink>
      </div>
      <div className="mt-16 flex flex-wrap gap-14 border-t border-line pt-7">
        {heroStats.map((stat) => (
          <div key={stat.label} className="font-mono text-[11px] tracking-[.06em] text-ink-dim">
            <b className="mb-1 block font-display text-[28px] font-semibold text-ink">{stat.value}</b>
            {stat.label}
          </div>
        ))}
      </div>
    </section>
  );
}
