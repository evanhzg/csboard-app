const { withNextVideo } = require("next-video/process");
const nextTranslate = require("next-translate-plugin");
// @ts-check
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure that all imports of `yjs` resolve to the same instance
      config.resolve.alias["yjs"] = path.resolve(__dirname, "node_modules/yjs");
    }
    return config;
  },
  images: {
    formats: ["image/webp"],
  },
  i18n: {
    locales: ["fr", "en"],
    defaultLocale: "fr",
    localeDetection: false,
    domains: [
      {
        domain: "evan-playground.vercel.app",
        defaultLocale: "fr",
        http: true,
      },
      {
        domain: "en.evan-playground.vercel.app",
        defaultLocale: "en",
        http: true,
      },
    ],
  },
};

module.exports = nextTranslate(withNextVideo(nextConfig));
