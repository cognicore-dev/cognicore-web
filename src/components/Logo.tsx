import Link from "next/link";

export function LogoMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="8" fill="var(--color-ink)" />
      <path
        d="M21.5 10.2a8 8 0 1 0 0 11.6"
        fill="none"
        stroke="var(--color-paper)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="2.6" fill="var(--color-lime)" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.01em] text-ink">
      <LogoMark />
      CogniCore
    </Link>
  );
}
