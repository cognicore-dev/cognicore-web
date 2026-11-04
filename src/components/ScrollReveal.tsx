"use client";

import { useEffect } from "react";

/**
 * Adds .is-in to every [data-reveal] element once it scrolls into view. See globals.css.
 * Watches the DOM too, so elements rendered later (route changes, streamed or re-created nodes) are picked up.
 */
export function ScrollReveal() {
  useEffect(() => {
    const reveal = (el: Element) => el.classList.add("is-in");

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );

    const watched = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => {
        if (watched.has(el)) return;
        watched.add(el);
        io.observe(el);
      });
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    // Cursor spotlight for [data-spotlight] cards: one passive listener, at most one style write per frame.
    let frame = 0;
    let last: PointerEvent | null = null;
    const onMove = (e: PointerEvent) => {
      last = e;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const card = (last?.target as Element | null)?.closest?.<HTMLElement>("[data-spotlight]");
        if (!card || !last) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${last.clientX - r.left}px`);
        card.style.setProperty("--my", `${last.clientY - r.top}px`);
      });
    };
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (fine) document.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      if (fine) document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
