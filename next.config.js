/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML/JS export -> ./out, for GitHub Pages (no Node server there).
  output: 'export',

  // GitHub Pages can't run Next's image optimizer. We only use plain <img>
  // tags anyway; this keeps the export happy regardless.
  images: { unoptimized: true },

  // Served from the apex domain (vpcodes.in) at "/", so no basePath needed.

  // Off because StrictMode's dev-only double-invoke fights GSAP ScrollTrigger's
  // pin lifecycle. No effect on the production build.
  reactStrictMode: false,
};

module.exports = nextConfig;
