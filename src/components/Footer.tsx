import { footerColumns } from "@/lib/content";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-2">
      <div className="wrap">
        <div className="grid grid-cols-2 gap-10 pb-10 pt-16 min-[761px]:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-3.5 max-w-[32ch] text-sm text-ink-dim">
              A shared memory layer for AI coding agents. Built so context outlives the session.
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h5 className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[.08em] text-ink-dim">{col.heading}</h5>
              {col.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="cursor-target block py-1.5 text-sm text-ink opacity-80 hover:text-lime hover:opacity-100 hover:[-webkit-text-stroke:.4px_var(--color-ink)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-between gap-2.5 border-t border-line py-[18px] font-mono text-[11px] text-ink-dim">
          <span>© 2026 COGNICORE — PROTOTYPE BUILD</span>
          <span>MADE WITH ANYFLOW-STYLE MOTION</span>
        </div>
      </div>
    </footer>
  );
}
