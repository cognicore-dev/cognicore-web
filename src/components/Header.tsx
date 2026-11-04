"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { links, nav } from "@/lib/site";
import { button, buttonSize, cx } from "@/lib/styles";
import { Logo } from "./Logo";
import { GitHubIcon } from "./icons";

function AnnouncementBar() {
  return (
    <div className="border-b border-line bg-ink text-[13px] text-white/85">
      <div className="wrap flex items-center justify-center gap-2 py-2 text-center">
        <span className="hidden size-1.5 shrink-0 rounded-full bg-lime sm:inline-block" aria-hidden="true" />
        <p>
          CogniCore is on its way to the Claude and ChatGPT app directories.{" "}
          <Link href="/connect" className="font-medium text-white underline underline-offset-[3px] hover:no-underline">
            Connect it yourself today
          </Link>
        </p>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />
      <div className="border-b border-line bg-paper/90 backdrop-blur-md">
        <nav className="wrap flex h-15 items-center justify-between gap-6" aria-label="Main">
          <Logo />

          <div className="hidden items-center gap-7 text-sm md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cx("transition-colors", isActive(item.href) ? "text-ink" : "text-ink-3 hover:text-ink")}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href={links.github}
              className={cx(button.base, button.ghost, buttonSize.sm)}
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon className="size-4" />
              GitHub
            </a>
            <Link href="/connect" className={cx(button.base, button.primary, "px-4 py-2")}>
              Get started
            </Link>
          </div>

          <button
            type="button"
            className="-mr-2 flex size-10 items-center justify-center rounded-lg text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              {open ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
            </svg>
          </button>
        </nav>

        {open && (
          <div id="mobile-menu" className="border-t border-line md:hidden">
            <div className="wrap flex flex-col py-3">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="py-2.5 text-[15px] text-ink-2">
                  {item.label}
                </Link>
              ))}
              <a href={links.github} className="py-2.5 text-[15px] text-ink-2" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <Link href="/connect" className={cx(button.base, button.primary, buttonSize.md, "mt-2")}>
                Get started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
