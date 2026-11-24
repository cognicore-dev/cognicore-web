import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { delay } from "@/components/ui";
import type { Guide } from "@/lib/site";

/** A guide link card. Same look and spotlight hover as the "Get started" cards on the home page. */
export function GuideCard({ guide, index = 0 }: { guide: Guide; index?: number }) {
  return (
    <Link
      href={`/learn/${guide.slug}`}
      data-reveal
      data-spotlight
      style={delay(index * 110)}
      className="group flex flex-col rounded-2xl border border-line bg-paper p-6 transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_18px_40px_-20px_rgba(18,18,17,.25)]"
    >
      <p className="text-xs text-ink-3">Guide</p>
      <h3 className="mt-2 text-lg font-semibold leading-snug text-ink">{guide.title}</h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-2">{guide.description}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
        Read the guide
        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
