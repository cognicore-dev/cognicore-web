# CogniCore — Landing Page (Next.js + TypeScript)

Marketing site prototype for CogniCore, a shared memory layer for AI coding agents
(Cursor, Aider, Claude Code, and others). This is the Next.js + TypeScript + Tailwind CSS v4 port of the
original static HTML/CSS/JS prototype. It looks and behaves the same: white/lime theme,
GSAP scroll reveals, a lagging custom cursor, magnetic buttons, a percentage preloader
and a typewriter terminal demo.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```

Requires Node.js 20.9 or newer.

## Structure

```
src/
├── app/
│   ├── layout.tsx          # <html>, metadata, fonts (next/font)
│   ├── page.tsx            # composes the sections
│   └── globals.css         # Tailwind import, design tokens (@theme), keyframes, the few CSS-only rules
├── components/
│   ├── IntroProvider.tsx   # context: preloader → hero "intro done" signal
│   ├── Preloader.tsx       # % counter + bar, slides up with GSAP
│   ├── CustomCursor.tsx    # dot + lagging ring, grows over .cursor-target
│   ├── MagneticLink.tsx    # anchor with magnetic hover
│   ├── Header.tsx / Logo.tsx
│   ├── Hero.tsx            # word-split headline reveal
│   ├── Marquee.tsx         # infinite tickers
│   ├── Eyebrow.tsx         # mono label with the lime dot
│   ├── Capabilities.tsx / Process.tsx / Work.tsx / SectionHead.tsx
│   ├── Demo.tsx            # tabs + terminal, starts typing when scrolled into view
│   ├── TerminalPanel.tsx   # typewriter renderer
│   ├── Waitlist.tsx        # prototype form (no backend)
│   ├── Footer.tsx
│   └── ScrollAnimations.tsx# GSAP ScrollTrigger reveals
├── hooks/
│   ├── useMagnetic.ts
│   └── usePrefersReducedMotion.ts
└── lib/
    ├── content.ts          # all page copy + terminal scripts, typed
    └── styles.ts           # cx() class joiner + shared pill-button classes
```

## What changed from the static version

| Static prototype | Next.js port |
| --- | --- |
| GSAP + ScrollTrigger from a CDN `<script>` | `gsap` npm package, imported in client components |
| Google Fonts `<link>` | `next/font/google` (self-hosted, no layout shift) exposed as `--font-body`, `--font-display`, `--font-mono` |
| `main.js` querying the DOM | One client component or hook per behaviour, each cleaning up its listeners/timers |
| Headline split into words at runtime | Words are split when rendering (`SplitWords` in `Hero.tsx`) |
| Terminal built with `innerHTML` + nested `setTimeout`s | `TerminalPanel` renders from state; same timings (13 ms/char, 220 ms per line) |
| Inline `onsubmit` on the form | `Waitlist` component with React state |
| `style.css` (220 lines of selectors) | Tailwind utility classes on the elements |

## Styling (Tailwind CSS v4)

Tailwind v4 is configured CSS-first, so there is no `tailwind.config.js`. Everything lives in `src/app/globals.css`:

- **`@theme`** holds the design tokens. Colours become utilities (`bg-ink`, `text-lime`,
  `border-line`, `bg-lime-dim`, `text-muted`, ...), as do `ease-smooth` and the animations
  `animate-marquee-left`, `animate-marquee-right` and `animate-blink`. To re-theme, change the hex values there.
- **`@theme inline`** maps the next/font variables to `font-sans` (Inter), `font-display`
  (Space Grotesk) and `font-mono` (JetBrains Mono).
- **`@utility wrap`** is the page container (1240px max width, 40px side padding, 22px on small screens).
- The text sizes `text-xs` to `text-lg` keep the original's line-height of 1.5.

A few things stay as plain CSS on purpose:

- the keyframes, which live in `@theme` so Tailwind generates the `animate-*` classes;
- `.rup`, the starting offset for the headline words. GSAP animates the `transform`
  property, and Tailwind's `translate-*` classes use the separate `translate` property, so the two would add up;
- the global `prefers-reduced-motion` override.

Some class names have no styles attached and exist only for JavaScript:

- `reveal`, `cap-row` and `work-card` are what GSAP selects in `ScrollAnimations.tsx`;
- `cursor-target` is what the custom cursor checks on hover.

`prefers-reduced-motion` is still respected everywhere: no preloader, no custom cursor,
headline shown immediately, terminal output rendered instantly.

## Notes

- The waitlist form has no backend. It only swaps the button text on submit (see the TODO in `Waitlist.tsx`).
- This is a prototype/concept build, not production copy or a finished product page.
