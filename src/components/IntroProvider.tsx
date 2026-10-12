"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface IntroState {
  /** True once the preloader has finished (or was skipped). */
  introDone: boolean;
  finishIntro: () => void;
}

const IntroContext = createContext<IntroState | null>(null);

/** Lets the preloader tell the hero when to play its headline reveal. */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [introDone, setIntroDone] = useState(false);
  const finishIntro = useCallback(() => setIntroDone(true), []);
  const value = useMemo(() => ({ introDone, finishIntro }), [introDone, finishIntro]);
  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}

export function useIntro(): IntroState {
  const ctx = useContext(IntroContext);
  if (!ctx) throw new Error("useIntro must be used inside <IntroProvider>");
  return ctx;
}
