import { workItems } from "@/lib/content";
import { SectionHead } from "./SectionHead";

export function Work() {
  return (
    <section id="work" className="wrap">
      <SectionHead eyebrow="SEE IT WORK" title="What each connection actually does." />
      <div className="reveal grid grid-cols-1 gap-7 min-[760px]:grid-cols-2">
        {workItems.map((item) => (
          // `work-card` is a hook for the GSAP reveal in ScrollAnimations, not a style.
          <div
            key={item.glyph}
            className="work-card cursor-target group overflow-hidden rounded-[14px] border border-line bg-white transition-[translate,box-shadow] duration-400 ease-smooth hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(14,15,12,.10)]"
          >
            <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-ink">
              <div className="flex size-[52px] items-center justify-center rounded-full bg-lime font-display text-lg font-bold text-ink transition-transform duration-500 ease-smooth group-hover:rotate-8 group-hover:scale-115">
                {item.glyph}
              </div>
            </div>
            <div className="flex items-start justify-between gap-3 px-[22px] py-5">
              <h3 className="font-display text-lg font-semibold">{item.title}</h3>
              <span className="whitespace-nowrap font-mono text-[11px] tracking-[.06em] text-ink-dim">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
