/**
 * Redirect mappings from old WordPress URLs to new Next.js routes
 * 
 * Format: { from: '/old-path', to: '/new-path' }
 * 
 * This file serves as the single source of truth for redirects.
 * It's used by both next.config.js and platform-specific configs.
 */

/**
 * @typedef {Object} Redirect
 * @property {string} from - The old URL path
 * @property {string} to - The new URL path
 * @property {boolean} [permanent] - true for 308, false for 307
 */

/**
 * @type {Redirect[]}
 */
const redirects = [
  // WordPress projects list page
  { from: '/projects-2', to: '/work', permanent: true },
  { from: '/projects-2/', to: '/work', permanent: true },
  
  // Individual project redirects
  { from: '/projects-2/design-systems', to: '/work/design-systems', permanent: true },
  { from: '/projects-2/design-systems/', to: '/work/design-systems', permanent: true },
  
  { from: '/projects-2/squeaker-chomp', to: '/work/squeaker-chomp', permanent: true },
  { from: '/projects-2/squeaker-chomp/', to: '/work/squeaker-chomp', permanent: true },
  
  { from: '/projects-2/patron-tech', to: '/work/patron-tech', permanent: true },
  { from: '/projects-2/patron-tech/', to: '/work/patron-tech', permanent: true },
  
  { from: '/projects-2/bbva', to: '/work/bbva', permanent: true },
  { from: '/projects-2/bbva/', to: '/work/bbva', permanent: true },
  
  { from: '/projects-2/product-design', to: '/work/product-design', permanent: true },
  { from: '/projects-2/product-design/', to: '/work/product-design', permanent: true },
];

/**
 * Get redirects formatted for Next.js config
 */
function getNextJsRedirects() {
  return redirects.map((redirect) => ({
    source: redirect.from,
    destination: redirect.to,
    permanent: redirect.permanent ?? true, // Default to 308 permanent redirect
  }));
}

/**
 * Get redirects formatted for Vercel
 */
function getVercelRedirects() {
  return redirects.map((redirect) => ({
    source: redirect.from,
    destination: redirect.to,
    permanent: redirect.permanent ?? true,
  }));
}

/**
 * Get redirects formatted for Netlify (_redirects file)
 */
function getNetlifyRedirects() {
  return redirects
    .map((redirect) => {
      const statusCode = redirect.permanent ?? true ? 301 : 302;
      return `${redirect.from}  ${redirect.to}  ${statusCode}`;
    })
    .join("\n");
}

module.exports = {
  redirects,
  getNextJsRedirects,
  getVercelRedirects,
  getNetlifyRedirects,
};

