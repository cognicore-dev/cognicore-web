import type { ReactNode } from "react";
import { delay } from "@/components/ui";

/** The two-sentence answer every guide opens with, so it can be quoted on its own. */
export function AnswerBox({ children }: { children: ReactNode }) {
  return (
    <div data-reveal style={delay(100)} className="relative mb-12 rounded-r-xl bg-surface py-5 pl-6 pr-5">
      <span aria-hidden="true" className="answer-rule absolute inset-y-0 left-0 w-[3px] rounded-full bg-lime" />
      <p className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-ink-3">
        Short answer
        <span aria-hidden="true" className="inline-block h-3 w-[7px] animate-blink bg-lime" />
      </p>
      <div className="mt-2 text-[17px] leading-relaxed text-ink [&_code]:font-mono [&_code]:text-[0.88em]">
        {children}
      </div>
    </div>
  );
}
