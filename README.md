# CogniCore website

The marketing and documentation site for [CogniCore](https://github.com/cognicore-dev/cognicore-env),
served at https://www.cognicoree.tech. Built with Next.js, TypeScript and Tailwind CSS v4.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
```

Requires Node.js 20.9 or newer.

## Pages

| Route | Audience | What it covers |
| --- | --- | --- |
| `/` | Everyone | What CogniCore does, in plain language |
| `/connect` | Everyone | Setup for Claude, ChatGPT, Claude Code, Codex, Cursor and VS Code, plus the directory announcement |
| `/developers` | Developers | Plugin, hosted MCP server, Python library, benchmarks, configuration, CLI |
| `/privacy` | Everyone | The privacy policy, mirrored from `PRIVACY.md` in the main repo |

## Where things live

- `src/lib/site.ts` holds every external URL, the MCP endpoint and the current version. Change them there.
- `src/components/ui.tsx` has the shared building blocks (buttons, section headings, steps, doc layout, tables).
- `src/components/CodeBlock.tsx` has code blocks and the copyable connector URL.
- Design tokens are in `@theme` in `src/app/globals.css`.

Facts on the site come from the `cognicore-env` repository (README, `docs/`, `PRIVACY.md`). When those change,
update the matching page, especially the version in `site.ts` and the privacy policy.
