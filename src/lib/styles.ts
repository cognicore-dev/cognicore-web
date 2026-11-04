/** Joins class names, skipping falsy values. */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Shared button styles. `.btn` and `.btn-fill` live in globals.css: on hover a colour (--fill) rises from the
 * bottom (lime for every variant), the label rolls (see ButtonLink) and a trailing arrow nudges right.
 */
export const button = {
  base: "btn inline-flex items-center justify-center gap-2 rounded-lg border text-sm font-medium",
  primary: "btn-fill border-ink bg-ink text-white [--fill:var(--color-lime)] hover:border-lime hover:text-ink",
  secondary: "btn-fill border-line-strong bg-surface text-ink [--fill:var(--color-lime)] hover:border-lime",
  ghost: "border-transparent text-ink-2 hover:text-ink",
  /* for dark sections */
  inverse: "btn-fill border-white bg-white text-ink [--fill:var(--color-lime)] hover:border-lime",
  outlineDark:
    "btn-fill border-code-line bg-transparent text-code-ink [--fill:var(--color-lime)] hover:border-lime hover:text-ink",
} as const;

export type ButtonVariant = Exclude<keyof typeof button, "base">;

export const buttonSize = {
  sm: "px-3 py-2",
  md: "px-4 py-2.5",
  lg: "px-5 py-3",
} as const;

export type ButtonSize = keyof typeof buttonSize;
