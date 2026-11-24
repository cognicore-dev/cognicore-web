import type { Faq } from "@/lib/faq";

/** The FAQ rows, moved here unchanged from the home page so /faq renders the same markup. */
export function FaqList({ items }: { items: readonly Faq[] }) {
  return (
    <>
      {items.map((f) => (
        <details key={f.q} className="faq group py-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-medium text-ink">
            {f.q}
            <span
              aria-hidden="true"
              className="text-xl font-light leading-none text-ink-3 transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 pr-8 text-[15px] leading-relaxed text-ink-2">{f.a}</p>
        </details>
      ))}
    </>
  );
}
