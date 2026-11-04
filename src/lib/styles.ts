/** Joins class names, skipping falsy values. */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Shared button styles. */
export const button = {
  base: "inline-flex items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-colors duration-150",
  primary: "border-ink bg-ink text-white hover:bg-ink-2 hover:border-ink-2",
  secondary: "border-line-strong bg-surface text-ink hover:border-ink-3",
  ghost: "border-transparent text-ink-2 hover:text-ink",
  /* for dark sections */
  inverse: "border-white bg-white text-ink hover:border-code-ink hover:bg-code-ink",
  outlineDark: "border-code-line bg-transparent text-code-ink hover:border-code-dim",
} as const;

export type ButtonVariant = Exclude<keyof typeof button, "base">;

export const buttonSize = {
  sm: "px-3 py-2",
  md: "px-4 py-2.5",
  lg: "px-5 py-3",
} as const;

export type ButtonSize = keyof typeof buttonSize;
