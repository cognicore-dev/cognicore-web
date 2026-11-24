// Renders the static social card to src/app/opengraph-image.png and src/app/twitter-image.png.
// Uses the ImageResponse renderer that ships inside Next.js, so it needs no extra dependency.
// Run after changing the tagline or version:  node scripts/og-image.mjs
import { writeFile } from "node:fs/promises";
import { createElement as h } from "react";
import { ImageResponse } from "next/dist/compiled/@vercel/og/index.node.js";

const ink = "#121211";
const paper = "#fafaf8";
const lime = "#9ae600";
const dim = "#8d8c84";
const line = "#2b2b27";

const logo = h(
  "svg",
  { width: 56, height: 56, viewBox: "0 0 32 32" },
  h("rect", { width: 32, height: 32, rx: 8, fill: paper }),
  h("path", { d: "M21.5 10.2a8 8 0 1 0 0 11.6", fill: "none", stroke: ink, strokeWidth: 3, strokeLinecap: "round" }),
  h("circle", { cx: 16, cy: 16, r: 2.6, fill: lime }),
);

const card = h(
  "div",
  {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "72px 80px",
      background: ink,
      backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
      backgroundSize: "48px 48px",
      color: paper,
    },
  },
  h(
    "div",
    { style: { display: "flex", alignItems: "center", gap: 18, fontSize: 34, fontWeight: 600 } },
    logo,
    "CogniCore",
  ),
  h(
    "div",
    { style: { display: "flex", flexDirection: "column", gap: 22 } },
    h(
      "div",
      { style: { display: "flex", flexWrap: "wrap", fontSize: 76, lineHeight: 1.05, letterSpacing: -2.5 } },
      h("span", { style: { marginRight: 22 } }, "Stop"),
      h("span", { style: { color: lime, marginRight: 22 } }, "re-explaining"),
      h("span", null, "yourself to AI."),
    ),
    h(
      "div",
      { style: { display: "flex", fontSize: 32, color: dim, maxWidth: 1040 } },
      "Shared memory for Claude, ChatGPT, Claude Code and Codex.",
    ),
  ),
  h(
    "div",
    { style: { display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: dim } },
    h("div", { style: { width: 12, height: 12, borderRadius: 6, background: lime } }),
    "cognicoree.tech · Open source · Apache 2.0",
  ),
);

const png = Buffer.from(await new ImageResponse(card, { width: 1200, height: 630 }).arrayBuffer());
await writeFile(new URL("../src/app/opengraph-image.png", import.meta.url), png);
await writeFile(new URL("../src/app/twitter-image.png", import.meta.url), png);
console.log(`wrote ${png.length} bytes`);
