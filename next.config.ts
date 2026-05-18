import type { NextConfig } from "next";

const config: NextConfig = {
  // Standalone copy of the /edge landing page for copy + layout collaboration.
  // No internal API rewrites, no server-side data, no analytics integration —
  // this is intentionally a thin shell so external contributors can iterate
  // on copy and layout without touching the real InstaClaw stack.
};

export default config;
