import { processSteps } from "@/lib/content";
import { SectionHead } from "./SectionHead";

export function Process() {
  return (
    <section id="process" className="bg-ink py-30 text-bg">
      <div className="wrap">
        <SectionHead tone="dark" eyebrow="HOW IT WORKS" title="Three moves. One memory, shared everywhere.">
          <p>
            CogniCore sits underneath your agents as a thin, local-first layer — it doesn&apos;t replace Cursor, Aider,
            or Claude Code, it gives them a shared place to remember.
          </p>
        </SectionHead>
        <div className="reveal mt-5 grid grid-cols-1 gap-px border border-edge bg-edge min-[860px]:grid-cols-3">
          {processSteps.map((step) => (
            <div key={step.tag} className="bg-ink px-[26px] py-8">
              <div className="font-mono text-[11px] tracking-[.1em] text-lime">{step.tag}</div>
              <h3 className="mt-3.5 font-display text-[22px] font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
