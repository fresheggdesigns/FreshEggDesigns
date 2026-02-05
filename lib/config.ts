export const siteConfig = {
  name: "Fresh Egg Designs",
  description: "Product Designer Portfolio - Crafting beautiful and functional digital experiences",
  url: "https://fresheggdesigns.com",
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com/fresheggdesigns",
    github: "https://github.com/fresheggdesigns",
    linkedin: "https://linkedin.com/in/fresheggdesigns",
    email: "hello@fresheggdesigns.com",
  },
  nav: [
    { name: "Home", href: "/" },
    { name: "Work", href: "/work" },
    { name: "About", href: "/about" },
    { name: "Resume", href: "/resume" },
    { name: "Contact", href: "/contact" },
  ],
  contact: {
    email: "hello@fresheggdesigns.com",
    message: "Let's work together to create something amazing.",
  },
} as const;

