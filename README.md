# Fresh Egg Designs Portfolio

A modern Next.js portfolio site built with TypeScript, Tailwind CSS, and MDX.

## Features

- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **MDX** for project case studies
- **SEO optimized** with metadata and OpenGraph support
- **Accessible** design with semantic HTML and focus states
- **Responsive** mobile-first design
- **Case Study Template** optimized for Product Design hiring managers

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with header/footer
│   ├── page.tsx           # Home page
│   ├── work/              # Work pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── resume/            # Resume page
├── components/            # React components
│   ├── layout/           # Header, Footer
│   ├── ui/               # Button, Card, Link
│   ├── projects/         # ProjectCard, ProjectHeader
│   └── case-study/       # Case study components
├── content/              # MDX content
│   └── projects/        # Project case studies
├── lib/                  # Utilities
│   ├── config.ts        # Site configuration
│   ├── mdx.ts           # MDX utilities
│   └── projects.ts      # Project loading utilities
└── public/              # Static assets
```

## Case Study Template

The site includes a comprehensive case study template optimized for Product Design hiring managers. Each case study includes:

- **Sticky Summary Panel**: Role, Team, Timeline, Tools, Platforms, Outcomes (desktop)
- **TL;DR / Impact Block**: Quick summary near the top
- **Structured Sections**: Context, Goals, Constraints, Process, Key Decisions, Design Iterations, Validation, Impact, Learnings
- **What I'd Do Next**: Future plans section
- **Image Component**: Images with captions and optional zoom interaction

### Case Study Components

Available in MDX files:

- `<CaseStudyImage src="/path" alt="..." caption="..." zoomable />` - Image with optional zoom
- `<CaseStudySection title="...">Content</CaseStudySection>` - Structured section
- `<TLDR impact="...">Summary</TLDR>` - TL;DR block with impact
- `<WhatNext>Future plans</WhatNext>` - What I'd do next section

### Example Case Study Structure

```mdx
---
slug: my-project
title: My Project
client: Client Name
role: Product Designer
timeframe: 2024
team: 3 designers, 2 engineers
platforms:
  - Web
  - iOS
tools:
  - Figma
  - React
summary: Brief project summary
problem: The problem statement
outcome: The outcome and results
outcomes:
  - 50% increase in engagement
  - 30% reduction in support tickets
tags:
  - Design
  - UX
---

<TLDR impact="Key impact statement">
Quick summary of the project.
</TLDR>

<CaseStudySection title="Context">
Project context and background.
</CaseStudySection>

<CaseStudyImage 
  src="/images/example.jpg" 
  alt="Example" 
  caption="Example image" 
  zoomable 
/>

<CaseStudySection title="Process">
Design process and methodology.
</CaseStudySection>

<WhatNext>
Future plans and next steps.
</WhatNext>
```

## Adding Projects

Create a new `.mdx` file in `content/projects/` with the following frontmatter:

```mdx
---
slug: my-project
title: My Project
client: Client Name
role: Product Designer
timeframe: 2024
tools:
  - Figma
  - React
summary: Brief project summary
problem: The problem statement
outcome: The outcome and results
tags:
  - Design
  - UX
featured_image: /images/project.jpg
---
```

## Redirects

The site includes a redirect system for migrating from WordPress:

1. Edit `lib/redirects.js` to add redirect mappings
2. Run `npm run generate-redirects` to regenerate platform-specific files
3. Redirects work automatically in Next.js, Vercel, and Netlify

## Configuration

Edit `lib/config.ts` to customize:
- Site name and description
- Navigation links
- Social media links
- Contact information

## Customization

- **Colors**: Edit CSS variables in `app/globals.css`
- **Typography**: Modify Tailwind typography classes in `app/globals.css`
- **Components**: Customize UI components in `components/ui/`

## License

MIT
