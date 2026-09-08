import type { NextConfig } from "next";

// JARVIS_EXPORT=1 npm run build → static export under /Jarvis for the
// canvasxai/landing-pages repo (served at <domain>/Jarvis/). Separate distDir
// so an export never clobbers the running dev server's .next.
const isExport = process.env.JARVIS_EXPORT === "1";
// HUB_EXPORT=1 npm run build → static export for the team review hub
// (saurabh-labofone.github.io/onestop-share/onestop-site/). See scripts/export-review.sh.
const HUB_BASE = "/onestop-share/onestop-site";
const isHub = process.env.HUB_EXPORT === "1";

const nextConfig: NextConfig = {
  // Pin the workspace root (other lockfiles may exist higher up the tree).
  turbopack: {
    root: process.cwd(),
  },
  ...(isHub
    ? {
        output: "export" as const,
        basePath: HUB_BASE,
        trailingSlash: true,
        distDir: ".next-export",
        images: { unoptimized: true },
      }
    : {}),
  ...(isExport
    ? {
        output: "export" as const,
        basePath: "/Jarvis",
        distDir: ".next-export",
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
