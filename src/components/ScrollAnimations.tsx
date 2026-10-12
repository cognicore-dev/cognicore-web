"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Registers the GSAP ScrollTrigger reveals for every `.reveal`, `.cap-row` and `.work-card`
 * on the page. Renders nothing; mount it once after the page content.
 */
export function ScrollAnimations() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } },
        );
      });
      gsap.utils.toArray<HTMLElement>(".cap-row").forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 18 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: i * 0.05,
            scrollTrigger: { trigger: row, start: "top 90%" },
          },
        );
      });
      gsap.utils.toArray<HTMLElement>(".work-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: (i % 2) * 0.1,
            scrollTrigger: { trigger: card, start: "top 90%" },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
