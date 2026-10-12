"use client";

import { useState, type FormEvent } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { button, cx } from "@/lib/styles";
import { Eyebrow } from "./Eyebrow";

/** Prototype form: no backend, it just confirms on submit. */
export function Waitlist() {
  const [joined, setJoined] = useState(false);
  const buttonRef = useMagnetic<HTMLButtonElement>();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: POST the email to a real waitlist endpoint.
    setJoined(true);
  };

  return (
    <section id="waitlist" className="wrap text-center">
      <Eyebrow center>EARLY ACCESS</Eyebrow>
      <h2 className="reveal mx-auto max-w-[16ch] font-display text-[clamp(30px,5vw,54px)] font-semibold tracking-[-.02em]">
        Give your agents a memory that outlives the session.
      </h2>
      <p className="reveal mx-auto mt-[18px] max-w-[48ch] text-ink-dim">
        CogniCore is in active development. Join the waitlist to get early access and shape what ships first.
      </p>
      <form className="reveal mx-auto mt-[38px] flex max-w-[440px] flex-wrap justify-center gap-2.5" onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          placeholder="you@domain.dev"
          required
          aria-label="Email address"
          className="cursor-target min-w-[220px] flex-1 rounded-full border border-line bg-white px-5 py-[13px] font-sans text-sm leading-[normal] text-ink focus:outline-2 focus:outline-offset-2 focus:outline-lime"
        />
        <button
          ref={buttonRef}
          type="submit"
          className={cx(button.base, joined ? "border-ink bg-ink text-lime" : button.lime, "cursor-target leading-[normal]")}
        >
          {joined ? "✓ Added to queue" : "Join waitlist"}
        </button>
      </form>
      <div className="mt-4 font-mono text-[11.5px] text-ink-dim">no spam · unsubscribe anytime · this is a prototype form</div>
    </section>
  );
}
