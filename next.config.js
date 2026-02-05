const { getNextJsRedirects } = require("./lib/redirects.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return getNextJsRedirects();
  },
};

module.exports = nextConfig;

