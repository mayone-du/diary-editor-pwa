const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  experimental: {
    serverComponentsExternalPackages: ["puppeteer"],
  },
});

module.exports = nextConfig;
