import { capabilities } from "@/lib/content";
import { SectionHead } from "./SectionHead";

export function Capabilities() {
  return (
    <section id="capabilities" className="wrap">
      <SectionHead eyebrow="WHAT COGNICORE DOES" title="Four ways it keeps your agents honest." />
      <div className="reveal border-t border-ink">
        {capabilities.map((cap) => (
          // `cap-row` is a hook for the GSAP stagger in ScrollAnimations, not a style.
          <div
            key={cap.num}
            className="cap-row cursor-target grid grid-cols-[60px_1fr_auto] items-center gap-6 border-b border-line py-[34px] transition-[padding-left] duration-350 ease-smooth hover:bg-lime-dim hover:pl-4"
          >
            <div className="font-mono text-[13px] text-ink-dim">{cap.num}</div>
            <div className="font-display text-[clamp(22px,3.4vw,36px)] font-semibold tracking-[-.01em]">{cap.name}</div>
            <div className="hidden max-w-[34ch] text-sm text-ink-dim min-[760px]:block">{cap.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
