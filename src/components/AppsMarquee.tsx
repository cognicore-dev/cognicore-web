type Kind = "chat" | "terminal" | "editor" | "any";

const apps: { name: string; kind: Kind; note: string }[] = [
  { name: "Claude", kind: "chat", note: "web, desktop, mobile" },
  { name: "ChatGPT", kind: "chat", note: "web" },
  { name: "Claude Code", kind: "terminal", note: "automatic" },
  { name: "Codex", kind: "terminal", note: "automatic" },
  { name: "Cursor", kind: "editor", note: "MCP" },
  { name: "VS Code", kind: "editor", note: "MCP" },
  { name: "Any MCP app", kind: "any", note: "one URL" },
];

function KindIcon({ kind }: { kind: Kind }) {
  const common = {
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "size-3.5",
    "aria-hidden": true,
  };
  switch (kind) {
    case "chat":
      return (
        <svg {...common}>
          <path d="M3 3.5h10a1 1 0 011 1v6a1 1 0 01-1 1H7l-3 2.5v-2.5H3a1 1 0 01-1-1v-6a1 1 0 011-1z" />
        </svg>
      );
    case "terminal":
      return (
        <svg {...common}>
          <path d="M3 5l3 3-3 3M8 11h5" />
        </svg>
      );
    case "editor":
      return (
        <svg {...common}>
          <path d="M6 4L2 8l4 4M10 4l4 4-4 4" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="2" />
          <path d="M8 2v2M8 12v2M2 8h2M12 8h2" />
        </svg>
      );
  }
}

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={hidden || undefined}>
      {apps.map((app) => (
        <li
          key={app.name}
          className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-paper py-2 pl-2 pr-4 transition-colors hover:border-line-strong"
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-surface text-ink-2 ring-1 ring-line">
            <KindIcon kind={app.kind} />
          </span>
          <span className="text-[15px] font-medium text-ink">{app.name}</span>
          <span className="text-xs text-ink-3">{app.note}</span>
        </li>
      ))}
    </ul>
  );
}

export function AppsMarquee() {
  return (
    <section aria-label="Works with" className="border-y border-line bg-surface">
      <div className="wrap flex flex-col gap-5 py-8 md:flex-row md:items-center md:gap-10">
        <p className="shrink-0 text-sm leading-snug text-ink-3 md:w-40">
          Works with the apps
          <br className="hidden md:block" /> you already use
        </p>
        <div className="group relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
            <Row />
            <Row hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
