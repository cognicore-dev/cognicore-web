import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="wrap flex flex-col items-start py-32">
      <p className="font-mono text-sm text-ink-3">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-ink">This page doesn&apos;t exist.</h1>
      <p className="mt-3 text-ink-2">It may have moved, or the link may be wrong.</p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/">Go home</ButtonLink>
        <ButtonLink href="/connect" variant="secondary">
          Setup guide
        </ButtonLink>
      </div>
    </div>
  );
}
