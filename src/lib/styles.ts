/** Joins class names, skipping falsy values. */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Shared pill-button styles (were .btn / .btn-solid / .btn-outline / .btn-lime). */
export const button = {
  base: "inline-flex items-center gap-2 rounded-full border px-6 py-3 font-display text-sm font-semibold",
  solid: "border-ink bg-ink text-bg",
  outline: "border-ink bg-transparent text-ink",
  lime: "border-lime bg-lime text-ink",
} as const;

export type ButtonVariant = Exclude<keyof typeof button, "base">;
