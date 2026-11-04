import Link from "next/link";
import { links, mcp, site } from "@/lib/site";
import { LogoMark } from "./Logo";

const columns = [
  {
    heading: "Product",
    items: [
      { href: "/connect", label: "Connect to Claude" },
      { href: "/connect#chatgpt", label: "Connect to ChatGPT" },
      { href: "/connect#coding-agents", label: "Claude Code & Codex" },
      { href: "/developers#benchmarks", label: "Benchmarks" },
    ],
  },
  {
    heading: "Developers",
    items: [
      { href: "/developers", label: "Documentation" },
      { href: links.docs.tools, label: "MCP tool reference" },
      { href: links.pypi, label: "PyPI package" },
      { href: links.changelog, label: "Changelog" },
    ],
  },
  {
    heading: "Project",
    items: [
      { href: links.github, label: "GitHub" },
      { href: links.issues, label: "Report an issue" },
      { href: links.linkedin, label: "LinkedIn" },
      { href: "/privacy", label: "Privacy policy" },
    ],
  },
];

function FooterLink({ href, label }: { href: string; label: string }) {
  const cls = "text-ink-3 transition-colors hover:text-ink";
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

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="wrap grid gap-12 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <div className="flex items-center gap-2 font-semibold text-ink">
            <LogoMark className="size-5" />
            CogniCore
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink-3">
            Open-source memory for Claude, ChatGPT and coding agents. MIT licensed.
          </p>
          <a
            href={mcp.health}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-xs text-ink-3 hover:text-ink"
          >
            <span className="size-1.5 rounded-full bg-[#3fae5a]" aria-hidden="true" />
            Hosted server status
          </a>
        </div>
        {columns.map((col) => (
          <div key={col.heading}>
            <h3 className="text-xs font-medium tracking-wide text-ink">{col.heading}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.items.map((item) => (
                <li key={item.label}>
                  <FooterLink {...item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-2 py-5 text-xs text-ink-3 sm:flex-row sm:justify-between">
          <p>
            © 2026 cognicore-dev · v{site.version} ·{" "}
            <a href={links.license} className="hover:text-ink" target="_blank" rel="noreferrer">
              MIT License
            </a>
          </p>
          <a href={`mailto:${links.email}`} className="hover:text-ink">
            {links.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
