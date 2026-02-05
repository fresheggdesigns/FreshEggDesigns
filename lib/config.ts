export const siteConfig = {
  name: "Fresh Egg Designs",
  designerName: "Megan Hegg",
  positioning: "Product designer building systems, experimentation, and data-rich UX",
  specialties: [
    "Design Systems",
    "Experimentation",
    "Data-Rich UX",
  ],
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
    { name: "Contact", href: "/contact" },
  ],
  contact: {
    email: "hello@fresheggdesigns.com",
    message: "Let's work together to create something amazing.",
  },
  howIWork: [
    "Research-driven design decisions",
    "Systems thinking at scale",
    "Collaboration with engineering and product",
    "Data-informed iteration",
  ],
} as const;

