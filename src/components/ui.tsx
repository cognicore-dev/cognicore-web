import Link from "next/link";
import { Children, Fragment, cloneElement, isValidElement, type CSSProperties, type ReactNode } from "react";
import { button, buttonSize, cx, type ButtonSize, type ButtonVariant } from "@/lib/styles";

/** Inline style that delays a [data-reveal] element, for staggering siblings. */
export const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function splitNode(node: ReactNode, n: { i: number }): ReactNode {
  if (typeof node === "string") {
    return node.split(/(\s+)/).map((part, k) =>
      part.trim() === "" ? (
        part
      ) : (
        <span key={k} className="sw">
          <span style={{ "--i": n.i++ } as CSSProperties}>{part}</span>
        </span>
      ),
    );
  }
  if (Array.isArray(node)) return node.map((child, k) => <Fragment key={k}>{splitNode(child, n)}</Fragment>);
  // recurse into inline text elements (the .accent spans), leave anything else (svg, components) whole
  if (isValidElement<{ children?: ReactNode }>(node) && typeof node.type === "string" && node.type !== "svg") {
    return cloneElement(node, undefined, splitNode(node.props.children, n));
  }
  return node;
}

/**
 * Splits text into words that rise into place, one after another, when the nearest [data-reveal] ancestor is
 * revealed. Pure markup + CSS (see .sw in globals.css), so it renders on the server and costs no JS.
 */
export function SplitWords({ children }: { children: ReactNode }) {
  return <>{splitNode(children, { i: 0 })}</>;
}

/** Hand-drawn underline that draws itself in when its [data-reveal] ancestor is revealed. */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 16"
      preserveAspectRatio="none"
      className={cx("draw pointer-events-none absolute bottom-[0.02em] left-0 h-[0.18em] w-full", className)}
    >
      <path
        d="M3 11 C 60 4, 110 4, 160 8 S 250 13, 297 5"
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Wraps plain-text children in the rolling label used by buttons. */
export function rollLabel(children: ReactNode) {
  return Children.map(children, (child) =>
    typeof child === "string" && child.trim() ? (
      <span className="btn-roll">
        <span>{child.trim()}</span>
      </span>
    ) : (
      child
    ),
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}) {
  const cls = cx(button.base, button[variant], buttonSize[size], className);
  const label = rollLabel(children);
  return href.startsWith("http") ? (
    <a href={href} className={cls} target="_blank" rel="noreferrer">
      {label}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx("flex items-center gap-2.5 text-[13px] font-medium text-lime", className)}>
      <span aria-hidden="true" className="eb-dash h-px w-5 bg-current" />
      <span className="rv-up">{children}</span>
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  center,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
}) {
  return (
    <div data-reveal="words" className={cx("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && <Eyebrow className={cx("mb-3", center && "justify-center")}>{eyebrow}</Eyebrow>}
      <h2 className="text-[clamp(26px,3.4vw,36px)] font-semibold leading-[1.15] tracking-[-0.025em] text-ink">
        <SplitWords>{title}</SplitWords>
      </h2>
      {lead && (
        <p className="rv-up mt-4 text-[17px] leading-relaxed text-ink-2" style={{ "--d2": "350ms" } as CSSProperties}>
          {lead}
        </p>
      )}
    </div>
  );
}

/** Top-of-page title block for the inner pages. */
export function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: ReactNode }) {
  return (
    <div className="border-b border-line">
      <div data-reveal="words" className="wrap py-14 sm:py-18">
        <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
        <h1 className="max-w-3xl text-[clamp(32px,4.6vw,48px)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink">
          <SplitWords>{title}</SplitWords>
        </h1>
        <div
          className="rv-up mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-2"
          style={{ "--d2": "300ms" } as CSSProperties}
        >
          {lead}
        </div>
      </div>
    </div>
  );
}

export function Callout({
  title,
  children,
  tone = "neutral",
  className,
}: {
  title?: string;
  children: ReactNode;
  tone?: "neutral" | "brand";
  className?: string;
}) {
  return (
    <div
      className={cx(
        "rounded-xl border px-5 py-4 text-[15px] leading-relaxed",
        tone === "brand" ? "border-brand/25 bg-brand-soft text-ink" : "border-line bg-sunken text-ink-2",
        className,
      )}
    >
      {title && <p className="mb-1 font-semibold text-ink">{title}</p>}
      {children}
    </div>
  );
}

/** Numbered steps for setup guides. */
export function Steps({ children }: { children: ReactNode }) {
  return <ol className="relative space-y-7 [counter-reset:step]">{children}</ol>;
}

export function Step({ title, children }: { title: ReactNode; children?: ReactNode }) {
  return (
    <li className="relative grid grid-cols-[28px_1fr] gap-4 [counter-increment:step]">
      <span className="flex size-7 items-center justify-center rounded-full border border-line-strong bg-surface font-mono text-xs text-ink before:content-[counter(step)]" />
      <div className="min-w-0 pt-0.5">
        <p className="font-medium text-ink">{title}</p>
        {children && <div className="mt-2 space-y-3 text-[15px] leading-relaxed text-ink-2">{children}</div>}
      </div>
    </li>
  );
}

/** Inline keyboard/menu path, e.g. <Path>Settings › Connectors</Path>. */
export function Path({ children }: { children: ReactNode }) {
  return (
    <span className="whitespace-nowrap rounded-md border border-line bg-sunken px-1.5 py-0.5 text-[13px] font-medium text-ink">
      {children}
    </span>
  );
}

/** Two-column docs layout: sticky table of contents on the left, content on the right. */
export function DocLayout({
  toc,
  children,
}: {
  toc: { id: string; label: string; group?: string }[];
  children: ReactNode;
}) {
  return (
    <div className="wrap grid gap-12 py-12 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
      <aside className="hidden lg:block">
        <nav aria-label="On this page" className="sticky top-32 text-sm">
          <p className="mb-3 text-xs font-medium text-ink">On this page</p>
          <ul className="space-y-2 border-l border-line">
            {toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="-ml-px block border-l border-transparent pl-4 text-ink-3 hover:border-ink-3 hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="min-w-0 max-w-3xl">{children}</div>
    </div>
  );
}

export function DocSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="border-b border-line pb-14 pt-2 last:border-0 [&+&]:pt-14">
      <h2 className="mb-5 text-2xl font-semibold tracking-[-0.02em] text-ink">
        <a href={`#${id}`} className="hover:text-ink-2">
          {title}
        </a>
      </h2>
      <div className="prose-cc">{children}</div>
    </section>
  );
}

export function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-surface">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="border-b border-line bg-sunken text-ink">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-4 py-2.5 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line text-ink-2">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className={cx("px-4 py-2.5 align-top", j === 0 && "text-ink")}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
