/**
 * Script to generate platform-specific redirect files from lib/redirects.ts
 * Run with: node scripts/generate-redirects.js
 */

const fs = require("fs");
const path = require("path");
const { getNetlifyRedirects } = require("../lib/redirects.js");

// Generate Netlify _redirects file
const netlifyRedirects = getNetlifyRedirects();
const netlifyPath = path.join(__dirname, "../public/_redirects");

fs.writeFileSync(
  netlifyPath,
  `# Netlify redirects file
# Auto-generated from lib/redirects.ts
# Format: /old-path  /new-path  status-code

${netlifyRedirects}
`
);

console.log("✅ Generated public/_redirects for Netlify");

// Generate Vercel.json
const { getVercelRedirects } = require("../lib/redirects.js");
const vercelRedirects = getVercelRedirects();
const vercelConfig = {
  redirects: vercelRedirects,
};

const vercelPath = path.join(__dirname, "../vercel.json");
fs.writeFileSync(vercelPath, JSON.stringify(vercelConfig, null, 2));

console.log("✅ Generated vercel.json for Vercel");
console.log(`\n📝 Total redirects: ${vercelRedirects.length}`);

