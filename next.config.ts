import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static HTML export to out/, served by Cloudflare (see wrangler.jsonc).
  output: "export",
};

export default nextConfig;
